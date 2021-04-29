<?php
/*********************************************************************************
 * TimeTrex is a Workforce Management program developed by
 * TimeTrex Software Inc. Copyright (C) 2003 - 2021 TimeTrex Software Inc.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by
 * the Free Software Foundation with the addition of the following permission
 * added to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED
 * WORK IN WHICH THE COPYRIGHT IS OWNED BY TIMETREX, TIMETREX DISCLAIMS THE
 * WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * You can contact TimeTrex headquarters at Unit 22 - 2475 Dobbin Rd. Suite
 * #292 West Kelowna, BC V4T 2E9, Canada or at email address info@timetrex.com.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License
 * version 3, these Appropriate Legal Notices must retain the display of the
 * "Powered by TimeTrex" logo. If the display of the logo is not reasonably
 * feasible for technical reasons, the Appropriate Legal Notices must display
 * the words "Powered by TimeTrex".
 ********************************************************************************/


/**
 * @package API\Hierarchy
 */
class APIHierarchyControl extends APIFactory {
	protected $main_class = 'HierarchyControlFactory';

	/**
	 * APIHierarchyControl constructor.
	 */
	public function __construct() {
		parent::__construct(); //Make sure parent constructor is always called.

		return true;
	}

	/**
	 * Get options for dropdown boxes.
	 * @param bool|string $name Name of options to return, ie: 'columns', 'type', 'status'
	 * @param mixed $parent     Parent name/ID of options to return if data is in hierarchical format. (ie: Province)
	 * @return bool|array
	 */
	function getOptions( $name = false, $parent = null ) {
		if ( $name == 'columns'
				&& ( !$this->getPermissionObject()->Check( 'hierarchy', 'enabled' )
						|| !( $this->getPermissionObject()->Check( 'hierarchy', 'view' ) || $this->getPermissionObject()->Check( 'hierarchy', 'view_own' ) || $this->getPermissionObject()->Check( 'hierarchy', 'view_child' ) ) ) ) {
			$name = 'list_columns';
		}

		return parent::getOptions( $name, $parent );
	}

	/**
	 * Get default hierarchy_control data for creating new hierarchy_controles.
	 * @return array
	 */
	function getHierarchyControlDefaultData() {
		$company_obj = $this->getCurrentCompanyObject();

		Debug::Text( 'Getting hierarchy_control default data...', __FILE__, __LINE__, __METHOD__, 10 );

		$data = [
				'company_id' => $company_obj->getId(),
		];

		return $this->returnHandler( $data );
	}

	/**
	 * Get hierarchy_control data for one or more hierarchy_controles.
	 * @param array $data filter data
	 * @param bool $disable_paging
	 * @return array|bool
	 */
	function getHierarchyControl( $data = null, $disable_paging = false ) {
		$data = $this->initializeFilterAndPager( $data, $disable_paging );

		if ( $this->getPermissionObject()->checkAuthenticationType( 700 ) == false ) { //700=HTTP Auth with username/password
			return $this->getPermissionObject()->AuthenticationTypeDenied();
		}

		if ( !$this->getPermissionObject()->Check( 'hierarchy', 'enabled' )
				|| !( $this->getPermissionObject()->Check( 'hierarchy', 'view' ) || $this->getPermissionObject()->Check( 'hierarchy', 'view_own' ) || $this->getPermissionObject()->Check( 'hierarchy', 'view_child' ) ) ) {
			//return $this->getPermissionObject()->PermissionDenied();
			$data['filter_columns'] = $this->handlePermissionFilterColumns( ( isset( $data['filter_columns'] ) ) ? $data['filter_columns'] : null, Misc::trimSortPrefix( $this->getOptions( 'list_columns' ) ) );
		}

		$data['filter_data']['permission_children_ids'] = $this->getPermissionObject()->getPermissionChildren( 'hierarchy', 'view' );

		//Allow getting users from other companies, so we can change admin contacts when using the master company.
		if ( isset( $data['filter_data']['company_id'] )
				&& TTUUID::isUUID( $data['filter_data']['company_id'] ) && $data['filter_data']['company_id'] != TTUUID::getZeroID() && $data['filter_data']['company_id'] != TTUUID::getNotExistID()
				&& ( $this->getPermissionObject()->Check( 'company', 'enabled' ) && $this->getPermissionObject()->Check( 'company', 'view' ) ) ) {
			$company_id = $data['filter_data']['company_id'];
		} else {
			$company_id = $this->getCurrentCompanyObject()->getId();
		}

		$blf = TTnew( 'HierarchyControlListFactory' ); /** @var HierarchyControlListFactory $blf */
		$blf->getAPISearchByCompanyIdAndArrayCriteria( $company_id, $data['filter_data'], $data['filter_items_per_page'], $data['filter_page'], null, $data['filter_sort'] );
		Debug::Text( 'Record Count: ' . $blf->getRecordCount(), __FILE__, __LINE__, __METHOD__, 10 );
		if ( $blf->getRecordCount() > 0 ) {
			$this->getProgressBarObject()->start( $this->getAPIMessageID(), $blf->getRecordCount() );

			$this->setPagerObject( $blf );

			$retarr = [];
			foreach ( $blf as $b_obj ) {
				$retarr[] = $b_obj->getObjectAsArray( $data['filter_columns'] );

				$this->getProgressBarObject()->set( $this->getAPIMessageID(), $blf->getCurrentRow() );
			}

			$this->getProgressBarObject()->stop( $this->getAPIMessageID() );

			return $this->returnHandler( $retarr );
		}

		return $this->returnHandler( true ); //No records returned.
	}

