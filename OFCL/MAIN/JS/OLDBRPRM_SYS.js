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
**  File Name          : OLDBRPRM_SYS.js
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
var fieldNameArray = {"BLK_BRANCH":"BRANCHCODE~PROCESSTILL~ACCRUALLEVEL~TAXCOMPUTATIONBASIS~RESIDUALAMOUNT~RESIDUALTRNCODE~JOPTIONREQ~BICCODE~NAME~ADDRESS1~ADDRESS2~CITY~MMTRACERREQUIRED~TRACERDAYS~EFFCUSTLOANRATE~EFFLOANRATE~EFFDEPRATE~TRACKDELINQUENCY~RECLASSIFYPYCYINCOME~EFFDENOMBASIS~FEEACCRLEVEL~MODULECODE~POSTINTODEFACC~CROSSREFBASIS~COMMONREFFIELD21~EXTCUSTOMREFNO~IS83MANDATORY~DQAUTOLIQDREQD~REFNOSUFFIXFIELD20~CONFIRMAUTOAUTH~MANDATORYYENDTAX~ALLOWWITHHOLDINGTAX~TRACERFREQUENCY~MAXTRACERCOUNT~NETTINCOMINGTRFRPRODCODE~NETTOUTGOINGTRFRCUSTPROD~NETTOUTGOINGTRFRPARTPROD~NETTINTERNALTRFRPRODCODE~REVERSALSUSPENSEGL~FTOFFSETGL~IRRNFORLIQDCONTRACT~FTIHANDOFFREQUIRED~CHINESECHARACTERSINPAYMENT~UI_BRANCH_DESC~UI_CUSTOMER_PROD_DESC~UI_BANK_PROD_DESC~UI_INCOMING_PROD_DESC~UI_INTERNAL_PROD_DESC~UI_REVERSAL_SUSPENSE_GL~UI_OFFSET_GL~LSMSGSUSPENSEGL~REPORTINGCCY~REPORTINGRATETYPE~ROUNDINGPARTICIPANT~TXTREPORTCCY~TXTREPRATETYPE~TXTROUNDPART~TXTLSMSGSUSGL~COLSETTLEMENTCUSTOMER~COLONLINECUSTOMER~LSCOLLATERALMINTRBAL~LSCOLLATERALMAXDRAMT~FORWARDPROCESSARCHIVEDAYS~FORWARDLIMITDAYS~TXTCOLSETCUST~TXTCOLONLCUST~SIGHTINGFUNDSSUSPENSEGL~SIGHTINGFUNDSGL~SIGHTINGFUNDSAPPLICABLE~PNLACCOUNT~TXTSIGSUSGLDESC~TXTSIGFNDGLDESC~TXTPNLACCDESC~STPLIMITCCY~STPLIMITAMT~CCYSEPARATOR~CCYFORMATMASK~LEGALVEHICLE~ONLINEMISGROUP~TRADINGMISGROUP~EODRELATEDCUSTOMER~POSTYENDENTBRNLCY~CCYRESTRICTION~GENSELFPARTICIPANTMSG~CIFID~TXTCIFIDDESC~REGIONALOFFICE~PARENTBRANCH~TXTPARENTBRN~UI_GEN_PAYMENT_NOSTRO~BCKDT_PMNT_CUTOFF~BCKDT_AMND_CUTOFF~POPULATE_MO~PUSH_MO_DAYS~EXTGRPSTATPROC~LOCALGRPSTATPROC~BACK_VALUE_CHK_REQD~BACK_VALUE_DAYS~RETRO_POSTING_DAYS~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BRANCH">BRANCHCODE~PROCESSTILL~ACCRUALLEVEL~TAXCOMPUTATIONBASIS~RESIDUALAMOUNT~RESIDUALTRNCODE~JOPTIONREQ~BICCODE~NAME~ADDRESS1~ADDRESS2~CITY~MMTRACERREQUIRED~TRACERDAYS~EFFCUSTLOANRATE~EFFLOANRATE~EFFDEPRATE~TRACKDELINQUENCY~RECLASSIFYPYCYINCOME~EFFDENOMBASIS~FEEACCRLEVEL~MODULECODE~POSTINTODEFACC~CROSSREFBASIS~COMMONREFFIELD21~EXTCUSTOMREFNO~IS83MANDATORY~DQAUTOLIQDREQD~REFNOSUFFIXFIELD20~CONFIRMAUTOAUTH~MANDATORYYENDTAX~ALLOWWITHHOLDINGTAX~TRACERFREQUENCY~MAXTRACERCOUNT~NETTINCOMINGTRFRPRODCODE~NETTOUTGOINGTRFRCUSTPROD~NETTOUTGOINGTRFRPARTPROD~NETTINTERNALTRFRPRODCODE~REVERSALSUSPENSEGL~FTOFFSETGL~IRRNFORLIQDCONTRACT~FTIHANDOFFREQUIRED~CHINESECHARACTERSINPAYMENT~UI_BRANCH_DESC~UI_CUSTOMER_PROD_DESC~UI_BANK_PROD_DESC~UI_INCOMING_PROD_DESC~UI_INTERNAL_PROD_DESC~UI_REVERSAL_SUSPENSE_GL~UI_OFFSET_GL~LSMSGSUSPENSEGL~REPORTINGCCY~REPORTINGRATETYPE~ROUNDINGPARTICIPANT~TXTREPORTCCY~TXTREPRATETYPE~TXTROUNDPART~TXTLSMSGSUSGL~COLSETTLEMENTCUSTOMER~COLONLINECUSTOMER~LSCOLLATERALMINTRBAL~LSCOLLATERALMAXDRAMT~FORWARDPROCESSARCHIVEDAYS~FORWARDLIMITDAYS~TXTCOLSETCUST~TXTCOLONLCUST~SIGHTINGFUNDSSUSPENSEGL~SIGHTINGFUNDSGL~SIGHTINGFUNDSAPPLICABLE~PNLACCOUNT~TXTSIGSUSGLDESC~TXTSIGFNDGLDESC~TXTPNLACCDESC~STPLIMITCCY~STPLIMITAMT~CCYSEPARATOR~CCYFORMATMASK~LEGALVEHICLE~ONLINEMISGROUP~TRADINGMISGROUP~EODRELATEDCUSTOMER~POSTYENDENTBRNLCY~CCYRESTRICTION~GENSELFPARTICIPANTMSG~CIFID~TXTCIFIDDESC~REGIONALOFFICE~PARENTBRANCH~TXTPARENTBRN~UI_GEN_PAYMENT_NOSTRO~BCKDT_PMNT_CUTOFF~BCKDT_AMND_CUTOFF~POPULATE_MO~PUSH_MO_DAYS~EXTGRPSTATPROC~LOCALGRPSTATPROC~BACK_VALUE_CHK_REQD~BACK_VALUE_DAYS~RETRO_POSTING_DAYS~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BRANCH">AUTHSTAT~TXNSTAT~BRANCHCODE~MODULECODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDBRPRM";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_BRANCH";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BRANCH" : ""}; 

 var dataSrcLocationArray = new Array("BLK_BRANCH"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDBRPRM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDBRPRM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BRANCH__BRANCHCODE";
pkFields[0] = "BLK_BRANCH__BRANCHCODE";
queryFields[1] = "BLK_BRANCH__MODULECODE";
pkFields[1] = "BLK_BRANCH__MODULECODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BRANCH":["ACCRUALLEVEL","ADDRESS1","ADDRESS2","ALLOWWITHHOLDINGTAX","BACK_VALUE_CHK_REQD","BACK_VALUE_DAYS","BCKDT_AMND_CUTOFF","BCKDT_PMNT_CUTOFF","BICCODE","CCYFORMATMASK","CCYRESTRICTION","CCYSEPARATOR","CHINESECHARACTERSINPAYMENT","CIFID","CITY","COLONLINECUSTOMER","COLSETTLEMENTCUSTOMER","COMMONREFFIELD21","CONFIRMAUTOAUTH","CROSSREFBASIS","DQAUTOLIQDREQD","EFFCUSTLOANRATE","EFFDENOMBASIS","EFFDEPRATE","EFFLOANRATE","EODRELATEDCUSTOMER","EXTCUSTOMREFNO","EXTGRPSTATPROC","FEEACCRLEVEL","FORWARDLIMITDAYS","FORWARDPROCESSARCHIVEDAYS","FTIHANDOFFREQUIRED","FTOFFSETGL","GENSELFPARTICIPANTMSG","IRRNFORLIQDCONTRACT","IS83MANDATORY","JOPTIONREQ","LEGALVEHICLE","LOCALGRPSTATPROC","LSCOLLATERALMAXDRAMT","LSCOLLATERALMINTRBAL","LSMSGSUSPENSEGL","MANDATORYYENDTAX","MAXTRACERCOUNT","MMTRACERREQUIRED","NAME","NETTINCOMINGTRFRPRODCODE","NETTINTERNALTRFRPRODCODE","NETTOUTGOINGTRFRCUSTPROD","NETTOUTGOINGTRFRPARTPROD","ONLINEMISGROUP","PARENTBRANCH","PNLACCOUNT","POPULATE_MO","POSTINTODEFACC","POSTYENDENTBRNLCY","PROCESSTILL","PUSH_MO_DAYS","RECLASSIFYPYCYINCOME","REFNOSUFFIXFIELD20","REGIONALOFFICE","REPORTINGCCY","REPORTINGRATETYPE","RESIDUALAMOUNT","RESIDUALTRNCODE","RETRO_POSTING_DAYS","REVERSALSUSPENSEGL","ROUNDINGPARTICIPANT","SIGHTINGFUNDSAPPLICABLE","SIGHTINGFUNDSGL","SIGHTINGFUNDSSUSPENSEGL","STPLIMITAMT","STPLIMITCCY","TAXCOMPUTATIONBASIS","TRACERDAYS","TRACERFREQUENCY","TRACKDELINQUENCY","TRADINGMISGROUP","TXTCIFIDDESC","TXTCOLONLCUST","TXTCOLSETCUST","TXTLSMSGSUSGL","TXTPARENTBRN","TXTPNLACCDESC","TXTREPORTCCY","TXTREPRATETYPE","TXTROUNDPART","TXTSIGFNDGLDESC","TXTSIGSUSGLDESC","UI_BANK_PROD_DESC","UI_BRANCH_DESC","UI_CUSTOMER_PROD_DESC","UI_GEN_PAYMENT_NOSTRO","UI_INCOMING_PROD_DESC","UI_INTERNAL_PROD_DESC","UI_OFFSET_GL","UI_REVERSAL_SUSPENSE_GL"]};
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
var lovInfoFlds = {"BLK_BRANCH__BRANCHCODE__LOV_BRANCH":["BLK_BRANCH__BRANCHCODE~BLK_BRANCH__UI_BRANCH_DESC~~","","N~N~N",""],"BLK_BRANCH__RESIDUALTRNCODE__LOV_TXN_CODE":["BLK_BRANCH__RESIDUALTRNCODE~~","","N~N",""],"BLK_BRANCH__MODULECODE__LOV_MODULE":["BLK_BRANCH__MODULECODE~~","","N~N",""],"BLK_BRANCH__NETTINCOMINGTRFRPRODCODE__LOV_PRODUCT":["BLK_BRANCH__NETTINCOMINGTRFRPRODCODE~BLK_BRANCH__UI_INCOMING_PROD_DESC~","","N~N","N"],"BLK_BRANCH__NETTOUTGOINGTRFRCUSTPROD__LOV_PRODUCT":["BLK_BRANCH__NETTOUTGOINGTRFRCUSTPROD~BLK_BRANCH__UI_CUSTOMER_PROD_DESC~","","N~N","N"],"BLK_BRANCH__NETTOUTGOINGTRFRPARTPROD__LOV_PRODUCT":["BLK_BRANCH__NETTOUTGOINGTRFRPARTPROD~BLK_BRANCH__UI_BANK_PROD_DESC~","","N~N","N"],"BLK_BRANCH__NETTINTERNALTRFRPRODCODE__LOV_PRODUCT":["BLK_BRANCH__NETTINTERNALTRFRPRODCODE~BLK_BRANCH__UI_INTERNAL_PROD_DESC~","","N~N",""],"BLK_BRANCH__REVERSALSUSPENSEGL__LOV_REV_SUS_GL":["BLK_BRANCH__REVERSALSUSPENSEGL~BLK_BRANCH__UI_REVERSAL_SUSPENSE_GL~","","N~N",""],"BLK_BRANCH__LSMSGSUSPENSEGL__LOV_MSG_SUSP_GL":["BLK_BRANCH__LSMSGSUSPENSEGL~BLK_BRANCH__TXTLSMSGSUSGL~","","N~N",""],"BLK_BRANCH__REPORTINGCCY__LOV_REP_CCY":["BLK_BRANCH__REPORTINGCCY~BLK_BRANCH__TXTREPORTCCY~","","N~N",""],"BLK_BRANCH__REPORTINGRATETYPE__LOV_REP_RATE_TYPE":["BLK_BRANCH__REPORTINGRATETYPE~BLK_BRANCH__TXTREPRATETYPE~","","N~N",""],"BLK_BRANCH__ROUNDINGPARTICIPANT__LOV_ROUND_PART":["BLK_BRANCH__ROUNDINGPARTICIPANT~BLK_BRANCH__TXTROUNDPART~","","N~N",""],"BLK_BRANCH__COLSETTLEMENTCUSTOMER__LOV_COL_SETTLEMENT_CUSTOMER":["BLK_BRANCH__COLSETTLEMENTCUSTOMER~BLK_BRANCH__TXTCOLSETCUST~","","N~N",""],"BLK_BRANCH__COLONLINECUSTOMER__LOV_COL_ONLINE_CUSTOMER":["BLK_BRANCH__COLONLINECUSTOMER~BLK_BRANCH__TXTCOLONLCUST~","","N~N",""],"BLK_BRANCH__SIGHTINGFUNDSSUSPENSEGL__LOV_SIGHTING_SUS_GL":["BLK_BRANCH__SIGHTINGFUNDSSUSPENSEGL~BLK_BRANCH__TXTSIGSUSGLDESC~","","N~N",""],"BLK_BRANCH__SIGHTINGFUNDSGL__LOV_SIGHTING_SUS_GL":["BLK_BRANCH__SIGHTINGFUNDSGL~BLK_BRANCH__TXTSIGFNDGLDESC~","","N~N",""],"BLK_BRANCH__PNLACCOUNT__LOV_PNL_ACCOUNT":["BLK_BRANCH__PNLACCOUNT~BLK_BRANCH__TXTPNLACCDESC~","","N~N",""],"BLK_BRANCH__STPLIMITCCY__LOV_STP_CCY":["BLK_BRANCH__STPLIMITCCY~~","","N~N",""],"BLK_BRANCH__LEGALVEHICLE__LOV_LEGAL_VEHICLE":["BLK_BRANCH__LEGALVEHICLE~","","N",""],"BLK_BRANCH__ONLINEMISGROUP__LOV_ONLINE_MIS_GROUP":["BLK_BRANCH__ONLINEMISGROUP~~","","N~N",""],"BLK_BRANCH__TRADINGMISGROUP__LOV_TRADING_MIS_GROUP":["BLK_BRANCH__TRADINGMISGROUP~~","","N~N",""],"BLK_BRANCH__EODRELATEDCUSTOMER__LOV_RELATED_CIF":["BLK_BRANCH__EODRELATEDCUSTOMER~~~","","N~N~N",""],"BLK_BRANCH__CIFID__LOV_CIF_ID":["BLK_BRANCH__CIFID~BLK_BRANCH__TXTCIFIDDESC~","","N~N","N"],"BLK_BRANCH__REGIONALOFFICE__LOV_RO_BRANCH":["BLK_BRANCH__REGIONALOFFICE~~","","N~N","N"],"BLK_BRANCH__PARENTBRANCH__LOV_BRANCH_CODE":["BLK_BRANCH__PARENTBRANCH~~","","N~N","N"]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_LOANS';
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

ArrFuncOrigin["OLDBRPRM"]="KERNEL";
ArrPrntFunc["OLDBRPRM"]="";
ArrPrntOrigin["OLDBRPRM"]="";
ArrRoutingType["OLDBRPRM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDBRPRM"]="N";
ArrCustomModified["OLDBRPRM"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------