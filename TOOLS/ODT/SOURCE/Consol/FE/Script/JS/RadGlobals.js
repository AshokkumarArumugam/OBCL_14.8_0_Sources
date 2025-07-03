/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadGlobals.js
  **
  ** 
  ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  ** 
  ** 
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  ** 
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
*/
var newwin = "";
var logMsg = "";
var errLogMsg = ""
var amterrLogMsg = ""  //amount field validations
var errType = "";
var addUIFieldsWin = "";
var latestvalue = "";
var dom = "";
var fileSavePath = "";
var schemaName = "";
var UIFlag = "";
var selected = "";
var DeletFlag = "";
var Deleted = "false";
var clickedobj = "";
var PreNode = "";
var previousNode = "";
var CurrNode = "";
var Preobjec = "";
var scrlen = "";
var undo = "";
var pkcols = "";
var pkcolsDataType = "";
var releaseType = "";
var releaseName = "";
var searchedValue = "";
var gcNAV_FIRST = 0;
var gcNAV_PREVIOUS = 1;
var gcNAV_GOTO = 2;
var gcNAV_NEXT = 3;
var gcNAV_LAST = 4;
var gcNUM_NAV_BUTTONS = 5;
var gcQueryRowDelim = "|";
var gcQueryColDelim = "~";
var gcQueryTokenDelim = ":";
var gcFNTokenDelim = "~";
var gcFVTokenDelim = "~";
var gXML_OR_DB = "DB";
var gIsDB = "XML";
var l_LBL_XMLDOM = null;
var workDOM = "";
var consolDOM = "";
var funcId = "";
var funcTyp = "";
var changeUIonly = "";
var jspath = "";
var xmlpath = "";
var fileManagerURL = ""
var g_DDLtableName = "";
var ddlbatchRefNo = '';
var renameFlg = "";
var reNamepath = "";
var actVal = "";
var showLogmessage = "";
var parentcalFrmArgs = "";
var parentscrArg = "";
var parentcalFrmName = "";
var parentlcfrm = "";
var logScreen = "F";
var uixmlPreview = "";
var previewscreenType = "";
var previewfldloc = "";
var previewfieldid = "";
var globalLovs = "";
var bulkgenflag='N';  //amount field validation shihab 
var amountValFlag=false;  //amount field validation shihab 
var consoldom = "";
consoldom.async = false;
consoldom.resolveExternals = false;
consoldom = "<?xml version='1.0' encoding='UTF-8'?>";
consoldom = loadXMLDoc(consoldom);
var funcdom = "";
funcdom.async = false;
funcdom.resolveExternals = false;
funcdom = "<?xml version='1.0' encoding='UTF-8'?>";
funcdom = loadXMLDoc(funcdom);

var basedom = "";
basedom.async = false;
basedom.resolveExternals = false;
basedom = "<?xml version='1.0' encoding='UTF-8'?>";
basedom = loadXMLDoc(basedom);
var giInterFace = false;
var purgeFilter = false;
var clickedobjects = new Array();
var elementArray_Actions = new Array();

elementArray_Actions['RAD_ACTIONS'] = "RAD_XSD_TYPE_NAME~OPERATION_ID~SERVICE_NAME~XSD_MODULE_FOLDER~REST_ENABLED~REST_MICRO_ENABLED~REST_SERVICE_NAME~REST_CACHE_ENABLED"; // Bug#33914847 
elementArray_Actions['RAD_ACTION']="ACTION_CODE~OPERATION_CODE~WEBSERVICE_APPLICABLE~ACTION_STAGE_TYPE~FSREQ_CMT_ID~IOREQ_CMT_ID~FSRES_CMT_ID~PKRES_CMT_ID~REST_OPERATION_ENABLED";
var elementArray_Summary = new Array();
elementArray_Summary['RAD_SUMMARY'] = "TITLE~RAD_SUMMARY_WHERECLAUSE~RSLT_DATABLK~RSLT_DATASRC~SUMMARY_TYPE~RAD_SUMMARY_ORDERBY~RAD_MULTIBRN_WHERECLAUSE~MAIN_SUMM_SCR~SUM_SCREEN_SIZE~SUMMARY_WEBSERVICE_REQD~SUM_QUERYORDER~SUM_RESULTORDER~BLIND_SEARCH~DETAIL_REQ~BUTTONS_PER_ROW~NUMBER_OF_ROWS";//26329098
elementArray_Summary['SUMMARY_DETAILS'] = "FIELD_NAME~QUERY~LOV_NAME~DASHBD_LINK~MIN_CHAR_LEN~RETURN_FLDS~BIND_FLDS";
elementArray_Summary['CRITERIA_SEARCH'] = "CRITERIA_NAME~CRITERIA_VALUE";
elementArray_Summary['CUSTOM_BUTTONS_DETAILS'] = "FIELD_NAME~FIELD_LABEL~FUNCTION_NAME";
var elementArray = new Array();
elementArray['RAD_REST_ACTIONS'] = "REST_SERVICE_NAME";
elementArray['RAD_REST_ACTION'] = "REST_OPERATION_CODE~REST_REQ_INPUT~REST_RES_OUTPUT~REST_CALLFORM";

