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
**  File Name          : LBDCOLPT_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"CUSTOM_REF_NO~MODULE_CODE~CONTRACT_STATUS~FUND_REF_NO~CONF_PMT_LINK_STAT~CONTRACT_REF_NO~SERIAL_NO~TREASURY_SOURCE~PRODUCT_CODE~PRODUCT_TYPE~RELATED_REF_NO~NET_ACROSS_DRAWDOWN~EVALUATION_DATE~CONTRACT_CCY~LATEST_VERSION_NO~SUPRESS_BV_PAYMENT_MSG~BRANCH~OVERALL_CONF_STAT~DEPARTMENT_CODE~WORKFLOW_STATUS~LATEST_EVENT_DATE~AUTH_STATUS~UNCONFIRMED_SINCE~SOURCE~SWIFT_REF_NO~TEMPLATE_STATUS~AUTO_MANUAL_FLAG~EXTERNAL_REF_NO~ALTERNATE_REF_NO~COMMON_REF_NO~BOOK_DATE~SUPRESS_BV_PAYMENT_MSG1~USER_REF_NO~DELINQUENCY_STATUS~RATE_REVISION_STATUS~LIABILITY_CIF~CURR_EVENT_CODE~RESPONSE_STAT~ECA_STATUS~ALLOW_ONLINE_CONFIRM~COUNTERPARTY~LATEST_REPROGRAM_COUNTER_NO~USER_DEFINED_STATUS~LATEST_EVENT_SEQ_NO~TXT_CUSTOMER_NAME~TXT_PRODUCT_DESC~TXT_PROD_TYPE_DESC~TXT_FACILITY_NAME~BTN_SETTLEMENT","BLK_LBTBS_COLL_PARTICIPANT":"EVENT_SEQ_NO~COLLATERAL_PERCENTAGE~OASYS_MNEMONIC~CONTRACT_REF_NO~VALUE_DATE~PARTICIPANT~TXT_PARTICIPANT_NAME~COLLATERAL_AMOUNT","BLK_OLTBS_CONTRACT_EVENT_LOG":"CHECKER_DT_STAMP~AUTH_STATUS~WORKFLOW_STATUS~INFORM_STATUS~EVENT_VALUE_DATE~RELEASE_DT_STAMP~CONTRACT_STATUS~RATE_ASSIGN_AUTH_DT_STAMP~CONTRACT_REF_NO~REVERSED_EVENT_SEQ_NO~RATE_ASSIGN_DT_STAMP~RATE_REVISION_STATUS~RATE_ASSIGN_AUTH_BY~TRN_TYPE~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~MODULE~EXTERNAL_TRAN_REF_NO~RELEASE_BY~MAKER_DT_STAMP~NEW_VERSION_INDICATOR~RATE_ASSIGNED_BY~ECA_STATUS~TXT_CONTRACT_STATUS~TXT_AUTH_STATUS~AUTHSTAT~TXNSTAT~CHECKERID~MAKERID","BLK_LBVW_COLL_PARTICIPANT":"CONTRACT_STATUS~LS_REF_NO~CONTRACT_REF_NO~DEPARTMENT_CODE~CUSIP_NO~PRODUCT_CODE~COUNTERPARTY~BRANCH~AUTH_STATUS~FACILITY_NAME~CONTRACT_TYPE~AVL_COLLATERAL_AMT"};

