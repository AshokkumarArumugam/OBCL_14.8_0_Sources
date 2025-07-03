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
**  File Name          : OLDRTFIX_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"COUNTERPARTY~PRODUCTCODE~BRANCH~TXTPRODUCTDESC~TXTCUSTOMERDESC~TXTUSERREFNO~CONTRACTCCY~CONTRACTREFNO~USERREFNO~MODULECODE~AUTHSTATUS~CONTRACTSTATUS~LATESTEVENTSEQNO","BLK_OLTBS_RATE_FIXING_DETAILS":"TXTCOMPONENTDESC~CURRENCY~CONTRACTREFNO~COMPONENT~EVENTSEQNO~CURRENTRESETDATE~RATECODE~SPREAD~NEXTRESETDATE~RESETVALUEDATE~RATEFIXINGESN~RATEFIXINGSTATUS~REMARKS~RATE~FINALRATE~EXTERNALTRANREFNO~TXTRTFXREQD~TXTRTFXDAYS~TXTBORROWLENDIND~TXTRESETTENOR~TXTRTCALCTYPE","BLK_OLTBS_CONTRACT_EVENT_LOG":"MAKERID~MAKERDTST~CHECKERID~CHECKERDTST~TXNSTAT~AUTHSTAT~TXTRATEFIXINGSTATUS~CONTRACTREFNO"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "BLK_OLTBS_RATE_FIXING_DETAILS";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">COUNTERPARTY~PRODUCTCODE~BRANCH~TXTPRODUCTDESC~TXTCUSTOMERDESC~TXTUSERREFNO~CONTRACTCCY~CONTRACTREFNO~USERREFNO~MODULECODE~AUTHSTATUS~CONTRACTSTATUS~LATESTEVENTSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_OLTBS_RATE_FIXING_DETAILS">TXTCOMPONENTDESC~CURRENCY~CONTRACTREFNO~COMPONENT~EVENTSEQNO~CURRENTRESETDATE~RATECODE~SPREAD~NEXTRESETDATE~RESETVALUEDATE~RATEFIXINGESN~RATEFIXINGSTATUS~REMARKS~RATE~FINALRATE~EXTERNALTRANREFNO~TXTRTFXREQD~TXTRTFXDAYS~TXTBORROWLENDIND~TXTRESETTENOR~TXTRTCALCTYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">MAKERID~MAKERDTST~CHECKERID~CHECKERDTST~TXNSTAT~AUTHSTAT~TXTRATEFIXINGSTATUS~CONTRACTREFNO</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLVW_RATE_FIX_SUMMARY">CONTRACTREFNO~CURRENTRESETDATE~COMPO~ESN~RATE~SPREAD~NEXTRESETDT~RATCD~RESETVALDT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDRTFIX";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLVW_RATE_FIX_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_OLTBS_RATE_FIXING_DETAILS" : "BLK_OLTBS_CONTRACT~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_OLTBS_RATE_FIXING_DETAILS","BLK_OLTBS_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDRTFIX.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDRTFIX.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTBS_RATE_FIXING_DETAILS":["NEXTRESETDATEI","RATE","SPREAD"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__CONTRACTREFNO__LOV_CONTRACT":["BLK_OLTBS_CONTRACT__CONTRACTREFNO~BLK_OLTBS_CONTRACT__LATESTEVENTSEQNO~BLK_OLTBS_CONTRACT__USERREFNO~BLK_OLTBS_CONTRACT__PRODUCTCODE~BLK_OLTBS_CONTRACT__COUNTERPARTY~BLK_OLTBS_CONTRACT__BRANCH~BLK_OLTBS_CONTRACT__TXTCUSTOMERDESC~BLK_OLTBS_CONTRACT__TXTPRODUCTDESC~","","N","N"],"BLK_OLTBS_RATE_FIXING_DETAILS__RATECODE__LOV_RTFX_RATECODE":["BLK_OLTBS_RATE_FIXING_DETAILS__RATECODE~~","BLK_LDTBS_RATE_FIXING_DETAILS__CURRENCY!VARCHAR2","N","N"]};
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
var multipleEntryIDs = new Array();
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

ArrFuncOrigin["OLDRTFIX"]="KERNEL";
ArrPrntFunc["OLDRTFIX"]="";
ArrPrntOrigin["OLDRTFIX"]="";
ArrRoutingType["OLDRTFIX"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDRTFIX"]="N";
ArrCustomModified["OLDRTFIX"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------