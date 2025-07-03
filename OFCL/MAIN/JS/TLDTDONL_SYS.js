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
**  File Name          : TLDTDONL_SYS.js
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
var fieldNameArray = {"BLK_TD_MASTER":"FCCREF~USERREF~CUSTREFNO~EXTREFNO~TKTID~PORTFOLIO~CUSIP~FACILITIYNAME~COMITTYPE~PRDCD~PRDDESC~BRN~DEPTCD~TRESSRC~DESKCD~EXPCD~POSID~POSQA~MAR_TRD_ID~MAR_ALLOC_ID~CASCADE_PART~VER~UIVER~LVER~CONT_FEE_REF~CONT_ESN~REMARKS~LESN~QUERY_TYPE~TRDID","BLK_CONT_DET":"CNPTY~CCY~TRDAMT~TRDPRICE~ORG_TRD_AMT~COLLAT_PERCENT~TRD_TYPE~DEATTYPE~TRANSFER_PRICE~COSTBASIS~CPTY_DESC~CCY_DESC~TYPE~QUOTA~PIK_AMT~COMMIT_RD_AMT~COMMIT_RD_PRICE~BUYSELL","BLK_DET":"AGENCY_ID~BROKERID~BORROWER~ASSIGN_FEE_REMITT~DOC_TYP~EXT_CUSIP~PARENT_REF~SWAP_CPTY~PARENT_LINE_TRD~AC_PIK_CUSIP~TRDSTNDRD~PRMYTRADE","BLK_DATES":"BOOKDT~TRDDT~EXPSTLTDT~ACTSTLDT~MATDT","BLK_HOL_TREAT":"IGNORE_HOL~BRN_HOL~HOL_CCY~LCL_HOL_CCY~CONT_HOL_CCY~APPLY_FC_HOL_TREATMENT","BLK_FOOTER":"FOOT_FCCREF~FOOT_ESN~MAKER~MAKERDT~CHECKER~CHECKERDT~AUTHSTAT~CONTSTAT","BLK_EXCEPTION":"EXCEP_FCCREF~EXCEP_ESN~EXCEP_EVECD~EXCEP_COMM_REF~EXCEP_COMM_FEE_ESN~EXCEP_FEE_COMP~EXCEP_FEE_CCY~EXCEP_FEE_AMT~EXCEP_PROCESS_STAT~EXCEP_ERRCD~EXCEP_ERRPRM~EXCEP_ERR_DESC","BLK_CRL_MAS":"TRDREFNO~CRLD_NET_COMMIT_RND_AMT~CRLD_AVG_COMMIT_RND_PRICE","BLK_CRL_RND_DET":"CRLD_FCCREF~CRLD_VER~CRLD_COMM_RND_PRICE~CRLD_COMM_RND_AMT","BLK_SUMMARY":"SUM_AUTHSTAT~SUM_CONTSTAT~SUM_BRN~FCCREF~SUM_TKTID~SUM_POSID~SUM_PORTFOLIO~SUM_CUSIP~SUM_CPTY~SUM_DESKCD~SUM_BUYSELL~SUM_CCY~SUM_TRDTYPE~SUM_DEALTYPE~SUM_TRDDT~SUM_EXPTSTLDT~SUM_ACTSTLDT~SUM_SWAPID~SUM_SWAPCPTY"};

