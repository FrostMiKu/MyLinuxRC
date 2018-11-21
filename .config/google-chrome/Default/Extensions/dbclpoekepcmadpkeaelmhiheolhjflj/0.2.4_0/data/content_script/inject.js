var background = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path === 'background-to-page') {
          if (request.method === id) _tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": 'page-to-background', "method": id, "data": data})}
  }
})();

var action = function (top, urls) {
  if (!top) return true;
  if (urls.indexOf('*') !== -1) return true;
  if (urls.indexOf('all_urls') !== -1) return true;
  /*  */
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    if (url === top) return true;
    else if (top && top.indexOf(url) !== -1) return true;
  }
  /*  */
  return false;
};

background.receive("storage", function (data) {
  var top = data.top, urls = data.url.replace(/\s+/g, '').split(",");
  if (data.useragent) {
    if (action(top, urls)) {
      var script = document.getElementById("useragent-switcher");
      if (script) script.parentNode.removeChild(script);
      /*  */
      script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("id", "useragent-switcher");
      script.textContent = 'navigator.__defineGetter__("userAgent", function() {return "' + data.useragent + '"})';
      document.documentElement.appendChild(script);
    }
  }
});

var script = document.getElementById("useragent-switcher");
if (script) script.parentNode.removeChild(script);
background.send("load");