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
**  File Name          : LBDPRDET_SYS.js
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
var fieldNameArray = {"BLK_LBTBS_PR_DUE_SUMMARY":"CONTRACTREFNO~EVENTCODE~EVENTDATE~SOURCEREFNO~SETTLEDSTATUS~EVENTSEQNO~TXTSETTLEDSTAT","BLK_LBVWS_PR_COMPS":"CONTRACTREFNO~COMPONENTDESC~COMPONENT~EVENTSEQNO~SOURCEREFNO","BLK_LBTBS_PR_AMOUNT_DUE":"PAYRECVIND~PARTYINVOLVED~AMOUNTDUE~COMPONENT~TAXAMOUNT~SETTLEDSTATUS~CONTRACTREFNO~TAXAPPLICABLE~SOURCEREFNO~AMOUNTSETTLED~PARTYTYPE~CURRENCY~EVENTCODE~EVENTSEQNO~EVENTDATE~PARTREFNO~TXTSETTLEDSTAT~TXTPAYREC~TXTPARTYTPE"};

var multipleEntryPageSize = {"BLK_LBVWS_PR_COMPS" :"15" ,"BLK_LBTBS_PR_AMOUNT_DUE" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_DUE_DETAILS__TAB_MAIN":"BLK_LBVWS_PR_COMPS~BLK_LBTBS_PR_AMOUNT_DUE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTBS_PR_DUE_SUMMARY">CONTRACTREFNO~EVENTCODE~EVENTDATE~SOURCEREFNO~SETTLEDSTATUS~EVENTSEQNO~TXTSETTLEDSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_PR_DUE_SUMMARY" RELATION_TYPE="N" TYPE="BLK_LBVWS_PR_COMPS">CONTRACTREFNO~COMPONENTDESC~COMPONENT~EVENTSEQNO~SOURCEREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBVWS_PR_COMPS" RELATION_TYPE="N" TYPE="BLK_LBTBS_PR_AMOUNT_DUE">PAYRECVIND~PARTYINVOLVED~AMOUNTDUE~COMPONENT~TAXAMOUNT~SETTLEDSTATUS~CONTRACTREFNO~TAXAPPLICABLE~SOURCEREFNO~AMOUNTSETTLED~PARTYTYPE~CURRENCY~EVENTCODE~EVENTSEQNO~EVENTDATE~PARTREFNO~TXTSETTLEDSTAT~TXTPAYREC~TXTPARTYTPE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_DUE_DETAILS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBTBS_PR_DUE_SUMMARY" : "","BLK_LBVWS_PR_COMPS" : "BLK_LBTBS_PR_DUE_SUMMARY~N","BLK_LBTBS_PR_AMOUNT_DUE" : "BLK_LBVWS_PR_COMPS~N"}; 

 var dataSrcLocationArray = new Array("BLK_LBTBS_PR_DUE_SUMMARY","BLK_LBVWS_PR_COMPS","BLK_LBTBS_PR_AMOUNT_DUE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDPRDET.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDPRDET.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBTBS_PR_DUE_SUMMARY__CONTRACTREFNO";
pkFields[0] = "BLK_LBTBS_PR_DUE_SUMMARY__CONTRACTREFNO";
queryFields[1] = "BLK_LBTBS_PR_DUE_SUMMARY__EVENTSEQNO";
pkFields[1] = "BLK_LBTBS_PR_DUE_SUMMARY__EVENTSEQNO";
queryFields[2] = "BLK_LBTBS_PR_DUE_SUMMARY__SOURCEREFNO";
pkFields[2] = "BLK_LBTBS_PR_DUE_SUMMARY__SOURCEREFNO";
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
var queryAmendArr = {"BLK_LBTBS_PR_DUE_SUMMARY":["EVENTCODE"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_LBTBS_PR_DUE_SUMMARY__CONTRACTREFNO__LOV_CONTRACT":["BLK_LBTBS_PR_DUE_SUMMARY__CONTRACTREFNO~BLK_LBTBS_PR_DUE_SUMMARY__SOURCEREFNO~","","N~N",""],"BLK_LBTBS_PR_DUE_SUMMARY__EVENTCODE__LOV_EVENT_CODE":["BLK_LBTBS_PR_DUE_SUMMARY__EVENTCODE~BLK_LBTBS_PR_DUE_SUMMARY__EVENTSEQNO~","BLK_LBTBS_PR_DUE_SUMMARY__CONTRACTREFNO!","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBVWS_PR_COMPS","BLK_LBTBS_PR_AMOUNT_DUE");
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

ArrFuncOrigin["LBDPRDET"]="KERNEL";
ArrPrntFunc["LBDPRDET"]="";
ArrPrntOrigin["LBDPRDET"]="";
ArrRoutingType["LBDPRDET"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDPRDET"]="N";
ArrCustomModified["LBDPRDET"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"LBDPRPMT":"CONREFNO~SOURCEREFNO~EVENTCODE~EVENTSEQNO~EVENTDATE~ACTION_CODE"};
var scrArgSource = {"LBDPRPMT":"BLK_LBTBS_PR_DUE_SUMMARY__CONTRACTREFNO~BLK_LBTBS_PR_DUE_SUMMARY__SOURCEREFNO~BLK_LBTBS_PR_DUE_SUMMARY__EVENTCODE~BLK_LBTBS_PR_DUE_SUMMARY__EVENTSEQNO~BLK_LBTBS_PR_DUE_SUMMARY__EVENTDATE~"};
var scrArgVals = {"LBDPRPMT":"~~~~~EXECUTEQUERY"};
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