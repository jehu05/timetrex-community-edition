<?php
global $global_table_map;
$global_table_map = [
		'accrual'                                  => 'AccrualFactory',
		'accrual_balance'                          => 'AccrualBalanceFactory',
		'client_payment'                           => 'ClientPaymentFactory',
		'client'                                   => 'ClientFactory',
		'client_balance'                           => 'ClientBalanceFactory',
		'client_group'                             => 'ClientGroupFactory',
		'client_contact'                           => 'ClientContactFactory',
		'company_generic_map'                      => 'CompanyGenericMapFactory',
		'company_generic_tag'                      => 'CompanyGenericTagFactory',
		'company_generic_tag_map'                  => 'CompanyGenericTagMapFactory',
		'recruitment_portal_field_map'             => 'PortalConfigFieldMapFactory',
		'branch'                                   => 'BranchFactory',
		'company_deduction_pay_stub_entry_account' => 'CompanyDeductionPayStubEntryAccountFactory',
		'company_user_count'                       => 'CompanyUserCountFactory',
		'company_deduction'                        => 'CompanyDeductionFactory',
		'wage_group'                               => 'WageGroupFactory',
		'company'                                  => 'CompanyFactory',
		'company_setting'                          => 'CompanySettingFactory',
		'station_user'                             => 'StationUserFactory',
		'system_setting'                           => 'SystemSettingFactory',
		'user_date_total'                          => 'UserDateTotalFactory',
		'currency'                                 => 'CurrencyFactory',
		'currency_rate'                            => 'CurrencyRateFactory',
		'system_log_detail'                        => 'LogDetailFactory',
		'station_exclude_user'                     => 'StationExcludeUserFactory',
		'station_department'                       => 'StationDepartmentFactory',
		'station_include_user'                     => 'StationIncludeUserFactory',
		'exception'                                => 'ExceptionFactory',
		'user_date'                                => 'UserDateFactory',
		'permission'                               => 'PermissionFactory',
		'station'                                  => 'StationFactory',
		'station_user_group'                       => 'StationUserGroupFactory',
		'permission_control'                       => 'PermissionControlFactory',
		'permission_user'                          => 'PermissionUserFactory',
		'other_field'                              => 'OtherFieldFactory',
		'station_branch'                           => 'StationBranchFactory',
		'authorizations'                           => 'AuthorizationFactory',
		'system_log'                               => 'LogFactory',
		'cron'                                     => 'CronJobFactory',
		'department'                               => 'DepartmentFactory',
		'department_branch'                        => 'DepartmentBranchFactory',
		'department_branch_user'                   => 'DepartmentBranchUserFactory',
		'document'                                 => 'DocumentFactory',
		'document_group'                           => 'DocumentGroupFactory',
		'document_revision'                        => 'DocumentRevisionFactory',
		'document_attachment'                      => 'DocumentAttachmentFactory',
		'help_group'                               => 'HelpGroupFactory',
		'help_group_control'                       => 'HelpGroupControlFactory',
		'help'                                     => 'HelpFactory',
		'hierarchy_control'                        => 'HierarchyControlFactory',
		'hierarchy_user'                           => 'HierarchyUserFactory',
		'hierarchy_level'                          => 'HierarchyLevelFactory',
		'hierarchy_share'                          => 'HierarchyShareFactory',
		'hierarchy_object_type'                    => 'HierarchyObjectTypeFactory',
		'hierarchy'                                => 'HierarchyFactory',
		'recurring_holiday'                        => 'RecurringHolidayFactory',
		'holidays'                                 => 'HolidayFactory',
		'invoice_config'                           => 'InvoiceConfigFactory',
		'payment_gateway_credit_card_type'         => 'PaymentGatewayCreditCardTypeFactory',
		'invoice_district'                         => 'InvoiceDistrictFactory',
		'payment_gateway'                          => 'PaymentGatewayFactory',
		'invoice'                                  => 'InvoiceFactory',
		'invoice_transaction'                      => 'TransactionFactory',
		'payment_gateway_currency'                 => 'PaymentGatewayCurrencyFactory',
		'shipping_policy_object'                   => 'ShippingPolicyObjectFactory',
		'area_policy_location'                     => 'AreaPolicyLocationFactory',
		'tax_policy'                               => 'TaxPolicyFactory',
		'shipping_policy'                          => 'ShippingPolicyFactory',
		'area_policy'                              => 'AreaPolicyFactory',
		'tax_policy_object'                        => 'TaxPolicyObjectFactory',
		'job'                                      => 'JobFactory',
		'job_user_allow'                           => 'JobUserAllowFactory',
		'job_group'                                => 'JobGroupFactory',
		'job_item_amendment'                       => 'JobItemAmendmentFactory',
		'job_item_group'                           => 'JobItemGroupFactory',
		'job_item_allow'                           => 'JobItemAllowFactory',
		'job_item'                                 => 'JobItemFactory',
		'message'                                  => 'MessageFactory',
		'message_recipient'                        => 'MessageRecipientFactory',
		'message_sender'                           => 'MessageSenderFactory',
		'message_control'                          => 'MessageControlFactory',
		'income_tax_compare'                       => 'IncomeTaxCompare',
		'pay_period_time_sheet_verify'             => 'PayPeriodTimeSheetVerifyFactory',
		'pay_period'                               => 'PayPeriodFactory',
		'pay_period_schedule'                      => 'PayPeriodScheduleFactory',
		'pay_period_schedule_user'                 => 'PayPeriodScheduleUserFactory',
		'pay_stub_entry'                           => 'PayStubEntryFactory',
		'pay_stub'                                 => 'PayStubFactory',
		'government_document'                      => 'GovernmentDocumentFactory',
		'pay_stub_entry_account_link'              => 'PayStubEntryAccountLinkFactory',
		'pay_stub_entry_account'                   => 'PayStubEntryAccountFactory',
		'recurring_ps_amendment'                   => 'RecurringPayStubAmendmentFactory',
		'recurring_ps_amendment_user'              => 'RecurringPayStubAmendmentUserFactory',
		'pay_stub_amendment'                       => 'PayStubAmendmentFactory',
		'pay_stub_transaction'                     => 'PayStubTransactionFactory',
		'payroll_remittance_agency_event'          => 'PayrollRemittanceAgencyEventFactory',
		'exception_policy'                         => 'ExceptionPolicyFactory',
		'premium_policy_department'                => 'PremiumPolicyDepartmentFactory',
		'round_interval_policy'                    => 'RoundIntervalPolicyFactory',
		'holiday_policy_recurring_holiday'         => 'HolidayPolicyRecurringHolidayFactory',
		'meal_policy'                              => 'MealPolicyFactory',
		'premium_policy'                           => 'PremiumPolicyFactory',
		'pay_code'                                 => 'PayCodeFactory',
		'pay_formula_policy'                       => 'PayFormulaPolicyFactory',
		'contributing_pay_code_policy'             => 'ContributingPayCodePolicyFactory',
		'contributing_shift_policy'                => 'ContributingShiftPolicyFactory',
		'regular_time_policy'                      => 'RegularTimePolicyFactory',
		'over_time_policy'                         => 'OverTimePolicyFactory',
		'schedule_policy'                          => 'SchedulePolicyFactory',
		'break_policy'                             => 'BreakPolicyFactory',
		'premium_policy_job_group'                 => 'PremiumPolicyJobGroupFactory',
		'premium_policy_job_item_group'            => 'PremiumPolicyJobItemGroupFactory',
		'holiday_policy'                           => 'HolidayPolicyFactory',
		'exception_policy_control'                 => 'ExceptionPolicyControlFactory',
		'premium_policy_branch'                    => 'PremiumPolicyBranchFactory',
		'policy_group'                             => 'PolicyGroupFactory',
		'accrual_policy'                           => 'AccrualPolicyFactory',
		'accrual_policy_account'                   => 'AccrualPolicyAccountFactory',
		'accrual_policy_milestone'                 => 'AccrualPolicyMilestoneFactory',
		'accrual_policy_user_modifier'             => 'AccrualPolicyUserModifierFactory',
		'policy_group_user'                        => 'PolicyGroupUserFactory',
		'premium_policy_job'                       => 'PremiumPolicyJobFactory',
		'policy_group_round_interval_policy'       => 'PolicyGroupRoundIntervalPolicyFactory',
		'policy_group_accrual_policy'              => 'PolicyGroupAccrualPolicyFactory',
		'premium_policy_job_item'                  => 'PremiumPolicyJobItemFactory',
		'absence_policy'                           => 'AbsencePolicyFactory',
		'policy_group_over_time_policy'            => 'PolicyGroupOverTimePolicyFactory',
		'policy_group_premium_policy'              => 'PolicyGroupPremiumPolicyFactory',
		'product_tax_policy_product'               => 'ProductTaxPolicyProductFactory',
		'product_price'                            => 'ProductPriceFactory',
		'product_group'                            => 'ProductGroupFactory',
		'product'                                  => 'ProductFactory',
		'punch_control'                            => 'PunchControlFactory',
		'punch'                                    => 'PunchFactory',
		'report_schedule'                          => 'ReportScheduleFactory',
		'report_custom_column'                     => 'ReportCustomColumnFactory',
		'request'                                  => 'RequestFactory',
		'request_schedule'                         => 'RequestScheduleFactory',
		'recurring_schedule_control'               => 'RecurringScheduleControlFactory',
		'schedule'                                 => 'ScheduleFactory',
		'recurring_schedule'                       => 'RecurringScheduleFactory',
		'recurring_schedule_user'                  => 'RecurringScheduleUserFactory',
		'recurring_schedule_template_control'      => 'RecurringScheduleTemplateControlFactory',
		'recurring_schedule_template'              => 'RecurringScheduleTemplateFactory',
		'user_identification'                      => 'UserIdentificationFactory',
		'user_generic_data'                        => 'UserGenericDataFactory',
		'user_preference'                          => 'UserPreferenceFactory',
		'user_title'                               => 'UserTitleFactory',
		'user_default_company_deduction'           => 'UserDefaultCompanyDeductionFactory',
		'user_wage'                                => 'UserWageFactory',
		'user_default'                             => 'UserDefaultFactory',
		'users'                                    => 'UserFactory',
		'user_generic_status'                      => 'UserGenericStatusFactory',
		'user_deduction'                           => 'UserDeductionFactory',
		'user_report_data'                         => 'UserReportDataFactory',
		'bank_account'                             => 'BankAccountFactory',
		'qualification'                            => 'QualificationFactory',
		'qualification_group'                      => 'QualificationGroupFactory',
		'user_skill'                               => 'UserSkillFactory',
		'user_education'                           => 'UserEducationFactory',
		'user_license'                             => 'UserLicenseFactory',
		'user_language'                            => 'UserLanguageFactory',
		'user_membership'                          => 'UserMembershipFactory',
		'user_group'                               => 'UserGroupFactory',
		'kpi'                                      => 'KPIFactory',
		'kpi_group'                                => 'KPIGroupFactory',
		'user_review_control'                      => 'UserReviewControlFactory',
		'user_review'                              => 'UserReviewFactory',
		'user_contact'                             => 'UserContactFactory',
		'job_vacancy'                              => 'JobVacancyFactory',
		'job_applicant'                            => 'JobApplicantFactory',
		'expense_policy'                           => 'ExpensePolicyFactory',
		'user_expense'                             => 'UserExpenseFactory',
		'user_setting'                             => 'UserSettingFactory',
		'roe'                                      => 'ROEFactory',
		'job_application'                          => 'JobApplicationFactory',
		'job_applicant_location'                   => 'JobApplicantLocationFactory',
		'job_applicant_employment'                 => 'JobApplicantEmploymentFactory',
		'job_applicant_reference'                  => 'JobApplicantReferenceFactory',
		'job_applicant_skill'                      => 'JobApplicantSkillFactory',
		'job_applicant_education'                  => 'JobApplicantEducationFactory',
		'job_applicant_license'                    => 'JobApplicantLicenseFactory',
		'job_applicant_language'                   => 'JobApplicantLanguageFactory',
		'job_applicant_membership'                 => 'JobApplicantMembershipFactory',
		'recruitment_portal_config'                => 'RecruitmentPortalConfigFactory',
		'ethnic_group'                             => 'EthnicGroupFactory',
		'legal_entity'                             => 'LegalEntityFactory',
		'payroll_remittance_agency'                => 'PayrollRemittanceAgencyFactory',
		'remittance_source_account'                => 'RemittanceSourceAccountFactory',
		'remittance_destination_account'           => 'RemittanceDestinationAccountFactory',
		'geo_fence'                                => 'GEOFenceFactory',
		'idempotent_request'                       => 'IdempotentRequestFactory',
];
?>