elementArray['RAD_FIELDS'] = "COLUMN_NAME~DATATYPE~MAX_LENGTH~BLOCK_NAME~RELEASE_TYPE~RELEASE_NAME~FIELD_NAME~NOT_REQD_IN_UPLOAD_PKGS~UPLD_TABLE_COLUMN~MAX_DECIMALS";
elementArray['RAD_DATASOURCES'] = "DATASRC_NAME~DATASRC_ALIAS~PARENT_DATASRC~RELATION_WITH_PARENT~RELATION_TYPE~DEFAULT_WHERE~IS_MANDATORY~MULTI_RECORD~MASTER_DATASRC~PK_COLS~PK_TYPES~DEFAULT_ORDER_BY~DATASRC_TYPE~CHILD_DATASRC~RELEASE_TYPE~RELEASE_NAME~UPLOAD_TABLE~UP_TBL_PK_COLS~UP_TBL_WHERE_CLAUSE~REST_BLK_NAME~REST_RELATION_TYPE~REST_PK_COLS~REST_PK_TYPES~REST_RELATION_WITH_PARENT~REST_XSD_NODE";
elementArray['RAD_SCREENS'] = "SCREEN_NAME~SCREEN_TITLE~SCREEN_POSITION~EXIT_BUTTON_TYPE~MAIN_SCREEN~SCREEN_SIZE~RELEASE_TYPE~RELEASE_NAME~SCREEN_VISIBLE~SCREEN_OBIEE~SCREEN_QUERYREQ~IMGFLD_QUERYREQ";
elementArray['SCREEN_ARGS'] = "SCREEN_ARG_NAME~SRC_BLK~SRC_FLD~SCR_VAL~TRG_BLK~TRG_FLD~RELEASE_TYPE~RELEASE_NAME~ACTIVE";
elementArray['RAD_TABS'] = "TAB_NAME~SCREEN_NAME~TAB_LABEL~RELEASE_TYPE~RELEASE_NAME~DEPENDENT_ON~TAB_TYPE~TAB_VISIBLE~TAB_ORDER";
elementArray['RAD_SECTIONS'] = "SECTION_NAME~SCREEN_PORTION~TAB_NAME~RELEASE_TYPE~RELEASE_NAME~SEC_VISIBLE~SEC_ORDER~COLLAPSE~SECTION_LBL~MULTIPLE_SEC";
elementArray['RAD_DATA_BLOCKS'] = "BLOCK_NAME~BLOCK_TITLE~MASTER_BLOCK~VIEW_TYPE~MULTI_RECORD~BLOCK_PARENT~XSD_NODE~RELATION_TYPE~BLOCK_TYPE~RELEASE_TYPE~RELEASE_NAME~NEW_ALLOWED_IN~DELETE_ALLOWED_IN~ALL_RECORDS~MANDATORY_IN~BLK_PK_FLD~DATA_BLK_ORDER~BLK_COMMENT_ID";
//VINIT
elementArray['RAD_BLK_FIELDS'] = "FIELD_NAME~FIELD_SIZE~DATATYPE~MAX_LENGTH~REQUIRED~DISPLAY_TYPE~CLASSID~LABEL_CODE~DEFAULT_VALUE~RELATED_BLOCK~RELATED_FIELD~PARENT_FIELD~LOV_NAME~GLOBAL_LOV_NAME~OFF_LINE_LOV_NAME~GLOBAL_OFF_LINE_LOV_NAME~POPEDIT_REQUIRED~INPUT_ONLY_BY_LOV~XSD_TAG~DBT~DBC~FIELDSET_NAME~READ_ONLY~CALENDAR_TEXT~SUBSYSTEM_DEPENDANT~MIN_VAL~MAX_VAL~MAX_DECIMALS~CHECKED~TXTAREA_ROWS~ITEM_TYPE~VISIBLE~CHK_UPPERCASE~TXTAREA_COLS~AMENDABLE_IN~RELEASE_TYPE~RELEASE_NAME~NOT_REQD_IN_XSD~LOV_VAL_REQ~PREVIEW_VALUE~MASK_ID~BLK_FIELD_ORDER~REPORT_PARAMETER~XSD_ANNOTATION~FORMAT_REQD~HOTKEYREQ~FOCUSREQ~EXACT_FETCH~HOTKEYREQJA~FLD_COMMENT_ID~CHK_TRIM";
elementArray['RAD_PARTITIONS'] = "PARTITION_SL_NO~PARTITION_NAME~PARTITION_WIDTH~NO_OF_SUBPARTITIONS~RELEASE_TYPE~RELEASE_NAME";
elementArray['RAD_FIELDSETS'] = "FIELDSET_NAME~FIELDSET_SCREEN~FIELDSET_PORTION~FIELDSET_BLOCK~FIELDSET_TAB~FIELDSET_SECTION~FIELDSET_PARTITION~VIEW_TYPE~HORIZONTAL_FIELDSET~MULTI_RECORD~FIELDSET_LABEL~NAV_BUTTONS_REQ~FIELDSET_HEIGHT~FIELDSET_WIDTH~RELEASE_TYPE~RELEASE_NAME~ROWS_PER_PAGE~FIELDSET_VISIBLE~FIELDSET_ORDER~FIELDSET_READ_ONLY~FIELDSET_TYPE~NAV_BTN_FULL_WIDTH";
elementArray['RAD_LOVS'] = "LOV_NAME~LOV_QUERY~RELEASE_NAME~RELEASE_TYPE~LOV_STATUS~EXTERNAL_LOV_NAME~LOV_FUNC_NAME~COMBINED_QUERY_DTLS~COMBINED_DTLS~NO_DATA_FRM_EXT_SYS_PREF~LOV_ID_OTHER";
elementArray['RAD_MAIN'] = "FUNCTION_ID~FUNCTION_TYPE~FUNCTION_CATEGORY~HEADER_TEMPLATE~FOOTER_TEMPLATE~PARENT_FUNC_ID~FUNCTION_ORIGIN~RELEASE_TYPE~CALL_FORM_TYPE~PARENT_ORIGIN~LANG_CODE~OPERATION~ORIGINATION_DATE~USER_ID~RELEASE_CODE~MODIFIED_IN_KERNEL~MODIFIED_IN_CLUSTER~MODIFIED_IN_CUSTOM~MODIFIED_IN_CUSTOMER~PARENT_MODIFIED_IN_KERNEL~PARENT_MODIFIED_IN_CLUSTER~PARENT_MODIFIED_IN_CUSTOM~PARENT_MODIFIED_IN_CUSTOMER~TEMP_CORRECTION_DONE~ORDER_CORRECTION_DONE~XSD_COMMENTS_DEFAULT";
elementArray['RAD_FIELD_EVENTS'] = "EVENT_NAME~FUNCTION_NAME~EVENTTYPE~BUTTON_SCREEN~SCREEN_NAME~CALLFORM_NAME";
elementArray['RAD_AMOUNT_FIELDS'] = "C_BLK_NAME~C_FLD_NAME~INOUT";
elementArray['RAD_PATTERN_FIELDS'] = "P_BLK_NAME~P_FLD_NAME~P_FLD_DESC";
elementArray['RAD_FIELD_CUSTOM_ATTRS'] = "ATTR_NAME~ATTR_VALUE~RELEASE_NAME~RELEASE_TYPE~ACTIVE~ATTR_POSITION";
elementArray['RAD_FIELD_DASHBD_LINK'] = "LEVEL~LINK_TYPE~LINKED";
elementArray['RAD_BIND_VARS'] = "BIND_VAR_NAME~BIND_VAR_TYPE~BIND_VAR_BLK";
elementArray['RAD_CALLFORM'] = "CALLFORM_FUCNTIONID~CALLFORM_RELATION_TYPE~CALLFORM_RELATION~CALLFORM_PARENT_DATASRC~CALLFORM_PARENT_BLOCK~CHILD_CALLFORM~CALLFORM_DISPLAY_TYPE~RELEASE_TYPE~RELEASE_NAME~SCREEN_ARGS~DEPENDENT_ON~CALLFORM_MST_DATA_SRC~CALLFORM_MST_BLOCK~CALLFORM_MST_XSD_NODE~CALLFORM_XSD_TYPE_DESC~CALLFORM_MST_MULTI_REC~CALLFORM_MODULE~CALLFORM_ACTIVE~IS_UPLOAD_TABLE_PRESENT~REST_RELATION_WITH_PARENT";
elementArray['RAD_LAUNCHFORM'] = "LAUNCHFORM_FUCNTIONID~RELEASE_TYPE~RELEASE_NAME~SCREEN_ARGS~LAUNCHFORM_ACTIVE~FORM_TYPE"; 
//VINIT
elementArray['RAD_LOV_DETAILS'] = "QUERY_COLS~DATATYPE~VISIBLE~REDN_FLD_TYPE~COL_HEADING~REDN_FLD_FLAG~IS_INDEXED~MIN_SEARCH_CHAR_LEN";
elementArray['RAD_ACTION'] = "ACTION_CODE~OPERATION_CODE~WEBSERVICE_APPLICABLE~ACTION_STAGE_TYPE~FSREQ_CMT_ID~IOREQ_CMT_ID~FSRES_CMT_ID~PKRES_CMT_ID~REST_OPERATION_ENABLED";
elementArray['RAD_SUMMARY'] = "TITLE~RAD_SUMMARY_WHERECLAUSE~RSLT_DATABLK~RSLT_DATASRC~SUMMARY_TYPE~RAD_SUMMARY_ORDERBY~RAD_MULTIBRN_WHERECLAUSE~MAIN_SUMM_SCR~SUM_SCREEN_SIZE~SUMMARY_WEBSERVICE_REQD~SUM_QUERYORDER~SUM_RESULTORDER~BLIND_SEARCH~DETAIL_REQ";
elementArray['SUMMARY_DETAILS'] = "FIELD_NAME~QUERY~LOV_NAME~DASHBD_LINK~MIN_CHAR_LEN~RETURN_FLDS~BIND_FLDS";
elementArray['CRITERIA_SEARCH'] = "CRITERIA_NAME~CRITERIA_VALUE";
elementArray['FIELDSET_FIELDS'] = "FIELD_NAME~DBT~SUBPARTITION_NAME~RELEASE_TYPE~RELEASE_NAME~ACTIVE~FIELD_ORDER";
elementArray['BLK_DATASOURCES'] = "DATASOURCE_NAME";
elementArray['RAD_RETURN_FIELDS'] = "QUERY_COLUMN~RETURN_BLK_NAME~RETURN_FLD_NAME"; 
elementArray['CUSTOM_BUTTONS_DETAILS'] = "FIELD_NAME~FIELD_LABEL~FUNCTION_NAME";
elementArray['RAD_OFF_LINE_BIND_VARS'] = "BIND_VAR_NAME~BIND_VAR_TYPE~BIND_VAR_BLK";
elementArray['RAD_OFF_LINE_RETURN_FIELDS'] = "QUERY_COLUMN~RETURN_BLK_NAME~RETURN_FLD_NAME";
elementArray['RAD_ITEM_DESC'] = "FUNCTION_ID~ITEM_CODE~ITEM_DESC~IS_COMMON";
elementArray['RAD_FUNC_PREFERENCES'] = "MODULE_ID~MODULE_DESC~AUTO_AUTH~HO_FUNCTION~LOGGING_REQD~FIELD_LOG_REQD~BRANCH_PROGRAM_ID~PROCESS_CODE~TANK_MODIFICATIONS~VCS_FOLDER~TXN_BLOCK_NAME~TXN_FIELD_NAME~SRC_BLOCK_NAME~SRC_FIELD_NAME~MULTI_BRANCH_ACCESS~EXPORT_REQD~ELCM_FUNCTION~JAVA_PAYEMNTS_FUNCTION~MODULE_GROUP_ID~MODULE_AUTO_AUTH~GW_FUNCTION";
elementArray['MENU_DETAILS'] = "FUNCTION_ID~LBL_FUNCTION_DESC~FUNC_MODULE_ID~FUNCTION_DESC~CONTROL_STRING~LBL_FUNC_MODULE_DESC~FUNC_MODULE_DESC";

