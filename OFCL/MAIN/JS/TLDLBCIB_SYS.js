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
**  File Name          : TLDLBCIB_SYS.js
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
var fieldNameArray = {"BLK_TLTBS_CONSOL_LS_BROWSER":"SOURCE_CODE~CONSOL_TICKET_REF_NO~CUSIP_NO~BROWSER_SEQ_NO~PROCESSING_DATE~AUTHSTAT~ACTUAL_SETTLEMENT_DATE~CHECKER_DT_STAMP~AGENCY_REF_NO~MAKER_ID~PROCESSING_STATUS~LS_EVENT_SEQ_NO~MAKER_DT_STAMP~CHECKER_ID~ACTION_CODE~SEQUENCE_NO~ONCE_AUTH~MOD_NO~RECORD_STAT~LS_EVENT_CODE~UI_AUTH_STAT~UI_RECORD_STAT","BLK_TLTBS_CONSOL_LS_BROWSER_DETAIL":"SOURCE_CODE~CONSOL_TICKET_REF_NO~CUSIP_NO~EVENT_SEQ_NO~TICKET_ID~TRADE_REF_NO~TICKET_SETTLEMENT_SEQ_NO~BUY_SELL~UI_BUY_SELL~UI_POSITION_IDENTIFIER~UI_COUNTERPARTY~UI_CURRENCY~UI_TRADE_AMOUNT","BLK_TLTBS_CONSOL_LS_EVENT_DETAIL":"SOURCE_CODE~CONSOL_TICKET_REF_NO~UI_CURRENCY~CUSIP_NO~BROWSER_SEQ_NO~PARTICIPANT~AMOUNT~UI_PARTICIPANT_NAME","BLK_TLTBS_CONSOL_LS_EXCEPTION":"SOURCE_CODE~CONSOL_TICKET_REF_NO~CUSIP_NO~BROWSER_SEQ_NO~ERR_SEQ_NO~ERROR_CODE~UI_ERROR_MESSAGE~ERROR_PARAM"};

