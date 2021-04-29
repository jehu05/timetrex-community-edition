<?php
/*********************************************************************************
 * TimeTrex is a Workforce Management program developed by
 * TimeTrex Software Inc. Copyright (C) 2003 - 2018 TimeTrex Software Inc.
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
 * @package Core
 */
class TTDate {
	static protected $time_zone = NULL;
	static protected $date_format = 'd-M-y';
	static protected $time_format = 'g:i A T';
	static protected $time_unit_format = 20; //Hours

	static protected $month_arr = array(
										'jan' => 1,
										'january' => 1,
										'feb' => 2,
										'february' => 2,
										'mar' => 3,
										'march' => 3,
										'apr' => 4,
										'april' => 4,
										'may' => 5,
										'jun' => 6,
										'june' => 6,
										'jul' => 7,
										'july' => 7,
										'aug' => 8,
										'august' => 8,
										'sep' => 9,
										'september' => 9,
										'oct' => 10,
										'october' => 10,
										'nov' => 11,
										'november' => 11,
										'dec' => 12,
										'december' => 12
										);

	static $day_of_week_arr = NULL;

	static $long_month_of_year_arr = NULL;
	static $short_month_of_year_arr = NULL;

	/**
	 * TTDate constructor.
	 */
	function __construct() {
		self::setTimeZone();
	}

	/**
	 * @return array
	 */
	private	 static function _get_month_short_names() {
		// i18n: This private method is not called anywhere in the class. (it is now)
		//		 It's purpose is simply to ensure that the short (3 letter)
		//		 month forms are included in getText() calls so that they
		//		 will be properly extracted for translation.
		return array (
				1 => TTi18n::getText('Jan'),
				2 => TTi18n::getText('Feb'),
				3 => TTi18n::getText('Mar'),
				4 => TTi18n::getText('Apr'),
				5 => TTi18n::getText('May'),
				6 => TTi18n::getText('Jun'),
				7 => TTi18n::getText('Jul'),
				8 => TTi18n::getText('Aug'),
				9 => TTi18n::getText('Sep'),
				10 => TTi18n::getText('Oct'),
				11 => TTi18n::getText('Nov'),
				12 => TTi18n::getText('Dec'),
				);
	}

	/**
	 * @return array
	 */
	private static function _get_month_long_names() {
		// i18n: It's purpose is simply to ensure that the short (3 letter)
		//		 month forms are included in getText() calls so that they
		//		 will be properly extracted for translation.
		return array (
				1 => TTi18n::getText('January'),
				2 => TTi18n::getText('February'),
				3 => TTi18n::getText('March'),
				4 => TTi18n::getText('April'),
				5 => TTi18n::getText('May'),
				6 => TTi18n::getText('June'),
				7 => TTi18n::getText('July'),
				8 => TTi18n::getText('August'),
				9 => TTi18n::getText('September'),
				10 => TTi18n::getText('October'),
				11 => TTi18n::getText('November'),
				12 => TTi18n::getText('December')
				);
	}

	/**
	 * @param int $epoch EPOCH
	 * @return bool
	 */
	public static function isDST( $epoch = NULL ) {
		if ( $epoch == NULL ) {
			$epoch = TTDate::getTime();
		}

		$dst = date('I', $epoch);
		//Debug::text('Epoch: '. TTDate::getDate('DATE+TIME', $epoch) .' DST: '. $dst, __FILE__, __LINE__, __METHOD__, 10);
		return (bool)$dst;
	}

	/**
	 * @return string
	 */
	public static function getTimeZone() {
		if ( self::$time_zone == '' ) {
			Debug::text('ERROR: Timezone was not set prior to getting it!', __FILE__, __LINE__, __METHOD__, 10);
			return 'GMT';
		} else {
			return self::$time_zone;
		}
	}

	/**
	 * Attempts to detect the full time zone in use by the system on both Windows and Linux.
	 * @return string
	 */
	public static function detectSystemTimeZone() {
		$retval = 'GMT';

		$php_detault_time_zone = date('e');
		Debug::text('PHP Default TimeZone: '. $php_detault_time_zone, __FILE__, __LINE__, __METHOD__, 10);
		if ( $php_detault_time_zone == '' OR $php_detault_time_zone == 'GMT' OR $php_detault_time_zone == 'UTC' OR strtolower($php_detault_time_zone) == 'system/localtime' ) {
			//Fall back to detecting it from the OS.
			if ( OPERATING_SYSTEM == 'WIN' ) {
				// getting the timezone
				$os_time_zone = trim( exec('tzutil /g') );

				$windows_to_olson_time_zone_map = array(
						'AUS Central Standard Time'       => 'Australia/Darwin',
						'AUS Eastern Standard Time'       => 'Australia/Sydney',
						'Afghanistan Standard Time'       => 'Asia/Kabul',
						'Alaskan Standard Time'           => 'America/Anchorage',
						'Arab Standard Time'              => 'Asia/Riyadh',
						'Arabian Standard Time'           => 'Asia/Dubai',
						'Arabic Standard Time'            => 'Asia/Baghdad',
						'Argentina Standard Time'         => 'America/Buenos_Aires',
						'Atlantic Standard Time'          => 'America/Halifax',
						'Azerbaijan Standard Time'        => 'Asia/Baku',
						'Azores Standard Time'            => 'Atlantic/Azores',
						'Bahia Standard Time'             => 'America/Bahia',
						'Bangladesh Standard Time'        => 'Asia/Dhaka',
						'Canada Central Standard Time'    => 'America/Regina',
						'Cape Verde Standard Time'        => 'Atlantic/Cape_Verde',
						'Caucasus Standard Time'          => 'Asia/Yerevan',
						'Cen. Australia Standard Time'    => 'Australia/Adelaide',
						'Central America Standard Time'   => 'America/Guatemala',
						'Central Asia Standard Time'      => 'Asia/Almaty',
						'Central Brazilian Standard Time' => 'America/Cuiaba',
						'Central Europe Standard Time'    => 'Europe/Budapest',
						'Central European Standard Time'  => 'Europe/Warsaw',
						'Central Pacific Standard Time'   => 'Pacific/Guadalcanal',
						'Central Standard Time'           => 'America/Chicago',
						'Central Standard Time (Mexico)'  => 'America/Mexico_City',
						'China Standard Time'             => 'Asia/Shanghai',
						'Dateline Standard Time'          => 'Etc/GMT+12',
						'E. Africa Standard Time'         => 'Africa/Nairobi',
						'E. Australia Standard Time'      => 'Australia/Brisbane',
						'E. Europe Standard Time'         => 'Asia/Nicosia',
						'E. South America Standard Time'  => 'America/Sao_Paulo',
						'Eastern Standard Time'           => 'America/New_York',
						'Egypt Standard Time'             => 'Africa/Cairo',
						'Ekaterinburg Standard Time'      => 'Asia/Yekaterinburg',
						'FLE Standard Time'               => 'Europe/Kiev',
						'Fiji Standard Time'              => 'Pacific/Fiji',
						'GMT Standard Time'               => 'Europe/London',
						'GTB Standard Time'               => 'Europe/Bucharest',
						'Georgian Standard Time'          => 'Asia/Tbilisi',
						'Greenland Standard Time'         => 'America/Godthab',
						'Greenwich Standard Time'         => 'Atlantic/Reykjavik',
						'Hawaiian Standard Time'          => 'Pacific/Honolulu',
						'India Standard Time'             => 'Asia/Calcutta',
						'Iran Standard Time'              => 'Asia/Tehran',
						'Israel Standard Time'            => 'Asia/Jerusalem',
						'Jordan Standard Time'            => 'Asia/Amman',
						'Kaliningrad Standard Time'       => 'Europe/Kaliningrad',
						'Korea Standard Time'             => 'Asia/Seoul',
						'Magadan Standard Time'           => 'Asia/Magadan',
						'Mauritius Standard Time'         => 'Indian/Mauritius',
						'Middle East Standard Time'       => 'Asia/Beirut',
						'Montevideo Standard Time'        => 'America/Montevideo',
						'Morocco Standard Time'           => 'Africa/Casablanca',
						'Mountain Standard Time'          => 'America/Denver',
						'Mountain Standard Time (Mexico)' => 'America/Chihuahua',
						'Myanmar Standard Time'           => 'Asia/Rangoon',
						'N. Central Asia Standard Time'   => 'Asia/Novosibirsk',
						'Namibia Standard Time'           => 'Africa/Windhoek',
						'Nepal Standard Time'             => 'Asia/Katmandu',
						'New Zealand Standard Time'       => 'Pacific/Auckland',
						'Newfoundland Standard Time'      => 'America/St_Johns',
						'North Asia East Standard Time'   => 'Asia/Irkutsk',
						'North Asia Standard Time'        => 'Asia/Krasnoyarsk',
						'Pacific SA Standard Time'        => 'America/Santiago',
						'Pacific Standard Time'           => 'America/Los_Angeles',
						'Pacific Standard Time (Mexico)'  => 'America/Santa_Isabel',
						'Pakistan Standard Time'          => 'Asia/Karachi',
						'Paraguay Standard Time'          => 'America/Asuncion',
						'Romance Standard Time'           => 'Europe/Paris',
						'Russian Standard Time'           => 'Europe/Moscow',
						'SA Eastern Standard Time'        => 'America/Cayenne',
						'SA Pacific Standard Time'        => 'America/Bogota',
						'SA Western Standard Time'        => 'America/La_Paz',
						'SE Asia Standard Time'           => 'Asia/Bangkok',
						'Samoa Standard Time'             => 'Pacific/Apia',
						'Singapore Standard Time'         => 'Asia/Singapore',
						'South Africa Standard Time'      => 'Africa/Johannesburg',
						'Sri Lanka Standard Time'         => 'Asia/Colombo',
						'Syria Standard Time'             => 'Asia/Damascus',
						'Taipei Standard Time'            => 'Asia/Taipei',
						'Tasmania Standard Time'          => 'Australia/Hobart',
						'Tokyo Standard Time'             => 'Asia/Tokyo',
						'Tonga Standard Time'             => 'Pacific/Tongatapu',
						'Turkey Standard Time'            => 'Europe/Istanbul',
						'US Eastern Standard Time'        => 'America/Indianapolis',
						'US Mountain Standard Time'       => 'America/Phoenix',
						'UTC'                             => 'Etc/GMT',
						'UTC+12'                          => 'Etc/GMT-12',
						'UTC-02'                          => 'Etc/GMT+2',
						'UTC-11'                          => 'Etc/GMT+11',
						'Ulaanbaatar Standard Time'       => 'Asia/Ulaanbaatar',
						'Venezuela Standard Time'         => 'America/Caracas',
						'Vladivostok Standard Time'       => 'Asia/Vladivostok',
						'W. Australia Standard Time'      => 'Australia/Perth',
						'W. Central Africa Standard Time' => 'Africa/Lagos',
						'W. Europe Standard Time'         => 'Europe/Berlin',
						'West Asia Standard Time'         => 'Asia/Tashkent',
						'West Pacific Standard Time'      => 'Pacific/Port_Moresby',
						'Yakutsk Standard Time'           => 'Asia/Yakutsk',
				);

				if ( isset($windows_to_olson_time_zone_map[$os_time_zone]) ) {
					Debug::text('Windows TimeZone: '. $os_time_zone .' Converted To: '. $windows_to_olson_time_zone_map[$os_time_zone], __FILE__, __LINE__, __METHOD__, 10);
					$os_time_zone = $windows_to_olson_time_zone_map[$os_time_zone];
				} else {
					Debug::text('Windows TimeZone: '. $os_time_zone, __FILE__, __LINE__, __METHOD__, 10);
				}
			} else {
				if ( is_link( '/etc/localtime' ) ) {
					// Mac OS X (and older Linuxes)
					// /etc/localtime is a symlink to the
					// timezone in /usr/share/zoneinfo.
					$filename = readlink( '/etc/localtime' );
					if ( strpos( $filename, '/usr/share/zoneinfo/' ) === 0 ) {
						$os_time_zone = substr( $filename, 20 );
					}
				} elseif ( file_exists( '/etc/timezone' ) ) {
					// Ubuntu / Debian.
					$data = file_get_contents( '/etc/timezone' );
					if ( $data ) {
						$os_time_zone = $data;
					}
				} elseif ( file_exists( '/etc/sysconfig/clock' ) ) {
					// RHEL / CentOS
					$data = parse_ini_file( '/etc/sysconfig/clock' );
					if ( !empty( $data['ZONE'] ) ) {
						$os_time_zone = $data['ZONE'];
					}
				}
			}

			Debug::text('OS TimeZone: '. $os_time_zone, __FILE__, __LINE__, __METHOD__, 10);
			if ( $os_time_zone != '' ) {
				$retval = $os_time_zone;
			}
		} else {
			$retval = $php_detault_time_zone;
		}

		return $retval;
	}

	/**
	 * @param null $time_zone
	 * @param bool $force
	 * @param bool $execute_sql_now
	 * @return bool
	 */
	public static function setTimeZone( $time_zone = NULL, $force = FALSE, $execute_sql_now = TRUE ) {
		global $config_vars, $current_user_prefs;

		$time_zone = Misc::trimSortPrefix( trim($time_zone) );

		//Default to system local timezone if no timezone is specified.
		//Zero UUIDs might come from Station timezone field.
		if ( $time_zone == '' OR $time_zone == TTUUID::getZeroID() OR strtolower($time_zone) == 'system/localtime' ) { //System/Localtime is an invalid timezone, so default to GMT instead.
			if ( isset($current_user_prefs) AND is_object($current_user_prefs) ) {
				//When TTDate is called from the API directly, its not called statically, so
				//this forces __construct() to call setTimeZone and for the timezone to be set back to the system defined timezone after
				//$current_user->getUserPreferenceObject()->setDateTimePreferences(); is called.
				//This checks to see if a user is logged in and uses their own preferences instead.
				$time_zone = $current_user_prefs->getTimeZone();
			} elseif ( isset($config_vars['other']['system_timezone']) ) {
				$time_zone = $config_vars['other']['system_timezone'];
			} else {
				//$time_zone = date('e'); //Newer versions of PHP return System/Localtime which is invalid, so force to GMT instead
				$time_zone = 'GMT';
			}
		}

		if ( $force == FALSE AND $time_zone == self::$time_zone ) {
			Debug::text('TimeZone already set to: '. $time_zone, __FILE__, __LINE__, __METHOD__, 10);
			return TRUE;
		}

		if ( $time_zone != '' ) {
			Debug::text('Setting TimeZone: '. $time_zone, __FILE__, __LINE__, __METHOD__, 10);

			global $db;
			if ( isset($db) AND is_object($db) ) {
				if ( strncmp($db->databaseType, 'postgres', 8) == 0 ) {
					//PostgreSQL 9.2+ defaults to GMT in many cases, which causes problems with strtotime() and parsing date column types.
					//Since date columns return times like: 2014-01-01 00:00:00+00, if the timezone in PHP is PST8PDT it parses to 31-Dec-13 4:00 PM

					//$execute_sql_now is used in database.inc.php to help delay making a SQL query if not needed. Specifically when calling into APIProgress.
					if ( $db instanceOf ADOdbLoadBalancer ) {
						$result = $db->setSessionVariable( 'TIME ZONE', $db->qstr($time_zone), $execute_sql_now );
					} else {
						$result = @$db->Execute('SET SESSION TIME ZONE '. $db->qstr($time_zone) );
					}
				} elseif ( strncmp($db->databaseType, 'mysql', 5) == 0 ) {
					if ( $db instanceOf ADOdbLoadBalancer ) {
						$result = $db->setSessionVariable( 'time_zone', '='.$db->qstr($time_zone), $execute_sql_now );
					} else {
						$result = @$db->Execute('SET SESSION time_zone='. $db->qstr($time_zone) );
					}
				}

				if ( $result == FALSE ) {
					Debug::text('ERROR: Setting TimeZone: '. $time_zone .' DB Type: '. $db->databaseType, __FILE__, __LINE__, __METHOD__, 10);
					return FALSE;
				}
			}

			//Set timezone AFTER MySQL query above, so if it fails we don't set the timezone below at all.
			self::$time_zone = $time_zone;

			@date_default_timezone_set( $time_zone );
			putenv('TZ='.$time_zone);

			return TRUE;
		} else {
			//PHP doesn't have a unsetenv(), so this will cause the system to default to UTC.
			//If we don't do this then looping over users and setting timezones, if a user
			//doesn't have a timezone set, it will cause them to use the previous users timezone.
			//This way they at least use UTC and hopefully the issue will stand out more.
			//date_default_timezone_set( '' );
			putenv('TZ=');
		}

		return FALSE;
	}

	/**
	 * @param int $date_format EPOCH
	 * @return bool
	 */
	public static function setDateFormat( $date_format) {
		$date_format = trim($date_format);

		Debug::text('Setting Default Date Format: '. $date_format, __FILE__, __LINE__, __METHOD__, 10);

		if ( !empty($date_format) ) {
			self::$date_format = $date_format;

			return TRUE;
		}

		return FALSE;
	}

	/**
	 * @param $time_format
	 * @return bool
	 */
	public static function setTimeFormat( $time_format) {
		$time_format = trim($time_format);

		Debug::text('Setting Default Time Format: '. $time_format, __FILE__, __LINE__, __METHOD__, 10);

		if ( !empty($time_format) ) {
			self::$time_format = $time_format;

			return TRUE;
		}

		return FALSE;
	}

	/**
	 * @param $time_unit_format
	 * @return bool
	 */
	public static function setTimeUnitFormat( $time_unit_format) {
		$time_unit_format = trim($time_unit_format);

		Debug::text('Setting Default Time Unit Format: '. $time_unit_format, __FILE__, __LINE__, __METHOD__, 10);

		if ( !empty($time_unit_format) ) {
			self::$time_unit_format = $time_unit_format;

			return TRUE;
		}

		return FALSE;
	}

	/**
	 * @return false|string
	 */
	public static function getTimeZoneOffset() {
		return date('Z');
	}

	/**
	 * @param int $epoch EPOCH
	 * @param $timezone
	 * @return mixed
	 */
	public static function convertTimeZone( $epoch, $timezone ) {
		if ( $timezone == '' ) {
			return $epoch;
		}

		$old_timezone_offset = TTDate::getTimeZoneOffset();

		try {
			//Use PEAR Date class to convert timezones instead of PHP v5.2 date object so we can still use older PHP versions for distros like CentOS.
			require_once('Date.php');

			$d = new Date( date('r', $epoch ) );
			$tz = new Date_TimeZone( $timezone );

			$new_timezone_offset = ( $tz->getOffset( $d ) / 1000 );
			Debug::text('Converting time: '. $epoch .' to TimeZone: '. $timezone .' Offset: '. $new_timezone_offset, __FILE__, __LINE__, __METHOD__, 10);

			return ( $epoch - ( $old_timezone_offset - $new_timezone_offset ) );
		} catch (Exception $e) {
			unset($e); //code standards
			return $epoch;
		}

		return $epoch;
	}

	/**
	 * @param $seconds
	 * @param bool $include_seconds
	 * @return string
	 */
	public static function convertSecondsToHMS( $seconds, $include_seconds = FALSE ) {
		if ( $seconds < 0 ) {
			$negative_number = TRUE;
		} else {
			$negative_number = FALSE;
		}

		//Check to see if the value is larger than PHP_INT_MAX, so we can switch to using bcmath if needed.
		if (
				( //Check if we're passed a numeric string value that is greater than PHP_INT_MAX.
					is_string( $seconds ) == TRUE
					AND
					(
						( $negative_number == FALSE AND bccomp($seconds, PHP_INT_MAX, 0) === 1 )
						OR
						( $negative_number == TRUE AND bccomp($seconds, ( PHP_INT_MAX * -1 ), 0) === -1 )
					)
				)
			) {
			//Greater than PHP_INT_MAX, use bcmath
			//Debug::Text( 'BIGINT Seconds: '. $seconds, __FILE__, __LINE__, __METHOD__, 10);

			if ( $negative_number == TRUE ) {
				$seconds = substr($seconds, 1); //Remove negative sign to get absolute value.
			}

			//Check to see if there are decimals.
			if ( strpos($seconds, '.') !== FALSE ) {
				$seconds = bcadd( $seconds, 0, 0); //Using scale(0), drop everything after the decimal, as that is fractions of a second. Could try rounding this instead, but its difficult with large values.
			}

			if ( $include_seconds == TRUE ) {
				$retval = sprintf( '%02d:%02d:%02d', bcdiv( $seconds, 3600 ), bcmod( bcdiv( $seconds, 60 ), 60 ), bcmod( $seconds, 60 ) );
			} else {
				$retval = sprintf( '%02d:%02d', bcdiv( $seconds, 3600 ), bcmod( bcdiv( $seconds, 60 ), 60 ) );
			}
		} else {
			if ( //Check if we're passed a FLOAT value that is greater than PHP_INT_MAX, as precision has been lost if that is the case.
					is_float($seconds) == TRUE
					AND
					(
						( $negative_number == FALSE AND $seconds > PHP_INT_MAX )
						OR
						( $negative_number == TRUE AND $seconds < ( PHP_INT_MAX * -1 ) )
					)
				) {
				Debug::Text( '  ERROR: Float value outside range, should be using BCMATH instead? Seconds: '. $seconds, __FILE__, __LINE__, __METHOD__, 10);
				//return 'ERR(FLOAT)'; //Deactive this for now until we have more testing.
			}
			//else {
				$seconds = round( abs( $seconds ) );

				//Using sprintf() is much more efficient, and handles large integers better too.
				if ( $include_seconds == TRUE ) {
					$retval = sprintf( '%02d:%02d:%02d', ( $seconds / 3600 ), ( ( $seconds / 60 ) % 60 ), ( $seconds % 60 ) );
				} else {
					$retval = sprintf( '%02d:%02d', ( $seconds / 3600 ), ( ( $seconds / 60 ) % 60 ) );
				}
			//}
		}

		if ( $negative_number == TRUE ) {
			$negative = '-';
		} else {
			$negative = '';
		}

		return $negative.$retval;
	}

