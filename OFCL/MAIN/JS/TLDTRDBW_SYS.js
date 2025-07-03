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
**  File Name          : TLDTRDBW_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_LT_TRADE":"TRANS_ID~SOURCE_CODE~MARKIT_ALLOCATION_ID~MARKIT_TRADE_ID~ASSIGNMENTFEE_REMITTER~CR_KEY~ACTUAL_TICKET_ID~LINE_TRADE_TYPE~PRIMARY_TRADE~SETTLEMENT_CCY~DEAL_TOT_AMNT~LCDS_DFLT_FLG~AMENDMENT_REASON_NOTES~AMENDMENT_REASON~PORTFOLIOID~RIDER_TERMS~DOC_SOURCE~PAR_DIST_DOC~MANAGE_GRP_NAME~MANAGE_GRP_ID~OTHER_TERMS~DOC_TYPE~SEND_RECEIVE~CITIDOCS~LEGAL_VEHICLE~REGION~CONTACT_EMAIL~CONTACT_FAX~CONTACT_TEL~CONTACT_NAME~BREAK_FUND_FLG~INTEREST_TYPE~ASSIGNMENTFEE_TYPE~PARTICIPATIONOF_DETAILS~DISTRIBUTION_TYPE~TRANS_ROLE~TRANS_SUBJECT~LQT_DEALID~EXEC_TIME~EXPECTED_SETTL_DATE~SETTLEMENT_DATE~TRADE_DATE~ASOF_FLAG~DESK_CODE~SALES_ID~TRADER_ID~COMMENTS~STATUS_NOTES~ENTRY_DATETIME~ENTRY_BY~HOSTNAME~TRADE_AMOUNT~TRADE_NET_PRICE~TRADE_PRICE~CUSIP_NO~PRODUCT_ID~COUNTERPARTY_MNEMONIC~COUNTERPARTY~FIRM_ACCT_MNEMONIC~FIRM_ACCT_ID~STRATERY_GRP_ID~TRADE_TYPE~TRADE_TRANS_TYPE~STATUS~STATE~UPLOAD_STATUS~TICKET_VERSION~TICKET_ID~TRADE_VERSION~TRADE_ID~TRANS_ACTION~UI_TRADE_REF_NO~UI_STATUS_CHANGE_BY~UI_STATUS_CHANGE_DT","BLK_OLTBS_LT_FEE":"SOURCE_CODE~TRANS_ID~EV_CPTY~RECALC_FEE~PAYREC_FLAG~FEE_COMMENTS~FEE_AMOUNT~FEE_BPS~FEE_PERSON_ID~FEE_TYPE~TRADE_VERSION~TRADE_ID","BLK_OLTBS_LT_IN_LOG":"TRANS_XML~SOURCE_CODE~TRANS_ID","BLK_TLTBS_CONTRACT_EXCEPTION":"EXT_CONTRACT_REF_NO~ERR_SEQ_NO~ERROR_CODE~ERROR_PARAM"};