var multipleEntryPageSize = {"BLK_TLTBS_CONSOL_LS_BROWSER_DETAIL" :"15" ,"BLK_TLTBS_CONSOL_LS_EVENT_DETAIL" :"15" ,"BLK_TLTBS_CONSOL_LS_EXCEPTION" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_TRADE_DETAILS":"BLK_TLTBS_CONSOL_LS_BROWSER_DETAIL","CVS_MAIN__TAB_PARTICIPANT_DETAILS":"BLK_TLTBS_CONSOL_LS_EVENT_DETAIL","CVS_MAIN__TAB_EXCEPTIONS":"BLK_TLTBS_CONSOL_LS_EXCEPTION"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_CONSOL_LS_BROWSER">SOURCE_CODE~CONSOL_TICKET_REF_NO~CUSIP_NO~BROWSER_SEQ_NO~PROCESSING_DATE~AUTHSTAT~ACTUAL_SETTLEMENT_DATE~CHECKER_DT_STAMP~AGENCY_REF_NO~MAKER_ID~PROCESSING_STATUS~LS_EVENT_SEQ_NO~MAKER_DT_STAMP~CHECKER_ID~ACTION_CODE~SEQUENCE_NO~ONCE_AUTH~MOD_NO~RECORD_STAT~LS_EVENT_CODE~UI_AUTH_STAT~UI_RECORD_STAT</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_LS_BROWSER" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONSOL_LS_BROWSER_DETAIL">SOURCE_CODE~CONSOL_TICKET_REF_NO~CUSIP_NO~EVENT_SEQ_NO~TICKET_ID~TRADE_REF_NO~TICKET_SETTLEMENT_SEQ_NO~BUY_SELL~UI_BUY_SELL~UI_POSITION_IDENTIFIER~UI_COUNTERPARTY~UI_CURRENCY~UI_TRADE_AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_LS_BROWSER" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONSOL_LS_EVENT_DETAIL">SOURCE_CODE~CONSOL_TICKET_REF_NO~UI_CURRENCY~CUSIP_NO~BROWSER_SEQ_NO~PARTICIPANT~AMOUNT~UI_PARTICIPANT_NAME</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_LS_BROWSER" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONSOL_LS_EXCEPTION">SOURCE_CODE~CONSOL_TICKET_REF_NO~CUSIP_NO~BROWSER_SEQ_NO~ERR_SEQ_NO~ERROR_CODE~UI_ERROR_MESSAGE~ERROR_PARAM</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_CONSOL_LS_BROWSER">SOURCE_CODE~CONSOL_TICKET_REF_NO~CUSIP_NO~PROCESSING_DATE~AGENCY_REF_NO~PROCESSING_STATUS~AUTHSTAT~RECORD_STAT~BROWSER_SEQ_NO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDLBCIB";
var defaultWhereClause = "sypks_utils.get_branch(CONSOL_TICKET_REF_NO)=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TLTBS_CONSOL_LS_BROWSER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTBS_CONSOL_LS_BROWSER" : "","BLK_TLTBS_CONSOL_LS_BROWSER_DETAIL" : "BLK_TLTBS_CONSOL_LS_BROWSER~N","BLK_TLTBS_CONSOL_LS_EVENT_DETAIL" : "BLK_TLTBS_CONSOL_LS_BROWSER~N","BLK_TLTBS_CONSOL_LS_EXCEPTION" : "BLK_TLTBS_CONSOL_LS_BROWSER~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTBS_CONSOL_LS_BROWSER","BLK_TLTBS_CONSOL_LS_BROWSER_DETAIL","BLK_TLTBS_CONSOL_LS_EVENT_DETAIL","BLK_TLTBS_CONSOL_LS_EXCEPTION"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDLBCIB.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDLBCIB.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTBS_CONSOL_LS_BROWSER__SOURCE_CODE";
pkFields[0] = "BLK_TLTBS_CONSOL_LS_BROWSER__SOURCE_CODE";
queryFields[1] = "BLK_TLTBS_CONSOL_LS_BROWSER__CONSOL_TICKET_REF_NO";
pkFields[1] = "BLK_TLTBS_CONSOL_LS_BROWSER__CONSOL_TICKET_REF_NO";
queryFields[2] = "BLK_TLTBS_CONSOL_LS_BROWSER__CUSIP_NO";
pkFields[2] = "BLK_TLTBS_CONSOL_LS_BROWSER__CUSIP_NO";
queryFields[3] = "BLK_TLTBS_CONSOL_LS_BROWSER__BROWSER_SEQ_NO";
pkFields[3] = "BLK_TLTBS_CONSOL_LS_BROWSER__BROWSER_SEQ_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TLTBS_CONSOL_LS_BROWSER":["AGENCY_REF_NO","PROCESSING_STATUS"]};
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
var lovInfoFlds = {"BLK_TLTBS_CONSOL_LS_BROWSER__SOURCE_CODE__LOV_SOURCE":["BLK_TLTBS_CONSOL_LS_BROWSER__SOURCE_CODE~BLK_TLTBS_CONSOL_LS_BROWSER__CONSOL_TICKET_REF_NO~BLK_TLTBS_CONSOL_LS_BROWSER__CUSIP_NO~BLK_TLTBS_CONSOL_LS_BROWSER__BROWSER_SEQ_NO~","","N~N~N~N",""],"BLK_TLTBS_CONSOL_LS_BROWSER__AGENCY_REF_NO__LOV_CONTRACT":["BLK_TLTBS_CONSOL_LS_BROWSER__AGENCY_REF_NO~~","","N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_TRADE_DETAILS';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_TLTBS_CONSOL_LS_BROWSER_DETAIL","BLK_TLTBS_CONSOL_LS_EVENT_DETAIL","BLK_TLTBS_CONSOL_LS_EXCEPTION");
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

ArrFuncOrigin["TLDLBCIB"]="KERNEL";
ArrPrntFunc["TLDLBCIB"]="";
ArrPrntOrigin["TLDLBCIB"]="";
ArrRoutingType["TLDLBCIB"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDLBCIB"]="N";
ArrCustomModified["TLDLBCIB"]="N";

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