// Generic Interface element array starts here 
elementArray["RECORD"] = "REC_CODE~REC_CATEGORY~HOMOGENOUS~HIERARCHICAL~DB_TABLES~WHERE_CLAUSE~ORDER_BY_CLAUSE~REC_LOC_TYPE~NO_OF_LINES~LENGTH~FIELD_TYPE~FIELD_DELIMITER~TAG_DELIMITER~REC_DELIMITER~REC_ID_TYPE~ST_TAG~ED_TAG~TAG_FLD_POS~TAG_LENGTH~TAG_ST_POS~TAG_VALUE~HIERARCHY_MODE~CUSTOM_TAGS";
elementArray["RECORD_FIELDS"] = "FIELD_CODE~DATA_TYPE~DATE_FORMAT~FIELD_POS~ST_POS~DELIMITER~DB_TABLE~DB_COLUMN~VALUE~LENGTH~KEYWORD~PADDING_PREF~PADDING_CHAR~EXCLUDE_IN_SELECT~TRIM_PREF~TRIM_CHAR~BLK_NAME~FLD_NAME~FC_FLD_POS~PARENT_BLK~EXISTS_IN_FILE";
elementArray["ASSOCIATED_RECORDS"] = "REC_CODE~PARENT_REC";
elementArray["ASSOCIATED_BLOCKS"] = "BLK_NAME~GEN_NEW_BLOCKS"; 
elementArray['PURGE_TABLE'] = "TABLE_NAME~MASTER~PARENT~KEY_FIELDS~DATA_TYPE~CHILD_JOIN~TABLE_COLUMNS~COLUMN_DATATYPES~COLUMN_MAXLENGTHS~ARCHIVE_NOT_REQD~EXCLUDE_PURGE~HISTORY_TABLE_NAME";
elementArray['PURGE_FILTER'] = "FILTER_NAME~FILTER_TYPE~FILTER_OPERATOR~FILTER_SCOPE~FILTER_DATA_TYPE~LABEL_CODE~FILTER_EXPRESSION~DEFAULT_VALUE~MAXIMUM_LENGTH~FILTER_QUERY";
elementArray['COMMON_ENTITY'] = "COMMON_ENTITY_NAME~ENTITY_ARGUMENTS~COMMON_ENTITY_MODULE";
elementArray['COMMON_ENTITY_ARGS'] = "ARGUMENT_NAME~DATA_SRC~COLUMN_NAME";
 
