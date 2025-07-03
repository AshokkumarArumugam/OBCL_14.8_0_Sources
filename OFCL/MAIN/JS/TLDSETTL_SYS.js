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
**  File Name          : TLDSETTL_SYS.js
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
var fieldNameArray = {"BLK_TRD_STL":"FCCREF~BRANCH~PORTFOLIO~POSITION_ID~CUSIP~DESK_CD~USRREF~EXPENSE_CD~PORT_DESC~POSITION_QUA~TKT_ID~SWAP_ID~BOOK_DT~TRD_DT~EXP_STL_DT~ACT_STL_DT~AGENCY_ID~CNPRTY~ASSIGN_FEE_TYPE~ASSIGN_FEE_REMIT~TRDFCCREF~ESN~FMEM_STAT~FMEM_SRC~FMEM_ADV_REQD~NONPRORATA~LESN~CURR_STL~TOT_STL~SWAP_REQD~TRADE_AMT~ENABLE_FEE~REV_REQD~FEE_REQD~TESN~LVER~SUBSYSSTAT~EXT_PARTY_TRADE~FMEMUP~FMEMO~ASGNFEE_PMNT_ATTKT~ORIGINAL_REF_NO~MNEMONIC_MAPPING~SSI_RECORD_EXIST~AGENCY_REF_NO~CASCADE_PARTICIPATION~AGENCY_TYPE~TRADE_IDENTIFIER~BUY~SETL_AMT_DUE_PICKED~VERQUERY~PRDCD~MRKT_TRADE_ID~CONTRASTATS~ADJUSTMENT_RATE","BLK_FEE_DET":"FEE_FCCREF~FEE_ESN~FEETYP~FEE_DESC~LIQ_COMP~FEE_COMP","BLK_FOOTER":"FOOT_FCCREF~MAKER_ID~MAKER_DT_STAMP~REV_MAKER_ID~REV_MAKER_DT~CHECKER_ID~CHECKER_DT_STAMP~REV_CHECKER_ID~REV_CHECKER_DT~FOOT_ESN~FOOT_CONT_STAT~FOOT_AUTH_STAT~TXNSTAT~EVENTDT~FOOTMOD~EVENTCD","BLK_SUMMARY":"AUTH_STATUS~USER_REF_NO~CONTRACT_STATUS~COUNTERPARTY~PRODUCT_TYPE~BRANCH~SETTLE_STATUS~FCCREF~CUSIP_NO"};

