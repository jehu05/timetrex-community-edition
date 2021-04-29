(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["portal-hr-my_profile-MyProfileViewController"],{388:(e,i,t)=>{"use strict";t.r(i),t.d(i,{"MyProfileViewController":()=>n});t(4414);var a=t(97),r=t(7526),o=t(4936);class n extends a.PortalBaseViewController{constructor(e={}){_.defaults(e,{el:"#my_profile_view",events:{"click #saveBtn":"onSaveClick","click #available_jobs":"availableJobsClick","click #applied_jobs":"appliedJobsClick",'change input[type="text"]':"onFormItemChange",'change input[type="checkbox"]':"onFormItemChange","change select.form-control":"onFormItemChange","change textarea.form-control":"onFormItemChange","click .detail-form-title":"onFormTitleClick","click .table-title .add-btn":"onSubViewAddClick"}}),super(e)}init(){if(!Global.isSet(LocalCacheData.getPortalLoginUser()))return!1;this.current_edit_record=Global.clone(LocalCacheData.getPortalLoginUser()),this.model=new Backbone.Model(this.current_edit_record),this.viewId="MyProfile",this.api=r.y.APIJobApplicantPortal,this.company_api=r.y.APICompanyPortal,this.ethnic_group_api=r.y.APIEthnicGroupPortal,this.qualification_api=r.y.APIQualificationPortal,this.script_name="ProfileView",this.edit_view_error_ui_dic={},this.applicant_fields={},this.background_fields={},this.availability_fields={},this.employment_history_fields={},this.reference_fields={},this.location_fields={},this.skill_fields={},this.education_fields={},this.membership_fields={},this.license_fields={},this.language_fields={},this.enable_add_qualification_fields={},this.is_changed=null;var e=this;this.getAvailableFieldsForSection((function(){e.render()}))}refreshProfile(){var e=this;this.api.getJobApplicant({onResult:function(i){i.isValid()&&(LocalCacheData.setPortalLoginUser(i.getResult()[0]),e.current_edit_record=Global.clone(LocalCacheData.getPortalLoginUser())),e.$(".job-applicant-detail").remove(),e.render()}})}getAvailableFieldsForSection(e){var i,t=this;this.api.getRecruitmentPortalConfig({},{onResult:function(a){var r=a.getResult();if(Global.isArray(r)&&(i=r[0]),i)for(var o in i){var n;if(i.hasOwnProperty(o)&&(n=i[o]),Global.isArray(n))for(var l=0;l<n.length;l++){var s=n[l];t[o+"_fields"][s]=!0}}t.api.getJobApplicant({onResult:function(i){i.isValid()&&(LocalCacheData.setPortalLoginUser(i.getResult()[0]),t.current_edit_record=Global.clone(LocalCacheData.getPortalLoginUser())),e&&e()}})}})}render(){var e=Global.loadWidget("views/portal/hr/my_profile/MyProfileDetailView.html");this.$el.append(_.template(e)({"applicant":this.applicant_fields,"background":this.background_fields,"availability":this.availability_fields,"employment_history":this.employment_history_fields,"reference":this.reference_fields,"location":this.location_fields,"skill":this.skill_fields,"education":this.education_fields,"membership":this.membership_fields,"license":this.license_fields,"language":this.language_fields})),this.initOptions(),this.registerDatePicker(),this.setCurrentEditRecordData(),this.initSubHistoryView(),this.initSubQualificationView(),this.initSubApplicationView(),this.initSubDocumentView();var i=this;$(".portal-tables #password, .portal-tables #password_confirm").on("change",(function(e){i.onFormItemChange(e)}))}initOptions(){var e=this;this.api.getJobApplicantOptions("sex",{onResult:function(i){e.setSourceData("sex_id",i.getResult())}}),this.ethnic_group_api.getEthnicGroup({filter_columns:{"id":!0,"name":!0}},!0,{onResult:function(i){var t=i.getResult(),a={};for(var r in t)if(t.hasOwnProperty(r)){var o=t[r];a[o.id]=$.i18n._(o.name)}e.setSourceData("ethnic_group_id",a,!0)}}),this.api.getJobApplicantOptions("minimum_wage_type",{onResult:function(i){e.setSourceData("minimum_wage_type_id",i.getResult(),!0)}}),this.company_api.getOptions("country",{onResult:function(i){i=i.getResult();e.setSourceData("country",i,!0),e.setSourceData("identification_country",i,!0)}}),this.api.getJobApplicantOptions("identification_type",{onResult:function(i){e.setSourceData("identification_type_id",i.getResult(),!0)}}),this.api.getJobApplicantOptions("available_days_of_week",{onResult:function(i){e.setSourceData("available_days_of_week",i.getResult(),!0)}}),this.api.getJobApplicantOptions("available_hours_of_day",{onResult:function(i){e.setSourceData("available_hours_of_day",i.getResult(),!0)}})}onSelectClick(e){var i=$(e.currentTarget).parent().find("select");document.createEvent?((e=document.createEvent("MouseEvents")).initMouseEvent("mousedown",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),i[0].dispatchEvent(e)):element.fireEvent&&i[0].fireEvent("onmousedown")}registerDatePicker(){var e,i=!1,t=[$.i18n._("Sun"),$.i18n._("Mon"),$.i18n._("Tue"),$.i18n._("Wed"),$.i18n._("Thu"),$.i18n._("Fri"),$.i18n._("Sat")],a=[$.i18n._("Jan"),$.i18n._("Feb"),$.i18n._("Mar"),$.i18n._("Apr"),$.i18n._("May"),$.i18n._("Jun"),$.i18n._("Jul"),$.i18n._("Aug"),$.i18n._("Sep"),$.i18n._("Oct"),$.i18n._("Nov"),$.i18n._("Dec")],r={showTime:!1,dateFormat:"dd-M-y",showHour:!1,showMinute:!1,changeMonth:!0,changeYear:!0,showButtonPanel:!0,duration:"",showAnim:"",yearRange:"-100:+10",showOn:"",dayNamesMin:t,currentText:$.i18n._("Today"),monthNamesShort:a,closeText:$.i18n._("Close"),beforeShow:function(){},onSelect:function(e){$(this).change()},onClose:function(){e=setTimeout((function(){i=!1}),100)}};this.$('input[type="text"].datepicker').datepicker(r),this.$('input[type="text"].datepicker').attr("placeholder","dd-mmm-yy"),this.$('input[type="text"].datepicker').bind("mouseup",(function(){i?(i=!1,e&&(clearTimeout(e),e=null)):($(this).datepicker("show"),i=!0)})).next(".glyphicon").bind("mouseup",(function(){$(this).prev().trigger("mouseup")}))}setSourceData(e,i,t){var a=this,r='select[id="'+e+'"]';this.$(r)&&this.$(r)[0]&&(this.$(r).empty(),0==_.size(i)&&(t=!0),!0===t&&("available_days_of_week"===e||"available_hours_of_day"===e?this.$(r).append($("<option></option>").prop("value","0").text("-- "+$.i18n._("Select all that apply")+" --").attr("selected","selected")):this.$(r).append($("<option></option>").prop("value","0").text("-- "+$.i18n._("None")+" --").attr("selected","selected"))),_.size(i)>0&&$.each(i,(function(i,t){if(a.$(r).append($("<option></option>").prop("value",i).text(t)),"available_days_of_week"===e||"available_hours_of_day"===e){if(_.isArray(a.current_edit_record[e])){a.$(r).find("option[value='0']").removeAttr("selected");for(var o=a.current_edit_record[e],n=0;n<o.length;n++)i==o[n]&&a.$(r).find("option[value='"+i+"']").attr("selected","selected")}}else a.current_edit_record[e]==i&&a.$(r).val(i)})),a.$(r).selectpicker())}setCurrentEditRecordData(){var e,i;for(var t in this.current_edit_record)if(this.current_edit_record.hasOwnProperty(t))switch(t){case"country":case"identification_country":"country"===t?this.eSetProvince(this.current_edit_record[t]):"identification_country"===t&&this.iSetProvince(this.current_edit_record[t]);break;case"currently_employed":case"immediate_drug_test":case"criminal_record":e='input[id="'+t+'"]',!0===this.current_edit_record[t]?(this.$(e).prop("checked","checked"),this.$('textarea[id="criminal_record_description"]')[0]&&("criminal_record"===t?(this.$('textarea[id="criminal_record_description"]').removeAttr("disabled"),this.$('textarea[id="criminal_record_description"]').css("background-color","#fff")):(this.$('textarea[id="criminal_record_description"]').attr("disabled","disabled"),this.$('textarea[id="criminal_record_description"]').css("background-color","#eee")))):!1===this.current_edit_record[t]&&(this.$(e).removeAttr("checked"),this.$('textarea[id="criminal_record_description"]')[0]&&(this.$('textarea[id="criminal_record_description"]').attr("disabled","disabled"),this.$('textarea[id="criminal_record_description"]').css("background-color","#eee")));break;default:!1===this.current_edit_record[t]&&(this.current_edit_record[t]=""),e='.form-control[id="'+t+'"]',(i=this.$(e))&&i[0]&&this.$(e).val(this.current_edit_record[t])}}onFormItemChange(e,i){if(e.currentTarget.name)var t=e.currentTarget.name;else{if(!e.currentTarget.id)return!1;t=e.currentTarget.id}var a=this;switch(this.current_edit_record[t]=$(e.currentTarget).val(),this.model.set(t,$(e.currentTarget).val()),this.is_changed=!0,t){case"currently_employed":case"immediate_drug_test":case"criminal_record":$(e.currentTarget).is(":checked")?(this.current_edit_record[t]=!0,this.model.set(t,!0),"criminal_record"===t&&this.$('textarea[id="criminal_record_description"]')[0]&&(this.$('textarea[id="criminal_record_description"]').removeAttr("disabled"),this.$('textarea[id="criminal_record_description"]').css("background-color","#fff"))):(this.current_edit_record[t]=!1,this.model.set(t,!1),"criminal_record"===t&&this.$('textarea[id="criminal_record_description"]')[0]&&(this.$('textarea[id="criminal_record_description"]').attr("disabled","disabled"),this.$('textarea[id="criminal_record_description"]').css("background-color","#eee")));break;case"available_days_of_week":case"available_hours_of_day":null===$(e.currentTarget).val()&&(this.current_edit_record[t]=0);break;case"confirm_password":i=!1}"country"!=t?"identification_country"!==t?i||this.validate():this.iSetProvince(this.$('select[id="identification_country"]').val(),!0,(function(){a.validate()})):this.eSetProvince(this.$('select[id="country"]').val(),!0,(function(){a.validate()}))}validate(){var e=this,i=this.current_edit_record;this.api.validateJobApplicant(i,{onResult:function(i){e.validateResult(i)}})}validateResult(e){this.clearErrorTips(),this.setErrorTips(e)}clearErrorTips(e){for(var i in this.edit_view_error_ui_dic)(""!==this.edit_view_error_ui_dic[i].val()||e)&&(this.edit_view_error_ui_dic[i].removeClass("error-tip"),this.edit_view_error_ui_dic[i].tooltip().tooltip("dispose"))}setErrorTips(e){this.clearErrorTips(!0);var i=e.getDetails()?e.getDetails()[0]:{};i&&i.hasOwnProperty("error")&&(i=i.error);var t=[];for(var a in _.size(i)>0?this.$(".save-btn").addClass("error"):this.$(".save-btn").removeClass("error"),i){var r,o;if(i.hasOwnProperty(a))if(this.$('input[id="'+a+'"]:visible')[0]?r=this.$('input[id="'+a+'"]:visible'):this.$('select[id="'+a+'"]:visible')[0]?r=this.$('select[id="'+a+'"]:visible').parents(".styled-select"):this.$('textarea[id="'+a+'"]:visible')[0]&&(r=this.$('textarea[id="'+a+'"]:visible')),r)r.addClass("error-tip"),o=_.isArray(i[a])?i[a][0]:i[a],r.tooltip({"title":o,"placement":"top","selector":"#"+a}),r.tooltip("show"),this.edit_view_error_ui_dic[a]=r,t.push(r.attr("data-sort"))}if(t.length>0){var n;t.sort();a=t[0];this.$('input[data-sort="'+a+'"]')[0]?n=this.$('input[data-sort="'+a+'"]'):this.$('select[data-sort="'+a+'"]')[0]?n=this.$('select[data-sort="'+a+'"]'):this.$('textarea[data-sort="'+a+'"]')[0]&&(n=this.$('textarea[data-sort="'+a+'"]'));var l=$("html, body");l.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove",(function(e){(e.which>0||"mousedown"==e.type||"mousewheel"==e.type||"touchmove"==e.type)&&l.stop()})),n&&l.animate({scrollTop:n.parent().find("[data-toggle=tooltip]").offset().top},"slow",(function(){l.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove")}))}}eSetProvince(e,i,t){var a=this;a.$('select[id="province"]').selectpicker("destroy"),e&&"-1"!==e&&"0"!==e?this.company_api.getOptions("province",e,{onResult:function(e){(e=e.getResult())||(e=[]),a.e_province_array=Global.buildRecordArray(e),i&&a.e_province_array.length>0&&(a.current_edit_record.province=a.e_province_array[0].value,a.model.set("province",a.e_province_array[0].value),a.$('select[id="province"]').val(a.current_edit_record.province)),a.setSourceData("province",e),t&&t()}}):(a.e_province_array=[],a.setSourceData("province",[]))}iSetProvince(e,i,t){var a=this;a.$('select[id="identification_province"]').selectpicker("destroy"),e&&"-1"!==e&&"0"!==e?this.company_api.getOptions("province",e,{onResult:function(e){(e=e.getResult())||(e=[]),a.i_province_array=Global.buildRecordArray(e),i&&a.i_province_array.length>0&&(a.current_edit_record.identification_province=a.i_province_array[0].value,a.model.set("identification_province",a.i_province_array[0].value),a.$('select[id="identification_province"]').val(a.current_edit_record.identification_province)),a.setSourceData("identification_province",e),t&&t()}}):(a.i_province_array=[],a.setSourceData("identification_province",[]))}availableJobsClick(){window.location=Global.getBaseURL()+"#!m=PortalJobVacancy&company_id="+LocalCacheData.getAllURLArgs().company_id,LocalCacheData.setAllURLArgs({})}appliedJobsClick(){window.location=Global.getBaseURL()+"#!m=MyJobApplication&company_id="+LocalCacheData.getAllURLArgs().company_id,LocalCacheData.setAllURLArgs({})}onSaveClick(){this.clearErrorTips(!0);var e=this;this.api.setJobApplicant(this.current_edit_record,{onResult:function(i){i.isValid()?(e.is_changed=null,e.showAlert($.i18n._("Profile Saved Successfully!"),{style:{"border":"2px solid #154575","color":"#154575"}}),e.api.getJobApplicant({onResult:function(i){i.isValid()?(e.$("#saveBtn").removeClass("error"),e.edit_view_error_ui_dic={},LocalCacheData.setPortalLoginUser(i.getResult()[0]),IndexViewController.instance.router.headerView.render()):(e.showErrorAlert(i),ProgressBar.closeOverlay())}})):e.setErrorTips(i)}})}showErrorAlert(e){var i=e.getDetails();i.hasOwnProperty("error"),i||(i=e.getDescription());var t="";Global.isArray(i)||"object"==typeof i?$.each(i,(function(e,i){for(var a in i.hasOwnProperty("error")&&(i=i.error),i)t=t+i[a]+"<br>"})):t=i,this.showAlert(t)}showAlert(e,i){IndexViewController.instance.router.showTipModal(e,i)}onFormTitleClick(e){this.toggleSubViews(e),$("span.glyphicon",e.currentTarget).toggleClass("glyphicon-chevron-up glyphicon-chevron-down"),setTimeout((function(){$(e.currentTarget).toggleClass("title-expand title-pack-up")}),500)}toggleSubViews(e){var i="."+$(e.currentTarget).attr("id");this.$(i).slideToggle("row-expand row-pack-up")}initSubHistoryView(){var e=["JobApplicantEmployment","JobApplicantReference","JobApplicantLocation"];for(var i in e)this.initSubViews(e[i])}initSubQualificationView(){this.initSubViews("JobApplicantSkill",{type_id:10}),this.initSubViews("JobApplicantEducation",{type_id:20}),this.initSubViews("JobApplicantLicense",{type_id:30}),this.initSubViews("JobApplicantLanguage",{type_id:40}),this.initSubViews("JobApplicantMembership",{type_id:50})}initSubApplicationView(){this.initSubViews("JobApplication")}initSubDocumentView(){this.initSubViews("Document")}initSubViews(e,i){var t=this;switch(e){case"JobApplication":var a={"job_vacancy":$.i18n._("Job Vacancy"),"created_date":$.i18n._("Date")};this.setSubViews(e,a);break;case"Document":a={"name":$.i18n._("Name"),"created_date":$.i18n._("Uploaded Date")};this.setSubViews(e,a,i);break;case"JobApplicantSkill":case"JobApplicantEducation":case"JobApplicantMembership":case"JobApplicantLicense":case"JobApplicantLanguage":var r={},o={};o.type_id=[i.type_id],r.filter_data=o,r.filter_columns={"id":!0,"name":!0},this.qualification_api.getQualification(r,!0,{onResult:function(i){!0!==i.getResult()||!1!==t.isEnableAddQualification(e)?(t.showQualificationHeader(),t.getAllColumns(e,(function(i){t.setSubViews(e,i)}))):t.$("."+e+"-table").parent().parent().css("display","none")}});break;default:this.getAllColumns(e,(function(i){t.setSubViews(e,i)}))}}showQualificationHeader(){this.$("#qualifications-tables").show()}isEnableAddQualification(e){var i;switch(e){case"JobApplicantSkill":i=this.enable_add_qualification_fields.hasOwnProperty("skill")&&!0===this.enable_add_qualification_fields.skill;break;case"JobApplicantEducation":i=this.enable_add_qualification_fields.hasOwnProperty("education")&&!0===this.enable_add_qualification_fields.education;break;case"JobApplicantMembership":i=this.enable_add_qualification_fields.hasOwnProperty("membership")&&!0===this.enable_add_qualification_fields.membership;break;case"JobApplicantLicense":i=this.enable_add_qualification_fields.hasOwnProperty("license")&&!0===this.enable_add_qualification_fields.license;break;case"JobApplicantLanguage":i=this.enable_add_qualification_fields.hasOwnProperty("language")&&!0===this.enable_add_qualification_fields.language}return i}addDocumentRow(e){var i={};i.filter_data={id:e},i.append=!0,this.initSubViews("Document",i)}getAllColumns(e,i){var t="get"+e+"Options";this.api[t]("columns",{onResult:function(e){var t=e.getResult();i&&i(t)}})}setSubViews(e,i,t){var a=this,r={filter_data:{},filter_sort:{},filter_items_per_page:0,filter_page:1};Global.isSet(t)&&Global.isSet(t.filter_data)&&(r.filter_data=t.filter_data),this.api["get"+e](r,!0,{onResult:function(r){var n=r.getResult(),l="."+e+"-table";if((!Global.isSet(t)||Global.isSet(t)&&!t.append)&&a.$(l).empty(),Global.isArray(n)||o.d.isUUID(a.refresh_id))for(var s in n)a.initSubView(e,i,n[s]);else a.$(l).html('<h4 class="no-result">'+$.i18n._('None provided yet, click the "+" icon to add')+"</h4>")}})}initSubView(e,i,a){var r,o=this,n=new Backbone.Model(a),l=e+"SubViewController",s=null;switch(e){case"JobApplicantEmployment":s=this.employment_history_fields;break;case"JobApplicantReference":s=this.reference_fields;break;case"JobApplicantLocation":s=this.location_fields;break;case"JobApplicantSkill":s=this.skill_fields,r=this.enable_add_qualification_fields.skill;break;case"JobApplicantEducation":s=this.education_fields,r=this.enable_add_qualification_fields.education;break;case"JobApplicantMembership":s=this.membership_fields,r=this.enable_add_qualification_fields.membership;break;case"JobApplicantLicense":s=this.license_fields,r=this.enable_add_qualification_fields.license;break;case"JobApplicantLanguage":s=this.language_fields,r=this.enable_add_qualification_fields.language}t(1034)("./"+l).then((function(t){new t[l]({table_container:o.$("."+e+"-table"),model:n,sub_view_id:e,_delegate:o,available_fields:s,enable_add_qualification:r,display_columns:i})})).catch(Global.importErrorHandler)}onSubViewAddClick(e){var i=this,t=$(e.currentTarget).attr("id").split("-")[0];switch(t){case"JobApplication":var a={"job_vacancy":$.i18n._("Job Vacancy"),"created_date":$.i18n._("Date")};i.setSubViewsDefaultData(t,a);break;case"Document":a={"name":$.i18n._("Name"),"created_date":$.i18n._("Uploaded Date")};i.setSubViewsDefaultData(t,a);break;default:this.getAllColumns(t,(function(e){i.setSubViewsDefaultData(t,e)}))}}setSubViewsDefaultData(e,i){var t=this;"JobApplication"!==e?this.api["get"+e+"DefaultData"]({onResult:function(a){var r=a.getResult();t.initSubView(e,i,r)}}):this.availableJobsClick()}getFilterColumnsFromDisplayColumns(e){var i={is_owner:!0,id:!0,is_child:!0,in_use:!0,first_name:!0,last_name:!0,job_vacancy_id:!0};for(var t in e)i[t]=!0;return i}}},1034:(e,i,t)=>{var a={"./DocumentSubViewController":[9495,"DocumentSubViewController"],"./DocumentSubViewController.js":[9495,"DocumentSubViewController"],"./JobApplicantEducationSubViewController":[6042,"JobApplicantEducationSubViewController"],"./JobApplicantEducationSubViewController.js":[6042,"JobApplicantEducationSubViewController"],"./JobApplicantEmploymentSubViewController":[2838,"JobApplicantEmploymentSubViewController"],"./JobApplicantEmploymentSubViewController.js":[2838,"JobApplicantEmploymentSubViewController"],"./JobApplicantLanguageSubViewController":[864,"JobApplicantLanguageSubViewController"],"./JobApplicantLanguageSubViewController.js":[864,"JobApplicantLanguageSubViewController"],"./JobApplicantLicenseSubViewController":[536,"JobApplicantLicenseSubViewController"],"./JobApplicantLicenseSubViewController.js":[536,"JobApplicantLicenseSubViewController"],"./JobApplicantLocationSubViewController":[8157,"JobApplicantLocationSubViewController"],"./JobApplicantLocationSubViewController.js":[8157,"JobApplicantLocationSubViewController"],"./JobApplicantMembershipSubViewController":[1993,"JobApplicantMembershipSubViewController"],"./JobApplicantMembershipSubViewController.js":[1993,"JobApplicantMembershipSubViewController"],"./JobApplicantReferenceSubViewController":[9232,"JobApplicantReferenceSubViewController"],"./JobApplicantReferenceSubViewController.js":[9232,"JobApplicantReferenceSubViewController"],"./JobApplicantSkillSubViewController":[9548,"JobApplicantSkillSubViewController"],"./JobApplicantSkillSubViewController.js":[9548,"JobApplicantSkillSubViewController"],"./JobApplicantSubBaseViewController":[3757,"JobApplicantSubBaseViewController"],"./JobApplicantSubBaseViewController.js":[3757,"JobApplicantSubBaseViewController"],"./JobApplicationSubViewController":[3510,"JobApplicationSubViewController"],"./JobApplicationSubViewController.js":[3510,"JobApplicationSubViewController"],"./MyProfileViewController":[388],"./MyProfileViewController.js":[388]};function r(e){if(!t.o(a,e))return Promise.resolve().then((()=>{var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}));var i=a[e],r=i[0];return Promise.all(i.slice(1).map(t.e)).then((()=>t(r)))}r.keys=()=>Object.keys(a),r.id=1034,e.exports=r}}]);
//# sourceMappingURL=portal-hr-my_profile-MyProfileViewController.bundle.js.map?v=5e9c4d6a44aff27900b4