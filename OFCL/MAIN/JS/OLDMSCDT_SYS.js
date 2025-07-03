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
**  File Name          : OLDMSCDT_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"CONREFNO~BOOKDATE~SERIALNO~USEREFNO~BRN~PRDCD~LATVERNO~COUNTERPARTY~CONSTAT~AUTHSTAT~PRDTP~MODCODE~CONTCCY~LATEVNSEQNO~CURREVENTCODE~USERDEFSTATUS~DEPCODE~WORKFLOWSTAT~REMARKS~APPROVING_AUTHORITY","BLK_OLTBS_CONTRACT_MASTER":"CONTRACTREFNO~VERSIONNO~EVENTSEQNO~USERDEFINEDSTATUS~HANDOFFSTATUS~EFFDATE~DERIVEDSTATUS","BLK_OLTBS_AMOUNT_DUE":"CONREFERENCENO~COMPONT~DUEDAT~AMTDUE~AMTSET~ADJAMT~STA~PAYBYDT~CCY","BLK_OLTBS_CONTRACT_EVENT_LOG":"MOD~CONREFNUMBER~EVENTSEQNUMBER~EVEDATE~EVECODE~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~TXNSTAT~NEWVERNDICATOR~WORKFLOWSTA~AUTHSTAT","BLK_OLTBS_CONTRACT_CONTROL":"CONTRACTREFNO~ENTRYBY~PROCESSCODE"};

var multipleEntryPageSize = {"BLK_OLTBS_AMOUNT_DUE" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTBS_AMOUNT_DUE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONREFNO~BOOKDATE~SERIALNO~USEREFNO~BRN~PRDCD~LATVERNO~COUNTERPARTY~CONSTAT~AUTHSTAT~PRDTP~MODCODE~CONTCCY~LATEVNSEQNO~CURREVENTCODE~USERDEFSTATUS~DEPCODE~WORKFLOWSTAT~REMARKS~APPROVING_AUTHORITY</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_MASTER">CONTRACTREFNO~VERSIONNO~EVENTSEQNO~USERDEFINEDSTATUS~HANDOFFSTATUS~EFFDATE~DERIVEDSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_AMOUNT_DUE">CONREFERENCENO~COMPONT~DUEDAT~AMTDUE~AMTSET~ADJAMT~STA~PAYBYDT~CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">MOD~CONREFNUMBER~EVENTSEQNUMBER~EVEDATE~EVECODE~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~TXNSTAT~NEWVERNDICATOR~WORKFLOWSTA~AUTHSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_CONTROL">CONTRACTREFNO~ENTRYBY~PROCESSCODE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONREFNO~USERDEFSTATUS~PRDCD~AUTHSTAT~COUNTERPARTY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDMSCDT";
var defaultWhereClause = "exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id) AND MODULE_CODE = 'OL' AND BRANCH = GLOBAL.CURRENT_BRANCH AND PRODUCT_TYPE <> 'C'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="MODULE_CODE = 'OL' AND PRODUCT_TYPE <> 'C' and Branch IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID) and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = PRODUCT_CODE AND USER_ID = global.user_id)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_CONTRACT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_OLTBS_CONTRACT_MASTER" : "BLK_OLTBS_CONTRACT~1","BLK_OLTBS_AMOUNT_DUE" : "BLK_OLTBS_CONTRACT_MASTER~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT~1","BLK_OLTBS_CONTRACT_CONTROL" : "BLK_OLTBS_CONTRACT~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_OLTBS_CONTRACT_MASTER","BLK_OLTBS_AMOUNT_DUE","BLK_OLTBS_CONTRACT_EVENT_LOG","BLK_OLTBS_CONTRACT_CONTROL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDMSCDT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDMSCDT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTBS_AMOUNT_DUE":["STA"],"BLK_OLTBS_CONTRACT_MASTER":["EFFDATEI","USERDEFINEDSTATUS"],"BLK_OLTBS_CONTRACT":["APPROVING_AUTHORITY","REMARKS"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
//***** Fields Amendable while Delete *****
var deleteAmendArr = {"BLK_OLTBS_CONTRACT":["APPROVING_AUTHORITY","REMARKS"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__CONREFNO__LOV_CONTRACT_REF":["BLK_OLTBS_CONTRACT__CONREFNO~BLK_OLTBS_CONTRACT__USEREFNO~BLK_OLTBS_CONTRACT__PRDCD~BLK_OLTBS_CONTRACT__COUNTERPARTY~","","N~N~N~N",""],"BLK_OLTBS_CONTRACT_MASTER__USERDEFINEDSTATUS__LOV_USER_DEFINED":["BLK_OLTBS_CONTRACT_MASTER__USERDEFINEDSTATUS~~","BLK_CSTBS_CONTRACT__PRDCD!VARCHAR2","N~N",""],"BLK_OLTBS_CONTRACT_MASTER__DERIVEDSTATUS__LOV_USER_DEFINED":["BLK_OLTBS_CONTRACT_MASTER__DERIVEDSTATUS~~","BLK_OLTBS_CONTRACT__PRDCD!STRING","N~N",""],"BLK_OLTBS_AMOUNT_DUE__STA__LOV_STATUS":["BLK_OLTBS_AMOUNT_DUE__STA~~","BLK_CSTBS_CONTRACT__PRDCD!VAR","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_AMOUNT_DUE");
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

ArrFuncOrigin["OLDMSCDT"]="KERNEL";
ArrPrntFunc["OLDMSCDT"]="";
ArrPrntOrigin["OLDMSCDT"]="";
ArrRoutingType["OLDMSCDT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDMSCDT"]="N";
ArrCustomModified["OLDMSCDT"]="N";

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