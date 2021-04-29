(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["JobApplicantLanguageSubViewController","portal-hr-my_profile-JobApplicantLanguageSubViewController","portal-hr-my_profile-JobApplicantSubBaseViewController","JobApplicantSubBaseViewController"],{864:(i,e,t)=>{"use strict";t.r(e),t.d(e,{"JobApplicantLanguageSubViewController":()=>n});var a=t(3757);class n extends a.JobApplicantSubBaseViewController{constructor(i={}){_.defaults(i,{}),super(i)}init(i){this.qualification_type_id=40}initOptions(){var i=this,e={};this.api.getJobApplicantLanguageOptions("fluency",{onResult:function(e){i.setSourceData("fluency_id",e.getResult(),!0)}}),this.api.getJobApplicantLanguageOptions("competency",{onResult:function(e){i.setSourceData("competency_id",e.getResult(),!0)}});var t={};t.type_id=[this.qualification_type_id],e.filter_data=t,e.filter_columns={"id":!0,"name":!0},this.qualification_api.getQualification(e,!0,{onResult:function(e){var t=e.getResult(),a={};for(var n in t)if(t.hasOwnProperty(n)){var o=t[n];a[o.id]=$.i18n._(o.name)}i.setSourceData("qualification_id",a,!0)}})}getJobApplicantLanguage(i){var e=this,t={filter_data:{}};t.filter_data.id=this.model.id,this.api.getJobApplicantLanguage(t,{onResult:function(t){if(t.isValid()){var a=t.getResult();a||(a=[]),a=a[0],e.model.set(a),i&&i()}else e.showErrorAlert(t),ProgressBar.closeOverlay()}})}setCurrentEditRecordData(){var i,e;for(var t in super.setCurrentEditRecordData(),this.model.attributes)this.model.has(t)&&(!1===this.model.get(t)&&(this.model.set(t,""),"qualification_id"===t&&this.enable_add_qualification&&this.showAddQualificationContainer()),i='.form-control[name="'+t+'"]',(e=this.$(i))&&e[0]&&this.$(i).val(this.model.get(t)))}}},3757:(i,e,t)=>{"use strict";t.r(e),t.d(e,{"JobApplicantSubBaseViewController":()=>s});var a=t(97),n=t(7526),o=t(4936);class s extends a.PortalBaseViewController{constructor(i={}){_.defaults(i,{events:{'change input[type="text"]':"onFormItemChange",'change input[type="checkbox"]':"onFormItemChange","change select.form-control":"onFormItemChange","change textarea.form-control":"onFormItemChange"}}),super(i)}preInit(i){this.api=n.y.APIJobApplicantPortal,this.qualification_api=n.y.APIQualificationPortal,this.company_api=n.y.APICompanyPortal,this.sub_view_id=i.sub_view_id,this.display_columns=i.display_columns,this.table_container=i.table_container,this.available_fields=i.available_fields,this._delegate=i._delegate,this.edit_view_error_ui_dic={},this.enable_add_qualification=i.enable_add_qualification||!1}postInit(){this.model.id?this.render():this.setEditView()}render(){var i=this,e=Global.loadWidget("views/portal/hr/my_profile/MyProfileSubView.html"),t=this.sub_view_id+"-"+this.model.id;if(this.unique_id=t,this.sub_view=_.template(e)({}),0==this.table_container.find(".table-container").length&&this.table_container.html('<div class="table-responsive"><table class="table table-condensed table-bordered table-container"><thead></thead><tbody></tbody></table></div>'),0===this.table_container.find("#"+t).length){var a=$("<tr>").attr("id",t);$(this.table_container.find("tbody")[0]).append(a)}else this.table_container.find("#"+t).html("");var n=$("<tr>");for(var o in this.display_columns)if(this.display_columns.hasOwnProperty(o)){var s;switch(o){case"is_current_employer":case"is_contact_available":s=this.model.get(o)?$.i18n._("Yes"):$.i18n._("No");break;default:s=this.model.get(o)?this.model.get(o):""}n.append("<th>"+this.display_columns[o]+"</th>"),this.table_container.find("#"+t).append("<td>"+s+"</td>")}n.append("<th>"+$.i18n._("Action")+"</th>"),""===this.table_container.find("thead").html()&&this.table_container.find("thead").html(n),this.table_container.find("#"+t).append(this.sub_view),this.table_container.find("#"+t).find(".edit-icon").unbind("click").bind("click",(function(e){i["get"+i.sub_view_id]((function(){i.setEditView()}))})),this.table_container.find("#"+t).find(".delete-icon").unbind("click").bind("click",(function(e){i["get"+i.sub_view_id]((function(){i.onDeleteClick()}))}))}initOptions(){var i=this,e={},t={};t.type_id=[this.qualification_type_id],e.filter_data=t,e.filter_columns={"id":!0,"name":!0},this.qualification_api.getQualification(e,!0,{onResult:function(e){var t=e.getResult(),a={};for(var n in t)if(t.hasOwnProperty(n)){var o=t[n];a[o.id]=$.i18n._(o.name)}i.setSourceData("qualification_id",a,!0)}})}onSelectClick(i){var e=$(i.currentTarget).parent().find("select");document.createEvent?((i=document.createEvent("MouseEvents")).initMouseEvent("mousedown",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),e[0].dispatchEvent(i)):element.fireEvent&&e[0].fireEvent("onmousedown")}setEditView(){var i=Global.loadWidget("views/portal/hr/my_profile/"+this.sub_view_id+"SubEditView.html");this.setElement(_.template(i)({available_fields:this.available_fields,enable_add_qualification:this.enable_add_qualification})),this.initOptions(),this.registerDatePicker(),this.setCurrentEditRecordData(),this.openEditView()}onDeleteClick(){var i=this;IndexViewController.instance.router.showConfirmModal(Global.delete_confirm_message,{title:"",actions:[{label:"No",isClose:!0},{label:"Yes",callBack:function(e){i.closeConfirmModal(),ProgressBar.showOverlay(),i.api["delete"+i.sub_view_id](i.model.id,{onResult:function(e){ProgressBar.closeOverlay(),e.isValid()?i._delegate.setSubViews(i.sub_view_id,i.display_columns):i.showErrorAlert(e)}})}}]})}setSourceData(i,e,t){var a=this,n='select[name="'+i+'"]';if(this.$(n)&&this.$(n)[0])switch(this.$(n).empty(),Global.isSet(this.model.get(i))||this.model.set(i,""),0==_.size(e)&&(t=!0,this.model.set(i,"")),i){case"qualification_id":if(this.enable_add_qualification){var o;switch(this.sub_view_id){case"JobApplicantSkill":o=$.i18n._("Add New Skill");break;case"JobApplicantEducation":o=$.i18n._("Add New Course");break;case"JobApplicantLicense":o=$.i18n._("Add New Type");break;case"JobApplicantLanguage":o=$.i18n._("Add New Language");break;case"JobApplicantMembership":o=$.i18n._("Add New Membership")}t=!1,this.$(n).append($("<option></option>").prop("value","").text("-- "+o+" --"))}default:!0===t&&this.$(n).append($("<option></option>").prop("value","").text("-- "+$.i18n._("None")+" --")),_.size(e)>0&&$.each(e,(function(e,t){a.$(n).append($("<option></option>").prop("value",e).text(t)),a.model.get(i)==e&&a.$(n).val(e)})),a.$(n).selectpicker()}}registerDatePicker(){var i,e=!1,t=[$.i18n._("Sun"),$.i18n._("Mon"),$.i18n._("Tue"),$.i18n._("Wed"),$.i18n._("Thu"),$.i18n._("Fri"),$.i18n._("Sat")],a=[$.i18n._("Jan"),$.i18n._("Feb"),$.i18n._("Mar"),$.i18n._("Apr"),$.i18n._("May"),$.i18n._("Jun"),$.i18n._("Jul"),$.i18n._("Aug"),$.i18n._("Sep"),$.i18n._("Oct"),$.i18n._("Nov"),$.i18n._("Dec")],n={showTime:!1,dateFormat:"dd-M-y",showHour:!1,showMinute:!1,changeMonth:!0,changeYear:!0,showButtonPanel:!0,duration:"",showAnim:"",yearRange:"-100:+10",showOn:"",dayNamesMin:t,currentText:$.i18n._("Today"),monthNamesShort:a,closeText:$.i18n._("Close"),beforeShow:function(){},onSelect:function(i){$(this).change()},onClose:function(){i=setTimeout((function(){e=!1}),100)}};this.$('input[type="text"].datepicker').datepicker(n),this.$('input[type="text"].datepicker').attr("placeholder","dd-mmm-yy"),this.$('input[type="text"].datepicker').bind("mouseup",(function(){e?(e=!1,i&&(clearTimeout(i),i=null)):($(this).datepicker("show"),e=!0)})).next(".glyphicon").bind("mouseup",(function(){$(this).prev().trigger("mouseup")}))}setCurrentEditRecordData(){var i=this,e=this.$(".detail-form").serializeArray();$.map(e,(function(e,t){Global.isSet(i.model.get(e.name))||i.model.set(e.name,e.value)})),this.model.has("qualification_id")||this.model.set("qualification_id",!1)}addQualification(){var i=this,e={};e.type_id=this.qualification_type_id;var t=e.name=this.getQualificationWidget().val();this.qualification_api.setQualification(e,{onResult:function(e){if(e.isValid()){i.$("select[name='qualification_id']").selectpicker("destroy");var a=e.getResult();$("<option>").attr({selected:"selected",value:a}).text(t).appendTo(i.$("select[name='qualification_id']")),i.$("select[name='qualification_id']").selectpicker(),i.$("select[name='qualification_id']").trigger("change")}else i.setErrorTips(e)}})}getAddQualificationContainer(){return this.$(".add-qualification-container")}getQualificationWidget(){return this.getAddQualificationContainer().find('input[name="name"]')}showAddQualificationContainer(){var i=this,e=this.getAddQualificationContainer();e.css("display","table"),e.off("click").on("click",(function(){i.addQualification()}));var t=this.getQualificationWidget();return t.val(""),t.unbind("keydown").bind("keydown",(function(e){13===e.keyCode&&i.addQualification()})),e}hideAddQualificationContainer(){var i=this.getAddQualificationContainer();return i.css("display","none"),i}openEditView(){var i=this;IndexViewController.instance.router.showFormModal(this.$el,{title:"",actions:[{label:"Close",isClose:!0,callBack:function(e){i.clearErrorTips(!0)}},{label:"Save Changes",callBack:function(e){i.onSaveClick()}}]})}closeEditView(){IndexViewController.instance.router.hideFormModal()}closeConfirmModal(){IndexViewController.instance.router.hideConfirmModal()}onFormItemChange(i,e){var t=i.currentTarget.name;switch(this.model.set(t,$(i.currentTarget).val()),t){case"name":e=!0;break;case"qualification_id":""===this.model.get(t)&&this.enable_add_qualification?(this.showAddQualificationContainer(),e=!0):this.hideAddQualificationContainer()}e||this.validate()}validate(){var i=this;this.api["validate"+this.sub_view_id](this.model.toJSON(),{onResult:function(e){i.validateResult(e)}})}validateResult(i){this.setErrorTips(i)}clearErrorTips(i){for(var e in this.edit_view_error_ui_dic)(""!==this.edit_view_error_ui_dic[e].val()||i)&&(this.edit_view_error_ui_dic[e].removeClass("error-tip"),this.edit_view_error_ui_dic[e].tooltip().tooltip("dispose"))}setErrorTips(i){this.clearErrorTips(!0);var e=i.getDetails()?i.getDetails()[0]:{};for(var t in e&&e.hasOwnProperty("error")&&(e=e.error),e){var a,n;if(e.hasOwnProperty(t))if(this.$('input[name="'+t+'"]')[0]?a=this.$('input[name="'+t+'"]'):this.$('select[name="'+t+'"]')[0]?a=this.$('select[name="'+t+'"]').parents(".styled-select"):this.$('textarea[name="'+t+'"]')[0]&&(a=this.$('textarea[name="'+t+'"]')),a)a.addClass("error-tip"),n=_.isArray(e[t])?e[t][0]:e[t],a.tooltip({title:n,container:"body",trigger:"hover focus"}),a.tooltip("show"),this.edit_view_error_ui_dic[t]=a}}showErrorAlert(i){var e=i.getDetails();e.hasOwnProperty("error"),e||(e=i.getDescription());var t="";Global.isArray(e)||"object"==typeof e?$.each(e,(function(i,e){for(var a in e.hasOwnProperty("error")&&(e=e.error),e)t=t+e[a]+"<br>"})):t=e,this.showAlert(t)}onSaveClick(){var i=this;this.api["set"+this.sub_view_id](this.model.toJSON(),{onResult:function(e){if(e.isValid()){var t=e.getResult();!0!==t&&o.d.isUUID(t)&&t!=o.d.zero_id&&t!=o.d.not_exist_id&&i.model.set("id",t),i.edit_view_error_ui_dic={},i["get"+i.sub_view_id]((function(){i.render(),i.closeEditView()}))}else i.setErrorTips(e)}})}showAlert(i){IndexViewController.instance.router.showTipModal(i)}}}}]);
//# sourceMappingURL=JobApplicantLanguageSubViewController.bundle.js.map?v=b428abfd736c37580d94