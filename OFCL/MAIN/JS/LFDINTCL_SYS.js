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
**  File Name          : LFDINTCL_SYS.js
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
var fieldNameArray = {"BLK_OLTMS_CLASS":"CLASDESC~CLASSCODE~MODULE~CLASSTYP~MODULE_DESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LFTMS_INTEREST_CLASS":"EVENTFORASSOCIATIONDESC~BASISAMTTAGDESC~DEFAULTRATECODEDESC~AUTORATECODEDESC~RULEDESC~FIXEDRATECODEDESC~PREPAYMENTPENALTYCODEDESC~SPECIALPENALTY~LIQUIDITYPREMIUMCOMPONENT~PRIMARYINTERESTINDICATOR~PROPAGATIONREQD~DISCACCRAPPLICABLE~EVENTFORASSOCIATION~BASISAMOUNTTAG~PENALTYSTARTDATEBASIS~LIQUIDITYPREMIUMTYPE~ACCRUALREQUIRED~BASISAMOUNTCATEGORY~AUTORATECODE~SPECIALRATETYPE~RATECALCTYPE~BORROWLENDIND~RESETTENOR~RULE~MARGINAPPLICATION~MARGINBASIS~ORIGINALCOMPONENT~REFINANCEREQD~SETTLEMENTCCY~AMENDAFTERASSOCIATION~PREPAYMENTPENALTYRATECODE~NOINTONPREMATUREWITHDRAWL~REAPPLYINTONOUTSTANDAMT~REAPPLYINTONPREPAIDAMT~FLOATINGRATETYPE~RATETYPE~INTCOMPUTATION~HOLCOMPOUND~FIXEDRATECODE~RATEREVISIONMETHOD~ESCROWCOMPONENT~PIKCOMPONENT~FIXEDRATETYPE~DEFAULTRATECODE~NEGINTRATE~NEGCLASSCODE~RATEFIXINGREQD~MORACLASSCODE~MORAINTRATE~EXPONENTIAL_FLAG~RATE_BASIS~ALLOW_REPORTING_ONLY~REPORTING_COMP_TYPE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_SPREAD_ADJ_COMP_METH~ALLOW_ACCL_FLT_RATE~CREDIT_COMPONENT~RFR_RATE_COMPOUNDING~RFR_RATE_TYPE~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~OBSERVATION_SHIFT","BLK_LFTMS_CLASS_CCY_RATES":"DEFAULTRATESIGN~MAXRATESIGN~MINRATESIGN~CCYROUNDRULE~INTERESTBASIS~INTPERIODBASIS~CCYROUNDUNIT~CCYDECIMALS~MAXIMUMSPREAD~MINIMUMSPREAD~DEFAULTRATE~MAXIMUMRATE~MINIMUMRATE~COMPONENTCCY~RATE_ROUNDING_POSITION~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT"};

