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
**  File Name          : TLDTKSTL_SYS.js
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
var fieldNameArray = {"BLK_TKT_MASTER":"TKT_ID~TKT_REF_NO~ACT_STL_DT~PMT_MSG_SUP~FMEM_ADV_REQD~NEW_NON_PRORATA~SUBSYSSTAT","BLK_FEE_DET":"FEE_TKT_ID~FEE_TYPE~FEE_DESC~FEE_LIQ_COMP","BLK_TRD_DET":"TRD_REF_NO~CUSIP~TRD_DT~CCY~TRD_AMT~BUYSELL~EXPT_STL_DT~FMEMO_SRC~TRD_CNPTY~TRD_STL_STAT~TRD_AUTH_STAT~TRD_TKT_ID~AGENCY_ID~AGENCY_DESC~TXT_BORROWER~TXT_MATURITY_DATE~SETTLEMENT_STATUS~TXT_FMEMO~TXT_FMEMUP~SUBSYSTEM_STAT~SCREENFLAG~TXT_MRKT_TRADE_ID~ADJUSTMENT_RATE","BLK_FOOTER":"MAKER~MAKER_DT_STAMP~CHECKER~CHEKCER_DT_STAMP~FOOT_TKT_STAT~AUTHSTAT~PROPAGATE_SSI~ONCE_AUTH~MOD_NO~RECORD_STAT~AUTH_STAT~UI_TICKET_AUTH_STAT~UI_FOOT_TKT_STATUS~UI_CHECKER_DT_STAMP~UI_CHECKER","BLK_ASSIGN_FEE":"ASF_TKT_ID~ASF_CPTY~ASF_CCY~ASF_TRD_REF_NO~ASF_FEE_REMIT~ASF_FEE_TYP~ASF_AMT~ASF_BUY_SPLIT_AMT~ASF_SEL_SPT_AMT","BLK_PM_SUB_TKT_DTL":"SUB_TKT_ID~CUST_NAME~SUB_TKT_CPTY~SUB_REF_NO~SUB_TKT_REF_NO","BLK_PAY_CCY_FMEM_DTL":"TICKET_ID~COUNTERPARTY~CURRENCY~SETTL_AMOUNT~DCF_AMOUNT~BFF_AMOUNT~ASSIGN_FEE_AMOUNT~AMEND_FEE_AMOUNT~ADHOC_SELLER_AMOUNT~ADHOC_BUYER_AMOUNT~WAIVER_AMOUNT~CCY_TOT_AMT","BLK_PAY_DTL":"PAY_REF_NO~PAY_CPTY~PAY_CCY~PAY_AMT~PAY_SEN_RECV_INFO~UI_MSG_STATUS~UI_CUTOMER_NAME","BLK_ERR":"ERR_FCC_REF~ERR_SEQ_NO~ERR_CD~ERR_PARAM~ERR_DESC~UI_ERROR_TYPE","BLK_SSI_MASTER":"SSI_MAS_TKT_ID~SSI_MAS_TKT_REF","BLK_SSI_CUST":"SSI_TKT_ID~SSI_CUST~SS_CUST_NAME~SSI_CUST_TYPE","BLK_SSI_CCY":"SSI_FCC_REF~SSI_MNEMO_FOR~SSI_ESQ~SSI_CCY~SSI_CCY_DESC~SSI_MNEMO~SSI_REMARKS~SETTLEMENT_SEQ_NO~CUSTOMER_NO"};