var nodeChildArray = new Array();
nodeChildArray['RAD_DATASOURCES'] = "RAD_FIELDS";
nodeChildArray['RAD_DATA_BLOCKS'] = "RAD_BLK_FIELDS~BLK_DATASOURCES";
nodeChildArray['RAD_SCREENS'] = "SCREEN_ARGS~HEADER~BODY~FOOTER";
nodeChildArray['HEADER'] = "RAD_TABS";
nodeChildArray['BODY'] = "RAD_TABS";
nodeChildArray['FOOTER'] = "RAD_TABS";
nodeChildArray['RAD_FIELDSETS'] = "FIELDSET_FIELDS";
nodeChildArray['RAD_TABS'] = "RAD_SECTIONS"; 

var nodeNonCompareArray = new Array();
nodeNonCompareArray['RAD_DATASOURCES'] = "RELEASE_TYPE~RELEASE_NAME";
	nodeNonCompareArray['RAD_FIELDS']="LABEL_CODE~RELEASE_TYPE~RELEASE_NAME~BLOCK_NAME~FIELD_NAME~MAX_DECIMALS";
nodeNonCompareArray['RAD_DATA_BLOCKS'] = "RELEASE_TYPE~RELEASE_NAME";
nodeNonCompareArray['RAD_BLK_FIELDS'] = "GLOBAL_LOV_NAME~GLOBAL_OFF_LINE_LOV_NAME~NOT_REQD_IN_XSD~RELEASE_TYPE~RELEASE_NAME~PREVIEW_VALUE";
nodeNonCompareArray['BLK_DATASOURCES'] = "RELEASE_TYPE~RELEASE_NAME";
nodeNonCompareArray['RAD_CALLFORM'] = "CHILD_CALLFORM~RELEASE_TYPE~RELEASE_NAME~CALLFORM_MST_DATA_SRC~CALLFORM_MST_BLOCK~CALLFORM_MST_XSD_NODE~CALLFORM_XSD_TYPE_DESC~CALLFORM_MST_MULTI_REC~CALLFORM_MODULE~IS_UPLOAD_TABLE_PRESENT";
nodeNonCompareArray['RAD_SCREENS'] = "RELEASE_TYPE~RELEASE_NAME";
nodeNonCompareArray['RAD_TABS'] = "RELEASE_TYPE~RELEASE_NAME";
nodeNonCompareArray['RAD_SECTIONS'] = "RELEASE_TYPE~RELEASE_NAME";
nodeNonCompareArray['RAD_PARTITIONS'] = "PARTITION_SL_NO~RELEASE_TYPE~RELEASE_NAME";
nodeNonCompareArray['RAD_FIELDSETS'] = "RELEASE_TYPE~RELEASE_NAME";
nodeNonCompareArray['FIELDSET_FIELDS'] = "FIELD_INDEX~RELEASE_TYPE~RELEASE_NAME";
nodeNonCompareArray['SCREEN_ARGS'] = "RELEASE_TYPE~RELEASE_NAME";
nodeNonCompareArray['RAD_FIELD_CUSTOM_ATTRS'] = "RELEASE_TYPE~RELEASE_NAME";