var multipleEntryPageSize = {"BLK_LFTMS_CLASS_CCY_RATES" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_RATES__TAB_MAIN":"BLK_LFTMS_CLASS_CCY_RATES"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_CLASS">CLASDESC~CLASSCODE~MODULE~CLASSTYP~MODULE_DESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CLASS" RELATION_TYPE="1" TYPE="BLK_LFTMS_INTEREST_CLASS">EVENTFORASSOCIATIONDESC~BASISAMTTAGDESC~DEFAULTRATECODEDESC~AUTORATECODEDESC~RULEDESC~FIXEDRATECODEDESC~PREPAYMENTPENALTYCODEDESC~SPECIALPENALTY~LIQUIDITYPREMIUMCOMPONENT~PRIMARYINTERESTINDICATOR~PROPAGATIONREQD~DISCACCRAPPLICABLE~EVENTFORASSOCIATION~BASISAMOUNTTAG~PENALTYSTARTDATEBASIS~LIQUIDITYPREMIUMTYPE~ACCRUALREQUIRED~BASISAMOUNTCATEGORY~AUTORATECODE~SPECIALRATETYPE~RATECALCTYPE~BORROWLENDIND~RESETTENOR~RULE~MARGINAPPLICATION~MARGINBASIS~ORIGINALCOMPONENT~REFINANCEREQD~SETTLEMENTCCY~AMENDAFTERASSOCIATION~PREPAYMENTPENALTYRATECODE~NOINTONPREMATUREWITHDRAWL~REAPPLYINTONOUTSTANDAMT~REAPPLYINTONPREPAIDAMT~FLOATINGRATETYPE~RATETYPE~INTCOMPUTATION~HOLCOMPOUND~FIXEDRATECODE~RATEREVISIONMETHOD~ESCROWCOMPONENT~PIKCOMPONENT~FIXEDRATETYPE~DEFAULTRATECODE~NEGINTRATE~NEGCLASSCODE~RATEFIXINGREQD~MORACLASSCODE~MORAINTRATE~EXPONENTIAL_FLAG~RATE_BASIS~ALLOW_REPORTING_ONLY~REPORTING_COMP_TYPE~RFR_BASE_COMP_METH~RFR_COMPONENT~RFR_INTERESTROLLOVER_METHOD~RFR_LASTRECENT_METHOD~RFR_LASTRESET_METHOD~RFR_LOCKOUT_METHOD~RFR_LOCKOUT_METHOD_DAYS~RFR_LOOKBACK_METHOD~RFR_LOOKBACK_METHOD_DAYS~RFR_MARG_COMP_METH~RFR_METHOD~RFR_PAYMENTDELAY_METHOD~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_PLAIN_METHOD~RFR_PRINCIPALADJUSTMENT_METHOD~RFR_SPREAD_ADJ_COMP_METH~ALLOW_ACCL_FLT_RATE~CREDIT_COMPONENT~RFR_RATE_COMPOUNDING~RFR_RATE_TYPE~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~OBSERVATION_SHIFT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CLASS" RELATION_TYPE="N" TYPE="BLK_LFTMS_CLASS_CCY_RATES">DEFAULTRATESIGN~MAXRATESIGN~MINRATESIGN~CCYROUNDRULE~INTERESTBASIS~INTPERIODBASIS~CCYROUNDUNIT~CCYDECIMALS~MAXIMUMSPREAD~MINIMUMSPREAD~DEFAULTRATE~MAXIMUMRATE~MINIMUMRATE~COMPONENTCCY~RATE_ROUNDING_POSITION~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLTMS_CLASS" RELATION_TYPE="1" TYPE="BLK_SUMMARY">AUTHSTAT~TXNSTAT~CLASSCODE~CLASSDESCRIPTION~FLOATINGRATE~RATETYPE~PRIMARYINTEREST~MODULE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LFDINTCL";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTMS_CLASS" : "","BLK_LFTMS_INTEREST_CLASS" : "BLK_OLTMS_CLASS~1","BLK_LFTMS_CLASS_CCY_RATES" : "BLK_OLTMS_CLASS~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTMS_CLASS","BLK_LFTMS_INTEREST_CLASS","BLK_LFTMS_CLASS_CCY_RATES"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFDINTCL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFDINTCL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTMS_CLASS__CLASSCODE";
pkFields[0] = "BLK_OLTMS_CLASS__CLASSCODE";
queryFields[1] = "BLK_OLTMS_CLASS__MODULE";
pkFields[1] = "BLK_OLTMS_CLASS__MODULE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTMS_CLASS_CCY_RATES":["CCYDECIMALS","CCYROUNDRULE","CCYROUNDUNIT","DEFAULTRATE","DEFAULTRATESIGN","INTERESTBASIS","INTPERIODBASIS","MAXIMUMRATE","MAXIMUMSPREAD","MAXRATESIGN","MINIMUMRATE","MINIMUMSPREAD","MINRATESIGN","RATE_ROUNDING_POSITION","RATE_ROUNDING_RULE","RATE_ROUNDING_UNIT"],"BLK_LFTMS_INTEREST_CLASS":["BASISAMOUNTTAG","BORROWLENDIND","DEFAULTRATECODE","DISCACCRAPPLICABLE","ESCROWCOMPONENT","EVENTFORASSOCIATION","EXPONENTIAL_FLAG","FLOATINGRATETYPE","INTCOMPUTATION","LIQUIDITYPREMIUMTYPE","MORAINTRATE","NEGCLASSCODE","NEGINTRATE","OBSERVATION_SHIFT","PREPAYMENTPENALTYRATECODE","RATECALCTYPE","RATE_BASIS","RESETTENOR","RFR_BASE_COMP_METH","RFR_COMPONENT","RFR_INTERESTROLLOVER_METHOD","RFR_LASTRECENT_METHOD","RFR_LASTRESET_METHOD","RFR_LOCKOUT_METHOD","RFR_LOCKOUT_METHOD_DAYS","RFR_LOOKBACK_METHOD","RFR_LOOKBACK_METHOD_DAYS","RFR_MARG_COMP_METH","RFR_METHOD","RFR_PAYMENTDELAY_METHOD","RFR_PAYMENTDELAY_METHOD_DAYS","RFR_PLAIN_METHOD","RFR_PRINCIPALADJUSTMENT_METHOD","RFR_RATE_COMP_ROUND_UNIT","RFR_SPREAD_ADJ_COMP_METH","RULE","SETTLEMENTCCY"],"BLK_OLTMS_CLASS":["CLASDESC"]};
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
var lovInfoFlds = {"BLK_OLTMS_CLASS__MODULE__LOV_MODULE":["BLK_OLTMS_CLASS__MODULE~BLK_OLTMS_CLASS__MODULE_DESC~","","N~N",""],"BLK_LFTMS_INTEREST_CLASS__EVENTFORASSOCIATION__LOV_EVENT_FOR_ASSOCIATION":["BLK_LFTMS_INTEREST_CLASS__EVENTFORASSOCIATION~BLK_LFTMS_INTEREST_CLASS__EVENTFORASSOCIATIONDESC~","BLK_CSTMS_CLASS__MODULE!varchar2","N~N",""],"BLK_LFTMS_INTEREST_CLASS__BASISAMOUNTTAG__LOV_AMOUNT_TAGS":["BLK_LFTMS_INTEREST_CLASS__BASISAMOUNTTAG~BLK_LFTMS_INTEREST_CLASS__BASISAMTTAGDESC~","BLK_OLTMS_CLASS__MODULE!VARCHAR2~BLK_OLTMS_CLASS__MODULE!VARCHAR2","N~N",""],"BLK_LFTMS_INTEREST_CLASS__AUTORATECODE__LOV_AUTO_RATE_CODE":["BLK_LFTMS_INTEREST_CLASS__AUTORATECODE~BLK_LFTMS_INTEREST_CLASS__AUTORATECODEDESC~","","N~N",""],"BLK_LFTMS_INTEREST_CLASS__RULE__LOV_RULE":["BLK_LFTMS_INTEREST_CLASS__RULE~BLK_LFTMS_INTEREST_CLASS__RULEDESC~","","N~N",""],"BLK_LFTMS_INTEREST_CLASS__ORIGINALCOMPONENT__LOV_ORIG_COMP":["BLK_LFTMS_INTEREST_CLASS__ORIGINALCOMPONENT~","BLK_CSTMS_CLASS__MODULE!VARCHAR2","N",""],"BLK_LFTMS_INTEREST_CLASS__SETTLEMENTCCY__LOV_SETT_CCY":["BLK_LFTMS_INTEREST_CLASS__SETTLEMENTCCY~~","","N~N",""],"BLK_LFTMS_INTEREST_CLASS__PREPAYMENTPENALTYRATECODE__LOV_PREPAYMENT_PENALTY":["BLK_LFTMS_INTEREST_CLASS__PREPAYMENTPENALTYRATECODE~BLK_LFTMS_INTEREST_CLASS__PREPAYMENTPENALTYCODEDESC~","","N~N",""],"BLK_LFTMS_INTEREST_CLASS__FIXEDRATECODE__LOV_FIXED_RATECODE":["BLK_LFTMS_INTEREST_CLASS__FIXEDRATECODE~BLK_LFTMS_INTEREST_CLASS__FIXEDRATECODEDESC~","BLK_CFTMS_INTEREST_CLASS__RATETYPE!VARCHAR2~BLK_CFTMS_INTEREST_CLASS__FIXEDRATETYPE!VARCHAR2~BLK_CFTMS_INTEREST_CLASS__RATETYPE!VARCHAR2~BLK_CFTMS_INTEREST_CLASS__FIXEDRATETYPE!VARCHAR2","N~N",""],"BLK_LFTMS_INTEREST_CLASS__DEFAULTRATECODE__LOV_RATE_CODE":["BLK_LFTMS_INTEREST_CLASS__DEFAULTRATECODE~BLK_LFTMS_INTEREST_CLASS__DEFAULTRATECODEDESC~","BLK_LFTMS_INTEREST_CLASS__RFR_RATE_TYPE!VARCHAR2","N~N",""],"BLK_LFTMS_CLASS_CCY_RATES__COMPONENTCCY__LOV_RATES_CCY":["BLK_LFTMS_CLASS_CCY_RATES__COMPONENTCCY~~","BLK_CSTMS_CLASS__MODULE!VARCHAR2~BLK_CSTMS_CLASS__CLASSCODE!VARCHAR2~BLK_CSTMS_CLASS__MODULE!VARCHAR2~BLK_CSTMS_CLASS__CLASSCODE!VARCHAR2","N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_INTEREST';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_LFTMS_CLASS_CCY_RATES");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_OLTMS_CLASS"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("N"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LFDINTCL"]="KERNEL";
ArrPrntFunc["LFDINTCL"]="";
ArrPrntOrigin["LFDINTCL"]="";
ArrRoutingType["LFDINTCL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFDINTCL"]="N";
ArrCustomModified["LFDINTCL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CSCFNUDF":""};
var scrArgSource = {"CSCFNUDF":""};
var scrArgVals = {"CSCFNUDF":""};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"CSCFNUDF":""};
var dpndntOnSrvs = {"CSCFNUDF":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------