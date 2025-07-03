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
**  File Name          : LBDTXREF_SYS.js
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
var fieldNameArray = {"BLK_TAX_REFUND_MASTER":"BORROWERCONTRACTREFNO~EVENTSEQNO~PARTICIPANTREFNO~CUSTOMERNO~REFUNDSTATUS~TXT_CUSTOMER_NAME~CURRENT_PMT~TOTAL_PMTS~LATESTEVENTSEQNO~AUTHSTAT","BLK_TAX_REFUND_SUMMARY":"PARTICIPANTREFNO~EVENTSEQNO~BORROWERCONTRACTREFNO~TAXRULE~BASISCOMPONENT~CURRENCY~TAXAMOUNT","BLK_TXTB_TAX_REFUND_DETAIL":"PARTICIPANTREFNO~EVENTSEQNO~BORROWERCONTRACTREFNO~TAXRULE~TAXDUEDATE~TAXCOLLECTIONDATE~AMOUNTDUE~AMOUNTSETTLED","BLK_AUDIT":"CONTRACTREFNO~EVENTSEQNO~EVENTDATE~EVENTCODE~MAKERID~MAKERDTSTAMP~MODULE~NEWVERSIONINDICATOR~CHECKERID~CHECKERDTSTAMP~TXNSTAT~AUTHSTAT~WORKFLOWSTATUS~REVERSEDEVENTSEQNO~EVENTVALUEDATE~ECASTATUS~RATEREVISIONSTATUS~RELEASEBY~RELEASEDTSTAMP~RATEASSIGNEDBY~RATEASSIGNDTSTAMP~RATEASSIGNAUTHBY~RATEASSIGNAUTHDTSTAMP~INFORMSTATUS","BLK_VIEW_OLTBS_CONTRACT_OVD":"CONTRACTREFNO~EVENTSEQNO~OVDSEQNO~ERRCODE~MODULE~PARAMETERS~OVD_MESG","BLK_OLVWS_ACC_EVENTS":"ACBRANCH~ACNO~DRCRIND~AMOUNTTAG~ACCCY~EXCHRATE~LCYAMOUNT~TRNDT~VALUEDT~TRNCODE~FCYAMOUNT~GAAP~TRNREFNO~EVENTSRNO~EVENT","BLK_OLVWS_ALL_EVENTS_A":"BRANCH~ACCOUNT~GAAP~CURRENCY~DRCRIND~RATE~LCY~DATE~VALUEDT~AMOUNTTAG~FCYAMT~TRNCODE","BLK_EVENTS":"CONTRACTREFNO~EVENTSEQNO~EVENTDATE~EVENTCODE"};

