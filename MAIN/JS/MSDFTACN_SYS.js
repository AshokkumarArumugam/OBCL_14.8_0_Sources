/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2024, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : MSDFTACN_SYS.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

//***** Code for criteria Search *****
var criteriaSearch  = 'N';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_MSTM_EMS_CONNECTIVITY_LINE":"OPERATION_MODE~VENDOR_NAME~PRODUCT_VERSION~PRODUCT_NAME~LINE_ID~CONNECTION_TYPE~TRAFFIC_TYPE~NODE~MEDIA~MCS~HOST_CODE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_MSTM_EMS_CONNECTIVITY_LINE_FTA":"PARAMETER_FILE_RQD~LOG_DIR~DATA_FILE_LAU~COMPANION_LAU~OVERRIDE~FILE_DIR~SUCCESS_DIR~DEBULK_REQD~DEBULK_RULE_NAME"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSTM_EMS_CONNECTIVITY_LINE">OPERATION_MODE~VENDOR_NAME~PRODUCT_VERSION~PRODUCT_NAME~LINE_ID~CONNECTION_TYPE~TRAFFIC_TYPE~NODE~MEDIA~MCS~HOST_CODE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_MSTM_EMS_CONNECTIVITY_LINE" RELATION_TYPE="1" TYPE="BLK_MSTM_EMS_CONNECTIVITY_LINE_FTA">PARAMETER_FILE_RQD~LOG_DIR~DATA_FILE_LAU~COMPANION_LAU~OVERRIDE~FILE_DIR~SUCCESS_DIR~DEBULK_REQD~DEBULK_RULE_NAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSTM_EMS_CONNECTIVITY_LINE">AUTHSTAT~TXNSTAT~LINE_ID~OPERATION_MODE~VENDOR_NAME~PRODUCT_VERSION~PRODUCT_NAME</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "MSDFTACN";
var defaultWhereClause = "CONNECTION_TYPE='F'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MSTM_EMS_CONNECTIVITY_LINE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MSTM_EMS_CONNECTIVITY_LINE" : "","BLK_MSTM_EMS_CONNECTIVITY_LINE_FTA" : "BLK_MSTM_EMS_CONNECTIVITY_LINE~1"}; 

 var dataSrcLocationArray = new Array("BLK_MSTM_EMS_CONNECTIVITY_LINE","BLK_MSTM_EMS_CONNECTIVITY_LINE_FTA"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside MSDFTACN.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside MSDFTACN.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MSTM_EMS_CONNECTIVITY_LINE__LINE_ID";
pkFields[0] = "BLK_MSTM_EMS_CONNECTIVITY_LINE__LINE_ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_MSTM_EMS_CONNECTIVITY_LINE_FTA":["COMPANION_LAU","DATA_FILE_LAU","DEBULK_REQD","DEBULK_RULE_NAME","FILE_DIR","LOG_DIR","OVERRIDE","PARAMETER_FILE_RQD","SUCCESS_DIR"],"BLK_MSTM_EMS_CONNECTIVITY_LINE":["MCS","MEDIA","NODE","OPERATION_MODE","PRODUCT_NAME","PRODUCT_VERSION","VENDOR_NAME"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
var queryAmendArr = new Array(); 
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_MSTM_EMS_CONNECTIVITY_LINE__NODE__LOV_NODE":["BLK_MSTM_EMS_CONNECTIVITY_LINE__NODE~","","N",""],"BLK_MSTM_EMS_CONNECTIVITY_LINE__MEDIA__LOV_MEDIA":["BLK_MSTM_EMS_CONNECTIVITY_LINE__MEDIA~~","","N~N",""],"BLK_MSTM_EMS_CONNECTIVITY_LINE__HOST_CODE__LOV_HOST_CODE":["BLK_MSTM_EMS_CONNECTIVITY_LINE__HOST_CODE~","","N",""],"BLK_MSTM_EMS_CONNECTIVITY_LINE_FTA__DEBULK_RULE_NAME__LOV_DEBULK_RULE_NAME":["BLK_MSTM_EMS_CONNECTIVITY_LINE_FTA__DEBULK_RULE_NAME~","","N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_MAIN';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array();
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array(); 

 var CallFormRelat=new Array(); 

 var CallRelatType= new Array(); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["MSDFTACN"]="KERNEL";
ArrPrntFunc["MSDFTACN"]="";
ArrPrntOrigin["MSDFTACN"]="";
ArrRoutingType["MSDFTACN"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["MSDFTACN"]="N";
ArrCustomModified["MSDFTACN"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {};
var scrArgSource = {};
var scrArgVals = {};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {};
var dpndntOnSrvs = {};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------