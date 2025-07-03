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
**  File Name          : OLDINTLM_SYS.js
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
var fieldNameArray = {"BLK_LFTMS_PROD_COMP_MASTER":"MODULE_CODE~TXT_MODULE_DESCRIPTION~BRANCH_CODE~COMPONENT~PRODUCT~TXTBRNNAME~TXTPRODDESC~TXTCOMDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LFTMS_PRODUCT_CURRENCY_LIMITS":"CURRENCY~CCYFORMAT~DEFAULTRATESIGN~DEFAULTRATE~DEFAULTAMOUNT~MINIMUMRATESIGN~MINIMUMRATE~MAXIMUMRATESIGN~MAXIMUMRATE~MINIMUMSPREAD~MAXIMUMSPREAD~TENOR~INTERESTBASIS~INTPERIODBASIS~CCYROUNDRULE~CCYDECIMALS~CCYROUNDUNIT~RATEFIXINGDAYS~FLOATINGRATECODE~RATE_ROUNDING_POSITION~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT~RFR_LOOKBACK_METHOD_DAYS~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_LOCKOUT_METHOD_DAYS~RFR_RATE_TYPE~RFR_RATE_COMP_ROUND_UNIT~DEFAULTSPREAD"};

var multipleEntryPageSize = {"BLK_LFTMS_PRODUCT_CURRENCY_LIMITS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LFTMS_PRODUCT_CURRENCY_LIMITS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTMS_PROD_COMP_MASTER">MODULE_CODE~TXT_MODULE_DESCRIPTION~BRANCH_CODE~COMPONENT~PRODUCT~TXTBRNNAME~TXTPRODDESC~TXTCOMDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_PROD_COMP_MASTER" RELATION_TYPE="N" TYPE="BLK_LFTMS_PRODUCT_CURRENCY_LIMITS">CURRENCY~CCYFORMAT~DEFAULTRATESIGN~DEFAULTRATE~DEFAULTAMOUNT~MINIMUMRATESIGN~MINIMUMRATE~MAXIMUMRATESIGN~MAXIMUMRATE~MINIMUMSPREAD~MAXIMUMSPREAD~TENOR~INTERESTBASIS~INTPERIODBASIS~CCYROUNDRULE~CCYDECIMALS~CCYROUNDUNIT~RATEFIXINGDAYS~FLOATINGRATECODE~RATE_ROUNDING_POSITION~RATE_ROUNDING_RULE~RATE_ROUNDING_UNIT~RFR_LOOKBACK_METHOD_DAYS~RFR_PAYMENTDELAY_METHOD_DAYS~RFR_LOCKOUT_METHOD_DAYS~RFR_RATE_TYPE~RFR_RATE_COMP_ROUND_UNIT~DEFAULTSPREAD</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTMS_PROD_COMP_MASTER">AUTHSTAT~TXNSTAT~BRANCH_CODE~COMPONENT~PRODUCT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDINTLM";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LFTMS_PROD_COMP_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LFTMS_PROD_COMP_MASTER" : "","BLK_LFTMS_PRODUCT_CURRENCY_LIMITS" : "BLK_LFTMS_PROD_COMP_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_LFTMS_PROD_COMP_MASTER","BLK_LFTMS_PRODUCT_CURRENCY_LIMITS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDINTLM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDINTLM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LFTMS_PROD_COMP_MASTER__BRANCH_CODE";
pkFields[0] = "BLK_LFTMS_PROD_COMP_MASTER__BRANCH_CODE";
queryFields[1] = "BLK_LFTMS_PROD_COMP_MASTER__COMPONENT";
pkFields[1] = "BLK_LFTMS_PROD_COMP_MASTER__COMPONENT";
queryFields[2] = "BLK_LFTMS_PROD_COMP_MASTER__PRODUCT";
pkFields[2] = "BLK_LFTMS_PROD_COMP_MASTER__PRODUCT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTMS_PRODUCT_CURRENCY_LIMITS":["CCYFORMAT","CCYROUNDRULE","CURRENCY","DEFAULTAMOUNT","DEFAULTRATE","DEFAULTRATESIGN","DEFAULTSPREAD","FLOATINGRATECODE","INTERESTBASIS","INTPERIODBASIS","MAXIMUMRATE","MAXIMUMRATESIGN","MAXIMUMSPREAD","MINIMUMRATE","MINIMUMRATESIGN","MINIMUMSPREAD","RATEFIXINGDAYS","RATE_ROUNDING_POSITION","RATE_ROUNDING_RULE","RATE_ROUNDING_UNIT","RFR_LOCKOUT_METHOD_DAYS","RFR_LOOKBACK_METHOD_DAYS","RFR_PAYMENTDELAY_METHOD_DAYS","RFR_RATE_COMP_ROUND_UNIT","RFR_RATE_TYPE"],"BLK_LFTMS_PROD_COMP_MASTER":["MODULE_CODE","TXT_MODULE_DESCRIPTION"]};
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
var lovInfoFlds = {"BLK_LFTMS_PROD_COMP_MASTER__MODULE_CODE__LOV_MODULE":["BLK_LFTMS_PROD_COMP_MASTER__MODULE_CODE~BLK_LFTMS_PROD_COMP_MASTER__TXT_MODULE_DESCRIPTION~","","N~N","N"],"BLK_LFTMS_PROD_COMP_MASTER__BRANCH_CODE__LOV_BRANCH":["BLK_LFTMS_PROD_COMP_MASTER__BRANCH_CODE~BLK_LFTMS_PROD_COMP_MASTER__TXTBRNNAME~","","N~N",""],"BLK_LFTMS_PROD_COMP_MASTER__COMPONENT__LOV_COMPONENT":["BLK_LFTMS_PROD_COMP_MASTER__COMPONENT~BLK_LFTMS_PROD_COMP_MASTER__TXTCOMDESC~","BLK_LFTMS_PROD_COMP_MASTER__PRODUCT!Varchar2~BLK_LFTMS_PROD_COMP_MASTER__PRODUCT!Varchar2","N~N",""],"BLK_LFTMS_PROD_COMP_MASTER__PRODUCT__LOV_PRODUCT":["BLK_LFTMS_PROD_COMP_MASTER__PRODUCT~BLK_LFTMS_PROD_COMP_MASTER__TXTPRODDESC~","BLK_LFTMS_PROD_COMP_MASTER__MODULE_CODE!VARCHAR2","N~N",""],"BLK_LFTMS_PRODUCT_CURRENCY_LIMITS__CURRENCY__LOV_CURR":["BLK_LFTMS_PRODUCT_CURRENCY_LIMITS__CURRENCY~~BLK_LFTMS_PRODUCT_CURRENCY_LIMITS__RATEFIXINGDAYS~","","N~N~N",""],"BLK_LFTMS_PRODUCT_CURRENCY_LIMITS__FLOATINGRATECODE__LOV_RATE_CODE":["BLK_LFTMS_PRODUCT_CURRENCY_LIMITS__FLOATINGRATECODE~~","BLK_LFTMS_PRODUCT_CURRENCY_LIMITS__RFR_RATE_TYPE!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LFTMS_PRODUCT_CURRENCY_LIMITS");
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

ArrFuncOrigin["OLDINTLM"]="KERNEL";
ArrPrntFunc["OLDINTLM"]="";
ArrPrntOrigin["OLDINTLM"]="";
ArrRoutingType["OLDINTLM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDINTLM"]="N";
ArrCustomModified["OLDINTLM"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------