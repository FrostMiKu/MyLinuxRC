window.setTimeout(function () {
  var version = config.welcome.version;
  if (!version) {
    app.tab.open(app.homepage() + "?v=" + app.version() + "&type=install");
    config.welcome.version = app.version();
  }
}, 3000);

var pageSend = function (e) {
  app.content_script.send('storage', {
    "url": config.useragent.url,
    "useragent": config.useragent.string
  }, (e ? e.tabId : null));
};

var popupSend = function () {
  app.popup.send("storage", {
    "key": config.useragent.key,
    "url": config.useragent.url,
    "text": config.useragent.text,
    "string": config.useragent.string
  });
};

var changeUA = function (o) {
  if (o.id) {
    var arr = o.id;
    config.useragent.key = arr;
    if (o.url) {
      config.useragent.global = o;
      config.useragent.url = o.url;
    }
    /*  */
    var UA = config.useragent.obj;
    if (arr.length === 1) config.useragent.string = UA[arr[0]];
    else if (arr.length === 2) config.useragent.string = UA[arr[0]][arr[1]];
    else config.useragent.string = '';
    /*  */
    config.badge.icon = config.useragent.string ? arr[0] : '';
    app.button.badgeIcon(config.badge.icon);
    popupSend();
  }
};

app.popup.receive("load", popupSend);
app.button.badgeIcon(config.badge.icon);
app.content_script.receive("load", pageSend);
app.popup.receive("user-agent-id", changeUA);
app.popup.receive("faq", function () {app.tab.open(app.homepage() + "#faq")});
app.popup.receive("user-agent-url", function (url) {config.useragent.url = url});
app.popup.receive("bug", function () {app.tab.open(app.homepage() + "#report")});
app.popup.receive("status-td-text", function (txt) {config.useragent.text = txt});

app.popup.receive("reload", function () {
  app.tab.query(function (tabs) {
    if (tabs && tabs.length) {
      app.tab.reload(tabs[0].id);
    }
  });
});

app.popup.receive("update-user-agent-string", function (o) {
  config.useragent.string = o.UA;
  var obj = config.useragent.obj;
  if (o.key.length == 1) obj[o.key[0]] = o.UA;
  if (o.key.length == 2) obj[o.key[0]][o.key[1]] = o.UA;
  config.useragent.obj = obj;
  /*  */
  popupSend();
});

app.Hotkey(function (e) {
  if (e === "_mode") {
    if (config.badge.icon === '') changeUA(config.useragent.global);
    else changeUA({"url": null, "id": ['', '', 'default']});
  }
});

app.onBeforeSendHeaders(function (top, headers) {
  var _action = function (top, urls) {
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
  /*  */
  if (config.useragent.string) {
    var urls = config.useragent.url.replace(/\s+/g, '').split(",");
    for (var i = 0; i < headers.length; i++) {
      var _name = headers[i].name.toLowerCase();
      if (_name === 'user-agent') {
        if (_action(top, urls)) headers[i].value = config.useragent.string;
        return {"requestHeaders": headers};
      }
    }
  }
});