	/**
	 * Export data to csv
	 * @param string $format file format (csv)
	 * @param array $data    filter data
	 * @param bool $disable_paging
	 * @return array
	 */
	function exportHierarchyControl( $format = 'csv', $data = null, $disable_paging = true ) {
		$result = $this->stripReturnHandler( $this->getHierarchyControl( $data, $disable_paging ) );

		return $this->exportRecords( $format, 'export_hierarchy', $result, ( ( isset( $data['filter_columns'] ) ) ? $data['filter_columns'] : null ) );
	}

	/**
	 * Get only the fields that are common across all records in the search criteria. Used for Mass Editing of records.
	 * @param array $data filter data
	 * @return array
	 */
	function getCommonHierarchyControlData( $data ) {
		return Misc::arrayIntersectByRow( $this->stripReturnHandler( $this->getHierarchyControl( $data, true ) ) );
	}

	/**
	 * Validate hierarchy_control data for one or more hierarchy_controles.
	 * @param array $data hierarchy_control data
	 * @return array
	 */
	function validateHierarchyControl( $data ) {
		return $this->setHierarchyControl( $data, true );
	}

	/**
	 * Set hierarchy_control data for one or more hierarchy_controles.
	 * @param array $data hierarchy_control data
	 * @param bool $validate_only
	 * @param bool $ignore_warning
	 * @return array|bool
	 */
	function setHierarchyControl( $data, $validate_only = false, $ignore_warning = true ) {
		$validate_only = (bool)$validate_only;
		$ignore_warning = (bool)$ignore_warning;

		if ( !is_array( $data ) ) {
			return $this->returnHandler( false );
		}

		if ( $this->getPermissionObject()->checkAuthenticationType( 700 ) == false ) { //700=HTTP Auth with username/password
			return $this->getPermissionObject()->AuthenticationTypeDenied();
		}

		if ( !$this->getPermissionObject()->Check( 'hierarchy', 'enabled' )
				|| !( $this->getPermissionObject()->Check( 'hierarchy', 'edit' ) || $this->getPermissionObject()->Check( 'hierarchy', 'edit_own' ) || $this->getPermissionObject()->Check( 'hierarchy', 'edit_child' ) || $this->getPermissionObject()->Check( 'hierarchy', 'add' ) ) ) {
			return $this->getPermissionObject()->PermissionDenied();
		}

		if ( $validate_only == true ) {
			Debug::Text( 'Validating Only!', __FILE__, __LINE__, __METHOD__, 10 );
		}

		list( $data, $total_records ) = $this->convertToMultipleRecords( $data );
		Debug::Text( 'Received data for: ' . $total_records . ' HierarchyControls', __FILE__, __LINE__, __METHOD__, 10 );
		Debug::Arr( $data, 'Data: ', __FILE__, __LINE__, __METHOD__, 10 );

		$validator_stats = [ 'total_records' => $total_records, 'valid_records' => 0 ];
		$validator = $save_result = $key = false;
		if ( is_array( $data ) && $total_records > 0 ) {
			$this->getProgressBarObject()->start( $this->getAPIMessageID(), $total_records );

			foreach ( $data as $key => $row ) {
				$primary_validator = new Validator();
				$lf = TTnew( 'HierarchyControlListFactory' ); /** @var HierarchyControlListFactory $lf */
				$lf->StartTransaction();
				if ( isset( $row['id'] ) && $row['id'] != '' ) {
					//Modifying existing object.
					//Get hierarchy_control object, so we can only modify just changed data for specific records if needed.
					$lf->getByIdAndCompanyId( $row['id'], $this->getCurrentCompanyObject()->getId() );
					if ( $lf->getRecordCount() == 1 ) {
						//Object exists, check edit permissions
						if (
								$validate_only == true
								||
								(
										$this->getPermissionObject()->Check( 'hierarchy', 'edit' )
										|| ( $this->getPermissionObject()->Check( 'hierarchy', 'edit_own' ) && $this->getPermissionObject()->isOwner( $lf->getCurrent()->getCreatedBy(), $lf->getCurrent()->getID() ) === true )
								) ) {

							Debug::Text( 'Row Exists, getting current data for ID: ' . $row['id'], __FILE__, __LINE__, __METHOD__, 10 );
							$lf = $lf->getCurrent();
							$row = array_merge( $lf->getObjectAsArray(), $row );
						} else {
							$primary_validator->isTrue( 'permission', false, TTi18n::gettext( 'Edit permission denied' ) );
						}
					} else {
						//Object doesn't exist.
						$primary_validator->isTrue( 'id', false, TTi18n::gettext( 'Edit permission denied, record does not exist' ) );
					}
				} else {
					//Adding new object, check ADD permissions.
					$primary_validator->isTrue( 'permission', $this->getPermissionObject()->Check( 'hierarchy', 'add' ), TTi18n::gettext( 'Add permission denied' ) );

					//Because this class has sub-classes that depend on it, when adding a new record we need to make sure the ID is set first,
					//so the sub-classes can depend on it. We also need to call Save( TRUE, TRUE ) to force a lookup on isNew()
					$row['id'] = $lf->getNextInsertId();
				}
				Debug::Arr( $row, 'Data: ', __FILE__, __LINE__, __METHOD__, 10 );

				$is_valid = $primary_validator->isValid();
				if ( $is_valid == true ) { //Check to see if all permission checks passed before trying to save data.
					Debug::Text( 'Setting object data...', __FILE__, __LINE__, __METHOD__, 10 );

					//Force Company ID to current company.
					$row['company_id'] = $this->getCurrentCompanyObject()->getId();

					$lf->setObjectFromArray( $row );

					$is_valid = $lf->isValid( $ignore_warning );
					if ( $is_valid == true ) {
						Debug::Text( 'Saving data...', __FILE__, __LINE__, __METHOD__, 10 );
						if ( $validate_only == true ) {
							$save_result[$key] = true;
						} else {
							$save_result[$key] = $lf->Save( true, true );
						}
						$validator_stats['valid_records']++;
					}
				}

				if ( $is_valid == false ) {
					Debug::Text( 'Data is Invalid...', __FILE__, __LINE__, __METHOD__, 10 );

					$lf->FailTransaction(); //Just rollback this single record, continue on to the rest.

					$validator[$key] = $this->setValidationArray( [ $primary_validator, $lf ] );
				} else if ( $validate_only == true ) {
					$lf->FailTransaction();
				}


				$lf->CommitTransaction();

				$this->getProgressBarObject()->set( $this->getAPIMessageID(), $key );
			}

			$this->getProgressBarObject()->stop( $this->getAPIMessageID() );

			return $this->handleRecordValidationResults( $validator, $validator_stats, $key, $save_result );
		}

		return $this->returnHandler( false );
	}