var multipleEntryPageSize = {"BLK_FEE_DET" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_TRADE_STL__TAB_MAIN":"BLK_FEE_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TRD_STL">FCCREF~BRANCH~PORTFOLIO~POSITION_ID~CUSIP~DESK_CD~USRREF~EXPENSE_CD~PORT_DESC~POSITION_QUA~TKT_ID~SWAP_ID~BOOK_DT~TRD_DT~EXP_STL_DT~ACT_STL_DT~AGENCY_ID~CNPRTY~ASSIGN_FEE_TYPE~ASSIGN_FEE_REMIT~TRDFCCREF~ESN~FMEM_STAT~FMEM_SRC~FMEM_ADV_REQD~NONPRORATA~LESN~CURR_STL~TOT_STL~SWAP_REQD~TRADE_AMT~ENABLE_FEE~REV_REQD~FEE_REQD~TESN~LVER~SUBSYSSTAT~EXT_PARTY_TRADE~FMEMUP~FMEMO~ASGNFEE_PMNT_ATTKT~ORIGINAL_REF_NO~MNEMONIC_MAPPING~SSI_RECORD_EXIST~AGENCY_REF_NO~CASCADE_PARTICIPATION~AGENCY_TYPE~TRADE_IDENTIFIER~BUY~SETL_AMT_DUE_PICKED~VERQUERY~PRDCD~MRKT_TRADE_ID~CONTRASTATS~ADJUSTMENT_RATE</FN>'; 
msgxml += '      <FN PARENT="BLK_TRD_STL" RELATION_TYPE="N" TYPE="BLK_FEE_DET">FEE_FCCREF~FEE_ESN~FEETYP~FEE_DESC~LIQ_COMP~FEE_COMP</FN>'; 
msgxml += '      <FN PARENT="BLK_TRD_STL" RELATION_TYPE="1" TYPE="BLK_FOOTER">FOOT_FCCREF~MAKER_ID~MAKER_DT_STAMP~REV_MAKER_ID~REV_MAKER_DT~CHECKER_ID~CHECKER_DT_STAMP~REV_CHECKER_ID~REV_CHECKER_DT~FOOT_ESN~FOOT_CONT_STAT~FOOT_AUTH_STAT~TXNSTAT~EVENTDT~FOOTMOD~EVENTCD</FN>'; 
msgxml += '      <FN PARENT="BLK_TRD_STL" RELATION_TYPE="1" TYPE="BLK_SUMMARY">AUTH_STATUS~USER_REF_NO~CONTRACT_STATUS~COUNTERPARTY~PRODUCT_TYPE~BRANCH~SETTLE_STATUS~FCCREF~CUSIP_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TRADE_STL";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_TRD_STL" RELATION_TYPE="1" TYPE="BLK_SUMMARY">AUTH_STATUS~CONTRACT_STATUS~FCCREF~USER_REF_NO~CUSIP_NO~COUNTERPARTY~PRODUCT_TYPE~BRANCH~SETTLE_STATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDSETTL";
var defaultWhereClause = "BRANCH=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TRD_STL" : "","BLK_FEE_DET" : "BLK_TRD_STL~N","BLK_FOOTER" : "BLK_TRD_STL~1","BLK_SUMMARY" : "BLK_TRD_STL~1"}; 

 var dataSrcLocationArray = new Array("BLK_TRD_STL","BLK_FEE_DET","BLK_FOOTER","BLK_SUMMARY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDSETTL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDSETTL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TRD_STL__FCCREF";
pkFields[0] = "BLK_TRD_STL__FCCREF";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_FEE_DET":["LIQ_COMP"],"BLK_TRD_STL":["ACT_STL_DTI","AGENCY_ID","ASSIGN_FEE_REMIT","FMEM_ADV_REQD","FMEM_SRC","NONPRORATA"]};
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
var lovInfoFlds = {"BLK_TRD_STL__FCCREF__LOV_FCCREF":["BLK_TRD_STL__FCCREF~","","N",""],"BLK_TRD_STL__AGENCY_ID__LOV_AGENCY_ID":["BLK_TRD_STL__AGENCY_ID~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_FEE_DET");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_TRD_STL","TLCONSSI~BLK_TRD_STL","TLCAGFEE~BLK_TRD_STL","TLCEXSSI~BLK_TRD_STL","TLCMEMUP~BLK_TRD_STL","TLCFMEMO~BLK_TRD_STL","TLCTRENT~BLK_TRD_STL"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__SETT.CONTRACT_REF_NO AND OLTBS_CONTRACT.LATEST_EVENT_SEQ_NO = OLTBS_CONTRACT__SETT.LATEST_EVENT_SEQ_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__SSI.CONTRACT_REF_NO AND OLTBS_CONTRACT.LATEST_VERSION_NO = OLTBS_CONTRACT__SSI.LATEST_VERSION_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = TLTBS_CONTRACT_FEE__CA.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = TLVW_EXT_TKT_CUSIP_DET__V.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = TLTBS_FMEM_UPLOAD_MASTER.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = TLTBS_FMEM_MASTER.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = TLTBS_CONTRACT_MASTER.CONTRACT_REF_NO AND OLTBS_CONTRACT.LATEST_VERSION_NO = TLTBS_CONTRACT_MASTER.VERSION_NO"); 

 var CallRelatType= new Array("1","1","1","1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDSETTL"]="KERNEL";
ArrPrntFunc["TLDSETTL"]="";
ArrPrntOrigin["TLDSETTL"]="";
ArrRoutingType["TLDSETTL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDSETTL"]="N";
ArrCustomModified["TLDSETTL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN","TLCONSSI":"CONTRACTREFNO~LATESTVERNO","TLCAGFEE":"CONTRACT_REF_NO","TLCEXSSI":"REFERENCE_NO","TLCMEMUP":"TRADE_REF_NO","TLCFMEMO":"REF_NO","TLCTRENT":"CONTREFNO~COUNTERPATY~VERSIONNO","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLCONDET":"BLK_TRD_STL__FCCREF~BLK_TRD_STL__ESN","TLCONSSI":"BLK_TRD_STL__FCCREF~BLK_TRD_STL__LVER","TLCAGFEE":"BLK_TRD_STL__FCCREF","TLCEXSSI":"BLK_TRD_STL__FCCREF","TLCMEMUP":"BLK_TRD_STL__FCCREF","TLCFMEMO":"BLK_TRD_STL__FCCREF","TLCTRENT":"BLK_TRD_STL__FCCREF~BLK_TRD_STL__CNPRTY~BLK_TRD_STL__LVER","OLDEVENT":"BLK_TRD_STL__FCCREF~"};
var scrArgVals = {"OLCONDET":"~","TLCONSSI":"~","TLCAGFEE":"","TLCEXSSI":"","TLCMEMUP":"","TLCFMEMO":"","TLCTRENT":"~~","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":"","TLCONSSI":"BLK_TRD_STL__AGENCY_ID","TLCAGFEE":"","TLCEXSSI":"","TLCMEMUP":"BLK_TRD_STL__ACT_STL_DT~BLK_TRD_STL__FMEM_SRC~BLK_TRD_STL__AGENCY_ID","TLCFMEMO":"BLK_TRD_STL__FMEM_SRC","TLCTRENT":""};
var dpndntOnSrvs = {"OLCONDET":"TLCONSSI","TLCONSSI":"","TLCAGFEE":"","TLCEXSSI":"","TLCMEMUP":"","TLCFMEMO":"TLCMEMUP~TLCAGFEE~TLCONSSI~OLCONDET","TLCTRENT":""};
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