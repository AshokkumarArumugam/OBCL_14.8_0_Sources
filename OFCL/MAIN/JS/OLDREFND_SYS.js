/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : OLDREFND_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"USERDEFINEDSTATUS~MODULECODE~CURREVENTCODE~PRDTP~TEMPLATESTATUS~AUTHSTAT~CONSTAT~COUNTERPARTY~PRDCD~BRANCH~LATVERNO~USEREFNO~LATEVNSEQNO~BOOKDATE~CONREFNO~RELATEDREFNO~WORKFLOWSTATUS~RATEREVISIONSTATUS~TREASURYSOURCE~ECASTATUS~LIABILITYCIF~RESPONSESTAT~SUPRESSBVPAYMENTMSG1~SUPRESSBVPAYMENTMSG~DEPARTMENTCODE~CUSTOMREFNO~EXTREFNO~LATESTEVENTDATE~CONTCCY~CURRENTPMT~TOTALPMTS~CURRENT_EVENT_SEQ_NO","BLK_OLTBS_CONTRACT_REFUND_SUMMARY":"REMARKS~TOTALREFUND~REFUNDVALUEDATE~REFUNDESN~CONTRACTREFNO~SUBSYSSTAT","BLK_OLTBS_CONTRACT_REFUND":"AMOUNTOVERPAID~REFUNDSTATUS~REFUNDAMT~AMOUNTPAID~AMOUNTDUE~DUEDATE~COMPONENT~REFUNDESN~LIQEVENTSEQNO~CONTRACTREFNO~TXTTOTALREFUNDAMT","BLK_OLTBS_CONTRACT_EVENT_LOG":"TRNTYPE~INFORMSTATUS~RATE_ASSIGNAUTHDTSTAMP~RATEASSIGNAUTHBY~RATEASSIGNDTSTAMP~RATEASSIGNEDBY~RELEASEDTSTAMP~RELEASEBY~RATEREVISIONSTATUS~WORKFLOWSTATUS~ECASTATUS~EVENTVALUEDATE~REVERSEDEVENTSEQNO~NEWVERSIONINDICATOR~TXNSTAT~EVENTCODE~EVENTDATE~EVENTSEQNO~CONTRACTREFNO~MODULE~AUTHSTAT~CHECKERDTST~CHECKERID~MAKERDTST~MAKERID"};

var multipleEntryPageSize = {"BLK_OLTBS_CONTRACT_REFUND" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTBS_CONTRACT_REFUND"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">USERDEFINEDSTATUS~MODULECODE~CURREVENTCODE~PRDTP~TEMPLATESTATUS~AUTHSTAT~CONSTAT~COUNTERPARTY~PRDCD~BRANCH~LATVERNO~USEREFNO~LATEVNSEQNO~BOOKDATE~CONREFNO~RELATEDREFNO~WORKFLOWSTATUS~RATEREVISIONSTATUS~TREASURYSOURCE~ECASTATUS~LIABILITYCIF~RESPONSESTAT~SUPRESSBVPAYMENTMSG1~SUPRESSBVPAYMENTMSG~DEPARTMENTCODE~CUSTOMREFNO~EXTREFNO~LATESTEVENTDATE~CONTCCY~CURRENTPMT~TOTALPMTS~CURRENT_EVENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_REFUND_SUMMARY">REMARKS~TOTALREFUND~REFUNDVALUEDATE~REFUNDESN~CONTRACTREFNO~SUBSYSSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_REFUND_SUMMARY" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_REFUND">AMOUNTOVERPAID~REFUNDSTATUS~REFUNDAMT~AMOUNTPAID~AMOUNTDUE~DUEDATE~COMPONENT~REFUNDESN~LIQEVENTSEQNO~CONTRACTREFNO~TXTTOTALREFUNDAMT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">TRNTYPE~INFORMSTATUS~RATE_ASSIGNAUTHDTSTAMP~RATEASSIGNAUTHBY~RATEASSIGNDTSTAMP~RATEASSIGNEDBY~RELEASEDTSTAMP~RELEASEBY~RATEREVISIONSTATUS~WORKFLOWSTATUS~ECASTATUS~EVENTVALUEDATE~REVERSEDEVENTSEQNO~NEWVERSIONINDICATOR~TXNSTAT~EVENTCODE~EVENTDATE~EVENTSEQNO~CONTRACTREFNO~MODULE~AUTHSTAT~CHECKERDTST~CHECKERID~MAKERDTST~MAKERID</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">PRDCD~CUSTOMREFNO~BRANCH~CONREFNO~AUTHSTAT~CONSTAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDREFND";
var defaultWhereClause = "BRANCH = GLOBAL.CURRENT_BRANCH AND EXISTS (SELECT 1 FROM OLTB_CONTRACT_REFUND WHERE CONTRACT_REF_NO = SUMMARYDSN.CONTRACT_REF_NO) and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(SUMMARYDSN.CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="EXISTS (SELECT 1 FROM OLTB_CONTRACT_REFUND WHERE CONTRACT_REF_NO = SUMMARYDSN.CONTRACT_REF_NO)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_CONTRACT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_OLTBS_CONTRACT_REFUND_SUMMARY" : "BLK_OLTBS_CONTRACT~1","BLK_OLTBS_CONTRACT_REFUND" : "BLK_OLTBS_CONTRACT_REFUND_SUMMARY~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_OLTBS_CONTRACT_REFUND_SUMMARY","BLK_OLTBS_CONTRACT_REFUND","BLK_OLTBS_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDREFND.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDREFND.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONREFNO";
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__CONREFNO__LOV_CONTRACT_REF_NO":["BLK_OLTBS_CONTRACT__CONREFNO~BLK_OLTBS_CONTRACT__USEREFNO~BLK_OLTBS_CONTRACT__BRANCH~BLK_OLTBS_CONTRACT__CONTCCY~BLK_OLTBS_CONTRACT__COUNTERPARTY~BLK_OLTBS_CONTRACT__TREASURYSOURCE~BLK_OLTBS_CONTRACT__BOOKDATE~BLK_OLTBS_CONTRACT__DEPARTMENTCODE~BLK_OLTBS_CONTRACT__USERDEFINEDSTATUS~BLK_OLTBS_CONTRACT__LATEVNSEQNO~","","N~N~N~N~N~N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_CONTRACT_REFUND");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_OLTBS_CONTRACT"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__SETT.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDREFND"]="KERNEL";
ArrPrntFunc["OLDREFND"]="";
ArrPrntOrigin["OLDREFND"]="";
ArrRoutingType["OLDREFND"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDREFND"]="N";
ArrCustomModified["OLDREFND"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN"};
var scrArgSource = {"OLCONDET":"BLK_OLTBS_CONTRACT__CONREFNO~"};
var scrArgVals = {"OLCONDET":"~"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"2","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------