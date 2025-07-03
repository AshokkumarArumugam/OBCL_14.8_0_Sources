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
**  File Name          : TLDMTSTL_SYS.js
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
var fieldNameArray = {"BLK_TLTBS_CONSOL_TICKET_MASTER":"MAKER_DT_STAMP~NON_PRORATA~CHECKER_DT_STAMP~ACTUAL_SETTL_DATE~ONCE_AUTH~RECORD_STAT~TKT_PMNTMSG_SUPPRESS~MOD_NO~FMEM_ADV_REQD~PROPAGATE_SSI~CONSOL_TICKET_REF_NO~TXT_ACTUAL_SETTL_DATE~TXNSTAT~AUTH_STAT~AUTHSTAT~TXT_TXNSTAT~TXT_AUTHSTAT~AUTHBTNFLAG~SUBSYSSTAT~CHECKERID~MAKERID","BLK_TLTBS_CONSOL_TICKET_DETAIL":"TICKET_REF_NO~AGENCY_ID~CONSOL_TICKET_REF_NO~TICKET_SETTLEMENT_SEQ_NO~TICKET_ID~TXT_AGENCY_NAME","BLK_TLTBS_CONSOL_TICKET_FEE":"FEE_TYPE~CONSOL_TICKET_REF_NO~LIQUIDATE_COMPONENT~TXT_FEE_DESCR","BLK_TLTBS_CONSOL_TRADE_DETAIL":"TRADE_DATE~AGENCY_ID~TRADE_REF_NO~TRADE_SETTL_STATUS~BUY_SELL~CONSOL_TICKET_REF_NO~EXPT_SETTL_DATE~CURRENCY~TRADE_AMOUNT~CUSIP_NO~SETTLEMENT_REQD~TICKET_ID~FUNDING_MEMO_SOURCE~TRADE_AUTH_STATUS~TSTL_ESN~TXT_COUNTERPARTY~TXT_BORROWER~TXT_MATURITY_DATE~TXT_SETTLEMNT_STATUS~SCREENFLAG~SUBSYSTEM_STAT~MRKT_TRADE_ID~ADJUSTMENT_RATE","BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE":"CONSOL_TICKET_REF_NO~ASSIGNMENT_FEE_REMITTER~ASSIGNMENT_FEE_TYPE~CURRENCY~BUYER_SPLIT_AMOUNT~TRADE_REF_NO~TICKET_ID~SELLER_SPLIT_AMOUNT~COUNTERPARTY~AMOUNT~TXT_AGENCYID","BLK_TLTBS_CONSOL_PAYMENT_DETAIL":"COUNTERPARTY~CONSOL_TICKET_REF_NO~PAYMENT_REF_NO~TXT_CUSTOMER","BLK_TLVWS_CONSOL_FMEM_CCY_DETAILS":"WAIVER_AMOUNT~DCF_AMOUNT~CURRENCY~SETTL_AMOUNT~AMEND_FEE_AMOUNT~ADHOC_SELLER_AMOUNT~ASSIGN_FEE_AMOUNT~BFF_AMOUNT~CONSOL_TICKET_REF_NO~COUNTERPARTY~ADHOC_BUYER_AMOUNT~TXT_TOTALAMT","BLK_OLVW_ALL_MSG_OUT":"CCY~RUNNING_NO~ADDRESS4~MEDIA~ESN~ADDRESS1~ENTITY~IN_OUT~MSG_TYPE~CONTRACT_REF_NO~MESSAGE~AMOUNT~REFERENCE_NO~LOCATION~DCN~STATUS~RECEIVER~ADDRESS3~NAME~BRANCH~ADDRESS2~REPAIR_REASON~TXT_COUNTERPARTY~TXT_CUSTNAME~SUBSYSSTAT","BLK_TLVW_CONSOL_TICKET_CUSTOMERS":"CUSTOMER~CUSTOMER_TYPE~CONSOL_TICKET_REF_NO~TXT_CONSOL_TICKET_REF_NO~TXT_CUSTNAME","BLK_TLTBS_CONTRACT_CURR_DET":"CONTRACT_REF_NO~MNEMONIC_FOR~CUSTOMER_NO~REMARKS~EVENT_SEQ_NO~SETTLEMENT_SEQ_NO~SSI_MNEMONIC~CURRENCY~TXT_CCYNAME","BLK_TLTBS_FMEM_EXCEPTION":"ERR_PARAM~EVENT_CODE~CONTRACT_REF_NO~SEQ_NO~TBL_NAME~EVENT_SEQ_NO~ERR_CODE~TXT_ERROR_DESC","BLK_OLVW_ALL_MSG_OUT__VW":"BRANCH~STATUS~DCN~MESSAGE~CONTRACT_REF_NO~MSG_TYPE~ESN~RUNNING_NO~CCY"};

