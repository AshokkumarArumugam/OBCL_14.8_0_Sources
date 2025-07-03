/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : LBDPYMNT_SYS.js
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
var fieldNameArray = {"BLK_PMT_HDR":"MODULE_CODE~CONTRACTREFNO~CONTRACT_STATUS~TREASURY_SOURCE~PRDCD~PRDDESC~PRODUCT_TYPE~CONTRACT_CCY~LATEST_VERSION_NO~BRANCH~DEPARTMENT_CODE~WORKFLOW_STATUS~AUTH_STATUS~RATE_REVISION_STATUS~CURR_EVENT_CODE~COUNTERPARTY~USER_DEFINED_STATUS~LATEST_EVENT_SEQ_NO~TXT_REP_CCY~OSAMT~ARCHIVED_DATE~OS_REPAMT~SYND_REF_NO~CURRENT_PMT~TOTAL_PMTS~CURRENT_EVENT_SEQ_NO~ORGACTCOD~PROCESSREFNUM~CHANNELREFNUM~CPTYNAME~ECAREQSTATUS~TXT_PL_BUTTON","BLK_PMT_SUMMARY":"PREPAYMENT_PENALTY_RATE~SOURCE_CODE~OVD_MEMO_POSTING~INTEREST_WAIVER~DISCOUNT_RATE~NEGATIVE_AMOUNT_SETTLED~FUNDING_AMOUNT_PAID~ALLOW_TAX_REFUND~EXTERNAL_TRAN_REF_NO~REAPPLY_INT_ON_OUTSTAND_AMT~DDA_ADVICE_REQ~INT_ON_OUTSTANDING_PRINCIPAL~LIQUIDATED_FACE_VALUE~INT_ON_PREPAID_PRINCIPAL~LIQD_INT_ON_PREPAID_PRINCIPAL~PMT_ADJ_AMT2~TRANS_REMARKS~SPECIAL_AMOUNT~PAYMENT_CANCEL~LIQUIDATE_DEPOSIT~PREPMNT_REDEF_METHOD~VALUE_DATE~KEEP_THIS_CONTRACT_ACTIVE~TOTAL_PAID~PAYMENT_SCH_PROCESSING~FUNDED_REPRICE_AMOUNT~CONTRACTREFNO~PREPAYMENT_PENALTY_AMOUNT~EVENT_SEQ_NO~LIMIT_DATE~TRANS_EXCLUDE_FROM_STATEMENT~SCH_DATE~SCHEDULE_DATE~LIMIT_AMOUNT~PAYMENT_REMARKS~PAYMENT_STATUS~PMT_ADJ_AMT1~INTEREST_WAIVER_AMT~PREPAYMENT~REAPPLY_INT_ON_PREPAID_AMT~LCY_EQVT_TOTAL_PAID~STP_TO_LD~SUBSYSSTAT~INTEREST_REFUND_REQUIRED~TXT_PRM_INT_AMT~TXT_PRM_BORR_AMT_DUE~CURR_ACTION_CODE~LCL_CCY~VALUE_DATE_UI~LIMIT_DATE_UI~PREPAIDPRINAMT~UI_NETPAID~UI_NETWAIVED~UI_LCYEQVNETPAID~UI_LCYEQVNETWAIVED~UI_NETCAP~UI_LCYEQVNETCAP","BLK_PMT":"MSG_GENERATED~AMOUNT_DUE~OVERDUE_DAYS~EVENT_SEQ_NO~OVER_PAID_AMT~TAX_PAID~COMPONENT~AMOUNT_PAID~CONTRACTREFNO~AMOUNT_WAIVED~AMOUNT_CAPITALIZED","BLK_BREAKUP":"CONTRACTREFNO~EVENT_SEQ_NO~COMPONENT~DUE_DATE~BASIS_AMOUNT~AMOUNT_SETTLED~PAID_DATE~CURRENCY_SETTLED","BLK_AUDIT":"CHKDTST~AUTHSTAT~WORKFLOW_STATUS~INFORM_STATUS~CHECKERID~EVENT_VALUE_DATE~RELEASE_DT_STAMP~TXNSTAT~RATE_ASSIGN_AUTH_DT_STAMP~REVERSED_EVENT_SEQ_NO~RATE_ASSIGN_DT_STAMP~RATE_REVISION_STATUS~RATE_ASSIGN_AUTH_BY~TRN_TYPE~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~MAKERID~MODULE~EXTERNAL_TRAN_REF_NO~RELEASE_BY~MKRDTSTMP~NEW_VERSION_INDICATOR~RATE_ASSIGNED_BY~ECA_STATUS~CONTRACTREFNO","BLK_PART_RATIO":"CURRENCY~AMOUNT~COMPONENT~COMPONENT_RATIO~COMPONENT_TYPE~CONTRACT_REF_NO~CONTRACT_TYPE~CUSTOMER_NO~DRAWDOWN_NO~EVENT_SEQ_NO~PROCESS~SETTLEMENT_SEQ_NO~SSI_MNEMONIC~SSI_PICKUP_AT~VALUE_DATE~VERSION_NO~TXTPARTNAME","BLK_RATIO_CHNG":"AMOUNT~COMPONENT~COMPONENT_RATIO~COMPONENT_TYPE~CONTRACT_REF_NO~CONTRACT_TYPE~CUSTOMER_NO~DRAWDOWN_NO~EVENT_SEQ_NO~PROCESS~SETTLEMENT_SEQ_NO~SSI_MNEMONIC~SSI_PICKUP_AT~VALUE_DATE~VERSION_NO~TXT_NEW_RATIO"};