var multipleEntryPageSize = {"BLK_FEE_DET" :"15" ,"BLK_TRD_DET" :"15" ,"BLK_ASSIGN_FEE" :"15" ,"BLK_PM_SUB_TKT_DTL" :"15" ,"BLK_PAY_CCY_FMEM_DTL" :"15" ,"BLK_PAY_DTL" :"15" ,"BLK_ERR" :"15" ,"BLK_SSI_CUST" :"15" ,"BLK_SSI_CCY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_TKT_STL__TAB_MAIN":"BLK_FEE_DET~BLK_TRD_DET","CVS_ASSIGN_FEE__TAB_MAIN":"BLK_ASSIGN_FEE","CVS_PAY_DTL__TAB_MAIN":"BLK_PM_SUB_TKT_DTL~BLK_PAY_CCY_FMEM_DTL~BLK_PAY_DTL","CVS_ERROR__TAB_MAIN":"BLK_ERR","CVS_TKT_SSI__TAB_MAIN":"BLK_SSI_CUST~BLK_SSI_CCY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TKT_MASTER">TKT_ID~TKT_REF_NO~ACT_STL_DT~PMT_MSG_SUP~FMEM_ADV_REQD~NEW_NON_PRORATA~SUBSYSSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MASTER" RELATION_TYPE="N" TYPE="BLK_FEE_DET">FEE_TKT_ID~FEE_TYPE~FEE_DESC~FEE_LIQ_COMP</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MASTER" RELATION_TYPE="N" TYPE="BLK_TRD_DET">TRD_REF_NO~CUSIP~TRD_DT~CCY~TRD_AMT~BUYSELL~EXPT_STL_DT~FMEMO_SRC~TRD_CNPTY~TRD_STL_STAT~TRD_AUTH_STAT~TRD_TKT_ID~AGENCY_ID~AGENCY_DESC~TXT_BORROWER~TXT_MATURITY_DATE~SETTLEMENT_STATUS~TXT_FMEMO~TXT_FMEMUP~SUBSYSTEM_STAT~SCREENFLAG~TXT_MRKT_TRADE_ID~ADJUSTMENT_RATE</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MASTER" RELATION_TYPE="1" TYPE="BLK_FOOTER">MAKER~MAKER_DT_STAMP~CHECKER~CHEKCER_DT_STAMP~FOOT_TKT_STAT~AUTHSTAT~PROPAGATE_SSI~ONCE_AUTH~MOD_NO~RECORD_STAT~AUTH_STAT~UI_TICKET_AUTH_STAT~UI_FOOT_TKT_STATUS~UI_CHECKER_DT_STAMP~UI_CHECKER</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MASTER" RELATION_TYPE="N" TYPE="BLK_ASSIGN_FEE">ASF_TKT_ID~ASF_CPTY~ASF_CCY~ASF_TRD_REF_NO~ASF_FEE_REMIT~ASF_FEE_TYP~ASF_AMT~ASF_BUY_SPLIT_AMT~ASF_SEL_SPT_AMT</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MASTER" RELATION_TYPE="N" TYPE="BLK_PM_SUB_TKT_DTL">SUB_TKT_ID~CUST_NAME~SUB_TKT_CPTY~SUB_REF_NO~SUB_TKT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MASTER" RELATION_TYPE="1" TYPE="BLK_PAY_CCY_FMEM_DTL">TICKET_ID~COUNTERPARTY~CURRENCY~SETTL_AMOUNT~DCF_AMOUNT~BFF_AMOUNT~ASSIGN_FEE_AMOUNT~AMEND_FEE_AMOUNT~ADHOC_SELLER_AMOUNT~ADHOC_BUYER_AMOUNT~WAIVER_AMOUNT~CCY_TOT_AMT</FN>'; 
msgxml += '      <FN PARENT="BLK_PM_SUB_TKT_DTL" RELATION_TYPE="N" TYPE="BLK_PAY_DTL">PAY_REF_NO~PAY_CPTY~PAY_CCY~PAY_AMT~PAY_SEN_RECV_INFO~UI_MSG_STATUS~UI_CUTOMER_NAME</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MASTER" RELATION_TYPE="N" TYPE="BLK_ERR">ERR_FCC_REF~ERR_SEQ_NO~ERR_CD~ERR_PARAM~ERR_DESC~UI_ERROR_TYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MASTER" RELATION_TYPE="1" TYPE="BLK_SSI_MASTER">SSI_MAS_TKT_ID~SSI_MAS_TKT_REF</FN>'; 
msgxml += '      <FN PARENT="BLK_SSI_MASTER" RELATION_TYPE="N" TYPE="BLK_SSI_CUST">SSI_TKT_ID~SSI_CUST~SS_CUST_NAME~SSI_CUST_TYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_SSI_CUST" RELATION_TYPE="N" TYPE="BLK_SSI_CCY">SSI_FCC_REF~SSI_MNEMO_FOR~SSI_ESQ~SSI_CCY~SSI_CCY_DESC~SSI_MNEMO~SSI_REMARKS~SETTLEMENT_SEQ_NO~CUSTOMER_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TKT_STL";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TKT_MASTER">TKT_ID~TKT_REF_NO~ACT_STL_DT~PMT_MSG_SUP~FMEM_ADV_REQD~NEW_NON_PRORATA~SUBSYSSTAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDTKSTL";
var defaultWhereClause = "exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(TICKET_REF_NO) AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TKT_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TKT_MASTER" : "","BLK_FEE_DET" : "BLK_TKT_MASTER~N","BLK_TRD_DET" : "BLK_TKT_MASTER~N","BLK_FOOTER" : "BLK_TKT_MASTER~1","BLK_ASSIGN_FEE" : "BLK_TKT_MASTER~N","BLK_PM_SUB_TKT_DTL" : "BLK_TKT_MASTER~N","BLK_PAY_CCY_FMEM_DTL" : "BLK_TKT_MASTER~1","BLK_PAY_DTL" : "BLK_PM_SUB_TKT_DTL~N","BLK_ERR" : "BLK_TKT_MASTER~N","BLK_SSI_MASTER" : "BLK_TKT_MASTER~1","BLK_SSI_CUST" : "BLK_SSI_MASTER~N","BLK_SSI_CCY" : "BLK_SSI_CUST~N"}; 

 var dataSrcLocationArray = new Array("BLK_TKT_MASTER","BLK_FEE_DET","BLK_TRD_DET","BLK_FOOTER","BLK_ASSIGN_FEE","BLK_PM_SUB_TKT_DTL","BLK_PAY_CCY_FMEM_DTL","BLK_PAY_DTL","BLK_ERR","BLK_SSI_MASTER","BLK_SSI_CUST","BLK_SSI_CCY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTKSTL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTKSTL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TKT_MASTER__TKT_ID";
pkFields[0] = "BLK_TKT_MASTER__TKT_ID";
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
var lovInfoFlds = {"BLK_TKT_MASTER__TKT_ID__LOV_TKT_ID":["BLK_TKT_MASTER__TKT_ID~","","N",""],"BLK_TRD_DET__AGENCY_ID__LOV_AGENCY_ID":["BLK_TRD_DET__AGENCY_ID~BLK_TRD_DET__AGENCY_DESC~","","N~N",""],"BLK_ASSIGN_FEE__ASF_CPTY__LOV_ASF_CPTY":["BLK_ASSIGN_FEE__ASF_CPTY~","BLK_TKT_MASTER__TKT_ID!VARCHAR2~BLK_TKT_MASTER__TKT_ID!VARCHAR2~BLK_TKT_MASTER__TKT_ID!VARCHAR2","N",""],"BLK_ASSIGN_FEE__ASF_CCY__LOV_ASF_CCY":["BLK_ASSIGN_FEE__ASF_CCY~~","BLK_ASSIGN_FEE__ASF_TKT_ID!varchar2~BLK_ASSIGN_FEE__ASF_CPTY!varchar2","N~N",""],"BLK_ASSIGN_FEE__ASF_TRD_REF_NO__LOV_ASF_TRD_REF":["BLK_ASSIGN_FEE__ASF_TKT_ID~BLK_ASSIGN_FEE__ASF_TRD_REF_NO~","BLK_TKT_MASTER__TKT_ID!VARCHAR2~BLK_ASSIGN_FEE__ASF_CPTY!VARCHAR2~BLK_TKT_MASTER__TKT_ID!VARCHAR2","N~N",""],"BLK_SSI_CCY__SSI_CCY__LOV_SSI_CCY":["BLK_SSI_CCY__SSI_CCY~BLK_SSI_CCY__SSI_CCY_DESC~","","N~N",""],"BLK_SSI_CCY__SSI_MNEMO__LOV_SSI_MNEMONIC":["BLK_SSI_CCY__SSI_MNEMO~~~~~","","N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_FEE_DET","BLK_TRD_DET","BLK_ASSIGN_FEE","BLK_PM_SUB_TKT_DTL","BLK_PAY_DTL","BLK_ERR","BLK_SSI_CUST","BLK_SSI_CCY");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCETMVW~BLK_PAY_DTL","TLCEXSSI~BLK_TKT_MASTER","TLCFMEMO~BLK_TRD_DET","TLCMEMUP~BLK_TRD_DET"); 

 var CallFormRelat=new Array("OLVWS_ALL_MSG_OUT.REFERENCE_NO=OLVW_SETTLEMENT_INFO.CONTRACT_REF_NO","TLTBS_TICKET_MASTER.TICKET_REF_NO=TLVW_EXT_TKT_CUSIP_DET__V.CONTRACT_REF_NO","TLTBS_TICKET_DETAIL.TRADE_REF_NO=TLTBS_FMEM_MASTER.CONTRACT_REF_NO","TLTBS_TICKET_DETAIL.TRADE_REF_NO=TLTBS_FMEM_UPLOAD_MASTER.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDTKSTL"]="KERNEL";
ArrPrntFunc["TLDTKSTL"]="";
ArrPrntOrigin["TLDTKSTL"]="";
ArrRoutingType["TLDTKSTL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTKSTL"]="N";
ArrCustomModified["TLDTKSTL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ASSIGN_FEE":"ASF_TKT_ID","CVS_TKT_SSI":"TKT_ID~TKT_REF_NO","OLCETMVW":"CONTRACTREFNO","TLCEXSSI":"REFERENCE","TLCFMEMO":"REF_NO","TLCMEMUP":"TRADE_REF_NO","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"CVS_ASSIGN_FEE":"BLK_TKT_MASTER__TKT_ID","CVS_TKT_SSI":"BLK_TKT_MASTER__TKT_ID~BLK_TKT_MASTER__TKT_REF_NO","OLCETMVW":"BLK_PAY_DTL__PAY_REF_NO","TLCEXSSI":"BLK_TKT_MASTER__TKT_REF_NO","TLCFMEMO":"BLK_TRD_DET__TRD_REF_NO","TLCMEMUP":"BLK_TRD_DET__TRD_REF_NO","OLDEVENT":"BLK_TKT_MASTER__TKT_REF_NO~"};
var scrArgVals = {"CVS_ASSIGN_FEE":"","CVS_TKT_SSI":"~","OLCETMVW":"","TLCEXSSI":"","TLCFMEMO":"","TLCMEMUP":"","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_ASSIGN_FEE":"BLK_ASSIGN_FEE__ASF_TKT_ID","CVS_TKT_SSI":"BLK_SSI_MASTER__SSI_MAS_TKT_ID~BLK_SSI_MASTER__SSI_MAS_TKT_REF"};
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