	/**
	 * @param $time_unit
	 * @param null $format
	 * @return bool|float|int|number|string
	 */
	public static function parseTimeUnit( $time_unit, $format = NULL ) {
		//
		//NOTE: Most of this is now handled in the front-end javascript with Global.parseTimeUnit(). So any changes made here must be made there too.
		//

		/*
			10	=> 'hh:mm (2:15)',
			12	=> 'hh:mm:ss (2:15:59)',
			20	=> 'Hours (2.25)',
			22	=> 'Hours (2.241)',
			23	=> 'Hours (2.2413)',
			30	=> 'Minutes (135)'
			40	=> 'Seconds (3600)'
		*/

		if ( $format == '' ) {
			$format = self::$time_unit_format;
		}

		$enable_rounding = TRUE;
		if ( strpos( $time_unit, '"' ) !== FALSE ) { //Use quotes around the time unit to prevent rounding of decimal hours to the nearest minute.
			$enable_rounding = FALSE;
		}

		//Get rid of any spaces or commas.
		//ie: 1, 100 :10 should still parse correctly
		//FIXME: comma can be thousands separator or decimal separate depending on locale. Will need to use TTI18n to determine how to display/parse this properly.
		//       Once we start using the INTL class, we can create a TTi18n::getDecimalSeparator() and TTi18n::getThousandsSeparator().
		$thousands_separator = ',';
		$decimal_separator = '.';
		$time_unit = trim( str_replace( array( $thousands_separator, ' ', '"' ), '', $time_unit) );
		//Debug::text('Time Unit: '. $time_unit .' Enable Rounding: '. (int)$enable_rounding, __FILE__, __LINE__, __METHOD__, 10);
		//Debug::text('Time Unit Format: '. self::$time_unit_format, __FILE__, __LINE__, __METHOD__, 10);

		//Convert string to seconds.
		switch ($format) {
			case 10: //hh:mm
			case 12: //hh:mm:ss
				if ( strpos( $time_unit, $decimal_separator ) !== FALSE AND strpos( $time_unit, ':') === FALSE ) { //Hybrid mode, they passed a decimal format HH:MM, try to handle properly.
					$time_unit = TTDate::getTimeUnit( self::parseTimeUnit( $time_unit, 20 ), $format );
				}

				$time_units = explode(':', $time_unit);

				if (!isset($time_units[0]) ) {
					$time_units[0] = 0;
				}
				if (!isset($time_units[1]) ) {
					$time_units[1] = 0;
				}
				if (!isset($time_units[2]) ) {
					$time_units[2] = 0;
				}

				//Check if the first character is '-', or thre are any negative integers.
				if ( strncmp($time_units[0], '-', 1) == 0 OR $time_units[0] < 0 OR $time_units[1] < 0 OR $time_units[2] < 0) {
					$negative_number = TRUE;
				}

				$seconds = ( ( abs( (int)$time_units[0] ) * 3600 ) + ( abs( (int)$time_units[1] ) * 60 ) + abs( (int)$time_units[2] ) );

				if ( isset($negative_number) ) {
					$seconds = ( $seconds * -1 );
				}

				break;
			case 20: //hours
			case 22: //hours [Precise]
			case 23: //hours [Super Precise]
				if ( strpos( $time_unit, ':' ) !== FALSE ) { //Hybrid mode, they passed a HH:MM format as a decimal, try to handle properly.
					$time_unit = TTDate::getTimeUnit( self::parseTimeUnit( $time_unit, 10 ), $format );
				}

				//Round to the nearest minute when entering decimal format to avoid issues with 0.33 (19.8 minutes) or 0.333 (19.98 minutes) or 0.33333...
				//This is only for input, for things like absence time, or meal/break policies, its rare they need sub-minute resolution, and if they
				//do they can use hh:mm:ss instead.
				//However accrual policies have to be second accurate (weekly accruals rounded to 1 minute can result in 52minute differences in a year),
				//so we need a way to disable this rounding as well so the user can properly zero out an accrual balance if needed.
				$seconds = ( (float)$time_unit * 3600 );
				if ( $enable_rounding == TRUE ) {
					$seconds = self::roundTime( $seconds, 60 );
				}
				break;
			case 30: //minutes
				$seconds = ( $time_unit * 60 );
				break;
			case 40: //seconds
				$seconds = round( $time_unit ); //No decimal places when using seconds.
				break;
		}

		if ( isset($seconds) ) {
			if ( $seconds > 2147483646 ) {
				Debug::text('ERROR: Parsing time unit format exceeds maximum 4 byte integer!', __FILE__, __LINE__, __METHOD__, 10);
				$seconds = 2147483646;
			}

			return $seconds;
		}

		return FALSE;
	}

	/**
	 * @param $seconds
	 * @param null $time_unit_format
	 * @return bool|int|string
	 */
	public static function getTimeUnit( $seconds, $time_unit_format = NULL ) {
		if ( $time_unit_format == '' ) {
			$time_unit_format = self::$time_unit_format;
		}

		if ( !is_numeric( $seconds ) ) {
			switch ($time_unit_format) {
				case 10: //hh:mm
					$retval = '00:00';
					break;
				case 12: //hh:mm:ss
					$retval = '00:00:00';
					break;
				case 20: //hours with 2 decimal places
					$retval = '0.00';
					break;
				case 22: //hours with 3 decimal places
					$retval = '0.000';
					break;
				case 23: //hours with 4 decimal places
					$retval = '0.0000';
					break;
				case 30: //minutes
					$retval = 0;
					break;
				case 40: //seconds
					$retval = 0;
					break;
			}
		} else {
			switch ($time_unit_format) {
				case 10: //hh:mm
					$retval = self::convertSecondsToHMS( $seconds );
					break;
				case 12: //hh:mm:ss
					$retval = self::convertSecondsToHMS( $seconds, TRUE );
					break;
				case 20: //hours with 2 decimal places
					$retval = number_format( ( $seconds / 3600 ), 2); //Number format doesn't support large numbers.
					break;
				case 22: //hours with 3 decimal places
					$retval = number_format( ( $seconds / 3600 ), 3);
					break;
				case 23: //hours with 4 decimal places
					$retval = number_format( ( $seconds / 3600 ), 4);
					break;
				case 30: //minutes
					$retval = number_format( ( $seconds / 60 ), 0);
					break;
				case 40: //seconds
					$retval = number_format( $seconds, 0);
					break;
			}
		}

		if ( isset($retval) ) {
			return $retval;
		}

		return FALSE;
	}

	/**
	 * Check to ensure that the date is within a validate integer range.
	 * @param $value
	 * @return bool|false|int|null
	 */
	public static function isValidDate( $value ) {
		if ( $value !== FALSE AND $value != '' AND is_numeric($value) AND $value >= -2147483648 AND $value <= 2147483647 ) {
			return TRUE;
		}

		return FALSE;
	}

