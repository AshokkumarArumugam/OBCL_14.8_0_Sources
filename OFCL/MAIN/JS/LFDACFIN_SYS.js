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
**  File Name          : LFDACFIN_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"CONTRACTREFNO~LATESTEVENTSEQNO~LATVERNO~PRODUCTCODE~COUNTERPARTY~CUSTOMREFNO~USERDEFSTATUS~USERREFNO~CONTCCY~VALUEDATE~MATURITYDATE~CUSTOMERNAME~PRINCIPALOUTSTBAL~UI_CURR_ESN~UI_LATEST_ESN~PRODTYPE~PRM_SETTLEMENT_PROCESSED~PRM_ADVICES_PROCESSED~PRM_SPLIT_SCHEDULES~PRM_SCHEDULE_REDEFINE~CONT_MOD~UI_ACCR_FREQ~UI_ACCR_START_MONTH~UI_ACCR_START_DAY~UI_HOLIDAY_CHECK~UI_HOLIDAY_CCY~UI_SCH_MVMT~UI_FREQ_BASIS~UI_MV_ACC_MONTH~UI_CASCADE_SCH~UI_CHCK_RT_HOLIDAY~UI_IGNORE_HOLIDAY~UIPAYMENTSTATUS~ECAREQSTATUS","BLK_COMPONENT":"COMPONENTCCY~COMPONENT~UI_REALIZED_CCY~REALIZEDAMOUNT~UI_LIQ_CCY~LIQUIDATIONAMOUNT~UI_REFUND_CCY~REFUNDAMOUNT~UI_FEE_CCY~FEEAMT~CONTSTAT~ACCOUNT~ACCOUNTBRANCH~VALUEDATE~AMORTEXCHRATE~EXCHAPPLEVENT~PAYMETHOD~FEETYPE~CALCENDDATE~BASISAMOUNT~ACCMETHOD~CALCSTARTDATE~ACCRREQD~ACCRDISC~MARKS~DEFERREDINTCOMP~UI_OUTST_CCY~UI_OUTST_AMT~ACCRFREQBASIS~ACCRSTMONTH~ACCRSTDATE~ACCRFREQ~MOVEACCMONTH~IGNOREHOL~HOLCCY~HOLCHECK~SCHMOVE~CASCADESCH~CHKRTCDCCY~COMPONENTSTATUS~PAYMENT_STATUS~TRANSACTION_DATE~ALLOWENDDTINPUT~LBL_ESNO~LBL_CONTREFNO~FEE_MODE~FEE_MOD~FEE_PERIOD_BASIS~COMPDESC","BLK_SCHEDULE":"AMOUNT~FREQUNIT~FREQUENCY~NOOFSCH~STARTDATE~COMPONENT","BLK_EVENT_LOG":"CHECKERDTSTAMP~CHECKERID~MAKERDTSTAMP~MAKERID~EVENT_CODE~TXNSTAT~AUTHSTAT","BLK_ACCR_FEE_DETAIL":"COMPONENT~ENDDATE~CALCAMT~CONTRACT_REF_NO","BLK_EVENT_ADV":"MODULE~PRIORITY~SUPPRESS~MSG_TYPE~EVENT_SEQ_NO~CONTRACT_REF_NO","BLK_ACCR_SUBSYS":"CONREFNO~SUBSYSSTAT~ESNUM","BLK_SUMMARY":"USERREFNO~CONTRACTREFNO~COUNTERPARTY~PRODUCTCODE~CUSTOMREFNO~USERDEFINEDSTATUS~CONTRACTCCY~SUM_AUTH~SUM_TXNSTAT~CUSTNAM","BLK_CONTRACT_RATIO":"RATIO_CON_REF~RATIO_LESN~UI_CURRESN","BLK_PART_COMP_RATIO":"RATIO_COMP~RATIO_COMP_CCY~RATIO_COMP_SEQ_NO~RATIO_COMP_STATUS~RATIO_CON_REF_NO~RATIO_ESN~RATIO_FEE_AMOUNT","BLK_PART_EVENT_RATIO":"RATIO_COMPONENT~PART_RATIO_CCY~RATIO_PART~RATIO_AMOUNT~RATIO_COMP~RATO_COMP_TYPE~RATIO_CRN~RATIO_CONT_TYPE~RATIO_ESN~RATIO_DD_NO~RATIO_SETTLE_SNO~RATIO_SSI_MNEMONIC~RATIO_SSI_PICKUP~RATIO_VALUE_DT~RATIO_VERSION~RATIO_PROCESS~TXTPARTNAME"};