	/**
	 * Delete one or more hierarchy_controls.
	 * @param array $data hierarchy_control data
	 * @return array|bool
	 */
	function deleteHierarchyControl( $data ) {
		if ( !is_array( $data ) ) {
			$data = [ $data ];
		}

		if ( !is_array( $data ) ) {
			return $this->returnHandler( false );
		}

		if ( !$this->getPermissionObject()->Check( 'hierarchy', 'enabled' )
				|| !( $this->getPermissionObject()->Check( 'hierarchy', 'delete' ) || $this->getPermissionObject()->Check( 'hierarchy', 'delete_own' ) || $this->getPermissionObject()->Check( 'hierarchy', 'delete_child' ) ) ) {
			return $this->getPermissionObject()->PermissionDenied();
		}

		Debug::Text( 'Received data for: ' . count( $data ) . ' HierarchyControls', __FILE__, __LINE__, __METHOD__, 10 );
		Debug::Arr( $data, 'Data: ', __FILE__, __LINE__, __METHOD__, 10 );

		$total_records = count( $data );
		$validator = $save_result = $key = false;
		$validator_stats = [ 'total_records' => $total_records, 'valid_records' => 0 ];
		if ( is_array( $data ) && $total_records > 0 ) {
			$this->getProgressBarObject()->start( $this->getAPIMessageID(), $total_records );

			foreach ( $data as $key => $id ) {
				$primary_validator = new Validator();
				$lf = TTnew( 'HierarchyControlListFactory' ); /** @var HierarchyControlListFactory $lf */
				$lf->StartTransaction();
				if ( $id != '' ) {
					//Modifying existing object.
					//Get hierarchy_control object, so we can only modify just changed data for specific records if needed.
					$lf->getByIdAndCompanyId( $id, $this->getCurrentCompanyObject()->getId() );
					if ( $lf->getRecordCount() == 1 ) {
						//Object exists, check edit permissions
						if ( $this->getPermissionObject()->Check( 'hierarchy', 'delete' )
								|| ( $this->getPermissionObject()->Check( 'hierarchy', 'delete_own' ) && $this->getPermissionObject()->isOwner( $lf->getCurrent()->getCreatedBy(), $lf->getCurrent()->getID() ) === true ) ) {
							Debug::Text( 'Record Exists, deleting record ID: ' . $id, __FILE__, __LINE__, __METHOD__, 10 );
							$lf = $lf->getCurrent();
						} else {
							$primary_validator->isTrue( 'permission', false, TTi18n::gettext( 'Delete permission denied' ) );
						}
					} else {
						//Object doesn't exist.
						$primary_validator->isTrue( 'id', false, TTi18n::gettext( 'Delete permission denied, record does not exist' ) );
					}
				} else {
					$primary_validator->isTrue( 'id', false, TTi18n::gettext( 'Delete permission denied, record does not exist' ) );
				}

				//Debug::Arr($lf, 'AData: ', __FILE__, __LINE__, __METHOD__, 10);

				$is_valid = $primary_validator->isValid();
				if ( $is_valid == true ) { //Check to see if all permission checks passed before trying to save data.
					Debug::Text( 'Attempting to delete record...', __FILE__, __LINE__, __METHOD__, 10 );
					$lf->setDeleted( true );

					$is_valid = $lf->isValid();
					if ( $is_valid == true ) {
						Debug::Text( 'Record Deleted...', __FILE__, __LINE__, __METHOD__, 10 );
						$save_result[$key] = $lf->Save();
						$validator_stats['valid_records']++;
					}
				}

				if ( $is_valid == false ) {
					Debug::Text( 'Data is Invalid...', __FILE__, __LINE__, __METHOD__, 10 );

					$lf->FailTransaction(); //Just rollback this single record, continue on to the rest.

					$validator[$key] = $this->setValidationArray( [ $primary_validator, $lf ] );
				}

				$lf->CommitTransaction();

				$this->getProgressBarObject()->set( $this->getAPIMessageID(), $key );
			}

			$this->getProgressBarObject()->stop( $this->getAPIMessageID() );

			return $this->handleRecordValidationResults( $validator, $validator_stats, $key, $save_result );
		}

		return $this->returnHandler( false );
	}