var multipleEntryPageSize = {"BLK_OLTBS_LT_FEE" :"15" ,"BLK_TLTBS_CONTRACT_EXCEPTION" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_FEE":"BLK_OLTBS_LT_FEE","CVS_MAIN__TAB_ERROR":"BLK_TLTBS_CONTRACT_EXCEPTION"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_LT_TRADE">TRANS_ID~SOURCE_CODE~MARKIT_ALLOCATION_ID~MARKIT_TRADE_ID~ASSIGNMENTFEE_REMITTER~CR_KEY~ACTUAL_TICKET_ID~LINE_TRADE_TYPE~PRIMARY_TRADE~SETTLEMENT_CCY~DEAL_TOT_AMNT~LCDS_DFLT_FLG~AMENDMENT_REASON_NOTES~AMENDMENT_REASON~PORTFOLIOID~RIDER_TERMS~DOC_SOURCE~PAR_DIST_DOC~MANAGE_GRP_NAME~MANAGE_GRP_ID~OTHER_TERMS~DOC_TYPE~SEND_RECEIVE~CITIDOCS~LEGAL_VEHICLE~REGION~CONTACT_EMAIL~CONTACT_FAX~CONTACT_TEL~CONTACT_NAME~BREAK_FUND_FLG~INTEREST_TYPE~ASSIGNMENTFEE_TYPE~PARTICIPATIONOF_DETAILS~DISTRIBUTION_TYPE~TRANS_ROLE~TRANS_SUBJECT~LQT_DEALID~EXEC_TIME~EXPECTED_SETTL_DATE~SETTLEMENT_DATE~TRADE_DATE~ASOF_FLAG~DESK_CODE~SALES_ID~TRADER_ID~COMMENTS~STATUS_NOTES~ENTRY_DATETIME~ENTRY_BY~HOSTNAME~TRADE_AMOUNT~TRADE_NET_PRICE~TRADE_PRICE~CUSIP_NO~PRODUCT_ID~COUNTERPARTY_MNEMONIC~COUNTERPARTY~FIRM_ACCT_MNEMONIC~FIRM_ACCT_ID~STRATERY_GRP_ID~TRADE_TYPE~TRADE_TRANS_TYPE~STATUS~STATE~UPLOAD_STATUS~TICKET_VERSION~TICKET_ID~TRADE_VERSION~TRADE_ID~TRANS_ACTION~UI_TRADE_REF_NO~UI_STATUS_CHANGE_BY~UI_STATUS_CHANGE_DT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LT_TRADE" RELATION_TYPE="N" TYPE="BLK_OLTBS_LT_FEE">SOURCE_CODE~TRANS_ID~EV_CPTY~RECALC_FEE~PAYREC_FLAG~FEE_COMMENTS~FEE_AMOUNT~FEE_BPS~FEE_PERSON_ID~FEE_TYPE~TRADE_VERSION~TRADE_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LT_TRADE" RELATION_TYPE="1" TYPE="BLK_OLTBS_LT_IN_LOG">TRANS_XML~SOURCE_CODE~TRANS_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LT_TRADE" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONTRACT_EXCEPTION">EXT_CONTRACT_REF_NO~ERR_SEQ_NO~ERROR_CODE~ERROR_PARAM</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_LT_TRADE">TRANS_ID~SOURCE_CODE~UPLOAD_STATUS~TRANS_ACTION~TRADE_ID~TRADE_VERSION~MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDTRDBW";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_LT_TRADE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_LT_TRADE" : "","BLK_OLTBS_LT_FEE" : "BLK_OLTBS_LT_TRADE~N","BLK_OLTBS_LT_IN_LOG" : "BLK_OLTBS_LT_TRADE~1","BLK_TLTBS_CONTRACT_EXCEPTION" : "BLK_OLTBS_LT_TRADE~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_LT_TRADE","BLK_OLTBS_LT_FEE","BLK_OLTBS_LT_IN_LOG","BLK_TLTBS_CONTRACT_EXCEPTION"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTRDBW.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTRDBW.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_LT_TRADE__TRANS_ID";
pkFields[0] = "BLK_OLTBS_LT_TRADE__TRANS_ID";
queryFields[1] = "BLK_OLTBS_LT_TRADE__SOURCE_CODE";
pkFields[1] = "BLK_OLTBS_LT_TRADE__SOURCE_CODE";
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
var lovInfoFlds = {"BLK_OLTBS_LT_TRADE__SOURCE_CODE__LOV_SOURCE_CODE":["BLK_OLTBS_LT_TRADE__SOURCE_CODE~BLK_OLTBS_LT_TRADE__TRANS_ID~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_LT_FEE","BLK_TLTBS_CONTRACT_EXCEPTION");
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

ArrFuncOrigin["TLDTRDBW"]="KERNEL";
ArrPrntFunc["TLDTRDBW"]="";
ArrPrntOrigin["TLDTRDBW"]="";
ArrRoutingType["TLDTRDBW"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTRDBW"]="N";
ArrCustomModified["TLDTRDBW"]="N";

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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------