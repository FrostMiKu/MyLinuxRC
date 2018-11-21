var app = {};

app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};
app.Hotkey = function (callback) {chrome.commands.onCommand.addListener(function (e) {if (e === "toggle-default-mode") callback("_mode")})};
if (chrome.runtime.setUninstallURL) chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});

app.tab = {
  "open": function (url) {chrome.tabs.create({"url": url, "active": true})},
  "query": function (callback) {chrome.tabs.query({"active": true}, callback)},
  "reload": function (id) {chrome.tabs.reload(id, {"bypassCache": true}, function () {})}
};

app.button = {
  "badgeIcon": function (path) {
    var options = {};
    if (path) {
      options = {
        "path": {
          "16": "../../data/popup/icons/16/" + path + ".png",
          "32": "../../data/popup/icons/32/" + path + ".png"
        }
      };
    } else {
      options = {
        "path": {
          "16": "../../data/icons/16.png",
          "32": "../../data/icons/32.png",
          "48": "../../data/icons/48.png",
          "64": "../../data/icons/64.png"
        }
      };
    }
    /*  */
    chrome.browserAction.setIcon(options);
  }
};

app.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      var script = document.createElement("script");
      script.src = "../common.js";
      document.body.appendChild(script);
    });
  }, 300);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      tmp[id] = data;
      objs[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();

app.onBeforeSendHeaders = function (callback) {
  var top = {};
  var onBeforeSendHeaders = function (info) {
    var url = info.url;
    if (url.indexOf('http') === 0 || url.indexOf('ftp') === 0) {
      var id = info.tabId + '|' + info.frameId;
      if (info.type === 'main_frame' || info.type === 'sub_frame') top[id] = url;
      return callback(top[id], info.requestHeaders);
    }
  };
  /*  */
  chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders, {"urls" : ["http://*/*", "https://*/*"]}, ["blocking", "requestHeaders"]);
};

app.popup = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path === 'popup-to-background') {
          if (request.method === id) _tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"path": 'background-to-popup', "method": id, "data": data});
    }
  }
})();

app.content_script = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path === 'page-to-background') {
          if (request.method === id) {
            var _data = request.data || {};
            if (sender.tab) {
              _data["top"] = sender.tab.url;
              _data["tabId"] = sender.tab.id;
            }
            _tmp[id](_data);
          }
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          if (tab.url.indexOf("http") === 0) {
            if (!tabId || (tabId && tab.id === tabId)) {
              var _data = data || {};
              _data["top"] = tab.url;
              _data["tabId"] = tab.id;
              chrome.tabs.sendMessage(tab.id, {"path": 'background-to-page', "method": id, "data": _data}, function () {});
            }
          }
        });
      });
    }
  }
})();
