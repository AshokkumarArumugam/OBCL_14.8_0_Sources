/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
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
**  File Name          : LBDIRTFX_SYS.js
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
var fieldNameArray = {"BLK_COMPONENT_RATE":"CONTRACT_REF_NO~COMPONENT~EVENT_SEQ_NO~ACTUAL_FIXING_DATE~RATE_EFFECTIVE_START_DATE~RATE_EFFECTIVE_END_DATE~RATE_FIXING_DATE~TENOR_TYPE~TENOR_VALUE~TENOR_UNIT~RATE_CODE~RATE~RATE_FIXING_ESN~RATE_AMEND_ESN~RATE_FIXED_STATUS~RATE_FIXED_TIMESTAMP~RATE_FIXING_NOTIFICATION_DATE~NEXT_RATE_FIXING_DATE~NEXT_FIXING_NOTIFICATION_DATE~NEXT_EFFECTIVE_START_DATE~REMARKS~INOT_GENERATED~PROD_CODE~PROD_DESC~USER_REF~CUSTOMER~CUST_NAME~FACILITY_NAME~MARKIT_CONT_ID~BRANCH~DEPT~TREASURY_SOURCE~PROD_TYPE~COMP_DESC~CCY~TXTRTFXREQD~TXTRTFXDAYS~TXTBORROWLENDIND~TXTRESETTENOR~TXTRTCALCTYPE~TXT_NEW_RATE_EFF_START_DATE~INTEREST_REFUND_REQUIRED","BLK_EVENT_RTFIX":"AUTHSTAT~TXNSTAT~MAKER_DT_STAMP~MAKER_ID~CHECKER_ID~CHECKER_DT_STAMP~TXT_PART_PROCESS_STAT"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_COMPONENT_RATE">CONTRACT_REF_NO~COMPONENT~EVENT_SEQ_NO~ACTUAL_FIXING_DATE~RATE_EFFECTIVE_START_DATE~RATE_EFFECTIVE_END_DATE~RATE_FIXING_DATE~TENOR_TYPE~TENOR_VALUE~TENOR_UNIT~RATE_CODE~RATE~RATE_FIXING_ESN~RATE_AMEND_ESN~RATE_FIXED_STATUS~RATE_FIXED_TIMESTAMP~RATE_FIXING_NOTIFICATION_DATE~NEXT_RATE_FIXING_DATE~NEXT_FIXING_NOTIFICATION_DATE~NEXT_EFFECTIVE_START_DATE~REMARKS~INOT_GENERATED~PROD_CODE~PROD_DESC~USER_REF~CUSTOMER~CUST_NAME~FACILITY_NAME~MARKIT_CONT_ID~BRANCH~DEPT~TREASURY_SOURCE~PROD_TYPE~COMP_DESC~CCY~TXTRTFXREQD~TXTRTFXDAYS~TXTBORROWLENDIND~TXTRESETTENOR~TXTRTCALCTYPE~TXT_NEW_RATE_EFF_START_DATE~INTEREST_REFUND_REQUIRED</FN>'; 
msgxml += '      <FN PARENT="BLK_COMPONENT_RATE" RELATION_TYPE="1" TYPE="BLK_EVENT_RTFIX">AUTHSTAT~TXNSTAT~MAKER_DT_STAMP~MAKER_ID~CHECKER_ID~CHECKER_DT_STAMP~TXT_PART_PROCESS_STAT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_RATEFIX";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_COMPONENT_RATE" RELATION_TYPE="1" TYPE="BLK_LBVWS_RATEFIX_DETAIL_SUMMARY">CONTRACT_REF_NO~COMPONENT~AUTH_STATUS~CONTRACT_STATUS~EVENT_SEQ_NO~ACTUAL_FIXING_DATE~RATE_EFFECTIVE_START_DATE~RATE_EFFECTIVE_END_DATE~RATE_FIXING_DATE~TENOR_TYPE~TENOR_VALUE~TENOR_UNIT~RATE_CODE~RATE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDIRTFX";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LBVWS_RATEFIX_DETAIL_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_COMPONENT_RATE" : "","BLK_EVENT_RTFIX" : "BLK_COMPONENT_RATE~1"}; 

 var dataSrcLocationArray = new Array("BLK_COMPONENT_RATE","BLK_EVENT_RTFIX"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDIRTFX.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDIRTFX.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_COMPONENT_RATE__CONTRACT_REF_NO";
pkFields[0] = "BLK_COMPONENT_RATE__CONTRACT_REF_NO";
queryFields[1] = "BLK_COMPONENT_RATE__EVENT_SEQ_NO";
pkFields[1] = "BLK_COMPONENT_RATE__EVENT_SEQ_NO";
queryFields[2] = "BLK_COMPONENT_RATE__COMPONENT";
pkFields[2] = "BLK_COMPONENT_RATE__COMPONENT";
queryFields[3] = "BLK_COMPONENT_RATE__RATE_EFFECTIVE_START_DATE";
pkFields[3] = "BLK_COMPONENT_RATE__RATE_EFFECTIVE_START_DATE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_COMPONENT_RATE":["ACTUAL_FIXING_DATEI","INTEREST_REFUND_REQUIRED","NEXT_EFFECTIVE_START_DATEI","NEXT_FIXING_NOTIFICATION_DATEI","NEXT_RATE_FIXING_DATEI","PROD_CODE","RATE","RATE_CODE","RATE_EFFECTIVE_END_DATEI","RATE_EFFECTIVE_START_DATEI","RATE_FIXING_DATEI","RATE_FIXING_NOTIFICATION_DATEI","REMARKS","TENOR_TYPE","TENOR_UNIT","TENOR_VALUE","TXT_NEW_RATE_EFF_START_DATEI"]};
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
var lovInfoFlds = {"BLK_COMPONENT_RATE__CONTRACT_REF_NO__LOV_CRN":["BLK_COMPONENT_RATE__CONTRACT_REF_NO~BLK_COMPONENT_RATE__USER_REF~","","N~N",""],"BLK_COMPONENT_RATE__TENOR_VALUE__LOV_TENOR_FOR_MASTER":["BLK_COMPONENT_RATE__TENOR_VALUE~~BLK_COMPONENT_RATE__TENOR_UNIT~~","BLK_COMPONENT_RATE__RATE_CODE!varchar2~BLK_COMPONENT_RATE__CCY!varchar2","N~N~N~N",""],"BLK_COMPONENT_RATE__RATE_CODE__LOV_RATE_CODE":["BLK_COMPONENT_RATE__RATE_CODE~~","BLK_COMPONENT_RATE__CCY!","N~N",""]};
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

 var CallFormArray= new Array("LBCADVIC~BLK_COMPONENT_RATE","LBCUKUDF~BLK_COMPONENT_RATE"); 

 var CallFormRelat=new Array("LBTBS_RATE_FIXING_DETAILS.CONTRACT_REF_NO=OLTBS_GTEMP_EVENT_ADVICE.CONTRACT_REF_NO AND LBTBS_RATE_FIXING_DETAILS.EVENT_SEQ_NO=OLTBS_GTEMP_EVENT_ADVICE.EVENT_SEQ_NO","LBTBS_RATE_FIXING_DETAILS.CONTRACT_REF_NO=LBTBS_UDF_FIELD_VALS.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LBDIRTFX"]="KERNEL";
ArrPrntFunc["LBDIRTFX"]="";
ArrPrntOrigin["LBDIRTFX"]="";
ArrRoutingType["LBDIRTFX"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDIRTFX"]="N";
ArrCustomModified["LBDIRTFX"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"LBCADVIC":"CONTREFNO~EVNTSEQNO~","LBCUKUDF":"CONTRACTREFNO~RENEWALNO~SPLITNO"};
var scrArgSource = {"LBCADVIC":"BLK_COMPONENT_RATE__CONTRACT_REF_NO~BLK_COMPONENT_RATE__EVENT_SEQ_NO~","LBCUKUDF":"BLK_COMPONENT_RATE__CONTRACT_REF_NO~~"};
var scrArgVals = {"LBCADVIC":"~~","LBCUKUDF":"~0~0"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"LBCADVIC":"","LBCUKUDF":""};
var dpndntOnSrvs = {"LBCADVIC":"","LBCUKUDF":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------