var DivNamesArray = new Array();
DivNamesArray[0] = "DSN";
DivNamesArray[1] = "DBT";
DivNamesArray[2] = "DBC";
DivNamesArray[3] = "SCR";
DivNamesArray[4] = "SSC";
DivNamesArray[5] = "TAB";
DivNamesArray[6] = "SEC";
DivNamesArray[7] = "BLK";
DivNamesArray[8] = "BNM";
DivNamesArray[9] = "BFD";
DivNamesArray[10] = "ACT";
DivNamesArray[11] = "CFM";
DivNamesArray[12] = "LOV";
DivNamesArray[13] = "SUM";
DivNamesArray[14] = "OTH";
DivNamesArray[15] = "FLD";
DivNamesArray[16] = "FDN";
DivNamesArray[17] = "LNM";
DivNamesArray[18] = "LFM";
DivNamesArray[19] = "MND";
DivNamesArray[20] = "HEADER";
DivNamesArray[21] = "BODY";
DivNamesArray[22] = "FOOTER";

var multipleTableArray = new Array();
multipleTableArray['events'] = 'RAD_FIELD_EVENTS';
multipleTableArray['AMOUNTTAB'] = 'RAD_AMOUNT_FIELDS';
multipleTableArray['PATTERNTAB'] = 'RAD_PATTERN_FIELDS';
multipleTableArray['DBlink'] = 'RAD_FIELD_DASHBD_LINK';
multipleTableArray['attributes'] = 'RAD_FIELD_CUSTOM_ATTRS';
multipleTableArray['retflds'] = 'RAD_RETURN_FIELDS';
multipleTableArray['offlineretflds'] = 'RAD_OFF_LINE_RETURN_FIELDS';
multipleTableArray['bindvar'] = 'RAD_BIND_VARS';
multipleTableArray['offlinebindvar'] = 'RAD_OFF_LINE_BIND_VARS';
multipleTableArray['CALFRMS'] = 'RAD_CALLFORM';
multipleTableArray['lfmform'] = 'RAD_LAUNCHFORM';
multipleTableArray['lovDetails'] = 'RAD_LOV_DETAILS';
multipleTableArray['ACTNS_TB'] = 'RAD_ACTION';
multipleTableArray['REST_TABLE'] = 'RAD_REST_ACTION';
multipleTableArray['partition'] = 'RAD_PARTITIONS';
multipleTableArray['SUM_DTLS'] = 'SUMMARY_DETAILS';
multipleTableArray['FieldsetFields'] = 'FIELDSET_FIELDS';
multipleTableArray['lovbindvar'] = 'RAD_BIND_VARS';
multipleTableArray['blkfields'] = 'RAD_BLK_FIELDS';
multipleTableArray['blkDsns'] = 'BLK_DATASOURCES';
multipleTableArray['sum_cust_btn'] = 'CUSTOM_BUTTONS_DETAILS';
//VINIT
multipleTableArray['cri_src_btn'] = 'CRITERIA_SEARCH';
multipleTableArray['labelCode'] = 'RAD_ITEM_DESC';
multipleTableArray['ScrArgnts'] = 'SCREEN_ARGS';
multipleTableArray['MainScrArgnts'] = 'TRG_SCREEN_ARGS';
multipleTableArray['funcDesc'] = 'MENU_DETAILS';
//purge tables
multipleTableArray['PF_B_FILTERS'] = 'PURGE_FILTER';
multipleTableArray['PF_E_FILTERS'] = 'PURGE_FILTER';   
multipleTableArray['PF_TABLES'] = 'PURGE_TABLE'; 
multipleTableArray['COMMON_ENTITY'] = 'COMMON_ENTITY'; 
multipleTableArray['PF_ARGDESC'] = 'COMMON_ENTITY_ARGS'; 

