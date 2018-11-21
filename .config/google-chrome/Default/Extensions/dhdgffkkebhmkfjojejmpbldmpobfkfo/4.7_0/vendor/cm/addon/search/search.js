'use strict';(function(b){"object"==typeof exports&&"object"==typeof module?b(require("../../lib/codemirror"),require("./searchcursor"),require("../dialog/dialog")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./searchcursor","../dialog/dialog"],b):b(CodeMirror)})(function(b){function C(a){var d=a.query;"string"==typeof d?d=new RegExp(d.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),a.caseInsensitive?"gi":"g"):d.global||(d=new RegExp(a.text,a.caseInsensitive?"gi":"g"));
return{token:function(a){d.lastIndex=a.pos;var g=d.exec(a.string);if(g&&g.index==a.pos)return a.pos+=g[0].length||1,"searching";g?a.pos=g.index:a.skipToEnd()}}}function D(){this.overlay=this.posFrom=this.posTo=this.lastPattern=this.pattern=null}function k(a){return a.state.search||(a.state.search=new D)}function n(a,d,c){var g,b="";d&&(g=d.caseInsensitive,b=d.query);return a.getSearchCursor(b,c,{caseFold:g,multiline:!0})}function E(a,d,c,b,e){return a.openDialog(d,b,{value:c,selectValueOnOpen:!0,
closeOnEnter:!1,onClose:function(){p(a)},onKeyDown:e,closeOnBlur:!1,bottom:!0})}function v(a,d,c,g,e){if(a.openDialog)return a.openDialog(d,function(a,d){b.e_stop(d);return e.apply(this,arguments)},{value:g,selectValueOnOpen:!0,closeOnBlur:!1,bottom:!0,closeOnEnter:!1});e(prompt(c,g))}function F(a,d,c,b,e,f){if(a.openConfirm)return a.openConfirm(d,b,{onKeyDown:f,onClose:e,closeOnBlur:!1});if(confirm(c))b[0]()}function m(a,d){var c=$(a.display.wrapper),b=void 0!==d?d:c.find(".CodeMirror-search-field").val(),
e=c.find(".CodeMirror-search-re-field").is(":checked"),c=!c.find(".CodeMirror-search-case-field").is(":checked"),f;if(e)try{f={query:new RegExp(b,c?"i":""),text:b,caseInsensitive:c,regex:e}}catch(h){}else f={query:b,text:b,caseInsensitive:c,regex:e};f&&f.query&&("string"==typeof f.query?""!=f.query:!f.query.test(""))||(f={query:/x^/,text:""});return f}function r(a,d,b){d.pattern=b;a.removeOverlay(d.overlay,b.caseInsensitive);d.overlay=C(b);a.addOverlay(d.overlay);a.showMatchesOnScrollbar&&(d.annotate&&
(d.annotate.clear(),d.annotate=null),d.annotate=a.showMatchesOnScrollbar(b.query,b.caseInsensitive))}function y(a,b){return a.query==b.query&&a.regex==b.regex&&a.caseInsensitive==b.caseInsensitive}function w(a,d,c,g){var e,f,h=k(a);if(h.pattern&&(f=m(a))){if(y(h.pattern,f))return t(a,d)}else f=f||a.getSelection()||h.lastPattern||"";"string"==typeof f&&(f=m(a,f));f.query instanceof RegExp&&"x^"==f.query.source&&(f=null);if(c&&a.openDialog){var x=null,n=function(d,c){var e=m(a);b.e_stop(c);h.pattern&&
y(h.pattern,h)||(r(a,h,e),h.posFrom=h.posTo=a.getCursor());x&&(x.style.opacity=1);t(a,c.shiftKey,function(b,d){var c;3>d.line&&document.querySelector&&(c=a.display.wrapper.querySelector(".CodeMirror-dialog"))&&c.getBoundingClientRect().bottom-4>a.cursorCoords(d,"window").top&&((x=c).style.opacity=.4)})};h.pattern||(q(a),e=E(a,z(f),f?f.text:"",n,function(d,c){var e=b.keyName(d),f=a.getOption("extraKeys"),e=f&&f[e]||b.keyMap[a.getOption("keyMap")][e],f=m(a);if(!(f.query instanceof RegExp&&"x^"==f.query.source))if("findNext"==
e||"findPrev"==e||"findPersistentNext"==e||"findPersistentPrev"==e)b.e_stop(d),r(a,k(a),f),a.execCommand(e);else if("find"==e||"findPersistent"==e)b.e_stop(d),n(c,d)}));g&&f&&(r(a,h,f),t(a,d))}else q(a),e=v(a,z(),b.I18N.getMessage("Search_for")+":",f,function(b){b&&!h.pattern&&a.operation(function(){r(a,h,m(a));h.posFrom=h.posTo=a.getCursor();t(a,d)})});e&&u(a,{close:function(){e();h.dialog=null}});c=$(a.display.wrapper);c.find(".CodeMirror-search-find-button").on("click",function(){b.commands.findNext(a)});
c.find(".CodeMirror-search-find-prev-button").on("click",function(){b.commands.findPrev(a)});c.find(".CodeMirror-search-close-button").on("click",function(){h.dialog&&h.dialog.close&&h.dialog.close()})}function t(a,d,c){a.operation(function(){var g=k(a),e=n(a,g.pattern,d?g.posFrom:g.posTo);if(!e.find(d)&&(e=n(a,g.pattern,d?b.Pos(a.lastLine()):b.Pos(a.firstLine(),0)),!e.find(d)))return;a.setSelection(e.from(),e.to());a.scrollIntoView({from:e.from(),to:e.to()},20);g.posFrom=e.from();g.posTo=e.to();
c&&c(e.from(),e.to())})}function p(a){return a.operation(function(){var b,c=k(a);if(!c.closing){c.dialog&&(c.closing=!0,c.dialog.close(),c.closing=!1,b=!0);c.lastPattern=c.pattern;if(!c.pattern)return b;c.pattern=null;a.removeOverlay(c.overlay);c.annotate&&(c.annotate.clear(),c.annotate=null);return!0}})}function A(a,b,c){a.operation(function(){for(var g=n(a,b);g.findNext();)if("string"!=typeof query){var e=a.getRange(g.from(),g.to()).match(b.query);g.replace(c.replace(/\$(\d)/g,function(a,b){return e[b]}))}else g.replace(c)})}
function B(a,d){if(!a.getOption("readOnly")){var c=a.getSelection()||k(a).lastPattern||"";"string"==typeof c&&(c=m(a,c));var g=k(a),e=(d?b.I18N.getMessage("Replace_all_with"):b.I18N.getMessage("Replace"))+":";q(a);var f=v(a,e+' <input type="text" style="width: 40em" class="CodeMirror-search-field"/> <input type="checkbox" style="width: auto" class="CodeMirror-search-re-field"/> <span style="color: #888" class="CodeMirror-search-hint">.*</span> <input type="checkbox" style="width: auto" class="CodeMirror-search-case-field"/> <span style="color: #888" class="CodeMirror-search-hint">Aa</span>',
e,c.text,function(c){if(c){var e=m(a);q(a);var f=v(a,'<span class="CodeMirror-search-label">'+b.I18N.getMessage("Replace_with")+':</span> <input type="text" style="width: 40em" class="CodeMirror-search-field"/>',b.I18N.getMessage("Replace_with")+":","",function(f){if(d)A(a,e,f);else{p(a);var l=n(a,e,a.getCursor("from")),k=function(){var c=l.from(),d;if(!(d=l.findNext())&&(l=n(a,e),!(d=l.findNext())||c&&l.from().line==c.line&&l.from().ch==c.ch))return;a.setSelection(l.from(),l.to());a.showInCenter?
a.showInCenter():a.scrollIntoView({from:l.from(),to:l.to()});window.setTimeout(function(){q(a);var c=F(a,'<span class="CodeMirror-search-label">'+b.I18N.getMessage("Replace_")+"</span><button>"+b.I18N.getMessage("Yes")+"</button><button>"+b.I18N.getMessage("No")+"</button><button>"+b.I18N.getMessage("Replace_All")+"</button><button>"+b.I18N.getMessage("Stop")+"</button>",b.I18N.getMessage("Replace_"),[function(){m(d)},k,function(){A(a,e,f)}],function(a){g.dialog=null},function(c){if("Esc"==b.keyName(c))return b.e_stop(c),
p(a)});c&&u(a,{close:function(){c();g.dialog=null}})},1)},m=function(a){l.replace("string"==typeof c?f:f.replace(/\$(\d)/g,function(b,c){return a[c]}));k()};k()}});f&&u(a,{close:function(){f();g.dialog=null}})}});f&&u(a,{close:function(){f();g.dialog=null}})}}var z=function(a){return'<span class="CodeMirror-search-label">'+b.I18N.getMessage("Search_for")+':</span> <input type="text" style="width: 40em" class="CodeMirror-search-field"/> <input type="checkbox" style="width: auto" class="CodeMirror-search-re-field" '+
(a&&a.regex?"checked":"")+' /> <span style="color: #888" class="CodeMirror-search-hint">.*</span> <input type="checkbox" style="width: auto" class="CodeMirror-search-case-field" '+(a&&a.caseInsensitive?"checked":"")+' /> <span style="color: #888" class="CodeMirror-search-hint">Aa</span><button class="CodeMirror-search-find-button">'+b.I18N.getMessage("Find_Next")+'</button><button class="CodeMirror-search-find-prev-button">'+b.I18N.getMessage("Find_Previous")+'</button><button class="CodeMirror-search-close-button">'+
b.I18N.getMessage("Close")+"</button>"},q=function(a){a=k(a);a.dialog&&(a.closing=!0,a.dialog.close(),a.closing=!1)},u=function(a,b){k(a).dialog=b};b.commands.find=b.commands.findPersistent=function(a){p(a);w(a,!1,!0)};b.commands.findNext=b.commands.findPersistentNext=function(a){w(a,!1,!0,!0)};b.commands.findPrev=b.commands.findPersistentPrev=function(a){w(a,!0,!0,!0)};b.commands.clearSearch=p;b.commands.replace=B;b.commands.replaceAll=function(a){B(a,!0)}});