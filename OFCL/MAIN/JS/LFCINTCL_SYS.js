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
**  File Name          : LFCINTCL_SYS.js
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
var fieldNameArray = {"BLK_PRODUCT_MAIN":"PRDDESC~PRDCD~MODULE","BLK_PRODUCT_ICCF":"AMORTIZATIONCONSTCOMPONENT~SPECIALRATETYPE~PRODUCT~COMPONENT~COMPONENTDESCRIPTION~EVENT~BASISAMOUNTTYPE~RATETYPE~SPECIALPENALTY~CHGDURINGAMEND~RATECODEUSAGE~RULE~BORROWLENDIND~RATECALCTYPE~REFINANCEREQD~STOPAPPLICATION~COMPONENTNO~MARGINAPPLICATION~MARGINBASIS~COMPONENTSRNO~PROPAGATIONREQD~SHOWNINCONTRACTMAINSCR~ONCEAUTH~BASISAMTCATEGORY~PENALTYSTARTDATEBASIS~ACCRUALREQD~RESETTENOR~RATEREVNMETHOD~INTCOMPUTATION~HOLCOMPOUND~DEFAULTWAIVER~LIQUIDITYPREMCOMP~LIQUIDITYPREMTYPE~AUTORATECODE~FIXEDRATETYPE~REAPPLYINTONPREPAIDAMT~REAPPLYINTONOUTSTAMT~NOINTONPREMATUREWITHDRWL~FIXEDRATECODE~RATECODE~PREPAYMENTPENALTYRATECODE~DISCACCRAPP~BILLINGNOTICEREQD~BILLINGNOTICEDAYS~RETAINMAINCOMPPROP~CONSIDERFORLIQ~BASISAMT~PRODDESC~EVENTFORASSOCDESC~BASISAMTTAGDESC~DISBASISAMTCATDESC~RULEDESC~AUTORATECODEDESC~RATECODEDESC~PREPAYMENTPENALTYRATECDDESC~FIXEDRATECODEDESC~CLASSDESC~NEGINTRATEALL~ORIGCOMP~NEGATIVECLASSCODE~RATEFIXINGREQD~MORACLASSCODE~MORAINTRATE~EXPONENTIAL_FLAG~RATE_BASIS~CURRENT_COMP~ACCL_FLT_RATE_PCT~ALLOW_REPORTING_ONLY~REPORTING_COMP_TYPE~RFR_BASE_COMP_METH~RFR_COMPONENT~INTEREST_ROLLOVER~LAST_RECENT~LAST_RESET~LOCKOUT~LOCKOUT_DAYS~LOOKBACK~LOOKBACK_DAYS~RFR_MARG_COMP_METH~PAYMENT_DELAY~PAYMENT_DELAY_DAYS~PLAIN~PRINCIPAL_ADJUSTMENT~RFR_SPREAD_ADJ_COMP_METH~ALLOW_ACCL_FLT_RATE~CREDIT_COMPONENT~RFR_RATE_COMPOUNDING~RFR_RATE_TYPE~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~OBSERVATION_SHIFT~PEN_CMPDNG_REQD~ECA_CHK_REQD"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "BLK_PRODUCT_ICCF";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRODUCT_MAIN">PRDDESC~PRDCD~MODULE</FN>'; 
msgxml += '      <FN PARENT="BLK_PRODUCT_MAIN" RELATION_TYPE="N" TYPE="BLK_PRODUCT_ICCF">AMORTIZATIONCONSTCOMPONENT~SPECIALRATETYPE~PRODUCT~COMPONENT~COMPONENTDESCRIPTION~EVENT~BASISAMOUNTTYPE~RATETYPE~SPECIALPENALTY~CHGDURINGAMEND~RATECODEUSAGE~RULE~BORROWLENDIND~RATECALCTYPE~REFINANCEREQD~STOPAPPLICATION~COMPONENTNO~MARGINAPPLICATION~MARGINBASIS~COMPONENTSRNO~PROPAGATIONREQD~SHOWNINCONTRACTMAINSCR~ONCEAUTH~BASISAMTCATEGORY~PENALTYSTARTDATEBASIS~ACCRUALREQD~RESETTENOR~RATEREVNMETHOD~INTCOMPUTATION~HOLCOMPOUND~DEFAULTWAIVER~LIQUIDITYPREMCOMP~LIQUIDITYPREMTYPE~AUTORATECODE~FIXEDRATETYPE~REAPPLYINTONPREPAIDAMT~REAPPLYINTONOUTSTAMT~NOINTONPREMATUREWITHDRWL~FIXEDRATECODE~RATECODE~PREPAYMENTPENALTYRATECODE~DISCACCRAPP~BILLINGNOTICEREQD~BILLINGNOTICEDAYS~RETAINMAINCOMPPROP~CONSIDERFORLIQ~BASISAMT~PRODDESC~EVENTFORASSOCDESC~BASISAMTTAGDESC~DISBASISAMTCATDESC~RULEDESC~AUTORATECODEDESC~RATECODEDESC~PREPAYMENTPENALTYRATECDDESC~FIXEDRATECODEDESC~CLASSDESC~NEGINTRATEALL~ORIGCOMP~NEGATIVECLASSCODE~RATEFIXINGREQD~MORACLASSCODE~MORAINTRATE~EXPONENTIAL_FLAG~RATE_BASIS~CURRENT_COMP~ACCL_FLT_RATE_PCT~ALLOW_REPORTING_ONLY~REPORTING_COMP_TYPE~RFR_BASE_COMP_METH~RFR_COMPONENT~INTEREST_ROLLOVER~LAST_RECENT~LAST_RESET~LOCKOUT~LOCKOUT_DAYS~LOOKBACK~LOOKBACK_DAYS~RFR_MARG_COMP_METH~PAYMENT_DELAY~PAYMENT_DELAY_DAYS~PLAIN~PRINCIPAL_ADJUSTMENT~RFR_SPREAD_ADJ_COMP_METH~ALLOW_ACCL_FLT_RATE~CREDIT_COMPONENT~RFR_RATE_COMPOUNDING~RFR_RATE_TYPE~RFR_RATE_COMPOUNDING_METHOD~RFR_RATE_COMP_ROUND_UNIT~OBSERVATION_SHIFT~PEN_CMPDNG_REQD~ECA_CHK_REQD</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_INTEREST";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PRODUCT_MAIN" : "","BLK_PRODUCT_ICCF" : "BLK_PRODUCT_MAIN~N"}; 

 var dataSrcLocationArray = new Array("BLK_PRODUCT_MAIN","BLK_PRODUCT_ICCF"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFCINTCL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFCINTCL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PRODUCT_MAIN__PRDCD";
pkFields[0] = "BLK_PRODUCT_MAIN__PRDCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_PRODUCT_ICCF":["ACCRUALREQD","AMORTIZATIONCONSTCOMPONENT","AUTORATECODE","BASISAMOUNTTYPE","BASISAMT","BASISAMTCATEGORY","BILLINGNOTICEDAYS","BILLINGNOTICEREQD","BORROWLENDIND","CHGDURINGAMEND","COMPONENTNO","COMPONENTSRNO","CONSIDERFORLIQ","DEFAULTWAIVER","DISCACCRAPP","ECA_CHK_REQD","EVENT","FIXEDRATECODE","FIXEDRATETYPE","HOLCOMPOUND","INTCOMPUTATION","INTEREST_ROLLOVER","LAST_RECENT","LAST_RESET","LIQUIDITYPREMCOMP","LIQUIDITYPREMTYPE","LOCKOUT","LOCKOUT_DAYS","LOOKBACK","LOOKBACK_DAYS","MARGINAPPLICATION","MARGINBASIS","MORACLASSCODE","MORAINTRATE","NOINTONPREMATUREWITHDRWL","OBSERVATION_SHIFT","PAYMENT_DELAY","PAYMENT_DELAY_DAYS","PENALTYSTARTDATEBASIS","PLAIN","PREPAYMENTPENALTYRATECODE","PRINCIPAL_ADJUSTMENT","PROPAGATIONREQD","RATECALCTYPE","RATECODE","RATECODEUSAGE","RATEFIXINGREQD","RATEREVNMETHOD","RATETYPE","RATE_BASIS","REAPPLYINTONOUTSTAMT","REAPPLYINTONPREPAIDAMT","REFINANCEREQD","RESETTENOR","RETAINMAINCOMPPROP","RFR_BASE_COMP_METH","RFR_COMPONENT","RFR_MARG_COMP_METH","RFR_RATE_COMPOUNDING","RFR_RATE_COMPOUNDING_METHOD","RFR_RATE_COMP_ROUND_UNIT","RFR_RATE_TYPE","RFR_SPREAD_ADJ_COMP_METH","RULE","SHOWNINCONTRACTMAINSCR","SPECIALPENALTY","SPECIALRATETYPE","STOPAPPLICATION"]};
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
var lovInfoFlds = {"BLK_PRODUCT_ICCF__COMPONENT__LOV_CLASS_CODE":["BLK_PRODUCT_ICCF__COMPONENT~BLK_PRODUCT_ICCF__COMPONENTDESCRIPTION~","BLK_PRODUCT_MAIN__MODULE!varchar2","N~N",""],"BLK_PRODUCT_ICCF__RULE__LOV_RULE":["BLK_PRODUCT_ICCF__RULE~BLK_PRODUCT_ICCF__RULEDESC~","","N~N",""],"BLK_PRODUCT_ICCF__AUTORATECODE__LOV_AUTO_RATE_CODE":["BLK_PRODUCT_ICCF__RATECODE~BLK_PRODUCT_ICCF__AUTORATECODEDESC~","","N~N",""],"BLK_PRODUCT_ICCF__FIXEDRATECODE__LOV_FIXED_RATECODE":["BLK_PRODUCT_ICCF__FIXEDRATECODE~BLK_PRODUCT_ICCF__FIXEDRATECODEDESC~","BLK_PRODUCT_ICCF__FIXEDRATETYPE!varchar2~BLK_PRODUCT_ICCF__FIXEDRATETYPE!varchar2~BLK_PRODUCT_MAIN__PRDCD!varchar2~BLK_PRODUCT_ICCF__FIXEDRATETYPE!varchar2~BLK_PRODUCT_MAIN__PRDCD!varchar2~BLK_PRODUCT_ICCF__FIXEDRATETYPE!varchar2","N~N",""],"BLK_PRODUCT_ICCF__RATECODE__LOV_RATE_CODE":["BLK_PRODUCT_ICCF__RATECODE~BLK_PRODUCT_ICCF__RATECODEDESC~","BLK_PRODUCT_ICCF__RFR_RATE_TYPE!VARCHAR2","N~N",""],"BLK_PRODUCT_ICCF__PREPAYMENTPENALTYRATECODE__LOV_PREPAYMENT_PENALTY_CODE":["BLK_PRODUCT_ICCF__PREPAYMENTPENALTYRATECODE~BLK_PRODUCT_ICCF__PREPAYMENTPENALTYRATECDDESC~","","N~N",""],"BLK_PRODUCT_ICCF__SETTLEMENTCCYDESC__LOV_SETTLEMENT_CCY":["BLK_PRODUCT_ICCF__SETTLEMENTCCYDESC~~","","N~N","N"],"BLK_PRODUCT_ICCF__ORIGCOMPDESC__LOV_ORIG_COMP":["~","__!","N","N"],"BLK_PRODUCT_ICCF__CLASSCODE__LOV_CLASS_CODE":["BLK_PRODUCT_ICCF__CLASSCODE~BLK_PRODUCT_ICCF__CLASSDESC~","BLK_PRODUCT_MAIN__MODULE!VARCHAR2~BLK_PRODUCT_ICCF__PRODUCT!VARCHAR2~BLK_PRODUCT_ICCF__COMPONENT!VARCHAR2","N~N","N"],"BLK_PRODUCT_ICCF__ORIGCOMP__LOV_ORIG_COMP":["BLK_PRODUCT_ICCF__ORIGCOMP~","BLK_PRODUCT_MAIN__MODULE!VARCHAR2","N",""]};
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

ArrFuncOrigin["LFCINTCL"]="KERNEL";
ArrPrntFunc["LFCINTCL"]="";
ArrPrntOrigin["LFCINTCL"]="";
ArrRoutingType["LFCINTCL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFCINTCL"]="N";
ArrCustomModified["LFCINTCL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_INTEREST":"PRDCD~PRDDESC~MODULE"};
var scrArgSource = {};
var scrArgVals = {"CVS_INTEREST":"~~"};
var scrArgDest = {"CVS_INTEREST":"BLK_PRODUCT_MAIN__PRDCD~BLK_PRODUCT_MAIN__PRDDESC~BLK_PRODUCT_MAIN__MODULE"};
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