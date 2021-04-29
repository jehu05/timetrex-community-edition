(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["hr-recruitment-RecruitmentPortalConfigViewController"],{1183:(e,a,i)=>{"use strict";i.r(a),i.d(a,{"RecruitmentPortalConfigViewController":()=>t});class t extends BaseViewController{constructor(e={}){_.defaults(e,{company_api:null,job_applicant_fields_array:null,job_applicant_background_fields_array:null,job_applicant_availability_fields_array:null,job_applicant_employment_history_fields_array:null,job_applicant_reference_fields_array:null,job_applicant_location_fields_array:null,job_applicant_skill_fields_array:null,job_applicant_education_fields_array:null,job_applicant_membership_fields_array:null,job_applicant_license_fields_array:null,job_applicant_language_fields_array:null,job_applicant_add_qualification_array:null}),super(e)}init(e){this.permission_id="job_applicant",this.viewId="RecruitmentPortalConfig",this.script_name="RecruitmentPortalConfigView",this.table_name_key="recruitment_portal_config",this.context_menu_name=$.i18n._("Portal Setting"),this.api=TTAPI.APIRecruitmentPortalConfig,this.company_api=TTAPI.APICompany,this.render(),this.buildContextMenu(),this.initData()}render(){super.render()}getCustomContextMenuModel(){return{exclude:["default"],include:[ContextMenuIconName.save,ContextMenuIconName.cancel,ContextMenuIconName.export_excel]}}initOptions(e){var a=[{option_name:"job_applicant_fields",field_name:"job_applicant_fields",api:this.api},{option_name:"job_applicant_background_fields",field_name:"job_applicant_background_fields",api:this.api},{option_name:"job_applicant_availability_fields",field_name:"job_applicant_availability_fields",api:this.api},{option_name:"job_applicant_employment_history_fields",field_name:"job_applicant_employment_history_fields",api:this.api},{option_name:"job_applicant_reference_fields",field_name:"job_applicant_reference_fields",api:this.api},{option_name:"job_applicant_location_fields",field_name:"job_applicant_location_fields",api:this.api},{option_name:"job_applicant_skill_fields",field_name:"job_applicant_skill_fields",api:this.api},{option_name:"job_applicant_education_fields",field_name:"job_applicant_education_fields",api:this.api},{option_name:"job_applicant_membership_fields",field_name:"job_applicant_membership_fields",api:this.api},{option_name:"job_applicant_license_fields",field_name:"job_applicant_license_fields",api:this.api},{option_name:"job_applicant_language_fields",field_name:"job_applicant_language_fields",api:this.api},{option_name:"job_applicant_add_qualification",field_name:"enable_add_qualification",api:this.api}];this.initDropDownOptions(a,(function(a){e&&e(a)}))}getCustomContextMenuModel(){return{exclude:["default"],include:[ContextMenuIconName.save,ContextMenuIconName.cancel]}}getRecruitmentPortalConfigData(e){var a=this;a.api["get"+a.api.key_name]({onResult:function(i){var t=i.getResult();Global.isSet(t[0])?e(t[0]):a.api["get"+a.api.key_name+"DefaultData"]({onResult:function(a){var i=a.getResult();e(i)}})}})}openEditView(){var e=this;e.edit_only_mode&&e.initOptions((function(a){e.edit_view||e.initEditViewUI("RecruitmentPortalConfig","RecruitmentPortalConfigEditView.html"),e.getRecruitmentPortalConfigData((function(a){e.current_edit_record=a,e.initEditView()}))}))}onFormItemChange(e,a){this.setIsChanged(e),this.setMassEditingFieldsWhenFormChange(e);var i=e.getField(),t=e.getValue();this.current_edit_record[i]=t,a||this.validate()}onSaveClick(e){var a=this,i=this.current_edit_record;Global.isSet(e)||(e=!1),LocalCacheData.current_doing_context_action="save",this.api["set"+this.api.key_name](i,!1,e,{onResult:function(e){if(e.isValid()){var i=e.getResult();!0===i?a.refresh_id=a.current_edit_record.id:TTUUID.isUUID(i)&&i!=TTUUID.zero_id&&i!=TTUUID.not_exist_id&&(a.refresh_id=i),a.removeEditView()}else a.setErrorTips(e),a.setErrorMenu()}})}setErrorMenu(){for(var e=this.context_menu_array.length,a=0;a<e;a++){var i=$(this.context_menu_array[a]),t=$(i.find(".ribbon-sub-menu-icon")).attr("id");switch(i.removeClass("disable-image"),t){case ContextMenuIconName.cancel:break;default:i.addClass("disable-image")}}}buildEditViewUI(){var e=this;super.buildEditViewUI();var a={"tab_portal_setting":{"label":$.i18n._("Portal Setting")}};this.setTabModel(a);var i=this.edit_view_tab.find("#tab_portal_setting").find(".first-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"enable_add_qualification"}),t.setSourceData(e.job_applicant_add_qualification_array),this.addEditFieldToColumn($.i18n._("Allow New Records For"),t,i),(t=Global.loadWidgetByName(FormItemType.CHECKBOX)).TCheckbox({field:"enable_resume_parsing"}),this.addEditFieldToColumn($.i18n._("Automatic Resume Parsing"),t,i),(t=Global.loadWidgetByName(FormItemType.SEPARATED_BOX)).SeparatedBox({label:$.i18n._("Configure Available Fields")}),this.addEditFieldToColumn(null,t,i,"",null,!0,!1,"separated_1");var t=Global.loadWidgetByName(FormItemType.AWESOME_BOX);t.AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"applicant"}),t.setSourceData(e.job_applicant_fields_array),this.addEditFieldToColumn($.i18n._("Applicant"),t,i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"background"}),t.setSourceData(e.job_applicant_background_fields_array),this.addEditFieldToColumn($.i18n._("Background"),t,i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"availability"}),t.setSourceData(e.job_applicant_availability_fields_array),this.addEditFieldToColumn($.i18n._("Availability"),t,i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"employment_history"}),t.setSourceData(e.job_applicant_employment_history_fields_array),this.addEditFieldToColumn($.i18n._("Employment History"),t,i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"reference"}),t.setSourceData(e.job_applicant_reference_fields_array),this.addEditFieldToColumn($.i18n._("References"),t,i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"location"}),t.setSourceData(e.job_applicant_location_fields_array),this.addEditFieldToColumn($.i18n._("Location"),t,i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"skill"}),t.setSourceData(e.job_applicant_skill_fields_array),this.addEditFieldToColumn($.i18n._("Skills"),t,i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"education"}),t.setSourceData(e.job_applicant_education_fields_array),this.addEditFieldToColumn($.i18n._("Education"),t,i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"membership"}),t.setSourceData(e.job_applicant_membership_fields_array),this.addEditFieldToColumn($.i18n._("Memberships"),t,i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"license"}),t.setSourceData(e.job_applicant_license_fields_array),this.addEditFieldToColumn($.i18n._("Licenses"),t,i),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({allow_multiple_selection:!0,layout_name:"global_option_column",show_search_inputs:!1,set_empty:!0,key:"value",field:"language"}),t.setSourceData(e.job_applicant_language_fields_array),this.addEditFieldToColumn($.i18n._("Languages"),t,i)}}t.loadView=function(){Global.loadViewSource("RecruitmentPortalConfig","RecruitmentPortalConfigView.html",(function(e){var a=_.template(e,{});Global.contentContainer().html(a)}))}}}]);
//# sourceMappingURL=hr-recruitment-RecruitmentPortalConfigViewController.bundle.js.map?v=cc5b0f6ce31228b4e6da