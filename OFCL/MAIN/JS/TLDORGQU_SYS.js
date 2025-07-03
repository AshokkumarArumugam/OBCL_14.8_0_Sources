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
**  File Name          : TLDORGQU_SYS.js
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
var fieldNameArray = {"BLK_TLTBS_UPLOAD_MASTER":"EXT_CONTRACT_REF_NO~SOURCE_CODE~BRANCH~VERSION_NO~TICKET_ID~EXPENSE_CODE~CUSIP_NO~UI_CURRENT_VER~UI_LATEST_VER~CURRENCY~EXPT_SETTL_DATE~BUY_SELL~TRADE_AMOUNT~TRADE_DATE~TRADE_PRICE","BLK_TLTBS_ORIGINATION_TRADE_MASTER":"EXT_CONTRACT_REF_NO~SOURCE_CODE~BRANCH~VERSION_NO~PORTFOLIO~MARKS_FEE_AMOUNT~DIRECT_WRITEOFF_AMT~FAS114_RESERVE_UNFUNDED_AMOUNT~RESERVE_AMOUNT~MAKER_DT_STAMP~PRODUCT_CODE~UI_DEAL_TYPE~UI_DESK_CODE~LD_REFUND_ESN~WRITEOFF_AMOUNT~TICKET_ID~MAKER_ID~CHECKER_DT_STAMP~TRADE_REF_NO~FAS114_RESERVE_FUNDED_AMOUNT~CONTRA_AMOUNT~DEAL_TYPE~POSITION_IDENTIFIER~UNAMORTISED_FEE_AMOUNT~NET_RECOVERY_AMOUNT~CHECKER_ID~CONFIRM~AUTHSTAT~TXNSTAT~UI_AUTH_STATUS~UI_CONTRACT_STATUS"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_UPLOAD_MASTER">EXT_CONTRACT_REF_NO~SOURCE_CODE~BRANCH~VERSION_NO~TICKET_ID~EXPENSE_CODE~CUSIP_NO~UI_CURRENT_VER~UI_LATEST_VER~CURRENCY~EXPT_SETTL_DATE~BUY_SELL~TRADE_AMOUNT~TRADE_DATE~TRADE_PRICE</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_UPLOAD_MASTER" RELATION_TYPE="1" TYPE="BLK_TLTBS_ORIGINATION_TRADE_MASTER">EXT_CONTRACT_REF_NO~SOURCE_CODE~BRANCH~VERSION_NO~PORTFOLIO~MARKS_FEE_AMOUNT~DIRECT_WRITEOFF_AMT~FAS114_RESERVE_UNFUNDED_AMOUNT~RESERVE_AMOUNT~MAKER_DT_STAMP~PRODUCT_CODE~UI_DEAL_TYPE~UI_DESK_CODE~LD_REFUND_ESN~WRITEOFF_AMOUNT~TICKET_ID~MAKER_ID~CHECKER_DT_STAMP~TRADE_REF_NO~FAS114_RESERVE_FUNDED_AMOUNT~CONTRA_AMOUNT~DEAL_TYPE~POSITION_IDENTIFIER~UNAMORTISED_FEE_AMOUNT~NET_RECOVERY_AMOUNT~CHECKER_ID~CONFIRM~AUTHSTAT~TXNSTAT~UI_AUTH_STATUS~UI_CONTRACT_STATUS</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_UPLOAD_MASTER">EXT_CONTRACT_REF_NO~SOURCE_CODE~BRANCH~VERSION_NO~CUSIP_NO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDORGQU";
var defaultWhereClause = "(EXISTS (SELECT 1 FROM SMVWS_USER_BRANCHES B WHERE (B.USER_ID = GLOBAL.USER_ID)/*AND(SUMMARYDSN.SOURCE_CODE = 'LQT')*/AND(B.BRANCH_CODE = SUMMARYDSN.BRANCH)))AND(EXISTS(SELECT 1 FROM tlTBS_ORIGINATION_TRADE_MASTER WHERE EXT_CONTRACT_REF_NO = SUMMARYDSN.EXT_CONTRACT_REF_NO AND BRANCH=GLOBAL.CURRENT_BRANCH))AND(VERSION_NO = (SELECT MAX(VERSION_NO) FROM TLTB_UPLOAD_MASTER A WHERE A.EXT_CONTRACT_REF_NO = SUMMARYDSN.EXT_CONTRACT_REF_NO)) AND PRODUCT_CODE IN (SELECT PRODUCT_CODE FROM TLTBS_ORIGINATION_TRADE_MASTER WHERE PRODUCT_CODE NOT IN (SELECT DISTINCT Y.PRODUCT_CODE FROM SMTBS_ROLE_PRODUCTS X, SMTB_USER_ROLE Q, TLTBS_ORIGINATION_TRADE_MASTER Y WHERE Y.PRODUCT_CODE = X.PRODUCT_CODE AND X.ROLE_ID = Q.ROLE_ID AND Q.USER_ID =GLOBAL.USER_ID) AND product_code NOT in (SELECT Z.PRODUCT_CODE FROM SMTBS_USER_PRODUCTS R, SMTB_USER_ROLE Q, TLTBS_ORIGINATION_TRADE_MASTER Z WHERE Z.PRODUCT_CODE = R.PRODUCT_CODE AND R.USER_ID =GLOBAL.USER_ID))";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TLTBS_UPLOAD_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTBS_UPLOAD_MASTER" : "","BLK_TLTBS_ORIGINATION_TRADE_MASTER" : "BLK_TLTBS_UPLOAD_MASTER~1"}; 

 var dataSrcLocationArray = new Array("BLK_TLTBS_UPLOAD_MASTER","BLK_TLTBS_ORIGINATION_TRADE_MASTER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDORGQU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDORGQU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTBS_UPLOAD_MASTER__EXT_CONTRACT_REF_NO";
pkFields[0] = "BLK_TLTBS_UPLOAD_MASTER__EXT_CONTRACT_REF_NO";
queryFields[1] = "BLK_TLTBS_UPLOAD_MASTER__SOURCE_CODE";
pkFields[1] = "BLK_TLTBS_UPLOAD_MASTER__SOURCE_CODE";
queryFields[2] = "BLK_TLTBS_UPLOAD_MASTER__BRANCH";
pkFields[2] = "BLK_TLTBS_UPLOAD_MASTER__BRANCH";
queryFields[3] = "BLK_TLTBS_UPLOAD_MASTER__VERSION_NO";
pkFields[3] = "BLK_TLTBS_UPLOAD_MASTER__VERSION_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TLTBS_ORIGINATION_TRADE_MASTER":["CONFIRM","CONTRA_AMOUNT","FAS114_RESERVE_FUNDED_AMOUNT","FAS114_RESERVE_UNFUNDED_AMOUNT","MARKS_FEE_AMOUNT","RESERVE_AMOUNT","UNAMORTISED_FEE_AMOUNT","WRITEOFF_AMOUNT"]};
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
var lovInfoFlds = {"BLK_TLTBS_UPLOAD_MASTER__EXT_CONTRACT_REF_NO__LOV_EXT_CONTRACT_REF":["BLK_TLTBS_UPLOAD_MASTER__EXT_CONTRACT_REF_NO~BLK_TLTBS_UPLOAD_MASTER__TICKET_ID~~BLK_TLTBS_UPLOAD_MASTER__CUSIP_NO~","","N~N~N~N",""]};
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

ArrFuncOrigin["TLDORGQU"]="KERNEL";
ArrPrntFunc["TLDORGQU"]="";
ArrPrntOrigin["TLDORGQU"]="";
ArrRoutingType["TLDORGQU"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDORGQU"]="N";
ArrCustomModified["TLDORGQU"]="N";

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