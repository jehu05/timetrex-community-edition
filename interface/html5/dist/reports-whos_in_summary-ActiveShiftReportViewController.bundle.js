(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["reports-whos_in_summary-ActiveShiftReportViewController"],{7081:(e,t,i)=>{"use strict";i.r(t),i.d(t,{"ActiveShiftReportViewController":()=>r});class r extends ReportBaseViewController{constructor(e={}){_.defaults(e,{}),super(e)}initReport(e){this.script_name="ActiveShiftReport",this.viewId="ActiveShiftReport",this.context_menu_name=$.i18n._("Whos In Summary"),this.navigation_label=$.i18n._("Saved Report")+":",this.view_file="ActiveShiftReportView.html",this.api=TTAPI.APIActiveShiftReport}getCustomContextMenuModel(){return{exclude:[],include:["default"]}}processFilterField(){for(var e=0;e<this.setup_fields_array.length;e++){var t=this.setup_fields_array[e];"user_status_id"===t.value&&(t.value="filter")}}setFilterValue(e,t){e.setValue(t.user_status_id)}onFormItemChangeProcessFilterField(e,t){var i=e.getValue();this.visible_report_values[t]={user_status_id:i}}}}}]);
//# sourceMappingURL=reports-whos_in_summary-ActiveShiftReportViewController.bundle.js.map?v=a192b73411e30831ae7a