//GI tables
multipleTableArray['GI_HIN_fields'] = 'RECORD_FIELDS';
multipleTableArray['GI_BIN_fields'] = 'RECORD_FIELDS';
multipleTableArray['GI_FIN_fields'] = 'RECORD_FIELDS';
multipleTableArray['GI_HOUT_fields'] = 'RECORD_FIELDS';
multipleTableArray['GI_BOUT_fields'] = 'RECORD_FIELDS';
multipleTableArray['GI_FOUT_fields'] = 'RECORD_FIELDS';
multipleTableArray['GI_F_AssocRecords'] = 'ASSOCIATED_RECORDS';
multipleTableArray['GI_B_AssocRecords'] = 'ASSOCIATED_RECORDS';
multipleTableArray['GI_H_AssocRecords'] = 'ASSOCIATED_RECORDS';
multipleTableArray['GI_F_AssocBlocks'] = 'ASSOCIATED_BLOCKS';
multipleTableArray['GI_B_AssocBlocks'] = 'ASSOCIATED_BLOCKS';
multipleTableArray['GI_H_AssocBlocks'] = 'ASSOCIATED_BLOCKS';

var formNamesArray = new Array();
formNamesArray[0] = "DBT";//DSN
formNamesArray[1] = "frmDsnDbt";//DBT
formNamesArray[2] = "frmDsnDbc";//DBC
formNamesArray[3] = "SCR";//SCR
formNamesArray[4] = "SSC";//SSC 
formNamesArray[5] = "TAB";//TAB
formNamesArray[6] = "SEC";//SEC
formNamesArray[7] = "PRT";//PRT
formNamesArray[8] = "SPT";//SPT
formNamesArray[9] = "BLK";//BLK
formNamesArray[10] = "BNM";//BNM
formNamesArray[11] = "ACT";//ACT
formNamesArray[12] = "CFM";//CFM
formNamesArray[13] = "LOV";//LOV
formNamesArray[14] = "LNM";//LNM
formNamesArray[15] = "SUM";//SUM
formNamesArray[16] = "frmOth";//OTH
formNamesArray[17] = "FLD";//FLD
formNamesArray[18] = "FDN";//FDN 
formNamesArray[19] = "LFM";//LFM
formNamesArray[20] = "MND";//MND
var arrayAddedTags = new Array();
arrayAddedTags['RAD_BLK_FIELDS'] = 'MASK_ID~REPORT_PARAMETER';
arrayAddedTags['RAD_CALLFORM'] = 'SCREEN_ARGS~DEPENDENT_ON~CALLFORM_MST_DATA_SRC~CALLFORM_MST_BLOCK~CALLFORM_MST_XSD_NODE~CALLFORM_XSD_TYPE_DESC~CALLFORM_MST_MULTI_REC~CALLFORM_MODULE~IS_UPLOAD_TABLE_PRESENT';

var arrayDefaultValues = new Array();
arrayDefaultValues['CAL_FORM_TYPE'] = 'DATA';
arrayDefaultValues['DEPENDENT_ON'] = "Y";
arrayDefaultValues['LOV_VALS_REQD'] = 'Y';
arrayDefaultValues['REPORT_PARAMETER'] = 'N';
arrayDefaultValues['EXACT_FETCH'] = 'N';

var TreeObjectsArray = new Array();
TreeObjectsArray["DSN"] = new Array(3);
TreeObjectsArray["DSN"][0] = "DSN";
TreeObjectsArray["DSN"][1] = "DBT";
TreeObjectsArray["DSN"][2] = "DBC";

TreeObjectsArray["SCR"] = new Array(2);
TreeObjectsArray["SCR"][0] = "SCR";
TreeObjectsArray["SCR"][1] = "SSC";

TreeObjectsArray["HEADER"] = new Array(3);
TreeObjectsArray["HEADER"][2] = "HEADER";
TreeObjectsArray["HEADER"][3] = "TAB";
TreeObjectsArray["HEADER"][4] = "SEC";

