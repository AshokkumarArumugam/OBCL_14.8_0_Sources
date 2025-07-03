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
**  File Name          : OLDCOCRV_SYS.js
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
var fieldNameArray = {"BLK_OLTB_CONTRACT":"DEPARTMENTCODE~CUSTOMREFNO~CONTCCY~PRDCD~BRANCH~USEREFNO~COMMITMENTREFNOUI~MATURITYDTUI~PRODUCTDESCUI~RESERVEAMTUI~VALUEDTUI~COMPLETEWRITEOFFAMTUI~FAS114RESERVEUI~CONTRAAMTUI~FACILITYNAMEUI~PRINCIPLEOSUI~CONTRACTREFNO","BLK_OLTB_COC_EVENT_LOG":"REVERSED~REVERSALESN~EVENTCODE~EVENTSEQNO~EVENTDESCUI~CONTRACTREFNO~COMMITMENTREFNO","BLK_CONTRACT_EVENT_LOG":"MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~AUTHSTATUSUI~CONTRACTSTATUSUI~CONTRACTSTATUS~AUTHSTATUS"};

var multipleEntryPageSize = {"BLK_OLTB_COC_EVENT_LOG" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTB_COC_EVENT_LOG"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTB_CONTRACT">DEPARTMENTCODE~CUSTOMREFNO~CONTCCY~PRDCD~BRANCH~USEREFNO~COMMITMENTREFNOUI~MATURITYDTUI~PRODUCTDESCUI~RESERVEAMTUI~VALUEDTUI~COMPLETEWRITEOFFAMTUI~FAS114RESERVEUI~CONTRAAMTUI~FACILITYNAMEUI~PRINCIPLEOSUI~CONTRACTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTB_CONTRACT" RELATION_TYPE="N" TYPE="BLK_OLTB_COC_EVENT_LOG">REVERSED~REVERSALESN~EVENTCODE~EVENTSEQNO~EVENTDESCUI~CONTRACTREFNO~COMMITMENTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTB_COC_EVENT_LOG" RELATION_TYPE="1" TYPE="BLK_CONTRACT_EVENT_LOG">MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~AUTHSTATUSUI~CONTRACTSTATUSUI~CONTRACTSTATUS~AUTHSTATUS</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTB_CONTRACT" : "","BLK_OLTB_COC_EVENT_LOG" : "BLK_OLTB_CONTRACT~N","BLK_CONTRACT_EVENT_LOG" : "BLK_OLTB_COC_EVENT_LOG~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTB_CONTRACT","BLK_OLTB_COC_EVENT_LOG","BLK_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCOCRV.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCOCRV.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTB_CONTRACT__CONTRACTREFNO";
pkFields[0] = "BLK_OLTB_CONTRACT__CONTRACTREFNO";
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
var lovInfoFlds = {"BLK_OLTB_CONTRACT__CONTRACTREFNO__LOV_CONTRACT_REF_NO":["BLK_OLTB_CONTRACT__CONTRACTREFNO~BLK_OLTB_CONTRACT__CONTCCY~BLK_OLTB_CONTRACT__BRANCH~BLK_OLTB_CONTRACT__DEPARTMENTCODE~BLK_OLTB_CONTRACT__PRDCD~BLK_OLTB_CONTRACT__USEREFNO~BLK_OLTB_CONTRACT__CUSTOMREFNO~BLK_OLTB_CONTRACT__PRINCIPLEOSUI~BLK_OLTB_CONTRACT__RESERVEAMTUI~~BLK_OLTB_CONTRACT__COMPLETEWRITEOFFAMTUI~BLK_OLTB_CONTRACT__FAS114RESERVEUI~BLK_OLTB_CONTRACT__VALUEDTUI~BLK_OLTB_CONTRACT__CONTRAAMTUI~BLK_OLTB_CONTRACT__MATURITYDTUI~BLK_OLTB_CONTRACT__FACILITYNAMEUI~BLK_OLTB_CONTRACT__COMMITMENTREFNOUI~BLK_OLTB_CONTRACT__PRODUCTDESCUI~","","N~N~N","N"]};
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
var multipleEntryIDs = new Array("BLK_OLTB_COC_EVENT_LOG");
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

ArrFuncOrigin["OLDCOCRV"]="KERNEL";
ArrPrntFunc["OLDCOCRV"]="";
ArrPrntOrigin["OLDCOCRV"]="";
ArrRoutingType["OLDCOCRV"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCOCRV"]="N";
ArrCustomModified["OLDCOCRV"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLDEVENT":"BLK_OLTB_CONTRACT__CONTRACTREFNO~"};
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