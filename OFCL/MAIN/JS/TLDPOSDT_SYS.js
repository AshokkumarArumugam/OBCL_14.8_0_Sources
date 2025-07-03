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
**  File Name          : TLDPOSDT_SYS.js
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
var fieldNameArray = {"BLK_POSITION_CONTRACT":"CONTRACTREFNO~PRODUCTCODE~POSITIONIDENTIFIER~CUSIPNO~EVENTSEQNO~BRANCH~SWAPCOUNTERPARTY~EXPENSECODE~TXT_PRODUCT_DESC~TXT_EXPENSE_CODE~TXT_PORTFOLIO~TXT_PORTFOLIO_DESC~TXT_DIS_BRANCH~TXT_DESK_CODE~TXT_TYPE~TXT_POSITION_QUALIFIER~TXT_PORTFOLIO_COSTING_METHOD~TXT_REVALUATION_FREQUENCY~TXT_START_MONTH~TXT_START_DATE~CHK_RESERVE_CAL_REQD~TXT_RESERVEDAYS~TXT_MAKER_ID~TXT_MAKER_DT_STAMP~TXT_CHECKER_ID~TXT_CHECKER_DT_STAMP~TXT_CONTRACT_STATUS~TXT_AUTH_STAT","BLK_AUDIT":"AUTH_STATUS~CHECKER_DT_STAMP~CHECKER_ID~CONTRACT_REF_NO~CONTRACT_STATUS~EVENT_SEQ_NO~MAKER_DT_STAMP~MAKER_ID"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_POSITION_CONTRACT">CONTRACTREFNO~PRODUCTCODE~POSITIONIDENTIFIER~CUSIPNO~EVENTSEQNO~BRANCH~SWAPCOUNTERPARTY~EXPENSECODE~TXT_PRODUCT_DESC~TXT_EXPENSE_CODE~TXT_PORTFOLIO~TXT_PORTFOLIO_DESC~TXT_DIS_BRANCH~TXT_DESK_CODE~TXT_TYPE~TXT_POSITION_QUALIFIER~TXT_PORTFOLIO_COSTING_METHOD~TXT_REVALUATION_FREQUENCY~TXT_START_MONTH~TXT_START_DATE~CHK_RESERVE_CAL_REQD~TXT_RESERVEDAYS~TXT_MAKER_ID~TXT_MAKER_DT_STAMP~TXT_CHECKER_ID~TXT_CHECKER_DT_STAMP~TXT_CONTRACT_STATUS~TXT_AUTH_STAT</FN>'; 
msgxml += '      <FN PARENT="BLK_POSITION_CONTRACT" RELATION_TYPE="1" TYPE="BLK_AUDIT">AUTH_STATUS~CHECKER_DT_STAMP~CHECKER_ID~CONTRACT_REF_NO~CONTRACT_STATUS~EVENT_SEQ_NO~MAKER_DT_STAMP~MAKER_ID</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_POSITION_CONTRACT" : "","BLK_AUDIT" : "BLK_POSITION_CONTRACT~1"}; 

 var dataSrcLocationArray = new Array("BLK_POSITION_CONTRACT","BLK_AUDIT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDPOSDT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDPOSDT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_POSITION_CONTRACT__CONTRACTREFNO";
pkFields[0] = "BLK_POSITION_CONTRACT__CONTRACTREFNO";
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
var queryAmendArr = {"BLK_POSITION_CONTRACT":["CHK_RESERVE_CAL_REQD","TXT_PORTFOLIO_COSTING_METHOD","TXT_REVALUATION_FREQUENCY","TXT_START_MONTH"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_POSITION_CONTRACT__CONTRACTREFNO__LOV_CONTRACT":["BLK_POSITION_CONTRACT__CONTRACTREFNO~BLK_POSITION_CONTRACT__CUSIPNO~","","N~N",""]};
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

 var CallFormArray= new Array("OLCTRMIS~BLK_POSITION_CONTRACT","OLCTRUDF~BLK_POSITION_CONTRACT"); 

 var CallFormRelat=new Array("TLTBS_POSITION_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__MIS.CONTRACT_REF_NO","TLTBS_POSITION_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__FLD.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDPOSDT"]="KERNEL";
ArrPrntFunc["TLDPOSDT"]="";
ArrPrntOrigin["TLDPOSDT"]="";
ArrRoutingType["TLDPOSDT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDPOSDT"]="N";
ArrCustomModified["TLDPOSDT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCTRMIS":"CONTREF~ESN~PRDCD~BRNCD","OLCTRUDF":"CONTREFNO~LATVERNO","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLCTRMIS":"BLK_POSITION_CONTRACT__CONTRACTREFNO~BLK_POSITION_CONTRACT__EVENTSEQNO~BLK_POSITION_CONTRACT__PRODUCTCODE~BLK_POSITION_CONTRACT__BRANCH","OLCTRUDF":"BLK_POSITION_CONTRACT__CONTRACTREFNO~BLK_POSITION_CONTRACT__EVENTSEQNO","OLDEVENT":"BLK_POSITION_CONTRACT__CONTRACTREFNO~"};
var scrArgVals = {"OLCTRMIS":"~~~","OLCTRUDF":"~","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCTRMIS":"","OLCTRUDF":""};
var dpndntOnSrvs = {"OLCTRMIS":"","OLCTRUDF":""};
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