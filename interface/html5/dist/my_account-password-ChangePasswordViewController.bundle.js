(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["my_account-password-ChangePasswordViewController"],{1968:(e,s,i)=>{"use strict";i.r(s),i.d(s,{"ChangePasswordViewController":()=>t});class t extends BaseViewController{constructor(e={}){_.defaults(e,{showPassword:null,showPhonePassword:null,result_data:[]}),super(e)}init(e){this.permission_id="user",this.viewId="ChangePassword",this.script_name="ChangePasswordView",this.context_menu_name=$.i18n._("Passwords"),this.api=TTAPI.APIUser,this.initPermission(),this.render(),this.initData()}initPermission(){super.initPermission(),PermissionManager.validate("user","edit_own_password")?this.showPassword=!0:this.showPassword=!1,PermissionManager.validate("user","edit_own_phone_password")?this.showPhonePassword=!0:this.showPhonePassword=!1}render(){super.render()}getCustomContextMenuModel(){return{exclude:["default"],include:[ContextMenuIconName.save,ContextMenuIconName.cancel]}}saveValidate(e,s){}setCurrentEditRecordData(){for(var e in this.current_edit_record){var s=this.edit_view_ui_dic[e];if(Global.isSet(s))switch(e){case"user_name":s.setValue(LocalCacheData.loginUser.user_name);break;case"phone_id":LocalCacheData.loginUser.phone_id?s.setValue(LocalCacheData.loginUser.phone_id):s.setValue($.i18n._("Not Specified"));break;default:s.setValue(this.current_edit_record[e])}}this.collectUIDataToCurrentEditRecord(),this.setEditViewDataDone()}openEditView(){var e=this;e.edit_only_mode&&(this.showPassword||this.showPhonePassword)&&(e.buildContextMenu(),e.edit_view||e.initEditViewUI("ChangePassword","ChangePasswordEditView.html"),e.current_edit_record={},e.initEditView())}checkTabPermissions(e){var s=!1;switch(e){case"tab_web_password":this.showPassword&&(s=!0);break;case"tab_quick_punch_password":this.showPhonePassword&&(s=!0);break;default:s=super.checkTabPermissions(e)}return s}onFormItemChange(e,s){this.setIsChanged(e),this.setMassEditingFieldsWhenFormChange(e);var i=e.getField(),t=e.getValue();this.current_edit_record[i]=t}onSaveClick(e){var s=this,i=this.current_edit_record;LocalCacheData.current_doing_context_action="save",Global.isSet(e)||(e=!1),this.clearErrorTips();var t=this.getEditViewTabIndex();0===t?i["web.current_password"]?s.saveWebPassword(i,(function(e){e.isValid()?s.removeEditView():s.showErrorTips(e,0)})):(TAlertManager.showAlert($.i18n._("Current password must be specified")),ProgressBar.closeOverlay()):1===t&&(i["phone.current_password"]?s.savePhonePassword(i,(function(e){e.isValid()?s.removeEditView():s.showErrorTips(e,1)})):(TAlertManager.showAlert($.i18n._("Current web password must be specified")),ProgressBar.closeOverlay()))}showErrorTips(e,s){var i,t=e.getDetails(),r=!1;for(var a in t){if(0===parseInt(s)){if(!this.current_edit_record["web.current_password"])continue;i="web."+a}if(1===parseInt(s)){if(!this.current_edit_record["phone.current_password"])continue;i="phone."+a.replace("phone_","")}t.hasOwnProperty(a)&&(Global.isSet(this.edit_view_ui_dic[i])&&(this.edit_view_ui_dic[i].is(":visible")&&(this.edit_view_ui_dic[i].setErrorStyle(t[a],!0),r=!0),this.edit_view_error_ui_dic[i]=this.edit_view_ui_dic[i]))}r||this.showEditViewError(e)}saveWebPassword(e,s){this.api.changePassword(e["web.current_password"],e["web.password"],e["web.password2"],"user_name",{onResult:function(e){s(e)}})}savePhonePassword(e,s){this.api.changePassword(e["phone.current_password"],e["phone.password"],e["phone.password2"],"quick_punch_id",{onResult:function(e){s(e)}})}buildEditViewUI(){super.buildEditViewUI();var e={"tab_web_password":{"label":$.i18n._("Web Password")},"tab_quick_punch_password":{"label":$.i18n._("Quick Punch Password")}};this.setTabModel(e);var s=this.edit_view_tab.find("#tab_web_password").find(".first-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(s);var i=Global.loadWidgetByName(FormItemType.TEXT);i.TText({field:"user_name"}),this.addEditFieldToColumn($.i18n._("User Name"),i,s,""),(i=Global.loadWidgetByName(FormItemType.PASSWORD_INPUT)).TPasswordInput({field:"web.current_password",width:200}),this.addEditFieldToColumn($.i18n._("Current Password"),i,s),(i=Global.loadWidgetByName(FormItemType.PASSWORD_INPUT)).TPasswordInput({field:"web.password",width:200}),this.addEditFieldToColumn($.i18n._("New Password"),i,s),(i=Global.loadWidgetByName(FormItemType.PASSWORD_INPUT)).TPasswordInput({field:"web.password2",width:200}),this.addEditFieldToColumn($.i18n._("New Password (Confirm)"),i,s,"");var t=this.edit_view_tab.find("#tab_quick_punch_password").find(".first-column");this.edit_view_tabs[1]=[],this.edit_view_tabs[1].push(t),(i=Global.loadWidgetByName(FormItemType.TEXT)).TText({field:"phone_id"}),this.addEditFieldToColumn($.i18n._("Quick Punch ID"),i,t,""),(i=Global.loadWidgetByName(FormItemType.PASSWORD_INPUT)).TPasswordInput({field:"phone.current_password",width:200}),this.addEditFieldToColumn($.i18n._("Current Web Password"),i,t),(i=Global.loadWidgetByName(FormItemType.PASSWORD_INPUT)).TPasswordInput({field:"phone.password",width:200}),this.addEditFieldToColumn($.i18n._("New Quick Punch Password"),i,t),(i=Global.loadWidgetByName(FormItemType.PASSWORD_INPUT)).TPasswordInput({field:"phone.password2",width:200}),this.addEditFieldToColumn($.i18n._("New Quick Punch Password (Confirm)"),i,t,"")}}}}]);
//# sourceMappingURL=my_account-password-ChangePasswordViewController.bundle.js.map?v=0726471c8326e1e9767a