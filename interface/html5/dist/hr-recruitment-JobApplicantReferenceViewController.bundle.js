(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["hr-recruitment-JobApplicantReferenceViewController"],{2144:(e,i,t)=>{"use strict";t.r(i),t.d(i,{"JobApplicantReferenceViewController":()=>o});class o extends BaseViewController{constructor(e={}){_.defaults(e,{el:"#job_applicant_reference_view_container",type_array:null,country_array:null,province_array:null,e_province_array:null,company_api:null,sub_view_grid_autosize:!0}),super(e)}init(e){this.edit_view_tpl="JobApplicantReferenceEditView.html",this.permission_id="job_applicant",this.viewId="JobApplicantReference",this.script_name="JobApplicantReferenceView",this.table_name_key="job_applicant_reference",this.context_menu_name=$.i18n._("Reference"),this.navigation_label=$.i18n._("Job Applicant Reference")+":",this.api=TTAPI.APIJobApplicantReference,this.company_api=TTAPI.APICompany,this.render(),this.sub_view_mode||this.initData()}showNoResultCover(e){super.showNoResultCover(!!this.sub_view_mode)}onAddClick(){this.sub_view_mode&&this.buildContextMenu(!0),super.onAddClick()}initOptions(){this.initDropDownOption("type"),this.initDropDownOption("country","country",this.company_api)}buildEditViewUI(){super.buildEditViewUI();var e={"tab_job_applicant_reference":{"label":$.i18n._("Job Applicant Reference")},"tab_audit":!0};this.setTabModel(e),this.navigation.AComboBox({api_class:TTAPI.APIJobApplicantReference,id:this.script_name+"_navigation",allow_multiple_selection:!1,layout_name:"global_job_applicant_reference",navigation_mode:!0,show_search_inputs:!0}),this.setNavigation();var i,t,o,a=this.edit_view_tab.find("#tab_job_applicant_reference").find(".first-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(a),(i=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"type_id"}),i.setSourceData(this.type_array),this.addEditFieldToColumn($.i18n._("Type"),i,a,""),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"first_name",width:200}),this.addEditFieldToColumn($.i18n._("First Name"),i,a),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"last_name",width:200}),this.addEditFieldToColumn($.i18n._("Last Name"),i,a),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"title",width:200}),this.addEditFieldToColumn($.i18n._("Title"),i,a),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"address1",width:200}),this.addEditFieldToColumn($.i18n._("Address (Line 1)"),i,a),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"address2",width:200}),this.addEditFieldToColumn($.i18n._("Address (Line 2)"),i,a),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"city",width:200}),this.addEditFieldToColumn($.i18n._("City"),i,a),(i=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"country",set_empty:!0}),i.setSourceData(this.country_array),this.addEditFieldToColumn($.i18n._("Country"),i,a),(i=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"province"}),i.setSourceData([]),this.addEditFieldToColumn($.i18n._("Province/State"),i,a),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"postal_code",width:90}),this.addEditFieldToColumn($.i18n._("Postal/ZIP Code"),i,a),(i=Global.loadWidgetByName(FormItemType.DATE_PICKER)).TDatePicker({field:"start_date"}),t=$("<div class='widget-h-box'></div>"),o=$("<span class='widget-right-label'> "+$.i18n._("ie")+" : "+LocalCacheData.getLoginUserPreference().date_format_display+"</span>"),t.append(i),t.append(o),this.addEditFieldToColumn($.i18n._("Known Since"),i,a,"",t),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"work_phone",width:200}),this.addEditFieldToColumn($.i18n._("Work Phone"),i,a),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"home_phone",width:200}),this.addEditFieldToColumn($.i18n._("Home Phone"),i,a),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"mobile_phone",width:200}),this.addEditFieldToColumn($.i18n._("Mobile Phone"),i,a),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"work_email",width:200}),this.addEditFieldToColumn($.i18n._("Work Email"),i,a),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"home_email",width:200}),this.addEditFieldToColumn($.i18n._("Home Email"),i,a),(i=Global.loadWidgetByName(FormItemType.TAG_INPUT)).TTagInput({field:"tag",object_type_id:390}),this.addEditFieldToColumn($.i18n._("Tags"),i,a,"",null,null,!0)}onFormItemChange(e,i){this.setIsChanged(e),this.setMassEditingFieldsWhenFormChange(e);var t=e.getField();switch(this.current_edit_record[t]=e.getValue(),t){case"country":this.edit_view_ui_dic.province.setValue(null)}"country"!==t?i||this.validate():this.onCountryChange()}setCurrentEditRecordData(){for(var e in this.current_edit_record){var i=this.edit_view_ui_dic[e];if(Global.isSet(i))switch(e){case"country":this.setCountryValue(i,e);break;default:i.setValue(this.current_edit_record[e])}}this.collectUIDataToCurrentEditRecord(),this.setEditViewDataDone()}setProvince(e,i){var t=this;e&&"-1"!==e&&"0"!==e?this.company_api.getOptions("province",e,{onResult:function(e){(e=e.getResult())||(e=[]),t.province_array=Global.buildRecordArray(e),t.adv_search_field_ui_dic.province.setSourceData(t.province_array)}}):(t.province_array=[],this.adv_search_field_ui_dic.province.setSourceData([]))}eSetProvince(e,i){var t=this,o=t.edit_view_ui_dic.province;e&&"-1"!==e&&"0"!==e?this.company_api.getOptions("province",e,{onResult:function(e){(e=e.getResult())||(e=[]),t.e_province_array=Global.buildRecordArray(e),i&&t.e_province_array.length>0&&(t.current_edit_record.province=t.e_province_array[0].value,o.setValue(t.current_edit_record.province)),o.setSourceData(t.e_province_array)}}):(t.e_province_array=[],o.setSourceData([]))}onGridSelectRow(){this.sub_view_mode?this.buildContextMenu(!0):this.buildContextMenu(),this.setDefaultMenu()}searchDone(){super.searchDone(),TTPromise.resolve("JobApplicant_History_Tab","JobApplicantReferenceViewController")}}o.loadSubView=function(e,i,t){Global.loadViewSource("JobApplicantReference","SubJobApplicantReferenceView.html",(function(o){var a=_.template(o);Global.isSet(i)&&i(),Global.isSet(e)&&(e.html(a({})),Global.isSet(t)&&t(sub_job_applicant_reference_view_controller))}))}}}]);
//# sourceMappingURL=hr-recruitment-JobApplicantReferenceViewController.bundle.js.map?v=cfc769cfe70be811fe3e