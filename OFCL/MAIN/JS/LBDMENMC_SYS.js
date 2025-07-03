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
**  File Name          : LBDMENMC_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_MNMIC":"CONTREFNO~LTVRNO~LTENTSEQNO~TXTFACILITYNAME~PARTSEARCH~PRODUCT_CODE","BLK_CONTRACT_PARTICIPANT":"BRWRREFNO~COUNTERPARTY~TXTPARTNAME~PARTICIPANTREFNO","BLK_PART_SETTLE_CURR_DET":"CONTREFNO~PARTICIPANT~CURRENCY~SSIMNEMONIC~SETSEQNO~CONTTYPE~DRAWDOWNNO~ENTSEQNO~RECORDSTAT","BLK_CONTRACT_ENTITY":"CONTREFNO~EVNTSEQNO~CONTTYPE~DRAWDOWNNO~CUSTNO~ENTITYID~PRIMARYENTITY~REMARKS","BLK_PART_SETTLE_CURR_TEMP":"CONTREFNO~PARTICIPANT~CURRENCY~SSIMNEMONIC~SETSEQNO~CONTTYPE~DRAWDOWNNO~EVNTSEQNO~RECDSTAT","BLK_CONTRACT_ENTITY_TEMP":"CONTREFNO~EVNTSEQNO~CONTTYPE~DRAWDOWNNO~CUSTNO~ENTITYID~PRIMARYENTITY~REMARKS~RECORDSTAT~TXTENTITYNAME","BLK_CONTRACT_EVENT_LOG":"CONTREFNO~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~EVNTSEQNO~EVNTDATE~EVNTCODE~TXNSTAT~AUTHSTAT~MODULE~NEWVRNDICATOR"};