	/**
	 * @param $str
	 * @return bool|false|int|null
	 */
	public static function parseDateTime( $str) {
		if ( is_array($str) OR is_object($str) ) {
			Debug::Arr($str, 'Date is array or object, unable to parse...', __FILE__, __LINE__, __METHOD__, 10);
			return FALSE;
		}

		//List of all formats that require custom parsing.
		$custom_parse_formats = array(
									'd-M-y',
									'd/m/Y',
									'd/m/y',
									'd-m-y',
									'd-m-Y',
									'm/d/y',
									'm/d/Y',
									'm-d-y',
									'm-d-Y',
									'Y-m-d',
									'M-d-y',
									'M-d-Y',
									);

		//This fails to parse Ymd or any other integer only date format as it thinks its a epoch value instead.
		//To properly parse Ymd format, we have to alter the way we detect epochs from a basic is_numeric() check to include the Ymd check too.
		//This causes dates between about 1970 to 1973 to fail to parse properly.

		$str = trim($str);

		if ( $str == '' ) {
			//Debug::text('No date to parse! String: '. $str .' Date Format: '. self::$date_format, __FILE__, __LINE__, __METHOD__, 10);
			//Return NULL so we can determine the difference between a blank/null value and an incorrect parsing.
			//NULL is required so NULL is used in the database rather than 0. Especially for termination dates for users.
			return NULL;
		}

		//Debug::text('String: '. $str .' Date Format: '. self::$date_format, __FILE__, __LINE__, __METHOD__, 10);
		if ( !is_numeric($str) AND in_array( self::$date_format, $custom_parse_formats) ) {
			//Debug::text('	 Custom Parse Format detected!', __FILE__, __LINE__, __METHOD__, 10);
			//Match to: Year, Month, Day
			// Make sure we regex match starting at the beginning of the string (^), otherwise the "m-d-y" format will match ISO format: 2018-12-31 as "18-12-31" and cause a failure.
			$textual_month = FALSE;
			switch (self::$date_format) {
				case 'd-M-y':
					//Two digit year, custom parsing for it to have more control over 1900 or 2000 years.
					//PHP handles it like this: values between 00-69 are mapped to 2000-2069 and 70-99 to 1970-1999
					//Debug::text('	 Parsing format: M-d-y', __FILE__, __LINE__, __METHOD__, 10);
					$date_pattern = '/^([0-9]{1,2})\-([A-Za-z]{3})\-([0-9]{2,4})/';
					$match_arr = array( 'year' => 3, 'month' => 2, 'day' => 1 );
					$textual_month = TRUE;
					break;
				case 'M-d-y':
				case 'M-d-Y':
					//Debug::text('	 Parsing format: M-d-y', __FILE__, __LINE__, __METHOD__, 10);
					$date_pattern = '/^([A-Za-z]{3})\-([0-9]{1,2})\-([0-9]{2,4})/';
					$match_arr = array( 'year' => 3, 'month' => 1, 'day' => 2 );
					$textual_month = TRUE;
					break;
				case 'm-d-y':
				case 'm-d-Y':
					//Debug::text('	 Parsing format: m-d-y', __FILE__, __LINE__, __METHOD__, 10);
					$date_pattern = '/^([0-9]{1,2})\-([0-9]{1,2})\-([0-9]{2,4})/';
					$match_arr = array( 'year' => 3, 'month' => 1, 'day' => 2 );
					break;
				case 'm/d/y':
				case 'm/d/Y':
					//Debug::text('	 Parsing format: m/d/y', __FILE__, __LINE__, __METHOD__, 10);
					$date_pattern = '/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/';
					$match_arr = array( 'year' => 3, 'month' => 1, 'day' => 2 );
					break;
				case 'd/m/y':
				case 'd/m/Y':
					//Debug::text('	 Parsing format: d/m/y', __FILE__, __LINE__, __METHOD__, 10);
					$date_pattern = '/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/';
					$match_arr = array( 'year' => 3, 'month' => 2, 'day' => 1 );
					break;
				case 'd-m-y':
				case 'd-m-Y':
					//Debug::text('	 Parsing format: d-m-y', __FILE__, __LINE__, __METHOD__, 10);
					$date_pattern = '/^([0-9]{1,2})\-([0-9]{1,2})\-([0-9]{2,4})/';
					$match_arr = array( 'year' => 3, 'month' => 2, 'day' => 1 );
					break;
				default:
					//Debug::text('	 NO pattern match!', __FILE__, __LINE__, __METHOD__, 10);
					break;
			}

			if ( isset($date_pattern) ) {
				//Make regex less strict, and attempt to match time as well.
				$date_result = preg_match( $date_pattern, $str, $date_matches );

				if ( $date_result != 0 ) {
					//Debug::text('	 Custom Date Match Success!', __FILE__, __LINE__, __METHOD__, 10);

					$date_arr = array(
										'year' => $date_matches[$match_arr['year']],
										'month' => $date_matches[$match_arr['month']],
										'day' => $date_matches[$match_arr['day']],
									);

					//Handle dates less then 1970
					//If the two digit year is greater then current year plus 10 we assume its a 1900 year.
					//Debug::text('Passed Year: '. $date_arr['year'] ." Current Year threshold: ". (date('y')+10), __FILE__, __LINE__, __METHOD__, 10);
					if ( strlen($date_arr['year']) == 2 AND $date_arr['year'] > (date('y') + 10) ) {
						$date_arr['year'] = (int)'19'.$date_arr['year'];
					}
					//Debug::Arr($date_arr, 'Date Match Arr!', __FILE__, __LINE__, __METHOD__, 10);

					//; preg_match('/[a-z]/', $date_arr['month']) != 0
					if ( $textual_month == TRUE AND isset(self::$month_arr[strtolower($date_arr['month'])]) ) {
						$numeric_month = self::$month_arr[strtolower($date_arr['month'])];
						//Debug::text('	 Numeric Month: '. $numeric_month, __FILE__, __LINE__, __METHOD__, 10);
						$date_arr['month'] = $numeric_month;
						unset($numeric_month);
					}

					$tmp_date = $date_arr['year'].'-'.$date_arr['month'].'-'.$date_arr['day'];
					//Debug::text('	 Tmp Date: '. $tmp_date, __FILE__, __LINE__, __METHOD__, 10);

					//Replace the date pattern with NULL leaving only time left to append to the end of the string.
					$time_result = preg_replace( $date_pattern, '', $str );
					$formatted_date = $tmp_date .' '. $time_result;
				} else {
					Debug::text('  Custom Date Match Failed... Falling back to strtotime. Date String: '. $str .' Date Format: '. self::$date_format, __FILE__, __LINE__, __METHOD__, 10);
				}
			}
		}

		if ( !isset($formatted_date) ) {
			//Debug::text('	 NO Custom Parse Format detected!', __FILE__, __LINE__, __METHOD__, 10);
			$formatted_date = $str;
		}
		//Debug::text('	 Parsing Date: '. $formatted_date, __FILE__, __LINE__, __METHOD__, 10);

		//On the Recurring Templates, if the user enters "0600", its passed here without a date, and parsed as "600" which is incorrect.
		//We worked around this in the API by prefixing the date infront of 0600 to make it a string instead
		if ( is_numeric( $formatted_date ) ) {
			$epoch = (int)$formatted_date;
		} else {
			//$epoch = self::strtotime( $formatted_date );
			$epoch = strtotime( $formatted_date ); //Don't use self::strtotime() as it treats all numeric values as epochs, which breaks handling for Ymd. Its faster too.

			//Parse failed, or result is outside 32-bit signed integer range, which will cause a SQL error when the data type is an integer.
			if ( $epoch === FALSE OR $epoch === -1 OR $epoch > 2147483647 OR $epoch < -2147483648 ) {
				Debug::text('  Parsing Date Failed! Returning FALSE: '. $formatted_date .' Format: '. self::$date_format, __FILE__, __LINE__, __METHOD__, 10);
				$epoch = FALSE;
			}

			//Debug::text('	 Parsed Date: '. TTDate::getDate('DATE+TIME', $epoch) .' ('.$epoch.')', __FILE__, __LINE__, __METHOD__, 10);
		}

		return $epoch;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getHumanReadableDateStamp( $epoch ) {
		$format = 'd-M-Y'; //ie: 01-Jan-2018

		return date( $format, $epoch);
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getISODateStamp( $epoch ) {
		$format = 'Y-m-d'; //Needs to contain "-" so its a string and doesn't get confused with epoch values during is_numeric() checks.

		return date( $format, $epoch);
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getISOTimeStamp( $epoch ) {
		return date( 'r', $epoch);
	}

	/**
	 * @param string $format
	 * @param int $epoch EPOCH
	 * @return bool|false|null|string
	 */
	public static function getAPIDate( $format = 'DATE+TIME', $epoch ) {
		return self::getDate( $format, $epoch );
	}

	/**
	 * @param int $epoch EPOCH
	 * @param bool $include_time_zone
	 * @return false|string
	 */
	public static function getDBTimeStamp( $epoch, $include_time_zone = TRUE ) {
		if ( $epoch != '' ) {
			$format = 'Y-m-d H:i:s';
			if ( $include_time_zone == TRUE ) {
				$format .= ' T';
			}

			return date( $format, $epoch );
		}

		return NULL;
	}

	/**
	 * @param null $format
	 * @param int $epoch EPOCH
	 * @return bool|false|null|string
	 */
	public static function getDate( $format = NULL, $epoch = NULL ) {
		if ( $epoch == '' OR $epoch == '-1' OR $epoch == 0 ) {
			//$epoch = TTDate::getTime();
			//Don't return anything if EPOCH isn't set.
			//return FALSE;
			return NULL;
		}

		if ( !is_numeric($epoch) OR $epoch == 0 ) {
			//This can happen from LogDetailFactory when using DB date/time stamps. Since
			if ( is_string($epoch) AND strlen($epoch) > 14 ) {
				//Epoch is a DB timestamp string.
				$epoch = self::strtotime( $epoch );
			} else {
				Debug::Arr($epoch, 'Epoch is not numeric: ', __FILE__, __LINE__, __METHOD__, 10);
				return FALSE;
			}
		}

		if ( empty($format) ) {
			Debug::text('Format is empty: '. $format, __FILE__, __LINE__, __METHOD__, 10);
			$format = 'DATE';
		}

		switch ( strtolower($format) ) {
			case 'date':
				$php_format = self::$date_format;
				break;
			case 'time':
				$php_format = self::$time_format;
				break;
			case 'date+time':
				$php_format = self::$date_format.' '.self::$time_format;
				break;
			case 'epoch':
				$php_format = 'U';
				break;
		}
		//Debug::text('Format Name: '. $format .' Epoch: '. $epoch .' Format: '. $php_format, __FILE__, __LINE__, __METHOD__, 10);

		//Debug::text('Epoch: '. $epoch, __FILE__, __LINE__, __METHOD__, 10);
		//This seems to support pre 1970 dates..
		return date($php_format, $epoch);

		//Support pre 1970 dates?
		//return adodb_date($format, $epoch);
	}

	/**
	 * @return array
	 */
	public static function getDayOfMonthArray() {
		$retarr = array();
		for( $i = 1; $i <= 31; $i++ ) {
			$retarr[$i] = $i;
		}
		return $retarr;
	}

	/**
	 * @param bool $short_name
	 * @return array|null
	 */
	public static function getMonthOfYearArray( $short_name = FALSE) {
		if ( $short_name == TRUE ) {
			if ( is_array(self::$short_month_of_year_arr) == FALSE ) {
				self::$short_month_of_year_arr = self::_get_month_short_names();
			}
			return self::$short_month_of_year_arr;
		} else {
			if ( is_array(self::$long_month_of_year_arr) == FALSE ) {
				self::$long_month_of_year_arr = self::_get_month_long_names();
			}
			return self::$long_month_of_year_arr;
		}
	}

	/**
	 * @param bool $translation
	 * @return array|null
	 */
	public static function getDayOfWeekArray( $translation = TRUE ) {
		if ( $translation == TRUE AND is_array(self::$day_of_week_arr) == FALSE ) {
			self::$day_of_week_arr = array(
											0 => TTi18n::getText('Sunday'),
											1 => TTi18n::getText('Monday'),
											2 => TTi18n::getText('Tuesday'),
											3 => TTi18n::getText('Wednesday'),
											4 => TTi18n::getText('Thursday'),
											5 => TTi18n::getText('Friday'),
											6 => TTi18n::getText('Saturday')
				);
		} else {
			//Translated days of week can't be piped back into strtotime() for parsing.
			self::$day_of_week_arr = array(
											0 => 'Sunday',
											1 => 'Monday',
											2 => 'Tuesday',
											3 => 'Wednesday',
											4 => 'Thursday',
											5 => 'Friday',
											6 => 'Saturday'
				);
		}
		return self::$day_of_week_arr;
	}

	/**
	 * @param int $epoch EPOCH
	 * @param int $start_week_day
	 * @return false|string
	 */
	public static function getDayOfWeek( $epoch, $start_week_day = 0) {
		$dow = date('w', (int)$epoch);

		if ( $start_week_day == 0 ) {
			return $dow;
		} else {
			$retval = ( $dow - $start_week_day );
			if ( $dow < $start_week_day ) {
				$retval = ( $dow + ( 7 - $start_week_day ) );
			}
			return $retval;
		}
	}

	/**
	 * @param $dow
	 * @return bool
	 */
	public static function getDayOfWeekName( $dow ) {
		return self::getDayOfWeekByInt( $dow );
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getDayOfYear( $epoch ) {
		return date('z', $epoch);
	}

	/**
	 * @param $int
	 * @param bool $translation
	 * @return bool
	 */
	public static function getDayOfWeekByInt( $int, $translation = TRUE ) {
		self::getDayOfWeekArray( $translation );

		if ( isset(self::$day_of_week_arr[$int]) ) {
			return self::$day_of_week_arr[$int];
		}

		return FALSE;
	}

	/**
	 * @param int $start_week_day
	 * @return array
	 */
	public static function getDayOfWeekArrayByStartWeekDay( $start_week_day = 0 ) {
		$retarr = array();
		$arr = self::getDayOfWeekArray();
		foreach( $arr as $dow => $name ) {
			if ( $dow >= $start_week_day ) {
				$retarr[$dow] = $name;
			}
		}

		if ( $start_week_day > 0 ) {
			foreach( $arr as $dow => $name ) {
				if ( $dow < $start_week_day ) {
					$retarr[$dow] = $name;
				} else {
					break;
				}
			}
		}

		return $retarr;

	}

	/**
	 * @param int $epoch EPOCH
	 * @return bool
	 */
	public static function isMidnight( $epoch ) {
		if ( TTDate::getHour( $epoch ) == 0 AND TTDate::getMinute( $epoch ) == 0 AND TTDate::getSecond( $epoch ) == 0 ) {
			return TRUE;
		}

		return FALSE;
	}

	/**
	 * @param int $start_epoch EPOCH
	 * @param int $end_epoch EPOCH
	 * @param bool $match_midnight
	 * @return bool
	 */
	public static function doesRangeSpanMidnight( $start_epoch, $end_epoch, $match_midnight = FALSE ) {
		if ( $start_epoch > $end_epoch ) { //If start_epoch is after end_epoch, just swap the two values.
			$tmp = $start_epoch;
			$start_epoch = $end_epoch;
			$end_epoch = $tmp;
		}

		//Debug::text('Start Epoch: '. TTDate::getDate('DATE+TIME', $start_epoch) .'  End Epoch: '. TTDate::getDate('DATE+TIME', $end_epoch), __FILE__, __LINE__, __METHOD__, 10);
		if ( abs( self::getDayOfYear( $end_epoch ) - self::getDayOfYear( $start_epoch ) ) > 1 ) { //More than one day is between the epochs.
			return TRUE;
		} else {
			$end_epoch_midnight = TTDate::getBeginDayEpoch( $end_epoch );
			if ( $start_epoch < $end_epoch_midnight AND $end_epoch > $end_epoch_midnight ) { //Epochs do span midnight.
				return TRUE;
			} elseif ( $match_midnight == TRUE AND ( self::isMidnight( $start_epoch ) == TRUE OR self::isMidnight( $end_epoch ) == TRUE ) ) {
				return TRUE;
			}
		}

		return FALSE;
	}

	/**
	 * @param int $start_epoch EPOCH
	 * @param int $end_epoch EPOCH
	 * @return bool
	 */
	public static function doesRangeSpanDST( $start_epoch, $end_epoch ) {
		if ( date('I', $start_epoch) != date('I', $end_epoch) ) {
			$retval = TRUE;
		} else {
			$retval = FALSE;
		}

		//Debug::text('Start Epoch: '. TTDate::getDate('DATE+TIME', $start_epoch) .'  End Epoch: '. TTDate::getDate('DATE+TIME', $end_epoch) .' Retval: '. (int)$retval, __FILE__, __LINE__, __METHOD__, 10);
		return $retval;
	}

	/**
	 * @param int $start_epoch EPOCH
	 * @param int $end_epoch EPOCH
	 * @return int
	 */
	public static function getDSTOffset( $start_epoch, $end_epoch ) {
		if ( date('I', $start_epoch) == 0 AND date('I', $end_epoch) == 1 ) {
			$retval = 3600; //DST==TRUE: Spring - Spring ahead an hour, which means we lose an hour, so we add one hour from the offset.
		} elseif ( date('I', $start_epoch) == 1 AND date('I', $end_epoch) == 0 ) {
			$retval = -3600; //DST==FALSE: Fall - Fall back an hour, which means we gain an hour, or minus one hour to the offset
		} else {
			$retval = 0;
		}

		//Debug::text('Start Epoch: '. TTDate::getDate('DATE+TIME', $start_epoch) .'('.date('I', $start_epoch).')  End Epoch: '. TTDate::getDate('DATE+TIME', $end_epoch) .'('.date('I', $end_epoch).') Retval: '. $retval, __FILE__, __LINE__, __METHOD__, 10);
		return $retval;
	}

	/**
	 * @return int
	 */
	public static function getTime() {
		return time();
	}

	/**
	 * @param $hours
	 * @return string
	 */
	public static function getSeconds( $hours) {
		return bcmul( $hours, 3600 );
	}

	/**
	 * @param $seconds
	 * @return string
	 */
	public static function getHours( $seconds) {
		return bcdiv( $seconds, 3600 );
	}

	/**
	 * @param $seconds
	 * @return string
	 */
	public static function getDays( $seconds) {
		return bcdiv( $seconds, 86400);
	}

	/**
	 * @param $seconds
	 * @return string
	 */
	public static function getWeeks( $seconds) {
		return bcdiv( $seconds, ( 86400 * 7 ) );
	}

	/**
	 * @param $seconds
	 * @return string
	 */
	public static function getYears( $seconds ) {
		return bcdiv( bcdiv( $seconds, 86400 ), 365 );
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getDaysInMonth( $epoch = NULL ) {
		if ($epoch == NULL) {
			$epoch = TTDate::getTime();
		}

		return date('t', $epoch);
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getDaysInYear( $epoch = NULL ) {
		if ($epoch == NULL) {
			$epoch = TTDate::getTime();
		}

		return date('z', TTDate::getEndYearEpoch( $epoch ) );
	}

	/**
	 * @param int $epoch EPOCH
	 * @param $amount
	 * @param $unit
	 * @return false|int
	 */
	public static function incrementDate( $epoch, $amount, $unit ) {
		//Debug::text('Epoch: '. $epoch .' ('.TTDate::getDate('DATE+TIME', $epoch).') Amount: '. $amount .' unit: '. $unit, __FILE__, __LINE__, __METHOD__, 10);

		if ( $epoch == '' ) {
			return FALSE;
		}

		if ( $amount == '' ) {
			$amount = 0;
		}

		$date_arr = getdate($epoch);
		$retval = NULL;
		//Unit: minute, hour, day
		switch ( $unit ) {
			case 'minute':
				$retval = mktime( $date_arr['hours'], ($date_arr['minutes'] + $amount), 0, $date_arr['mon'], $date_arr['mday'], $date_arr['year'] );
				break;
			case 'hour':
				$retval = mktime( ($date_arr['hours'] + $amount), $date_arr['minutes'], 0, $date_arr['mon'], $date_arr['mday'], $date_arr['year'] );
				break;
			case 'day':
				$retval = mktime( $date_arr['hours'], $date_arr['minutes'], 0, $date_arr['mon'], ($date_arr['mday'] + $amount), $date_arr['year'] );
				break;
			case 'week':
				$retval = mktime( $date_arr['hours'], $date_arr['minutes'], 0, $date_arr['mon'], ($date_arr['mday'] + ( $amount * 7 ) ), $date_arr['year'] );
				break;
			case 'month':
				$retval = mktime( $date_arr['hours'], $date_arr['minutes'], 0, ($date_arr['mon'] + $amount), $date_arr['mday'], $date_arr['year'] );
				break;
			case 'quarter':
				$retval = mktime( $date_arr['hours'], $date_arr['minutes'], 0, ($date_arr['mon'] + ( $amount * 3 ) ), $date_arr['mday'], $date_arr['year'] );
				break;
			case 'year':
				$retval = mktime( $date_arr['hours'], $date_arr['minutes'], 0, $date_arr['mon'], $date_arr['mday'], ($date_arr['year'] + $amount) );
				break;
		}

		return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @param int $snap_to_epoch EPOCH
	 * @param $snap_type
	 * @return mixed
	 */
	public static function snapTime( $epoch, $snap_to_epoch, $snap_type) {
		Debug::text('Epoch: '. $epoch .' ('.TTDate::getDate('DATE+TIME', $epoch).') Snap Epoch: '. $snap_to_epoch .' ('.TTDate::getDate('DATE+TIME', $snap_to_epoch).') Snap Type: '. $snap_type, __FILE__, __LINE__, __METHOD__, 10);

		if ( empty($epoch) OR empty($snap_to_epoch) ) {
			return $epoch;
		}

		switch (strtolower($snap_type)) {
			case 'up':
				Debug::text('Snap UP: ', __FILE__, __LINE__, __METHOD__, 10);
				if ( $epoch <= $snap_to_epoch ) {
					$epoch = $snap_to_epoch;
				}
				break;
			case 'down':
				Debug::text('Snap Down: ', __FILE__, __LINE__, __METHOD__, 10);
				if ( $epoch >= $snap_to_epoch ) {
					$epoch = $snap_to_epoch;
				}
				break;
		}

		Debug::text('Snapped Epoch: '. $epoch .' ('.TTDate::getDate('DATE+TIME', $epoch).')', __FILE__, __LINE__, __METHOD__, 10);
		return $epoch;
	}

	/**
	 * @param int $epoch EPOCH
	 * @param $round_value
	 * @param int $round_type 10=Down, 20=Average, 25=Average (split seconds up), 27=Average (split seconds down) 30=Up
	 * @param int $grace_time
	 * @return int
	 */
	public static function roundTime( $epoch, $round_value, $round_type = 20, $grace_time = 0 ) {

		//Debug::text('In Epoch: '. $epoch .' ('.TTDate::getDate('DATE+TIME', $epoch).') Round Value: '. $round_value .' Round Type: '. $round_type, __FILE__, __LINE__, __METHOD__, 10);

		if ( empty($epoch) OR empty($round_value) OR empty($round_type) ) {
			return $epoch;
		}

		$epoch = (int)$epoch; //Make sure we aren't dealing with floating point values, as they won't get rounded off. ie: TTDate::roundTime(90.12345, 60, 10)

		switch ($round_type) {
			case 10: //Down
				if ( $grace_time > 0 ) {
					$epoch += $grace_time;
				}
				$epoch = ( $epoch - ( $epoch % $round_value ) );
				break;
			case 20: //Average
			case 25: //Average (round split seconds up)
			case 27: //Average (round split seconds down)
				//Only do special rounding if its for more than 1min.
				if ( $round_type == 20 OR $round_value <= 60 ) {
					$tmp_round_value = ( $round_value / 2 );
				} elseif ( $round_type == 25 ) { //Average (Partial Min. Down)
					$tmp_round_value = self::roundTime( ( $round_value / 2 ), 60, 10 ); //This is opposite rounding
				} elseif ( $round_type == 27 ) { //Average (Partial Min. Up)
					$tmp_round_value = self::roundTime( ( $round_value / 2 ), 60, 30 );
				}

				if ( $epoch > 0 ) {
					//$epoch = ( (int)( ($epoch + ($round_value / 2) ) / $round_value ) * $round_value );
					//When doing a 15min average rounding, US law states 7mins and 59 seconds can be rounded down in favor of the employer, and 8mins and 0 seconds must be rounded up.
					//So if the round interval is not an even number, round it up to the nearest minute before doing the calculations to avoid issues with seconds.
					$epoch = ( (int)( ($epoch + $tmp_round_value ) / $round_value ) * $round_value );
				} else {
					//$epoch = ( (int)( ($epoch - ($round_value / 2) ) / $round_value ) * $round_value );
					$epoch = ( (int)( ($epoch - $tmp_round_value ) / $round_value ) * $round_value );
				}
				break;
			case 30: //Up
				if ( $grace_time > 0 ) {
					$epoch -= $grace_time;
				}
				$epoch = ( (int)( ($epoch + ($round_value - 1) ) / $round_value ) * $round_value );
				break;
		}

		return $epoch;
	}

	/**
	 * @param int $current_epoch EPOCH
	 * @param $grace_time
	 * @param int $schedule_epoch EPOCH
	 * @return mixed
	 */
	public static function graceTime( $current_epoch, $grace_time, $schedule_epoch) {
		//Debug::text('Current Epoch: '. $current_epoch .' Grace Time: '. $grace_time .' Schedule Epoch: '. $schedule_epoch, __FILE__, __LINE__, __METHOD__, 10);
		if ( $current_epoch <= ($schedule_epoch + $grace_time)
				AND $current_epoch >= ($schedule_epoch - $grace_time) ) {
			//Within grace period, return scheduled time.
			return $schedule_epoch;
		}

		return $current_epoch;
	}

	/**
	 * @param $prefix
	 * @param $array
	 * @return int|mixed
	 */
	public static function getTimeStampFromSmarty( $prefix, $array) {
		Debug::text('Prefix: '. $prefix, __FILE__, __LINE__, __METHOD__, 10);
		//Debug::Arr($array, 'getTimeStampFromSmarty Array:', __FILE__, __LINE__, __METHOD__, 10);

		if ( isset($array[$prefix.'Year']) ) {
			$year = $array[$prefix.'Year'];
		} else {
			$year = strftime('%Y');
		}
		if ( isset($array[$prefix.'Month']) ) {
			$month = $array[$prefix.'Month'];
		} else {
			//$month = strftime('%m');
			$month = 1;
		}
		if ( isset($array[$prefix.'Day']) ) {
			$day = $array[$prefix.'Day'];
		} else {
			//If day isn't specified it uses the current day, but then if its the 30th, and they
			//select February, it goes to March!
			//$day = strftime('%d');
			$day = 1;
		}
		if ( isset($array[$prefix.'Hour']) ) {
			$hour = $array[$prefix.'Hour'];
		} else {
			$hour = 0;
		}
		if ( isset($array[$prefix.'Minute']) ) {
			$min = $array[$prefix.'Minute'];
		} else {
			$min = 0;
		}
		if ( isset($array[$prefix.'Second']) ) {
			$sec = $array[$prefix.'Second'];
		} else {
			$sec = 0;
		}

		Debug::text('Year: '. $year .' Month: '. $month .' Day: '. $day .' Hour: '. $hour .' Min: '. $min .' Sec: '. $sec, __FILE__, __LINE__, __METHOD__, 10);

		return self::getTimeStamp($year, $month, $day, $hour, $min, $sec);
	}

	/**
	 * @param string $year
	 * @param string $month
	 * @param string $day
	 * @param int $hour
	 * @param int $min
	 * @param int $sec
	 * @return int|mixed
	 */
	public static function getTimeStamp($year="", $month="", $day="", $hour = 0, $min = 0, $sec = 0) {
		if ( empty($year) ) {
			$year = strftime('%Y');
		}

		if ( empty($month) ) {
			$month = strftime('%m');
		}

		if ( empty($day) ) {
			$day = strftime('%d');
		}

		if ( empty($hour) ) {
			$hour = 0;
		}

		if ( empty($min) ) {
			$min = 0;
		}

		if ( empty($sec) ) {
			$sec = 0;
		}

		//Use adodb time library to support dates earlier then 1970.
		//require_once( Environment::getBasePath() .'classes/adodb/adodb-time.inc.php');
		//Debug::text('	 - Year: '. $year .' Month: '. $month .' Day: '. $day .' Hour: '. $hour .' Min: '. $min .' Sec: '. $sec, __FILE__, __LINE__, __METHOD__, 10);
		$epoch = adodb_mktime($hour, $min, $sec, $month, $day, $year);
		//Debug::text('Epoch: '. $epoch .' Date: '. self::getDate($epoch), __FILE__, __LINE__, __METHOD__, 10);

		return $epoch;
	}

	/**
	 * @param int $start_epoch EPOCH
	 * @param int $end_epoch EPOCH
	 * @return mixed
	 */
	public static function getDayWithMostTime( $start_epoch, $end_epoch ) {
		$time_on_start_date = ( TTDate::getEndDayEpoch( $start_epoch ) - $start_epoch );
		$time_on_end_date = ( $end_epoch - TTDate::getBeginDayEpoch( $end_epoch ) );
		if ( $time_on_start_date > $time_on_end_date ) {
			$day_with_most_time = $start_epoch;
		} else {
			$day_with_most_time = $end_epoch;
		}

		return $day_with_most_time;
	}

	/**
	 * @param int $start_epoch EPOCH
	 * @param int $end_epoch EPOCH
	 * @param bool $round
	 * @return bool|float|int
	 */
	public static function getDayDifference( $start_epoch, $end_epoch, $round = TRUE) {
		if ( $start_epoch == '' OR $end_epoch == '' ) {
			return FALSE;
		}

		//This already matches PHPs DateTime class.
		$days = ( ($end_epoch - $start_epoch) / 86400 );
		if ( $round == TRUE ) {
			$days = round($days);
		}

		//Debug::text('Days Difference: '. $days, __FILE__, __LINE__, __METHOD__, 10);

		return $days;
	}

	/**
	 * @param int $start_epoch EPOCH
	 * @param int $end_epoch EPOCH
	 * @return bool|float|int
	 */
	public static function getWeekDifference( $start_epoch, $end_epoch) {
		if ( $start_epoch == '' OR $end_epoch == '' ) {
			return FALSE;
		}

		//This already matches PHPs DateTime class.
		$weeks = ( ($end_epoch - $start_epoch) / (86400 * 7) );
		Debug::text('Week Difference: '. $weeks, __FILE__, __LINE__, __METHOD__, 10);

		return $weeks;
	}

	/**
	 * @param int $start_epoch EPOCH
	 * @param int $end_epoch EPOCH
	 * @return bool|float|int
	 */
	public static function getMonthDifference( $start_epoch, $end_epoch) {
		if ( $start_epoch == '' OR $end_epoch == '' ) {
			return FALSE;
		}

		//Debug::text('Start Epoch: '. TTDate::getDate('DATE+TIME', $start_epoch) .' End Epoch: '. TTDate::getDate('DATE+TIME', $end_epoch), __FILE__, __LINE__, __METHOD__, 10);

		if ( function_exists('date_diff') ) {
			//If available, try to be as accurate as possible.
			$diff = date_diff( new DateTime( '@'.$end_epoch ), new DateTime( '@'.$start_epoch ), FALSE );
			$x = ( ( ( $diff->y * 12 ) + $diff->m ) + ( $diff->d / 30 ) );
		} else {
			$epoch_diff = ( $end_epoch - $start_epoch );
			//Debug::text('Diff Epoch: '. $epoch_diff, __FILE__, __LINE__, __METHOD__, 10);
			$x = floor( ( $epoch_diff / ( 86400 * 30.436875 ) ) );
		}
		Debug::text('Month Difference: '. $x, __FILE__, __LINE__, __METHOD__, 10);

		return $x;
	}

	/**
	 * @param int $start_epoch EPOCH
	 * @param int $end_epoch EPOCH
	 * @return bool|float|int
	 */
	public static function getYearDifference( $start_epoch, $end_epoch) {
		if ( $start_epoch == '' OR $end_epoch == '' ) {
			return FALSE;
		}

		if ( function_exists('date_diff') ) {
			//If available, try to be as accurate as possible.
			$diff = date_diff( new DateTime( '@'.$start_epoch ), new DateTime( '@'.$end_epoch ), FALSE );
			$years = ( $diff->y + ( $diff->m / 12 ) + ( $diff->d / 365.25 ) );
		} else {
			$years = ( ( ($end_epoch - $start_epoch) / ( 86400 * 365.25 ) ) );
		}
		//Debug::text('Years Difference: '. $years, __FILE__, __LINE__, __METHOD__, 10);

		return $years;
	}

	/**
	 * @param int $epoch EPOCH
	 * @param $month_offset
	 * @return false|int
	 */
	public static function getDateByMonthOffset( $epoch, $month_offset) {
		//return mktime(0, 0, 0, date('n', $epoch) + $month_offset, date('j', $epoch), date('Y', $epoch) );
		return mktime(date('G', $epoch), date('i', $epoch), date('s', $epoch), ( date('n', $epoch) + $month_offset ), date('j', $epoch), date('Y', $epoch) );
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|int
	 */
	public static function getBeginMinuteEpoch( $epoch = NULL) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch)) {
			$epoch = self::getTime();
		}

		$retval = mktime(date('G', $epoch), date('i', $epoch), 0, date('m', $epoch), date('d', $epoch), date('Y', $epoch));
		//Debug::text('Begin Day Epoch: '. $retval .' - '. TTDate::getDate('DATE+TIME', $retval), __FILE__, __LINE__, __METHOD__, 10);
		return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|int
	 */
	public static function getBeginDayEpoch( $epoch = NULL) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch)) {
			$epoch = self::getTime();
		}

		//$retval = mktime(0, 0, 0, date('m', $epoch), date('d', $epoch), date('Y', $epoch)); //1million runs = 12165ms
		//$retval = strtotime( 'midnight', $epoch ); //1million runs = 14030ms
		$date = getdate( $epoch );
		return mktime( 0, 0, 0, $date['mon'], $date['mday'], $date['year'] ); //1 million runs = 9159ms

		//Debug::text('Begin Day Epoch: '. $retval .' - '. TTDate::getDate('DATE+TIME', $retval) .' Epoch: '. $epoch .' - '. TTDate::getDate('DATE+TIME', $epoch) .' TimeZone: '. self::getTimeZone(), __FILE__, __LINE__, __METHOD__, 10);
		//return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|int
	 */
	public static function getMiddleDayEpoch( $epoch = NULL) {
		if ( $epoch == '' OR !is_numeric($epoch) ) { //Optimize out the $epoch == NULL check as its done by == ''.
		//if ( $epoch == NULL OR $epoch == '' OR !is_numeric($epoch) ) {
			$epoch = self::getTime();
		}

		$date = getdate( $epoch );
		return mktime( 12, 0, 0, $date['mon'], $date['mday'], $date['year'] ); //4.2secs x 500,000x
		//return strtotime( 'noon', $epoch ); //7.6secs = 500,000x
		//$retval = mktime(12, 0, 0, date('m', $epoch), date('d', $epoch), date('Y', $epoch)); //4secs = 500,000x

		//Debug::text('Middle (noon) Day Epoch: '. $retval .' - '. TTDate::getDate('DATE+TIME', $retval), __FILE__, __LINE__, __METHOD__, 10);
		//return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|int
	 */
	public static function getEndDayEpoch( $epoch = NULL) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch)) {
			$epoch = self::getTime();
		}

		$retval = ( mktime(0, 0, 0, date('m', $epoch), ( date('d', $epoch) + 1 ), date('Y', $epoch)) - 1 );
		//Debug::text('Begin Day Epoch: '. $retval .' - '. TTDate::getDate('DATE+TIME', $retval), __FILE__, __LINE__, __METHOD__, 10);
		return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|int
	 */
	public static function getBeginMonthEpoch( $epoch = NULL) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch) ) {
			$epoch = self::getTime();
		}

		$retval = mktime(0, 0, 0, date('m', $epoch), 1, date('Y', $epoch));

		return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|int
	 */
	public static function getEndMonthEpoch( $epoch = NULL) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch)) {
			$epoch = self::getTime();
		}

		$retval = ( mktime(0, 0, 0, ( date('m', $epoch) + 1 ), 1, date('Y', $epoch)) - 1 );

		return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return mixed
	 */
	public static function getBeginQuarterEpoch( $epoch = NULL) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch) ) {
			$epoch = self::getTime();
		}

		$quarter = TTDate::getYearQuarter( $epoch );
		$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );

		$retval = $quarter_dates['start'];

		return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return mixed
	 */
	public static function getEndQuarterEpoch( $epoch = NULL) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch) ) {
			$epoch = self::getTime();
		}

		$quarter = TTDate::getYearQuarter( $epoch );
		$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );

		$retval = $quarter_dates['end'];

		return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @param int $offset
	 * @return false|string
	 */
	static function getFiscalYearFromEpoch( $epoch, $offset = 3 ) {
		switch ( strtolower($offset) ) {
			case 'us':
				$offset = 3;
				break;
			case 'ca':
				$offset = -3;
				break;
			default:
				break;
		}

		//Offset is in months.
		if ( $offset > 0 ) {
			//Fiscal year is ahead, so it switches to 2016 when still in 2015.
			$offset_str = '+'. $offset .' months';
		} else {
			//Fiscal year is behind, so its still 2015 when the year is in 2016.
			$offset_str = $offset.' months';
		}
		$adjusted_epoch = strtotime( $offset_str, $epoch );

		$retval = date('Y', $adjusted_epoch);
		//Debug::text('Epoch: '. TTDate::getDate('DATE+TIME', $epoch) .' Adjusted Epoch: '. TTDate::getDate('DATE+TIME', $adjusted_epoch)  .' Retval: '. $retval .' Offset: '. $offset_str, __FILE__, __LINE__, __METHOD__, 10);

		return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|int
	 */
	public static function getBeginYearEpoch( $epoch = NULL) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch) ) {
			$epoch = self::getTime();
		}

		$retval = mktime(0, 0, 0, 1, 1, date('Y', $epoch));

		return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|int
	 */
	public static function getEndYearEpoch( $epoch = NULL) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch) ) {
			$epoch = self::getTime();
		}

		//Debug::text('Attempting to Find End Of Year epoch for: '. TTDate::getDate('DATE+TIME', $epoch), __FILE__, __LINE__, __METHOD__, 10);

		$retval = ( mktime(0, 0, 0, 1, 1, ( date('Y', $epoch) + 1 ) ) - 1 );

		return $retval;
	}

	/**
	 * Returns the month of the quarter that the date falls in.
	 * Used for government forms that require a break down for each month in the quarter.
	 * @param int $epoch EPOCH
	 * @return bool|mixed
	 */
	public static function getYearQuarterMonth( $epoch = NULL ) {
		$year_quarter_months = array(
									1 => 1,
									2 => 1,
									3 => 1,
									4 => 2,
									5 => 2,
									6 => 2,
									7 => 3,
									8 => 3,
									9 => 3,
									10 => 4,
									11 => 4,
									12 => 4,
								);

		$month = TTDate::getMonth( $epoch );

		if ( isset($year_quarter_months[$month]) ) {
			return $year_quarter_months[$month];
		}

		return FALSE;
	}

	/**
	 * Regardless of the quarter, this returns if its the 1st, 2nd or 3rd month in the quarter.
	 * Primary used for government forms.
	 * @param int $epoch EPOCH
	 * @return bool|mixed
	 */
	public static function getYearQuarterMonthNumber( $epoch = NULL ) {
		$year_quarter_months = array(
									1 => 1,
									2 => 2,
									3 => 3,
									4 => 1,
									5 => 2,
									6 => 3,
									7 => 1,
									8 => 2,
									9 => 3,
									10 => 1,
									11 => 2,
									12 => 3,
								);

		$month = TTDate::getMonth( $epoch );

		if ( isset($year_quarter_months[$month]) ) {
			return $year_quarter_months[$month];
		}

		return FALSE;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return float
	 */
	public static function getYearQuarter( $epoch = NULL ) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch) ) {
			$epoch = self::getTime();
		}

		$quarter = ceil( date('n', $epoch ) / 3 );

		//Debug::text('Date: '. TTDate::getDate('DATE+TIME', $epoch ) .' is in quarter: '. $quarter, __FILE__, __LINE__, __METHOD__, 10);
		return $quarter;
	}

	/**
	 * @param int $epoch EPOCH
	 * @param null $quarter
	 * @param int $day_of_month
	 * @return array|bool|mixed
	 */
	public static function getYearQuarters( $epoch = NULL, $quarter = NULL, $day_of_month = 1 ) {
		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch) ) {
			$epoch = self::getTime();
		}

		$year = TTDate::getYear( $epoch );

		//When $quarter is specified, as an optimization only calculate dates for just it.

		if ( $quarter == NULL ) {
			$tmp_quarters = array( 1, 2, 3, 4);
		} else {
			if ( is_array($quarter) ) {
				$tmp_quarters = $quarter;
			} else {
				$tmp_quarters = array( $quarter );
			}
		}

		foreach( $tmp_quarters as $tmp_quarter ) {
			switch ( $tmp_quarter ) {
				case 1:
					$quarter_dates[1] = array( 'start' => mktime(0, 0, 0, 1, $day_of_month, $year ), 'end' => mktime(0, 0, -1, 4, ( $day_of_month > 30 ) ? 30 : $day_of_month, $year ) );
					break;
				case 2:
					$quarter_dates[2] = array( 'start' => mktime(0, 0, 0, 4, ( $day_of_month > 30 ) ? 30 : $day_of_month, $year ), 'end' => mktime(0, 0, -1, 7, $day_of_month, $year ) );
					break;
				case 3:
					$quarter_dates[3] = array( 'start' => mktime(0, 0, 0, 7, $day_of_month, $year ), 'end' => mktime(0, 0, -1, 10, ( $day_of_month > 30 ) ? 30 : $day_of_month, $year ) );
					break;
				case 4:
					$quarter_dates[4] = array( 'start' => mktime(0, 0, 0, 10, $day_of_month, $year ), 'end' => mktime(0, 0, -1, 13, $day_of_month, $year ) );
					break;
			}
		}

		if ( $quarter != '' ) {
			if ( isset($quarter_dates[$quarter]) ) {
				$quarter_dates = $quarter_dates[$quarter];
			} else {
				return FALSE;
			}
		}

		return $quarter_dates;
	}

	/**
	 * @param int $anchor_epoch EPOCH
	 * @param int $day_of_week_epoch EPOCH
	 * @return bool|false|int
	 */
	public static function getDateOfNextDayOfWeek( $anchor_epoch, $day_of_week_epoch) {
		//Anchor Epoch is the anchor date to start searching from.
		//Day of week epoch is the epoch we use to extract the day of the week from.
		Debug::text('-------- ', __FILE__, __LINE__, __METHOD__, 10);
		Debug::text('Anchor Epoch: '. TTDate::getDate('DATE+TIME', $anchor_epoch), __FILE__, __LINE__, __METHOD__, 10);
		Debug::text('Day Of Week Epoch: '. TTDate::getDate('DATE+TIME', $day_of_week_epoch), __FILE__, __LINE__, __METHOD__, 10);

		if ( $anchor_epoch == '' ) {
			return FALSE;
		}

		if ( $day_of_week_epoch == '' ) {
			return FALSE;
		}

		//Get day of week of the anchor
		$anchor_dow = date('w', $anchor_epoch);
		$dst_dow = date('w', $day_of_week_epoch);
		Debug::text('Anchor DOW: '. $anchor_dow .' Destination DOW: '. $dst_dow, __FILE__, __LINE__, __METHOD__, 10);

		$days_diff = ($anchor_dow - $dst_dow);
		Debug::text('Days Diff: '. $days_diff, __FILE__, __LINE__, __METHOD__, 10);

		if ( $days_diff > 0 ) {
			//Add 7 days (1 week) then minus the days diff.
			$anchor_epoch += 604800;
		}

		$retval = mktime(	date('H', $day_of_week_epoch ),
							date('i', $day_of_week_epoch ),
							date('s', $day_of_week_epoch ),
							date('m', $anchor_epoch ),
							( date('j', $anchor_epoch ) - $days_diff ),
							date('Y', $anchor_epoch )
							);

		Debug::text('Retval: '. TTDate::getDate('DATE+TIME', $retval), __FILE__, __LINE__, __METHOD__, 10);
		return $retval;

	}

	/**
	 * @param int $anchor_epoch EPOCH
	 * @param int $day_of_month_epoch EPOCH
	 * @param null $day_of_month
	 * @return bool|false|int
	 */
	public static function getDateOfNextDayOfMonth( $anchor_epoch, $day_of_month_epoch, $day_of_month = NULL ) {
		//Anchor Epoch is the anchor date to start searching from.
		//Day of month epoch is the epoch we use to extract the day of the month from.
		Debug::text('-------- ', __FILE__, __LINE__, __METHOD__, 10);
		Debug::text('Anchor Epoch: '. TTDate::getDate('DATE+TIME', $anchor_epoch) . ' Day Of Month Epoch: '. TTDate::getDate('DATE+TIME', $day_of_month_epoch) .' Day Of Month: '. $day_of_month, __FILE__, __LINE__, __METHOD__, 10);

		if ( $anchor_epoch == '' ) {
			return FALSE;
		}

		if ( $day_of_month_epoch == '' AND $day_of_month == '' ) {
			return FALSE;
		}

		if ( $day_of_month_epoch == '' AND $day_of_month != '' AND $day_of_month <= 31 ) {
			$tmp_days_in_month = TTDate::getDaysInMonth( $anchor_epoch );
			if ( $day_of_month > $tmp_days_in_month ) {
				$day_of_month = $tmp_days_in_month;
			}
			unset($tmp_days_in_month);

			$day_of_month_epoch = mktime(	date('H', $anchor_epoch ),
											date('i', $anchor_epoch ),
											date('s', $anchor_epoch ),
											date('m', $anchor_epoch ),
											$day_of_month,
											date('Y', $anchor_epoch )
								);
		}

		//If the anchor date is AFTER the day of the month, we want to get the same day
		//in the NEXT month.
		$src_dom = date('j', $anchor_epoch);
		$dst_dom = date('j', $day_of_month_epoch);
		//Debug::text('Anchor DOM: '. $src_dom .' DST DOM: '. $dst_dom, __FILE__, __LINE__, __METHOD__, 10);

		if ( $src_dom > $dst_dom ) {
			//Debug::text('Anchor DOM is greater then Dest DOM', __FILE__, __LINE__, __METHOD__, 10);

			//Get the epoch of the first day of the next month
			//Use getMiddleDayEpoch so daylight savings doesn't throw us off.
			$anchor_epoch = TTDate::getMiddleDayEpoch( ( TTDate::getEndMonthEpoch( $anchor_epoch ) + 1 ) );

			//Find out how many days are in this month
			$days_in_month = TTDate::getDaysInMonth( $anchor_epoch );

			if ( $dst_dom > $days_in_month ) {
				$dst_dom = $days_in_month;
			}
			$retval = ( $anchor_epoch + ( ($dst_dom - 1 ) * 86400 ) );
		} else {
			//Debug::text('Anchor DOM is equal or LESS then Dest DOM', __FILE__, __LINE__, __METHOD__, 10);

			$retval = mktime(	date('H', $anchor_epoch ),
								date('i', $anchor_epoch ),
								date('s', $anchor_epoch ),
								date('m', $anchor_epoch ),
								date('j', $day_of_month_epoch ),
								date('Y', $anchor_epoch )
								);
		}

		return TTDate::getBeginDayEpoch( $retval );
	}

	/**
	 * @param $anchor_epoch
	 * @param int $day_of_month
	 * @param int $month_of_quarter
	 * @return false|int|mixed
	 */
	public static function getDateOfNextQuarter( $anchor_epoch, $day_of_month = 1, $month_of_quarter = 1 ) {
		$quarter_date = self::getBeginQuarterEpoch( $anchor_epoch );

		$month = ( (int)date( 'm', $quarter_date ) + ( ( $month_of_quarter - 1 ) + 3 ) );

		$first_day_of_select_month = mktime( 12, 0, 0, $month, 1, date( 'Y', $quarter_date ) );
		$days_in_month = TTDate::getDaysInMonth( $first_day_of_select_month );
		if ( $day_of_month > $days_in_month ) {
			$day_of_month = $days_in_month;
		}

		$quarter_date = mktime( 12, 0, 0, $month, $day_of_month, date( 'Y', $quarter_date ) );

		//Debug::text('next quarter: '. date('r', $quarter_date), __FILE__, __LINE__, __METHOD__, 10);
		return $quarter_date;
	}

	/**
	 * @param int $anchor_epoch EPOCH
	 * @param int $year_epoch EPOCH
	 * @return bool|false|int
	 */
	public static function getDateOfNextYear( $anchor_epoch, $year_epoch ) {
		//Anchor Epoch is the anchor date to start searching from.
		//Year Epoch is the epoch we use to extract the year from.
		Debug::text('-------- ', __FILE__, __LINE__, __METHOD__, 10);
		Debug::text('Anchor Epoch: '. TTDate::getDate('DATE+TIME', $anchor_epoch), __FILE__, __LINE__, __METHOD__, 10);
		Debug::text('Year Epoch: '. TTDate::getDate('DATE+TIME', $year_epoch), __FILE__, __LINE__, __METHOD__, 10);

		if ( $anchor_epoch == '' ) {
			return FALSE;
		}

		$retval = mktime(	date('H', $anchor_epoch ),
							date('i', $anchor_epoch ),
							date('s', $anchor_epoch ),
							date('m', $anchor_epoch ),
							date('j', $anchor_epoch ),
							date('Y', $year_epoch )
							);

		Debug::text('Retval: '. TTDate::getDate('DATE+TIME', $retval), __FILE__, __LINE__, __METHOD__, 10);
		return $retval;

	}

	/**
	 * @param int $hire_date EPOCH
	 * @return false|int
	 */
	public static function getLastHireDateAnniversary( $hire_date) {
		Debug::Text('Hire Date: '. $hire_date .' - '. TTDate::getDate('DATE+TIME', $hire_date), __FILE__, __LINE__, __METHOD__, 10);

		//Find last hire date anniversery.
		$last_hire_date_anniversary = gmmktime(12, 0, 0, date('n', $hire_date), date('j', $hire_date), ( date('Y', TTDate::getTime() ) ) );
		//If its after todays date, minus a year from it.
		if ( $last_hire_date_anniversary >= TTDate::getTime() ) {
			$last_hire_date_anniversary = mktime(0, 0, 0, date('n', $hire_date), date('j', $hire_date), ( date('Y', TTDate::getTime() ) - 1) );
		}
		Debug::Text('Last Hire Date Anniversary: '. $last_hire_date_anniversary .' - '. TTDate::getDate('DATE+TIME', $last_hire_date_anniversary), __FILE__, __LINE__, __METHOD__, 10);

		return $last_hire_date_anniversary;
	}

	/**
	 * @param int $epoch EPOCH
	 * @param int $start_day_of_week
	 * @return false|int
	 */
	public static function getBeginWeekEpoch( $epoch = NULL, $start_day_of_week = 0 ) {
		if ($epoch == NULL OR $epoch == '') {
			$epoch = self::getTime();
		}

		if ( !is_numeric( $start_day_of_week ) ) {
			if ( strtolower($start_day_of_week) == 'mon' ) {
				$start_day_of_week = 1;
			} elseif ( strtolower($start_day_of_week) == 'sun' ) {
				$start_day_of_week = 0;
			}
		}

		if (  !is_numeric( $start_day_of_week ) ) {
			$start_day_of_week = 0;
		}

		//Get day of week
		$day_of_week = date('w', $epoch);
		//Debug::text('Current Day of week: '. $day_of_week, __FILE__, __LINE__, __METHOD__, 10);

		$offset = 0;
		if ( $day_of_week < $start_day_of_week ) {
			$offset = ( 7 + ($day_of_week - $start_day_of_week) );
		} else {
			$offset = ( $day_of_week - $start_day_of_week );
		}

		$retval = mktime(0, 0, 0, date('m', $epoch), ( date('j', $epoch) - $offset), date('Y', $epoch) );

		//Debug::text(' Epoch: '. TTDate::getDate('DATE+TIME', $epoch) .' Retval: '. TTDate::getDate('DATE+TIME', $retval) .' Start Day of Week: '. $start_day_of_week .' Offset: '. $offset, __FILE__, __LINE__, __METHOD__, 10);
		return $retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @param int $start_day_of_week
	 * @return false|int
	 */
	public static function getEndWeekEpoch( $epoch = NULL, $start_day_of_week = 0 ) {
		if ( $epoch == NULL OR $epoch == '' ) {
			$epoch = self::getTime();
		}

		if ( !is_numeric( $start_day_of_week ) ) {
			if ( strtolower($start_day_of_week) == 'mon' ) {
				$start_day_of_week = 1;
			} elseif ( strtolower($start_day_of_week) == 'sun' ) {
				$start_day_of_week = 0;
			}
		}

		if (  !is_numeric( $start_day_of_week ) ) {
			$start_day_of_week = 0;
		}

		//Get day of week
		$day_of_week = date('w', $epoch);
		//Debug::text('Current Day of week: '. $day_of_week, __FILE__, __LINE__, __METHOD__, 10);

		$offset = 0;
		if ( $day_of_week < $start_day_of_week ) {
			$offset = ( ( $start_day_of_week - $day_of_week ) - 1 );
		} else {
			$offset = ( 6 - ($day_of_week - $start_day_of_week) );
		}

		$retval = mktime(23, 59, 59, date('m', $epoch), ( date('j', $epoch) + $offset), date('Y', $epoch) );

		//Debug::text(' Epoch: '. TTDate::getDate('DATE+TIME', $epoch) .' Retval: '. TTDate::getDate('DATE+TIME', $retval) .' Start Day of Week: '. $start_day_of_week .' Offset: '. $offset, __FILE__, __LINE__, __METHOD__, 10);
		return $retval;
	}

	/**
	 * This could also be called: getWeekOfYear
	 * @param int $epoch EPOCH
	 * @param int $start_week_day
	 * @return int
	 */
	public static function getWeek( $epoch = NULL, $start_week_day = 0 ) {
		//Default start_day_of_week to 1 (Monday) as that is what PHP defaults to.
		if ($epoch == NULL OR $epoch == '') {
			$epoch = self::getTime();
		}

		if ( $start_week_day == 1 ) { //Mon
			$retval = date('W', $epoch );
		} elseif ( $start_week_day == 0 ) { //Sun
			$retval = date('W', ( $epoch + 86400 ) );
		} else { //Tue-Sat
			$retval = date('W', ( $epoch - ( 86400 * ( $start_week_day - 1 ) ) ) );
		}

		return (int)$retval;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getYear( $epoch = NULL) {
		if ($epoch == NULL) {
			$epoch = TTDate::getTime();
		}

		return date('Y', $epoch);
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getMonth( $epoch = NULL ) {
		if ($epoch == NULL OR $epoch == '') {
			$epoch = self::getTime();
		}

		return date('n', $epoch);
	}

	/**
	 * @param $month
	 * @param bool $short_name
	 * @return bool|mixed
	 */
	public static function getMonthName( $month, $short_name = FALSE ) {
		$month = (int)$month;
		$month_names = self::getMonthOfYearArray( $short_name );
		if ( isset($month_names[$month])) {
			return $month_names[$month];
		}

		return FALSE;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getDayOfMonth( $epoch = NULL ) {
		if ($epoch == NULL OR $epoch == '') {
			$epoch = self::getTime();
		}

		return date('j', $epoch);
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getHour( $epoch = NULL ) {
		if ($epoch == NULL OR $epoch == '') {
			$epoch = self::getTime();
		}

		return date('G', $epoch);
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getMinute( $epoch = NULL ) {
		if ($epoch == NULL OR $epoch == '') {
			$epoch = self::getTime();
		}

		return date('i', $epoch);
	}

	/**
	 * @param int $epoch EPOCH
	 * @return false|string
	 */
	public static function getSecond( $epoch = NULL ) {
		if ($epoch == NULL OR $epoch == '') {
			$epoch = self::getTime();
		}

		return date('s', $epoch);
	}

	/**
	 * @param int $epoch EPOCH
	 * @return bool
	 */
	public static function isWeekDay( $epoch = NULL) {
		if ($epoch == NULL OR empty($epoch)) {
			$epoch = TTDate::getTime();
		}

		$day_of_week = date('w', $epoch);
		//Make sure day is not Sat. or Sun
		if ($day_of_week != 0 AND $day_of_week != 6) {
			//Definitely a business day of week, make sure its not a holiday now.
			return TRUE;
		}

		return FALSE;
	}

	/**
	 * @param int $epoch EPOCH
	 * @return int
	 */
	public static function getAnnualWeekDays( $epoch = NULL) {
		if ($epoch == NULL OR $epoch == '') {
			$epoch = self::getTime();
		}

		//Get the year of the passed epoch
		$year = date('Y', $epoch);

		$end_date = mktime(0, 0, 0, 1, 0, ( $year + 1 ) );
		$end_day_of_week = date('w', $end_date);
		$second_end_day_of_week = date('w', ( $end_date - 86400 ) );
		//Debug::text('End Date: ('.$end_day_of_week.') '. $end_date .' - '. TTDate::getDate('DATE+TIME', $end_date), __FILE__, __LINE__, __METHOD__, 10);
		//Debug::text('2nd End Date: ('.$second_end_day_of_week.') '. ( $end_date - 86400 ) .' - '. TTDate::getDate('DATE+TIME', ($end_date - 86400 ) ), __FILE__, __LINE__, __METHOD__, 10);

		//Eriks method
		//Always start with 260 days.
		//If the last day of the year is a weekday, add 1
		//If its a leap year, use the 2 last days. If any of them are weekdays, add them.
		$start_days = 260;

		//Debug::text('Leap Year: '. date('L', $end_date), __FILE__, __LINE__, __METHOD__, 10);

		if ( date('L', $end_date) == 1 ) {
			//Leap year
			if ( $end_day_of_week != 0 AND $end_day_of_week != 6) {
				$start_days++;
			}
			if ( $second_end_day_of_week != 0 AND $second_end_day_of_week != 6) {
				$start_days++;
			}

		} else {
			//Not leap year

			if ( $end_day_of_week != 0 AND $end_day_of_week != 6) {
				$start_days++;
			}

		}
		//Debug::text('Days in Year: ('. $year .'): '. $start_days, __FILE__, __LINE__, __METHOD__, 10);


		return $start_days;
	}

	/**
	 * @param int $epoch EPOCH
	 * @param int $type
	 * @param array $exclude_epochs
	 * @return int
	 */
	public static function getNearestWeekDay( $epoch, $type = 0, $exclude_epochs = array() ) {
		Debug::Text('Epoch: '. TTDate::getDate('DATE+TIME', $epoch ) .' Type: '. $type, __FILE__, __LINE__, __METHOD__, 10);

		while( TTDate::isWeekDay($epoch) == FALSE OR in_array( TTDate::getBeginDayEpoch( $epoch ), $exclude_epochs) ) {
			Debug::text('<b>FOUND WeekDay/HOLIDAY!</b>', __FILE__, __LINE__, __METHOD__, 10);
			switch ( $type ) {
				case 0: //No adjustment
					break 2;
				case 1: //Previous day
					$epoch -= 86400;
					break;
				case 2: //Next day
					$epoch += 86400;
					break;
				case 3: //Closest day
					$forward_epoch = $epoch;
					$forward_days = 0;
					while( TTDate::isWeekDay($forward_epoch) == FALSE OR in_array( TTDate::getBeginDayEpoch( $forward_epoch ), $exclude_epochs) ) {
						$forward_epoch += 86400;
						$forward_days++;
					}

					$backward_epoch = $epoch;
					$backward_days = 0;
					while( TTDate::isWeekDay($backward_epoch) == FALSE OR in_array( TTDate::getBeginDayEpoch( $backward_epoch ), $exclude_epochs) ) {
						$backward_epoch -= 86400;
						$backward_days++;
					}

					if ( $backward_days <= $forward_days ) {
						$epoch = $backward_epoch;
					} else {
						$epoch = $forward_epoch;
					}
					break;
				case 10: //Split: Sat=Sat, Sun=Mon
					if ( TTDate::getDayOfWeek( $epoch ) == 0 ) { //Sun, move forward one day to Mon.
						$epoch += 86400;
					} else {
						break 2; //No Adjustment
					}
					break;
				case 20: //Split: Sat=Fri, Sun=Sun
					if ( TTDate::getDayOfWeek( $epoch ) == 6 ) { //Sat, move backward one day to Fri.
						$epoch -= 86400;
					} else {
						break 2; //No Adjustment
					}
					break;
			}
		}

		return $epoch;
	}

	/**
	 * Returns an array of dates within the range.
	 * @param int $start_date EPOCH
	 * @param int $end_date EPOCH
	 * @param bool $day_of_week
	 * @return array
	 */
	public static function getDateArray( $start_date, $end_date, $day_of_week = FALSE ) {
		$start_date = TTDate::getMiddleDayEpoch( $start_date );
		$end_date = TTDate::getMiddleDayEpoch( $end_date );

		$retarr = array();
		for( $x = $start_date; $x <= $end_date; $x += 93600 ) {
			$x = TTDate::getBeginDayEpoch($x);
			//Make sure we use $day_of_week === FALSE check here, because it could come through as (int)0 for Sunday.
			if ( $day_of_week === FALSE OR TTDate::getDayOfWeek( $x ) == $day_of_week ) {
				$retarr[] = $x;
			}
		}

		return $retarr;
	}

	/**
	 * Loop from filter start date to end date. Creating an array entry for each day.
	 * @param int $start_date EPOCH
	 * @param int $end_date EPOCH
	 * @param int $start_day_of_week
	 * @param bool $force_weeks
	 * @return array|bool
	 */
	public static function getCalendarArray( $start_date, $end_date, $start_day_of_week = 0, $force_weeks = TRUE) {
		if ( $start_date == '' OR $end_date == '' ) {
			return FALSE;
		}

		Debug::text(' Start Day Of Week: '. $start_day_of_week, __FILE__, __LINE__, __METHOD__, 10);
		Debug::text(' Raw Start Date: '. TTDate::getDate('DATE+TIME', $start_date) .' Raw End Date: '. TTDate::getDate('DATE+TIME', $end_date), __FILE__, __LINE__, __METHOD__, 10);

		if ( $force_weeks == TRUE ) {
			$cal_start_date = TTDate::getBeginWeekEpoch($start_date, $start_day_of_week);
			$cal_end_date = TTDate::getEndWeekEpoch($end_date, $start_day_of_week);
		} else {
			$cal_start_date = $start_date;
			$cal_end_date = $end_date;
		}

		Debug::text(' Cal Start Date: '. TTDate::getDate('DATE+TIME', $cal_start_date) .' Cal End Date: '. TTDate::getDate('DATE+TIME', $cal_end_date), __FILE__, __LINE__, __METHOD__, 10);

		$prev_month = NULL;
		$x = 0;
		$retarr = array();

		//Gotta add more then 86400 because of day light savings time. Causes infinite loop without it.
		//Don't add 7200 to Cal End Date because that could cause more then one week to be displayed.
		//for($i = $cal_start_date; $i <= ($cal_end_date); $i += 93600) {
		foreach( TTDate::getDatePeriod( $cal_start_date, $cal_end_date, 'P1D' ) as $i ) {
			if ( $x > 200 ) {
				break;
			}

			$i = TTDate::getBeginDayEpoch($i);

			$current_month = date('n', $i);
			$current_day_of_week = date('w', $i);

			if ( $current_month != $prev_month AND $i >= $start_date ) {
				$isNewMonth = TRUE;
			} else {
				$isNewMonth = FALSE;
			}

			if ( $current_day_of_week == $start_day_of_week ) {
				$isNewWeek = TRUE;
			} else {
				$isNewWeek = FALSE;
			}

			//Display only blank boxes if the date is before the filter start date, or after.
			if ( $i >= $start_date AND $i <= $end_date ) {
				$day_of_week = TTi18n::getText( date('D', $i) ); // i18n: these short day strings may not be in .po file.
				$day_of_month = date('j', $i);
				$month_name = TTi18n::getText( date('F', $i) ); // i18n: these short month strings may not be defined in .po file.
			} else {
				$day_of_week = NULL;
				$day_of_month = NULL;
				$month_name = NULL;
			}

			$retarr[] = array(
							'epoch' => $i,
							'date_stamp' => TTDate::getISODateStamp( $i ),
							'start_day_of_week' => $start_day_of_week,
							'day_of_week' => $day_of_week,
							'day_of_month' => $day_of_month,
							'month_name' => $month_name,
							'month_short_name' => substr($month_name, 0, 3),
							'month' => $current_month,
							'isNewMonth' => $isNewMonth,
							'isNewWeek' => $isNewWeek
							);

			$prev_month = $current_month;

			//Debug::text('i: '. $i .' Date: '. TTDate::getDate('DATE+TIME', $i), __FILE__, __LINE__, __METHOD__, 10);
			$x++;
		}

		return $retarr;
	}

	/**
	 * Generator to loop over any date/time interval and properly handles spanning DST switch-overs.
	 * @param int|DateTime $start Epoch or DateTime object
	 * @param int|DateTime $end Epoch or DateTime object
	 * @param string|DateInterval $interval string interval or DateInterval object
	 * @return bool|Generator
	 * @throws Exception
	 */
	public static function getDatePeriod( $start, $end, $interval = 'P1D', $include_end_date = TRUE ) {
		if ( $start == '' OR $end == '' ) {
			Debug::text('  ERROR: Unable to getDatePeriod without two timestamps...', __FILE__, __LINE__, __METHOD__, 10);
			return array(); //This is usually called from a loop, so make sure we return a blank array.
		}

		if ( is_object( $start ) ) {
			$start_date_obj = $start;
		} else {
			$start_date_obj = new DateTime( '@' . $start );
			$start_date_obj->setTimeZone( new DateTimeZone( TTDate::getTimeZone() ) );
		}

		if ( is_object( $end ) ) {
			$end_date_obj = $end;
		} else {
			$end_date_obj = new DateTime( '@' . $end );
			$end_date_obj->setTimeZone( new DateTimeZone( TTDate::getTimeZone() ) );
		}

		if ( !is_object( $interval ) ) {
			$interval = new DateInterval( $interval );
		}

		//Add 1 second to the end date so this becomes a $start_date <= $end_date check, so it includes both the start and end dates.
		//  If you want it to be a $start_date < $end_date check, no need to make any modifications.
		if ( $include_end_date == TRUE ) {
			$end_date_obj->modify( '+1 second' );
		}
		$period = new DatePeriod( $start_date_obj, $interval, $end_date_obj );

		//Debug::text('Start Date: '. TTDate::getDate('DATE+TIME', $start_date_obj->format('U') ) .' End Date: '. TTDate::getDate('DATE+TIME', $end_date_obj->format('U') ), __FILE__, __LINE__, __METHOD__, 10);
		foreach ( $period as $date_obj ) {
			//Force hour,min,second to always be the same on every iteration. This is important when considering DST so its not +/-3600
			if ( $interval->format('d') > 1 ) {
				$date_obj->setTime( $start_date_obj->format( 'H' ), $start_date_obj->format( 'i' ), $start_date_obj->format( 's' ) );
			}

			//Debug::text('  Iteration Date: '. TTDate::getDate('DATE+TIME', $date_obj->format('U') ), __FILE__, __LINE__, __METHOD__, 10);

			if ( !is_object( $start ) ) {
				$date_obj = $date_obj->format('U');
			}

			yield $date_obj;
		}

		return TRUE;
	}

	/**
	 * @param int $epoch EPOCH
	 * @param int $window_epoch EPOCH
	 * @param $window
	 * @return bool
	 */
	public static function inWindow( $epoch, $window_epoch, $window ) {
		Debug::text(' Epoch: '. TTDate::getDate('DATE+TIME', $epoch ) .' Window Epoch: '. TTDate::getDate('DATE+TIME', $window_epoch ) .' Window: '. $window, __FILE__, __LINE__, __METHOD__, 10);

		if ( $epoch >= ( $window_epoch - $window )
				AND $epoch <= ( $window_epoch + $window ) ) {
			Debug::text(' Within Window', __FILE__, __LINE__, __METHOD__, 10);
			return TRUE;
		}

		Debug::text(' NOT Within Window', __FILE__, __LINE__, __METHOD__, 10);

		return FALSE;
	}

	/**
	 * @param int $start_date1 EPOCH
	 * @param int $end_date1 EPOCH
	 * @param int $start_date2 EPOCH
	 * @param int $end_date2 EPOCH
	 * @return bool|mixed
	 */
	public static function getTimeOverLapDifference( $start_date1, $end_date1, $start_date2, $end_date2) {
		$overlap_result = self::getTimeOverlap( $start_date1, $end_date1, $start_date2, $end_date2 );
		if ( is_array($overlap_result) ) {
			$retval = ( $overlap_result['end_date'] - $overlap_result['start_date'] );
			//Debug::text(' Overlap Time Difference: '. $retval, __FILE__, __LINE__, __METHOD__, 10);
			return $retval;
		}

		return FALSE;
	}

	/**
	 * @param int $start_date1 EPOCH
	 * @param int $end_date1 EPOCH
	 * @param int $start_date2 EPOCH
	 * @param int $end_date2 EPOCH
	 * @return array|bool
	 */
	public static function getTimeOverLap( $start_date1, $end_date1, $start_date2, $end_date2) {
		//Find out if Date1 overlaps with Date2

		//Allow 0 as one of the dates.
		//if ( $start_date1 == '' OR $end_date1 == '' OR $start_date2 == '' OR $end_date2 == '') {
		if ( is_numeric( $start_date1 ) == FALSE OR is_numeric( $end_date1 ) == FALSE OR is_numeric( $start_date2 ) == FALSE OR is_numeric( $end_date2 ) == FALSE ) {
			return FALSE;
		}

		//Debug::text(' Checking if Start Date: '. TTDate::getDate('DATE+TIME', $start_date1 ) .' End Date: '. TTDate::getDate('DATE+TIME', $end_date1 ), __FILE__, __LINE__, __METHOD__, 10);
		//Debug::text('	  Overlap Start Date: '. TTDate::getDate('DATE+TIME', $start_date2 ) .' End Date: '. TTDate::getDate('DATE+TIME', $end_date2 ), __FILE__, __LINE__, __METHOD__, 10);

		/*
			  |-----------------------| <-- Date Pair 1
				1. |-------| <-- Date Pair2
					2.	 |-------------------------|
		3. |-----------------------|
		4. |------------------------------------------|
		*/

		if	( ($start_date2 >= $start_date1 AND $end_date2 <= $end_date1) ) { //Case #1
			//Debug::text(' Overlap on Case #1: ', __FILE__, __LINE__, __METHOD__, 10);
			//$retval = ( $end_date2 - $start_date2 );
			$retarr = array( 'start_date' => $start_date2, 'end_date' => $end_date2, 'scenario' => 'start_after_end_before' );
		} elseif ( ($start_date2 >= $start_date1 AND $start_date2 <= $end_date1) ) { //Case #2
			//Debug::text(' Overlap on Case #2: ', __FILE__, __LINE__, __METHOD__, 10);
			//$retval = ( $end_date1 - $start_date2 );
			$retarr = array( 'start_date' => $start_date2, 'end_date' => $end_date1, 'scenario' => 'start_after_end_after' );
		} elseif ( ($end_date2 >= $start_date1 AND $end_date2 <= $end_date1) ) { //Case #3
			//Debug::text(' Overlap on Case #3: ', __FILE__, __LINE__, __METHOD__, 10);
			//$retval = ( $end_date2 - $start_date1 );
			$retarr = array( 'start_date' => $start_date1, 'end_date' => $end_date2, 'scenario' => 'start_before_end_before' );
		} elseif ( ($start_date2 <= $start_date1 AND $end_date2 >= $end_date1) ) { //Case #4
			//Debug::text(' Overlap on Case #4: ', __FILE__, __LINE__, __METHOD__, 10);
			//$retval = ( $end_date1 - $start_date1 );
			$retarr = array( 'start_date' => $start_date1, 'end_date' => $end_date1, 'scenario' => 'start_before_end_after' );
		}

		if ( isset($retarr) ) {
			//Debug::Text(' Overlap Times: Start: '. TTDate::getDate('DATE+TIME', $retarr['start_date'] ) .' End: '. TTDate::getDate('DATE+TIME', $retarr['end_date'] ) .' Scenario: '. $retarr['scenario'], __FILE__, __LINE__, __METHOD__, 10);
			return $retarr;
		}

		return FALSE;
	}

	/**
	 * @param int $start_date1 EPOCH
	 * @param int $end_date1 EPOCH
	 * @param int $start_date2 EPOCH
	 * @param int $end_date2 EPOCH
	 * @return bool
	 */
	public static function isTimeOverLap( $start_date1, $end_date1, $start_date2, $end_date2) {
		//Find out if Date1 overlaps with Date2

		//Allow 0 as one of the dates.
		//if ( $start_date1 == '' OR $end_date1 == '' OR $start_date2 == '' OR $end_date2 == '') {
		if ( is_numeric( $start_date1 ) == FALSE OR is_numeric( $end_date1 ) == FALSE OR is_numeric( $start_date2 ) == FALSE OR is_numeric( $end_date2 ) == FALSE ) {
			return FALSE;
		}

		//Debug::text(' Checking if Start Date: '. TTDate::getDate('DATE+TIME', $start_date1 ) .' End Date: '. TTDate::getDate('DATE+TIME', $end_date1 ), __FILE__, __LINE__, __METHOD__, 10);
		//Debug::text('	  Overlap Start Date: '. TTDate::getDate('DATE+TIME', $start_date2 ) .' End Date: '. TTDate::getDate('DATE+TIME', $end_date2 ), __FILE__, __LINE__, __METHOD__, 10);

		/*
			  |-----------------------|
				1. |-------|
					2.	 |-------------------------|
		3. |-----------------------|
		4. |------------------------------------------|
		5.	  |-----------------------| (match exactly)

		*/
		if	( ($start_date2 >= $start_date1 AND $end_date2 <= $end_date1) ) { //Case #1
			//Debug::text(' Overlap on Case #1: ', __FILE__, __LINE__, __METHOD__, 10);

			return TRUE;
		}

		//Allow case where there are several shifts in a day, ie:
		// 8:00AM to 1:00PM, 1:00PM to 5:00PM, where the end and start times match exactly.
		//if	( ($start_date2 >= $start_date1 AND $start_date2 <= $end_date1) ) { //Case #2
		if	( ($start_date2 >= $start_date1 AND $start_date2 < $end_date1) ) { //Case #2
			//Debug::text(' Overlap on Case #2: ', __FILE__, __LINE__, __METHOD__, 10);

			return TRUE;
		}

		//Allow case where there are several shifts in a day, ie:
		// 8:00AM to 1:00PM, 1:00PM to 5:00PM, where the end and start times match exactly.
		//if	( ($end_date2 >= $start_date1 AND $end_date2 <= $end_date1) ) { //Case #3
		if	( ($end_date2 > $start_date1 AND $end_date2 <= $end_date1) ) { //Case #3
			//Debug::text(' Overlap on Case #3: ', __FILE__, __LINE__, __METHOD__, 10);

			return TRUE;
		}

		if	( ($start_date2 <= $start_date1 AND $end_date2 >= $end_date1) ) { //Case #4
			//Debug::text(' Overlap on Case #4: ', __FILE__, __LINE__, __METHOD__, 10);

			return TRUE;
		}

		if	( ($start_date2 == $start_date1 AND $end_date2 == $end_date1) ) { //Case #5
			//Debug::text(' Overlap on Case #5: ', __FILE__, __LINE__, __METHOD__, 10);

			return TRUE;
		}

		return FALSE;
	}

	/**
	 * @param int $start_epoch EPOCH
	 * @param int $end_epoch EPOCH
	 * @return array
	 */
	public static function calculateTimeOnEachDayBetweenRange( $start_epoch, $end_epoch ) {
	    $retval = array();
		if ( TTDate::doesRangeSpanMidnight( $start_epoch, $end_epoch ) == TRUE ) {
			$total_before_first_midnight = ( ( TTDate::getEndDayEpoch( $start_epoch ) + 1 ) - $start_epoch );
			if ( $total_before_first_midnight > 0 ) {
				$retval[TTDate::getBeginDayEpoch($start_epoch)] = $total_before_first_midnight;
			}

			$loop_start = ( TTDate::getEndDayEpoch( $start_epoch ) + 1 );
			$loop_end = TTDate::getBeginDayEpoch( $end_epoch );
			//for( $x = $loop_start; $x < $loop_end; $x += 86400 ) {
			foreach( TTDate::getDatePeriod( $loop_start, $loop_end, 'P1D', FALSE ) as $x ) {
				$retval[TTDate::getBeginDayEpoch($x)] = 86400;
			}

			$total_after_last_midnight = ( $end_epoch - TTDate::getBeginDayEpoch( $end_epoch ));
			if ( $total_after_last_midnight > 0 ) {
				$retval[TTDate::getBeginDayEpoch($end_epoch)] = $total_after_last_midnight;
			}
		} else {
			$retval = array( TTDate::getBeginDayEpoch($start_epoch) => ($end_epoch - $start_epoch) );
		}

		return $retval;
	}

	/**
	 * break up a timespan into array of days between times and on midnight
	 * if no filter break days on midnight only
	 *
	 * @param time $start_time_stamp
	 * @param time $end_time_stamp
	 * @param time|bool $filter_start_time_stamp
	 * @param time|bool $filter_end_time_stamp
	 * @return array
	 */
	static function splitDateRangeAtMidnight( $start_time_stamp, $end_time_stamp, $filter_start_time_stamp = FALSE, $filter_end_time_stamp = FALSE ) {
		$return_arr = array();
		$start_timestamp_at_midnight = ( TTDate::getEndDayEpoch( $start_time_stamp ) + 1 );

		/**
		 * set up first pair
		 */
		$date_floor = $date_ceiling = $start_time_stamp;

		if ( $filter_start_time_stamp != FALSE AND $filter_end_time_stamp != FALSE ) {
			$date_ceiling = TTDate::getNextDateFromArray( $date_floor, array($start_timestamp_at_midnight, TTDate::getTimeLockedDate( $filter_start_time_stamp, $start_time_stamp ), TTDate::getTimeLockedDate( $filter_end_time_stamp, $start_time_stamp )) );
		} else {
			$date_ceiling = TTDate::getNextDateFromArray( $date_floor, array($start_timestamp_at_midnight, $end_time_stamp));
		}

		if ( $date_ceiling >= $end_time_stamp ) {
			$return_arr[] = array('start_time_stamp' => $start_time_stamp, 'end_time_stamp' => $end_time_stamp);
			return $return_arr;
		}

		$c = 0;
		$max_loops = ( ( ( $end_time_stamp - $start_time_stamp) / 86400 ) * 6 );
		// #2329 - If the gap between start date and end date is less than a day, we end up with value < 1 so the while loop can't execute properly.
		// In the corner case of start and end being less than a day apart with filters, we need to allow for a minimum of 4 segments, so set the sanity check to 4.
		if ( $max_loops < 4 ) {
			$max_loops = 4;
		}

		while ( $date_ceiling <= $end_time_stamp AND $c <= $max_loops ) {
			$return_arr[] = array('start_time_stamp' => $date_floor, 'end_time_stamp' => $date_ceiling);
			$date_floor = $date_ceiling;

			/**
			 * There are 3 valid scenarios for the date ceiling:
			 * 1. next filter start time
			 * 2. next filter end time
			 * 3. next midnight
			 *
			 * ensure each is greater than $date_floor, then choose the lowest of the qualifying values.
			 */
			if ( $filter_start_time_stamp != FALSE AND $filter_end_time_stamp != FALSE) {
				$next_midnight = TTDate::getTimeLockedDate( $start_timestamp_at_midnight, ( TTDate::getMiddleDayEpoch($date_floor) + 86400 ) );
				$next_filter_start = TTDate::getTimeLockedDate( $filter_start_time_stamp, $date_floor );
				$next_filter_end = TTDate::getTimeLockedDate( $filter_end_time_stamp, $date_floor );

				$date_ceiling = TTDate::getNextDateFromArray( $date_floor, array( $next_midnight, $next_filter_start, $next_filter_end) );
			} else {
				$date_ceiling = TTDate::getTimeLockedDate( $start_timestamp_at_midnight, ( TTDate::getMiddleDayEpoch($date_floor) + 86400 ) );
			}

			/**
			 * Final case.
			 **/
			if ( $date_ceiling >= $end_time_stamp ) {
				$date_ceiling = $end_time_stamp;
				$return_arr[] = array( 'start_time_stamp' => $date_floor, 'end_time_stamp' => $date_ceiling );
				unset( $end_time_stamp, $start_time_stamp, $filter_end_time_stamp, $filter_start_time_stamp );
				return $return_arr;
			}

			$c++;
		}

		Debug::Text('ERROR: infinite loop detected. This should never happen', __FILE__, __LINE__, __METHOD__, 10);
		return $return_arr;
	}

	/**
	 * returns next date from array that is after the floor date
	 * @param int $floor
	 * @param array $dates
	 * @return mixed
	 */
	static function getNextDateFromArray($floor, $dates) {
		$tmp_end_times = array();
		foreach ( $dates as $date ) {
			if ( $date > $floor ) {
				$tmp_end_times[] = $date;
			}
		}

		if ( count($tmp_end_times) > 0 ) {
			return min($tmp_end_times);
		} else {
			return $floor;
		}
	}

	/**
	 * @param int $date_array EPOCH
	 * @return bool
	 */
	public static function isConsecutiveDays( $date_array ) {
		if ( is_array($date_array) AND count($date_array) > 1 ) {
			$retval = FALSE;

			sort($date_array);

			$prev_date = FALSE;
			foreach( $date_array as $date ) {
				if ( $prev_date != FALSE ) {
					$date_diff = ( TTDate::getMiddleDayEpoch( TTDate::strtotime( $date ) ) - TTDate::getMiddleDayEpoch( TTDate::strtotime( $prev_date ) ) );
					if ( $date_diff <= 90000 ) { //Use 90000 so it handles the 86400 +/- 3600 of DST switch over.
						$retval = TRUE;
					} else {
						$retval = FALSE;
						break;
					}
				}

				$prev_date = $date;
			}

			Debug::Text('Days are consecutive: '. count($date_array) .' Retval: '. (int)$retval, __FILE__, __LINE__, __METHOD__, 10);
			return $retval;
		}

		return FALSE;
	}

	/**
	 * @param int $birth_date EPOCH
	 * @param $age
	 * @return false|int
	 */
	public static function getBirthDateAtAge( $birth_date, $age ) {
		if ( $age > 0 ) {
			$age = '+'.$age;
		}

		return strtotime( $age.' years', $birth_date );
	}

	/**
	 * @param int $time_epoch EPOCH
	 * @param int $date_epoch EPOCH
	 * @return false|int
	 */
	public static function getTimeLockedDate( $time_epoch, $date_epoch) {
		//This check is needed because if the $time_epoch is FALSE or 0, it gets treated as Jan 1st 1969 @ 4:00PM in some cases due to time zone (PST) by getdate()
		//so to prevent it from erroneously locking the date at 4PM, just return the original $date_epoch instead.
		if ( $time_epoch == '' ) {
			return $date_epoch;
		}

		$time_arr = getdate($time_epoch);
		$date_arr = getdate($date_epoch);

		$epoch = mktime(	$time_arr['hours'],
							$time_arr['minutes'],
							$time_arr['seconds'],
							$date_arr['mon'],
							$date_arr['mday'],
							$date_arr['year']
							);
		unset($time_arr, $date_arr);

		return $epoch;
	}

	/**
	 * @param $year
	 * @return float
	 */
	public static function getEasterDays( $year) {
		#First calculate the date of easter using Delambre's algorithm.
		$a = ( $year % 19 );
		$b = floor( ( $year / 100 ) );
		$c = ( $year % 100 );
		$d = floor( ( $b / 4 ) );
		$e = ( $b % 4 );
		$f = floor( ( ($b + 8) / 25 ) );
		$g = floor( ( ($b - $f + 1) / 3 ) );
		$h = ( (19 * $a + $b - $d - $g + 15) % 30 );
		$i = floor( ($c / 4) );
		$k = ( $c % 4 );
		$l = ( (32 + 2 * $e + 2 * $i - $h - $k) % 7 );
		$m = floor( ( ($a + 11 * $h + 22 * $l) / 451 ));
		$n = ($h + $l - 7 * $m + 114);
		$month = floor( ( $n / 31 ) );
		$day = ( $n % 31 + 1 );

		#Return the difference between the JulianDayCount for easter and March 21'st
		#of the same year, in order to duplicate the functionality of the easter_days function
		//return GregorianToJD($month, $day, $year) - GregorianToJD(3, 21, $year);
		return round( TTDate::getDays( mktime( 0, 0, 0, $month, $day, $year ) - mktime( 0, 0, 0, 3, 21, $year ) ) );
	}

	/**
	 * Function to return "13 mins ago" text from a given time.
	 * @param int $epoch EPOCH
	 * @return string
	 */
	public static function getHumanTimeSince( $epoch, $current_time = NULL ) {
		if ( $current_time == '' ) { //Needed for unit tests, so we have a consistent date to compare to.
			$current_time = time();
		}

		if ( $current_time >= $epoch ) {
			$epoch_since = ( $current_time - $epoch );
		} else {
			$epoch_since = ( $epoch - $current_time );
		}

		//Debug::text(' Epoch Since: '. $epoch_since, __FILE__, __LINE__, __METHOD__, 10);
		switch ( TRUE ) {
			case ($epoch_since > ( 31536000 * 2 ) ):
					//Years
					$num = TTDate::getYearDifference( $current_time, $epoch );
					$suffix = TTi18n::getText('yr');
					break;
			case ($epoch_since > ( ((3600 * 24) * 60) * 2) ):
					//Months the above number should be 2 months, so we don't get 0 months showing up.
					$num = TTDate::getMonthDifference( $current_time, $epoch );
					$suffix = TTi18n::getText('mth');
					break;
			case ($epoch_since > (604800 * 2) ):
					//Weeks
					$num = TTDate::getWeekDifference( $current_time, $epoch );
					$suffix = TTi18n::getText('wk');
					break;
			case ($epoch_since > (86400 * 2) ):
					//Days
					$num = TTDate::getDayDifference( $current_time, $epoch );
					$suffix = TTi18n::getText('day');
					break;
			case ($epoch_since > (3600 * 2) ):
					//Hours
					$num = ( ($epoch_since / 60) / 60);
					$suffix = TTi18n::getText('hr');
					break;
			case ($epoch_since > (60 * 2) ):
					//Mins
					$num = ($epoch_since / 60);
					$suffix = TTi18n::getText('min');
					break;
			default:
					//Secs
					$num = $epoch_since;
					$suffix = TTi18n::getText('sec');
					break;
		}

		$num = abs( $num );

		if ( $num > 1.1 ) { //1.01 Days gets rounded to 1.0 and should not have "s" on the end.
			$suffix .= TTi18n::getText('s');
		}

		//Debug::text(' Num: '. $num .' Suffix: '. $suffix, __FILE__, __LINE__, __METHOD__, 10);
		return sprintf('%0.01f', $num).' '.$suffix;
	}

	/**
	 * Runs strtotime over a string, but if it happens to be an epoch, strtotime
	 * returns -1, so in this case, just return the epoch again.
	 * @param $str
	 * @return int
	 */
	public static function strtotime( $str) {
		if ( is_numeric($str) ) {
			return (int)$str;
		}

		//Debug::text(' Original String: '. $str, __FILE__, __LINE__, __METHOD__, 10);
		$retval = strtotime($str);
		//Debug::text(' After strotime String: '. $retval, __FILE__, __LINE__, __METHOD__, 10);

		if ( $retval == -1 OR $retval === FALSE ) {
			return $str;
		}

		return (int)$retval;
	}

	/**
	 * @param $str
	 * @return bool
	 */
	public static function isBindTimeStamp( $str ) {
		if ( strpos( $str, '-') === FALSE ) {
			return FALSE;
		}

		return TRUE;
	}

	/**
	 * @param bool $include_pay_period
	 * @return array
	 */
	public static function getTimePeriodOptions( $include_pay_period = TRUE ) {
		$retarr = array(
						'-1000-custom_date' => TTi18n::getText('Custom Dates'), // Select Start/End dates from calendar.
						//'-1005-custom_time' => TTi18n::getText('Custom Date/Time'), // Select Start/End dates & time from calendar.

						//'-1000-custom_relative_date' => TTi18n::getText('Custom Relative Dates'), //Select a Start and End relative date (from this list)
						'-1010-today' => TTi18n::getText('Today'),
						'-1020-yesterday' => TTi18n::getText('Yesterday'),
						'-1030-last_24_hours' => TTi18n::getText('Last 24 Hours'),
						'-1032-last_48_hours' => TTi18n::getText('Last 48 Hours'),
						'-1034-last_72_hours' => TTi18n::getText('Last 72 Hours'),

						'-1100-this_week' => TTi18n::getText('This Week'),
						'-1110-last_week' => TTi18n::getText('Last Week'),
						'-1112-last_2_weeks' => TTi18n::getText('Last 2 Weeks'),
						'-1120-last_7_days' => TTi18n::getText('Last 7 Days'),
						'-1122-last_14_days' => TTi18n::getText('Last 14 Days'),

						'-1300-this_month' => TTi18n::getText('This Month'),
						'-1310-last_month' => TTi18n::getText('Last Month'),
						'-1312-last_2_months' => TTi18n::getText('Last 2 Months'),
						'-1320-last_30_days' => TTi18n::getText('Last 30 Days'),
						'-1320-last_45_days' => TTi18n::getText('Last 45 Days'),
						'-1322-last_60_days' => TTi18n::getText('Last 60 Days'),

						'-1400-this_quarter' => TTi18n::getText('This Quarter'),
						'-1410-last_quarter' => TTi18n::getText('Last Quarter'),
						'-1420-last_90_days' => TTi18n::getText('Last 90 Days'),
						'-1430-this_year_1st_quarter' => TTi18n::getText('1st Quarter (This Year)'),
						'-1440-this_year_2nd_quarter' => TTi18n::getText('2nd Quarter (This Year)'),
						'-1450-this_year_3rd_quarter' => TTi18n::getText('3rd Quarter (This Year)'),
						'-1460-this_year_4th_quarter' => TTi18n::getText('4th Quarter (This Year)'),
						'-1470-last_year_1st_quarter' => TTi18n::getText('1st Quarter (Last Year)'),
						'-1480-last_year_2nd_quarter' => TTi18n::getText('2nd Quarter (Last Year)'),
						'-1490-last_year_3rd_quarter' => TTi18n::getText('3rd Quarter (Last Year)'),
						'-1500-last_year_4th_quarter' => TTi18n::getText('4th Quarter (Last Year)'),

						'-1600-last_3_months' => TTi18n::getText('Last 3 Months'),
						'-1610-last_6_months' => TTi18n::getText('Last 6 Months'),
						'-1620-last_9_months' => TTi18n::getText('Last 9 Months'),
						'-1630-last_12_months' => TTi18n::getText('Last 12 Months'),
						'-1640-last_18_months' => TTi18n::getText('Last 18 Months'),
						'-1650-last_24_months' => TTi18n::getText('Last 24 Months'),

						'-1700-this_year' => TTi18n::getText('This Year'), //Used to be 'This Year (Year-To-Date)', but its actually the entire year which was confusing for some users. They can use 'This Year (Up To Today)' instead.
						'-1715-this_year_yesterday' => TTi18n::getText('This Year (Up To Yesterday)'),
						'-1716-this_year_today' => TTi18n::getText('This Year (Up To Today)'),
						'-1717-this_year_ytd' => TTi18n::getText('This Year (Year-To-Date)'), //Could be "This Year (Up to Tomorrow)"? This does not include the current day.
						//'-1718-this_year_tomorrow' => TTi18n::getText('This Year (Up To Tomorrow)'),
						'-1720-this_year_last_week' => TTi18n::getText('This Year (Up To Last Week)'),
						'-1725-this_year_this_week' => TTi18n::getText('This Year (Up To This Week)'),
						'-1730-this_year_last_month' => TTi18n::getText('This Year (Up To Last Month)'),
						'-1735-this_year_this_month' => TTi18n::getText('This Year (Up To This Month)'),
						'-1740-this_year_30_days' => TTi18n::getText('This Year (Up To 30 Days Ago)'),
						'-1745-this_year_45_days' => TTi18n::getText('This Year (Up To 45 Days Ago)'),
						'-1750-this_year_60_days' => TTi18n::getText('This Year (Up To 60 Days Ago)'),
						'-1755-this_year_90_days' => TTi18n::getText('This Year (Up To 90 Days Ago)'),
						'-1765-this_year_last_quarter' => TTi18n::getText('This Year (Up To Last Quarter)'),
						'-1770-this_year_this_quarter' => TTi18n::getText('This Year (Up To This Quarter)'),

						'-1780-last_year' => TTi18n::getText('Last Year'),
						'-1785-last_2_years' => TTi18n::getText('Last Two Years'),
						'-1790-last_3_years' => TTi18n::getText('Last Three Years'),
						'-1795-last_5_years' => TTi18n::getText('Last Five Years'),

						'-1800-to_yesterday' => TTi18n::getText('Up To Yesterday'),
						'-1802-to_today' => TTi18n::getText('Up To Today'),
						'-1810-to_last_week' => TTi18n::getText('Up To Last Week'),
						'-1812-to_this_week' => TTi18n::getText('Up To This Week'),
						'-1814-to_7_days' => TTi18n::getText('Up To 7 Days Ago'),
						'-1816-to_14_days' => TTi18n::getText('Up To 14 Days Ago'),
						'-1830-to_last_month' => TTi18n::getText('Up To Last Month'),
						'-1832-to_this_month' => TTi18n::getText('Up To This Month'),
						'-1840-to_30_days' => TTi18n::getText('Up To 30 Days Ago'),
						'-1842-to_45_days' => TTi18n::getText('Up To 45 Days Ago'),
						'-1844-to_60_days' => TTi18n::getText('Up To 60 Days Ago'),
						'-1850-to_last_quarter' => TTi18n::getText('Up To Last Quarter'),
						'-1852-to_this_quarter' => TTi18n::getText('Up To This Quarter'),
						'-1854-to_90_days' => TTi18n::getText('Up To 90 Days Ago'),
						'-1860-to_last_year' => TTi18n::getText('Up To Last Year'),
						'-1862-to_this_year' => TTi18n::getText('Up To This Year'),

						'-1900-tomorrow' => TTi18n::getText('Tomorrow'),
						'-1902-next_24_hours' => TTi18n::getText('Next 24 Hours'),
						'-1904-next_48_hours' => TTi18n::getText('Next 48 Hours'),
						'-1906-next_72_hours' => TTi18n::getText('Next 72 Hours'),
						'-1910-next_week' => TTi18n::getText('Next Week'),
						'-1912-next_2_weeks' => TTi18n::getText('Next 2 Weeks'),
						'-1914-next_7_days' => TTi18n::getText('Next 7 Days'),
						'-1916-next_14_days' => TTi18n::getText('Next 14 Days'),
						'-1930-next_month' => TTi18n::getText('Next Month'),
						'-1932-next_2_months' => TTi18n::getText('Next 2 Months'),
						'-1940-next_30_days' => TTi18n::getText('Next 30 Days'),
						'-1942-next_45_days' => TTi18n::getText('Next 45 Days'),
						'-1944-next_60_days' => TTi18n::getText('Next 60 Days'),
						'-1950-next_quarter' => TTi18n::getText('Next Quarter'),
						'-1954-next_90_days' => TTi18n::getText('Next 90 Days'),
						'-1960-next_3_months' => TTi18n::getText('Next 3 Months'),
						'-1962-next_6_months' => TTi18n::getText('Next 6 Months'),
						'-1964-next_9_months' => TTi18n::getText('Next 9 Months'),
						'-1966-next_12_months' => TTi18n::getText('Next 12 Months'),
						'-1968-next_18_months' => TTi18n::getText('Next 18 Months'),
						'-1970-next_24_months' => TTi18n::getText('Next 24 Months'),
						'-1980-next_year' => TTi18n::getText('Next Year'),
						'-1982-next_2_years' => TTi18n::getText('Next Two Years'),
						'-1984-next_3_years' => TTi18n::getText('Next Three Years'),
						'-1986-next_5_years' => TTi18n::getText('Next Five Years'),

						'-1990-all_years' => TTi18n::getText('All Years'),
					);

		if ( $include_pay_period == TRUE ) {
			$pay_period_arr = array(
									'-1008-custom_pay_period' => TTi18n::getText('Custom Pay Periods'), //Select pay periods individually
									'-1200-this_pay_period' => TTi18n::getText('This Pay Period'), //Select one or more pay period schedules
									'-1210-last_pay_period' => TTi18n::getText('Last Pay Period'), //Select one or more pay period schedules
									'-1212-no_pay_period' => TTi18n::getText('No Pay Period'), //Data assigned to no pay periods or pay_period_id = 0
									'-1705-this_year_this_pay_period' => TTi18n::getText('This Year (Up To This Pay Period)'),
									'-1710-this_year_last_pay_period' => TTi18n::getText('This Year (Up To Last Pay Period)'),
									'-1820-to_last_pay_period' => TTi18n::getText('Up To Last Pay Period'),
									'-1822-to_this_pay_period' => TTi18n::getText('Up To This Pay Period'),
									);

			$retarr = array_merge( $retarr, $pay_period_arr );
			ksort($retarr);
		}

		return $retarr;
	}

	/**
	 * @param $time_period
	 * @param int $epoch EPOCH
	 * @param object $user_obj
	 * @param null $params
	 * @return array|bool
	 */
	public static function getTimePeriodDates( $time_period, $epoch = NULL, $user_obj = NULL, $params = NULL ) {
		$time_period = Misc::trimSortPrefix( $time_period );

		if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch) ) {
			$epoch = self::getTime();
		}

		$start_week_day = 0;
		if ( is_object( $user_obj ) ) {
			$user_prefs = $user_obj->getUserPreferenceObject();
			if ( is_object($user_prefs) ) {
				$start_week_day = $user_prefs->getStartWeekDay();
			}
		}

		switch( $time_period ) {
			case 'custom_date':
				//Params must pass start_date/end_date
				if ( isset($params['start_date']) ) {
					$start_date = TTDate::getBeginDayEpoch( $params['start_date'] );
				}
				if ( isset($params['end_date']) ) {
					$end_date = TTDate::getEndDayEpoch( $params['end_date'] );
				}
				break;
			case 'custom_time':
				//Params must pass start_date/end_date
				if ( isset($params['start_date']) ) {
					$start_date = $params['start_date'];
				}
				if ( isset($params['end_date']) ) {
					$end_date = $params['end_date'];
				}
				break;
			case 'custom_pay_period':
				//Params must pass pay_period_ids
				if ( isset($params['pay_period_id']) ) {
					$pay_period_ids = (array)$params['pay_period_id'];
				}
				break;
			case 'today':
				$start_date = TTDate::getBeginDayEpoch( $epoch );
				$end_date = TTDate::getEndDayEpoch( $epoch );
				break;
			case 'yesterday':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				break;
			case 'last_24_hours':
				$start_date = ( $epoch - 86400 );
				$end_date = $epoch;
				break;
			case 'last_48_hours':
				$start_date = ( $epoch - ( 86400 * 2 ) );
				$end_date = $epoch;
				break;
			case 'last_72_hours':
				$start_date = ( $epoch - ( 86400 * 3 ) );
				$end_date = $epoch;
				break;
			case 'this_week':
				$start_date = TTDate::getBeginWeekEpoch( $epoch, $start_week_day );
				$end_date = TTDate::getEndWeekEpoch( $epoch, $start_week_day );
				break;
			case 'last_week':
				$start_date = TTDate::getBeginWeekEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 7)), $start_week_day );
				$end_date = TTDate::getEndWeekEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 7)), $start_week_day );
				break;
			case 'last_2_weeks':
				$start_date = TTDate::getBeginWeekEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 14)), $start_week_day );
				$end_date = TTDate::getEndWeekEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 7)), $start_week_day );
				break;
			case 'last_7_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 7) ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				break;
			case 'last_14_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 14) ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				break;

			//Params must be passed if more than one pay period schedule exists.
			case 'no_pay_period':
			case 'this_pay_period':
			case 'last_pay_period':
				Debug::text('Time Period for Pay Period Schedule selected...', __FILE__, __LINE__, __METHOD__, 10);
				//Make sure user_obj is set.
				if ( !is_object( $user_obj ) ) {
					Debug::text('User Object was not passsed...', __FILE__, __LINE__, __METHOD__, 10);
					break;
				}

				if ( !isset($params['pay_period_schedule_id']) ) {
					$params['pay_period_schedule_id'] = NULL;
				}

				$pay_period_ids = array();

				//Since we allow multiple pay_period schedules to be selected, we have to return pay_period_ids, not start/end dates.
				if ( $time_period == 'this_pay_period' ) {
					Debug::text('this_pay_period', __FILE__, __LINE__, __METHOD__, 10);
					$pplf = TTnew( 'PayPeriodListFactory' ); /** @var PayPeriodListFactory $pplf */
					$pplf->getThisPayPeriodByCompanyIdAndPayPeriodScheduleIdAndDate( $user_obj->getCompany(), $params['pay_period_schedule_id'], time() );
					if ( $pplf->getRecordCount() > 0 ) {
						foreach( $pplf as $pp_obj ) {
							$pay_period_ids[] = $pp_obj->getId();
						}
					}
				} elseif ( $time_period == 'last_pay_period' ) {
					Debug::text('last_pay_period', __FILE__, __LINE__, __METHOD__, 10);
					$pplf = TTnew( 'PayPeriodListFactory' ); /** @var PayPeriodListFactory $pplf */
					$pplf->getLastPayPeriodByCompanyIdAndPayPeriodScheduleIdAndDate( $user_obj->getCompany(), $params['pay_period_schedule_id'], time() );
					if ( $pplf->getRecordCount() > 0 ) {
						foreach( $pplf as $pp_obj ) {
							$pay_period_ids[] = $pp_obj->getId();
						}
					}
				} else {
					Debug::text('no_pay_period', __FILE__, __LINE__, __METHOD__, 10);
				}

				Debug::Arr($pay_period_ids, 'Pay Period IDs: ', __FILE__, __LINE__, __METHOD__, 10);
				if ( count($pay_period_ids) == 0 ) {
					unset($pay_period_ids);
				}
				break;
			case 'this_month':
				$start_date = TTDate::getBeginMonthEpoch( $epoch );
				$end_date = TTDate::getEndMonthEpoch( $epoch );
				break;
			case 'last_month':
				$start_date = TTDate::getBeginMonthEpoch( (TTDate::getBeginMonthEpoch( $epoch ) - 86400) );
				$end_date = TTDate::getEndMonthEpoch( (TTDate::getBeginMonthEpoch( $epoch ) - 86400) );
				break;
			case 'last_2_months':
				$start_date = TTDate::getBeginMonthEpoch( (TTDate::getBeginMonthEpoch( $epoch ) - (86400 * 32)) );
				$end_date = TTDate::getEndMonthEpoch( (TTDate::getBeginMonthEpoch( $epoch ) - 86400) );
				break;
			case 'last_30_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 30) ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				break;
			case 'last_45_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 45) ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				break;
			case 'last_60_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 60) ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				break;
			case 'this_quarter':
				$quarter = TTDate::getYearQuarter( $epoch );
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );
				//Debug::Arr($quarter_dates, 'Quarter Dates: Quarter: '. $quarter, __FILE__, __LINE__, __METHOD__, 10);

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'last_quarter':
				$quarter = ( TTDate::getYearQuarter( $epoch ) - 1 );
				if ( $quarter == 0 ) {
					$quarter = 4;
					$epoch = (TTDate::getBeginYearEpoch() - 86400); //Need to jump back into the previous year.
				}
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'last_90_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 90) ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				break;
			case 'this_year_1st_quarter':
				$quarter = 1;
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'this_year_2nd_quarter':
				$quarter = 2;
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'this_year_3rd_quarter':
				$quarter = 3;
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'this_year_4th_quarter':
				$quarter = 4;
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'last_year_1st_quarter':
				$quarter = 1;
				$quarter_dates = TTDate::getYearQuarters( (TTDate::getBeginYearEpoch( $epoch ) - 86400), $quarter );

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'last_year_2nd_quarter':
				$quarter = 2;
				$quarter_dates = TTDate::getYearQuarters( (TTDate::getBeginYearEpoch( $epoch ) - 86400), $quarter );

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'last_year_3rd_quarter':
				$quarter = 3;
				$quarter_dates = TTDate::getYearQuarters( (TTDate::getBeginYearEpoch( $epoch ) - 86400), $quarter );

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'last_year_4th_quarter':
				$quarter = 4;
				$quarter_dates = TTDate::getYearQuarters( (TTDate::getBeginYearEpoch( $epoch ) - 86400), $quarter );

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'last_3_months':
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				$start_date = mktime(0, 0, 0, (TTDate::getMonth( $end_date ) - 3), TTDate::getDayOfMonth( $end_date ), TTDate::getYear( $end_date ) );
				break;
			case 'last_6_months':
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				$start_date = mktime(0, 0, 0, (TTDate::getMonth( $end_date ) - 6), TTDate::getDayOfMonth( $end_date ), TTDate::getYear( $end_date ) );
				break;
			case 'last_9_months':
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				$start_date = mktime(0, 0, 0, (TTDate::getMonth( $end_date ) - 9), TTDate::getDayOfMonth( $end_date ), TTDate::getYear( $end_date ) );
				break;
			case 'last_12_months':
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				$start_date = mktime(0, 0, 0, TTDate::getMonth( $end_date), TTDate::getDayOfMonth( $end_date ), (TTDate::getYear( $end_date ) - 1) );
				break;
			case 'last_18_months':
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				$start_date = mktime(0, 0, 0, (TTDate::getMonth( $end_date ) - 18), TTDate::getDayOfMonth( $end_date ), TTDate::getYear( $end_date ) );
				break;
			case 'last_24_months':
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) );
				$start_date = mktime(0, 0, 0, ( TTDate::getMonth( $end_date ) - 24), TTDate::getDayOfMonth( $end_date ), TTDate::getYear( $end_date ) );
				break;
			case 'this_year':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = TTDate::getEndYearEpoch( $epoch );
				break;

			case 'this_year_this_pay_period':
			case 'this_year_last_pay_period':
				$start_date = TTDate::getBeginYearEpoch( $epoch );

				//Make sure user_obj is set.
				if ( !is_object( $user_obj ) ) {
					Debug::text('User Object was not passsed...', __FILE__, __LINE__, __METHOD__, 10);
					break;
				}

				if ( !isset($params['pay_period_schedule_id']) ) {
					$params['pay_period_schedule_id'] = NULL;
				}

				$end_date = FALSE;
				//Since we allow multiple pay_period schedules to be selected, we have to return pay_period_ids, not start/end dates.
				if ( $time_period == 'this_year_this_pay_period' ) {
					$pplf = TTnew( 'PayPeriodListFactory' ); /** @var PayPeriodListFactory $pplf */
					$pplf->getThisPayPeriodByCompanyIdAndPayPeriodScheduleIdAndDate( $user_obj->getCompany(), $params['pay_period_schedule_id'], time() );
					if ( $pplf->getRecordCount() > 0 ) {
						foreach( $pplf as $pp_obj ) {
							if ( $end_date == FALSE OR $pp_obj->getStartDate() < $end_date ) {
								$end_date = $pp_obj->getStartDate();
							}
						}
					}
				} elseif ( $time_period == 'this_year_last_pay_period' ) {
					$pplf = TTnew( 'PayPeriodListFactory' ); /** @var PayPeriodListFactory $pplf */
					$pplf->getLastPayPeriodByCompanyIdAndPayPeriodScheduleIdAndDate( $user_obj->getCompany(), $params['pay_period_schedule_id'], time() );
					if ( $pplf->getRecordCount() > 0 ) {
						foreach( $pplf as $pp_obj ) {
							if ( $end_date == FALSE OR $pp_obj->getStartDate() < $end_date ) {
								$end_date = $pp_obj->getStartDate();
							}
						}
					}
				}
				$end_date--;
				break;
			case 'this_year_yesterday':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) ) - 1);
				break;
			case 'this_year_today':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginDayEpoch( TTDate::getMiddleDayEpoch( $epoch ) ) - 1);
				break;
			case 'this_year_ytd': //Same as This Year (Up To Tomorrow), which includes today.
			case 'this_year_tomorrow':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400) ) - 1);
				break;
			case 'this_year_last_week':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginWeekEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 7)), $start_week_day ) - 1 );
				break;
			case 'this_year_this_week':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginWeekEpoch( $epoch, $start_week_day ) - 1);
				break;
			case 'this_year_this_month':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginMonthEpoch( $epoch ) - 1 );
				break;
			case 'this_year_last_month':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginMonthEpoch( (TTDate::getBeginMonthEpoch( $epoch ) - 86400) ) - 1 );
				break;
			case 'this_year_30_days':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 30) ) ) - 1 );
				break;
			case 'this_year_45_days':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 45) ) ) - 1 );
				break;
			case 'this_year_60_days':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 60) ) ) - 1 );
				break;
			case 'this_year_90_days':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 90) ) ) - 1 );
				break;
			case 'this_year_last_quarter':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$quarter = ( TTDate::getYearQuarter( $epoch ) - 1 );
				if ( $quarter == 0 ) {
					$quarter = 4;
					$epoch = (TTDate::getBeginYearEpoch() - 86400); //Need to jump back into the previous year.
				}
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );
				$end_date = ( $quarter_dates['start'] - 1 );
				break;
			case 'this_year_this_quarter':
				$start_date = TTDate::getBeginYearEpoch( $epoch );
				$quarter = TTDate::getYearQuarter( $epoch );
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );
				$end_date = ( $quarter_dates['start'] - 1 );
				break;

			case 'last_year':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( $epoch ) - 86400) );
				$end_date = TTDate::getEndYearEpoch( (TTDate::getBeginYearEpoch( $epoch ) - 86400) );
				break;
			case 'last_2_years':
				$end_date = TTDate::getEndYearEpoch( (TTDate::getBeginYearEpoch( $epoch ) - 86400) );
				$start_date = mktime(0, 0, 0, TTDate::getMonth( $end_date ), TTDate::getDayOfMonth( $end_date ), ( TTDate::getYear( $end_date ) - 2 ) );
				break;
			case 'last_3_years':
				$end_date = TTDate::getEndYearEpoch( (TTDate::getBeginYearEpoch( $epoch ) - 86400) );
				$start_date = mktime(0, 0, 0, TTDate::getMonth( $end_date ), TTDate::getDayOfMonth( $end_date ), ( TTDate::getYear( $end_date ) - 3 ) );
				break;
			case 'last_5_years':
				$end_date = TTDate::getEndYearEpoch( (TTDate::getBeginYearEpoch( $epoch ) - 86400) );
				$start_date = mktime(0, 0, 0, TTDate::getMonth( $end_date ), TTDate::getDayOfMonth( $end_date ), ( TTDate::getYear( $end_date ) - 5 ) );
				break;


			case 'to_yesterday': //"Up To" means we need to use the end time of the day we go up to.
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - 86400) ) - 1);
				break;
			case 'to_today':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginDayEpoch( TTDate::getMiddleDayEpoch( $epoch ) ) - 1);
				break;
			case 'to_this_week':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginWeekEpoch( $epoch, $start_week_day ) - 1);
				break;
			case 'to_last_week':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginWeekEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 7)), $start_week_day ) - 1 );
				break;
			case 'to_7_days':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 7) ) ) - 1 );
				break;
			case 'to_14_days':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 14) ) ) - 1 );
				break;
			case 'to_last_pay_period':
			case 'to_this_pay_period':
				Debug::text('Time Period for Pay Period Schedule selected...', __FILE__, __LINE__, __METHOD__, 10);
				//Make sure user_obj is set.
				if ( !is_object( $user_obj ) ) {
					Debug::text('User Object was not passsed...', __FILE__, __LINE__, __METHOD__, 10);
					break;
				}

				if ( !isset($params['pay_period_schedule_id']) ) {
					$params['pay_period_schedule_id'] = NULL;
				}

				$end_date = FALSE;
				//Since we allow multiple pay_period schedules to be selected, we have to return pay_period_ids, not start/end dates.
				if ( $time_period == 'to_this_pay_period' ) {
					Debug::text('to_this_pay_period', __FILE__, __LINE__, __METHOD__, 10);
					$pplf = TTnew( 'PayPeriodListFactory' ); /** @var PayPeriodListFactory $pplf */
					$pplf->getThisPayPeriodByCompanyIdAndPayPeriodScheduleIdAndDate( $user_obj->getCompany(), $params['pay_period_schedule_id'], time() );
					if ( $pplf->getRecordCount() > 0 ) {
						foreach( $pplf as $pp_obj ) {
							if ( $end_date == FALSE OR $pp_obj->getStartDate() < $end_date ) {
								$end_date = $pp_obj->getStartDate();
							}
						}
					}
				} elseif ( $time_period == 'to_last_pay_period' ) {
					Debug::text('to_last_pay_period', __FILE__, __LINE__, __METHOD__, 10);
					$pplf = TTnew( 'PayPeriodListFactory' ); /** @var PayPeriodListFactory $pplf */
					$pplf->getLastPayPeriodByCompanyIdAndPayPeriodScheduleIdAndDate( $user_obj->getCompany(), $params['pay_period_schedule_id'], time() );
					if ( $pplf->getRecordCount() > 0 ) {
						foreach( $pplf as $pp_obj ) {
							if ( $end_date == FALSE OR $pp_obj->getStartDate() < $end_date ) {
								$end_date = $pp_obj->getStartDate();
							}
						}
					}
				}

				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date--;
				break;
			case 'to_last_month':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginMonthEpoch( (TTDate::getBeginMonthEpoch( $epoch ) - 86400) ) - 1 );
				break;
			case 'to_this_month':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginMonthEpoch( $epoch ) - 1 );
				break;
			case 'to_30_days':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 30) ) ) - 1 );
				break;
			case 'to_45_days':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 45) ) ) - 1 );
				break;
			case 'to_60_days':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 60) ) ) - 1 );
				break;
			case 'to_last_quarter':
				$quarter = ( TTDate::getYearQuarter( $epoch ) - 1 );
				if ( $quarter == 0 ) {
					$quarter = 4;
					$epoch = (TTDate::getBeginYearEpoch() - 86400); //Need to jump back into the previous year.
				}
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( $quarter_dates['start'] - 1 );
				break;
			case 'to_this_quarter':
				$quarter = TTDate::getYearQuarter( $epoch );
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( $quarter_dates['start'] - 1 );
				break;
			case 'to_90_days':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) - (86400 * 90) ) ) - 1 );
				break;
			case 'to_this_year':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginYearEpoch( $epoch ) - 1 );
				break;
			case 'to_last_year':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = ( TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( $epoch ) - 86400) ) - 1 );
				break;
			case 'tomorrow':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400) );
				break;
			case 'next_24_hours':
				$start_date = $epoch;
				$end_date = ( $epoch + 86400 );
				break;
			case 'next_48_hours':
				$start_date = $epoch;
				$end_date = ( $epoch + (86400 * 2) );
				break;
			case 'next_72_hours':
				$start_date = $epoch;
				$end_date = ( $epoch + (86400 * 3) );
				break;
			case 'next_week':
				$start_date = TTDate::getBeginWeekEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + (86400 * 7)), $start_week_day );
				$end_date = TTDate::getEndWeekEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + (86400 * 7)), $start_week_day );
				break;
			case 'next_2_weeks':
				$start_date = TTDate::getBeginWeekEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + (86400 * 7)), $start_week_day );
				$end_date = TTDate::getEndWeekEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + (86400 * 14)), $start_week_day );
				break;
			case 'next_7_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400 ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + (86400 * 7)) );
				break;
			case 'next_14_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400 ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + (86400 * 14)) );
				break;
			case 'next_month':
				$start_date = TTDate::getBeginMonthEpoch( (TTDate::getEndMonthEpoch( $epoch ) + 86400) );
				$end_date = TTDate::getEndMonthEpoch( (TTDate::getEndMonthEpoch( $epoch ) + 86400) );
				break;
			case 'next_2_months':
				$start_date = TTDate::getBeginMonthEpoch( (TTDate::getEndMonthEpoch( $epoch ) + 86400) );
				$end_date = TTDate::getEndMonthEpoch( (TTDate::getEndMonthEpoch( $epoch ) + (86400 * 32)) );
				break;
			case 'next_30_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400 ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + (86400 * 30)) );
				break;
			case 'next_45_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400 ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + (86400 * 45)) );
				break;
			case 'next_60_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400 ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + (86400 * 60)) );
				break;
			case 'next_quarter':
				$quarter = ( TTDate::getYearQuarter( $epoch ) + 1 );
				if ( $quarter == 5 ) {
					$quarter = 1;
					$epoch = (TTDate::getEndYearEpoch() + 86400); //Need to jump back into the previous year.
				}
				$quarter_dates = TTDate::getYearQuarters( $epoch, $quarter );

				$start_date = $quarter_dates['start'];
				$end_date = $quarter_dates['end'];
				break;
			case 'next_90_days':
				$start_date = TTDate::getBeginDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400 ) );
				$end_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + (86400 * 90)) );
				break;
			case 'next_3_months':
				$start_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400) );
				$end_date = mktime(0, 0, 0, ( TTDate::getMonth( $start_date ) + 3 ), TTDate::getDayOfMonth( $start_date ), TTDate::getYear( $start_date ) );
				break;
			case 'next_6_months':
				$start_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400) );
				$end_date = mktime(0, 0, 0, ( TTDate::getMonth( $start_date ) + 6 ), TTDate::getDayOfMonth( $start_date ), TTDate::getYear( $start_date ) );
				break;
			case 'next_9_months':
				$start_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400) );
				$end_date = mktime(0, 0, 0, ( TTDate::getMonth( $start_date ) + 9 ), TTDate::getDayOfMonth( $start_date ), TTDate::getYear( $start_date ) );
				break;
			case 'next_12_months':
				$start_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400) );
				$end_date = mktime(0, 0, 0, ( TTDate::getMonth( $start_date ) + 12 ), TTDate::getDayOfMonth( $start_date ), TTDate::getYear( $start_date ) );
				break;
			case 'next_18_months':
				$start_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400) );
				$end_date = mktime(0, 0, 0, ( TTDate::getMonth( $start_date ) + 18 ), TTDate::getDayOfMonth( $start_date ), TTDate::getYear( $start_date ) );
				break;
			case 'next_24_months':
				$start_date = TTDate::getEndDayEpoch( (TTDate::getMiddleDayEpoch( $epoch ) + 86400) );
				$end_date = mktime(0, 0, 0, ( TTDate::getMonth( $start_date ) + 24 ), TTDate::getDayOfMonth( $start_date ), TTDate::getYear( $start_date ) );
				break;
			case 'next_year':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getEndYearEpoch( $epoch ) + 86400) );
				$end_date = TTDate::getEndYearEpoch( (TTDate::getEndYearEpoch( $epoch ) + 86400) );
				break;
			case 'next_2_years':
				$start_date = TTDate::getEndYearEpoch( (TTDate::getEndYearEpoch( $epoch ) + 86400) );
				$end_date = mktime(0, 0, 0, TTDate::getMonth( $start_date ), TTDate::getDayOfMonth( $start_date ), ( TTDate::getYear( $start_date ) + 2 ) );
				break;
			case 'next_3_years':
				$start_date = TTDate::getEndYearEpoch( (TTDate::getEndYearEpoch( $epoch ) + 86400) );
				$end_date = mktime(0, 0, 0, TTDate::getMonth( $start_date ), TTDate::getDayOfMonth( $start_date ), ( TTDate::getYear( $start_date ) + 3 ) );
				break;
			case 'next_5_years':
				$start_date = TTDate::getEndYearEpoch( (TTDate::getEndYearEpoch( $epoch ) + 86400) );
				$end_date = mktime(0, 0, 0, TTDate::getMonth( $start_date ), TTDate::getDayOfMonth( $start_date ), ( TTDate::getYear( $start_date ) + 5 ) );
				break;
			case 'all_years':
				$start_date = TTDate::getBeginYearEpoch( (TTDate::getBeginYearEpoch( 31564800 ) - 86400) );
				$end_date = TTDate::getEndYearEpoch( time() + (86400 * (365 * 2)) );
				break;
			default:
				break;
		}

		if ( isset($start_date) AND isset($end_date) ) {
			//Debug::text('Period: '. $time_period .' Start: '. TTDate::getDate('DATE+TIME', $start_date ) .'('.$start_date.') End: '. TTDate::getDate('DATE+TIME', $end_date ) .'('.$end_date.')', __FILE__, __LINE__, __METHOD__, 10);
			return array('start_date' => $start_date, 'end_date' => $end_date );
		} elseif ( isset($pay_period_ids) ) {
			//Debug::text('Period: '. $time_period .' returning just pay_period_ids...', __FILE__, __LINE__, __METHOD__, 10);
			return array('pay_period_id' => $pay_period_ids );
		}

		return FALSE;
	}

	/**
	 * @param null $column_name_prefix
	 * @param null $column_name
	 * @param null $sort_prefix
	 * @param bool $include_pay_period
	 * @return array
	 */
	public static function getReportDateOptions( $column_name_prefix = NULL, $column_name = NULL, $sort_prefix = NULL, $include_pay_period = TRUE ) {
		if ( $sort_prefix == '' ) {
			$sort_prefix = 19;
		}

		if ( $column_name == '' ) {
			$column_name = TTi18n::getText('Date');
		}

		if ( $column_name_prefix != '' ) {
			$column_name_prefix .= '-';
		}

		$retarr = array(
						'-'.$sort_prefix.'00-'. $column_name_prefix .'date_stamp'				=> $column_name,
						'-'.$sort_prefix.'01-'. $column_name_prefix .'time_stamp'				=> $column_name.' - '. TTi18n::getText('Time of Day'),
						'-'.$sort_prefix.'01-'. $column_name_prefix .'date_time_stamp'			=> $column_name.' - '. TTi18n::getText('w/Time'),

						'-'.$sort_prefix.'04-'. $column_name_prefix .'hour_of_day'				=> $column_name.' - '. TTi18n::getText('Hour of Day'),

						'-'.$sort_prefix.'10-'. $column_name_prefix .'date_dow'					=> $column_name.' - '. TTi18n::getText('Day of Week'),
						'-'.$sort_prefix.'12-'. $column_name_prefix .'date_dow_week'			=> $column_name.' - '. TTi18n::getText('Day of Week+Week'),
						'-'.$sort_prefix.'14-'. $column_name_prefix .'date_dow_month'			=> $column_name.' - '. TTi18n::getText('Day of Week+Month'),
						'-'.$sort_prefix.'16-'. $column_name_prefix .'date_dow_month_year'		=> $column_name.' - '. TTi18n::getText('Day of Week+Month+Year'),
						'-'.$sort_prefix.'18-'. $column_name_prefix .'date_dow_dom_month_year'	=> $column_name.' - '. TTi18n::getText('Day of Week+Day Of Month+Year'),

						'-'.$sort_prefix.'20-'. $column_name_prefix .'date_week'				=> $column_name.' - '. TTi18n::getText('Week'),
						'-'.$sort_prefix.'22-'. $column_name_prefix .'date_week_month'			=> $column_name.' - '. TTi18n::getText('Week+Month'),
						'-'.$sort_prefix.'24-'. $column_name_prefix .'date_week_month_year'		=> $column_name.' - '. TTi18n::getText('Week+Month+Year'),
						'-'.$sort_prefix.'25-'. $column_name_prefix .'date_week_start'			=> $column_name.' - '. TTi18n::getText('Week (Starting)'),
						'-'.$sort_prefix.'26-'. $column_name_prefix .'date_week_end'			=> $column_name.' - '. TTi18n::getText('Week (Ending)'),

						'-'.$sort_prefix.'30-'. $column_name_prefix .'date_dom'					=> $column_name.' - '. TTi18n::getText('Day of Month'),
						'-'.$sort_prefix.'32-'. $column_name_prefix .'date_dom_month'			=> $column_name.' - '. TTi18n::getText('Day of Month+Month'),
						'-'.$sort_prefix.'34-'. $column_name_prefix .'date_dom_month_year'		=> $column_name.' - '. TTi18n::getText('Day of Month+Month+Year'),

						'-'.$sort_prefix.'40-'. $column_name_prefix .'date_month'				=> $column_name.' - '. TTi18n::getText('Month'),
						'-'.$sort_prefix.'42-'. $column_name_prefix .'date_month_year'			=> $column_name.' - '. TTi18n::getText('Month+Year'),
						'-'.$sort_prefix.'43-'. $column_name_prefix .'date_month_start'			=> $column_name.' - '. TTi18n::getText('Month (Starting)'),
						'-'.$sort_prefix.'44-'. $column_name_prefix .'date_month_end'			=> $column_name.' - '. TTi18n::getText('Month (Ending)'),

						'-'.$sort_prefix.'50-'. $column_name_prefix .'date_quarter'				=> $column_name.' - '. TTi18n::getText('Quarter'),
						'-'.$sort_prefix.'52-'. $column_name_prefix .'date_quarter_year'		=> $column_name.' - '. TTi18n::getText('Quarter+Year'),
						'-'.$sort_prefix.'53-'. $column_name_prefix .'date_quarter_start'		=> $column_name.' - '. TTi18n::getText('Quarter (Starting)'),
						'-'.$sort_prefix.'54-'. $column_name_prefix .'date_quarter_end'			=> $column_name.' - '. TTi18n::getText('Quarter (Ending)'),

						'-'.$sort_prefix.'60-'. $column_name_prefix .'date_year'				=> $column_name.' - '. TTi18n::getText('Year'),
						'-'.$sort_prefix.'61-'. $column_name_prefix .'date_year_start'				=> $column_name.' - '. TTi18n::getText('Year (Starting)'),
						'-'.$sort_prefix.'62-'. $column_name_prefix .'date_year_end'				=> $column_name.' - '. TTi18n::getText('Year (Ending)'),
					);

		if ( $include_pay_period == TRUE ) {
			//Don't use the $column_name on these, as there is only one type of pay period columns.
			$pay_period_arr = array(
						'-'.$sort_prefix.'70-'. $column_name_prefix .'pay_period'				=> TTi18n::getText('Pay Period'),
						'-'.$sort_prefix.'71-'. $column_name_prefix .'pay_period_start_date'	=> TTi18n::getText('Pay Period - Start Date'),
						'-'.$sort_prefix.'72-'. $column_name_prefix .'pay_period_end_date'		=> TTi18n::getText('Pay Period - End Date'),
						'-'.$sort_prefix.'73-'. $column_name_prefix .'pay_period_transaction_date' => TTi18n::getText('Pay Period - Transaction Date'),
					);
			$retarr = array_merge( $retarr, $pay_period_arr );
		}

		return $retarr;
	}

	/**
	 * @param $column
	 * @param int $epoch EPOCH
	 * @param bool $post_processing
	 * @param object $user_obj
	 * @param null $params
	 * @return array|bool|false|null|string
	 */
	public static function getReportDates( $column, $epoch = NULL, $post_processing = TRUE, $user_obj = NULL, $params = NULL, $display_columns = NULL ) {
		//Make sure if epoch is actually NULL that we return a blank array and not todays date.
		//This is import for things like termination dates that may be NULL when not set.
		if ( $epoch === NULL ) {
			return array();
		}

		$column = Misc::trimSortPrefix( $column );

		//Trim off a column_name_prefix, or everything before the "-". Technically we return everything after the '-'
		$column_delimiter = strpos( $column, '-' );
		if ( $column_delimiter !== FALSE ) {
			$column = substr( $column, ( $column_delimiter + 1 ) );
		}

		//Don't use todays date, as that can cause a lot of confusion in reports, especially when displaying time not assigned to a pay period
		//and the pay period dates all show today. Just leave blank.
		//if ($epoch == NULL OR $epoch == '' ) { //Epoch can be a string sometimes.
		//	$epoch = self::getTime();
		//}

		if ( $post_processing == TRUE ) {
			$split_epoch = explode('-', $epoch);

			//Human friendly display, NOT for sorting.
			switch( $column ) {
				case 'pay_period_start_date':
				case 'pay_period_end_date':
				case 'pay_period_transaction_date':
					$retval = TTDate::getDate( 'DATE', $epoch );
					break;
				case 'date_stamp':
				case 'date_week_start':
				case 'date_week_end':
				case 'date_month_start':
				case 'date_month_end':
				case 'date_quarter_start':
				case 'date_quarter_end':
				case 'date_year_start':
				case 'date_year_end':
					$epoch = is_numeric( $epoch ) ? $epoch : strtotime($epoch);
					$retval = TTDate::getDate( 'DATE', $epoch );
					break;
				case 'time_stamp':
					$retval = TTDate::getDate( 'TIME', is_numeric( $epoch ) ? $epoch : strtotime($epoch) );
					break;
				case 'hour_of_day':
					$retval = TTDate::getDate( 'TIME', is_numeric( $epoch ) ? TTDate::roundTime($epoch, 3600, 10 ) : TTDate::roundTime( strtotime($epoch), 3600, 10 ) ); //Round down to the nearest hour.
					break;
				case 'date_time_stamp':
					$retval = TTDate::getDate( 'DATE+TIME', is_numeric( $epoch ) ? $epoch : strtotime($epoch) );
					break;
				case 'date_dow':
					$retval = TTDate::getDayOfWeekName( $epoch );
					break;
				case 'date_dow_week':
					$retval = TTDate::getDayOfWeekName( $split_epoch[1] ).' '.$split_epoch[0];
					break;
				case 'date_dow_month':
					$retval = TTDate::getDayOfWeekName( $split_epoch[1] ).'-'.TTDate::getMonthName( $split_epoch[0] );
					break;
				case 'date_dow_month_year':
					$retval = TTDate::getDayOfWeekName( $split_epoch[2] ).'-'.TTDate::getMonthName( $split_epoch[1] ).'-'.$split_epoch[0];
					break;
				case 'date_dow_dom_month_year':
					$retval = TTDate::getDayOfWeekName( $split_epoch[2] ).' '. $split_epoch[1] .'-'.TTDate::getMonthName( $split_epoch[1] ).'-'.$split_epoch[0];
					break;
				case 'date_week':
					$retval = $epoch;
					break;
				case 'date_week_month':
					$retval = $split_epoch[3].' '.TTDate::getMonthName( $split_epoch[1] );
					break;
				case 'date_week_month_year':
					$retval = $split_epoch[3].' '.TTDate::getMonthName( $split_epoch[1] ).'-'.$split_epoch[0];
					break;
				case 'date_dom':
					$retval = $epoch;
					break;
				case 'date_dom_month':
					$retval = $split_epoch[1].'-'.TTDate::getMonthName( $split_epoch[0] );
					break;
				case 'date_dom_month_year':
					$retval = $split_epoch[2].'-'.TTDate::getMonthName( $split_epoch[1], TRUE ).'-'.$split_epoch[0];
					break;
				case 'date_month':
					$retval = TTDate::getMonthName( $epoch );
					break;
				case 'date_month_year':
					$retval = TTDate::getMonthName( $split_epoch[1] ).'-'.$split_epoch[0];
					break;
				case 'date_quarter':
					$retval = $epoch;
					break;
				case 'date_quarter_year':
					$retval = $split_epoch[1].'-'.$split_epoch[0];
					break;
				case 'date_year':
					$retval = $epoch;
					break;
				case 'pay_period':
					$retval = $params;
					break;
				default:
					Debug::text('Date Column does not match!: '. $column, __FILE__, __LINE__, __METHOD__, 10);
					break;
			}
			//Debug::text('Column: '. $column .' Input: '. $epoch .' Retval: '. $retval, __FILE__, __LINE__, __METHOD__, 10);
		} else {
			//Return data for *all* columns at once.
			if ($epoch == NULL OR $epoch == '' OR !is_numeric($epoch) ) { //Epoch must be numeric
				$epoch = self::getTime();
			}

			$column_prefix = NULL;
			if ( $column != '' ) {
				$column_prefix = $column.'-';
			}

			$report_date_columns = array(
					$column_prefix . 'pay_period_start_date',
					$column_prefix . 'pay_period_end_date',
					$column_prefix . 'pay_period_transaction_date',
					$column_prefix . 'date_stamp',
					$column_prefix . 'date_week_start',
					$column_prefix . 'date_week_end',
					$column_prefix . 'date_month_start',
					$column_prefix . 'date_month_end',
					$column_prefix . 'date_quarter_start',
					$column_prefix . 'date_quarter_end',
					$column_prefix . 'date_year_start',
					$column_prefix . 'date_year_end',
					$column_prefix . 'time_stamp',
					$column_prefix . 'hour_of_day',
					$column_prefix . 'date_time_stamp',
					$column_prefix . 'date_dow',
					$column_prefix . 'date_dow_week',
					$column_prefix . 'date_dow_month',
					$column_prefix . 'date_dow_month_year',
					$column_prefix . 'date_dow_dom_month_year',
					$column_prefix . 'date_week',
					$column_prefix . 'date_week_month',
					$column_prefix . 'date_week_month_year',
					$column_prefix . 'date_dom',
					$column_prefix . 'date_dom_month',
					$column_prefix . 'date_dom_month_year',
					$column_prefix . 'date_month',
					$column_prefix . 'date_month_year',
					$column_prefix . 'date_quarter',
					$column_prefix . 'date_quarter_year',
					$column_prefix . 'date_year',
					$column_prefix . 'pay_period',
			);

			if ( $display_columns != '' ) {
				$display_columns = array_intersect( $report_date_columns, $display_columns );
			} else {
				$display_columns = $report_date_columns;
			}

			$retval = array();

			if ( is_array( $display_columns ) AND count( $display_columns ) > 0 ) {
				$start_week_day = 0;
				if ( is_object( $user_obj ) ) {
					$user_prefs = $user_obj->getUserPreferenceObject();
					if ( is_object($user_prefs) ) {
						$start_week_day = $user_prefs->getStartWeekDay();
					}
				}

				foreach ( $display_columns as $display_column ) {
					$display_column_delimiter = strpos( $display_column, '-' );
					if ( $display_column_delimiter !== FALSE ) {
						$display_column = substr( $display_column, ( $display_column_delimiter + 1 ) );
					}

					switch ( $display_column ) {
						case 'date_stamp':
							$retval[ $column_prefix . 'date_stamp' ] = date( 'Y-m-d', $epoch );
							break;
						case 'time_stamp':
							$retval[ $column_prefix . 'time_stamp' ] = $epoch;
							break;
						case 'hour_of_day':
							$retval[ $column_prefix . 'hour_of_day' ] = TTDate::roundTime( $epoch, 3600, 10 );
							break;
						case 'date_time_stamp':
							$retval[ $column_prefix . 'date_time_stamp' ] = $epoch;
							break;
						case 'date_dow':
							$retval[ $column_prefix . 'date_dow' ] = date( 'w', $epoch );
							break;
						case 'date_dow_week':
							$retval[ $column_prefix . 'date_dow_week' ] = date( 'W-w', $epoch );
							break;
						case 'date_dow_month':
							$retval[ $column_prefix . 'date_dow_month' ] = date( 'm-w', $epoch );
							break;
						case 'date_dow_month_year':
							$retval[ $column_prefix . 'date_dow_month_year' ] = date( 'Y-m-w', $epoch );
							break;
						case 'date_dow_dom_month_year':
							$retval[ $column_prefix . 'date_dow_dom_month_year' ] = date( 'Y-m-w-W', $epoch );
							break;
						case 'date_week':
							$retval[ $column_prefix . 'date_week' ] = self::getWeek( $epoch, $start_week_day );
							break;
						case 'date_week_month':
							$retval[ $column_prefix . 'date_week_month' ] = date( 'Y-m-d-W', TTDate::getBeginWeekEpoch( $epoch, $start_week_day ) ); //Need to have day in here so sorting is done properly.
							break;
						case 'date_week_month_year':
							$retval[ $column_prefix . 'date_week_month_year' ] = date( 'Y-m-d-W', TTDate::getBeginWeekEpoch( $epoch, $start_week_day ) ); //Need to have day in here so sorting is done properly.
							break;
						case 'date_week_start':
							$retval[ $column_prefix . 'date_week_start' ] = date( 'Y-m-d', TTDate::getBeginWeekEpoch( $epoch, $start_week_day ) );
							break;
						case 'date_week_end':
							$retval[ $column_prefix . 'date_week_end' ] = date( 'Y-m-d', TTDate::getEndWeekEpoch( $epoch, $start_week_day ) );
							break;
						case 'date_dom':
							$retval[ $column_prefix . 'date_dom' ] = date( 'd', $epoch );
							break;
						case 'date_dom_month':
							$retval[ $column_prefix . 'date_dom_month' ] = date( 'm-d', $epoch );
							break;
						case 'date_dom_month_year':
							$retval[ $column_prefix . 'date_dom_month_year' ] = date( 'Y-m-d', $epoch );
							break;
						case 'date_month':
							$retval[ $column_prefix . 'date_month' ] = date( 'm', $epoch );
							break;
						case 'date_month_year':
							$retval[ $column_prefix . 'date_month_year' ] = date( 'Y-m', $epoch );
							break;
						case 'date_month_start':
							$retval[ $column_prefix . 'date_month_start' ] = date( 'Y-m-d', TTDate::getBeginMonthEpoch( $epoch ) );
							break;
						case 'date_month_end':
							$retval[ $column_prefix . 'date_month_end' ] = date( 'Y-m-d', TTDate::getEndMonthEpoch( $epoch ) );
							break;
						case 'date_quarter':
							$retval[ $column_prefix . 'date_quarter' ] = TTDate::getYearQuarter( $epoch );
							break;
						case 'date_quarter_year':
							$retval[ $column_prefix . 'date_quarter_year' ] = date( 'Y', $epoch ) . '-' . TTDate::getYearQuarter( $epoch );
							break;
						case 'date_quarter_start':
							$retval[ $column_prefix . 'date_quarter_start' ] = date( 'Y-m-d', TTDate::getBeginQuarterEpoch( $epoch ) );
							break;
						case 'date_quarter_end':
							$retval[ $column_prefix . 'date_quarter_end' ] = date( 'Y-m-d', TTDate::getEndQuarterEpoch( $epoch ) );
							break;
						case 'date_year':
							$retval[ $column_prefix . 'date_year' ] = TTDate::getYear( $epoch );
							break;
						case 'date_year_start':
							$retval[ $column_prefix . 'date_year_start' ] = date( 'Y-m-d', TTDate::getBeginYearEpoch( $epoch ) );
							break;
						case 'date_year_end':
							$retval[ $column_prefix . 'date_year_end' ] = date( 'Y-m-d', TTDate::getEndYearEpoch( $epoch ) );
							break;

						//Only display these dates if they are passed in separately in the $param array.
						case 'pay_period':
							if ( isset( $params['pay_period_start_date'] ) AND $params['pay_period_start_date'] != '' AND isset( $params['pay_period_end_date'] ) AND $params['pay_period_end_date'] != '' ) {
								$retval[ $column_prefix . 'pay_period' ] = array('sort' => $params['pay_period_start_date'], 'display' => TTDate::getDate( 'DATE', $params['pay_period_start_date'] ) . ' -> ' . TTDate::getDate( 'DATE', $params['pay_period_end_date'] ));
							}
							break;
						case 'pay_period_start_date':
							if ( isset( $params['pay_period_start_date'] ) AND $params['pay_period_start_date'] != '' ) {
								$retval[ $column_prefix . 'pay_period_start_date' ] = $params['pay_period_start_date'];
							}

							break;
						case 'pay_period_end_date':
							if ( isset( $params['pay_period_end_date'] ) AND $params['pay_period_end_date'] != '' ) {
								$retval[ $column_prefix . 'pay_period_end_date' ] = $params['pay_period_end_date'];
							}
							break;
						case 'pay_period_transaction_date':
							if ( isset( $params['pay_period_transaction_date'] ) AND $params['pay_period_transaction_date'] != '' ) {
								$retval[ $column_prefix . 'pay_period_transaction_date' ] = $params['pay_period_transaction_date'];
							}
							break;
					}
				}
			}
		}

		if ( isset( $retval ) ) {
			return $retval;
		}

		return FALSE;
	}

	/**
	 * @param $time
	 * @return string
	 */
	public static function getISO8601Duration( $time) {
		$units = array(
			'Y' => ( 365 * 24 * 3600 ),
			'D' => ( 24 * 3600 ),
			'H' => 3600,
			'M' => 60,
			'S' => 1,
		);

		$str = 'P';
		$istime = FALSE;

		foreach ($units as $unitName => &$unit) {
			$quot  = intval($time / $unit);
			$time -= ( $quot * $unit );
			$unit  = $quot;
			if ($unit > 0) {
				if (!$istime AND in_array($unitName, array('H', 'M', 'S'))) { // There may be a better way to do this
					$str .= 'T';
					$istime = TRUE;
				}
				$str .= strval($unit) . $unitName;
			}
		}

		return $str;
	}

	/**
	 * @param int $frequency_id
	 * @param int $start_date EPOCH
	 * @param int $end_date EPOCH
	 * @param array $frequency_criteria
	 * @return bool
	 */
	static function inApplyFrequencyWindow( $frequency_id, $start_date, $end_date, $frequency_criteria = array() ) {
		/*
		Frequency IDs:
												20 => 'Annually',
												25 => 'Quarterly',
												30 => 'Monthly',
												40 => 'Weekly',
												100 => 'Specific Date', //Pay Period Dates, Hire Dates, Termination Dates, etc...

		 */

		if ( !isset($frequency_criteria['month']) ) {
			$frequency_criteria['month'] = 0;
		}
		if ( !isset($frequency_criteria['day_of_month']) ) {
			$frequency_criteria['day_of_month'] = 0;
		}
		if ( !isset($frequency_criteria['day_of_week']) ) {
			$frequency_criteria['day_of_week'] = 0;
		}
		if ( !isset($frequency_criteria['quarter_month']) ) {
			$frequency_criteria['quarter_month'] = 0;
		}
		if ( !isset($frequency_criteria['date']) ) {
			$frequency_criteria['date'] = 0;
		}

		//Debug::Arr($frequency_criteria, 'Freq ID: '. $frequency_id .' Date: Start: '. TTDate::getDate('DATE+TIME', $start_date) .'('.$start_date.') End: '. TTDate::getDate('DATE+TIME', $end_date) .'('.$end_date.')', __FILE__, __LINE__, __METHOD__, 10);
		$retval = FALSE;
		switch ( $frequency_id ) {
			case 20: //Annually
				$year_epoch1 = mktime( TTDate::getHour($start_date), TTDate::getMinute($start_date), TTDate::getSecond($start_date), $frequency_criteria['month'], $frequency_criteria['day_of_month'], TTDate::getYear( $start_date ) );
				$year_epoch2 = mktime( TTDate::getHour($end_date), TTDate::getMinute($end_date), TTDate::getSecond($end_date), $frequency_criteria['month'], $frequency_criteria['day_of_month'], TTDate::getYear( $end_date ) );
				//Debug::Text('Year1 EPOCH: '. TTDate::getDate('DATE+TIME', $year_epoch1) .'('. $year_epoch1 .')', __FILE__, __LINE__, __METHOD__, 10);
				//Debug::Text('Year2 EPOCH: '. TTDate::getDate('DATE+TIME', $year_epoch2) .'('. $year_epoch2 .')', __FILE__, __LINE__, __METHOD__, 10);

				if (	( $year_epoch1 >= $start_date AND $year_epoch1 <= $end_date)
						OR
						( $year_epoch2 >= $start_date AND $year_epoch2 <= $end_date)
						) {
					$retval = TRUE;
				}
				break;
			case 25: //Quarterly
				//Handle quarterly like month, we just need to set the specific month from quarter_month.
				if ( abs($end_date - $start_date) > (86400 * 93) ) { //3 months
					$retval = TRUE;
				} else {
					for( $i = TTDate::getMiddleDayEpoch($start_date); $i <= TTDate::getMiddleDayEpoch($end_date); $i += (86400 * 1) ) {
						if ( self::getYearQuarterMonthNumber( $i ) == $frequency_criteria['quarter_month']
								AND $frequency_criteria['day_of_month'] == self::getDayOfMonth( $i ) ) {
							$retval = TRUE;
							break;
						}
					}
				}
				break;
			case 30: //Monthly
				//Make sure if they specify the day of month to be 31, that is still works for months with 30, or 28-29 days, assuming 31 basically means the last day of the month
				if ( $frequency_criteria['day_of_month'] > TTDate::getDaysInMonth( $start_date )
						OR $frequency_criteria['day_of_month'] > TTDate::getDaysInMonth( $end_date ) ) {
					$frequency_criteria['day_of_month'] = TTDate::getDaysInMonth( $start_date );
					if ( TTDate::getDaysInMonth( $end_date ) < $frequency_criteria['day_of_month'] ) {
						$frequency_criteria['day_of_month'] = TTDate::getDaysInMonth( $end_date );
					}
					//Debug::Text('Apply frequency day of month exceeds days in this month, using last day of the month instead: '. $frequency_criteria['day_of_month'], __FILE__, __LINE__, __METHOD__, 10);
				}

				$month_epoch1 = mktime( TTDate::getHour($start_date), TTDate::getMinute($start_date), TTDate::getSecond($start_date), TTDate::getMonth( $start_date ), $frequency_criteria['day_of_month'], TTDate::getYear( $start_date ) );
				$month_epoch2 = mktime( TTDate::getHour($end_date), TTDate::getMinute($end_date), TTDate::getSecond($end_date), TTDate::getMonth( $end_date ), $frequency_criteria['day_of_month'], TTDate::getYear( $end_date ) );
				//Debug::Text('Day of Month: '. $frequency_criteria['day_of_month'] .' Month EPOCH: '. TTDate::getDate('DATE+TIME', $month_epoch1) .' Current Month: '. TTDate::getMonth( $start_date ), __FILE__, __LINE__, __METHOD__, 10);
				//Debug::Text('Month1 EPOCH: '. TTDate::getDate('DATE+TIME', $month_epoch1) .'('. $month_epoch1 .') Greater Than: '. TTDate::getDate('DATE+TIME', ($start_date)) .' Less Than: '.  TTDate::getDate('DATE+TIME', $end_date) .'('. $end_date .')', __FILE__, __LINE__, __METHOD__, 10);
				//Debug::Text('Month2 EPOCH: '. TTDate::getDate('DATE+TIME', $month_epoch2) .'('. $month_epoch2 .') Greater Than: '. TTDate::getDate('DATE+TIME', ($start_date)) .' Less Than: '.  TTDate::getDate('DATE+TIME', $end_date) .'('. $end_date .')', __FILE__, __LINE__, __METHOD__, 10);

				if (	( $month_epoch1 >= $start_date AND $month_epoch1 <= $end_date )
						OR
						( $month_epoch2 >= $start_date AND $month_epoch2 <= $end_date )
						) {
					$retval = TRUE;
				}
				break;
			case 40: //Weekly
				$start_dow = self::getDayOfWeek( $start_date );
				$end_dow = self::getDayOfWeek( $end_date );

				if ( $start_dow == $frequency_criteria['day_of_week']
						OR $end_dow == $frequency_criteria['day_of_week']
						) {
					$retval = TRUE;
				} else {
					if ( ($end_date - $start_date) > (86400 * 7) ) {
						$retval = TRUE;
					} else {
						//for( $i = TTDate::getMiddleDayEpoch($start_date); $i <= TTDate::getMiddleDayEpoch($end_date); $i += 86400 ) {
						foreach( TTDate::getDatePeriod( TTDate::getMiddleDayEpoch($start_date), TTDate::getMiddleDayEpoch($end_date), 'P1D' ) as $i ) {
							if ( self::getDayOfWeek($i) == $frequency_criteria['day_of_week'] ) {
								$retval = TRUE;
								break;
							}
						}
					}
				}
				break;
			case 100: //Specific date
				Debug::Text('Specific Date: '. TTDate::getDate('DATE+TIME', $frequency_criteria['date']), __FILE__, __LINE__, __METHOD__, 10);
				if ( $frequency_criteria['date'] >= $start_date AND $frequency_criteria['date'] <= $end_date ) {
					$retval = TRUE;
				}
				break;
		}

		Debug::Text('Retval '. (int)$retval, __FILE__, __LINE__, __METHOD__, 10);
		return $retval;
	}
}
?>
