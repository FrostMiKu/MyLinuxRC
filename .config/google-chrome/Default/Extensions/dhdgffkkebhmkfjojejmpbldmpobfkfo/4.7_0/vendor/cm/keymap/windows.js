'use strict';(function(){var a=CodeMirror.keyMap.windows={fallthrough:"default"},b=CodeMirror.commands;a["Ctrl-Q"]="close";a.F3="findNext";a["Shift-F3"]="findPrev";a.F4="findPrev";a["Ctrl-R"]="replace";a["Ctrl-J"]="jump";a["Ctrl-D"]="deleteLine";a["Ctrl-K"]="toggleCommentIndented";b[a["Shift-Ctrl-K"]="toggleBlockComment"]=function(a){a.toggleComment({blockComment:!0})};b[a["Shift-Ctrl-D"]="duplicateLine"]=function(a){var b=a.getCursor().line;a.replaceRange(a.getLine(b)+"\n",{line:b,ch:0})};a["Ctrl-Alt-F2"]=
"toggleBookmark";a["Ctrl-F2"]="selectBookmarks";a["Shift-Ctrl-F2"]="clearBookmarks";a.F2="nextBookmark";a["Shift-F2"]="prevBookmark"})();
(function(){var a=CodeMirror.keyMap.windows={fallthrough:"default"},b=CodeMirror.commands;a["Ctrl-Q"]="close";a.F3="findNext";a["Shift-F3"]="findPrev";a.F4="findPrev";a["Ctrl-R"]="replace";a["Ctrl-J"]="jump";a["Ctrl-D"]="deleteLine";a["Ctrl-K"]="toggleComment";b[a["Shift-Ctrl-K"]="toggleBlockComment"]=function(a){a.toggleComment({blockComment:!0})};b[a["Shift-Ctrl-D"]="duplicateLine"]=function(a){var b=a.getCursor().line;a.replaceRange(a.getLine(b)+"\n",{line:b,ch:0})};a["Ctrl-Alt-F2"]="toggleBookmark";
a["Ctrl-F2"]="selectBookmarks";a["Shift-Ctrl-F2"]="clearBookmarks";a.F2="nextBookmark";a["Shift-F2"]="prevBookmark"})();
