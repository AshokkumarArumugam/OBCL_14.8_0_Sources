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
**  File Name          : LBDPRPMT_SYS.js
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
var fieldNameArray = {"BLK_LBTB_PR_MASTER":"CONTRACTREFNO~EVENTSEQNO~PAYMENTEVENTSEQNO~EVENTCODE~EVENTDATE~PAIDDATE~PAYMENTSTATUS~SOURCEREFNO~TXTPAYMENTSTAT~AMOUNTSUM","BLK_LBTB_PR_DETAIL":"CONTRACTREFNO~EVENTSEQNO~PAYMENTEVENTSEQNO~COMPONENT~SOURCEREFNO","BLK_LBTB_PR_AMOUNT_PAID":"EVENTSEQNO~PAYMENTEVENTSEQNO~COMPONENT~PAIDDATE~PARTYINVOLVED~EVENTCODE~PARTYTYPE~CURRENCY~AMOUNTSETTLED~TAXAMOUNT~ACCOUNTSETTLED~PAYRECVIND~TAXAPPLICABLE~PARTLIQDSTATUS~EXCHANGERATE~LCYEQUIVALENTSETTLED~PARTPAYMENTESN~SOURCEREFNO~CONTRACTREFNO~TXTPAYRECV","BLK_OLTBS_CONTRACT_EVENT_LOG":"MODULE~CONTRACTREFNO~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~EVENTSEQNO~EVENTDATE~EVENTCODE~CONTRACTSTATUS~AUTHSTATUS~TXTAUTHSTATUS","BLK_BORROWER_DETAIL":"EVENTSEQNO~TXT_CON_CCY~PAYMENTEVENTSEQNO~COMPONENT~CURRENCY~PAIDDATE~PARTYINVOLVED~PARTYTYPE~SOURCEREFNO~CONTRACTREFNO~BORROWER~TXTPAYRECV~AMOUNTDUE~PAYRECV"};

var multipleEntryPageSize = {"BLK_LBTB_PR_DETAIL" :"15" ,"BLK_LBTB_PR_AMOUNT_PAID" :"15" };

var multipleEntrySVBlocks = "BLK_BORROWER_DETAIL";

