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
**  File Name          : OLCSCHDT_SYS.js
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
var criteriaSearch  = '';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_CONTROL":"CONTRACTREFNO~USERREFNO~TXTCOUNTERPARTY~TXTPRODCODE~TXTPRODDESC~TXTCUSTDESC~TXTPRODTYPE~TXTVALUEDATE~TXTPAYMENTMETHOD~TXTMATTYP~TXTMODULE~TXTACTIONCODE~TXTMAINCOMP","BLK_SCHEDULE_SUMMARY":"TOTPAYRECVAMT~TOTADJAMT~TOTAMTSETTLED~TOTAMTDUE~DUEDATE~CONTRACTREFNO1~CURRAMTDUE~TXTDISAMOUNTDUE~TXTEXPECTEDBALANCE~TXTDISAMTSETTLED~TXTDISADJAMT~AMOUNT_DUE_ACTUAL","BLK_SCHEDULE_DETAILS":"DISCACCRAPPLICABLE~NOTCEVENTSEQNO~NOTCGEN~SGENXRATE~SGENAMOUNT~SGENACCCY~SGENACNO~SGENACBRANCH~COMPONENTTYPE~BILLEVTSEQNO~SCHPICKEDLIQ~MSGEVTSEQNO~SCHEDLINK~ADJUSTEDAMOUNT~BASISAMOUNTTAG~INFLOWOUTLOW~AMOUNTSETTLED~COUNTERPARTY~BRANCHACCDUE~ACCDUE~CURRENCYAMTDUE~AMOUNTDUE~DUEDATE1~COMPONENT~CONTRREFNO~TXTFIXEDAMTTAG~TXTBVADJAMT~TXTEXPBAL","BLK_AMOUNT_SETTLED":"EVTCODE~BASISAMOUNT~AMOUNTSETTLED~LCYEQUIVALENTSETTLED~BRANACCSETTLED~ACCSETTLED~CURRSETTLED~EVTSEQNO~PAIDDATE~DUEDATE2~COMPONENT~CONTREFNO~TXTINPUTDATE~TXTLCYEQUIVALENT~MAKERDTSTAMP","BLK_SCHEDULE_DATES":"EVTCODE~EVTSEQNO1~CONTRAREFNO","BLK_SCHEDULE_HIST_SUMMARY":"CURRAMOUNTDUE~TOTALADJUSTEDAMOUNT~TOTALAMOUNTSETTLED~TOTALAMOUNTDUE~DUEDAT~CONREFNO","BLK_SCHEDULE_HIST_DETAILS":"COMPONENTTYPE~ADJAMOUNT~BASISAMTTAG~INOUTFLOW~AMTSETTLED~CURRAMOUNTDUE~AMTDUE~DUDAT~COMPONENT~CONTRACTREFNUM~TXTEVENTSEQNO~TXTDATEOFCHANGE"};