var multipleEntryPageSize = {"BLK_SCHEDULE" :"15" ,"BLK_ACCR_FEE_DETAIL" :"15" ,"BLK_EVENT_ADV" :"15" ,"BLK_PART_COMP_RATIO" :"15" ,"BLK_PART_EVENT_RATIO" :"15" };

var multipleEntrySVBlocks = "BLK_COMPONENT";

var tabMEBlks = {"CVS_FEE_INPUT__TAB_MAIN":"BLK_SCHEDULE","CVS_ACCR_FEE_DETAIL__TAB_MAIN":"BLK_ACCR_FEE_DETAIL","CVS_CONTRACT_EVENT_ADV__TAB_MAIN":"BLK_EVENT_ADV","CVS_PART_EVENT_RATIO__TAB_MAIN":"BLK_PART_COMP_RATIO~BLK_PART_EVENT_RATIO"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONTRACTREFNO~LATESTEVENTSEQNO~LATVERNO~PRODUCTCODE~COUNTERPARTY~CUSTOMREFNO~USERDEFSTATUS~USERREFNO~CONTCCY~VALUEDATE~MATURITYDATE~CUSTOMERNAME~PRINCIPALOUTSTBAL~UI_CURR_ESN~UI_LATEST_ESN~PRODTYPE~PRM_SETTLEMENT_PROCESSED~PRM_ADVICES_PROCESSED~PRM_SPLIT_SCHEDULES~PRM_SCHEDULE_REDEFINE~CONT_MOD~UI_ACCR_FREQ~UI_ACCR_START_MONTH~UI_ACCR_START_DAY~UI_HOLIDAY_CHECK~UI_HOLIDAY_CCY~UI_SCH_MVMT~UI_FREQ_BASIS~UI_MV_ACC_MONTH~UI_CASCADE_SCH~UI_CHCK_RT_HOLIDAY~UI_IGNORE_HOLIDAY~UIPAYMENTSTATUS~ECAREQSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="N" TYPE="BLK_COMPONENT">COMPONENTCCY~COMPONENT~UI_REALIZED_CCY~REALIZEDAMOUNT~UI_LIQ_CCY~LIQUIDATIONAMOUNT~UI_REFUND_CCY~REFUNDAMOUNT~UI_FEE_CCY~FEEAMT~CONTSTAT~ACCOUNT~ACCOUNTBRANCH~VALUEDATE~AMORTEXCHRATE~EXCHAPPLEVENT~PAYMETHOD~FEETYPE~CALCENDDATE~BASISAMOUNT~ACCMETHOD~CALCSTARTDATE~ACCRREQD~ACCRDISC~MARKS~DEFERREDINTCOMP~UI_OUTST_CCY~UI_OUTST_AMT~ACCRFREQBASIS~ACCRSTMONTH~ACCRSTDATE~ACCRFREQ~MOVEACCMONTH~IGNOREHOL~HOLCCY~HOLCHECK~SCHMOVE~CASCADESCH~CHKRTCDCCY~COMPONENTSTATUS~PAYMENT_STATUS~TRANSACTION_DATE~ALLOWENDDTINPUT~LBL_ESNO~LBL_CONTREFNO~FEE_MODE~FEE_MOD~FEE_PERIOD_BASIS~COMPDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_COMPONENT" RELATION_TYPE="N" TYPE="BLK_SCHEDULE">AMOUNT~FREQUNIT~FREQUENCY~NOOFSCH~STARTDATE~COMPONENT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_EVENT_LOG">CHECKERDTSTAMP~CHECKERID~MAKERDTSTAMP~MAKERID~EVENT_CODE~TXNSTAT~AUTHSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_COMPONENT" RELATION_TYPE="N" TYPE="BLK_ACCR_FEE_DETAIL">COMPONENT~ENDDATE~CALCAMT~CONTRACT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="N" TYPE="BLK_EVENT_ADV">MODULE~PRIORITY~SUPPRESS~MSG_TYPE~EVENT_SEQ_NO~CONTRACT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_ACCR_SUBSYS">CONREFNO~SUBSYSSTAT~ESNUM</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_SUMMARY">USERREFNO~CONTRACTREFNO~COUNTERPARTY~PRODUCTCODE~CUSTOMREFNO~USERDEFINEDSTATUS~CONTRACTCCY~SUM_AUTH~SUM_TXNSTAT~CUSTNAM</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRACT_RATIO">RATIO_CON_REF~RATIO_LESN~UI_CURRESN</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="N" TYPE="BLK_PART_COMP_RATIO">RATIO_COMP~RATIO_COMP_CCY~RATIO_COMP_SEQ_NO~RATIO_COMP_STATUS~RATIO_CON_REF_NO~RATIO_ESN~RATIO_FEE_AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_COMP_RATIO" RELATION_TYPE="N" TYPE="BLK_PART_EVENT_RATIO">RATIO_COMPONENT~PART_RATIO_CCY~RATIO_PART~RATIO_AMOUNT~RATIO_COMP~RATO_COMP_TYPE~RATIO_CRN~RATIO_CONT_TYPE~RATIO_ESN~RATIO_DD_NO~RATIO_SETTLE_SNO~RATIO_SSI_MNEMONIC~RATIO_SSI_PICKUP~RATIO_VALUE_DT~RATIO_VERSION~RATIO_PROCESS~TXTPARTNAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_FEE_INPUT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_SUMMARY">SUM_AUTH~SUM_TXNSTAT~CONTRACTREFNO~PRODUCTCODE~COUNTERPARTY~CUSTNAM~CUSTOMREFNO~USERDEFINEDSTATUS~USERREFNO~CONTRACTCCY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LFDACFIN";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_COMPONENT" : "BLK_CONTRACT~N","BLK_SCHEDULE" : "BLK_COMPONENT~N","BLK_EVENT_LOG" : "BLK_CONTRACT~1","BLK_ACCR_FEE_DETAIL" : "BLK_COMPONENT~N","BLK_EVENT_ADV" : "BLK_CONTRACT~N","BLK_ACCR_SUBSYS" : "BLK_CONTRACT~1","BLK_SUMMARY" : "BLK_CONTRACT~1","BLK_CONTRACT_RATIO" : "BLK_CONTRACT~1","BLK_PART_COMP_RATIO" : "BLK_CONTRACT~N","BLK_PART_EVENT_RATIO" : "BLK_PART_COMP_RATIO~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_COMPONENT","BLK_SCHEDULE","BLK_EVENT_LOG","BLK_ACCR_FEE_DETAIL","BLK_EVENT_ADV","BLK_ACCR_SUBSYS","BLK_SUMMARY","BLK_CONTRACT_RATIO","BLK_PART_COMP_RATIO","BLK_PART_EVENT_RATIO"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFDACFIN.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFDACFIN.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONTRACTREFNO";
pkFields[0] = "BLK_CONTRACT__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_ACCR_FEE_DETAIL":["CALCAMT","COMPONENT","ENDDATEI"],"BLK_COMPONENT":["ACCMETHOD","ACCOUNT","ACCOUNTBRANCH","ACCRFREQ","ACCRSTDATE","ACCRSTMONTH","AMORTEXCHRATE","BASISAMOUNT","CALCENDDATEI","CALCSTARTDATEI","CASCADESCH","CHKRTCDCCY","COMPONENTSTATUS","EXCHAPPLEVENT","FEEAMT","FEETYPE","FEE_PERIOD_BASIS","HOLCCY","HOLCHECK","IGNOREHOL","MOVEACCMONTH","PAYMETHOD","REALIZEDAMOUNT","REFUNDAMOUNT","SCHMOVE","UI_FEE_CCY","UI_REALIZED_CCY","UI_REFUND_CCY","VALUEDATEI"],"BLK_CONTRACT":["UI_ACCR_START_DAY","UI_ACCR_START_MONTH"],"BLK_EVENT_ADV":["MODULE","MSG_TYPE","PRIORITY","SUPPRESS"],"BLK_PART_EVENT_RATIO":["RATIO_AMOUNT","RATIO_COMPONENT"],"BLK_SCHEDULE":["AMOUNT","FREQUENCY","FREQUNIT","NOOFSCH"]};
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
var lovInfoFlds = {"BLK_CONTRACT__CONTRACTREFNO__LOV_CONTRACT_REF":["BLK_CONTRACT__CONTRACTREFNO~BLK_CONTRACT__USERREFNO~BLK_CONTRACT__PRODUCTCODE~BLK_CONTRACT__PRODTYPE~BLK_CONTRACT__COUNTERPARTY~BLK_CONTRACT__CUSTOMREFNO~BLK_CONTRACT__CONTCCY~BLK_CONTRACT__USERDEFSTATUS~BLK_CONTRACT__LATVERNO~BLK_CONTRACT__LATESTEVENTSEQNO~BLK_CONTRACT__CUSTOMERNAME~","","N~N~N~N~N~N~N~N~N~N~N",""],"BLK_CONTRACT__UI_HOLIDAY_CCY__LOV_HOLIDAY_CCY":["BLK_CONTRACT__UI_HOLIDAY_CCY~~","","N~N","N"],"BLK_COMPONENT__COMPONENTCCY__LOV_COMPONENT_CCY":["BLK_COMPONENT__COMPONENTCCY~~","","N~N",""],"BLK_COMPONENT__ACCOUNT__LOV_ACCOUNT":["BLK_COMPONENT__ACCOUNT~~BLK_CONTRACT__CUSTOMERNAME~","BLK_COMPONENT__ACCOUNTBRANCH!VARCHAR2~BLK_COMPONENT__ACCOUNTBRANCH!VARCHAR2~BLK_COMPONENT__ACCOUNTBRANCH!VARCHAR2~BLK_CONTRACT__PRODUCTCODE!VARCHAR2","N~N~N",""],"BLK_COMPONENT__ACCOUNTBRANCH__LOV_AC_BRANCH":["BLK_COMPONENT__ACCOUNTBRANCH~~","","N~N",""],"BLK_COMPONENT__HOLCCY__LOV_HOLIDAY_CCY":["BLK_COMPONENT__HOLCCY~~","","N~N",""],"BLK_SUMMARY__COUNTERPARTY__LOV_CUST_NAME_S":["BLK_SUMMARY__COUNTERPARTY~BLK_SUMMARY__CUSTNAM~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_SCHEDULE","BLK_ACCR_FEE_DETAIL","BLK_EVENT_ADV","BLK_PART_COMP_RATIO","BLK_PART_EVENT_RATIO");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_CONTRACT","LFCACFCF~BLK_CONTRACT","LBCPRTAX~BLK_CONTRACT"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__SETT.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = LFVWS_ACCR_FEE_DETAILS.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO =OLTBS_CONTRACT__TAX.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LFDACFIN"]="KERNEL";
ArrPrntFunc["LFDACFIN"]="";
ArrPrntOrigin["LFDACFIN"]="";
ArrRoutingType["LFDACFIN"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFDACFIN"]="N";
ArrCustomModified["LFDACFIN"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ACCR_FEE_DETAIL":"CONTRACT_REF_NO","CVS_CONTRACT_EVENT_ADV":"CONTRACT_REF_NO~ESN","CVS_PART_EVENT_RATIO":"FCCREF","OLCONDET":"CONREFNO~ESN","LFCACFCF":"CONTRACTREFNO","LBCPRTAX":"CONTRACTREFNO~","OLDEVENT":"CONTREF~ACTION_CODE","LPSCOMNT":""};
var scrArgSource = {"CVS_ACCR_FEE_DETAIL":"BLK_CONTRACT__CONTRACTREFNO","CVS_CONTRACT_EVENT_ADV":"BLK_CONTRACT__CONTRACTREFNO~BLK_CONTRACT__LATESTEVENTSEQNO","CVS_PART_EVENT_RATIO":"BLK_CONTRACT__CONTRACTREFNO","OLCONDET":"BLK_CONTRACT__CONTRACTREFNO~BLK_CONTRACT__LATESTEVENTSEQNO","LFCACFCF":"BLK_CONTRACT__CONTRACTREFNO","LBCPRTAX":"BLK_CONTRACT__CONTRACTREFNO~","OLDEVENT":"BLK_CONTRACT__CONTRACTREFNO~","LPSCOMNT":""};
var scrArgVals = {"CVS_ACCR_FEE_DETAIL":"","CVS_CONTRACT_EVENT_ADV":"~","CVS_PART_EVENT_RATIO":"","OLCONDET":"~","LFCACFCF":"","LBCPRTAX":"~","OLDEVENT":"~EXECUTEQUERY","LPSCOMNT":""};
var scrArgDest = {"CVS_ACCR_FEE_DETAIL":"BLK_CONTRACT__CONTRACTREFNO","CVS_CONTRACT_EVENT_ADV":"BLK_EVENT_ADV__CONTRACT_REF_NO~BLK_EVENT_ADV__EVENT_SEQ_NO","CVS_PART_EVENT_RATIO":"BLK_CONTRACT_RATIO__RATIO_CON_REF"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":"","LFCACFCF":"","LBCPRTAX":""};
var dpndntOnSrvs = {"OLCONDET":"","LFCACFCF":"","LBCPRTAX":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"2","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------