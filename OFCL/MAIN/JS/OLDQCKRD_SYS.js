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
**  File Name          : OLDQCKRD_SYS.js
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
var fieldNameArray = {"BLK_LOAN_QUICK_SUMMARY":"CONREFNO~BRN~FACIMEMONO~USEDEFSTATS~ADDLINE4~ADDLINE3~ADDLINE2~ADDLINE1~SICCODE~COLLSTACODE~REGCODE~CRCLASS~SECURED~COLLCODE~RECOURSE~GAUR~EXPCODE~COMMITMENTREEFNO~FACILITYNAME~RATETYPE~MATURITYDATE~CURR~OUTSTANDINGBAL~SSN~BORROWERNAME~COUNTERPARTY~ZIPCODE~TXTPARTSYSREFNO~TXTSHORTNAME~TXTPARTSYSBORRID~TXTVALUEDATE~TXTORIGINALAMT~TXTRATECODEUSAGE~TXTPLEDGEABLIND~TXTPARTSYSCOMP~TXTLCYBALANCE~TXTRISKRATING~TXTRECOURSE~TXTLCDRAWDOWN~TXTFIXEDSPREAD~TXTFACILITYNAME","BLK_LOAN_QUICK_SUM_DET":"REG_NO~FACILITY~STATUS~CURRENCYD~PRINCIPALBAL~USDBAL~LOCALBAL~CONTRACTREFNO","BLK_INTEREST_DET":"CURRINTRATE~PREINTRATE~HIGHRATE~LOWRATE~CURRINTBASIS~PERDIEM~BENCHMARKRATECODE~BENCHMARKRATE~INTRAT~MATDATE~REVISIONDATE~AUTORESET~RATECHANGEADVICE~INTPAIDCURRMONTH~PRINPAIDCURRMONTH~INTPAIDPREVMONTH~PRINPAIDPREVMONTH~CURRENTYTD~PASTINTPAID~LASTYTD~PREINTBASIS~CURRINTDUE~BENCHMARK~CONTRREFNO~TXTAPPLICATDATE","BLK_OLTBS_AMOUNT_DUE_PAYMENT":"TXTCONTREFNO~TXTBORROWNO~TXTBORNAME~TXTPRININTAUTOPAY~TXTPRINBULAUTOPAY~TXTINTINTAUTPAY~TXTINTBULLAUTPAY~TXTPRINCNTDDANO~TXTPRINCBULLDDANO~TXTINTERESTINTEDDANO~TXTINTERESTBULLDDANO~CONTRACT_REF_NO~TXTAPPLICATDATE","BLK_OLTBS_AMOUNT_DUE_PAYMENT_DET":"TXTINTFRE~TXTINTPREBILLINGDAYS~TXTCURRENTINTDUEAMOUNT~TXTCURRENTINTDUEDATE~TXTNEXTINTDUEAMOUNT~TXTNEXTINTDUEDATE~TXTLASTINTPAIDAMOUNT~TXTLASTINTPAIDDATE~TXTPASTINTDUE~TXTINTDUEDAYS~TXTPRINCIPALFREQUENCY~TXTPRNPREBILLINGDAYS~TXTCURPRIDUEAMT~TXTCURRPRINDUEDATE~TXTNEXTPRINDUEAMT~TXTNEXTPRIDUEDATE~TXTPASTPRIDUE~TXTLASTPRIPAIDAMT~TXTLASTPRPAIDDATE~TXTPRIDUEDAYS~CONTRACT_REF_NO","BLK_LFTBS_CONTRACT_FEE":"TXTCONREFNUM~TXTAPPDAT~TXTBRROWE~TXTBRROWNAME~CONTRACRENO","BLK_LFTBS_CONTRACT_FEE_DET":"TXTFEETYPE~TXTTOTALFEE~TXTLCYTOTALFEE~TXTCURR~TXTTILLDATEACC~TXTPAYABLE~TXTDDANO~TXTCURRENTDEUDATE~CONTRREFNO","BLK_TRANSACTION":"TXTCONFERREFNO~TXTAPPLIDA~TXTBR~TXTBRNA~CONTRACTREFERENCENO","BLK_TRANSACTION_DET":"TXTEFFDATE~TXTTRANDATE~TXT_EVENTSEQNO~TXTTRANDETAILS~TXTPRICHANGE~TXTRATECHG~TXTINTCHANGE~TXTINTWAIVED~TXTPRINBAL~TXTINTERESTDUE~CONTRACREFERENCENO~TXTEVENTCODE","BLK_PLAOFFMAIN":"TXTCONREFRNO~TXTAPD~TXTBORRO~TXTBORRONAME~TXTDUEDATE~TXTTOTALDUE~TXTTOTALINTDUE~TXTTOTALPREDUE~TXTAUTOPAYTOTALDUE~CONTRACTREFN","BLK_PAYOFF_PAYMENT_DETAIL":"TXTCOMP~TXTAMOUNTDUE~TXTRATE~TXTRATEDESC~COREFNO","BLK_PAYOFF_PAYMENT_DETAIL2":"CORENO~TXTAUTOPAYAMTDUE~TXTAUTOPAYCOMPONENT"};