var multipleEntryPageSize = {"BLK_SCHEDULE_SUMMARY" :"15" ,"BLK_SCHEDULE_DETAILS" :"15" ,"BLK_AMOUNT_SETTLED" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_SCHEDULED_SUMMARY__TAB_MAIN":"BLK_SCHEDULE_SUMMARY~BLK_SCHEDULE_DETAILS~BLK_AMOUNT_SETTLED"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTROL">CONTRACTREFNO~USERREFNO~TXTCOUNTERPARTY~TXTPRODCODE~TXTPRODDESC~TXTCUSTDESC~TXTPRODTYPE~TXTVALUEDATE~TXTPAYMENTMETHOD~TXTMATTYP~TXTMODULE~TXTACTIONCODE~TXTMAINCOMP</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTROL" RELATION_TYPE="N" TYPE="BLK_SCHEDULE_SUMMARY">TOTPAYRECVAMT~TOTADJAMT~TOTAMTSETTLED~TOTAMTDUE~DUEDATE~CONTRACTREFNO1~CURRAMTDUE~TXTDISAMOUNTDUE~TXTEXPECTEDBALANCE~TXTDISAMTSETTLED~TXTDISADJAMT~AMOUNT_DUE_ACTUAL</FN>'; 
msgxml += '      <FN PARENT="BLK_SCHEDULE_SUMMARY" RELATION_TYPE="N" TYPE="BLK_SCHEDULE_DETAILS">DISCACCRAPPLICABLE~NOTCEVENTSEQNO~NOTCGEN~SGENXRATE~SGENAMOUNT~SGENACCCY~SGENACNO~SGENACBRANCH~COMPONENTTYPE~BILLEVTSEQNO~SCHPICKEDLIQ~MSGEVTSEQNO~SCHEDLINK~ADJUSTEDAMOUNT~BASISAMOUNTTAG~INFLOWOUTLOW~AMOUNTSETTLED~COUNTERPARTY~BRANCHACCDUE~ACCDUE~CURRENCYAMTDUE~AMOUNTDUE~DUEDATE1~COMPONENT~CONTRREFNO~TXTFIXEDAMTTAG~TXTBVADJAMT~TXTEXPBAL</FN>'; 
msgxml += '      <FN PARENT="BLK_SCHEDULE_DETAILS" RELATION_TYPE="N" TYPE="BLK_AMOUNT_SETTLED">EVTCODE~BASISAMOUNT~AMOUNTSETTLED~LCYEQUIVALENTSETTLED~BRANACCSETTLED~ACCSETTLED~CURRSETTLED~EVTSEQNO~PAIDDATE~DUEDATE2~COMPONENT~CONTREFNO~TXTINPUTDATE~TXTLCYEQUIVALENT~MAKERDTSTAMP</FN>'; 
msgxml += '      <FN PARENT="BLK_SCHEDULE_SUMMARY" RELATION_TYPE="N" TYPE="BLK_SCHEDULE_DATES">EVTCODE~EVTSEQNO1~CONTRAREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_SCHEDULE_SUMMARY" RELATION_TYPE="N" TYPE="BLK_SCHEDULE_HIST_SUMMARY">CURRAMOUNTDUE~TOTALADJUSTEDAMOUNT~TOTALAMOUNTSETTLED~TOTALAMOUNTDUE~DUEDAT~CONREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_SCHEDULE_HIST_SUMMARY" RELATION_TYPE="N" TYPE="BLK_SCHEDULE_HIST_DETAILS">COMPONENTTYPE~ADJAMOUNT~BASISAMTTAG~INOUTFLOW~AMTSETTLED~CURRAMOUNTDUE~AMTDUE~DUDAT~COMPONENT~CONTRACTREFNUM~TXTEVENTSEQNO~TXTDATEOFCHANGE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_SCHEDULED_SUMMARY";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTROL" : "","BLK_SCHEDULE_SUMMARY" : "BLK_CONTROL~N","BLK_SCHEDULE_DETAILS" : "BLK_SCHEDULE_SUMMARY~N","BLK_AMOUNT_SETTLED" : "BLK_SCHEDULE_DETAILS~N","BLK_SCHEDULE_DATES" : "BLK_SCHEDULE_SUMMARY~N","BLK_SCHEDULE_HIST_SUMMARY" : "BLK_SCHEDULE_SUMMARY~N","BLK_SCHEDULE_HIST_DETAILS" : "BLK_SCHEDULE_HIST_SUMMARY~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTROL","BLK_SCHEDULE_SUMMARY","BLK_SCHEDULE_DETAILS","BLK_AMOUNT_SETTLED","BLK_SCHEDULE_DATES","BLK_SCHEDULE_HIST_SUMMARY","BLK_SCHEDULE_HIST_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCSCHDT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCSCHDT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTROL__CONTRACTREFNO";
pkFields[0] = "BLK_CONTROL__CONTRACTREFNO";
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
var lovInfoFlds = {};
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
var multipleEntryIDs = new Array("BLK_SCHEDULE_SUMMARY","BLK_SCHEDULE_DETAILS","BLK_AMOUNT_SETTLED");
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

ArrFuncOrigin["OLCSCHDT"]="KERNEL";
ArrPrntFunc["OLCSCHDT"]="";
ArrPrntOrigin["OLCSCHDT"]="";
ArrRoutingType["OLCSCHDT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCSCHDT"]="N";
ArrCustomModified["OLCSCHDT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_SCHEDULED_SUMMARY":"PRODTYPE~CONTRACTREFNO~VALUEDATE~PAYMENTMETHOD~MATURITYTYP~MODULE~ACTIONCODE~MAINCOMP"};
var scrArgSource = {};
var scrArgVals = {"CVS_SCHEDULED_SUMMARY":"~~~~~~~"};
var scrArgDest = {"CVS_SCHEDULED_SUMMARY":"BLK_CONTROL__TXTPRODTYPE~BLK_CONTROL__CONTRACTREFNO~BLK_CONTROL__TXTVALUEDATE~BLK_CONTROL__TXTPAYMENTMETHOD~BLK_CONTROL__TXTMATTYP~BLK_CONTROL__TXTMODULE~BLK_CONTROL__TXTACTIONCODE~BLK_CONTROL__TXTMAINCOMP"};
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
var actStageArry = {"QUERY":"1","NEW":"1","MODIFY":"1","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------