var multipleEntryPageSize = {"BLK_TLTBS_CONSOL_TICKET_DETAIL" :"15" ,"BLK_TLTBS_CONSOL_TRADE_DETAIL" :"15" ,"BLK_TLTBS_CONSOL_TICKET_FEE" :"15" ,"BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE" :"15" ,"BLK_TLTBS_CONSOL_PAYMENT_DETAIL" :"15" ,"BLK_TLVWS_CONSOL_FMEM_CCY_DETAILS" :"15" ,"BLK_OLVW_ALL_MSG_OUT" :"15" ,"BLK_TLVW_CONSOL_TICKET_CUSTOMERS" :"15" ,"BLK_TLTBS_CONTRACT_CURR_DET" :"15" ,"BLK_TLTBS_FMEM_EXCEPTION" :"15" };

var multipleEntrySVBlocks = "BLK_OLVW_ALL_MSG_OUT__VW";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_TLTBS_CONSOL_TICKET_DETAIL~BLK_TLTBS_CONSOL_TRADE_DETAIL~BLK_TLTBS_CONSOL_TICKET_FEE","CVS_FEE__TAB_MAIN":"BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE","CVS_PMTDET__TAB_PAYMENT":"BLK_TLTBS_CONSOL_PAYMENT_DETAIL~BLK_TLVWS_CONSOL_FMEM_CCY_DETAILS~BLK_OLVW_ALL_MSG_OUT","CVS_SSI__TAB_SSI":"BLK_TLVW_CONSOL_TICKET_CUSTOMERS~BLK_TLTBS_CONTRACT_CURR_DET","CVS_ERRLOG__TAB_ERR":"BLK_TLTBS_FMEM_EXCEPTION"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_CONSOL_TICKET_MASTER">MAKER_DT_STAMP~NON_PRORATA~CHECKER_DT_STAMP~ACTUAL_SETTL_DATE~ONCE_AUTH~RECORD_STAT~TKT_PMNTMSG_SUPPRESS~MOD_NO~FMEM_ADV_REQD~PROPAGATE_SSI~CONSOL_TICKET_REF_NO~TXT_ACTUAL_SETTL_DATE~TXNSTAT~AUTH_STAT~AUTHSTAT~TXT_TXNSTAT~TXT_AUTHSTAT~AUTHBTNFLAG~SUBSYSSTAT~CHECKERID~MAKERID</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_TICKET_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONSOL_TICKET_DETAIL">TICKET_REF_NO~AGENCY_ID~CONSOL_TICKET_REF_NO~TICKET_SETTLEMENT_SEQ_NO~TICKET_ID~TXT_AGENCY_NAME</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_TICKET_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONSOL_TICKET_FEE">FEE_TYPE~CONSOL_TICKET_REF_NO~LIQUIDATE_COMPONENT~TXT_FEE_DESCR</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_TICKET_DETAIL" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONSOL_TRADE_DETAIL">TRADE_DATE~AGENCY_ID~TRADE_REF_NO~TRADE_SETTL_STATUS~BUY_SELL~CONSOL_TICKET_REF_NO~EXPT_SETTL_DATE~CURRENCY~TRADE_AMOUNT~CUSIP_NO~SETTLEMENT_REQD~TICKET_ID~FUNDING_MEMO_SOURCE~TRADE_AUTH_STATUS~TSTL_ESN~TXT_COUNTERPARTY~TXT_BORROWER~TXT_MATURITY_DATE~TXT_SETTLEMNT_STATUS~SCREENFLAG~SUBSYSTEM_STAT~MRKT_TRADE_ID~ADJUSTMENT_RATE</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_TICKET_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE">CONSOL_TICKET_REF_NO~ASSIGNMENT_FEE_REMITTER~ASSIGNMENT_FEE_TYPE~CURRENCY~BUYER_SPLIT_AMOUNT~TRADE_REF_NO~TICKET_ID~SELLER_SPLIT_AMOUNT~COUNTERPARTY~AMOUNT~TXT_AGENCYID</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_TICKET_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONSOL_PAYMENT_DETAIL">COUNTERPARTY~CONSOL_TICKET_REF_NO~PAYMENT_REF_NO~TXT_CUSTOMER</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_PAYMENT_DETAIL" RELATION_TYPE="N" TYPE="BLK_TLVWS_CONSOL_FMEM_CCY_DETAILS">WAIVER_AMOUNT~DCF_AMOUNT~CURRENCY~SETTL_AMOUNT~AMEND_FEE_AMOUNT~ADHOC_SELLER_AMOUNT~ASSIGN_FEE_AMOUNT~BFF_AMOUNT~CONSOL_TICKET_REF_NO~COUNTERPARTY~ADHOC_BUYER_AMOUNT~TXT_TOTALAMT</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_PAYMENT_DETAIL" RELATION_TYPE="N" TYPE="BLK_OLVW_ALL_MSG_OUT">CCY~RUNNING_NO~ADDRESS4~MEDIA~ESN~ADDRESS1~ENTITY~IN_OUT~MSG_TYPE~CONTRACT_REF_NO~MESSAGE~AMOUNT~REFERENCE_NO~LOCATION~DCN~STATUS~RECEIVER~ADDRESS3~NAME~BRANCH~ADDRESS2~REPAIR_REASON~TXT_COUNTERPARTY~TXT_CUSTNAME~SUBSYSSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_TICKET_MASTER" RELATION_TYPE="N" TYPE="BLK_TLVW_CONSOL_TICKET_CUSTOMERS">CUSTOMER~CUSTOMER_TYPE~CONSOL_TICKET_REF_NO~TXT_CONSOL_TICKET_REF_NO~TXT_CUSTNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_TLVW_CONSOL_TICKET_CUSTOMERS" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONTRACT_CURR_DET">CONTRACT_REF_NO~MNEMONIC_FOR~CUSTOMER_NO~REMARKS~EVENT_SEQ_NO~SETTLEMENT_SEQ_NO~SSI_MNEMONIC~CURRENCY~TXT_CCYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONSOL_TICKET_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTBS_FMEM_EXCEPTION">ERR_PARAM~EVENT_CODE~CONTRACT_REF_NO~SEQ_NO~TBL_NAME~EVENT_SEQ_NO~ERR_CODE~TXT_ERROR_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVW_ALL_MSG_OUT" RELATION_TYPE="N" TYPE="BLK_OLVW_ALL_MSG_OUT__VW">BRANCH~STATUS~DCN~MESSAGE~CONTRACT_REF_NO~MSG_TYPE~ESN~RUNNING_NO~CCY</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_CONSOL_TICKET_MASTER">CONSOL_TICKET_REF_NO~ACTUAL_SETTL_DATE~TKT_PMNTMSG_SUPPRESS~TXNSTAT~AUTHSTAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDMTSTL";
var defaultWhereClause = "exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = PRODUCT_CODE AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TLTBS_CONSOL_TICKET_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTBS_CONSOL_TICKET_MASTER" : "","BLK_TLTBS_CONSOL_TICKET_DETAIL" : "BLK_TLTBS_CONSOL_TICKET_MASTER~N","BLK_TLTBS_CONSOL_TICKET_FEE" : "BLK_TLTBS_CONSOL_TICKET_MASTER~N","BLK_TLTBS_CONSOL_TRADE_DETAIL" : "BLK_TLTBS_CONSOL_TICKET_DETAIL~N","BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE" : "BLK_TLTBS_CONSOL_TICKET_MASTER~N","BLK_TLTBS_CONSOL_PAYMENT_DETAIL" : "BLK_TLTBS_CONSOL_TICKET_MASTER~N","BLK_TLVWS_CONSOL_FMEM_CCY_DETAILS" : "BLK_TLTBS_CONSOL_PAYMENT_DETAIL~N","BLK_OLVW_ALL_MSG_OUT" : "BLK_TLTBS_CONSOL_PAYMENT_DETAIL~N","BLK_TLVW_CONSOL_TICKET_CUSTOMERS" : "BLK_TLTBS_CONSOL_TICKET_MASTER~N","BLK_TLTBS_CONTRACT_CURR_DET" : "BLK_TLVW_CONSOL_TICKET_CUSTOMERS~N","BLK_TLTBS_FMEM_EXCEPTION" : "BLK_TLTBS_CONSOL_TICKET_MASTER~N","BLK_OLVW_ALL_MSG_OUT__VW" : "BLK_OLVW_ALL_MSG_OUT~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTBS_CONSOL_TICKET_MASTER","BLK_TLTBS_CONSOL_TICKET_DETAIL","BLK_TLTBS_CONSOL_TICKET_FEE","BLK_TLTBS_CONSOL_TRADE_DETAIL","BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE","BLK_TLTBS_CONSOL_PAYMENT_DETAIL","BLK_TLVWS_CONSOL_FMEM_CCY_DETAILS","BLK_OLVW_ALL_MSG_OUT","BLK_TLVW_CONSOL_TICKET_CUSTOMERS","BLK_TLTBS_CONTRACT_CURR_DET","BLK_TLTBS_FMEM_EXCEPTION","BLK_OLVW_ALL_MSG_OUT__VW"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDMTSTL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDMTSTL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO";
pkFields[0] = "BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO";
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
var lovInfoFlds = {"BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO__LOV_CONSOL_TICKET_REF_NO":["BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO~","","N",""],"BLK_TLTBS_CONSOL_TICKET_DETAIL__AGENCY_ID__LOV_AGENCY_ID":["BLK_TLTBS_CONSOL_TICKET_DETAIL__AGENCY_ID~BLK_TLTBS_CONSOL_TICKET_DETAIL__TXT_AGENCY_NAME~","","N~N",""],"BLK_TLTBS_CONSOL_TICKET_DETAIL__TICKET_ID__LOV_TKT_ID":["BLK_TLTBS_CONSOL_TICKET_DETAIL__TICKET_ID~","BLK_TLTBS_CONSOL_TICKET_MASTER__ACTUAL_SETTL_DATE!DATE","N",""],"BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE__COUNTERPARTY__LOV_COUNTERPARTY":["BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE__COUNTERPARTY~BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE__TICKET_ID~BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE__CURRENCY~BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE__TRADE_REF_NO~","BLK_TLTBS_CONSOL_TICKET_MASTER__ACTUAL_SETTL_DATE!","N~N~N~N",""],"BLK_TLTBS_CONTRACT_CURR_DET__SSI_MNEMONIC__LOV_MNEMONIC":["BLK_TLTBS_CONTRACT_CURR_DET__SSI_MNEMONIC~BLK_TLTBS_CONTRACT_CURR_DET__SETTLEMENT_SEQ_NO~","BLK_TLVW_CONSOL_TICKET_CUSTOMERS__CUSTOMER!VARCHAR2","N~N",""],"BLK_TLTBS_CONTRACT_CURR_DET__CURRENCY__LOV_CCY_SSI":["BLK_TLTBS_CONTRACT_CURR_DET__CURRENCY~BLK_TLTBS_CONTRACT_CURR_DET__TXT_CCYNAME~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TLTBS_CONSOL_TICKET_DETAIL","BLK_TLTBS_CONSOL_TRADE_DETAIL","BLK_TLTBS_CONSOL_TICKET_FEE","BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE","BLK_TLTBS_CONSOL_PAYMENT_DETAIL","BLK_TLVWS_CONSOL_FMEM_CCY_DETAILS","BLK_OLVW_ALL_MSG_OUT","BLK_TLVW_CONSOL_TICKET_CUSTOMERS","BLK_TLTBS_CONTRACT_CURR_DET","BLK_TLTBS_FMEM_EXCEPTION");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCETMVW~BLK_OLVW_ALL_MSG_OUT","TLCEXSSI~BLK_TLTBS_CONSOL_TICKET_MASTER","TLCFMEMO~BLK_TLTBS_CONSOL_TRADE_DETAIL","TLCMEMUP~BLK_TLTBS_CONSOL_TRADE_DETAIL"); 

 var CallFormRelat=new Array("OLVW_ALL_MSG_OUT.CONTRACT_REF_NO=OLTBS_CONTRACT__TLSETLINFO.CONTRACT_REF_NO","TLTBS_CONSOL_TICKET_MASTER.CONSOL_TICKET_REF_NO=TLVW_EXT_TKT_CUSIP_DET__V.CONTRACT_REF_NO","TLTBS_CONSOL_TRADE_DETAIL.TRADE_REF_NO=TLTBS_FMEM_MASTER.CONTRACT_REF_NO","TLTBS_CONSOL_TRADE_DETAIL.TRADE_REF_NO=TLTBS_FMEM_UPLOAD_MASTER.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDMTSTL"]="KERNEL";
ArrPrntFunc["TLDMTSTL"]="";
ArrPrntOrigin["TLDMTSTL"]="";
ArrRoutingType["TLDMTSTL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDMTSTL"]="N";
ArrCustomModified["TLDMTSTL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_FEE":"CONSOL_TICKET_REF_NO","CVS_PMTDET":"CONSOL_TICKET_REF_NO","CVS_SSI":"CONSOL_TICKET_REF_NO","CVS_ERRLOG":"CONTRACT_REF_NO","CVS_VWMSG":"DCN","OLCETMVW":"CONTRACTREFNO","TLCEXSSI":"REFERENCE","TLCFMEMO":"REF_NO","TLCMEMUP":"TRADE_REF_NO","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"CVS_FEE":"BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO","CVS_PMTDET":"BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO","CVS_SSI":"BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO","CVS_ERRLOG":"BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO","CVS_VWMSG":"BLK_OLVW_ALL_MSG_OUT__DCN","OLCETMVW":"BLK_OLVW_ALL_MSG_OUT__CONTRACT_REF_NO","TLCEXSSI":"BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO","TLCFMEMO":"BLK_TLTBS_CONSOL_TRADE_DETAIL__TRADE_REF_NO","TLCMEMUP":"BLK_TLTBS_CONSOL_TRADE_DETAIL__TRADE_REF_NO","OLDEVENT":"BLK_TLTBS_CONSOL_TICKET_MASTER__CONSOL_TICKET_REF_NO~"};
var scrArgVals = {"CVS_FEE":"","CVS_PMTDET":"","CVS_SSI":"","CVS_ERRLOG":"","CVS_VWMSG":"","OLCETMVW":"","TLCEXSSI":"","TLCFMEMO":"","TLCMEMUP":"","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_FEE":"BLK_TLTBS_CONSOL_TICKET_ASSIGN_FEE__CONSOL_TICKET_REF_NO","CVS_PMTDET":"BLK_TLTBS_CONSOL_PAYMENT_DETAIL__CONSOL_TICKET_REF_NO","CVS_SSI":"BLK_TLVW_CONSOL_TICKET_CUSTOMERS__TXT_CONSOL_TICKET_REF_NO","CVS_ERRLOG":"BLK_TLTBS_FMEM_EXCEPTION__CONTRACT_REF_NO","CVS_VWMSG":"BLK_OLVW_ALL_MSG_OUT__VW__DCN"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCETMVW":"","TLCEXSSI":"","TLCFMEMO":"","TLCMEMUP":""};
var dpndntOnSrvs = {"OLCETMVW":"","TLCEXSSI":"","TLCFMEMO":"","TLCMEMUP":""};
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