(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["wizard-dashlet-DashletWizardController"],{9022:(e,t,a)=>{"use strict";a.r(t),a.d(t,{"DashletWizardController":()=>s});class s extends BaseWizardController{constructor(e={}){_.defaults(e,{el:".wizard-bg",user_generic_data_api:null,api_user_report:null,numArray:[{label:$.i18n._("Default"),value:0},{label:5,value:5},{label:10,value:10},{label:15,value:15},{label:20,value:20},{label:25,value:25},{label:50,value:50},{label:100,value:100},{label:250,value:250},{label:500,value:500},{label:1e3,value:1e3}]}),super(e)}init(e){this.title=$.i18n._("Dashlet Wizard"),this.steps=2,this.current_step=1,this.user_generic_data_api=TTAPI.APIUserGenericData,this.api_user_report=TTAPI.APIUserReportData,this.render()}render(){super.render(),this.initCurrentStep()}buildCurrentStepUI(){var e,t=this;switch(this.stepsWidgetDic[this.current_step]={},this.content_div.empty(),this.current_step){case 1:var a=this.getLabel();a.text($.i18n._("Choose the type of dashlet")),this.content_div.append(a),(e=this.getComboBox("dashlet_type",!1)).unbind("formItemChange").bind("formItemChange",(function(e,a){t.stepsDataDic[2]=null,t.stepsWidgetDic[2]=null})),e.off("change").on("change",(function(e){t.step1ComboboxChanged($(e.target).val())})),this.content_div.append(e),this.stepsWidgetDic[this.current_step][e.getField()]=e;break;case 2:a=this.getLabel();var s,i,r,l,o=this.stepsDataDic[1];"custom_list"==o.dashlet_type?(a.text($.i18n._("Choose a list view and layout to display in the dashlet")),this.content_div.append(a),i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),(e=this.getComboBox("script",!1)).unbind("formItemChange").bind("formItemChange",(function(e,a){t.setLayout(t.getScriptNameByAPIViewKey(a.getValue())),t.setDefaultName(o.dashlet_type)})),i.text($.i18n._("List View")+": "),r.append(e),this.content_div.append(s),this.stepsWidgetDic[this.current_step][e.getField()]=e,i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),l=this.getTextInput("name",!1),i.text($.i18n._("Dashlet Title")+": "),r.append(l),this.content_div.append(s),this.stepsWidgetDic[this.current_step][l.getField()]=l,i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),(e=this.getComboBox("layout",!1)).setValueKey("id"),e.setLabelKey("name"),i.text($.i18n._("Saved Layout")+": "),r.append(e),this.content_div.append(s),this.stepsWidgetDic[this.current_step][e.getField()]=e,i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),(e=this.getComboBox("rows_per_page",!1)).setSourceData(this.numArray),i.text($.i18n._("Rows per page")+": "),r.append(e),this.content_div.append(s),this.stepsWidgetDic[this.current_step][e.getField()]=e):"custom_report"==o.dashlet_type?(a.text($.i18n._("Choose a saved report to display in the dashlet")),this.content_div.append(a),i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),(e=this.getComboBox("report",!1)).unbind("formItemChange").bind("formItemChange",(function(e,a){t.setTemplateSource(),t.stepsWidgetDic[2].template.setValue("saved_report"),t.setSavedReport(),t.setDefaultName(o.dashlet_type)})),i.text($.i18n._("Report")+": "),r.append(e),this.content_div.append(s),this.stepsWidgetDic[this.current_step][e.getField()]=e,i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),e=this.getComboBox("template",!1),i.text($.i18n._("Template")+": "),r.append(e),this.content_div.append(s),this.stepsWidgetDic[this.current_step][e.getField()]=e,e.unbind("formItemChange").bind("formItemChange",(function(e,a){t.setSavedReport()})),i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),(e=this.getComboBox("saved_report",!1)).setValueKey("id"),e.setLabelKey("name"),i.text($.i18n._("Saved Report")+": "),r.append(e),this.content_div.append(s),this.stepsWidgetDic[this.current_step][e.getField()]=e,i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),l=this.getTextInput("name",!1),i.text($.i18n._("Dashlet Title")+": "),r.append(l),this.content_div.append(s),this.stepsWidgetDic[this.current_step][l.getField()]=l):(a.text($.i18n._("Choose dashlet specific settings")),this.content_div.append(a),i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),l=this.getTextInput("name",!1),i.text($.i18n._("Dashlet Title")+": "),r.append(l),this.content_div.append(s),this.stepsWidgetDic[this.current_step][l.getField()]=l,i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),(e=this.getComboBox("rows_per_page",!1)).setSourceData(this.numArray),i.text($.i18n._("Rows per page")+": "),r.append(e),this.content_div.append(s),this.stepsWidgetDic[this.current_step][e.getField()]=e),i=(s=$(Global.loadWidget("global/widgets/wizard_form_item/WizardFormItem.html"))).find(".form-item-label"),r=s.find(".form-item-input-div"),e=this.getComboBox("auto_refresh",!1),i.text($.i18n._("Auto Refresh")+": "),r.append(e),this.content_div.append(s),this.stepsWidgetDic[this.current_step][e.getField()]=e}}step1ComboboxChanged(e){Global.getProductEdition()<=10&&("custom_list"==e||"custom_report"==e)?(TAlertManager.showAlert(Global.getUpgradeMessage(),$.i18n._("Denied")),Global.setWidgetEnabled(this.next_btn,!1)):Global.setWidgetEnabled(this.next_btn,!0)}setDefaultName(e){var t=this.stepsWidgetDic[2],a=this.stepsWidgetDic[1];"custom_list"===e?t.name.setValue(t.script.getLabel()):"custom_report"===e?t.name.setValue(t.report.getLabel()):t.name.setValue(a.dashlet_type.getLabel())}buildCurrentStepData(){var e=this,t=this.stepsDataDic[this.current_step],a=this.stepsWidgetDic[this.current_step],s=TTAPI.APIDashboard;switch(this.current_step){case 1:s.getOptions("dashlets",{onResult:function(s){var i=Global.buildRecordArray(s.getResult());a.dashlet_type.setSourceData(i),t&&(t.dashlet_type?a.dashlet_type.setValue(t.dashlet_type):t.saved_dashlet_id&&e.user_generic_data_api.getUserGenericData({filter_data:{id:t.saved_dashlet_id,deleted:!1}},{onResult:function(e){Global.isArray(e.getResult())&&e.getResult().length>0&&(t.saved_dashlet=e.getResult()[0],a.dashlet_type.setValue(t.saved_dashlet.data.dashlet_type))}}))}});break;case 2:"custom_list"==this.stepsDataDic[1].dashlet_type?s.getOptions("custom_list",{onResult:function(s){var i=Global.buildRecordArray(s.getResult());a.script.setSourceData(i),t&&t.script?(a.script.setValue(t.script),a.name.setValue(t.name),a.rows_per_page.setValue(t.rows_per_page)):e.stepsDataDic[1].saved_dashlet?(a.script.setValue(e.stepsDataDic[1].saved_dashlet.data.view_name),a.name.setValue(e.stepsDataDic[1].saved_dashlet.name),a.rows_per_page.setValue(e.stepsDataDic[1].saved_dashlet.data.rows_per_page)):(a.script.setValue(i[0]),e.setDefaultName(e.stepsDataDic[1].dashlet_type)),e.setLayout(e.getScriptNameByAPIViewKey(a.script.getValue()),a.layout)}}):"custom_report"==this.stepsDataDic[1].dashlet_type?s.getOptions("custom_report",{onResult:function(s){var i=Global.buildRecordArray(s.getResult());0!==i.length?(a.report.setSourceData(i),t&&t.report?(a.report.setValue(t.report),a.name.setValue(t.name)):e.stepsDataDic[1].saved_dashlet?(a.report.setValue(e.stepsDataDic[1].saved_dashlet.data.report),a.name.setValue(e.stepsDataDic[1].saved_dashlet.name)):(a.report.setValue(i.value),e.setDefaultName(e.stepsDataDic[1].dashlet_type)),e.setTemplateSource(a.report.getValue()),t&&t.report?a.template.setValue(t.template):e.stepsDataDic[1].saved_dashlet?a.template.setValue(e.stepsDataDic[1].saved_dashlet.data.template):a.template.setValue("saved_report"),e.setSavedReport(a.report.getValue(),a.template.getValue())):Global.setWidgetEnabled(e.done_btn,!1)}}):t?(a.name.setValue(t.name),a.rows_per_page.setValue(t.rows_per_page)):e.stepsDataDic[1].saved_dashlet?(a.name.setValue(e.stepsDataDic[1].saved_dashlet.name),a.rows_per_page.setValue(e.stepsDataDic[1].saved_dashlet.data.rows_per_page)):e.setDefaultName(e.stepsDataDic[1].dashlet_type),s.getOptions("auto_refresh",{onResult:function(s){var i=Global.buildRecordArray(s.getResult());a.auto_refresh.setSourceData(i),t&&t.auto_refresh?a.auto_refresh.setValue(t.auto_refresh):e.stepsDataDic[1].saved_dashlet&&a.auto_refresh.setValue(e.stepsDataDic[1].saved_dashlet.data.auto_refresh)}})}}setTemplateSource(){var e=this.stepsWidgetDic[2],t=e.report.getValue(),a=e.template,s=TTAPI["API"+t].getOptions("templates",{async:!1}).getResult();(s=Global.buildRecordArray(s)).unshift({fullvalue:"saved_report",id:"saved_report",label:"-- "+$.i18n._("Saved Report")+" --",orderValue:0,value:"saved_report"}),a.setSourceData(s)}setSavedReport(){var e=this.stepsDataDic[2],t=this.stepsDataDic[1],a=this.stepsWidgetDic[2],s=a.saved_report,i=a.report.getValue();if("saved_report"!==a.template.getValue())return s.hide(),void s.parent().parent().hide();s.parent().parent().show(),s.show(),this.api_user_report.getUserReportData({filter_data:{script:i}},{onResult:function(a){var i=a.getResult();i&&i.length>0?i.sort((function(e,t){return Global.compare(e,t,"name")})):i=[{fullValue:0,id:0,name:Global.empty_item,label:Global.empty_item,orderValue:0,value:0}],s.setSourceData(i),e&&e.layout?s.setValue(e.layout):t.saved_dashlet&&s.setValue(t.saved_dashlet.data.saved_report)}})}setLayout(e){var t=this.stepsDataDic[2],a=this.stepsDataDic[1],s=this.stepsWidgetDic[2].layout;this.user_generic_data_api.getUserGenericData({filter_data:{script:e,deleted:!1}},{onResult:function(e){var i=e.getResult();i&&i.length>0?i.sort((function(e,t){return Global.compare(e,t,"name")})):i=[{id:0,name:"- "+$.i18n._("Default")+" -"}],s.setSourceData(i),t&&t.layout?s.setValue(t.layout):a.saved_dashlet&&s.setValue(a.saved_dashlet.data.layout_id)}})}getScriptNameByAPIViewKey(e){var t="";switch(e){case"Exception":t="exceptionView";break;case"Request":t="RequestView";break;case"User":t="EmployeeView";break;case"UserExpense":t="UserExpenseView";break;case"Schedule":t="ScheduleShiftView";break;case"Invoice":t="InvoiceView";break;case"Request-Authorization":t="RequestAuthorizationView";break;case"PayPeriodTimeSheetVerify":t="TimeSheetAuthorizationView";break;case"UserExpense-Authorization":t="ExpenseAuthorizationView";break;case"AccrualBalance":t="AccrualBalanceView";break;case"Accrual":t="AccrualView";break;case"RecurringScheduleControl":t="RecurringScheduleControlView";break;case"RecurringScheduleTemplateControl":t="RecurringScheduleTemplateControlView";break;case"Job":t="JobView";break;case"JobItem":t="JobItemView";break;case"UserContact":t="UserContactView";break;case"UserWage":t="WageView";break;case"PayStub":t="PayStubView";break;case"PayStubTransaction":t="PayStubTransactionView";break;case"PayPeriod":t="PayPeriodsView";break;case"PayStubAmendment":t="PayStubAmendmentView";break;case"Client":t="ClientView";break;case"ClientContact":t="ClientContactView";break;case"Transaction":t="InvoiceTransaction";break;case"UserReviewControl":t="UserReviewControlView";break;case"JobVacancy":t="JobVacancyView";break;case"JobApplicant":t="JobApplicantView";break;case"JobApplication":t="JobApplicationView"}return t}onDoneClick(){var e=this;super.onDoneClick(),this.saveCurrentStep(),this.stepsWidgetDic[2].name.clearErrorStyle();var t=this.stepsDataDic[1].saved_dashlet,a=this.stepsDataDic[1].dashlet_type,s=this.stepsDataDic[2].name,i=this.stepsDataDic[2].auto_refresh,r=this.stepsDataDic[2].rows_per_page,l=33;"custom_report"===a&&(l=99);var o={};if(s){if("custom_list"==a){var d=this.stepsDataDic[2].script,p=this.stepsDataDic[2].layout;t?((o=t).name=s,o.is_default="false",o.data.dashlet_type=a,o.data.view_name=d,o.data.layout_id=p,o.data.auto_refresh=i,o.data.rows_per_page=r):(o.script="global_dashboard",o.name=s,o.is_default="false",o.data={dashlet_type:a,view_name:d,layout_id:p,auto_refresh:i,height:200,width:l,rows_per_page:r})}else if("custom_report"==a){var n=this.stepsDataDic[2].report,u=!(!this.stepsDataDic[2].saved_report||0==this.stepsDataDic[2].saved_report)&&this.stepsDataDic[2].saved_report,c=this.stepsDataDic[2].template;if("saved_report"===c&&!u)return void TAlertManager.showAlert($.i18n._("No saved report!"));t?((o=t).name=s,o.is_default="false",o.data.dashlet_type=a,o.data.report=n,o.data.template=c,o.data.saved_report_id=u,o.data.auto_refresh=i,o.data.rows_per_page=r):(o.script="global_dashboard",o.name=s,o.is_default="false",o.data={dashlet_type:a,report:n,template:c,saved_report_id:u,auto_refresh:i,height:200,width:l})}else t?((o=t).name=s,o.is_default="false",o.data.dashlet_type=a,o.data.auto_refresh=i,o.data.rows_per_page=r):(o.script="global_dashboard",o.name=s,o.is_default="false",o.data={dashlet_type:a,auto_refresh:i,rows_per_page:r,height:200,width:l});this.user_generic_data_api.setUserGenericData(o,{onResult:function(t){t.isValid()?(e.onCloseClick(),e.call_back&&e.call_back()):TAlertManager.showErrorAlert(t)}})}else this.stepsWidgetDic[2].name.setErrorStyle("Dashlet title can't be empty",!0)}saveCurrentStep(){this.stepsDataDic[this.current_step]||(this.stepsDataDic[this.current_step]={});var e=this.stepsDataDic[this.current_step],t=this.stepsWidgetDic[this.current_step];switch(this.current_step){case 1:e.dashlet_type=t.dashlet_type.getValue();break;case 2:var a=this.stepsDataDic[1];"custom_list"==a.dashlet_type?(e.script=t.script.getValue(),e.layout=t.layout.getValue(),e.rows_per_page=t.rows_per_page.getValue(),e.name=t.name.getValue()):"custom_report"==a.dashlet_type?(e.report=t.report.getValue(),e.saved_report=t.saved_report.getValue(),e.name=t.name.getValue(),e.template=t.template.getValue()):(e.name=t.name.getValue(),e.rows_per_page=t.rows_per_page.getValue()),e.auto_refresh=t.auto_refresh.getValue()}}getProperDashletName(e){var t="";switch(e.dashlet_type){case"request_summary":t=$.i18n._("Request Summary");break;case"expense_summary":t=$.i18n._("Expense Summary");break;case"message_summary":t=$.i18n._("Message Summary");break;case"exception_summary":t=$.i18n._("Exception Summary")}return t}setDefaultDataToSteps(){if(!this.default_data)return null;this.stepsDataDic[1]={},this.getDefaultData("saved_dashlet_id")?this.stepsDataDic[1].saved_dashlet_id=this.getDefaultData("saved_dashlet_id"):this.stepsDataDic[1].saved_dashlet_id=!1}}}}]);
//# sourceMappingURL=wizard-dashlet-DashletWizardController.bundle.js.map?v=86e4e2d5a23a0373ad4c