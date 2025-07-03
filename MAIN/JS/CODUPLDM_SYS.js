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
**  File Name          : CODUPLDM_SYS.js
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
var fieldNameArray = {"BLK_COTMS_SOURCE_PREF":"MODULE_CODE~ALLOW_DEFERRED_PROCESSING~ON_QUEUE_EXCEPTION~ON_ERROR~ALLOW_EOD_WITH_DEFERRED~SOURCE_CODE~AMEND_ALLOWED~ON_OVERRIDE~PURGE_DAYS~UPLOADED_STATUS~ALLOW_DELETE~ON_REPAIRABLE_EXCEPTION~PROCEED_WITH_EOD~DELETE_ALLOWED~REVERSE_ALLOWED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_COTMS_SOURCE_FUNCID_PREF":"REVERSE_ALLOWED~ON_QUEUE_EXCEPTION~ON_REPAIRABLE_EXCEPTION~UPLOADED_STATUS~PROCEED_WITH_EOD~SOURCE_CODE~PURGE_DAYS~MODULE_CODE~AMEND_ALLOWED~DELETE_ALLOWED~ALLOW_DEFERRED_PROCESSING~FUNCTION_ID~ON_ERROR~ON_OVERRIDE~ALLOW_EOD_WITH_DEFERRED"};

var multipleEntryPageSize = {"BLK_COTMS_SOURCE_FUNCID_PREF" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_DETAIL__TAB_MAIN":"BLK_COTMS_SOURCE_FUNCID_PREF"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_COTMS_SOURCE_PREF">MODULE_CODE~ALLOW_DEFERRED_PROCESSING~ON_QUEUE_EXCEPTION~ON_ERROR~ALLOW_EOD_WITH_DEFERRED~SOURCE_CODE~AMEND_ALLOWED~ON_OVERRIDE~PURGE_DAYS~UPLOADED_STATUS~ALLOW_DELETE~ON_REPAIRABLE_EXCEPTION~PROCEED_WITH_EOD~DELETE_ALLOWED~REVERSE_ALLOWED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_COTMS_SOURCE_PREF" RELATION_TYPE="N" TYPE="BLK_COTMS_SOURCE_FUNCID_PREF">REVERSE_ALLOWED~ON_QUEUE_EXCEPTION~ON_REPAIRABLE_EXCEPTION~UPLOADED_STATUS~PROCEED_WITH_EOD~SOURCE_CODE~PURGE_DAYS~MODULE_CODE~AMEND_ALLOWED~DELETE_ALLOWED~ALLOW_DEFERRED_PROCESSING~FUNCTION_ID~ON_ERROR~ON_OVERRIDE~ALLOW_EOD_WITH_DEFERRED</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_COTMS_SOURCE_PREF">AUTHSTAT~TXNSTAT~SOURCE_CODE~MODULE_CODE~UPLOADED_STATUS~ON_ERROR~ON_OVERRIDE~PURGE_DAYS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "CODUPLDM";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_COTMS_SOURCE_PREF";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_COTMS_SOURCE_PREF" : "","BLK_COTMS_SOURCE_FUNCID_PREF" : "BLK_COTMS_SOURCE_PREF~N"}; 

 var dataSrcLocationArray = new Array("BLK_COTMS_SOURCE_PREF","BLK_COTMS_SOURCE_FUNCID_PREF"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside CODUPLDM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside CODUPLDM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_COTMS_SOURCE_PREF__SOURCE_CODE";
pkFields[0] = "BLK_COTMS_SOURCE_PREF__SOURCE_CODE";
queryFields[1] = "BLK_COTMS_SOURCE_PREF__MODULE_CODE";
pkFields[1] = "BLK_COTMS_SOURCE_PREF__MODULE_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var modifyAmendArr = new Array(); 
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
var lovInfoFlds = {"BLK_COTMS_SOURCE_PREF__MODULE_CODE__LOV_MODULE_CODE":["BLK_COTMS_SOURCE_PREF__MODULE_CODE~~","","N~N",""],"BLK_COTMS_SOURCE_PREF__SOURCE_CODE__LOV_SOURCE_CODE":["BLK_COTMS_SOURCE_PREF__SOURCE_CODE~~","","N~N",""],"BLK_COTMS_SOURCE_FUNCID_PREF__FUNCTION_ID__LOV_FUNCTION_ID":["BLK_COTMS_SOURCE_FUNCID_PREF__FUNCTION_ID~","BLK_COTMS_SOURCE_PREF__MODULE_CODE!VARCHAR2","N",""]};
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
var multipleEntryIDs = new Array("BLK_COTMS_SOURCE_FUNCID_PREF");
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

ArrFuncOrigin["CODUPLDM"]="KERNEL";
ArrPrntFunc["CODUPLDM"]="";
ArrPrntOrigin["CODUPLDM"]="";
ArrRoutingType["CODUPLDM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["CODUPLDM"]="N";
ArrCustomModified["CODUPLDM"]="N";

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