var multipleEntryPageSize = {"BLK_EXCEPTION" :"15" ,"BLK_CRL_RND_DET" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_EXCEPTION__TAB_MAIN":"BLK_EXCEPTION","CVS_CR_LOG__TAB_MAIN":"BLK_CRL_RND_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TD_MASTER">FCCREF~USERREF~CUSTREFNO~EXTREFNO~TKTID~PORTFOLIO~CUSIP~FACILITIYNAME~COMITTYPE~PRDCD~PRDDESC~BRN~DEPTCD~TRESSRC~DESKCD~EXPCD~POSID~POSQA~MAR_TRD_ID~MAR_ALLOC_ID~CASCADE_PART~VER~UIVER~LVER~CONT_FEE_REF~CONT_ESN~REMARKS~LESN~QUERY_TYPE~TRDID</FN>'; 
msgxml += '      <FN PARENT="BLK_TD_MASTER" RELATION_TYPE="1" TYPE="BLK_CONT_DET">CNPTY~CCY~TRDAMT~TRDPRICE~ORG_TRD_AMT~COLLAT_PERCENT~TRD_TYPE~DEATTYPE~TRANSFER_PRICE~COSTBASIS~CPTY_DESC~CCY_DESC~TYPE~QUOTA~PIK_AMT~COMMIT_RD_AMT~COMMIT_RD_PRICE~BUYSELL</FN>'; 
msgxml += '      <FN PARENT="BLK_TD_MASTER" RELATION_TYPE="1" TYPE="BLK_DET">AGENCY_ID~BROKERID~BORROWER~ASSIGN_FEE_REMITT~DOC_TYP~EXT_CUSIP~PARENT_REF~SWAP_CPTY~PARENT_LINE_TRD~AC_PIK_CUSIP~TRDSTNDRD~PRMYTRADE</FN>'; 
msgxml += '      <FN PARENT="BLK_TD_MASTER" RELATION_TYPE="1" TYPE="BLK_DATES">BOOKDT~TRDDT~EXPSTLTDT~ACTSTLDT~MATDT</FN>'; 
msgxml += '      <FN PARENT="BLK_TD_MASTER" RELATION_TYPE="1" TYPE="BLK_HOL_TREAT">IGNORE_HOL~BRN_HOL~HOL_CCY~LCL_HOL_CCY~CONT_HOL_CCY~APPLY_FC_HOL_TREATMENT</FN>'; 
msgxml += '      <FN PARENT="BLK_TD_MASTER" RELATION_TYPE="1" TYPE="BLK_FOOTER">FOOT_FCCREF~FOOT_ESN~MAKER~MAKERDT~CHECKER~CHECKERDT~AUTHSTAT~CONTSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_TD_MASTER" RELATION_TYPE="N" TYPE="BLK_EXCEPTION">EXCEP_FCCREF~EXCEP_ESN~EXCEP_EVECD~EXCEP_COMM_REF~EXCEP_COMM_FEE_ESN~EXCEP_FEE_COMP~EXCEP_FEE_CCY~EXCEP_FEE_AMT~EXCEP_PROCESS_STAT~EXCEP_ERRCD~EXCEP_ERRPRM~EXCEP_ERR_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_TD_MASTER" RELATION_TYPE="1" TYPE="BLK_CRL_MAS">TRDREFNO~CRLD_NET_COMMIT_RND_AMT~CRLD_AVG_COMMIT_RND_PRICE</FN>'; 
msgxml += '      <FN PARENT="BLK_CRL_MAS" RELATION_TYPE="N" TYPE="BLK_CRL_RND_DET">CRLD_FCCREF~CRLD_VER~CRLD_COMM_RND_PRICE~CRLD_COMM_RND_AMT</FN>'; 
msgxml += '      <FN PARENT="BLK_TD_MASTER" RELATION_TYPE="1" TYPE="BLK_SUMMARY">SUM_AUTHSTAT~SUM_CONTSTAT~SUM_BRN~FCCREF~SUM_TKTID~SUM_POSID~SUM_PORTFOLIO~SUM_CUSIP~SUM_CPTY~SUM_DESKCD~SUM_BUYSELL~SUM_CCY~SUM_TRDTYPE~SUM_DEALTYPE~SUM_TRDDT~SUM_EXPTSTLDT~SUM_ACTSTLDT~SUM_SWAPID~SUM_SWAPCPTY</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TDONL";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_TD_MASTER" RELATION_TYPE="1" TYPE="BLK_SUMMARY">SUM_AUTHSTAT~SUM_CONTSTAT~SUM_BRN~FCCREF~SUM_TKTID~SUM_POSID~SUM_PORTFOLIO~SUM_CUSIP~SUM_CPTY~SUM_DESKCD~SUM_BUYSELL~SUM_CCY~SUM_TRDTYPE~SUM_DEALTYPE~SUM_TRDDT~SUM_EXPTSTLDT~SUM_ACTSTLDT~SUM_SWAPID~SUM_SWAPCPTY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDTDONL";
var defaultWhereClause = "branch = global.current_branch";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TD_MASTER" : "","BLK_CONT_DET" : "BLK_TD_MASTER~1","BLK_DET" : "BLK_TD_MASTER~1","BLK_DATES" : "BLK_TD_MASTER~1","BLK_HOL_TREAT" : "BLK_TD_MASTER~1","BLK_FOOTER" : "BLK_TD_MASTER~1","BLK_EXCEPTION" : "BLK_TD_MASTER~N","BLK_CRL_MAS" : "BLK_TD_MASTER~1","BLK_CRL_RND_DET" : "BLK_CRL_MAS~N","BLK_SUMMARY" : "BLK_TD_MASTER~1"}; 

 var dataSrcLocationArray = new Array("BLK_TD_MASTER","BLK_CONT_DET","BLK_DET","BLK_DATES","BLK_HOL_TREAT","BLK_FOOTER","BLK_EXCEPTION","BLK_CRL_MAS","BLK_CRL_RND_DET","BLK_SUMMARY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTDONL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTDONL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TD_MASTER__FCCREF";
pkFields[0] = "BLK_TD_MASTER__FCCREF";
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
var lovInfoFlds = {"BLK_TD_MASTER__FCCREF__LOV_FCCREF":["BLK_TD_MASTER__FCCREF~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_EXCEPTION","BLK_CRL_RND_DET");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_TD_MASTER","OLCTRMIS~BLK_TD_MASTER","OLCTRUDF~BLK_TD_MASTER","TLCONSSI~BLK_TD_MASTER","TLCSWONL~BLK_TD_MASTER","TLCFMEMO~BLK_TD_MASTER","TLCFINCN~BLK_TD_MASTER"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO=OLTBS_CONTRACT__MIS.CONTRACT_REF_NO","TLTBS_CONTRACT_MASTER.CONTRACT_REF_NO = OLTBS_CONTRACT__FLD.CONTRACT_REF_NO AND TLTBS_CONTRACT_MASTER.VERSION_NO = OLTBS_CONTRACT__FLD.LATEST_VERSION_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__SSI.CONTRACT_REF_NO AND OLTBS_CONTRACT.LATEST_VERSION_NO = OLTBS_CONTRACT__SSI.LATEST_VERSION_NO","TLTBS_CONTRACT_MASTER.CONTRACT_REF_NO = TLTBS_CONTRACT_MASTER__SW.CONTRACT_REF_NO AND TLTBS_CONTRACT_MASTER.VERSION_NO = TLTBS_CONTRACT_MASTER__SW.VERSION_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = TLTB_FMEM_MASTER.CONTRACT_REF_NO","OLTBS_CONTRACT.EXTERNAL_REF_NO = TLTBS_UPLOAD_MASTER__FINCNTR.EXT_CONTRACT_REF_NO AND OLTBS_CONTRACT.LATEST_VERSION_NO = TLTBS_UPLOAD_MASTER__FINCNTR.VERSION_NO"); 

 var CallRelatType= new Array("1","1","1","1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDTDONL"]="KERNEL";
ArrPrntFunc["TLDTDONL"]="";
ArrPrntOrigin["TLDTDONL"]="";
ArrRoutingType["TLDTDONL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTDONL"]="N";
ArrCustomModified["TLDTDONL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN","OLCTRMIS":"CONTREF~ESN~PRDCD~BRNCD","OLCTRUDF":"CONTREFNO~LATVERNO","TLCONSSI":"CONTRACTREFNO~LATESTVERNO","TLCSWONL":"FCCREF~VERNO","TLCFMEMO":"REF_NO","TLCFINCN":"EXT_CONTRACT_REF_NO~VERSION_NO~","TLDTRFEE":"CONTRACTREFNO~LATESTVERNO~ACTION_CODE","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLCONDET":"BLK_TD_MASTER__FCCREF~BLK_TD_MASTER__LESN","OLCTRMIS":"BLK_TD_MASTER__FCCREF~BLK_TD_MASTER__LESN~BLK_TD_MASTER__PRDCD~BLK_TD_MASTER__BRN","OLCTRUDF":"BLK_TD_MASTER__CONT_FEE_REF~BLK_TD_MASTER__VER","TLCONSSI":"BLK_TD_MASTER__FCCREF~BLK_TD_MASTER__LVER","TLCSWONL":"BLK_TD_MASTER__FCCREF~BLK_TD_MASTER__VER","TLCFMEMO":"BLK_TD_MASTER__FCCREF","TLCFINCN":"BLK_TD_MASTER__EXTREFNO~BLK_TD_MASTER__LVER~","TLDTRFEE":"BLK_TD_MASTER__FCCREF~BLK_TD_MASTER__VER~","OLDEVENT":"BLK_TD_MASTER__FCCREF~"};
var scrArgVals = {"OLCONDET":"~","OLCTRMIS":"~~~","OLCTRUDF":"~","TLCONSSI":"~","TLCSWONL":"~","TLCFMEMO":"","TLCFINCN":"~~","TLDTRFEE":"~~EXECUTEQUERY","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":"","OLCTRMIS":"","OLCTRUDF":"","TLCONSSI":"","TLCSWONL":"","TLCFMEMO":"","TLCFINCN":""};
var dpndntOnSrvs = {"OLCONDET":"","OLCTRMIS":"","OLCTRUDF":"","TLCONSSI":"","TLCSWONL":"","TLCFMEMO":"","TLCFINCN":""};
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