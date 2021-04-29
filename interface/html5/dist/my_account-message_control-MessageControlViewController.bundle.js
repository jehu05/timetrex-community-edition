(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["my_account-message_control-MessageControlViewController"],{4468:(e,t,i)=>{"use strict";i.r(t),i.d(t,{"MessageControlViewController":()=>s});i(5853);class s extends BaseViewController{constructor(e={}){_.defaults(e,{el:"#message_control_view_container",object_type_array:null,is_request:!1,is_message:!1,messages:null,request_api:null,folder_id:null,navigation_source_data:null,isReloadViewUI:!1,current_select_message_control_data:null}),super(e)}init(e){this.edit_view_tpl="MessageControlEditView.html",this.permission_id="message",this.viewId="MessageControl",this.script_name="MessageControlView",this.table_name_key="message_control",this.context_menu_name=$.i18n._("Message"),this.api=TTAPI.APIMessageControl,this.request_api=TTAPI.APIRequest,this.folder_id=10,this.render(),this.buildContextMenu(),this.initData(),this.setSelectRibbonMenuIfNecessary("MessageControl")}initOptions(){this.initDropDownOption("object_type")}buildSearchFields(){super.buildSearchFields();var e={permission_section:"message"};this.search_fields=[new SearchField({label:$.i18n._("Employee"),in_column:1,field:"user_id",default_args:e,layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Type"),in_column:1,multiple:!0,field:"object_type_id",basic_search:!0,adv_search:!1,layout_name:"global_option_column",form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Subject"),in_column:1,field:"subject",multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.TEXT_INPUT}),new SearchField({label:$.i18n._("Created By"),in_column:2,field:"created_by",layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Updated By"),in_column:2,field:"updated_by",layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX})]}getSubViewFilter(e){return 0===e.length&&(e={}),e.folder_id=this.folder_id,e}getCustomContextMenuModel(){return{groups:{view:{label:$.i18n._("View"),id:this.script_name+"View",sort_order:900},editor:{label:$.i18n._("Editor"),id:this.viewId+"Editor",sort_order:1e3},folder:{label:$.i18n._("Folder"),id:this.script_name+"Folder",sort_order:2e3},other:{label:$.i18n._("Other"),id:this.script_name+"other",sort_order:9e3}},exclude:["default"],include:[{label:$.i18n._("New"),id:ContextMenuIconName.add,group:"view",icon:Icons.new_add,permission_result:!0,permission:null},{label:$.i18n._("View"),id:ContextMenuIconName.view,group:"view",icon:Icons.view,permission_result:!0,permission:null},{label:$.i18n._("Reply"),id:ContextMenuIconName.edit,group:"view",icon:Icons.edit,permission_result:!0,permission:null},{label:$.i18n._("Delete"),id:ContextMenuIconName.delete_icon,group:"view",icon:Icons.delete_icon,permission_result:!0,permission:null},{label:$.i18n._("Delete<br>& Next"),id:ContextMenuIconName.delete_and_next,group:"view",icon:Icons.delete_and_next,permission_result:!0,permission:null},{label:$.i18n._("Close"),id:ContextMenuIconName.close_misc,group:"view",icon:Icons.close_misc,permission_result:!0,permission:null},{label:$.i18n._("Send"),id:ContextMenuIconName.send,group:"editor",icon:Icons.send,permission_result:!0,permission:null},{label:$.i18n._("Cancel"),id:ContextMenuIconName.cancel,group:"editor",icon:Icons.cancel,permission_result:!0,permission:null,sort_order:1990},{label:$.i18n._("Inbox"),id:ContextMenuIconName.inbox,group:"folder",icon:Icons.inbox,selected:!0,permission_result:!0,permission:null},{label:$.i18n._("Sent"),id:ContextMenuIconName.sent,group:"folder",icon:Icons.sent,permission_result:!0,permission:null},{label:$.i18n._("Export"),id:ContextMenuIconName.export_excel,group:"other",icon:Icons.export_excel,permission_result:!0,permission:null,sort_order:9e3}]}}setDefaultMenu(e){if(this.context_menu_array){Global.isSet(e)&&e||this.selectContextMenu(),this.setTotalDisplaySpan();for(var t=this.context_menu_array.length,i=this.getGridSelectIdArray().length,s=0;s<t;s++){var a=$(this.context_menu_array[s]),n=$(a.find(".ribbon-sub-menu-icon")).attr("id");switch(a.removeClass("invisible-image"),a.removeClass("disable-image"),n){case ContextMenuIconName.add:this.setDefaultMenuAddIcon(a,i);break;case ContextMenuIconName.view:this.setDefaultMenuViewIcon(a,i);break;case ContextMenuIconName.edit:this.setDefaultMenuEditIcon(a,i);break;case ContextMenuIconName.delete_icon:this.setDefaultMenuDeleteIcon(a,i);break;case ContextMenuIconName.delete_and_next:this.setDefaultMenuDeleteAndNextIcon(a,i);break;case ContextMenuIconName.close_misc:this.setDefaultMenuCloseMiscIcon(a,i);break;case ContextMenuIconName.send:this.setDefaultMenuSendIcon(a,i);break;case ContextMenuIconName.cancel:this.setDefaultMenuCancelIcon(a,i);break;case ContextMenuIconName.inbox:this.setDefaultMenuInboxIcon(a,i);break;case ContextMenuIconName.sent:this.setDefaultMenuSentIcon(a,i);break;case ContextMenuIconName.export_excel:this.setDefaultMenuExportIcon(a,i)}}this.setContextMenuGroupVisibility()}}onGridDblClickRow(){for(var e=this.context_menu_array.length,t=!1,i=0;i<e&&!t;i++){var s=$(this.context_menu_array[i]);switch($(s.find(".ribbon-sub-menu-icon")).attr("id")){case ContextMenuIconName.view:t=!0,s.is(":visible")&&!s.hasClass("disable-image")&&(ProgressBar.showOverlay(),this.onViewClick())}}}onCustomContextClick(e,t){switch(e){case ContextMenuIconName.send:this.onSaveClick();break;case ContextMenuIconName.close_misc:case ContextMenuIconName.cancel:this.onCancelClick(e);break;case ContextMenuIconName.inbox:this.setCurrentSelectedIcon(t),this.onInboxClick();break;case ContextMenuIconName.sent:this.setCurrentSelectedIcon(t),this.onSentClick()}}onCancelClick(e){var t=this;function i(){e===ContextMenuIconName.cancel&&t.isReloadViewUI?(t.isReloadViewUI=!1,t.onViewClick(t.current_select_message_control_data)):(t.removeEditView(),t.isReloadViewUI=!1),Global.setUIInitComplete(),ProgressBar.closeOverlay(),TTPromise.resolve("base","onCancelClick")}t.is_add=!1,LocalCacheData.current_doing_context_action="cancel",this.is_changed?TAlertManager.showConfirmAlert(Global.modify_alert_message,null,(function(e){!0===e&&i()})):i()}onSaveResult(e){var t=this;if(e.isValid()){var i=e.getResult();this.edit_only_mode||(!0===i?t.refresh_id=t.current_edit_record.id:TTUUID.isUUID(i)&&i!=TTUUID.zero_id&&i!=TTUUID.not_exist_id&&(t.refresh_id=i),t.search()),t.onSaveDone(e),t.isReloadViewUI?(t.isReloadViewUI=!1,t.removeEditView(),t.onViewClick(t.current_select_message_control_data)):t.removeEditView(),$().TFeedback({source:"Save"})}else t.setErrorMenu(),t.setErrorTips(e)}onInboxClick(){this.folder_id=10,this.search()}onSentClick(){this.folder_id=20,this.search()}setEditMenu(){this.selectContextMenu();var e=this.context_menu_array.length,t=null;this.is_message?t="message":this.is_request&&(t="request");for(var i=0;i<e;i++){var s=$(this.context_menu_array[i]),a=$(s.find(".ribbon-sub-menu-icon")).attr("id");switch(s.removeClass("disable-image"),a){case ContextMenuIconName.add:this.setEditMenuAddIcon(s,t);break;case ContextMenuIconName.view:this.setEditMenuViewIcon(s,t);break;case ContextMenuIconName.edit:this.setEditMenuEditIcon(s,t);break;case ContextMenuIconName.delete_icon:this.setEditMenuDeleteIcon(s,t);break;case ContextMenuIconName.delete_and_next:this.setEditMenuDeleteAndNextIcon(s,t);break;case ContextMenuIconName.close_misc:this.setEditMenuCloseMiscIcon(s,t);break;case ContextMenuIconName.send:this.setEditMenuSendIcon(s,t);break;case ContextMenuIconName.cancel:this.setEditMenuCancelIcon(s,t);break;case ContextMenuIconName.inbox:this.setEditMenuInboxIcon(s,t);break;case ContextMenuIconName.sent:this.setEditMenuSentIcon(s,t);break;case ContextMenuIconName.export_excel:this.setDefaultMenuExportIcon(s)}}this.setContextMenuGroupVisibility()}setCurrentSelectedIcon(e){if(e){for(var t=this.context_menu_array.length,i=0;i<t;i++){var s=$(this.context_menu_array[i]);$(s.find(".ribbon-sub-menu-icon")).removeClass("selected-menu")}$(e.find(".ribbon-sub-menu-icon")).addClass("selected-menu")}}setDefaultMenuDeleteAndNextIcon(e,t,i){e.addClass("disable-image")}setDefaultMenuDeleteIcon(e,t,i){t>=1?e.removeClass("disable-image"):e.addClass("disable-image")}setDefaultMenuEditIcon(e,t,i){1===t?e.removeClass("disable-image"):e.addClass("disable-image")}setDefaultMenuViewIcon(e,t,i){1===t?e.removeClass("disable-image"):e.addClass("disable-image")}setDefaultMenuAddIcon(e,t,i){}setEditMenuCloseMiscIcon(e,t){}setEditMenuSendIcon(e,t){this.is_edit||this.is_add?e.removeClass("disable-image"):e.addClass("disable-image")}setEditMenuInboxIcon(e,t){e.addClass("disable-image")}setEditMenuSentIcon(e,t){e.addClass("disable-image")}setEditMenuCancelIcon(e,t){this.is_viewing&&e.addClass("disable-image")}setDefaultMenuCloseMiscIcon(e,t,i){e.addClass("disable-image")}setDefaultMenuSendIcon(e,t,i){e.addClass("disable-image")}setDefaultMenuInboxIcon(e,t,i){}setDefaultMenuSentIcon(e,t,i){}setGridCellBackGround(){var e=this.grid.getGridParam("data");if(e)for(var t=e.length,i=0;i<t;i++){var s=e[i];10==s.status_id&&$("tr[id='"+s.id+"'] td").css("font-weight","bold")}}getFilterColumnsFromDisplayColumns(){var e={id:!0,is_child:!0,is_owner:!0,object_type_id:!0,object_id:!0,status_id:!0,from_user_id:!0,to_user_id:!0},t=[];if(this.grid&&(t=this.grid.getGridParam("colModel")),t)for(var i=t.length,s=0;s<i;s++){e[t[s].name]=!0}return e}initEditViewUI(e,t){var i=this;this.edit_view&&this.edit_view.remove(),this.edit_view=$(Global.loadViewSource(e,t,null,!0)),this.edit_view_tab=$(this.edit_view.find(".edit-view-tab-bar")),this.edit_view_tab.attr("id",this.ui_id+"_edit_view_tab"),this.setTabOVisibility(!1),this.edit_view_tab=this.edit_view_tab.tabs({activate:function(e,t){i.onTabShow(e,t)}}),this.edit_view_tab.bind("tabsselect",(function(e,t){i.onTabIndexChange(e,t)})),10==this.folder_id?this.navigation_label=$.i18n._("From")+":":20==this.folder_id&&(this.navigation_label=$.i18n._("To")+":"),Global.contentContainer().append(this.edit_view),this.initRightClickMenu(RightClickMenuType.EDITVIEW),this.buildEditViewUI(),this.setEditViewTabHeight()}getViewSelectedRecordId(e){var t,i=this.getGridSelectIdArray(),s=i.length;if(Global.isSet(e))t=e;else{if(!(s>0))return TTPromise.reject("MessageControllViewController","onViewClick"),null;t=this.getRecordFromGridById(i[0])}return 50==t.object_type_id?(t.object_id,this.is_request=!0,this.is_message=!1):(t.id,this.is_request=!1,this.is_message=!0),t}getCurrentSelectedRecord(e){var t,i=this.current_selected_record;return!!i&&(t=i.object_type_id&&50==i.object_type_id?i.object_id:i.id,!0===e?i:t)}handleViewAPICallbackResult(e){var t;return e&&e.getResult?(t=e.getResult(),t=this.is_request?t[0]:t.length>1?t.reverse():t[0]):t=e,super.handleViewAPICallbackResult(t)}doViewAPICall(e){var t={onResult:this.handleViewAPICallbackResult.bind(this)};return this.is_request?this.request_api.getRequest(e,t):this.api.getMessage(e,t)}doViewClickResult(e){if(this.current_select_message_control_data=this.getCurrentSelectedRecord(!0),!this.current_select_message_control_data.hasOwnProperty("to_user_id")){var t={filter_data:{id:this.current_select_message_control_data.id}},i=this.api.getMessageControl(t,{async:!1}).getResult()[0];i&&(this.current_select_message_control_data=i)}var s=super.doViewClickResult(e);return TTPromise.resolve("MessageControllViewController","onViewClick"),s}getAPIFilters(){var e=this.getCurrentSelectedRecord(),t={filter_data:{}};return t.filter_data.id=e,t}onViewClick(e,t){TTPromise.add("MessageControllViewController","onViewClick"),TTPromise.wait();this.setCurrentEditViewState("view"),this.isReloadViewUI=!0;var i=this.getViewSelectedRecordId(e);if(!Global.isFalseOrNull(i)){this.setCurrentSelectedRecord(i);var s=this.getAPIFilters();return this.openEditView(),this.doViewAPICall(s)}}setURL(){if("edit"!==LocalCacheData.current_doing_context_action){var e="";switch(LocalCacheData.current_doing_context_action){case"new":case"edit":case"view":e=LocalCacheData.current_doing_context_action;break;case"copy_as_new":e="new"}if(this.canSetURL()){var t=this.edit_view_tab?this.edit_view_tab.find(".edit-view-tab-bar-label").children().eq(this.getEditViewTabIndex()).text():"";t=t.replace(/\/|\s+/g,""),this.current_select_message_control_data&&this.current_select_message_control_data.id?(e&&(this.is_request?Global.setURLToBrowser(Global.getBaseURL()+"#!m="+this.viewId+"&a="+e+"&id="+this.current_select_message_control_data.id+"&t=request&object_id="+this.current_select_message_control_data.object_id+"&tab="+t):Global.setURLToBrowser(Global.getBaseURL()+"#!m="+this.viewId+"&a="+e+"&id="+this.current_select_message_control_data.id+"&t=message&tab="+t)),Global.trackView()):e?"edit"===e?Global.setURLToBrowser(Global.getBaseURL()+"#!m="+this.viewId+"&a=new&t="+(this.is_request?"request":"message")+"&tab="+t):Global.setURLToBrowser(Global.getBaseURL()+"#!m="+this.viewId+"&a="+e+"&t="+(this.is_request?"request":"message")+"&tab="+t):Global.setURLToBrowser(Global.getBaseURL()+"#!m="+this.viewId)}}else LocalCacheData.current_doing_context_action=""}initEditViewData(){if(!this.edit_only_mode&&this.navigation){var e,t=this.grid.getGridParam("data"),i=this.edit_view.find(".navigation-div");if(e=this.current_select_message_control_data&&this.current_select_message_control_data.hasOwnProperty("id")&&this.current_select_message_control_data.hasOwnProperty("subject")?this.current_select_message_control_data:Global.isArray(this.current_edit_record)?this.current_edit_record[0]:this.current_edit_record,this.navigation_source_data=e,this.is_viewing&&Global.isSet(e.id)&&e.id){if(i.css("display","block"),!this.navigation.getSourceData()){this.navigation.setSourceData(t),this.navigation.setRowPerPage(LocalCacheData.getLoginUserPreference().items_per_page),this.navigation.setPagerData(this.pager_data);var s={};s.filter_data=Global.convertLayoutFilterToAPIFilter(this.select_layout),s.filter_sort=this.select_layout.data.filter_sort,this.navigation.setDefaultArgs(s)}this.navigation.setValue(e)}else i.css("display","none")}this.setUIWidgetFieldsToCurrentEditRecord(),this.setNavigationArrowsStatus(),this.setCurrentEditRecordData(),this.edit_view.find(".save-and-continue-div").SaveAndContinueBox({related_view_controller:this}),this.edit_view.find(".save-and-continue-div").css("display","none")}setNavigation(){var e=this;this.navigation.setPossibleDisplayColumns(this.buildDisplayColumnsByColumnModel(this.grid.getGridParam("colModel")),this.buildDisplayColumns(this.default_display_columns)),this.navigation.unbind("formItemChange").bind("formItemChange",(function(t,i){i.getField();var s=i.getValue(!0);s&&(s.id!==e.navigation_source_data.id&&(ProgressBar.showOverlay(),e.is_viewing?e.onViewClick(s):e.onEditClick(s)),e.setNavigationArrowsEnabled())}))}onEditClick(e,t){this.setCurrentEditViewState("edit"),this.is_request=!1,this.is_message=!1;var i=this.getGridSelectIdArray(),s={};s=this.edit_view?this.current_select_message_control_data:this.getRecordFromGridById(i[0]),this.current_edit_record=s,this.initEditViewUI(this.viewId,this.edit_view_tpl),this.initEditView()}buildEditViewUI(){var e=this.navigation&&this.navigation.getPagerData&&this.navigation.getPagerData(),t=this.navigation&&this.navigation.getSourceData&&this.navigation.getSourceData();super.buildEditViewUI();var i,s={"tab_message":{"label":$.i18n._("Message")}};this.setTabModel(s),this.navigation.AComboBox({api_class:TTAPI.APIMessageControl,id:this.script_name+"_navigation",allow_multiple_selection:!1,layout_name:"global_message_user",navigation_mode:!0,show_search_inputs:!0}),this.setNavigation(),e&&t&&(this.navigation.setSourceData(t),this.navigation.setPagerData(e));var a=this.edit_view_tab.find("#tab_message"),n=a.find(".first-column"),o=a.find(".second-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(n),this.edit_view_tabs[0].push(o),o.css("display","none"),(i=Global.loadWidgetByName(FormItemType.TEXT)).TText({field:"full_name",selected_able:!0}),this.addEditFieldToColumn($.i18n._("Employee"),i,n,"",null,!0),(i=Global.loadWidgetByName(FormItemType.TEXT)).TText({field:"date_stamp",selected_able:!0}),this.addEditFieldToColumn($.i18n._("Date"),i,n,"",null,!0),(i=Global.loadWidgetByName(FormItemType.TEXT)).TText({field:"type",selected_able:!0}),this.addEditFieldToColumn($.i18n._("Type"),i,n,"",null,!0);var r=a.find(".separate");(i=Global.loadWidgetByName(FormItemType.SEPARATED_BOX)).SeparatedBox({label:$.i18n._("Messages")}),this.addEditFieldToColumn(null,i,r,"",null,!0,null,"separated_box"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIMessageControl,column_option_key:"user_columns",allow_multiple_selection:!0,layout_name:"global_message_user",show_search_inputs:!0,set_empty:!0,custom_key_name:"User",field:"to_user_id"});var l={permission_section:"message"};i.setDefaultArgs(l),this.addEditFieldToColumn($.i18n._("Employee(s)"),i,n,"",null,!0),(i=Global.loadWidgetByName(FormItemType.TEXT)).TText({field:"from_full_name"}),this.addEditFieldToColumn($.i18n._("Employee(s)"),i,n,"",null,!0),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"subject"}),this.addEditFieldToColumn($.i18n._("Subject"),i,n,"",null,!0),(i=Global.loadWidgetByName(FormItemType.TEXT_AREA)).TTextArea({field:"body",width:600,height:400}),this.addEditFieldToColumn($.i18n._("Body"),i,n,"",null,!0,!0)}setEditViewWidgetsMode(){this.switchMessageOrRequestWidgets(),super.setEditViewWidgetsMode()}switchMessageOrRequestWidgets(){var e;for(var t in this.edit_view_ui_dic)this.edit_view_ui_dic.hasOwnProperty(t)&&this.detachElement(t);this.detachElement("separated_box"),this.edit_view_tab.find("#tab_message").find(".edit-view-tab .second-column.message-container").remove(),this.is_request?(e="Request",this.attachElement("full_name"),this.attachElement("date_stamp"),this.attachElement("type"),this.attachElement("separated_box"),this.edit_view_tab.find("#tab_message").find(".edit-view-tab .first-column").show()):this.is_message?(e="Message",this.edit_view_tab.find("#tab_message").find(".edit-view-tab .first-column").hide()):this.is_add?(e="New Message",this.attachElement("to_user_id"),this.attachElement("subject"),this.attachElement("body"),this.edit_view_tab.find("#tab_message").find(".edit-view-tab .first-column").show()):this.is_edit&&(e="Reply",this.attachElement("from_full_name"),this.attachElement("subject"),this.attachElement("body"),this.edit_view_tab.find("#tab_message").find(".edit-view-tab .first-column").show());var i={"tab_message":{"label":$.i18n._(e)}};this.setTabModel(i)}refreshCurrentRecord(){var e=this.navigation.getItemByIndex(this.navigation.getSelectIndex());ProgressBar.showOverlay(),this.onViewClick(e),this.setNavigationArrowsEnabled()}onRightOrLeftArrowClickCallBack(e){ProgressBar.showOverlay(),this.onViewClick(e),this.setNavigationArrowsEnabled()}onAddClick(){TTPromise.add("Message","add"),TTPromise.wait();var e=this;this.is_viewing=!1,this.is_edit=!1,this.is_add=!0,this.isReloadViewUI=!1,LocalCacheData.current_doing_context_action="new",this.is_request=!1,this.is_message=!1,e.openEditView();e.current_edit_record={},e.initEditView()}initEditView(){super.initEditView(),TTPromise.resolve("Message","add")}setEditMenuAddIcon(e,t){this.is_add||this.is_changed?e.addClass("disable-image"):e.removeClass("disable-image")}setEditMenuViewIcon(e,t){e.addClass("disable-image")}setEditMenuEditIcon(e,t){this.is_viewing||e.addClass("disable-image")}setEditMenuDeleteIcon(e,t){(!this.current_select_message_control_data||this.is_edit||this.is_add)&&e.addClass("disable-image")}setEditMenuDeleteAndNextIcon(e,t){(!this.current_select_message_control_data||this.is_edit||this.is_add)&&e.addClass("disable-image")}validate(){var e=this,t=this.current_edit_record;Global.isSet(this.edit_view_ui_dic.subject)?t.subject=this.edit_view_ui_dic.subject.getValue():Global.isSet(this.edit_view_ui_dic.message_subject)?t.subject=this.edit_view_ui_dic.message_subject.getValue():Global.isSet(this.edit_view_ui_dic.request_subject)&&(t.subject=this.edit_view_ui_dic.request_subject.getValue()),t=this.uniformVariable(t),this.api["validate"+this.api.key_name](t,{onResult:function(t){e.validateResult(t)}})}onSaveClick(e){LocalCacheData.current_doing_context_action="save",this.collectUIDataToCurrentEditRecord();var t=this.current_edit_record;Global.isSet(e)||(e=!1),Global.isSet(this.edit_view_ui_dic.subject)?t.subject=this.edit_view_ui_dic.subject.getValue():Global.isSet(this.edit_view_ui_dic.message_subject)?t.subject=this.edit_view_ui_dic.message_subject.getValue():Global.isSet(this.edit_view_ui_dic.request_subject)&&(t.subject=this.edit_view_ui_dic.request_subject.getValue()),t=this.uniformVariable(t),this.doSaveAPICall(t,e)}uniformVariable(e){var t={};return this.is_edit?(t.subject=e.subject,t.body=e.body,50!=e.object_type_id?(t.to_user_id=e.from_user_id,t.object_type_id=5,t.object_id=LocalCacheData.loginUser.id,t.parent_id=e.id):(t.object_id=e.object_id,t.to_user_id=LocalCacheData.loginUser.id,t.object_type_id=50,t.parent_id=1),t):(this.is_add&&(e.object_type_id=5,e.object_id=LocalCacheData.loginUser.id,e.parent_id=0),e)}setCurrentEditRecordData(){var e=this;if(this.is_message)this.setMessages();else{for(var t in this.current_edit_record)if(this.current_edit_record.hasOwnProperty(t)){var i=this.edit_view_ui_dic[t];if(Global.isSet(i))switch(t){case"from_full_name":i.setValue(this.current_edit_record.from_first_name+" "+this.current_edit_record.from_last_name);break;case"to_full_name":i.setValue(this.current_edit_record.to_first_name+" "+this.current_edit_record.to_last_name);break;case"full_name":i.setValue(this.current_edit_record.first_name+" "+this.current_edit_record.last_name);break;case"subject":this.is_edit?Global.isArray(this.messages)?i.setValue("Re: "+this.messages[0].subject):i.setValue("Re: "+this.current_edit_record[t]):this.is_viewing&&i.setValue(this.current_edit_record[t]);break;case"message_body":case"request_body":default:i.setValue(this.current_edit_record[t])}}this.is_message&&this.current_edit_record&&10==this.current_edit_record.status_id&&this.api.markRecipientMessageAsRead([this.current_edit_record.id],{onResult:function(t){e.search(!1)}}),this.collectUIDataToCurrentEditRecord()}this.setEditViewDataDone()}autoOpenEditViewIfNecessary(){switch(LocalCacheData.current_doing_context_action){case"view":if(LocalCacheData.edit_id_for_next_open_view){var e={};e.id=LocalCacheData.edit_id_for_next_open_view,"request"===LocalCacheData.getAllURLArgs().t&&(e.object_id=LocalCacheData.getAllURLArgs().object_id,e.object_type_id=50),this.onViewClick(e),LocalCacheData.edit_id_for_next_open_view=null}break;case"new":this.onAddClick()}this.autoOpenEditOnlyViewIfNecessary()}getDeleteSelectedRecordId(){var e=[];if(this.edit_view){if(!this.current_select_message_control_data)return void TAlertManager.showAlert($.i18n._("Invalid Message id"));e.push(this.current_select_message_control_data.id)}else e=super.getDeleteSelectedRecordId();return e}doDeleteAPICall(e,t){var i=t||{onResult:function(t){this.isReloadViewUI=!1,this.onDeleteResult(t,e)}.bind(this)};return this.api["delete"+this.api.key_name](e,this.folder_id,i)}setEditViewDataDone(){super.setEditViewDataDone(),this.is_viewing?this.is_request&&this.initEmbeddedMessageData():Global.isSet(this.messages)&&(this.messages=null)}setMessages(e){var t=[];this.messages=e||this.current_edit_record,Global.isArray(this.messages)||(this.messages=[this.messages]),this.edit_view_tab.find("#tab_message").find(".edit-view-tab .second-column.message-container").remove();for(var i=$("<div></div>"),s=0;s<this.messages.length;s++){var a=this.messages[s];if(a.hasOwnProperty("id")){10==a.status_id&&t.push(a.id);var n=$("<div></div>",{class:"second-column full-width-column message-container"});if(this.is_message)this.addMessageRow(n,"From","msg_from_full_name",a.from_first_name+" "+a.from_last_name),this.addMessageRow(n,"To","msg_to_full_name",a.to_first_name+" "+a.to_last_name),this.addMessageRow(n,"Date","msg_updated_date",a.updated_date),this.addMessageRow(n,"Subject","msg_subject",a.subject),this.addMessageRow(n,"Body","msg_body",a.body,!0,!0);else{if(!this.is_request)return;this.addMessageRow(n,"From","req_from_full_name",a.from_first_name+" "+a.from_last_name+"@"+a.updated_date),this.addMessageRow(n,"Subject","req_subject",a.subject),this.addMessageRow(n,"Body","req_body",a.body,!0,!0)}i.append(n)}}if(this.edit_view_tab.find("#tab_message").find(".edit-view-tab").append(i.html()),t.length>0){var o=this;this.api.markRecipientMessageAsRead(t,{onResult:function(e){o.search(!1)}})}}addMessageRow(e,t,i,s,a,n){var o=Global.loadWidgetByName(FormItemType.TEXT);o.TText({field:i,selected_able:!0}),this.addEditFieldToColumn($.i18n._(t),o,e,"",null,null,a),n?(o.html(s.linkify({nl2br:!0,className:"linkified"})),o.setResizeEvent()):o.setValue(s),o.css("opacity","1"),delete this.edit_view_ui_dic[i]}initEmbeddedMessageData(){var e=this,t={filter_data:{}};t.filter_data.object_type_id=50,t.filter_data.object_id=this.current_edit_record.id,e.api.getEmbeddedMessage(t,{onResult:function(t){if(e.edit_view){var i=t.getResult();e.setMessages(i)}}})}}}}]);
//# sourceMappingURL=my_account-message_control-MessageControlViewController.bundle.js.map?v=e39e6f1ba4a2de5cfb60