var multipleEntryPageSize = {"BLK_BREAKUP" :"15" ,"BLK_PMT" :"15" ,"BLK_PART_RATIO" :"15" ,"BLK_RATIO_CHNG" :"15" };

var multipleEntrySVBlocks = "BLK_PART_RATIO";

var tabMEBlks = {"CVS_SCH_BREAKUP__TAB_MAIN":"BLK_BREAKUP","CVS_LBDPYMNT__TAB_MAIN":"BLK_PMT~BLK_RATIO_CHNG","CVS_PART_PENAL__TAB_MAIN":"BLK_PART_RATIO"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PMT_HDR">MODULE_CODE~CONTRACTREFNO~CONTRACT_STATUS~TREASURY_SOURCE~PRDCD~PRDDESC~PRODUCT_TYPE~CONTRACT_CCY~LATEST_VERSION_NO~BRANCH~DEPARTMENT_CODE~WORKFLOW_STATUS~AUTH_STATUS~RATE_REVISION_STATUS~CURR_EVENT_CODE~COUNTERPARTY~USER_DEFINED_STATUS~LATEST_EVENT_SEQ_NO~TXT_REP_CCY~OSAMT~ARCHIVED_DATE~OS_REPAMT~SYND_REF_NO~CURRENT_PMT~TOTAL_PMTS~CURRENT_EVENT_SEQ_NO~ORGACTCOD~PROCESSREFNUM~CHANNELREFNUM~CPTYNAME~ECAREQSTATUS~TXT_PL_BUTTON</FN>'; 
msgxml += '      <FN PARENT="BLK_PMT_HDR" RELATION_TYPE="1" TYPE="BLK_PMT_SUMMARY">PREPAYMENT_PENALTY_RATE~SOURCE_CODE~OVD_MEMO_POSTING~INTEREST_WAIVER~DISCOUNT_RATE~NEGATIVE_AMOUNT_SETTLED~FUNDING_AMOUNT_PAID~ALLOW_TAX_REFUND~EXTERNAL_TRAN_REF_NO~REAPPLY_INT_ON_OUTSTAND_AMT~DDA_ADVICE_REQ~INT_ON_OUTSTANDING_PRINCIPAL~LIQUIDATED_FACE_VALUE~INT_ON_PREPAID_PRINCIPAL~LIQD_INT_ON_PREPAID_PRINCIPAL~PMT_ADJ_AMT2~TRANS_REMARKS~SPECIAL_AMOUNT~PAYMENT_CANCEL~LIQUIDATE_DEPOSIT~PREPMNT_REDEF_METHOD~VALUE_DATE~KEEP_THIS_CONTRACT_ACTIVE~TOTAL_PAID~PAYMENT_SCH_PROCESSING~FUNDED_REPRICE_AMOUNT~CONTRACTREFNO~PREPAYMENT_PENALTY_AMOUNT~EVENT_SEQ_NO~LIMIT_DATE~TRANS_EXCLUDE_FROM_STATEMENT~SCH_DATE~SCHEDULE_DATE~LIMIT_AMOUNT~PAYMENT_REMARKS~PAYMENT_STATUS~PMT_ADJ_AMT1~INTEREST_WAIVER_AMT~PREPAYMENT~REAPPLY_INT_ON_PREPAID_AMT~LCY_EQVT_TOTAL_PAID~STP_TO_LD~SUBSYSSTAT~INTEREST_REFUND_REQUIRED~TXT_PRM_INT_AMT~TXT_PRM_BORR_AMT_DUE~CURR_ACTION_CODE~LCL_CCY~VALUE_DATE_UI~LIMIT_DATE_UI~PREPAIDPRINAMT~UI_NETPAID~UI_NETWAIVED~UI_LCYEQVNETPAID~UI_LCYEQVNETWAIVED~UI_NETCAP~UI_LCYEQVNETCAP</FN>'; 
msgxml += '      <FN PARENT="BLK_PMT_SUMMARY" RELATION_TYPE="N" TYPE="BLK_PMT">MSG_GENERATED~AMOUNT_DUE~OVERDUE_DAYS~EVENT_SEQ_NO~OVER_PAID_AMT~TAX_PAID~COMPONENT~AMOUNT_PAID~CONTRACTREFNO~AMOUNT_WAIVED~AMOUNT_CAPITALIZED</FN>'; 
msgxml += '      <FN PARENT="BLK_PMT_HDR" RELATION_TYPE="N" TYPE="BLK_BREAKUP">CONTRACTREFNO~EVENT_SEQ_NO~COMPONENT~DUE_DATE~BASIS_AMOUNT~AMOUNT_SETTLED~PAID_DATE~CURRENCY_SETTLED</FN>'; 
msgxml += '      <FN PARENT="BLK_PMT_SUMMARY" RELATION_TYPE="1" TYPE="BLK_AUDIT">CHKDTST~AUTHSTAT~WORKFLOW_STATUS~INFORM_STATUS~CHECKERID~EVENT_VALUE_DATE~RELEASE_DT_STAMP~TXNSTAT~RATE_ASSIGN_AUTH_DT_STAMP~REVERSED_EVENT_SEQ_NO~RATE_ASSIGN_DT_STAMP~RATE_REVISION_STATUS~RATE_ASSIGN_AUTH_BY~TRN_TYPE~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~MAKERID~MODULE~EXTERNAL_TRAN_REF_NO~RELEASE_BY~MKRDTSTMP~NEW_VERSION_INDICATOR~RATE_ASSIGNED_BY~ECA_STATUS~CONTRACTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_PMT_SUMMARY" RELATION_TYPE="N" TYPE="BLK_PART_RATIO">CURRENCY~AMOUNT~COMPONENT~COMPONENT_RATIO~COMPONENT_TYPE~CONTRACT_REF_NO~CONTRACT_TYPE~CUSTOMER_NO~DRAWDOWN_NO~EVENT_SEQ_NO~PROCESS~SETTLEMENT_SEQ_NO~SSI_MNEMONIC~SSI_PICKUP_AT~VALUE_DATE~VERSION_NO~TXTPARTNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_PMT" RELATION_TYPE="N" TYPE="BLK_RATIO_CHNG">AMOUNT~COMPONENT~COMPONENT_RATIO~COMPONENT_TYPE~CONTRACT_REF_NO~CONTRACT_TYPE~CUSTOMER_NO~DRAWDOWN_NO~EVENT_SEQ_NO~PROCESS~SETTLEMENT_SEQ_NO~SSI_MNEMONIC~SSI_PICKUP_AT~VALUE_DATE~VERSION_NO~TXT_NEW_RATIO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_LBDPYMNT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_PMT_HDR" RELATION_TYPE="1" TYPE="BLK_PYMT_SUMMARY">CONTRACTREFNO~EVENTSEQNO~COUNTERPARTY~CUSTNAM~STATUS~CURRENCY~VALUEDATE~TOTAL_PAID~LIMITDATE~LIMITAMOUNT~AUTHSTATUS~USERREFNO~BRANCH~CONTRACTSTATUS~PAYMENTSTATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDPYMNT";
var defaultWhereClause = "BRANCH = GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="Branch IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_PYMT_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PMT_HDR" : "","BLK_PMT_SUMMARY" : "BLK_PMT_HDR~1","BLK_PMT" : "BLK_PMT_SUMMARY~N","BLK_BREAKUP" : "BLK_PMT_HDR~N","BLK_AUDIT" : "BLK_PMT_SUMMARY~1","BLK_PART_RATIO" : "BLK_PMT_SUMMARY~N","BLK_RATIO_CHNG" : "BLK_PMT~N"}; 

 var dataSrcLocationArray = new Array("BLK_PMT_HDR","BLK_PMT_SUMMARY","BLK_PMT","BLK_BREAKUP","BLK_AUDIT","BLK_PART_RATIO","BLK_RATIO_CHNG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDPYMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDPYMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PMT_HDR__CONTRACTREFNO";
pkFields[0] = "BLK_PMT_HDR__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_PMT_SUMMARY":["INTEREST_REFUND_REQUIRED"]};
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
var lovInfoFlds = {"BLK_PMT_HDR__CONTRACTREFNO__LOV_CONTRACT_REF_NO":["BLK_PMT_HDR__CONTRACTREFNO~BLK_PMT_HDR__CONTRACT_CCY~BLK_PMT_HDR__COUNTERPARTY~BLK_PMT_HDR__CPTYNAME~BLK_PMT_HDR__USER_DEFINED_STATUS~BLK_PMT_HDR__DEPARTMENT_CODE~BLK_PMT_HDR__BRANCH~BLK_PMT_HDR__TREASURY_SOURCE~","","N~N~N~N~N~N~N~N",""],"BLK_PMT_SUMMARY__LIMIT_DATE__LOV_LIMIT_DATE":["BLK_PMT_SUMMARY__LIMIT_DATE~","BLK_PMT_SUMMARY__CONTRACTREFNO!VARCHAR2~BLK_PMT_SUMMARY__CONTRACTREFNO!VARCHAR2","N","N"],"BLK_PYMT_SUMMARY__COUNTERPARTY__LOV_CUST_NAME":["BLK_PYMT_SUMMARY__COUNTERPARTY~BLK_PYMT_SUMMARY__CUSTNAM~","","N~N",""],"BLK_PYMT_SUMMARY__COUNTERPARTY__LOV_CUST_NAME_S":["BLK_PYMT_SUMMARY__COUNTERPARTY~BLK_PYMT_SUMMARY__CUSTNAM~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_BREAKUP","BLK_PMT","BLK_PART_RATIO","BLK_RATIO_CHNG");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_PMT_HDR","OLCTRMIS~BLK_PMT_HDR","LFCTRCHG~BLK_PMT_HDR","LBCRATIO~BLK_PMT_HDR","LBCPRTAX~BLK_PMT_HDR","LBCINTSH~BLK_PMT_HDR","OLCFFMBR~BLK_PMT_HDR","OLCFFMSG~BLK_PMT_HDR"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__SETT.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__MIS.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__CHG.CONTRACT_REF_NO AND OLTBS_CONTRACT.LATEST_EVENT_SEQ_NO = OLTBS_CONTRACT__CHG.LATEST_EVENT_SEQ_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = LBTBS_PART_NONPRORATA_RATIO.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO =OLTBS_CONTRACT__TAX.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__LBCINTSH.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__FFMBR.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__FFMSG.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1","1","1","1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LBDPYMNT"]="KERNEL";
ArrPrntFunc["LBDPYMNT"]="";
ArrPrntOrigin["LBDPYMNT"]="";
ArrRoutingType["LBDPYMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDPYMNT"]="N";
ArrCustomModified["LBDPYMNT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN","OLCTRMIS":"CONTREF~ESN~PRDCD~BRNCD","LFCTRCHG":"CONTREF~ESN~MODULECODE","LBCRATIO":"CONT_REF_NO~VALUE_DATE~ESN~TOTAL_PAID","LBCPRTAX":"CONTRACTREFNO","LBCINTSH":"CONT_REF_NO~ESN~TXT_PRM_INT_AMT~TXT_BORR_AMT_DUE","OLCFFMBR":"CONTRACTRREFNO~MODULE~PRM_ACTIONCODE~COUNTERPARTY","OLCFFMSG":"CONTRACTREFNO~MODULE~PRM_ACTIONCODE~COUNTERPARTY","OLDEVENT":"CONTREF~ACTION_CODE","OLDFFMBR":"","OLDFFMSG":"","OLDMSPRV":"CONTREF~ESN~MODULE~PARENTFUNCTION~ACTION_CODE"};
var scrArgSource = {"OLCONDET":"BLK_PMT_HDR__CONTRACTREFNO~BLK_PMT_HDR__LATEST_EVENT_SEQ_NO","OLCTRMIS":"BLK_PMT_HDR__CONTRACTREFNO~BLK_PMT_HDR__LATEST_EVENT_SEQ_NO~BLK_PMT_HDR__PRDCD~BLK_PMT_HDR__BRANCH","LFCTRCHG":"BLK_PMT_HDR__CONTRACTREFNO~BLK_PMT_HDR__LATEST_EVENT_SEQ_NO~BLK_PMT_HDR__MODULE_CODE","LBCRATIO":"BLK_PMT_HDR__CONTRACTREFNO~BLK_PMT_SUMMARY__VALUE_DATE~BLK_PMT_HDR__LATEST_EVENT_SEQ_NO~BLK_PMT_SUMMARY__TOTAL_PAID","LBCPRTAX":"BLK_PMT_HDR__CONTRACTREFNO","LBCINTSH":"BLK_PMT_HDR__CONTRACTREFNO~BLK_PMT_HDR__LATEST_EVENT_SEQ_NO~BLK_PMT_SUMMARY__TXT_PRM_INT_AMT~BLK_PMT_SUMMARY__TXT_PRM_BORR_AMT_DUE","OLCFFMBR":"BLK_PMT_HDR__CONTRACTREFNO~BLK_PMT_HDR__MODULE_CODE~BLK_PMT_HDR__ORGACTCOD~BLK_PMT_HDR__COUNTERPARTY","OLCFFMSG":"BLK_PMT_HDR__CONTRACTREFNO~BLK_PMT_HDR__MODULE_CODE~BLK_PMT_HDR__ORGACTCOD~BLK_PMT_HDR__COUNTERPARTY","OLDEVENT":"BLK_PMT_HDR__CONTRACTREFNO~","OLDFFMBR":"","OLDFFMSG":"","OLDMSPRV":"BLK_PMT_HDR__CONTRACTREFNO~~~~"};
var scrArgVals = {"OLCONDET":"~","OLCTRMIS":"~~~","LFCTRCHG":"~~","LBCRATIO":"~~~","LBCPRTAX":"","LBCINTSH":"~~~","OLCFFMBR":"~~~","OLCFFMSG":"~~~","OLDEVENT":"~EXECUTEQUERY","OLDFFMBR":"","OLDFFMSG":"","OLDMSPRV":"~~LB~LBDPYMNT~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":"","OLCTRMIS":"","LFCTRCHG":"","LBCRATIO":"","LBCPRTAX":"","LBCINTSH":"","OLCFFMBR":"","OLCFFMSG":""};
var dpndntOnSrvs = {"OLCONDET":"","OLCTRMIS":"","LFCTRCHG":"","LBCRATIO":"","LBCPRTAX":"","LBCINTSH":"","OLCFFMBR":"","OLCFFMSG":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------