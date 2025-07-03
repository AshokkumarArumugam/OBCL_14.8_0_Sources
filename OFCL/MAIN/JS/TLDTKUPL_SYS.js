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
**  File Name          : TLDTKUPL_SYS.js
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
var fieldNameArray = {"BLK_TKT_MAS":"TKT_ID~SRCCD~BRN~POSID~PRDCD~PRDDESC~TKTREFNO~EXTREFNO~USREFNO~CCY~CCYNAME~FACILITYBR~FACILITYBR_NAME~TRDTYP~DEPTCD~TREASURYSRC~DESKCD~EXPENSECD~PORTFOLIO~POSQA~TRDPRICE~DEALTYP~MAKER~MAKERDT~CHECKER~CHEKERDT~AUTHSTAT~TXNSTAT~VERNO~SUBSYSSTAT~ONCEAUTH~DCFWAV~TRADEID~EXSTLDT_DEFAULT","BLK_OTHER_DET":"BOOKDT~TRDDT~EXPSETDT~ASSIGN_FEE_REMITT~BROKER~AGENCYID~QUOTATION~BUYSELL","BLK_TRD_DET":"DET_EXTFEEREF~DET_TRDREF~DET_PROCESSSTAT~DET_TKTID~DET_CASC_APRT~DET_CPTY~DET_CPTYNAME~DET_CUSIP~DET_CCY~DET_TRDAMT~DET_BORROWER~DET_EXTCUSIP~DET_MATDT~DET_COMTYPE~DET_TYPE~DET_PIKAMT~DET_COMRNDAMT","BLK_HOL_TREAT":"HOLCCY~IGRHOL~CONBRNHOL~APP_LCLHOL_CCY~APP_CONTHOL_CCT","BLK_OTHERS":"REMARKS~SUBMIT~REJECT~VERIFY","BLK_TKT_SSI":"SSI_TKT_ID~SSI_EXT_REF~SSI_TKT_REF~SSI_SRCCD~SSI_BRN","BLK_SSI_TRD_CUST":"CUST_TKTID~CUST_CPTY~CUST_CPTY_DESC~CUST_CUST_TYP","BLK_CCY_SSI":"CCY_CCY~CCY_CCYNAME~CCY_SSIM~CCY_REMARKS~CCY_EXTFEEREF~CCY_SSIM_FOR~CCY_CUST~CCY_SETL_SEQ"};

var multipleEntryPageSize = {"BLK_TRD_DET" :"15" ,"BLK_SSI_TRD_CUST" :"15" ,"BLK_CCY_SSI" :"15" };

var multipleEntrySVBlocks = "BLK_TRD_DET";

