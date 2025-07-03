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
**  File Name          : LBDBRMNC_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"CONTREFNO~TXTFACILITYNAME~LTEVNTSEQNO~LTVERSIONNO~MODULE_CODE~PRODUCT_CODE","BLK_CONTRACT_BORROWERS":"CONTREFNO~VERSNO~CUSTOMERNO~ENTSEQNO~SSICOUNTERPARTY~TXTCUSTOMERNAME~UI_CPRTY_NAME","BLK_BORR_SETTLE_CURR_DET":"CONTREFNO~VERSNO~CUSTNO~SSICOUNTERPARTY~CURRENCY~SSIMNEMONIC~SETTLEMENTSEQNO","BLK_BORROWER_ENTITIES":"CONTREFNO~VERSNO~CUSTNO~ENTITY~TXTENTITYNAME~DRAWDNO~PRIMARY","BLK_CONTRACT_EVENT_LOG":"CONTREFNO~ENTSEQNO~MODULE~EVENTCODE~EVENTDATE~CONTSTATUS~AUTHSTATUS~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~NEWVERSINDICATOR"};

var multipleEntryPageSize = {"BLK_CONTRACT_BORROWERS" :"15" ,"BLK_BORR_SETTLE_CURR_DET" :"15" ,"BLK_BORROWER_ENTITIES" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_CONTRACT_BORROWERS~BLK_BORR_SETTLE_CURR_DET~BLK_BORROWER_ENTITIES"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONTREFNO~TXTFACILITYNAME~LTEVNTSEQNO~LTVERSIONNO~MODULE_CODE~PRODUCT_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_CONTRACT_BORROWERS">CONTREFNO~VERSNO~CUSTOMERNO~ENTSEQNO~SSICOUNTERPARTY~TXTCUSTOMERNAME~UI_CPRTY_NAME</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_BORROWERS" RELATION_TYPE="N" TYPE="BLK_BORR_SETTLE_CURR_DET">CONTREFNO~VERSNO~CUSTNO~SSICOUNTERPARTY~CURRENCY~SSIMNEMONIC~SETTLEMENTSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_BORROWERS" RELATION_TYPE="N" TYPE="BLK_BORROWER_ENTITIES">CONTREFNO~VERSNO~CUSTNO~ENTITY~TXTENTITYNAME~DRAWDNO~PRIMARY</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_BORROWERS" RELATION_TYPE="1" TYPE="BLK_CONTRACT_EVENT_LOG">CONTREFNO~ENTSEQNO~MODULE~EVENTCODE~EVENTDATE~CONTSTATUS~AUTHSTATUS~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~NEWVERSINDICATOR</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_LBVW_AMND_SETT_SUMMARY">AUTHSTATUS~CONTRACTSTATUS~CONTREFNO~COUNTERPARTY~CUSTNAM~PRODUCT~BRANCH</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDBRMNC";
var defaultWhereClause = "BRANCH=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="Branch IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LBVW_AMND_SETT_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_CONTRACT_BORROWERS" : "BLK_OLTBS_CONTRACT~N","BLK_BORR_SETTLE_CURR_DET" : "BLK_CONTRACT_BORROWERS~N","BLK_BORROWER_ENTITIES" : "BLK_CONTRACT_BORROWERS~N","BLK_CONTRACT_EVENT_LOG" : "BLK_CONTRACT_BORROWERS~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_CONTRACT_BORROWERS","BLK_BORR_SETTLE_CURR_DET","BLK_BORROWER_ENTITIES","BLK_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDBRMNC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDBRMNC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BORROWER_ENTITIES":["ENTITY","PRIMARY","TXTENTITYNAME"],"BLK_BORR_SETTLE_CURR_DET":["CURRENCY","SETTLEMENTSEQNO","SSIMNEMONIC"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__CONTREFNO__LOV_CONTRACT":["BLK_OLTBS_CONTRACT__CONTREFNO~~~~~","","N~N~N~N~N",""],"BLK_BORR_SETTLE_CURR_DET__SSIMNEMONIC__LOV_MNEMONIC":["BLK_BORR_SETTLE_CURR_DET__SSIMNEMONIC~~~~~~~~~~~~~~","BLK_CONTRACT_BORROWERS__SSICOUNTERPARTY!VARCHAR2~BLK_CONTRACT_BORROWERS__CUSTOMERNO!VARCHAR2~BLK_BORR_SETTLE_CURR_DET__CURRENCY!VARCHAR2~BLK_OLTBS_CONTRACT__CONTREFNO!VARCHAR2~BLK_OLTBS_CONTRACT__MODULE_CODE!VARCHAR2~BLK_OLTBS_CONTRACT__CONTREFNO!VARCHAR2~BLK_OLTBS_CONTRACT__PRODUCT_CODE!VARCHAR2","N~N~N~N~N~N~N~N",""],"BLK_BORROWER_ENTITIES__ENTITY__LOV_ENTITY":["BLK_BORROWER_ENTITIES__ENTITY~BLK_BORROWER_ENTITIES__TXTENTITYNAME~~","BLK_CONTRACT_BORROWERS__CUSTOMERNO!VARCHAR2~BLK_CONTRACT_BORROWERS__CONTREFNO!VARCHAR2~BLK_CONTRACT_BORROWERS__VERSNO!NUMBER~BLK_CONTRACT_BORROWERS__CUSTOMERNO!VARCHAR2~BLK_CONTRACT_BORROWERS__CONTREFNO!VARCHAR2~BLK_CONTRACT_BORROWERS__CONTREFNO!VARCHAR2","N~N~N",""],"BLK_LBVW_AMND_SETT_SUMMARY__COUNTERPARTY__LOV_CUST_NAME_S":["BLK_LBVW_AMND_SETT_SUMMARY__COUNTERPARTY~BLK_LBVW_AMND_SETT_SUMMARY__CUSTNAM~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_BORROWERS","BLK_BORR_SETTLE_CURR_DET","BLK_BORROWER_ENTITIES");
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

ArrFuncOrigin["LBDBRMNC"]="KERNEL";
ArrPrntFunc["LBDBRMNC"]="";
ArrPrntOrigin["LBDBRMNC"]="";
ArrRoutingType["LBDBRMNC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDBRMNC"]="N";
ArrCustomModified["LBDBRMNC"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------