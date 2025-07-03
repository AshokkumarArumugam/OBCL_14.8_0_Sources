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
**  File Name          : TLDTDUPL_SYS.js
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
var fieldNameArray = {"BLK_TRD_DRAFT":"EXT_FCCREF~SRC_CODE~BRN~POSITION_ID~PRD_CD~PRD_DESC~UPLD_RFE~TRD_REF~USER_REF~TKT_ID~PORTFOLIO~CUSPIP~FACILITY_NAME~DEPT_CD~TREASURY_SRC~DESK_CD~EXPENSE_CD~POSITION_QUA~COMMIT_TYPE~MAR_TRD_ID~MAR_ALLOCA_ID~CASCADE_PART~REMARKS~VERNO~MAX_VERNO~SUBMIT~REJECT~LQTTRDVER~EXTAC~CRKEY~COSTBA~TRANSPRICE~MODULE~TRDID~ONCEAUTH~ELEVER~LINKREF~INTERNALTRD~SUBSYSSTAT~DCFWAV~MAKER~MAKERDT~CHECKER~CHECKERDT~AUTHSTAT~TXNSTAT~SWAPREQD","BLK_CONT_DET":"CPTY~CCY~TRD_AMT~TRD_PRICE~ORG_TRD_AMT~COLLAT_PERCEN~TRD_TYPE~DEAL_TYPE~CPTY_DESC~CCY_DESC~PIK_AMT~COMMIT_RND_AMT~COMMIT_RND_PRICE~TYPE~QUOTA~BUY_SELL~ADJUSTMENT_RATE","BLK_OTHER_DET":"AGENCY_ID~BROKER_ID~BORROWER~EXT_CUSIP~ASSIGN_FEE_REMITT~DOC_TYPE~CMT_RND_VER~PIK_VER~LINE_TRD~CMT_PIK_CUSIP~G_FIRM_ACCOUNT~FIRM_AC_MNEMO~TRDSTNDRD~PRMYTRADE","BLK_DATES":"BOOKDT~TRDDT~EXPT_DT~MATDT","BLK_HOL_TREAT":"HOL_CCY~IGR_HOL~CONSI_BRN_HOL~LCL_HOL_CCY~CONT_HOL_CCY~APPLY_FC_HOL_TREATMENT","BLK_SUMMARY":"EXT_FCCREF~VERNO~SUM_PROCESS_STAT~SUM_AUTHSTAT~SUM_TKTID~SUM_CUSIP~SUM_POSID~SUM_CPTY~BRN~SRC_CODE~SUMEXPSETTLDT~SUMTRDAMT~SUMTRDATE~SUMUSRREF~SUMTRADEREF"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TRD_DRAFT">EXT_FCCREF~SRC_CODE~BRN~POSITION_ID~PRD_CD~PRD_DESC~UPLD_RFE~TRD_REF~USER_REF~TKT_ID~PORTFOLIO~CUSPIP~FACILITY_NAME~DEPT_CD~TREASURY_SRC~DESK_CD~EXPENSE_CD~POSITION_QUA~COMMIT_TYPE~MAR_TRD_ID~MAR_ALLOCA_ID~CASCADE_PART~REMARKS~VERNO~MAX_VERNO~SUBMIT~REJECT~LQTTRDVER~EXTAC~CRKEY~COSTBA~TRANSPRICE~MODULE~TRDID~ONCEAUTH~ELEVER~LINKREF~INTERNALTRD~SUBSYSSTAT~DCFWAV~MAKER~MAKERDT~CHECKER~CHECKERDT~AUTHSTAT~TXNSTAT~SWAPREQD</FN>'; 
msgxml += '      <FN PARENT="BLK_TRD_DRAFT" RELATION_TYPE="1" TYPE="BLK_CONT_DET">CPTY~CCY~TRD_AMT~TRD_PRICE~ORG_TRD_AMT~COLLAT_PERCEN~TRD_TYPE~DEAL_TYPE~CPTY_DESC~CCY_DESC~PIK_AMT~COMMIT_RND_AMT~COMMIT_RND_PRICE~TYPE~QUOTA~BUY_SELL~ADJUSTMENT_RATE</FN>'; 
msgxml += '      <FN PARENT="BLK_TRD_DRAFT" RELATION_TYPE="1" TYPE="BLK_OTHER_DET">AGENCY_ID~BROKER_ID~BORROWER~EXT_CUSIP~ASSIGN_FEE_REMITT~DOC_TYPE~CMT_RND_VER~PIK_VER~LINE_TRD~CMT_PIK_CUSIP~G_FIRM_ACCOUNT~FIRM_AC_MNEMO~TRDSTNDRD~PRMYTRADE</FN>'; 
msgxml += '      <FN PARENT="BLK_TRD_DRAFT" RELATION_TYPE="1" TYPE="BLK_DATES">BOOKDT~TRDDT~EXPT_DT~MATDT</FN>'; 
msgxml += '      <FN PARENT="BLK_TRD_DRAFT" RELATION_TYPE="1" TYPE="BLK_HOL_TREAT">HOL_CCY~IGR_HOL~CONSI_BRN_HOL~LCL_HOL_CCY~CONT_HOL_CCY~APPLY_FC_HOL_TREATMENT</FN>'; 
msgxml += '      <FN PARENT="BLK_TRD_DRAFT" RELATION_TYPE="1" TYPE="BLK_SUMMARY">EXT_FCCREF~VERNO~SUM_PROCESS_STAT~SUM_AUTHSTAT~SUM_TKTID~SUM_CUSIP~SUM_POSID~SUM_CPTY~BRN~SRC_CODE~SUMEXPSETTLDT~SUMTRDAMT~SUMTRDATE~SUMUSRREF~SUMTRADEREF</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TRD_DRAFT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_TRD_DRAFT" RELATION_TYPE="1" TYPE="BLK_SUMMARY">EXT_FCCREF~VERNO~SUM_PROCESS_STAT~SUM_AUTHSTAT~SUM_TKTID~SUM_CUSIP~SUM_POSID~SUM_CPTY~BRN~SRC_CODE~SUMTRDATE~SUMEXPSETTLDT~SUMTRADEREF~SUMTRDAMT~SUMUSRREF</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDTDUPL";
var defaultWhereClause = "Branch = Global.Current_Branch and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = PRODUCT_CODE AND USER_ID = global.user_id)";
var defaultOrderByClause ="PROCESS_STATUS";
var multiBrnWhereClause ="Branch IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID) and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = PRODUCT_CODE AND USER_ID = global.user_id)";
var g_SummaryType ="S";
var g_SummaryBtnCount =1;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TRD_DRAFT" : "","BLK_CONT_DET" : "BLK_TRD_DRAFT~1","BLK_OTHER_DET" : "BLK_TRD_DRAFT~1","BLK_DATES" : "BLK_TRD_DRAFT~1","BLK_HOL_TREAT" : "BLK_TRD_DRAFT~1","BLK_SUMMARY" : "BLK_TRD_DRAFT~1"}; 

 var dataSrcLocationArray = new Array("BLK_TRD_DRAFT","BLK_CONT_DET","BLK_OTHER_DET","BLK_DATES","BLK_HOL_TREAT","BLK_SUMMARY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTDUPL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTDUPL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TRD_DRAFT__EXT_FCCREF";
pkFields[0] = "BLK_TRD_DRAFT__EXT_FCCREF";
queryFields[1] = "BLK_TRD_DRAFT__SRC_CODE";
pkFields[1] = "BLK_TRD_DRAFT__SRC_CODE";
queryFields[2] = "BLK_TRD_DRAFT__BRN";
pkFields[2] = "BLK_TRD_DRAFT__BRN";
queryFields[3] = "BLK_TRD_DRAFT__VERNO";
pkFields[3] = "BLK_TRD_DRAFT__VERNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONT_DET":["BUY_SELL","CCY","CCY_DESC","COLLAT_PERCEN","COMMIT_RND_AMT","COMMIT_RND_PRICE","CPTY","CPTY_DESC","DEAL_TYPE","ORG_TRD_AMT","PIK_AMT","QUOTA","TRD_AMT","TRD_PRICE","TRD_TYPE","TYPE"],"BLK_DATES":["EXPT_DTI","MATDTI","TRDDTI"],"BLK_HOL_TREAT":["APPLY_FC_HOL_TREATMENT","CONSI_BRN_HOL","CONT_HOL_CCY","HOL_CCY","IGR_HOL","LCL_HOL_CCY"],"BLK_OTHER_DET":["AGENCY_ID","ASSIGN_FEE_REMITT","BORROWER","BROKER_ID","CMT_PIK_CUSIP","CMT_RND_VER","DOC_TYPE","EXT_CUSIP","FIRM_AC_MNEMO","G_FIRM_ACCOUNT","LINE_TRD","PIK_VER"],"BLK_TRD_DRAFT":["CASCADE_PART","COMMIT_TYPE","CUSPIP","EXPENSE_CD","FACILITY_NAME","MAR_ALLOCA_ID","PORTFOLIO","REJECT","REMARKS","SUBMIT","TKT_ID"]};
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
var lovInfoFlds = {"BLK_TRD_DRAFT__POSITION_ID__LOV_POSITION_ID":["BLK_TRD_DRAFT__POSITION_ID~BLK_TRD_DRAFT__PORTFOLIO~BLK_TRD_DRAFT__BRN~BLK_TRD_DRAFT__DESK_CD~BLK_TRD_DRAFT__POSITION_QUA~~~","","N~N~N~N~N~N~N",""],"BLK_TRD_DRAFT__PRD_CD__LOV_PRDCD":["BLK_TRD_DRAFT__PRD_CD~BLK_TRD_DRAFT__PRD_DESC~","","N~N",""],"BLK_TRD_DRAFT__EXPENSE_CD__LOV_EXPENSE_CD":["BLK_TRD_DRAFT__EXPENSE_CD~","BLK_TRD_DRAFT__PORTFOLIO!VARCHAR2","N",""],"BLK_CONT_DET__CPTY__LOV_CPTY":["BLK_CONT_DET__CPTY~~BLK_CONT_DET__CPTY_DESC~","","N~N~N",""],"BLK_CONT_DET__CCY__LOV_CCY":["BLK_CONT_DET__CCY~BLK_CONT_DET__CCY_DESC~","","N~N",""],"BLK_OTHER_DET__AGENCY_ID__LOV_CPTY":["BLK_OTHER_DET__AGENCY_ID~~~","","N~N~N",""],"BLK_OTHER_DET__BROKER_ID__LOV_BROKER":["BLK_OTHER_DET__BROKER_ID~~","","N~N",""],"BLK_OTHER_DET__BORROWER__LOV_CPTY":["BLK_OTHER_DET__BORROWER~~~","","N~N~N",""],"BLK_OTHER_DET__FIRM_AC_MNEMO__LOV_FIRM_MNEMO":["BLK_OTHER_DET__FIRM_AC_MNEMO~~","BLK_TRD_DRAFT__EXPENSE_CD!VARCHAR2~BLK_OTHER_DET__G_FIRM_ACCOUNT!VARCHAR2~BLK_TRD_DRAFT__PORTFOLIO!VARCHAR2~BLK_OTHER_DET__G_FIRM_ACCOUNT!VARCHAR2","N~N",""],"BLK_HOL_TREAT__HOL_CCY__LOV_CCY":["BLK_HOL_TREAT__HOL_CCY~~","","N~N",""]};
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

 var CallFormArray= new Array("TLCSWUPL~BLK_TRD_DRAFT","TLCUPFEE~BLK_TRD_DRAFT","TLCUPSSI~BLK_TRD_DRAFT","TLCUPUDF~BLK_TRD_DRAFT","TLCERONL~BLK_TRD_DRAFT","TLCFINCN~BLK_TRD_DRAFT"); 

 var CallFormRelat=new Array("TLTBS_UPLOAD_MASTER.EXT_CONTRACT_REF_NO = TLTBS_UPLOAD_MASTER__SW.EXT_CONTRACT_REF_NO AND TLTBS_UPLOAD_MASTER.VERSION_NO = TLTBS_UPLOAD_MASTER__SW.VERSION_NO AND TLTBS_UPLOAD_MASTER.SOURCE_CODE = TLTBS_UPLOAD_MASTER__SW.SOURCE_CODE AND TLTBS_UPLOAD_MASTER.BRANCH = TLTBS_UPLOAD_MASTER__SW.BRANCH","TLTBS_UPLOAD_MASTER.EXT_CONTRACT_REF_NO = TLTBS_UPLOAD_MASTER__FEE.EXT_CONTRACT_REF_NO AND TLTBS_UPLOAD_MASTER.VERSION_NO = TLTBS_UPLOAD_MASTER__FEE.VERSION_NO AND TLTBS_UPLOAD_MASTER.SOURCE_CODE = TLTBS_UPLOAD_MASTER__FEE.SOURCE_CODE AND TLTBS_UPLOAD_MASTER.BRANCH = TLTBS_UPLOAD_MASTER__FEE.BRANCH","TLTBS_UPLOAD_MASTER.EXT_CONTRACT_REF_NO = TLTBS_UPLOAD_MASTER__SSI.EXT_CONTRACT_REF_NO AND TLTBS_UPLOAD_MASTER.VERSION_NO = TLTBS_UPLOAD_MASTER__SSI.VERSION_NO AND TLTBS_UPLOAD_MASTER.SOURCE_CODE = TLTBS_UPLOAD_MASTER__SSI.SOURCE_CODE AND TLTBS_UPLOAD_MASTER.BRANCH = TLTBS_UPLOAD_MASTER__SSI.BRANCH","TLTBS_UPLOAD_MASTER.EXT_CONTRACT_REF_NO = TLTBS_UPLOAD_MASTER__MAST.EXT_CONTRACT_REF_NO AND TLTBS_UPLOAD_MASTER.VERSION_NO = TLTBS_UPLOAD_MASTER__MAST.VERSION_NO AND TLTBS_UPLOAD_MASTER.SOURCE_CODE = TLTBS_UPLOAD_MASTER__MAST.SOURCE_CODE AND TLTBS_UPLOAD_MASTER.BRANCH = TLTBS_UPLOAD_MASTER__MAST.BRANCH","TLTBS_UPLOAD_MASTER.EXT_CONTRACT_REF_NO = OLTBS_CONTRACT__ERROR.CONTRACT_REF_NO AND TLTBS_UPLOAD_MASTER.VERSION_NO = OLTBS_CONTRACT__ERROR.LATEST_VERSION_NO","TLTBS_UPLOAD_MASTER.EXT_CONTRACT_REF_NO = TLTBS_UPLOAD_MASTER__FINCNTR.EXT_CONTRACT_REF_NO AND TLTBS_UPLOAD_MASTER.VERSION_NO = TLTBS_UPLOAD_MASTER__FINCNTR.VERSION_NO"); 

 var CallRelatType= new Array("1","1","1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDTDUPL"]="KERNEL";
ArrPrntFunc["TLDTDUPL"]="";
ArrPrntOrigin["TLDTDUPL"]="";
ArrRoutingType["TLDTDUPL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTDUPL"]="N";
ArrCustomModified["TLDTDUPL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"TLCSWUPL":"FCCRE~VERNO~SRCCD~BRN","TLCUPFEE":"EXTCONTRACTREFNO~VERNO~SOURCECODE~BRANCH","TLCUPSSI":"EXTCONTRACTREFNO~VERNO~SOURCECODE~BRANCH~COUNTERPARTY","TLCUPUDF":"EXTCONTRACTREFNO~VERSIONNO~SOURCECODE~BRANCH","TLCERONL":"CONTRACTREFNO~LATESTVERNO~ACTION_CODE","TLCFINCN":"EXT_CONTRACT_REF_NO~VERSION_NO~","TLDERONL":"CONTRACTREFNO~LATESTVERNO~ACTION_CODE"};
var scrArgSource = {"TLCSWUPL":"BLK_TRD_DRAFT__EXT_FCCREF~BLK_TRD_DRAFT__VERNO~BLK_TRD_DRAFT__SRC_CODE~BLK_TRD_DRAFT__BRN","TLCUPFEE":"BLK_TRD_DRAFT__EXT_FCCREF~BLK_TRD_DRAFT__VERNO~BLK_TRD_DRAFT__SRC_CODE~BLK_TRD_DRAFT__BRN","TLCUPSSI":"BLK_TRD_DRAFT__EXT_FCCREF~BLK_TRD_DRAFT__VERNO~BLK_TRD_DRAFT__SRC_CODE~BLK_TRD_DRAFT__BRN~BLK_CONT_DET__CPTY","TLCUPUDF":"BLK_TRD_DRAFT__EXT_FCCREF~BLK_TRD_DRAFT__VERNO~BLK_TRD_DRAFT__SRC_CODE~BLK_TRD_DRAFT__BRN","TLCERONL":"BLK_TRD_DRAFT__EXT_FCCREF~BLK_TRD_DRAFT__VERNO~","TLCFINCN":"BLK_TRD_DRAFT__EXT_FCCREF~BLK_TRD_DRAFT__VERNO~","TLDERONL":"BLK_TRD_DRAFT__EXT_FCCREF~BLK_TRD_DRAFT__VERNO~"};
var scrArgVals = {"TLCSWUPL":"~~~","TLCUPFEE":"~~~","TLCUPSSI":"~~~~","TLCUPUDF":"~~~","TLCERONL":"~~EXECUTEQUERY","TLCFINCN":"~~","TLDERONL":"~~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"TLCSWUPL":"","TLCUPFEE":"","TLCUPSSI":"BLK_CONT_DET__CPTY~BLK_OTHER_DET__AGENCY_ID","TLCUPUDF":"","TLCERONL":"","TLCFINCN":""};
var dpndntOnSrvs = {"TLCSWUPL":"","TLCUPFEE":"","TLCUPSSI":"","TLCUPUDF":"","TLCERONL":"","TLCFINCN":""};
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