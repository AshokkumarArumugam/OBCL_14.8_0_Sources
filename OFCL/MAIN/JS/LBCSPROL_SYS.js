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
**  File Name          : LBCSPROL_SYS.js
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
var fieldNameArray = {"BLK_SPROL_MAS":"FCCREF~USERFCCREF~FACILITY~PRDCD~PRDCDDESC~RMVROL~CUST~CUSTNAME~VERNO~ESN~CCY~PRM_IRFX_REQ~PRM_ICCF_COMPONENT~PRM_TRN_REF_NO~PRM_DD_COUNT~PRM_CONTRACT_CCY~PRM_TRANCHE_CCY~PRM_EXFX_REQ~ED_EXRT_FIX~ED_CASH_INT_AMT~PRM_MATURITY_DATE~PRM_PIK_COMPONENT~PRM_PIK_MARGIN_EXIST~ED_LQP~ED_LQI~ED_RT_CD~ED_RROL~PRM_PRINCIPAL_OUTSTANDING~PRM_INTEREST_AMOUNT~PRM_FACILITY_REF_NO~PRM_VALUE_DATE~PRM_FACILITY_NAME~PRM_PRINCIPAL_OS~PRM_RENEWAL_MODE~SUM_PRINCE_AMT~SUM_MAX_AMT~SUM_INT_AMT~TOT_AMT~PRM_VER_NO","BLK_SPROL":"ROL_FCCREF~ROL_VER~ROL_ESN~INT_PRM_BASIS~HOL_PRL_BASIS~STL_BASIS~SCH_DEF_BASIS~MIS_BASIS~UDF_BASIS~DEFL_FRONT~EXCH_RTFIX_DATE~INT_RTFIX_DATE~REF_RATE~ROL_NET_METHOD~ROL_TYPE~LIQD_INT~LIQD_PRINCE~TOT_PRIN_OUT_AMT~TOT_PRIN_INT_OUT_AMT~TOT_OUT_AMT~PIK_ROL_AMT~CASH_INT_AMT~ROL_AMT_TYPE~ROL_INST_STATA~SEL_RTFX_SPNO~SEL_RTFX_COMP~SEL_RTST_SPNO~SEL_RTST_COMP","BLK_SPROL_DET":"SP_NO~SP_ROL_PRDCD~SP_LIQD_INIT_ON_PREPAY~SP_PRIC_ROL_AMT~SP_INT_ROL_AMT~SP_PIK_ROL_AMT~SP_MAXROL_AMT~SP_MATDT~SP_MATDAYS~SP_ROL_BY~SP_ROL_FCCREF~SP_CON_FOR_SPLIT~SP_FCCREF~SP_VER~BTN_EXRATE~EXRT_VISIT","BLK_SPROL_INT":"SPIN_COMP~SPIN_RTTYPE~SPIN_FIX_RTTYPE~SPIN_FIX_RTCD~SPIN_RTCD~SPIN_RT~SPIN_SPREAD~SPIN_INT_BASIS~SPIN_INT_PEROID_BASIS~SPIN_CCY_RND_RULE~SPIN_CCY_RND_UNIT~SPIN_CCY_RND_DEC~SPIN_FCCREF~SPIN_VER~SPIN_ESN~SPIN_SPNO~SPIN_RTFX~SPIN_RTST~RATEFIXINGDAYS~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT~RATE_ROUNDING_POSITION~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_METHOD_DAYS~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~SPREAD_ADJ~RFR_SPREAD_ADJ_COMP_METH~MARGIN~SPIN_RATEREVISION~RATE_CODE_USAGE~RATE_FIXING_REQD~RESET_TENOR~BORROW_LEND_IND","BLK_SPROL_MARGIN":"MAR_COMP~MAR_BAS_AMT_TG~MAR_BASIS~MAR_RT~MAR_FCCREF~MAR_VER~MAR_SPNO~MAR_INT_COMP","BLK_EXRT_DET":"EXDT_FCCREF~EXDT_SPNO~EXDT_CONTCCY~EXDT_CONTAMT~EXDT_TRNCCY~EXDT_TRNAMT~EXDT_RTCD~EXDT_RTTY~EXDT_REMARKS~EXDT_EFEND_ST~EXDT_EFEND_DT~EXDT_EXRT~TXT_EXRT_VISITED","BLK_ADV_MAS":"ADVM_FCCREF~ADVM_ESN~ADVM_SUPPRESS_ALL","BLK_ADV":"ADVD_MSGTY~ADVD_RECEIVER~ADVD_SUPP~ADVD_FCCREF~ADVD_ESN~ADVD_MOD~ADVD_REC","BLK_EXCEPTION":"EXP_DTSTAMP~EXP_ERROR~EXP_PARAMS~EXP_LOG~EXP_REF~TXT_ERR_DESC","BLK_RTFX_DET":"RTFXD_FCCREF~RTFXD_SPNO~RTFXD_CCY~RTFXD_STDT~RTFXD_EDDT~RTFXD_COMP~RTFXD_CD~RTFXD_RT~RTFXD_TNRVAL~RTFXD_TNRUN~RTFXD_REMARKS","BLK_RTSET":"RTST_SPNO~RTST_RNDRL~RTST_RNDUN~RTST_TNR~RTST_ESN~RTST_COMP~RTST_FCCREF~RTST_SPSNO","BLK_PART_SHR_MAS":"SHRCCY~BR_REF_NO~BR_ESN~BR_AMT_PAID~BR_AMT_DUE~BR_TOT_AMT","BLK_PART_SHR_DET":"PRS_PARTREF~PRS_PARTCIPANT~PRS_PART_NAME~PRS_COMP~PRS_TOTOUT~PRS_AMT_PAID~PRS_BRREF~PRS_BRESN","BLK_LFTB_CONT_ADDL_INT_DTL":"COMPONENT~CONTRACT_REF_NO~OBSERVATION_SHIFT~PRODUCT_CODE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SERIAL_NO~SPLIT_SERIAL_NO~VERSION_NO"};

