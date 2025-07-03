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
**  File Name          : OLDLDENT_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"CONREFNO~USEREFNO~COUNTERPARTY~BRANCH~LATEVNSEQNO~CONTCCY~EXPENSECODE~AMOUNT~DEPARTMENTCODE~PRDTP~CURREVENTCODE~AUTHSTAT~CONSTAT~MODULECODE~PRDCODE","BLK_CONTRACT_ADJ_MASTER":"CONTRACTREFNO~EVENTSEQNO~BRANCH~CURRENCY~VALUEDATE~BOOKINGDATE","BLK_CONTRACT_ADJ_DETAIL":"SERIALNO~AMOUNT~CRACCBRANCH~CRACCOUNT~CR_AMTTYPE~DRACCBRANCH~DRACCOUNT~DR_AMTTYPE~ADJUSTMENTTYPE~RECONID~INSTRUMENTNO~REMARKS~COMPONENT~REVERSAL~S2ADJUSTMENT~UPLOADDATE~CONTRACT_REF_NO~EVENT_SEQ_NO~CRACCTAG~DRACCTAG","BLK_CONTRACT_EVENT_LOG":"MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~CONTRACTSTATUS~AUTHSTATUS~MODULE~EVENTDATE~EVENTCODE~CONTRACT_REF_NO~EVENT_SEQ_NO"};

var multipleEntryPageSize = {"BLK_CONTRACT_ADJ_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_CONTRACT_ADJ_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONREFNO~USEREFNO~COUNTERPARTY~BRANCH~LATEVNSEQNO~CONTCCY~EXPENSECODE~AMOUNT~DEPARTMENTCODE~PRDTP~CURREVENTCODE~AUTHSTAT~CONSTAT~MODULECODE~PRDCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRACT_ADJ_MASTER">CONTRACTREFNO~EVENTSEQNO~BRANCH~CURRENCY~VALUEDATE~BOOKINGDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_ADJ_MASTER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_ADJ_DETAIL">SERIALNO~AMOUNT~CRACCBRANCH~CRACCOUNT~CR_AMTTYPE~DRACCBRANCH~DRACCOUNT~DR_AMTTYPE~ADJUSTMENTTYPE~RECONID~INSTRUMENTNO~REMARKS~COMPONENT~REVERSAL~S2ADJUSTMENT~UPLOADDATE~CONTRACT_REF_NO~EVENT_SEQ_NO~CRACCTAG~DRACCTAG</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRACT_EVENT_LOG">MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~CONTRACTSTATUS~AUTHSTATUS~MODULE~EVENTDATE~EVENTCODE~CONTRACT_REF_NO~EVENT_SEQ_NO</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRACT_ADJ_MASTER">CONTRACTREFNO~EVENTSEQNO~BRANCH~CURRENCY~VALUEDATE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDLDENT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CONTRACT_ADJ_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_CONTRACT_ADJ_MASTER" : "BLK_CONTRACT~1","BLK_CONTRACT_ADJ_DETAIL" : "BLK_CONTRACT_ADJ_MASTER~N","BLK_CONTRACT_EVENT_LOG" : "BLK_CONTRACT~1"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_CONTRACT_ADJ_MASTER","BLK_CONTRACT_ADJ_DETAIL","BLK_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDLDENT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDLDENT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONREFNO";
pkFields[0] = "BLK_CONTRACT__CONREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_ADJ_DETAIL":["ADJUSTMENTTYPE","AMOUNT","COMPONENT","CRACCBRANCH","CRACCOUNT","CR_AMTTYPE","DRACCBRANCH","DRACCOUNT","DR_AMTTYPE","INSTRUMENTNO","RECONID","REMARKS","REVERSAL","S2ADJUSTMENT","SERIALNO","UPLOADDATE"],"BLK_CONTRACT_ADJ_MASTER":["CURRENCY","VALUEDATEI"]};
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
var lovInfoFlds = {"BLK_CONTRACT__CONREFNO__LOV_REF_NO":["BLK_CONTRACT__CONREFNO~BLK_CONTRACT__USEREFNO~BLK_CONTRACT__COUNTERPARTY~BLK_CONTRACT__BRANCH~BLK_CONTRACT__LATEVNSEQNO~BLK_CONTRACT__CONTCCY~","","N~N~N~N~N~N",""],"BLK_CONTRACT_ADJ_MASTER__CURRENCY__LOV_CCY":["BLK_CONTRACT_ADJ_MASTER__CURRENCY~~","BLK_CONTRACT__CONTCCY!VARCHAR2","N~N",""],"BLK_CONTRACT_ADJ_DETAIL__CRACCBRANCH__LOV_AC_BRANCH":["BLK_CONTRACT_ADJ_DETAIL__CRACCBRANCH~","","N",""],"BLK_CONTRACT_ADJ_DETAIL__CRACCOUNT__LOV_CR":["BLK_CONTRACT_ADJ_DETAIL__CRACCOUNT~~~BLK_CONTRACT_ADJ_DETAIL__CR_AMTTYPE~BLK_CONTRACT_ADJ_DETAIL__CRACCTAG~","BLK_CONTRACT__CONREFNO!VARCHAR2~BLK_CONTRACT_ADJ_DETAIL__CRACCBRANCH!VARCHAR2","N~N~N~N~N",""],"BLK_CONTRACT_ADJ_DETAIL__DRACCBRANCH__LOV_AC_BRANCH":["BLK_CONTRACT_ADJ_DETAIL__DRACCBRANCH~","","N",""],"BLK_CONTRACT_ADJ_DETAIL__DRACCOUNT__LOV_DR":["BLK_CONTRACT_ADJ_DETAIL__DRACCOUNT~~~BLK_CONTRACT_ADJ_DETAIL__DR_AMTTYPE~BLK_CONTRACT_ADJ_DETAIL__DRACCTAG~","BLK_CONTRACT__CONREFNO!VARCHAR2~BLK_CONTRACT_ADJ_DETAIL__DRACCBRANCH!VARCHAR2","N~N~N~N~N",""],"BLK_CONTRACT_ADJ_DETAIL__COMPONENT__LOV_ESC_COMP":["BLK_CONTRACT_ADJ_DETAIL__COMPONENT~~","BLK_CONTRACT__CONREFNO!VARCHAR2~BLK_CONTRACT__CONREFNO!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_ADJ_DETAIL");
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

ArrFuncOrigin["OLDLDENT"]="KERNEL";
ArrPrntFunc["OLDLDENT"]="";
ArrPrntOrigin["OLDLDENT"]="";
ArrRoutingType["OLDLDENT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDLDENT"]="N";
ArrCustomModified["OLDLDENT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLDEVENT":"BLK_CONTRACT__CONREFNO~"};
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