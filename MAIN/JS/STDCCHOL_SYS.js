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
**  File Name          : STDCCHOL_SYS.js
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
var fieldNameArray = {"BLK_STTMS_CCY_HOL_MASTER":"YEAR~WEEKLY_HOLIDAYS~CCY~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_STTMS_CCY_HOLIDAY":"YEAR~MONTH~HOLIDAY_LIST~CCY"};

var multipleEntryPageSize = {"BLK_STTMS_CCY_HOLIDAY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_STTMS_CCY_HOLIDAY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_STTMS_CCY_HOL_MASTER">YEAR~WEEKLY_HOLIDAYS~CCY~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_STTMS_CCY_HOL_MASTER" RELATION_TYPE="N" TYPE="BLK_STTMS_CCY_HOLIDAY">YEAR~MONTH~HOLIDAY_LIST~CCY</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_STTMS_CCY_HOL_MASTER">AUTHSTAT~TXNSTAT~YEAR~CCY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "STDCCHOL";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_STTMS_CCY_HOL_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_STTMS_CCY_HOL_MASTER" : "","BLK_STTMS_CCY_HOLIDAY" : "BLK_STTMS_CCY_HOL_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_STTMS_CCY_HOL_MASTER","BLK_STTMS_CCY_HOLIDAY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside STDCCHOL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside STDCCHOL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_STTMS_CCY_HOL_MASTER__CCY";
pkFields[0] = "BLK_STTMS_CCY_HOL_MASTER__CCY";
queryFields[1] = "BLK_STTMS_CCY_HOL_MASTER__YEAR";
pkFields[1] = "BLK_STTMS_CCY_HOL_MASTER__YEAR";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_STTMS_CCY_HOLIDAY":["HOLIDAY_LIST","MONTH"],"BLK_STTMS_CCY_HOL_MASTER":["APR_0_0","APR_0_1","APR_0_2","APR_0_3","APR_0_4","APR_0_5","APR_0_6","APR_1_0","APR_1_1","APR_1_2","APR_1_3","APR_1_4","APR_1_5","APR_1_6","APR_2_0","APR_2_1","APR_2_2","APR_2_3","APR_2_4","APR_2_5","APR_2_6","APR_3_0","APR_3_1","APR_3_2","APR_3_3","APR_3_4","APR_3_5","APR_3_6","APR_4_0","APR_4_1","APR_4_2","APR_4_3","APR_4_4","APR_4_5","APR_4_6","APR_5_0","APR_5_1","APR_5_2","APR_5_3","APR_5_4","APR_5_5","APR_5_6","AUG_0_0","AUG_0_1","AUG_0_2","AUG_0_3","AUG_0_4","AUG_0_5","AUG_0_6","AUG_1_0","AUG_1_1","AUG_1_2","AUG_1_3","AUG_1_4","AUG_1_5","AUG_1_6","AUG_2_0","AUG_2_1","AUG_2_2","AUG_2_3","AUG_2_4","AUG_2_5","AUG_2_6","AUG_3_0","AUG_3_1","AUG_3_2","AUG_3_3","AUG_3_4","AUG_3_5","AUG_3_6","AUG_4_0","AUG_4_1","AUG_4_2","AUG_4_3","AUG_4_4","AUG_4_5","AUG_4_6","AUG_5_0","AUG_5_1","AUG_5_2","AUG_5_3","AUG_5_4","AUG_5_5","AUG_5_6","DEC_0_0","DEC_0_1","DEC_0_2","DEC_0_3","DEC_0_4","DEC_0_5","DEC_0_6","DEC_1_0","DEC_1_1","DEC_1_2","DEC_1_3","DEC_1_4","DEC_1_5","DEC_1_6","DEC_2_0","DEC_2_1","DEC_2_2","DEC_2_3","DEC_2_4","DEC_2_5","DEC_2_6","DEC_3_0","DEC_3_1","DEC_3_2","DEC_3_3","DEC_3_4","DEC_3_5","DEC_3_6","DEC_4_0","DEC_4_1","DEC_4_2","DEC_4_3","DEC_4_4","DEC_4_5","DEC_4_6","DEC_5_0","DEC_5_1","DEC_5_2","DEC_5_3","DEC_5_4","DEC_5_5","DEC_5_6","FEB_0_0","FEB_0_1","FEB_0_2","FEB_0_3","FEB_0_4","FEB_0_5","FEB_0_6","FEB_1_0","FEB_1_1","FEB_1_2","FEB_1_3","FEB_1_4","FEB_1_5","FEB_1_6","FEB_2_0","FEB_2_1","FEB_2_2","FEB_2_3","FEB_2_4","FEB_2_5","FEB_2_6","FEB_3_0","FEB_3_1","FEB_3_2","FEB_3_3","FEB_3_4","FEB_3_5","FEB_3_6","FEB_4_0","FEB_4_1","FEB_4_2","FEB_4_3","FEB_4_4","FEB_4_5","FEB_4_6","FEB_5_0","FEB_5_1","FEB_5_2","FEB_5_3","FEB_5_4","FEB_5_5","FEB_5_6","JAN_0_0","JAN_0_1","JAN_0_2","JAN_0_3","JAN_0_4","JAN_0_5","JAN_0_6","JAN_1_0","JAN_1_1","JAN_1_2","JAN_1_3","JAN_1_4","JAN_1_5","JAN_1_6","JAN_2_0","JAN_2_1","JAN_2_2","JAN_2_3","JAN_2_4","JAN_2_5","JAN_2_6","JAN_3_0","JAN_3_1","JAN_3_2","JAN_3_3","JAN_3_4","JAN_3_5","JAN_3_6","JAN_4_0","JAN_4_1","JAN_4_2","JAN_4_3","JAN_4_4","JAN_4_5","JAN_4_6","JAN_5_0","JAN_5_1","JAN_5_2","JAN_5_3","JAN_5_4","JAN_5_5","JAN_5_6","JUL_0_0","JUL_0_1","JUL_0_2","JUL_0_3","JUL_0_4","JUL_0_5","JUL_0_6","JUL_1_0","JUL_1_1","JUL_1_2","JUL_1_3","JUL_1_4","JUL_1_5","JUL_1_6","JUL_2_0","JUL_2_1","JUL_2_2","JUL_2_3","JUL_2_4","JUL_2_5","JUL_2_6","JUL_3_0","JUL_3_1","JUL_3_2","JUL_3_3","JUL_3_4","JUL_3_5","JUL_3_6","JUL_4_0","JUL_4_1","JUL_4_2","JUL_4_3","JUL_4_4","JUL_4_5","JUL_4_6","JUL_5_0","JUL_5_1","JUL_5_2","JUL_5_3","JUL_5_4","JUL_5_5","JUL_5_6","JUN_0_0","JUN_0_1","JUN_0_2","JUN_0_3","JUN_0_4","JUN_0_5","JUN_0_6","JUN_1_0","JUN_1_1","JUN_1_2","JUN_1_3","JUN_1_4","JUN_1_5","JUN_1_6","JUN_2_0","JUN_2_1","JUN_2_2","JUN_2_3","JUN_2_4","JUN_2_5","JUN_2_6","JUN_3_0","JUN_3_1","JUN_3_2","JUN_3_3","JUN_3_4","JUN_3_5","JUN_3_6","JUN_4_0","JUN_4_1","JUN_4_2","JUN_4_3","JUN_4_4","JUN_4_5","JUN_4_6","JUN_5_0","JUN_5_1","JUN_5_2","JUN_5_3","JUN_5_4","JUN_5_5","JUN_5_6","MAR_0_0","MAR_0_1","MAR_0_2","MAR_0_3","MAR_0_4","MAR_0_5","MAR_0_6","MAR_1_0","MAR_1_1","MAR_1_2","MAR_1_3","MAR_1_4","MAR_1_5","MAR_1_6","MAR_2_0","MAR_2_1","MAR_2_2","MAR_2_3","MAR_2_4","MAR_2_5","MAR_2_6","MAR_3_0","MAR_3_1","MAR_3_2","MAR_3_3","MAR_3_4","MAR_3_5","MAR_3_6","MAR_4_0","MAR_4_1","MAR_4_2","MAR_4_3","MAR_4_4","MAR_4_5","MAR_4_6","MAR_5_0","MAR_5_1","MAR_5_2","MAR_5_3","MAR_5_4","MAR_5_5","MAR_5_6","MAY_0_0","MAY_0_1","MAY_0_2","MAY_0_3","MAY_0_4","MAY_0_5","MAY_0_6","MAY_1_0","MAY_1_1","MAY_1_2","MAY_1_3","MAY_1_4","MAY_1_5","MAY_1_6","MAY_2_0","MAY_2_1","MAY_2_2","MAY_2_3","MAY_2_4","MAY_2_5","MAY_2_6","MAY_3_0","MAY_3_1","MAY_3_2","MAY_3_3","MAY_3_4","MAY_3_5","MAY_3_6","MAY_4_0","MAY_4_1","MAY_4_2","MAY_4_3","MAY_4_4","MAY_4_5","MAY_4_6","MAY_5_0","MAY_5_1","MAY_5_2","MAY_5_3","MAY_5_4","MAY_5_5","MAY_5_6","NOV_0_0","NOV_0_1","NOV_0_2","NOV_0_3","NOV_0_4","NOV_0_5","NOV_0_6","NOV_1_0","NOV_1_1","NOV_1_2","NOV_1_3","NOV_1_4","NOV_1_5","NOV_1_6","NOV_2_0","NOV_2_1","NOV_2_2","NOV_2_3","NOV_2_4","NOV_2_5","NOV_2_6","NOV_3_0","NOV_3_1","NOV_3_2","NOV_3_3","NOV_3_4","NOV_3_5","NOV_3_6","NOV_4_0","NOV_4_1","NOV_4_2","NOV_4_3","NOV_4_4","NOV_4_5","NOV_4_6","NOV_5_0","NOV_5_1","NOV_5_2","NOV_5_3","NOV_5_4","NOV_5_5","NOV_5_6","OCT_0_0","OCT_0_1","OCT_0_2","OCT_0_3","OCT_0_4","OCT_0_5","OCT_0_6","OCT_1_0","OCT_1_1","OCT_1_2","OCT_1_3","OCT_1_4","OCT_1_5","OCT_1_6","OCT_2_0","OCT_2_1","OCT_2_2","OCT_2_3","OCT_2_4","OCT_2_5","OCT_2_6","OCT_3_0","OCT_3_1","OCT_3_2","OCT_3_3","OCT_3_4","OCT_3_5","OCT_3_6","OCT_4_0","OCT_4_1","OCT_4_2","OCT_4_3","OCT_4_4","OCT_4_5","OCT_4_6","OCT_5_0","OCT_5_1","OCT_5_2","OCT_5_3","OCT_5_4","OCT_5_5","OCT_5_6","SEP_0_0","SEP_0_1","SEP_0_2","SEP_0_3","SEP_0_4","SEP_0_5","SEP_0_6","SEP_1_0","SEP_1_1","SEP_1_2","SEP_1_3","SEP_1_4","SEP_1_5","SEP_1_6","SEP_2_0","SEP_2_1","SEP_2_2","SEP_2_3","SEP_2_4","SEP_2_5","SEP_2_6","SEP_3_0","SEP_3_1","SEP_3_2","SEP_3_3","SEP_3_4","SEP_3_5","SEP_3_6","SEP_4_0","SEP_4_1","SEP_4_2","SEP_4_3","SEP_4_4","SEP_4_5","SEP_4_6","SEP_5_0","SEP_5_1","SEP_5_2","SEP_5_3","SEP_5_4","SEP_5_5","SEP_5_6"]};
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
var lovInfoFlds = {"BLK_STTMS_CCY_HOL_MASTER__CCY__LOV_CCY_CODE":["BLK_STTMS_CCY_HOL_MASTER__CCY~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_STTMS_CCY_HOLIDAY");
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

ArrFuncOrigin["STDCCHOL"]="KERNEL";
ArrPrntFunc["STDCCHOL"]="";
ArrPrntOrigin["STDCCHOL"]="";
ArrRoutingType["STDCCHOL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["STDCCHOL"]="N";
ArrCustomModified["STDCCHOL"]="N";

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