var multipleEntryPageSize = {"BLK_SPROL_DET" :"15" ,"BLK_SPROL_MARGIN" :"15" ,"BLK_ADV" :"15" ,"BLK_EXCEPTION" :"15" ,"BLK_PART_SHR_DET" :"15" };

var multipleEntrySVBlocks = "BLK_SPROL_INT~BLK_EXRT_DET~BLK_RTFX_DET~BLK_RTSET~BLK_LFTB_CONT_ADDL_INT_DTL";

var tabMEBlks = {"CVS_SPROL__TAB_MAIN":"BLK_SPROL_DET","CVS_INT_DTLS__TAB_MAIN":"BLK_SPROL_MARGIN","CVS_ADV__TAB_MAIN":"BLK_ADV","CVS_EXCEPTION__TAB_MAIN":"BLK_EXCEPTION","CVS_PART_INT_SHARE__TAB_MAIN":"BLK_PART_SHR_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_SPROL_MAS">FCCREF~USERFCCREF~FACILITY~PRDCD~PRDCDDESC~RMVROL~CUST~CUSTNAME~VERNO~ESN~CCY~PRM_IRFX_REQ~PRM_ICCF_COMPONENT~PRM_TRN_REF_NO~PRM_DD_COUNT~PRM_CONTRACT_CCY~PRM_TRANCHE_CCY~PRM_EXFX_REQ~ED_EXRT_FIX~ED_CASH_INT_AMT~PRM_MATURITY_DATE~PRM_PIK_COMPONENT~PRM_PIK_MARGIN_EXIST~ED_LQP~ED_LQI~ED_RT_CD~ED_RROL~PRM_PRINCIPAL_OUTSTANDING~PRM_INTEREST_AMOUNT~PRM_FACILITY_REF_NO~PRM_VALUE_DATE~PRM_FACILITY_NAME~PRM_PRINCIPAL_OS~PRM_RENEWAL_MODE~SUM_PRINCE_AMT~SUM_MAX_AMT~SUM_INT_AMT~TOT_AMT~PRM_VER_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL_MAS" RELATION_TYPE="1" TYPE="BLK_SPROL">ROL_FCCREF~ROL_VER~ROL_ESN~INT_PRM_BASIS~HOL_PRL_BASIS~STL_BASIS~SCH_DEF_BASIS~MIS_BASIS~UDF_BASIS~DEFL_FRONT~EXCH_RTFIX_DATE~INT_RTFIX_DATE~REF_RATE~ROL_NET_METHOD~ROL_TYPE~LIQD_INT~LIQD_PRINCE~TOT_PRIN_OUT_AMT~TOT_PRIN_INT_OUT_AMT~TOT_OUT_AMT~PIK_ROL_AMT~CASH_INT_AMT~ROL_AMT_TYPE~ROL_INST_STATA~SEL_RTFX_SPNO~SEL_RTFX_COMP~SEL_RTST_SPNO~SEL_RTST_COMP</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL" RELATION_TYPE="N" TYPE="BLK_SPROL_DET">SP_NO~SP_ROL_PRDCD~SP_LIQD_INIT_ON_PREPAY~SP_PRIC_ROL_AMT~SP_INT_ROL_AMT~SP_PIK_ROL_AMT~SP_MAXROL_AMT~SP_MATDT~SP_MATDAYS~SP_ROL_BY~SP_ROL_FCCREF~SP_CON_FOR_SPLIT~SP_FCCREF~SP_VER~BTN_EXRATE~EXRT_VISIT</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL_DET" RELATION_TYPE="N" TYPE="BLK_SPROL_INT">SPIN_COMP~SPIN_RTTYPE~SPIN_FIX_RTTYPE~SPIN_FIX_RTCD~SPIN_RTCD~SPIN_RT~SPIN_SPREAD~SPIN_INT_BASIS~SPIN_INT_PEROID_BASIS~SPIN_CCY_RND_RULE~SPIN_CCY_RND_UNIT~SPIN_CCY_RND_DEC~SPIN_FCCREF~SPIN_VER~SPIN_ESN~SPIN_SPNO~SPIN_RTFX~SPIN_RTST~RATEFIXINGDAYS~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT~RATE_ROUNDING_POSITION~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_METHOD_DAYS~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~SPREAD_ADJ~RFR_SPREAD_ADJ_COMP_METH~MARGIN~SPIN_RATEREVISION~RATE_CODE_USAGE~RATE_FIXING_REQD~RESET_TENOR~BORROW_LEND_IND</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL_INT" RELATION_TYPE="N" TYPE="BLK_SPROL_MARGIN">MAR_COMP~MAR_BAS_AMT_TG~MAR_BASIS~MAR_RT~MAR_FCCREF~MAR_VER~MAR_SPNO~MAR_INT_COMP</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL_DET" RELATION_TYPE="N" TYPE="BLK_EXRT_DET">EXDT_FCCREF~EXDT_SPNO~EXDT_CONTCCY~EXDT_CONTAMT~EXDT_TRNCCY~EXDT_TRNAMT~EXDT_RTCD~EXDT_RTTY~EXDT_REMARKS~EXDT_EFEND_ST~EXDT_EFEND_DT~EXDT_EXRT~TXT_EXRT_VISITED</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL" RELATION_TYPE="1" TYPE="BLK_ADV_MAS">ADVM_FCCREF~ADVM_ESN~ADVM_SUPPRESS_ALL</FN>'; 
msgxml += '      <FN PARENT="BLK_ADV_MAS" RELATION_TYPE="N" TYPE="BLK_ADV">ADVD_MSGTY~ADVD_RECEIVER~ADVD_SUPP~ADVD_FCCREF~ADVD_ESN~ADVD_MOD~ADVD_REC</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL" RELATION_TYPE="N" TYPE="BLK_EXCEPTION">EXP_DTSTAMP~EXP_ERROR~EXP_PARAMS~EXP_LOG~EXP_REF~TXT_ERR_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL_INT" RELATION_TYPE="N" TYPE="BLK_RTFX_DET">RTFXD_FCCREF~RTFXD_SPNO~RTFXD_CCY~RTFXD_STDT~RTFXD_EDDT~RTFXD_COMP~RTFXD_CD~RTFXD_RT~RTFXD_TNRVAL~RTFXD_TNRUN~RTFXD_REMARKS</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL_INT" RELATION_TYPE="N" TYPE="BLK_RTSET">RTST_SPNO~RTST_RNDRL~RTST_RNDUN~RTST_TNR~RTST_ESN~RTST_COMP~RTST_FCCREF~RTST_SPSNO</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL" RELATION_TYPE="1" TYPE="BLK_PART_SHR_MAS">SHRCCY~BR_REF_NO~BR_ESN~BR_AMT_PAID~BR_AMT_DUE~BR_TOT_AMT</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_SHR_MAS" RELATION_TYPE="N" TYPE="BLK_PART_SHR_DET">PRS_PARTREF~PRS_PARTCIPANT~PRS_PART_NAME~PRS_COMP~PRS_TOTOUT~PRS_AMT_PAID~PRS_BRREF~PRS_BRESN</FN>'; 
msgxml += '      <FN PARENT="BLK_SPROL_INT" RELATION_TYPE="1" TYPE="BLK_LFTB_CONT_ADDL_INT_DTL">COMPONENT~CONTRACT_REF_NO~OBSERVATION_SHIFT~PRODUCT_CODE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_RATE_COMPOUNDING~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~RFR_RATE_TYPE~RFR_SPREAD_ADJ_COMP_METH~SERIAL_NO~SPLIT_SERIAL_NO~VERSION_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_SPROL";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_SPROL_MAS" : "","BLK_SPROL" : "BLK_SPROL_MAS~1","BLK_SPROL_DET" : "BLK_SPROL~N","BLK_SPROL_INT" : "BLK_SPROL_DET~N","BLK_SPROL_MARGIN" : "BLK_SPROL_INT~N","BLK_EXRT_DET" : "BLK_SPROL_DET~N","BLK_ADV_MAS" : "BLK_SPROL~1","BLK_ADV" : "BLK_ADV_MAS~N","BLK_EXCEPTION" : "BLK_SPROL~N","BLK_RTFX_DET" : "BLK_SPROL_INT~N","BLK_RTSET" : "BLK_SPROL_INT~N","BLK_PART_SHR_MAS" : "BLK_SPROL~1","BLK_PART_SHR_DET" : "BLK_PART_SHR_MAS~N","BLK_LFTB_CONT_ADDL_INT_DTL" : "BLK_SPROL_INT~1"}; 

 var dataSrcLocationArray = new Array("BLK_SPROL_MAS","BLK_SPROL","BLK_SPROL_DET","BLK_SPROL_INT","BLK_SPROL_MARGIN","BLK_EXRT_DET","BLK_ADV_MAS","BLK_ADV","BLK_EXCEPTION","BLK_RTFX_DET","BLK_RTSET","BLK_PART_SHR_MAS","BLK_PART_SHR_DET","BLK_LFTB_CONT_ADDL_INT_DTL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCSPROL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCSPROL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_SPROL_MAS__FCCREF";
pkFields[0] = "BLK_SPROL_MAS__FCCREF";
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
var lovInfoFlds = {"BLK_SPROL_DET__SP_ROL_PRDCD__LOV_ROLL_PRODUCT":["BLK_SPROL_DET__SP_ROL_PRDCD~~","BLK_SPROL_MAS__PRM_TRN_REF_NO!VARCHAR2~BLK_SPROL_MAS__PRM_TRN_REF_NO!VARCHAR2~BLK_SPROL_MAS__PRM_TRN_REF_NO!VARCHAR2~BLK_SPROL_MAS__PRM_TRN_REF_NO!VARCHAR2~BLK_SPROL_MAS__CUST!VARCHAR2","N~N",""],"BLK_SPROL_INT__SPIN_FIX_RTCD__LOV_FIXED_RATE_CODE":["BLK_SPROL_INT__SPIN_FIX_RTCD~","BLK_SPROL_INT__SPIN_FIX_RTTYPE!VARCHAR2~BLK_SPROL_INT__SPIN_FIX_RTTYPE!VARCHAR2~BLK_SPROL_INT__SPIN_RTTYPE!VARCHAR2","N",""],"BLK_SPROL_INT__SPIN_RTCD__LOV_RATE_CODE":["BLK_SPROL_INT__SPIN_RTCD~~","BLK_SPROL_MAS__PRM_CONTRACT_CCY!VARCHAR2~BLK_LFTB_CONT_ADDL_INT_DTL__RFR_RATE_TYPE!VARCHAR2","N~N",""],"BLK_RTFX_DET__RTFXD_CD__LOV_RTFX_RTCD":["BLK_RTFX_DET__RTFXD_CD~~","BLK_SPROL_MAS__CCY!VARCHAR2","N~N",""],"BLK_RTFX_DET__RTFXD_TNRVAL__LOV_RTFX_TNRVAL":["BLK_RTFX_DET__RTFXD_TNRVAL~~BLK_RTFX_DET__RTFXD_TNRUN~~","BLK_RTFX_DET__RTFXD_CD!VARCHAR2~BLK_SPROL_MAS__PRM_CONTRACT_CCY!VARCHAR2","N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_SPROL_DET","BLK_SPROL_MARGIN","BLK_ADV","BLK_EXCEPTION","BLK_PART_SHR_DET");
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

ArrFuncOrigin["LBCSPROL"]="KERNEL";
ArrPrntFunc["LBCSPROL"]="";
ArrPrntOrigin["LBCSPROL"]="";
ArrRoutingType["LBCSPROL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCSPROL"]="N";
ArrCustomModified["LBCSPROL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_SPROL":"FCCREF","CVS_EXRT_FIX":"FCCREF~SPNO","CVS_ADV":"ADV_FCCREF~ADV_ESN","CVS_EXCEPTION":"EX_FCCREF","CVS_PART_INT_SHARE":"PIS_FCCREF~PIS_ESN~CCY"};
var scrArgSource = {"CVS_EXRT_FIX":"BLK_SPROL_DET__SP_FCCREF~BLK_SPROL_DET__SP_NO","CVS_ADV":"BLK_SPROL__ROL_FCCREF~BLK_SPROL__ROL_ESN","CVS_EXCEPTION":"BLK_SPROL__ROL_FCCREF","CVS_PART_INT_SHARE":"BLK_SPROL_MAS__FCCREF~BLK_SPROL_MAS__ESN~BLK_SPROL_MAS__CCY"};
var scrArgVals = {"CVS_SPROL":"","CVS_EXRT_FIX":"~","CVS_ADV":"~","CVS_EXCEPTION":"","CVS_PART_INT_SHARE":"~~"};
var scrArgDest = {"CVS_SPROL":"BLK_SPROL_MAS__FCCREF","CVS_EXRT_FIX":"BLK_EXRT_DET__EXDT_FCCREF~BLK_EXRT_DET__EXDT_SPNO","CVS_ADV":"BLK_ADV_MAS__ADVM_FCCREF~BLK_ADV_MAS__ADVM_ESN","CVS_EXCEPTION":"BLK_EXCEPTION__EXP_REF","CVS_PART_INT_SHARE":"BLK_PART_SHR_MAS__BR_REF_NO~BLK_PART_SHR_MAS__BR_ESN~"};
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