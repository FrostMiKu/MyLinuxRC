"use strict";page.setI18nTitle();var deleteApp=new Vue({el:"#delete_app"});window.onload=function(){document.getElementsByTagName("body")[0].offsetHeight<540?$(".delete-box").removeClass("delete-box-size"):$(".delete-box").addClass("delete-box-size"),window.onresize=function(){document.getElementsByTagName("body")[0].offsetHeight<540?$(".delete-box").removeClass("delete-box-size"):$(".delete-box").addClass("delete-box-size")};var t=infinity.get("infinity-user");$("#email").val(t.email),$("#pwd").bind("input propertychange change",function(){0<$(this).val().length?$(".register-input-clear").show(100):$(".register-input-clear").hide(100)}),$(".register-input-clear").click(function(){$(this).hide(100),$("#pwd").val("")}),$("#btn").click(function(){t.password,md5($("#pwd").val());var e={username:$("#email").val(),password:md5($("#pwd").val())};$.ajax({type:"get",url:"https://api.infinitynewtab.com/deleteuser",data:e,dataType:"json",success:function(e){200==e.code&&(infinity.set("infinity-user",{isLogin:!1,avatar:"",gender:"",name:"",secret:"",uid:"",email:"",password:"","user-backup":0,"auto-backup":0,"auto-backup-data":0,"auto-backup-icon":0,"auto-backup-wallpaper":0}),infinity.sendMessage("accountDeleteSuccess"),window.close())}})})};