var multipleEntryPageSize = {"BLK_LBTBS_COLL_PARTICIPANT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LBTBS_COLL_PARTICIPANT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CUSTOM_REF_NO~MODULE_CODE~CONTRACT_STATUS~FUND_REF_NO~CONF_PMT_LINK_STAT~CONTRACT_REF_NO~SERIAL_NO~TREASURY_SOURCE~PRODUCT_CODE~PRODUCT_TYPE~RELATED_REF_NO~NET_ACROSS_DRAWDOWN~EVALUATION_DATE~CONTRACT_CCY~LATEST_VERSION_NO~SUPRESS_BV_PAYMENT_MSG~BRANCH~OVERALL_CONF_STAT~DEPARTMENT_CODE~WORKFLOW_STATUS~LATEST_EVENT_DATE~AUTH_STATUS~UNCONFIRMED_SINCE~SOURCE~SWIFT_REF_NO~TEMPLATE_STATUS~AUTO_MANUAL_FLAG~EXTERNAL_REF_NO~ALTERNATE_REF_NO~COMMON_REF_NO~BOOK_DATE~SUPRESS_BV_PAYMENT_MSG1~USER_REF_NO~DELINQUENCY_STATUS~RATE_REVISION_STATUS~LIABILITY_CIF~CURR_EVENT_CODE~RESPONSE_STAT~ECA_STATUS~ALLOW_ONLINE_CONFIRM~COUNTERPARTY~LATEST_REPROGRAM_COUNTER_NO~USER_DEFINED_STATUS~LATEST_EVENT_SEQ_NO~TXT_CUSTOMER_NAME~TXT_PRODUCT_DESC~TXT_PROD_TYPE_DESC~TXT_FACILITY_NAME~BTN_SETTLEMENT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_LBTBS_COLL_PARTICIPANT">EVENT_SEQ_NO~COLLATERAL_PERCENTAGE~OASYS_MNEMONIC~CONTRACT_REF_NO~VALUE_DATE~PARTICIPANT~TXT_PARTICIPANT_NAME~COLLATERAL_AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">CHECKER_DT_STAMP~AUTH_STATUS~WORKFLOW_STATUS~INFORM_STATUS~EVENT_VALUE_DATE~RELEASE_DT_STAMP~CONTRACT_STATUS~RATE_ASSIGN_AUTH_DT_STAMP~CONTRACT_REF_NO~REVERSED_EVENT_SEQ_NO~RATE_ASSIGN_DT_STAMP~RATE_REVISION_STATUS~RATE_ASSIGN_AUTH_BY~TRN_TYPE~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~MODULE~EXTERNAL_TRAN_REF_NO~RELEASE_BY~MAKER_DT_STAMP~NEW_VERSION_INDICATOR~RATE_ASSIGNED_BY~ECA_STATUS~TXT_CONTRACT_STATUS~TXT_AUTH_STATUS~AUTHSTAT~TXNSTAT~CHECKERID~MAKERID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_LBVW_COLL_PARTICIPANT">CONTRACT_STATUS~LS_REF_NO~CONTRACT_REF_NO~DEPARTMENT_CODE~CUSIP_NO~PRODUCT_CODE~COUNTERPARTY~BRANCH~AUTH_STATUS~FACILITY_NAME~CONTRACT_TYPE~AVL_COLLATERAL_AMT</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_LBVW_COLL_PARTICIPANT">CONTRACT_STATUS~LS_REF_NO~CONTRACT_REF_NO~AUTH_STATUS~CUSIP_NO~AVL_COLLATERAL_AMT~FACILITY_NAME</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDCOLPT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LBVW_COLL_PARTICIPANT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_LBTBS_COLL_PARTICIPANT" : "BLK_OLTBS_CONTRACT~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT~1","BLK_LBVW_COLL_PARTICIPANT" : "BLK_OLTBS_CONTRACT~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_LBTBS_COLL_PARTICIPANT","BLK_OLTBS_CONTRACT_EVENT_LOG","BLK_LBVW_COLL_PARTICIPANT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDCOLPT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDCOLPT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LBTBS_COLL_PARTICIPANT":["COLLATERAL_AMOUNT","COLLATERAL_PERCENTAGE","OASYS_MNEMONIC","PARTICIPANT"]};
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
var lovInfoFlds = {"BLK_LBTBS_COLL_PARTICIPANT__PARTICIPANT__LOV_PARTICIPANT":["BLK_LBTBS_COLL_PARTICIPANT__PARTICIPANT~BLK_LBTBS_COLL_PARTICIPANT__TXT_PARTICIPANT_NAME~","BLK_OLTBS_CONTRACT__CONTRACT_REF_NO!VARCHAR2~BLK_OLTBS_CONTRACT__CONTRACT_REF_NO!VARCHAR2~BLK_OLTBS_CONTRACT__CONTRACT_REF_NO!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_COLL_PARTICIPANT");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_OLTBS_CONTRACT"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LBDCOLPT"]="KERNEL";
ArrPrntFunc["LBDCOLPT"]="";
ArrPrntOrigin["LBDCOLPT"]="";
ArrRoutingType["LBDCOLPT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDCOLPT"]="N";
ArrCustomModified["LBDCOLPT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLCONDET":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__LATEST_EVENT_SEQ_NO","OLDEVENT":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~"};
var scrArgVals = {"OLCONDET":"~","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":""};
var dpndntOnSrvs = {"OLCONDET":""};
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