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
**  File Name          : OLDLLRSV_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"USERDEFINEDSTATUS~CONTRACTSTATUS~COUNTERPARTY~BRANCH~USERREFNO~CONTRACTREFNO~DEPARTMENTCODE~CUSTOMREFNO~COUNTERPARTYNAMEUI~CONTCCY~OUTSTANDINGBALUI~BOOKDATE~MATURITYDATEUI~DEPTDESCUI~BRANCHDESCUI~AUTHSTAT~PRDTP~CURREVENTCODE~LATESTEVENTDATE~LATESTVERSIONNO~LATESTEVENTSEQNO~CURRENTRESRVUI~TOTALRESRVUI~MODULECODE~MATDT","BLK_CONTRACT_RESERVE":"CONTRACTCCY~PREPAYMENTPENALTYAMOUNT~RESERVESTATUS~RESERVETXNAMT~VALUEDATE~TOTFAS114RESRVAMTUI~TOTRESRVAMTUI~EVENTSEQNO~CONTRACTREFNO","BLK_FOOTER":"CHECKERDTSTAMP~CHECKERID~MAKERDTSTAMP~MAKERID~CONTRACTSTATUSUI~AUTHSTATUSUI~WRKFLOWSTATUSUI~WORKFLOWSTATUS~AUTHSTATUS~CONTRACTSTATUS~EVENTSEQNO~CONTRACTREFNO~RATEREVISIONSTATUS~EVENTVALUEDATE~REVERSEDEVENTSEQNO~NEWVERSIONINDICATOR~EVENTCODE~EVENTDATE~MODULE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">USERDEFINEDSTATUS~CONTRACTSTATUS~COUNTERPARTY~BRANCH~USERREFNO~CONTRACTREFNO~DEPARTMENTCODE~CUSTOMREFNO~COUNTERPARTYNAMEUI~CONTCCY~OUTSTANDINGBALUI~BOOKDATE~MATURITYDATEUI~DEPTDESCUI~BRANCHDESCUI~AUTHSTAT~PRDTP~CURREVENTCODE~LATESTEVENTDATE~LATESTVERSIONNO~LATESTEVENTSEQNO~CURRENTRESRVUI~TOTALRESRVUI~MODULECODE~MATDT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRACT_RESERVE">CONTRACTCCY~PREPAYMENTPENALTYAMOUNT~RESERVESTATUS~RESERVETXNAMT~VALUEDATE~TOTFAS114RESRVAMTUI~TOTRESRVAMTUI~EVENTSEQNO~CONTRACTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_RESERVE" RELATION_TYPE="1" TYPE="BLK_FOOTER">CHECKERDTSTAMP~CHECKERID~MAKERDTSTAMP~MAKERID~CONTRACTSTATUSUI~AUTHSTATUSUI~WRKFLOWSTATUSUI~WORKFLOWSTATUS~AUTHSTATUS~CONTRACTSTATUS~EVENTSEQNO~CONTRACTREFNO~RATEREVISIONSTATUS~EVENTVALUEDATE~REVERSEDEVENTSEQNO~NEWVERSIONINDICATOR~EVENTCODE~EVENTDATE~MODULE</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_CONTRACT_RESERVE" RELATION_TYPE="1" TYPE="BLK_OLVWS_CONTRACT_RESERVE_SUMMARY">CONTRACTREFNO~RESERVESTATUS~RESERVETXNAMT~CONTRACTCCY~PREPAYMENTPENALTYAMOUNT~VALUEDATE~EVENTSEQNO~AUTH_STATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDLLRSV";
var defaultWhereClause = "sypks_utils.get_branch(CONTRACT_REF_NO) = GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="sypks_utils.get_branch(CONTRACT_REF_NO) IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID) and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = PRODUCT_CODE AND USER_ID = global.user_id)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLVWS_CONTRACT_RESERVE_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_CONTRACT_RESERVE" : "BLK_OLTBS_CONTRACT~1","BLK_FOOTER" : "BLK_CONTRACT_RESERVE~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_CONTRACT_RESERVE","BLK_FOOTER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDLLRSV.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDLLRSV.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_RESERVE":["RESERVESTATUS","RESERVETXNAMT"],"BLK_OLTBS_CONTRACT":["BTN_NEXT","BTN_PREV"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_OLTBS_CONTRACT":["BTN_NEXT","BTN_PREV"]};
//***** Fields Amendable while Authorize *****
var authorizeAmenArr = {"BLK_OLTBS_CONTRACT":["BTN_NEXT","BTN_PREV"]};
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__CONTRACTREFNO__LOV_CONTR_REF_NO":["BLK_OLTBS_CONTRACT__CONTRACTREFNO~BLK_OLTBS_CONTRACT__MATDT~BLK_OLTBS_CONTRACT__USERREFNO~BLK_OLTBS_CONTRACT__CUSTOMREFNO~BLK_OLTBS_CONTRACT__COUNTERPARTY~BLK_OLTBS_CONTRACT__USERDEFINEDSTATUS~BLK_OLTBS_CONTRACT__CONTRACTSTATUS~BLK_CONTRACT_RESERVE__CONTRACTCCY~BLK_OLTBS_CONTRACT__LATESTVERSIONNO~BLK_OLTBS_CONTRACT__COUNTERPARTYNAMEUI~BLK_OLTBS_CONTRACT__OUTSTANDINGBALUI~BLK_CONTRACT_RESERVE__TOTRESRVAMTUI~BLK_CONTRACT_RESERVE__TOTFAS114RESRVAMTUI~BLK_OLTBS_CONTRACT__BRANCH~BLK_OLTBS_CONTRACT__BRANCHDESCUI~","","N~N~N~N~N~N~N~N~N~N~N~N~N~N~N",""]};
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

ArrFuncOrigin["OLDLLRSV"]="KERNEL";
ArrPrntFunc["OLDLLRSV"]="";
ArrPrntOrigin["OLDLLRSV"]="";
ArrRoutingType["OLDLLRSV"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDLLRSV"]="N";
ArrCustomModified["OLDLLRSV"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLDEVENT":"BLK_OLTBS_CONTRACT__CONTRACTREFNO~"};
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