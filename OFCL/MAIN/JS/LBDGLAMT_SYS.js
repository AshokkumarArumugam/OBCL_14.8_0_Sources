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
**  File Name          : LBDGLAMT_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"CONTRACT_REF_NO~USER_REF_NO~PRODUCT_CODE~COUNTERPARTY~CONTRACT_CCY~UI_FACILTY_NAME~UI_PRODUCT_DESCRIPTION~UI_CUSTOMER_NAME~UI_TRANCHE_REF_NO~UI_LATEST_ESN~LATEST_EVENT_SEQ_NO~UI_CURR_ESN~CONTRACT_STATUS~AUTH_STATUS","BLK_CONTRACT_GLOBAL_AMOUNT":"CONTRACT_REF_NO~EVENT_SEQ_NO~EFFECTIVE_DATE~CURR_GLOBAL_AMOUNT~NEW_GLOBAL_AMOUNT~CURRENCY","BLK_EVENT_LOG":"CONTRACT_REF_NO~EVENT_SEQ_NO~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~TXNSTAT~AUTHSTAT~UI_CONTRACT_STATUS~UI_AUTH_STATUS"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "BLK_EVENT_LOG";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONTRACT_REF_NO~USER_REF_NO~PRODUCT_CODE~COUNTERPARTY~CONTRACT_CCY~UI_FACILTY_NAME~UI_PRODUCT_DESCRIPTION~UI_CUSTOMER_NAME~UI_TRANCHE_REF_NO~UI_LATEST_ESN~LATEST_EVENT_SEQ_NO~UI_CURR_ESN~CONTRACT_STATUS~AUTH_STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRACT_GLOBAL_AMOUNT">CONTRACT_REF_NO~EVENT_SEQ_NO~EFFECTIVE_DATE~CURR_GLOBAL_AMOUNT~NEW_GLOBAL_AMOUNT~CURRENCY</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_GLOBAL_AMOUNT" RELATION_TYPE="1" TYPE="BLK_EVENT_LOG">CONTRACT_REF_NO~EVENT_SEQ_NO~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~TXNSTAT~AUTHSTAT~UI_CONTRACT_STATUS~UI_AUTH_STATUS</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONTRACT_REF_NO~USER_REF_NO~PRODUCT_CODE~COUNTERPARTY~CONTRACT_CCY~CONTRACT_STATUS~AUTH_STATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDGLAMT";
var defaultWhereClause = "module_code = 'LB' and contract_status IN ('A', 'Y') AND branch = global.current_branch AND EXISTS (SELECT 1 FROM OLTB_CONTRACT_MASTER WHERE CONTRACT_REF_NO = SUMMARYDSN.CONTRACT_REF_NO AND VERSION_NO = SUMMARYDSN.LATEST_VERSION_NO AND AGENCY_TYPE = 'P' AND ((PRODUCT_TYPE = 'C') OR (PRODUCT_TYPE = 'L' AND CASCADE_PARTICIPATION = 'N')))and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="module_code = 'LB' and contract_status IN ('A', 'Y') AND EXISTS (SELECT 1 FROM OLTB_CONTRACT_MASTER WHERE CONTRACT_REF_NO = SUMMARYDSN.CONTRACT_REF_NO AND VERSION_NO = SUMMARYDSN.LATEST_VERSION_NO AND AGENCY_TYPE = 'P' AND ((PRODUCT_TYPE = 'C') OR (PRODUCT_TYPE = 'L' AND CASCADE_PARTICIPATION = 'N')))and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CONTRACT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_CONTRACT_GLOBAL_AMOUNT" : "BLK_CONTRACT~1","BLK_EVENT_LOG" : "BLK_CONTRACT_GLOBAL_AMOUNT~1"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_CONTRACT_GLOBAL_AMOUNT","BLK_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDGLAMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDGLAMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONTRACT_REF_NO";
pkFields[0] = "BLK_CONTRACT__CONTRACT_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_GLOBAL_AMOUNT":["NEW_GLOBAL_AMOUNT"]};
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
var lovInfoFlds = {"BLK_CONTRACT__CONTRACT_REF_NO__LOV_CONTRACT_REF_NO":["BLK_CONTRACT__CONTRACT_REF_NO~","","N",""]};
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

ArrFuncOrigin["LBDGLAMT"]="KERNEL";
ArrPrntFunc["LBDGLAMT"]="";
ArrPrntOrigin["LBDGLAMT"]="";
ArrRoutingType["LBDGLAMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDGLAMT"]="N";
ArrCustomModified["LBDGLAMT"]="N";

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