var tabMEBlks = {"CVS_TKUPL__TAB_MAIN":"BLK_TRD_DET","CVS_TKTSSI__TAB_MAIN":"BLK_SSI_TRD_CUST~BLK_CCY_SSI"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TKT_MAS">TKT_ID~SRCCD~BRN~POSID~PRDCD~PRDDESC~TKTREFNO~EXTREFNO~USREFNO~CCY~CCYNAME~FACILITYBR~FACILITYBR_NAME~TRDTYP~DEPTCD~TREASURYSRC~DESKCD~EXPENSECD~PORTFOLIO~POSQA~TRDPRICE~DEALTYP~MAKER~MAKERDT~CHECKER~CHEKERDT~AUTHSTAT~TXNSTAT~VERNO~SUBSYSSTAT~ONCEAUTH~DCFWAV~TRADEID~EXSTLDT_DEFAULT</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MAS" RELATION_TYPE="1" TYPE="BLK_OTHER_DET">BOOKDT~TRDDT~EXPSETDT~ASSIGN_FEE_REMITT~BROKER~AGENCYID~QUOTATION~BUYSELL</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MAS" RELATION_TYPE="N" TYPE="BLK_TRD_DET">DET_EXTFEEREF~DET_TRDREF~DET_PROCESSSTAT~DET_TKTID~DET_CASC_APRT~DET_CPTY~DET_CPTYNAME~DET_CUSIP~DET_CCY~DET_TRDAMT~DET_BORROWER~DET_EXTCUSIP~DET_MATDT~DET_COMTYPE~DET_TYPE~DET_PIKAMT~DET_COMRNDAMT</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MAS" RELATION_TYPE="1" TYPE="BLK_HOL_TREAT">HOLCCY~IGRHOL~CONBRNHOL~APP_LCLHOL_CCY~APP_CONTHOL_CCT</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MAS" RELATION_TYPE="1" TYPE="BLK_OTHERS">REMARKS~SUBMIT~REJECT~VERIFY</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_MAS" RELATION_TYPE="1" TYPE="BLK_TKT_SSI">SSI_TKT_ID~SSI_EXT_REF~SSI_TKT_REF~SSI_SRCCD~SSI_BRN</FN>'; 
msgxml += '      <FN PARENT="BLK_TKT_SSI" RELATION_TYPE="N" TYPE="BLK_SSI_TRD_CUST">CUST_TKTID~CUST_CPTY~CUST_CPTY_DESC~CUST_CUST_TYP</FN>'; 
msgxml += '      <FN PARENT="BLK_SSI_TRD_CUST" RELATION_TYPE="N" TYPE="BLK_CCY_SSI">CCY_CCY~CCY_CCYNAME~CCY_SSIM~CCY_REMARKS~CCY_EXTFEEREF~CCY_SSIM_FOR~CCY_CUST~CCY_SETL_SEQ</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TKUPL";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TKT_MAS">TKT_ID~SRCCD~BRN~AUTHSTAT~TXNSTAT~DESKCD~EXPENSECD~PORTFOLIO~POSQA~TRDPRICE~DEALTYP</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDTKUPL";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TKT_MAS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TKT_MAS" : "","BLK_OTHER_DET" : "BLK_TKT_MAS~1","BLK_TRD_DET" : "BLK_TKT_MAS~N","BLK_HOL_TREAT" : "BLK_TKT_MAS~1","BLK_OTHERS" : "BLK_TKT_MAS~1","BLK_TKT_SSI" : "BLK_TKT_MAS~1","BLK_SSI_TRD_CUST" : "BLK_TKT_SSI~N","BLK_CCY_SSI" : "BLK_SSI_TRD_CUST~N"}; 

 var dataSrcLocationArray = new Array("BLK_TKT_MAS","BLK_OTHER_DET","BLK_TRD_DET","BLK_HOL_TREAT","BLK_OTHERS","BLK_TKT_SSI","BLK_SSI_TRD_CUST","BLK_CCY_SSI"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTKUPL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTKUPL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TKT_MAS__TKT_ID";
pkFields[0] = "BLK_TKT_MAS__TKT_ID";
queryFields[1] = "BLK_TKT_MAS__SRCCD";
pkFields[1] = "BLK_TKT_MAS__SRCCD";
queryFields[2] = "BLK_TKT_MAS__BRN";
pkFields[2] = "BLK_TKT_MAS__BRN";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CCY_SSI":["CCY_CCY","CCY_CCYNAME","CCY_CUST","CCY_REMARKS","CCY_SSIM","CCY_SSIM_FOR"],"BLK_HOL_TREAT":["APP_CONTHOL_CCT","APP_LCLHOL_CCY","CONBRNHOL","HOLCCY","IGRHOL"],"BLK_OTHERS":["BTN_VALIDATE","REJECT","REMARKS","SUBMIT"],"BLK_OTHER_DET":["AGENCYID","ASSIGN_FEE_REMITT","BROKER","BUYSELL","EXPSETDTI","QUOTATION","TRDDTI"],"BLK_SSI_TRD_CUST":["CUST_CPTY","CUST_CUST_TYP"],"BLK_TKT_MAS":["CCY","EXPENSECD","FACILITYBR","TRDPRICE","TRDTYP","USREFNO"],"BLK_TRD_DET":["DET_CASC_APRT"]};
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
var lovInfoFlds = {"BLK_TKT_MAS__POSID__LOV_POSITION_ID":["BLK_TKT_MAS__POSID~BLK_TKT_MAS__PORTFOLIO~BLK_TKT_MAS__BRN~BLK_TKT_MAS__DESKCD~BLK_TKT_MAS__POSQA~~~","","N~N~N~N~N~N~N",""],"BLK_TKT_MAS__PRDCD__LOV_PRDCD":["BLK_TKT_MAS__PRDCD~BLK_TKT_MAS__PRDDESC~","","N~N",""],"BLK_TKT_MAS__CCY__LOV_CCY":["BLK_TKT_MAS__CCY~BLK_TKT_MAS__CCYNAME~","","N~N",""],"BLK_TKT_MAS__FACILITYBR__LOV_CPTY":["BLK_TKT_MAS__FACILITYBR~~BLK_TKT_MAS__FACILITYBR_NAME~","","N~N~N",""],"BLK_TKT_MAS__EXPENSECD__LOV_EXPENSE_CD":["BLK_TKT_MAS__EXPENSECD~","BLK_TKT_MAS__PORTFOLIO!VARCHAR2","N",""],"BLK_OTHER_DET__BROKER__LOV_BROKER":["BLK_OTHER_DET__BROKER~~","","N~N",""],"BLK_OTHER_DET__AGENCYID__LOV_CPTY":["BLK_OTHER_DET__AGENCYID~~~","","N~N~N",""],"BLK_TRD_DET__DET_CPTY__LOV_CPTY":["BLK_TRD_DET__DET_CPTY~~BLK_TRD_DET__DET_CPTYNAME~","","N~N~N",""],"BLK_TRD_DET__DET_CUSIP__LOV_CUSIP":["BLK_TRD_DET__DET_CUSIP~","BLK_TKT_MAS__POSID!VARCHAR2","N","N"],"BLK_HOL_TREAT__HOLCCY__LOV_CCY":["BLK_HOL_TREAT__HOLCCY~~","","N~N",""],"BLK_CCY_SSI__CCY_CCY__LOV_SSI_CCY":["BLK_CCY_SSI__CCY_CCY~BLK_CCY_SSI__CCY_CCYNAME~","BLK_TKT_SSI__SSI_EXT_REF!VARCHAR2~BLK_CCY_SSI__CCY_CUST!VARCHAR2","N~N",""],"BLK_CCY_SSI__CCY_SSIM__LOV_MNEMONIC":["BLK_CCY_SSI__CCY_SSIM~~~BLK_CCY_SSI__CCY_SETL_SEQ~","BLK_CCY_SSI__CCY_CUST!VARCHAR2","N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TRD_DET","BLK_SSI_TRD_CUST","BLK_CCY_SSI");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("TLCUPFEE~BLK_TKT_MAS","TLCUPUDF~BLK_TKT_MAS"); 

 var CallFormRelat=new Array("TLTBS_TICKET_TRADE_MASTER.EXT_CONTRACT_REF_NO = TLTBS_UPLOAD_MASTER__FEE.EXT_CONTRACT_REF_NO AND TLTBS_TICKET_TRADE_MASTER.VERSION_NO = TLTBS_UPLOAD_MASTER__FEE.VERSION_NO AND TLTBS_TICKET_TRADE_MASTER.SOURCE_CODE = TLTBS_UPLOAD_MASTER__FEE.SOURCE_CODE AND TLTBS_TICKET_TRADE_MASTER.BRANCH = TLTBS_UPLOAD_MASTER__FEE.BRANCH","TLTBS_TICKET_TRADE_MASTER.EXT_CONTRACT_REF_NO = TLTBS_UPLOAD_MASTER__MAST.EXT_CONTRACT_REF_NO AND TLTBS_TICKET_TRADE_MASTER.VERSION_NO = TLTBS_UPLOAD_MASTER__MAST.VERSION_NO AND TLTBS_TICKET_TRADE_MASTER.SOURCE_CODE = TLTBS_UPLOAD_MASTER__MAST.SOURCE_CODE AND TLTBS_TICKET_TRADE_MASTER.BRANCH = TLTBS_UPLOAD_MASTER__MAST.BRANCH"); 

 var CallRelatType= new Array("1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDTKUPL"]="KERNEL";
ArrPrntFunc["TLDTKUPL"]="";
ArrPrntOrigin["TLDTKUPL"]="";
ArrRoutingType["TLDTKUPL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTKUPL"]="N";
ArrCustomModified["TLDTKUPL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_TKTSSI":"TKTID~EXTREF~TKTREF~SRCCD~BRN","TLCUPFEE":"EXTCONTRACTREFNO~VERNO~SOURCECODE~BRANCH","TLCUPUDF":"EXTCONTRACTREFNO~VERSIONNO~SOURCECODE~BRANCH"};
var scrArgSource = {"CVS_TKTSSI":"BLK_TKT_MAS__TKT_ID~BLK_TKT_MAS__EXTREFNO~BLK_TKT_MAS__TKTREFNO~BLK_TKT_MAS__SRCCD~BLK_TKT_MAS__BRN","TLCUPFEE":"BLK_TKT_MAS__EXTREFNO~BLK_TKT_MAS__VERNO~BLK_TKT_MAS__SRCCD~BLK_TKT_MAS__BRN","TLCUPUDF":"BLK_TKT_MAS__EXTREFNO~BLK_TKT_MAS__VERNO~BLK_TKT_MAS__SRCCD~BLK_TKT_MAS__BRN"};
var scrArgVals = {"CVS_TKTSSI":"~~~~","TLCUPFEE":"~~~","TLCUPUDF":"~~~"};
var scrArgDest = {"CVS_TKTSSI":"BLK_TKT_SSI__SSI_TKT_ID~BLK_TKT_SSI__SSI_EXT_REF~BLK_TKT_SSI__SSI_TKT_REF~BLK_TKT_SSI__SSI_SRCCD~BLK_TKT_SSI__SSI_BRN"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"TLCUPFEE":"","TLCUPUDF":""};
var dpndntOnSrvs = {"TLCUPFEE":"","TLCUPUDF":""};
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