var tabMEBlks = {"CVS_PAYMENT__TAB_MAIN":"BLK_LBTB_PR_DETAIL~BLK_LBTB_PR_AMOUNT_PAID"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTB_PR_MASTER">CONTRACTREFNO~EVENTSEQNO~PAYMENTEVENTSEQNO~EVENTCODE~EVENTDATE~PAIDDATE~PAYMENTSTATUS~SOURCEREFNO~TXTPAYMENTSTAT~AMOUNTSUM</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTB_PR_MASTER" RELATION_TYPE="N" TYPE="BLK_LBTB_PR_DETAIL">CONTRACTREFNO~EVENTSEQNO~PAYMENTEVENTSEQNO~COMPONENT~SOURCEREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTB_PR_DETAIL" RELATION_TYPE="N" TYPE="BLK_LBTB_PR_AMOUNT_PAID">EVENTSEQNO~PAYMENTEVENTSEQNO~COMPONENT~PAIDDATE~PARTYINVOLVED~EVENTCODE~PARTYTYPE~CURRENCY~AMOUNTSETTLED~TAXAMOUNT~ACCOUNTSETTLED~PAYRECVIND~TAXAPPLICABLE~PARTLIQDSTATUS~EXCHANGERATE~LCYEQUIVALENTSETTLED~PARTPAYMENTESN~SOURCEREFNO~CONTRACTREFNO~TXTPAYRECV</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTB_PR_MASTER" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">MODULE~CONTRACTREFNO~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~EVENTSEQNO~EVENTDATE~EVENTCODE~CONTRACTSTATUS~AUTHSTATUS~TXTAUTHSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTB_PR_DETAIL" RELATION_TYPE="N" TYPE="BLK_BORROWER_DETAIL">EVENTSEQNO~TXT_CON_CCY~PAYMENTEVENTSEQNO~COMPONENT~CURRENCY~PAIDDATE~PARTYINVOLVED~PARTYTYPE~SOURCEREFNO~CONTRACTREFNO~BORROWER~TXTPAYRECV~AMOUNTDUE~PAYRECV</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PAYMENT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTB_PR_MASTER">CONTRACTREFNO~SOURCEREFNO~EVENTSEQNO~EVENTCODE~EVENTDATE~PAYMENTEVENTSEQNO~PAIDDATE~PAYMENTSTATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDPRPMT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LBTB_PR_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBTB_PR_MASTER" : "","BLK_LBTB_PR_DETAIL" : "BLK_LBTB_PR_MASTER~N","BLK_LBTB_PR_AMOUNT_PAID" : "BLK_LBTB_PR_DETAIL~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_LBTB_PR_MASTER~1","BLK_BORROWER_DETAIL" : "BLK_LBTB_PR_DETAIL~N"}; 

 var dataSrcLocationArray = new Array("BLK_LBTB_PR_MASTER","BLK_LBTB_PR_DETAIL","BLK_LBTB_PR_AMOUNT_PAID","BLK_OLTBS_CONTRACT_EVENT_LOG","BLK_BORROWER_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDPRPMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDPRPMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBTB_PR_MASTER__SOURCEREFNO";
pkFields[0] = "BLK_LBTB_PR_MASTER__SOURCEREFNO";
queryFields[1] = "BLK_LBTB_PR_MASTER__PAYMENTEVENTSEQNO";
pkFields[1] = "BLK_LBTB_PR_MASTER__PAYMENTEVENTSEQNO";
queryFields[2] = "BLK_LBTB_PR_MASTER__EVENTSEQNO";
pkFields[2] = "BLK_LBTB_PR_MASTER__EVENTSEQNO";
queryFields[3] = "BLK_LBTB_PR_MASTER__CONTRACTREFNO";
pkFields[3] = "BLK_LBTB_PR_MASTER__CONTRACTREFNO";
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
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_LBTB_PR_MASTER":["EVENTCODE"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_LBTB_PR_MASTER__CONTRACTREFNO__LOV_DUE_CONTRACT":["~BLK_LBTB_PR_MASTER__CONTRACTREFNO~BLK_LBTB_PR_MASTER__SOURCEREFNO~","","N~N~N","N"],"BLK_LBTB_PR_MASTER__EVENTCODE__LOV_EVENT":["BLK_LBTB_PR_MASTER__EVENTSEQNO~BLK_LBTB_PR_MASTER__EVENTCODE~","BLK_LBTB_PR_MASTER__CONTRACTREFNO!","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTB_PR_DETAIL","BLK_LBTB_PR_AMOUNT_PAID");
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

ArrFuncOrigin["LBDPRPMT"]="KERNEL";
ArrPrntFunc["LBDPRPMT"]="";
ArrPrntOrigin["LBDPRPMT"]="";
ArrRoutingType["LBDPRPMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDPRPMT"]="N";
ArrCustomModified["LBDPRPMT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PAYMENT":"CONREFNO~SOURCEREFNO~EVENTCODE~EVENTSEQNO~EVENTDATE~ACTION_CODE","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLDEVENT":"BLK_LBTB_PR_MASTER__CONTRACTREFNO~"};
var scrArgVals = {"CVS_PAYMENT":"~~~~~EXECUTEQUERY","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_PAYMENT":"BLK_LBTB_PR_MASTER__CONTRACTREFNO~BLK_LBTB_PR_MASTER__SOURCEREFNO~BLK_LBTB_PR_MASTER__EVENTCODE~BLK_LBTB_PR_MASTER__EVENTSEQNO~BLK_LBTB_PR_MASTER__EVENTDATE~"};
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