var multipleEntryPageSize = {"BLK_TAX_REFUND_SUMMARY" :"15" ,"BLK_TXTB_TAX_REFUND_DETAIL" :"15" ,"BLK_OLVWS_ACC_EVENTS" :"15" ,"BLK_OLVWS_ALL_EVENTS_A" :"15" ,"BLK_VIEW_OLTBS_CONTRACT_OVD" :"15" ,"BLK_EVENTS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_REFUND__TAB_MAIN":"BLK_TAX_REFUND_SUMMARY~BLK_TXTB_TAX_REFUND_DETAIL","CVS_ACC_STACKED__TAB_MAIN":"BLK_OLVWS_ACC_EVENTS","CVS_VIEW_ENTRIES__TAB_HEADER":"BLK_OLVWS_ALL_EVENTS_A","CVS_VIEW_ENTRIES__TAB_MAIN":"BLK_VIEW_OLTBS_CONTRACT_OVD","CVS_VIEW_EVENTS__TAB_MAIN":"BLK_EVENTS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TAX_REFUND_MASTER">BORROWERCONTRACTREFNO~EVENTSEQNO~PARTICIPANTREFNO~CUSTOMERNO~REFUNDSTATUS~TXT_CUSTOMER_NAME~CURRENT_PMT~TOTAL_PMTS~LATESTEVENTSEQNO~AUTHSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_TAX_REFUND_MASTER" RELATION_TYPE="N" TYPE="BLK_TAX_REFUND_SUMMARY">PARTICIPANTREFNO~EVENTSEQNO~BORROWERCONTRACTREFNO~TAXRULE~BASISCOMPONENT~CURRENCY~TAXAMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_TAX_REFUND_SUMMARY" RELATION_TYPE="N" TYPE="BLK_TXTB_TAX_REFUND_DETAIL">PARTICIPANTREFNO~EVENTSEQNO~BORROWERCONTRACTREFNO~TAXRULE~TAXDUEDATE~TAXCOLLECTIONDATE~AMOUNTDUE~AMOUNTSETTLED</FN>'; 
msgxml += '      <FN PARENT="BLK_TAX_REFUND_MASTER" RELATION_TYPE="1" TYPE="BLK_AUDIT">CONTRACTREFNO~EVENTSEQNO~EVENTDATE~EVENTCODE~MAKERID~MAKERDTSTAMP~MODULE~NEWVERSIONINDICATOR~CHECKERID~CHECKERDTSTAMP~TXNSTAT~AUTHSTAT~WORKFLOWSTATUS~REVERSEDEVENTSEQNO~EVENTVALUEDATE~ECASTATUS~RATEREVISIONSTATUS~RELEASEBY~RELEASEDTSTAMP~RATEASSIGNEDBY~RATEASSIGNDTSTAMP~RATEASSIGNAUTHBY~RATEASSIGNAUTHDTSTAMP~INFORMSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_AUDIT" RELATION_TYPE="N" TYPE="BLK_VIEW_OLTBS_CONTRACT_OVD">CONTRACTREFNO~EVENTSEQNO~OVDSEQNO~ERRCODE~MODULE~PARAMETERS~OVD_MESG</FN>'; 
msgxml += '      <FN PARENT="BLK_AUDIT" RELATION_TYPE="N" TYPE="BLK_OLVWS_ACC_EVENTS">ACBRANCH~ACNO~DRCRIND~AMOUNTTAG~ACCCY~EXCHRATE~LCYAMOUNT~TRNDT~VALUEDT~TRNCODE~FCYAMOUNT~GAAP~TRNREFNO~EVENTSRNO~EVENT</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="N" TYPE="BLK_OLVWS_ALL_EVENTS_A">BRANCH~ACCOUNT~GAAP~CURRENCY~DRCRIND~RATE~LCY~DATE~VALUEDT~AMOUNTTAG~FCYAMT~TRNCODE</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="N" TYPE="BLK_EVENTS">CONTRACTREFNO~EVENTSEQNO~EVENTDATE~EVENTCODE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_REFUND";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TAX_REFUND_MASTER">BORROWERCONTRACTREFNO~EVENTSEQNO~PARTICIPANTREFNO~CUSTOMERNO~REFUNDSTATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDTXREF";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TAX_REFUND_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TAX_REFUND_MASTER" : "","BLK_TAX_REFUND_SUMMARY" : "BLK_TAX_REFUND_MASTER~N","BLK_TXTB_TAX_REFUND_DETAIL" : "BLK_TAX_REFUND_SUMMARY~N","BLK_AUDIT" : "BLK_TAX_REFUND_MASTER~1","BLK_VIEW_OLTBS_CONTRACT_OVD" : "BLK_AUDIT~N","BLK_OLVWS_ACC_EVENTS" : "BLK_AUDIT~N","BLK_OLVWS_ALL_EVENTS_A" : "","BLK_EVENTS" : ""}; 

 var dataSrcLocationArray = new Array("BLK_TAX_REFUND_MASTER","BLK_TAX_REFUND_SUMMARY","BLK_TXTB_TAX_REFUND_DETAIL","BLK_AUDIT","BLK_VIEW_OLTBS_CONTRACT_OVD","BLK_OLVWS_ACC_EVENTS","BLK_OLVWS_ALL_EVENTS_A","BLK_EVENTS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDTXREF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDTXREF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TAX_REFUND_MASTER__BORROWERCONTRACTREFNO";
pkFields[0] = "BLK_TAX_REFUND_MASTER__BORROWERCONTRACTREFNO";
queryFields[1] = "BLK_TAX_REFUND_MASTER__PARTICIPANTREFNO";
pkFields[1] = "BLK_TAX_REFUND_MASTER__PARTICIPANTREFNO";
queryFields[2] = "BLK_TAX_REFUND_MASTER__EVENTSEQNO";
pkFields[2] = "BLK_TAX_REFUND_MASTER__EVENTSEQNO";
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
var lovInfoFlds = {"BLK_TAX_REFUND_MASTER__BORROWERCONTRACTREFNO__LOV_BORROWERREFNO":["BLK_TAX_REFUND_MASTER__BORROWERCONTRACTREFNO~","","N","N"],"BLK_TAX_REFUND_MASTER__PARTICIPANTREFNO__LOV_PART_CONTRACTS":["BLK_TAX_REFUND_MASTER__CUSTOMERNO~BLK_TAX_REFUND_MASTER__PARTICIPANTREFNO~BLK_TAX_REFUND_MASTER__TXT_CUSTOMER_NAME~BLK_TAX_REFUND_MASTER__EVENTSEQNO~","BLK_TAX_REFUND_MASTER__BORROWERCONTRACTREFNO!VARCHAR2","N~N~N~N","N"]};
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
var multipleEntryIDs = new Array("BLK_TAX_REFUND_SUMMARY","BLK_TXTB_TAX_REFUND_DETAIL","BLK_OLVWS_ACC_EVENTS","BLK_OLVWS_ALL_EVENTS_A","BLK_VIEW_OLTBS_CONTRACT_OVD","BLK_EVENTS");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_TAX_REFUND_MASTER","LBCFPMLS~BLK_OLTBS_CONTRACT"); 

 var CallFormRelat=new Array("TXTBS_TAX_REFUND_MASTER.PARTICIPANT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO=LBTBS_CONT_MEDIA_FOR_ALL_PART.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LBDTXREF"]="KERNEL";
ArrPrntFunc["LBDTXREF"]="";
ArrPrntOrigin["LBDTXREF"]="";
ArrRoutingType["LBDTXREF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDTXREF"]="N";
ArrCustomModified["LBDTXREF"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN","LBCFPMLS":"CONTRACT_REF_NO~EVENT_SEQ_NO","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLCONDET":"BLK_TAX_REFUND_MASTER__PARTICIPANTREFNO~BLK_TAX_REFUND_MASTER__EVENTSEQNO","LBCFPMLS":"BLK_OLTBS_CONTRACT__CONTRACTREFNO~BLK_TAX_REFUND_MASTER__EVENTSEQNO","OLDEVENT":"BLK_TAX_REFUND_MASTER__BORROWERCONTRACTREFNO~"};
var scrArgVals = {"OLCONDET":"~","LBCFPMLS":"~","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":"","LBCFPMLS":""};
var dpndntOnSrvs = {"OLCONDET":"","LBCFPMLS":""};
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