(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["attendance-in_out-InOutViewController"],{1690:(t,e,i)=>{"use strict";i.r(e),i.d(e,{"InOutViewController":()=>a});class a extends BaseViewController{constructor(t={}){_.defaults(t,{type_array:null,job_api:null,job_item_api:null,old_type_status:{},show_job_ui:!1,show_job_item_ui:!1,show_branch_ui:!1,show_department_ui:!1,show_good_quantity_ui:!1,show_bad_quantity_ui:!1,show_transfer_ui:!1,show_node_ui:!1,original_note:!1,new_note:!1}),super(t)}init(t){Global.setUINotready(!0),this.permission_id="punch",this.viewId="InOut",this.script_name="InOutView",this.table_name_key="punch",this.context_menu_name=$.i18n._("In/Out"),this.api=TTAPI.APIPunch,Global.getProductEdition()>=20&&(this.job_api=TTAPI.APIJob,this.job_item_api=TTAPI.APIJobItem),this.render(),this.buildContextMenu(),this.initPermission(),this.initData(),this.is_changed=!0}getCustomContextMenuModel(){return{exclude:["default"],include:[ContextMenuIconName.save,ContextMenuIconName.cancel]}}addPermissionValidate(t){return Global.isSet(t)||(t=this.permission_id),"report"===t||!!PermissionManager.validate(t,"punch_in_out")}jobUIValidate(){return!(!PermissionManager.validate("job","enabled")||!PermissionManager.validate("punch","edit_job"))}jobItemUIValidate(){return!!PermissionManager.validate("punch","edit_job_item")}branchUIValidate(){return!!PermissionManager.validate("punch","edit_branch")}departmentUIValidate(){return!!PermissionManager.validate("punch","edit_department")}goodQuantityUIValidate(){return!!PermissionManager.validate("punch","edit_quantity")}badQuantityUIValidate(){return!(!PermissionManager.validate("punch","edit_quantity")||!PermissionManager.validate("punch","edit_bad_quantity"))}transferUIValidate(){return!!PermissionManager.validate("punch","edit_transfer")}noteUIValidate(){return!!PermissionManager.validate("punch","edit_note")}initPermission(){this.jobUIValidate()?this.show_job_ui=!0:this.show_job_ui=!1,this.jobItemUIValidate()?this.show_job_item_ui=!0:this.show_job_item_ui=!1,this.branchUIValidate()?this.show_branch_ui=!0:this.show_branch_ui=!1,this.departmentUIValidate()?this.show_department_ui=!0:this.show_department_ui=!1,this.goodQuantityUIValidate()?this.show_good_quantity_ui=!0:this.show_good_quantity_ui=!1,this.badQuantityUIValidate()?this.show_bad_quantity_ui=!0:this.show_bad_quantity_ui=!1,this.transferUIValidate()?this.show_transfer_ui=!0:this.show_transfer_ui=!1,this.noteUIValidate()?this.show_node_ui=!0:this.show_node_ui=!1;var t=!1,e=TTAPI.APICompany;e&&_.isFunction(e.isBranchAndDepartmentAndJobAndJobItemEnabled)&&(t=e.isBranchAndDepartmentAndJobAndJobItemEnabled({async:!1})),t?((t=t.getResult()).branch||(this.show_branch_ui=!1),t.department||(this.show_department_ui=!1),t.job||(this.show_job_ui=!1),t.job_item||(this.show_job_item_ui=!1)):(this.show_branch_ui=!1,this.show_department_ui=!1,this.show_job_ui=!1,this.show_job_item_ui=!1),this.show_job_ui||this.show_job_item_ui||(this.show_bad_quantity_ui=!1,this.show_good_quantity_ui=!1)}render(){super.render()}initOptions(t){this.initDropDownOptions([{option_name:"type"},{option_name:"status"}],(function(e){t&&t(e)}))}getUserPunch(t){var e=this,i=Global.getStationID(),a=TTAPI.APIStation;function s(i){if(e.api&&"function"==typeof e.api.getUserPunch){var a=i.getResult();Global.setStationID(a),e.api.getUserPunch({onResult:function(i){var a=i.getResult();if(!0===Global.UNIT_TEST_MODE&&(a.punch_date="UNITTEST",a.punch_time="UNITTEST"),!i.isValid())return TAlertManager.showErrorAlert(i),void e.onCancelClick(!0);Global.isSet(a)?t(a):e.onCancelClick()}})}}i?a.getCurrentStation(i,"10",{onResult:function(t){s(t)}}):a.getCurrentStation("","10",{onResult:function(t){s(t)}})}onCancelClick(t){this.is_changed=!0,super.onCancelClick(t)}openEditView(){var t=this;this.edit_only_mode&&this.api&&this.initOptions((function(e){t.edit_view||t.initEditViewUI("InOut","InOutEditView.html"),t.getUserPunch((function(e){t.current_edit_record=e,!0===Global.UNIT_TEST_MODE&&(t.current_edit_record.punch_date="UNITTEST",t.current_edit_record.punch_time="UNITTEST"),t.initEditView()}))}))}onFormItemChange(t,e){this.setIsChanged(t),this.setMassEditingFieldsWhenFormChange(t);var i=t.getField(),a=t.getValue();switch(this.current_edit_record[i]=a,i){case"transfer":this.onTransferChanged();break;case"job_id":Global.getProductEdition()>=20&&(this.edit_view_ui_dic.job_quick_search.setValue(t.getValue(!0)&&t.getValue(!0).manual_id?t.getValue(!0).manual_id:""),this.setJobItemValueWhenJobChanged(t.getValue(!0),"job_item_id",{status_id:10,job_id:this.current_edit_record.job_id}),this.edit_view_ui_dic.job_quick_search.setCheckBox(!0));break;case"job_item_id":Global.getProductEdition()>=20&&(this.edit_view_ui_dic.job_item_quick_search.setValue(t.getValue(!0)&&t.getValue(!0).manual_id?t.getValue(!0).manual_id:""),this.edit_view_ui_dic.job_item_quick_search.setCheckBox(!0));break;case"job_quick_search":case"job_item_quick_search":Global.getProductEdition()>=20&&(this.onJobQuickSearch(i,a),e=!0)}e||this.validate()}onTransferChanged(t){var e=!1;this.edit_view_ui_dic&&this.edit_view_ui_dic.transfer&&1==this.edit_view_ui_dic.transfer.getValue()&&(e=!0);var i=this.edit_view_ui_dic.type_id,a=this.edit_view_ui_dic.status_id;e&&i&&a?(i.setEnabled(!1),a.setEnabled(!1),this.old_type_status.type_id=i.getValue(),this.old_type_status.status_id=a.getValue(),i.setValue(10),a.setValue(10),this.current_edit_record.type_id=10,this.current_edit_record.status_id=10):i&&a&&(i.setEnabled(!0),a.setEnabled(!0),this.old_type_status.hasOwnProperty("type_id")&&(i.setValue(this.old_type_status.type_id),a.setValue(this.old_type_status.status_id),this.current_edit_record.type_id=this.old_type_status.type_id,this.current_edit_record.status_id=this.old_type_status.status_id)),1==e?(""==this.original_note?this.original_note=this.current_edit_record.note:this.original_note=this.edit_view_ui_dic.note.getValue(),this.edit_view_ui_dic.note.setValue(this.new_note?this.new_note:""),this.current_edit_record.note=this.new_note?this.new_note:""):void 0!==t&&!1!==t||(this.new_note=this.edit_view_ui_dic.note.getValue(),this.edit_view_ui_dic.note.setValue(this.original_note?this.original_note:""),this.current_edit_record.note=this.original_note?this.original_note:"")}validate(){var t=this,e={};if(this.is_mass_editing){for(var i in this.edit_view_ui_dic)if(this.edit_view_ui_dic.hasOwnProperty(i)){var a=this.edit_view_ui_dic[i];Global.isSet(a.isChecked)&&a.isChecked()&&a.getEnabled()&&(e[i]=a.getValue())}}else e=this.current_edit_record;e=this.uniformVariable(e),this.api.setUserPunch(e,!0,{onResult:function(e){t.validateResult(e)}})}doSaveAPICall(t,e,i){var a=this.getCurrentAPI();return i||(i={onResult:function(t){this.onSaveResult(t)}.bind(this)}),a.setIsIdempotent(!0),a.setUserPunch(t,!1,e,i)}onSaveResult(t){super.onSaveResult(t),LocalCacheData.current_open_primary_controller&&"TimeSheet"===LocalCacheData.current_open_primary_controller.viewId&&LocalCacheData.current_open_primary_controller.search()}setErrorMenu(){for(var t=this.context_menu_array.length,e=0;e<t;e++){var i=$(this.context_menu_array[e]),a=$(i.find(".ribbon-sub-menu-icon")).attr("id");switch(i.removeClass("disable-image"),a){case ContextMenuIconName.cancel:break;default:i.addClass("disable-image")}}}getOtherFieldReferenceField(){return"note"}buildEditViewUI(){super.buildEditViewUI();var t={"tab_punch":{"label":$.i18n._("Punch")},"tab_audit":!0};this.setTabModel(t);var e,i,a=this.edit_view_tab.find("#tab_punch").find(".first-column");if(this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(a),(e=Global.loadWidgetByName(FormItemType.TEXT)).TText({field:"user_id_readonly"}),this.addEditFieldToColumn($.i18n._("Employee"),e,a,""),(e=Global.loadWidgetByName(FormItemType.TIME_PICKER)).TTimePicker({field:"punch_time"}),this.addEditFieldToColumn($.i18n._("Time"),e,a),(e=Global.loadWidgetByName(FormItemType.DATE_PICKER)).TDatePicker({field:"punch_date"}),this.addEditFieldToColumn($.i18n._("Date"),e,a),(e=Global.loadWidgetByName(FormItemType.CHECKBOX)).TCheckbox({field:"transfer"}),this.addEditFieldToColumn($.i18n._("Transfer"),e,a,"",null,!0),this.show_transfer_ui||this.detachElement("transfer"),(e=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"type_id"}),e.setSourceData(this.type_array),this.addEditFieldToColumn($.i18n._("Punch Type"),e,a),(e=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"status_id"}),e.setSourceData(this.status_array),this.addEditFieldToColumn($.i18n._("In/Out"),e,a),(e=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIBranch,allow_multiple_selection:!1,layout_name:"global_branch",show_search_inputs:!0,set_empty:!0,field:"branch_id"}),this.addEditFieldToColumn($.i18n._("Branch"),e,a,"",null,!0),this.show_branch_ui||this.detachElement("branch_id"),(e=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIDepartment,allow_multiple_selection:!1,layout_name:"global_department",show_search_inputs:!0,set_empty:!0,field:"department_id"}),this.addEditFieldToColumn($.i18n._("Department"),e,a,"",null,!0),this.show_department_ui||this.detachElement("department_id"),Global.getProductEdition()>=20){(e=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIJob,allow_multiple_selection:!1,layout_name:"global_job",show_search_inputs:!0,set_empty:!0,setRealValueCallBack:function(t){t&&s.setValue(t.manual_id)},field:"job_id"}),i=$("<div class='widget-h-box'></div>");var s=Global.loadWidgetByName(FormItemType.TEXT_INPUT);s.TTextInput({field:"job_quick_search",disable_keyup_event:!0}),s.addClass("job-coder"),i.append(s),i.append(e),this.addEditFieldToColumn($.i18n._("Job"),[e,s],a,"",i,!0),this.show_job_ui||this.detachElement("job_id"),(e=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIJobItem,allow_multiple_selection:!1,layout_name:"global_job_item",show_search_inputs:!0,set_empty:!0,setRealValueCallBack:function(t){t&&n.setValue(t.manual_id)},field:"job_item_id"}),i=$("<div class='widget-h-box'></div>");var n=Global.loadWidgetByName(FormItemType.TEXT_INPUT);n.TTextInput({field:"job_item_quick_search",disable_keyup_event:!0}),n.addClass("job-coder"),i.append(n),i.append(e),this.addEditFieldToColumn($.i18n._("Task"),[e,n],a,"",i,!0),this.show_job_item_ui||this.detachElement("job_item_id")}if(Global.getProductEdition()>=20){var o=Global.loadWidgetByName(FormItemType.TEXT_INPUT);o.TTextInput({field:"quantity",width:40}),o.addClass("quantity-input");var _=$("<span class='widget-right-label'>"+$.i18n._("Good")+": </span>"),d=Global.loadWidgetByName(FormItemType.TEXT_INPUT);d.TTextInput({field:"bad_quantity",width:40}),d.addClass("quantity-input");var r=$("<span class='widget-right-label'>/ "+$.i18n._("Bad")+": </span>");(i=$("<div class='widget-h-box'></div>")).append(_),i.append(o),i.append(r),i.append(d),this.addEditFieldToColumn($.i18n._("Quantity"),[o,d],a,"",i,!0),this.show_bad_quantity_ui||this.show_good_quantity_ui?(this.show_bad_quantity_ui||(r.hide(),d.hide()),this.show_good_quantity_ui||(_.hide(),o.hide())):this.detachElement("quantity")}(e=Global.loadWidgetByName(FormItemType.TEXT_AREA)).TTextArea({field:"note",width:"100%"}),this.addEditFieldToColumn($.i18n._("Note"),e,a,"",null,!0,!0),e.parent().width("45%"),this.show_node_ui||this.detachElement("note")}setCurrentEditRecordData(){for(var t in this.old_type_status={},this.current_edit_record)if(this.current_edit_record.hasOwnProperty(t)){var e=this.edit_view_ui_dic[t];if(Global.isSet(e))switch(t){case"user_id_readonly":e.setValue(this.current_edit_record.first_name+" "+this.current_edit_record.last_name);break;case"job_id":if(Global.getProductEdition()>=20)(i={}).filter_data={status_id:10,user_id:this.current_edit_record.user_id},e.setDefaultArgs(i),e.setValue(this.current_edit_record[t]);break;case"job_item_id":var i;if(Global.getProductEdition()>=20)(i={}).filter_data={status_id:10,job_id:this.current_edit_record.job_id},e.setDefaultArgs(i),e.setValue(this.current_edit_record[t]);break;case"job_quick_search":case"job_item_quick_search":case"transfer":break;case"punch_time":case"punch_date":e.setEnabled(!1),e.setValue(this.current_edit_record[t]);break;default:e.setValue(this.current_edit_record[t])}}this.show_transfer_ui&&this.edit_view_ui_dic.transfer&&this.edit_view_ui_dic.transfer.setValue(this.current_edit_record.transfer),this.onTransferChanged(!0),this.collectUIDataToCurrentEditRecord(),this.setEditViewDataDone()}setEditViewDataDone(){super.setEditViewDataDone(),this.confirm_on_exit=!0}}a.loadView=function(){Global.loadViewSource("InOut","InOutView.html",(function(t){var e=_.template(t);Global.contentContainer().html(e({}))}))}}}]);
//# sourceMappingURL=attendance-in_out-InOutViewController.bundle.js.map?v=18032d367bd0ce78d197