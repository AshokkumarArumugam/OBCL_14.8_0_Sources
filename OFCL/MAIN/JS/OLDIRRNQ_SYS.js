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
**  File Name          : OLDIRRNQ_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT__IRR":"CONTRACTREFNO~LATESTEVENTSEQNO~USERREFNO~LATESTVERSIONNO~PRODUCTCODE~COUNTERPARTY~CONTRACTSTATUS~AUTHSTATUS~PRODUCTTYPE~CURREVENTCODE~MODULECODE~CONTRACTCCY~CUSTOMREFNO~RATEREVISIONSTATUS~WORKFLOWSTATUS~EXTERNALREFNO~PRODUCTDESCRIPTIONDIS~COUNTERPARTYDESCDIS~CCYDESCRIPTIONDIS","BLK_OLTBS_CONTRACT_REVISION_SCH":"COMPONENT~REVISIONDATE~DEALDATE~RATE~COMPONENTDESCRIPTIONUI~CONTRACTREFNO~REVISIONAPPLIED~SCHEDULELINKAGE~RESETTENOR~DEALDATEREQD","BLK_OLTBS_CONTRACT_EVENT_LOG":"MODULE~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~CONTRACTREFNO~EVENTSEQNO~EVENTDATE~EVENTCODE~CONTRACTSTATUS~AUTHSTATUS~NEWVERSIONINDICATOR~REVERSEDEVENTSEQNO~EVENTVALUEDATE~ECASTATUS~WORKFLOWSTATUS~RATEREVISIONSTATUS~RELEASEBY~RELEASEDTSTAMP~RATEASSIGNEDBY~RATEASSIGNDTSTAMP~RATEASSIGNAUTHBY~RATEASSIGNAUTHDTSTAMP~INFORMSTATUS~TRNTYPE~EXTERNALTRANREFNO~TXTAUTHSTATUS"};

var multipleEntryPageSize = {"BLK_OLTBS_CONTRACT_REVISION_SCH" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTBS_CONTRACT_REVISION_SCH"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT__IRR">CONTRACTREFNO~LATESTEVENTSEQNO~USERREFNO~LATESTVERSIONNO~PRODUCTCODE~COUNTERPARTY~CONTRACTSTATUS~AUTHSTATUS~PRODUCTTYPE~CURREVENTCODE~MODULECODE~CONTRACTCCY~CUSTOMREFNO~RATEREVISIONSTATUS~WORKFLOWSTATUS~EXTERNALREFNO~PRODUCTDESCRIPTIONDIS~COUNTERPARTYDESCDIS~CCYDESCRIPTIONDIS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT__IRR" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_REVISION_SCH">COMPONENT~REVISIONDATE~DEALDATE~RATE~COMPONENTDESCRIPTIONUI~CONTRACTREFNO~REVISIONAPPLIED~SCHEDULELINKAGE~RESETTENOR~DEALDATEREQD</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT__IRR" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">MODULE~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~CONTRACTREFNO~EVENTSEQNO~EVENTDATE~EVENTCODE~CONTRACTSTATUS~AUTHSTATUS~NEWVERSIONINDICATOR~REVERSEDEVENTSEQNO~EVENTVALUEDATE~ECASTATUS~WORKFLOWSTATUS~RATEREVISIONSTATUS~RELEASEBY~RELEASEDTSTAMP~RATEASSIGNEDBY~RATEASSIGNDTSTAMP~RATEASSIGNAUTHBY~RATEASSIGNAUTHDTSTAMP~INFORMSTATUS~TRNTYPE~EXTERNALTRANREFNO~TXTAUTHSTATUS</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT__IRR">CONTRACTREFNO~USERREFNO~CUSTOMREFNO~PRODUCTCODE~COUNTERPARTY~CURREVENTCODE~AUTHSTATUS~RATEREVISIONSTATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDIRRNQ";
var defaultWhereClause = "CONTRACT_REF_NO in (SELECT CONTRACT_REF_NO FROM OLTBS_CONTRACT_REVISION_SCH)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_CONTRACT__IRR";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT__IRR" : "","BLK_OLTBS_CONTRACT_REVISION_SCH" : "BLK_OLTBS_CONTRACT__IRR~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT__IRR~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT__IRR","BLK_OLTBS_CONTRACT_REVISION_SCH","BLK_OLTBS_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDIRRNQ.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDIRRNQ.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__IRR__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__IRR__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTBS_CONTRACT_REVISION_SCH":["DEALDATEI","RATE"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__IRR__CONTRACTREFNO__LOV_CONTRACT":["BLK_OLTBS_CONTRACT__IRR__CONTRACTREFNO~BLK_OLTBS_CONTRACT__IRR__USERREFNO~BLK_OLTBS_CONTRACT__IRR__CUSTOMREFNO~BLK_OLTBS_CONTRACT__IRR__PRODUCTCODE~BLK_OLTBS_CONTRACT__IRR__COUNTERPARTY~BLK_OLTBS_CONTRACT__IRR__CONTRACTCCY~BLK_OLTBS_CONTRACT__IRR__PRODUCTDESCRIPTIONDIS~BLK_OLTBS_CONTRACT__IRR__COUNTERPARTYDESCDIS~BLK_OLTBS_CONTRACT__IRR__CCYDESCRIPTIONDIS~","","N",""],"BLK_OLTBS_CONTRACT__IRR__CONTRACTREFNO__LOV_CONTRACT_S":["BLK_OLTBS_CONTRACT__IRR__CONTRACTREFNO~~~~~~~~~~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_CONTRACT_REVISION_SCH");
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

ArrFuncOrigin["OLDIRRNQ"]="KERNEL";
ArrPrntFunc["OLDIRRNQ"]="";
ArrPrntOrigin["OLDIRRNQ"]="";
ArrRoutingType["OLDIRRNQ"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDIRRNQ"]="N";
ArrCustomModified["OLDIRRNQ"]="N";

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