"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},infinityApi="https://api.infinitynewtab.com";function sendAjax(t,i,e,n){$.ajax({type:t,url:infinityApi+i,dataType:"json",data:e,success:function(t){n&&n(t)},error:function(){n&&n("error")}})}Vue.component("input-box",{template:"#J-input-box-template",props:{inputType:{type:String,default:"text"},info:{type:String},verify:{type:String,default:""},isSubmit:{type:Object},inputWith:{type:String},notes:{type:Boolean}},data:function(){return{inputContent:"",inputDeleteContent:!1,inputNote:""}},watch:{notes:function(t,i){t&&(this.inputNote=this.info+infinity.i18n("does_not_exist"))},inputContent:function(t,i){this.verifyInputContent(),0<t.length?this.inputDeleteContent=!0:this.inputDeleteContent=!1,""!==this.verify&&4<=t.length&&(this.inputContent=t.substring(0,4),this.inputNote=md5(this.inputContent)===this.verify?"":infinity.i18n("invalid_verification_code_title"))},verify:function(t,i){this.inputContent="",this.inputNote=""}},methods:{deleteContent:function(){this.inputContent=""},verifyMethods:function(){this.inputContent.length<4&&(this.inputNote=infinity.i18n("invalid_verification_code_title")),md5(this.inputContent)===this.verify?(this.isSubmit.yzm=this.inputContent,this.isSubmit.YzmVerifyTrue=!0):this.isSubmit.YzmVerifyTrue=!1},email:function(){/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i.test(this.inputContent)?(this.notes=!1,this.inputNote="",this.isSubmit.notes=!1,this.isSubmit.emailVerifyTrue=!0,this.isSubmit.email=this.inputContent):this.inputNote=infinity.i18n("format_error")},password:function(){/^[A-Za-z0-9_]{6,20}$/.test(this.inputContent)?(this.inputNote="",this.isSubmit.Pwd=!0,void 0!==_typeof(this.isSubmit.pwdContent)&&(this.isSubmit.pwdContent=this.inputContent)):this.inputNote=infinity.i18n("password_min")},emailVerify:function(){this.inputContent&&(this.isSubmit.emailVerifyTrue=!0,this.isSubmit.emailVerify=this.inputContent)},verifyInputContent:function(){this.verify&&this.verifyMethods(),"email"==this.inputType&&this.email(),"password"==this.inputType&&this.password(),"emailVerify"==this.inputType&&this.emailVerify()}}});var findPassword=new Vue({el:"#app",template:"#J-find-password-template",data:{screenSize:!0,verify:"",isSubmit:{YzmVerifyTrue:!1,yzm:"",emailVerifyTrue:!1,email:"",notes:!1},setNewPwd:{emailVerifyTrue:!1,emailVerify:"",Pwd:!1,pwdContent:""},isSendEmail:!1,isLoading:!1},created:function(){sendAjax("get","/verify.php",{},function(t){$("#verify").attr("src",t.img),this.verify=t.code}.bind(this))},mounted:function(){var t=document.getElementsByTagName("body")[0].offsetHeight;this.screenSize=!(t<500),window.onresize=function(t){var i=document.getElementsByTagName("body")[0].offsetHeight;this.screenSize=!(i<500)}.bind(this)},methods:{changeVerify:function(){sendAjax("get","/verify.php",{},function(t){this.yzmIsTrue=!1,$("#verify").attr("src",t.img),this.verify=t.code}.bind(this))},submitDate:function(){this.isSubmit.emailVerifyTrue&&this.isSubmit.YzmVerifyTrue&&sendAjax("get","/checkName.php?name="+this.isSubmit.email,{},function(t){if("3"==t.message){if(this.isLoading)return;this.isLoading=!0,sendAjax("post","/v2/resetPassword.php",{verifyCode:this.isSubmit.yzm,email:this.isSubmit.email},function(t){"1"==t.message&&(this.isSendEmail=!0,this.isLoading=!1,setTimeout(function(){$("#email-rev-input").find("input")[0].focus()},100))}.bind(this))}else this.isSubmit.notes=!0}.bind(this))},setNewPwdMethods:function(){this.setNewPwd.Pwd&&this.setNewPwd.emailVerifyTrue&&sendAjax("post","/v2/RePassword.php",{newpass:this.setNewPwd.pwdContent,resetCode:this.setNewPwd.emailVerify},function(t){"ok"==t.status?(window.opener=null,window.open("","_self"),window.close()):window.location.reload}.bind(this))}}});