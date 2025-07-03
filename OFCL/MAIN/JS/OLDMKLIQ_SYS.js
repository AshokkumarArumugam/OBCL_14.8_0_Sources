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
**  File Name          : OLDMKLIQ_SYS.js
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
var fieldNameArray = {"BLK_ADDLTEXT":"ADDLTEXT~EVNTSEQNO~REFERENCENO~COUNTERPARTY~CUSTNAME~CCY~AMOUNT~FACILITYNAME~VALUEDATE~MATURITYDATE~CCY1~PRINCIPALOUTSTANDINGBAL~BRANCH","BLK_CSTBS_CONTRACTEVENTLOG":"NEWVERSIONINDICATOR~AUTHSTATUS~CONTRACTSTATUS~EVENTCODE~EVENTDATE~EVENTSEQNO~CHECKERDTSTAMP~CHECKERID~MAKERDTSTAMP~MAKERID~CONTRACTREFNO~MODULE~TXTCONTRACTSTATUS~TXTAUTHSTATUS"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ADDLTEXT">ADDLTEXT~EVNTSEQNO~REFERENCENO~COUNTERPARTY~CUSTNAME~CCY~AMOUNT~FACILITYNAME~VALUEDATE~MATURITYDATE~CCY1~PRINCIPALOUTSTANDINGBAL~BRANCH</FN>'; 
msgxml += '      <FN PARENT="BLK_ADDLTEXT" RELATION_TYPE="1" TYPE="BLK_CSTBS_CONTRACTEVENTLOG">NEWVERSIONINDICATOR~AUTHSTATUS~CONTRACTSTATUS~EVENTCODE~EVENTDATE~EVENTSEQNO~CHECKERDTSTAMP~CHECKERID~MAKERDTSTAMP~MAKERID~CONTRACTREFNO~MODULE~TXTCONTRACTSTATUS~TXTAUTHSTATUS</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_CSTBS_CONTRACTEVENTLOG" RELATION_TYPE="1" TYPE="BLK_SUMMARY">REFERENCENO~CONTACTSTATUS~AUTHSTAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDMKLIQ";
var defaultWhereClause = "MODULE IN ('OL') and sypks_utils.get_branch(CONTRACT_REF_NO) =GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="MODULE IN ('OL') and sypks_utils.get_branch(CONTRACT_REF_NO)IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID) and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = PRODUCT_CODE AND USER_ID = global.user_id)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ADDLTEXT" : "","BLK_CSTBS_CONTRACTEVENTLOG" : "BLK_ADDLTEXT~1"}; 

 var dataSrcLocationArray = new Array("BLK_ADDLTEXT","BLK_CSTBS_CONTRACTEVENTLOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDMKLIQ.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDMKLIQ.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ADDLTEXT__REFERENCENO";
pkFields[0] = "BLK_ADDLTEXT__REFERENCENO";
queryFields[1] = "BLK_ADDLTEXT__EVNTSEQNO";
pkFields[1] = "BLK_ADDLTEXT__EVNTSEQNO";
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
var lovInfoFlds = {"BLK_ADDLTEXT__REFERENCENO__LOV_CONTRACT":["BLK_ADDLTEXT__REFERENCENO~","","N",""]};
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

ArrFuncOrigin["OLDMKLIQ"]="KERNEL";
ArrPrntFunc["OLDMKLIQ"]="";
ArrPrntOrigin["OLDMKLIQ"]="";
ArrRoutingType["OLDMKLIQ"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDMKLIQ"]="N";
ArrCustomModified["OLDMKLIQ"]="N";

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