TreeObjectsArray["BODY"] = new Array(3);
TreeObjectsArray["BODY"][2] = "BODY";
TreeObjectsArray["BODY"][3] = "TAB";
TreeObjectsArray["BODY"][4] = "SEC";

TreeObjectsArray["FOOTER"] = new Array(3);
TreeObjectsArray["FOOTER"][2] = "FOOTER";
TreeObjectsArray["FOOTER"][3] = "TAB";
TreeObjectsArray["FOOTER"][4] = "SEC";

TreeObjectsArray["BLK"] = new Array(1);
TreeObjectsArray["BLK"][0] = "BLK";
TreeObjectsArray["BLK"][1] = "BNM";
TreeObjectsArray["BLK"][2] = "BFD";

TreeObjectsArray["ACT"] = new Array(1);
TreeObjectsArray["ACT"][0] = "ACT";

TreeObjectsArray["CFM"] = new Array(1);
TreeObjectsArray["CFM"][0] = "CFM";
TreeObjectsArray["LFM"] = new Array(1);
TreeObjectsArray["LFM"][0] = "LFM";

TreeObjectsArray["LOV"] = new Array(1);
TreeObjectsArray["LOV"][0] = "LOV";
TreeObjectsArray["LOV"][1] = "LNM";

TreeObjectsArray["SUM"] = new Array(1);
TreeObjectsArray["SUM"][0] = "SUM";

TreeObjectsArray["MND"] = new Array(1);
TreeObjectsArray["MND"][0] = "MND";

TreeObjectsArray["OTH"] = new Array(1);
TreeObjectsArray["OTH"][0] = "OTH";

TreeObjectsArray["FLD"] = new Array(1);
TreeObjectsArray["FLD"][0] = "FLD";
TreeObjectsArray["FLD"][1] = "FDN";

var DisplayNameArray = new Array();

DisplayNameArray["DSN"] = new Array(3);
DisplayNameArray["DSN"][0] = "DSN";
DisplayNameArray["DSN"][1] = "DBT";
DisplayNameArray["DSN"][2] = "DBC";

DisplayNameArray["SCR"] = new Array(5);
DisplayNameArray["SCR"][0] = "Add Screen";

DisplayNameArray["HEADER"] = new Array(5);
DisplayNameArray["HEADER"][0] = "";
DisplayNameArray["HEADER"][1] = "";
DisplayNameArray["HEADER"][2] = "Add Tab";
DisplayNameArray["HEADER"][3] = "Add Section";

DisplayNameArray["BODY"] = new Array(4);
DisplayNameArray["BODY"][0] = "";
DisplayNameArray["BODY"][1] = "";
DisplayNameArray["BODY"][2] = "Add Tab";
DisplayNameArray["BODY"][3] = "Add Section";

DisplayNameArray["FOOTER"] = new Array(4);
DisplayNameArray["FOOTER"][0] = "";
DisplayNameArray["FOOTER"][1] = "";
DisplayNameArray["FOOTER"][2] = "Add Tab";
DisplayNameArray["FOOTER"][3] = "Add Section";

DisplayNameArray["BLK"] = new Array(1);
DisplayNameArray["BLK"][0] = "Add Block";
DisplayNameArray["BLK"][1] = "BNM";

DisplayNameArray["ACT"] = new Array(1);
DisplayNameArray["ACT"][0] = "ACT";

DisplayNameArray["CFM"] = new Array(1);
DisplayNameArray["CFM"][0] = "CFM";

DisplayNameArray["LFM"] = new Array(1);
DisplayNameArray["LFM"][0] = "LFM";

DisplayNameArray["LOV"] = new Array(1);
DisplayNameArray["LOV"][0] = "LOV";

DisplayNameArray["SUM"] = new Array(1);
DisplayNameArray["SUM"][0] = "SUM";

DisplayNameArray["MND"] = new Array(1);
DisplayNameArray["MND"][0] = "MND";

DisplayNameArray["OTH"] = new Array(1);
DisplayNameArray["OTH"][0] = "OTH";

DisplayNameArray["FLD"] = new Array(1);
DisplayNameArray["FLD"][0] = "Add FieldSet";
DisplayNameArray["FLD"][1] = "FDN";

var DisplayColumnArray = new Array();
DisplayColumnArray["DSN"] = new Array(3);
DisplayColumnArray["DSN"][0] = "DSN";
DisplayColumnArray["DSN"][1] = "DBT";
DisplayColumnArray["DSN"][2] = "DBC";

DisplayColumnArray["SCR"] = new Array(5);
DisplayColumnArray["SCR"][0] = "Screen Name";

DisplayColumnArray["HEADER"] = new Array(6);
DisplayColumnArray["HEADER"][0] = "";
DisplayColumnArray["HEADER"][1] = "";
DisplayColumnArray["HEADER"][2] = "Tab Name";
DisplayColumnArray["HEADER"][3] = "Section Name";

DisplayColumnArray["BODY"] = new Array(4);
DisplayColumnArray["BODY"][0] = "";
DisplayColumnArray["BODY"][1] = "";
DisplayColumnArray["BODY"][2] = "Tab Name";
DisplayColumnArray["BODY"][3] = "Section Name";