	/**
	 * Copy one or more hierarchy_controls, does not include subordinates though.
	 * @param array $data hierarchy_control IDs
	 * @return array
	 */
	function copyHierarchyControl( $data ) {
		if ( !is_array( $data ) ) {
			$data = [ $data ];
		}

		if ( !is_array( $data ) ) {
			return $this->returnHandler( false );
		}

		Debug::Text( 'Received data for: ' . count( $data ) . ' HierarchyControls', __FILE__, __LINE__, __METHOD__, 10 );
		Debug::Arr( $data, 'Data: ', __FILE__, __LINE__, __METHOD__, 10 );

		$src_rows = $this->stripReturnHandler( $this->getHierarchyControl( [ 'filter_data' => [ 'id' => $data ] ], true ) );
		if ( is_array( $src_rows ) && count( $src_rows ) > 0 ) {
			Debug::Arr( $src_rows, 'SRC Rows: ', __FILE__, __LINE__, __METHOD__, 10 );
			$original_ids = [];
			foreach ( $src_rows as $key => $row ) {
				$original_ids[$key] = $src_rows[$key]['id'];
				unset( $src_rows[$key]['id'], $src_rows[$key]['user'] );          //Clear fields that can't be copied
				$src_rows[$key]['name'] = Misc::generateCopyName( $row['name'] ); //Generate unique name
			}
			//Debug::Arr($src_rows, 'bSRC Rows: ', __FILE__, __LINE__, __METHOD__, 10);

			$retval = $this->setHierarchyControl( $src_rows ); //Save copied rows

			//Now we need to loop through the result set, and copy the hierarchy level records themselves as well.
			if ( empty( $original_ids ) == false ) {
				Debug::Arr( $original_ids, ' Original IDs: ', __FILE__, __LINE__, __METHOD__, 10 );

				foreach ( $original_ids as $key => $original_id ) {
					$new_id = null;
					if ( is_array( $retval ) ) {
						if ( isset( $retval['api_retval'] )
								&& TTUUID::isUUID( $retval['api_retval'] ) && $retval['api_retval'] != TTUUID::getZeroID() && $retval['api_retval'] != TTUUID::getNotExistID() ) {
							$new_id = $retval['api_retval'];
						} else if ( isset( $retval['api_details']['details'][$key] ) ) {
							$new_id = $retval['api_details']['details'][$key];
						}
					} else if ( TTUUID::isUUID( $retval ) ) {
						$new_id = $retval;
					}

					if ( $new_id !== null ) {
						$hllf = TTnew( 'APIHierarchyLevel' ); /** @var APIHierarchyLevel $hllf */
						$level_src_rows = $this->stripReturnHandler( $hllf->getHierarchyLevel( [ 'filter_data' => [ 'hierarchy_control_id' => $original_id ] ], true ) );
						if ( is_array( $level_src_rows ) && count( $level_src_rows ) > 0 ) {
							//Debug::Arr($template_src_rows, 'TEMPLATE SRC Rows: ', __FILE__, __LINE__, __METHOD__, 10);
							foreach ( $level_src_rows as $key_b => $row ) {
								unset( $level_src_rows[$key_b]['id'] ); //Clear fields that can't be copied
								$level_src_rows[$key_b]['hierarchy_control_id'] = $new_id;
							}

							$hllf->setHierarchyLevel( $level_src_rows ); //Save copied rows
						}
					}
				}
			}

			return $this->returnHandler( $retval );
		}

		return $this->returnHandler( false );
	}

