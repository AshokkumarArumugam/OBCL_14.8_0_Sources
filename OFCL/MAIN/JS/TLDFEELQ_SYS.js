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
**  File Name          : TLDFEELQ_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"CONTRACT_REF_NO~USER_REF_NO~BRANCH~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~COUNTERPARTY~CONTRACT_STATUS~AUTH_STATUS~PRODUCT_CODE~CURRENT_PMT~TOTAL_PMTS~TXTVERSIONCHK~MODULE","BLK_TLTBS_CONTRACT_MASTER":"CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~DESK_CODE~EXPENSE_CODE~PORTFOLIO~POSITION_QUALIFIER~POSITION_IDENTIFIER~CUSIP_NO~TICKET_ID~TXT_PORTFOLIO_DESC~BROKER_ID~CURRENCY~TRADE_DATE~EXPT_SETTL_DATE~TRADE_AMOUNT~TRADE_PRICE","BLK_TLTBS_FEE_LIQD_MASTER":"CONTRACT_REF_NO~EVENT_SEQ_NO~VALUEDATE~PAYMENT_STATUS~SUBSYSSTAT","BLK_TLTBS_FEE_LIQD_DETAIL":"CONTRACT_REF_NO~EVENT_SEQ_NO~COMPONENT~COMPONENT_CCY~AMOUNT_DUE~AMOUNT_PAID~AMOUNT_TO_SETTLE~LIQUIDATE","BLK_OLTBS_CONTRACT_EVENT_LOG":"CONTRACT_REF_NO~EVENT_SEQ_NO~TXT_AUTH_STATUS~TXT_CONTRACT_STATUS~REV_MAKER_ID~REV_MAKER_DT_STAMP~REV_CHECKER_ID~REV_CHECKER_DT_STAMP~REV_AUTH_STAT~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~TXNSTAT~AUTHSTAT"};

var multipleEntryPageSize = {"BLK_TLTBS_FEE_LIQD_DETAIL" :"15" ,"BLK_OLTBS_CONTRACT_EVENT_LOG" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_TLTBS_FEE_LIQD_DETAIL","CVS_MAIN__TAB_FOOTER":"BLK_OLTBS_CONTRACT_EVENT_LOG"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONTRACT_REF_NO~USER_REF_NO~BRANCH~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~COUNTERPARTY~CONTRACT_STATUS~AUTH_STATUS~PRODUCT_CODE~CURRENT_PMT~TOTAL_PMTS~TXTVERSIONCHK~MODULE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_TLTBS_CONTRACT_MASTER">CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~DESK_CODE~EXPENSE_CODE~PORTFOLIO~POSITION_QUALIFIER~POSITION_IDENTIFIER~CUSIP_NO~TICKET_ID~TXT_PORTFOLIO_DESC~BROKER_ID~CURRENCY~TRADE_DATE~EXPT_SETTL_DATE~TRADE_AMOUNT~TRADE_PRICE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_TLTBS_FEE_LIQD_MASTER">CONTRACT_REF_NO~EVENT_SEQ_NO~VALUEDATE~PAYMENT_STATUS~SUBSYSSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_FEE_LIQD_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTBS_FEE_LIQD_DETAIL">CONTRACT_REF_NO~EVENT_SEQ_NO~COMPONENT~COMPONENT_CCY~AMOUNT_DUE~AMOUNT_PAID~AMOUNT_TO_SETTLE~LIQUIDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_FEE_LIQD_MASTER" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">CONTRACT_REF_NO~EVENT_SEQ_NO~TXT_AUTH_STATUS~TXT_CONTRACT_STATUS~REV_MAKER_ID~REV_MAKER_DT_STAMP~REV_CHECKER_ID~REV_CHECKER_DT_STAMP~REV_AUTH_STAT~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~TXNSTAT~AUTHSTAT</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONTRACT_REF_NO~USER_REF_NO~BRANCH~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~COUNTERPARTY~CONTRACT_STATUS~AUTH_STATUS~PRODUCT_CODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDFEELQ";
var defaultWhereClause = "MODULE_CODE ='TL' AND BRANCH=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_CONTRACT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_TLTBS_CONTRACT_MASTER" : "BLK_OLTBS_CONTRACT~1","BLK_TLTBS_FEE_LIQD_MASTER" : "BLK_OLTBS_CONTRACT~1","BLK_TLTBS_FEE_LIQD_DETAIL" : "BLK_TLTBS_FEE_LIQD_MASTER~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_TLTBS_FEE_LIQD_MASTER~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_TLTBS_CONTRACT_MASTER","BLK_TLTBS_FEE_LIQD_MASTER","BLK_TLTBS_FEE_LIQD_DETAIL","BLK_OLTBS_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDFEELQ.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDFEELQ.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO__LOV_CONTTRACT":["BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__USER_REF_NO~BLK_OLTBS_CONTRACT__BRANCH~BLK_TLTBS_CONTRACT_MASTER__DESK_CODE~BLK_TLTBS_CONTRACT_MASTER__EXPENSE_CODE~BLK_TLTBS_CONTRACT_MASTER__PORTFOLIO~BLK_TLTBS_CONTRACT_MASTER__TXT_PORTFOLIO_DESC~BLK_TLTBS_CONTRACT_MASTER__POSITION_QUALIFIER~BLK_TLTBS_CONTRACT_MASTER__POSITION_IDENTIFIER~BLK_TLTBS_CONTRACT_MASTER__CUSIP_NO~BLK_TLTBS_CONTRACT_MASTER__TICKET_ID~BLK_TLTBS_CONTRACT_MASTER__CURRENCY~BLK_OLTBS_CONTRACT__CURRENT_PMT~BLK_OLTBS_CONTRACT__TOTAL_PMTS~","","N~N~N~N~N~N~N~N~N~N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TLTBS_FEE_LIQD_DETAIL");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_TLTBS_FEE_LIQD_MASTER"); 

 var CallFormRelat=new Array("TLTBS_FEE_LIQD_MASTER.CONTRACT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO AND TLTBS_FEE_LIQD_MASTER.EVENT_SEQ_NO = OLTBS_CONTRACT__SETT.LATEST_EVENT_SEQ_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDFEELQ"]="KERNEL";
ArrPrntFunc["TLDFEELQ"]="";
ArrPrntOrigin["TLDFEELQ"]="";
ArrRoutingType["TLDFEELQ"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDFEELQ"]="N";
ArrCustomModified["TLDFEELQ"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN","OLDEVENT":"CONTREF~ACTION_CODE~"};
var scrArgSource = {"OLCONDET":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__LATEST_EVENT_SEQ_NO","OLDEVENT":"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~~"};
var scrArgVals = {"OLCONDET":"~","OLDEVENT":"~EXECUTEQUERY~"};
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