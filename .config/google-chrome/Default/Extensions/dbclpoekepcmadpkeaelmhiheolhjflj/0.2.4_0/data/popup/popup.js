var background = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path === 'background-to-popup') {
          if (request.method === id) _tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": 'popup-to-background', "method": id, "data": data})}
  }
})();

var useragenstring = '', useragenkey = [], statustdtext = '', useragenturl = 'all_urls';
var resetInformation = function (e) {document.getElementById('status-td').textContent = statustdtext};
var updateInformation = function (e) {document.getElementById('status-td').textContent = e.target.getAttribute("title") || statustdtext};

var cleanTable = function (table) {
  var tds = table.getElementsByTagName('td');
  for (var i = 0; i < tds.length; i++) tds[i].removeAttribute('type');
};

var handleclick = function (e) {
  var UA = [];
  var update = function (UA) {
    if (UA.length === 2) {
      var title1 = document.getElementById(UA[0]).getAttribute("title") || "N/A";
      var title2 = document.getElementById(UA[1]).getAttribute("title") || "N/A";
      statustdtext = "User-Agent: " + title1 + " on " + title2;
    }
    /*  */
    if (UA.length === 1) statustdtext = "User-Agent: " + document.getElementById(UA[0]).getAttribute("title");
    else if (UA[3] === 'default') statustdtext = "User-Agent: Default";
    /*  */
    background.send('status-td-text', statustdtext);
    background.send('user-agent-id', {"id": UA, "url": useragenturl});
    document.getElementById('status-td').textContent = statustdtext;
  };
  /*  */
  var mobileBrowsers = document.getElementById('mobile-browsers');
  var desktopBrowsers = document.getElementById('desktop-browsers');
  var operatingSystems = document.getElementById('operating-systems');
  /*  */
  if (e.target.getAttribute("id") === "default") {
    UA = ['', '', 'default'];
    cleanTable(mobileBrowsers);
    cleanTable(desktopBrowsers);
    cleanTable(operatingSystems);
  }
  /*  */
  var currentTable = e.target.parentNode.parentNode.parentNode;
  cleanTable(currentTable);
  if (currentTable.getAttribute('id') === 'mobile-browsers') {
    cleanTable(desktopBrowsers);
    cleanTable(operatingSystems);
  } else cleanTable(mobileBrowsers);
  /*  */
  var id = e.target.getAttribute('id');
  var tds = document.getElementsByTagName('td');
  if (id && id !== 'default') e.target.setAttribute('type', 'selected');
  /*  */
  for (var i = 0; i < tds.length; i++) {
    var table = tds[i].parentNode.parentNode.parentNode;
    if (tds[i].getAttribute('type') === 'selected') UA.push(tds[i].getAttribute('id'));
  }
  /*  */
  if (UA.length === 1) {
    if (currentTable.getAttribute('id') === 'desktop-browsers') {
      UA.push("windowsd"); /* add windows as a default OS */
      document.getElementById("windowsd").setAttribute('type', 'selected');
    }
    if (currentTable.getAttribute('id') === 'operating-systems') {
      UA.unshift("chrome"); /* add chrome as a default browser */
      document.getElementById("chrome").setAttribute('type', 'selected');
    }
  }
  /*  */
  update(UA);
};

background.receive("storage", function (obj) {
  var initPopup = function (obj, txt, flag) {
    statustdtext = txt;
    /*  */
    var mobileBrowsers = document.getElementById('mobile-browsers');
    var desktopBrowsers = document.getElementById('desktop-browsers');
    var operatingSystems = document.getElementById('operating-systems');
    /*  */
    cleanTable(mobileBrowsers);
    cleanTable(desktopBrowsers);
    cleanTable(operatingSystems);
    /*  */
    if (obj.key[0]) {
      var elm1 = document.getElementById(obj.key[0]);
      if (flag && elm1) elm1.setAttribute('type', 'selected');
      else if (elm1) elm1.removeAttribute('type');
    }
    if (obj.key[1]) {
      var elm2 = document.getElementById(obj.key[1]);
      if (flag && elm2) elm2.setAttribute('type', 'selected');
      else if (elm2) elm2.removeAttribute('type');
    }
    /*  */
    useragenturl = obj.url;
    document.getElementById('url').value = obj.url;
    document.getElementById('status-td').textContent = statustdtext;
  };
  /*  */
  if (obj.key[2] && obj.key[2] === 'default') {
    initPopup(obj, 'User-Agent: Default', false);
  }
  else if (obj.string) {
    useragenkey = obj.key;
    useragenstring = obj.string;
    initPopup(obj, obj.text, true);
  }
  else initPopup(obj, 'User-Agent: Not Available', false);
});

var load = function () {
  background.send("load");
  window.removeEventListener("load", load, false);
  document.getElementById('default').addEventListener('click', handleclick, false);
  document.getElementById('mobile-browsers').addEventListener('click', handleclick, false);
  document.getElementById('desktop-browsers').addEventListener('click', handleclick, false);
  document.getElementById('operating-systems').addEventListener('click', handleclick, false);
  document.getElementById('faq').addEventListener('click', function () {background.send('faq')}, false);
  document.getElementById('bug').addEventListener('click', function () {background.send('bug')}, false);
  document.getElementById('reload').addEventListener('click', function () {background.send('reload')}, false);
  /*  */
  document.getElementById('copy').addEventListener('click', function () {
    var oldUA = useragenstring;
    var newUA = window.prompt("Edit this User-Agent string or Copy the string to clipboard (Ctrl C + Enter)", useragenstring);
    if (newUA && newUA !== oldUA) background.send("update-user-agent-string", {"UA": newUA, "key": useragenkey});
  }, false);
  /*  */
  document.getElementById('url').addEventListener('change', function (e) {
    useragenturl = e.target.value || 'all_urls';
    background.send('user-agent-url', useragenturl);
    e.target.value = useragenturl;
  }, false);
  /*  */
  var tds = document.querySelectorAll('td');
  for (var i = 0; i < tds.length; i++) {
    tds[i].addEventListener("mouseleave", resetInformation, false);
    tds[i].addEventListener("mouseenter", updateInformation, false);
  }
};

window.addEventListener("load", load, false);