	/**
	 * Get hierarchy control options sorted by object_type_id
	 * @param bool $include_blank
	 * @return array
	 */
	function getHierarchyControlOptions( $include_blank = true ) {
		$hclf = TTnew( 'HierarchyControlListFactory' ); /** @var HierarchyControlListFactory $hclf */

		//If the currently logged in user is supervisor (subordinates only), then only show hierarchies they are a superior in.
		if ( $this->getPermissionObject()->Check( 'user', 'view' ) == true ) {
			$hclf->getObjectTypeAppendedListByCompanyID( $this->getCurrentCompanyObject()->getId() );
		} else {
			$hclf->getObjectTypeAppendedListByCompanyIDAndSuperiorUserID( $this->getCurrentCompanyObject()->getId(), $this->getCurrentUserObject()->getId() );
		}

		$hierarchy_control_options = $hclf->getArrayByListFactory( $hclf, $include_blank, true );
		if ( is_array( $hierarchy_control_options ) ) {
			$retarr = [];
			foreach ( $hierarchy_control_options as $hierarchy_control_object_type_id => $hierarchy_control_option ) {
				$retarr[$hierarchy_control_object_type_id] = Misc::addSortPrefix( $hierarchy_control_option );
			}

			//Debug::Arr($retarr, 'Hierarchy Control Options: ', __FILE__, __LINE__, __METHOD__, 10);
			return $this->returnHandler( $retarr );
		}

		return $this->returnHandler( $hierarchy_control_options );
	}
}

?>