var multipleEntryPageSize = {"BLK_LOAN_QUICK_SUM_DET" :"15" ,"BLK_LFTBS_CONTRACT_FEE_DET" :"15" ,"BLK_TRANSACTION_DET" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LOAN_QUICK_SUM_DET","CVS_FEE__TAB_MAIN":"BLK_LFTBS_CONTRACT_FEE_DET","CVS_TRANSACTION__TAB_MAIN":"BLK_TRANSACTION_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LOAN_QUICK_SUMMARY">CONREFNO~BRN~FACIMEMONO~USEDEFSTATS~ADDLINE4~ADDLINE3~ADDLINE2~ADDLINE1~SICCODE~COLLSTACODE~REGCODE~CRCLASS~SECURED~COLLCODE~RECOURSE~GAUR~EXPCODE~COMMITMENTREEFNO~FACILITYNAME~RATETYPE~MATURITYDATE~CURR~OUTSTANDINGBAL~SSN~BORROWERNAME~COUNTERPARTY~ZIPCODE~TXTPARTSYSREFNO~TXTSHORTNAME~TXTPARTSYSBORRID~TXTVALUEDATE~TXTORIGINALAMT~TXTRATECODEUSAGE~TXTPLEDGEABLIND~TXTPARTSYSCOMP~TXTLCYBALANCE~TXTRISKRATING~TXTRECOURSE~TXTLCDRAWDOWN~TXTFIXEDSPREAD~TXTFACILITYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="N" TYPE="BLK_LOAN_QUICK_SUM_DET">REG_NO~FACILITY~STATUS~CURRENCYD~PRINCIPALBAL~USDBAL~LOCALBAL~CONTRACTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="1" TYPE="BLK_INTEREST_DET">CURRINTRATE~PREINTRATE~HIGHRATE~LOWRATE~CURRINTBASIS~PERDIEM~BENCHMARKRATECODE~BENCHMARKRATE~INTRAT~MATDATE~REVISIONDATE~AUTORESET~RATECHANGEADVICE~INTPAIDCURRMONTH~PRINPAIDCURRMONTH~INTPAIDPREVMONTH~PRINPAIDPREVMONTH~CURRENTYTD~PASTINTPAID~LASTYTD~PREINTBASIS~CURRINTDUE~BENCHMARK~CONTRREFNO~TXTAPPLICATDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="1" TYPE="BLK_OLTBS_AMOUNT_DUE_PAYMENT">TXTCONTREFNO~TXTBORROWNO~TXTBORNAME~TXTPRININTAUTOPAY~TXTPRINBULAUTOPAY~TXTINTINTAUTPAY~TXTINTBULLAUTPAY~TXTPRINCNTDDANO~TXTPRINCBULLDDANO~TXTINTERESTINTEDDANO~TXTINTERESTBULLDDANO~CONTRACT_REF_NO~TXTAPPLICATDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="1" TYPE="BLK_OLTBS_AMOUNT_DUE_PAYMENT_DET">TXTINTFRE~TXTINTPREBILLINGDAYS~TXTCURRENTINTDUEAMOUNT~TXTCURRENTINTDUEDATE~TXTNEXTINTDUEAMOUNT~TXTNEXTINTDUEDATE~TXTLASTINTPAIDAMOUNT~TXTLASTINTPAIDDATE~TXTPASTINTDUE~TXTINTDUEDAYS~TXTPRINCIPALFREQUENCY~TXTPRNPREBILLINGDAYS~TXTCURPRIDUEAMT~TXTCURRPRINDUEDATE~TXTNEXTPRINDUEAMT~TXTNEXTPRIDUEDATE~TXTPASTPRIDUE~TXTLASTPRIPAIDAMT~TXTLASTPRPAIDDATE~TXTPRIDUEDAYS~CONTRACT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="1" TYPE="BLK_LFTBS_CONTRACT_FEE">TXTCONREFNUM~TXTAPPDAT~TXTBRROWE~TXTBRROWNAME~CONTRACRENO</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="N" TYPE="BLK_LFTBS_CONTRACT_FEE_DET">TXTFEETYPE~TXTTOTALFEE~TXTLCYTOTALFEE~TXTCURR~TXTTILLDATEACC~TXTPAYABLE~TXTDDANO~TXTCURRENTDEUDATE~CONTRREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="1" TYPE="BLK_TRANSACTION">TXTCONFERREFNO~TXTAPPLIDA~TXTBR~TXTBRNA~CONTRACTREFERENCENO</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="N" TYPE="BLK_TRANSACTION_DET">TXTEFFDATE~TXTTRANDATE~TXT_EVENTSEQNO~TXTTRANDETAILS~TXTPRICHANGE~TXTRATECHG~TXTINTCHANGE~TXTINTWAIVED~TXTPRINBAL~TXTINTERESTDUE~CONTRACREFERENCENO~TXTEVENTCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="1" TYPE="BLK_PLAOFFMAIN">TXTCONREFRNO~TXTAPD~TXTBORRO~TXTBORRONAME~TXTDUEDATE~TXTTOTALDUE~TXTTOTALINTDUE~TXTTOTALPREDUE~TXTAUTOPAYTOTALDUE~CONTRACTREFN</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="N" TYPE="BLK_PAYOFF_PAYMENT_DETAIL">TXTCOMP~TXTAMOUNTDUE~TXTRATE~TXTRATEDESC~COREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="N" TYPE="BLK_PAYOFF_PAYMENT_DETAIL2">CORENO~TXTAUTOPAYAMTDUE~TXTAUTOPAYCOMPONENT</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_LOAN_QUICK_SUMMARY" RELATION_TYPE="1" TYPE="BLK_OLVWS_CONTRACT_SUMMARY">AUTHSTA~CONTSTATUS~USERDEFINEDSTATUS~BRANCH~CONREFNO~EXTERNALREFNO~FACILITYNAME~COUNTERPARTY~SHORTNAME~PRINCIPALUTSTANDINGBAL~CONTAMOUNT~CURRENCY~MATURITYDATE~VALUEDATE~PAYMENTMETHOD~RATECODE~RATE~RATESIGN~SPREAD~EGNUMBER~WORKFLOWSTATUS~RATEREVISIONSTATUS~CUSTOMREFNO~GFCID~AGENTCIF~USERREFNO~RELREFERENCE~CREDITLINE~PARTSYSBORRID~PARTSYSCOMP~PARTSYSREFNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDQCKRD";
var defaultWhereClause = "module_code='OL' and branch=global.current_branch";
var defaultOrderByClause ="";
var multiBrnWhereClause ="module_code = 'OL'";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLVWS_CONTRACT_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LOAN_QUICK_SUMMARY" : "","BLK_LOAN_QUICK_SUM_DET" : "BLK_LOAN_QUICK_SUMMARY~N","BLK_INTEREST_DET" : "BLK_LOAN_QUICK_SUMMARY~1","BLK_OLTBS_AMOUNT_DUE_PAYMENT" : "BLK_LOAN_QUICK_SUMMARY~1","BLK_OLTBS_AMOUNT_DUE_PAYMENT_DET" : "BLK_LOAN_QUICK_SUMMARY~1","BLK_LFTBS_CONTRACT_FEE" : "BLK_LOAN_QUICK_SUMMARY~1","BLK_LFTBS_CONTRACT_FEE_DET" : "BLK_LOAN_QUICK_SUMMARY~N","BLK_TRANSACTION" : "BLK_LOAN_QUICK_SUMMARY~1","BLK_TRANSACTION_DET" : "BLK_LOAN_QUICK_SUMMARY~N","BLK_PLAOFFMAIN" : "BLK_LOAN_QUICK_SUMMARY~1","BLK_PAYOFF_PAYMENT_DETAIL" : "BLK_LOAN_QUICK_SUMMARY~N","BLK_PAYOFF_PAYMENT_DETAIL2" : "BLK_LOAN_QUICK_SUMMARY~N"}; 

 var dataSrcLocationArray = new Array("BLK_LOAN_QUICK_SUMMARY","BLK_LOAN_QUICK_SUM_DET","BLK_INTEREST_DET","BLK_OLTBS_AMOUNT_DUE_PAYMENT","BLK_OLTBS_AMOUNT_DUE_PAYMENT_DET","BLK_LFTBS_CONTRACT_FEE","BLK_LFTBS_CONTRACT_FEE_DET","BLK_TRANSACTION","BLK_TRANSACTION_DET","BLK_PLAOFFMAIN","BLK_PAYOFF_PAYMENT_DETAIL","BLK_PAYOFF_PAYMENT_DETAIL2"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDQCKRD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDQCKRD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LOAN_QUICK_SUMMARY__CONREFNO";
pkFields[0] = "BLK_LOAN_QUICK_SUMMARY__CONREFNO";
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
var lovInfoFlds = {"BLK_LOAN_QUICK_SUMMARY__CONREFNO__LOV_CONTRACT_REF_NO":["BLK_LOAN_QUICK_SUMMARY__CONREFNO~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_LOAN_QUICK_SUM_DET","BLK_LFTBS_CONTRACT_FEE_DET","BLK_TRANSACTION_DET");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCSCHDT~BLK_LOAN_QUICK_SUMMARY"); 

 var CallFormRelat=new Array("OLVWS_LOAN_QUICK_SUMMARY.CONTRACT_REF_NO = OLVWS_SCHEDULE_SUMMARY__A.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDQCKRD"]="KERNEL";
ArrPrntFunc["OLDQCKRD"]="";
ArrPrntOrigin["OLDQCKRD"]="";
ArrRoutingType["OLDQCKRD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDQCKRD"]="N";
ArrCustomModified["OLDQCKRD"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_INT":"CONREFNO~COUNTERPARTY~BORROWERNAME","CVS_PAYMENT":"CONREFNO~COUNTERPARTY~BORROWERNAME","CVS_FEE":"CONREFNO~COUNTERPARTY~BORROWERNAME","CVS_TRANSACTION":"CONREFNO~COUNTERPARTY~BORROWERNAME","OLCSCHDT":"CONTRACTREFNO"};
var scrArgSource = {"CVS_INT":"BLK_LOAN_QUICK_SUMMARY__CONREFNO~BLK_LOAN_QUICK_SUMMARY__COUNTERPARTY~BLK_LOAN_QUICK_SUMMARY__BORROWERNAME","CVS_PAYMENT":"BLK_LOAN_QUICK_SUMMARY__CONREFNO~BLK_LOAN_QUICK_SUMMARY__COUNTERPARTY~BLK_LOAN_QUICK_SUMMARY__BORROWERNAME","CVS_FEE":"BLK_LOAN_QUICK_SUMMARY__CONREFNO~BLK_LOAN_QUICK_SUMMARY__COUNTERPARTY~BLK_LOAN_QUICK_SUMMARY__BORROWERNAME","CVS_TRANSACTION":"BLK_LOAN_QUICK_SUMMARY__CONREFNO~BLK_LOAN_QUICK_SUMMARY__COUNTERPARTY~BLK_LOAN_QUICK_SUMMARY__BORROWERNAME","OLCSCHDT":"BLK_LOAN_QUICK_SUMMARY__CONREFNO"};
var scrArgVals = {"CVS_INT":"CONTRREFNO~TXTBRR~TXTBRNAME","CVS_PAYMENT":"TXTCONTREFNO~TXTBORROWNO~TXTBORNAME","CVS_FEE":"TXTCONREFNUM~TXTBRROWE~TXTBRROWNAME","CVS_TRANSACTION":"TXTCONFERREFNO~TXTBR~TXTBRNA","OLCSCHDT":"CONTRACTREFNO"};
var scrArgDest = {"CVS_INT":"BLK_INTEREST_DET__CONTRREFNO~BLK_INTEREST_DET__TXTBRR~BLK_INTEREST_DET__TXTBRNAME","CVS_PAYMENT":"BLK_OLTBS_AMOUNT_DUE_PAYMENT__TXTCONTREFNO~BLK_OLTBS_AMOUNT_DUE_PAYMENT__TXTBORROWNO~BLK_OLTBS_AMOUNT_DUE_PAYMENT__TXTBORNAME","CVS_FEE":"BLK_LFTBS_CONTRACT_FEE__TXTCONREFNUM~BLK_LFTBS_CONTRACT_FEE__TXTBRROWE~BLK_LFTBS_CONTRACT_FEE__TXTBRROWNAME","CVS_TRANSACTION":"BLK_TRANSACTION__TXTCONFERREFNO~BLK_TRANSACTION__TXTBR~BLK_TRANSACTION__TXTBRNA"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCSCHDT":""};
var dpndntOnSrvs = {"OLCSCHDT":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------