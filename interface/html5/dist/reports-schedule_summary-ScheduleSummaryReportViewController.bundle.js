(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["reports-schedule_summary-ScheduleSummaryReportViewController"],{2247:(e,t,i)=>{"use strict";i.r(t),i.d(t,{"ScheduleSummaryReportViewController":()=>r});class r extends ReportBaseViewController{constructor(e={}){_.defaults(e,{}),super(e)}initReport(e){this.script_name="ScheduleSummaryReport",this.viewId="ScheduleSummaryReport",this.context_menu_name=$.i18n._("Schedule Summary"),this.navigation_label=$.i18n._("Saved Report")+":",this.view_file="ScheduleSummaryReportView.html",this.api=TTAPI.APIScheduleSummaryReport}getCustomContextMenuModel(){return{groups:{schedule:{label:$.i18n._("Schedule"),id:this.script_name+"Schedule"}},exclude:[],include:[{label:$.i18n._("Print"),id:ContextMenuIconName.print,group:"schedule",icon:"print-35x35.png",type:RibbonSubMenuType.NAVIGATION,items:[{label:$.i18n._("Individual Schedules"),id:"pdf_schedule"},{label:$.i18n._("Group - Combined"),id:"pdf_schedule_group_combined"},{label:$.i18n._("Group - Separated"),id:"pdf_schedule_group"},{label:$.i18n._("Group - Separated (Page Breaks)"),id:"pdf_schedule_group_pagebreak"}],permission_result:!0,permission:!0}]}}processFilterField(){for(var e=0;e<this.setup_fields_array.length;e++){var t=this.setup_fields_array[e];"status_id"===t.value&&(t.value="filter")}}onReportMenuClick(e){this.onViewClick(e)}setFilterValue(e,t){e.setValue(t.status_id)}onFormItemChangeProcessFilterField(e,t){var i=e.getValue();this.visible_report_values[t]={status_id:i}}}}}]);
//# sourceMappingURL=reports-schedule_summary-ScheduleSummaryReportViewController.bundle.js.map?v=d84609831e8d20749d2e