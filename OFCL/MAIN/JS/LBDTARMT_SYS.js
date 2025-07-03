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
**  File Name          : LBDTARMT_SYS.js
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
var fieldNameArray = {"BLK_TAX_REMITTANCE_MASTER":"REMITTANCE_REF_NO~EVENT_SEQ_NO~START_DATE~END_DATE~INTERNAL_GL~TRN_CODE~MIS_GROUP~CURRENCY~REMITTANCE_STATUS~TOTAL_REMITTANCE_AMOUNT~POPULATE_KEY","BLK_TAX_REMITTANCE_DETAIL":"REMITTANCE_REF_NO~EVENT_SEQ_NO~CONTRACT_REF_NO~CURRENCY~REMITTANCE_AMOUNT","BLK_CONTRACT_EVENT_LOG":"MODULE~CONTRACT_REF_NO~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~TXNSTAT~AUTHSTAT~TRN_TYPE~UI_AUTH_STAT~UI_CONTRACT_STATUS~EVENT_VALUE_DATE"};

var multipleEntryPageSize = {"BLK_TAX_REMITTANCE_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_TAX_REMITTANCE_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TAX_REMITTANCE_MASTER">REMITTANCE_REF_NO~EVENT_SEQ_NO~START_DATE~END_DATE~INTERNAL_GL~TRN_CODE~MIS_GROUP~CURRENCY~REMITTANCE_STATUS~TOTAL_REMITTANCE_AMOUNT~POPULATE_KEY</FN>'; 
msgxml += '      <FN PARENT="BLK_TAX_REMITTANCE_MASTER" RELATION_TYPE="N" TYPE="BLK_TAX_REMITTANCE_DETAIL">REMITTANCE_REF_NO~EVENT_SEQ_NO~CONTRACT_REF_NO~CURRENCY~REMITTANCE_AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_TAX_REMITTANCE_MASTER" RELATION_TYPE="1" TYPE="BLK_CONTRACT_EVENT_LOG">MODULE~CONTRACT_REF_NO~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~TXNSTAT~AUTHSTAT~TRN_TYPE~UI_AUTH_STAT~UI_CONTRACT_STATUS~EVENT_VALUE_DATE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TAX_REMITTANCE_MASTER">REMITTANCE_REF_NO~EVENT_SEQ_NO~START_DATE~END_DATE~INTERNAL_GL~TRN_CODE~MIS_GROUP~CURRENCY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDTARMT";
var defaultWhereClause = "sypks_utils.get_branch(REMITTANCE_REF_NO) = GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="sypks_utils.get_branch(REMITTANCE_REF_NO) in (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TAX_REMITTANCE_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TAX_REMITTANCE_MASTER" : "","BLK_TAX_REMITTANCE_DETAIL" : "BLK_TAX_REMITTANCE_MASTER~N","BLK_CONTRACT_EVENT_LOG" : "BLK_TAX_REMITTANCE_MASTER~1"}; 

 var dataSrcLocationArray = new Array("BLK_TAX_REMITTANCE_MASTER","BLK_TAX_REMITTANCE_DETAIL","BLK_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDTARMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDTARMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TAX_REMITTANCE_MASTER__REMITTANCE_REF_NO";
pkFields[0] = "BLK_TAX_REMITTANCE_MASTER__REMITTANCE_REF_NO";
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
var lovInfoFlds = {"BLK_TAX_REMITTANCE_MASTER__REMITTANCE_REF_NO__LOV_REMITTANCE_NO":["BLK_TAX_REMITTANCE_MASTER__REMITTANCE_REF_NO~","","N",""],"BLK_TAX_REMITTANCE_MASTER__INTERNAL_GL__LOV_GL":["BLK_TAX_REMITTANCE_MASTER__INTERNAL_GL~~","","N~N",""],"BLK_TAX_REMITTANCE_MASTER__TRN_CODE__LOV_TRN_CODE":["BLK_TAX_REMITTANCE_MASTER__TRN_CODE~~","","N~N",""],"BLK_TAX_REMITTANCE_MASTER__MIS_GROUP__LOV_MIS_GROUP":["BLK_TAX_REMITTANCE_MASTER__MIS_GROUP~~","","N~N",""],"BLK_TAX_REMITTANCE_MASTER__CURRENCY__LOV_CCY":["BLK_TAX_REMITTANCE_MASTER__CURRENCY~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TAX_REMITTANCE_DETAIL");
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

ArrFuncOrigin["LBDTARMT"]="KERNEL";
ArrPrntFunc["LBDTARMT"]="";
ArrPrntOrigin["LBDTARMT"]="";
ArrRoutingType["LBDTARMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDTARMT"]="N";
ArrCustomModified["LBDTARMT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLDEVENT":"BLK_TAX_REMITTANCE_MASTER__REMITTANCE_REF_NO~"};
var scrArgVals = {"OLDEVENT":"~EXECUTEQUERY"};
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