var multipleEntryPageSize = {"BLK_CONTRACT_PARTICIPANT" :"15" ,"BLK_PART_SETTLE_CURR_TEMP" :"15" ,"BLK_CONTRACT_ENTITY_TEMP" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_CONTRACT_PARTICIPANT~BLK_PART_SETTLE_CURR_TEMP~BLK_CONTRACT_ENTITY_TEMP"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_MNMIC">CONTREFNO~LTVRNO~LTENTSEQNO~TXTFACILITYNAME~PARTSEARCH~PRODUCT_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_MNMIC" RELATION_TYPE="N" TYPE="BLK_CONTRACT_PARTICIPANT">BRWRREFNO~COUNTERPARTY~TXTPARTNAME~PARTICIPANTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_PARTICIPANT" RELATION_TYPE="N" TYPE="BLK_PART_SETTLE_CURR_DET">CONTREFNO~PARTICIPANT~CURRENCY~SSIMNEMONIC~SETSEQNO~CONTTYPE~DRAWDOWNNO~ENTSEQNO~RECORDSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_PARTICIPANT" RELATION_TYPE="N" TYPE="BLK_CONTRACT_ENTITY">CONTREFNO~EVNTSEQNO~CONTTYPE~DRAWDOWNNO~CUSTNO~ENTITYID~PRIMARYENTITY~REMARKS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_PARTICIPANT" RELATION_TYPE="N" TYPE="BLK_PART_SETTLE_CURR_TEMP">CONTREFNO~PARTICIPANT~CURRENCY~SSIMNEMONIC~SETSEQNO~CONTTYPE~DRAWDOWNNO~EVNTSEQNO~RECDSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_PARTICIPANT" RELATION_TYPE="N" TYPE="BLK_CONTRACT_ENTITY_TEMP">CONTREFNO~EVNTSEQNO~CONTTYPE~DRAWDOWNNO~CUSTNO~ENTITYID~PRIMARYENTITY~REMARKS~RECORDSTAT~TXTENTITYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_MNMIC" RELATION_TYPE="1" TYPE="BLK_CONTRACT_EVENT_LOG">CONTREFNO~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~EVNTSEQNO~EVNTDATE~EVNTCODE~TXNSTAT~AUTHSTAT~MODULE~NEWVRNDICATOR</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONTRACT_MNMIC" RELATION_TYPE="1" TYPE="BLK_LBVW_AMND_SETT_SUMMARY">AUTHSTATUS~CONTRACTSTATUS~CONTREFNO~COUNTERPARTY~PRODUCT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDMENMC";
var defaultWhereClause = "BRANCH=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LBVW_AMND_SETT_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_MNMIC" : "","BLK_CONTRACT_PARTICIPANT" : "BLK_OLTBS_CONTRACT_MNMIC~N","BLK_PART_SETTLE_CURR_DET" : "BLK_CONTRACT_PARTICIPANT~N","BLK_CONTRACT_ENTITY" : "BLK_CONTRACT_PARTICIPANT~N","BLK_PART_SETTLE_CURR_TEMP" : "BLK_CONTRACT_PARTICIPANT~N","BLK_CONTRACT_ENTITY_TEMP" : "BLK_CONTRACT_PARTICIPANT~N","BLK_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT_MNMIC~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_MNMIC","BLK_CONTRACT_PARTICIPANT","BLK_PART_SETTLE_CURR_DET","BLK_CONTRACT_ENTITY","BLK_PART_SETTLE_CURR_TEMP","BLK_CONTRACT_ENTITY_TEMP","BLK_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDMENMC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDMENMC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_ENTITY_TEMP":["ENTITYID","PRIMARYENTITY"],"BLK_CONTRACT_ENTITY":["ENTITYID","PRIMARYENTITY"],"BLK_PART_SETTLE_CURR_DET":["SETSEQNO","SSIMNEMONIC"],"BLK_PART_SETTLE_CURR_TEMP":["SETSEQNO","SSIMNEMONIC"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO__LOV_CONTRACT":["BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO~~~~~","","N~N~N~N~N",""],"BLK_OLTBS_CONTRACT_MNMIC__PARTSEARCH__LOV_PARTICIPANT":["BLK_OLTBS_CONTRACT_MNMIC__PARTSEARCH~~","BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2","N~N",""],"BLK_PART_SETTLE_CURR_DET__CURRENCY__LOV_TRANCHE_CURRENCY":["BLK_PART_SETTLE_CURR_TEMP__CURRENCY~~","BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2~BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2~BLK_CONTRACT_PARTICIPANT__COUNTERPARTY!VARCHAR2","N~N",""],"BLK_PART_SETTLE_CURR_DET__SSIMNEMONIC__LOV_MNEMONIC":["BLK_PART_SETTLE_CURR_DET__SSIMNEMONIC~~~~~BLK_PART_SETTLE_CURR_DET__SETSEQNO~~~~~~~~~","BLK_CONTRACT_PARTICIPANT__COUNTERPARTY!VARCHAR2~BLK_PART_SETTLE_CURR_TEMP__CURRENCY!VARCHAR2~BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2~BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2~BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2","N~N~N~N~N~N~N~N",""],"BLK_PART_SETTLE_CURR_TEMP__CURRENCY__LOV_TRANCHE_CURRENCY":["BLK_PART_SETTLE_CURR_TEMP__CURRENCY~~","BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2~BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2~BLK_CONTRACT_PARTICIPANT__COUNTERPARTY!VARCHAR2","N~N",""],"BLK_PART_SETTLE_CURR_TEMP__SSIMNEMONIC__LOV_MNEMONIC":["BLK_PART_SETTLE_CURR_TEMP__SSIMNEMONIC~~~~~BLK_PART_SETTLE_CURR_TEMP__SETSEQNO~~~~~~~~~","BLK_CONTRACT_PARTICIPANT__COUNTERPARTY!VARCHAR2~BLK_PART_SETTLE_CURR_TEMP__CURRENCY!VARCHAR2~BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2~BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2~BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2","N~N~N~N~N~N~N~N",""],"BLK_CONTRACT_ENTITY_TEMP__ENTITYID__LOV_ENTITIES":["BLK_CONTRACT_ENTITY_TEMP__ENTITYID~BLK_CONTRACT_ENTITY_TEMP__TXTENTITYNAME~~","BLK_CONTRACT_PARTICIPANT__COUNTERPARTY!VARCHAR2~BLK_OLTBS_CONTRACT_MNMIC__CONTREFNO!VARCHAR2","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_PARTICIPANT","BLK_PART_SETTLE_CURR_TEMP","BLK_CONTRACT_ENTITY_TEMP");
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

ArrFuncOrigin["LBDMENMC"]="KERNEL";
ArrPrntFunc["LBDMENMC"]="";
ArrPrntOrigin["LBDMENMC"]="";
ArrRoutingType["LBDMENMC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDMENMC"]="N";
ArrCustomModified["LBDMENMC"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {};
var scrArgSource = {};
var scrArgVals = {};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------