DisplayColumnArray["FOOTER"] = new Array(4);
DisplayColumnArray["FOOTER"][0] = "";
DisplayColumnArray["FOOTER"][1] = "";
DisplayColumnArray["FOOTER"][2] = "Tab Name";
DisplayColumnArray["FOOTER"][3] = "Section Name";

DisplayColumnArray["BLK"] = new Array(1);
DisplayColumnArray["BLK"][0] = "Block Name";
DisplayColumnArray["BLK"][1] = "BNM";

DisplayColumnArray["ACT"] = new Array(1);
DisplayColumnArray["ACT"][0] = "ACT";

DisplayColumnArray["CFM"] = new Array(1);
DisplayColumnArray["CFM"][0] = "CFM";
DisplayColumnArray["LFM"] = new Array(1);
DisplayColumnArray["LFM"][0] = "LFM";

DisplayColumnArray["LOV"] = new Array(1);
DisplayColumnArray["LOV"][0] = "LOV Name";

DisplayColumnArray["SUM"] = new Array(1);
DisplayColumnArray["SUM"][0] = "SUM";

DisplayColumnArray["MND"] = new Array(1);
DisplayColumnArray["MND"][0] = "MND";

DisplayColumnArray["OTH"] = new Array(1);
DisplayColumnArray["OTH"][0] = "OTH";

DisplayColumnArray["FLD"] = new Array(1);
DisplayColumnArray["FLD"][0] = "FieldSet Name";
DisplayColumnArray["FLD"][1] = "FDN";

var DisplayDefaultValueArray = new Array();
DisplayDefaultValueArray["DSN"] = new Array(3);
DisplayDefaultValueArray["DSN"][0] = "DSN";
DisplayDefaultValueArray["DSN"][1] = "DBT";
DisplayDefaultValueArray["DSN"][2] = "DBC";

DisplayDefaultValueArray["SCR"] = new Array(5);
DisplayDefaultValueArray["SCR"][0] = "CVS_";

DisplayDefaultValueArray["HEADER"] = new Array(6);
DisplayDefaultValueArray["HEADER"][0] = "";
DisplayDefaultValueArray["HEADER"][1] = "";
DisplayDefaultValueArray["HEADER"][2] = "TAB_";
DisplayDefaultValueArray["HEADER"][3] = "SEC_";

DisplayDefaultValueArray["BODY"] = new Array(4);
DisplayDefaultValueArray["BODY"][0] = "";
DisplayDefaultValueArray["BODY"][1] = "";
DisplayDefaultValueArray["BODY"][2] = "TAB_";
DisplayDefaultValueArray["BODY"][3] = "SEC_";

DisplayDefaultValueArray["FOOTER"] = new Array(4);
DisplayDefaultValueArray["FOOTER"][0] = "";
DisplayDefaultValueArray["FOOTER"][1] = "";
DisplayDefaultValueArray["FOOTER"][2] = "TAB_";
DisplayDefaultValueArray["FOOTER"][3] = "SEC_";

DisplayDefaultValueArray["BLK"] = new Array(1);
DisplayDefaultValueArray["BLK"][0] = "BLK_";
DisplayDefaultValueArray["BLK"][1] = "BNM";

DisplayDefaultValueArray["ACT"] = new Array(1);
DisplayDefaultValueArray["ACT"][0] = "ACT";

DisplayDefaultValueArray["CFM"] = new Array(1);
DisplayDefaultValueArray["CFM"][0] = "CFM";

DisplayDefaultValueArray["LFM"] = new Array(1);
DisplayDefaultValueArray["LFM"][0] = "LFM";

DisplayDefaultValueArray["LOV"] = new Array(1);
DisplayDefaultValueArray["LOV"][0] = "LOV_";

DisplayDefaultValueArray["SUM"] = new Array(1);
DisplayDefaultValueArray["SUM"][0] = "SUM";

DisplayDefaultValueArray["MND"] = new Array(1);
DisplayDefaultValueArray["MND"][0] = "MND";

DisplayDefaultValueArray["OTH"] = new Array(1);
DisplayDefaultValueArray["OTH"][0] = "OTH";

DisplayDefaultValueArray["FLD"] = new Array(1);
DisplayDefaultValueArray["FLD"][0] = "FST_";
DisplayDefaultValueArray["FLD"][1] = "FDN";

var DivGIArray = new Array();

DivGIArray[0] = "HAD";
DivGIArray[1] = "BDY";
DivGIArray[2] = "FTR";
DivGIArray[3] = "DHAD";
DivGIArray[4] = "DBDY";
DivGIArray[5] = "DFTR"
DivGIArray[6] = "RHAD";
DivGIArray[7] = "RBDY";
DivGIArray[8] = "RFTR";
DivGIArray[9] = "GND";
DivGIArray[10] = "FHAD";
DivGIArray[11] = "FBDY";
DivGIArray[12] = "FFTR";

var DivPFArray = new Array();

DivPFArray[0] = "PND";
DivPFArray[1] = "PTD";
DivPFArray[2] = "PFD";
DivPFArray[3] = "PCL";