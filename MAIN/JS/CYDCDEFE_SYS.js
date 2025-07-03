/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
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
**  File Name          : CYDCDEFE_SYS.js
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
var fieldNameArray = {"BLK_CYTMS_CCY_DEFN_MASTER":"MAINT_COUNTRY~CCY_CODE~CCY_NAME~COUNTRY~CCY_DECIMALS~CCY_ROUND_RULE~CCY_ROUND_UNIT~CCY_FORMAT_MASK~CCY_SPOT_DAYS~CCY_INT_METHOD~POSITION_GL~POSITION_EQVGL~CCY_EUR_TYPE~CCY_TOL_LIMIT~SETTLEMENT_MSG_DAYS~INDEX_FLAG~INDEX_BASE_CCY~CUT_OFF_HR~CUT_OFF_MIN~ALT_CCY_CODE~EUR_CONVERSION_REQD~CUT_OFF_DAYS~CR_AUTO_EX_RATE_LMT~DR_AUTO_EX_RATE_LMT~CCY_TYPE~GEN_103P~CLS_CCY~FX_NETTING_DAYS~ISO_NUM_CCY_CODE~GEN_CUST_COV~VALIDATE_50F~DESCRIPTION~MAINT_COUNTRY_NAME~COMMODITY_CODE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_CYTMS_CCY_COUNTRY_MAP_MASTER":"MAINT_COUNTRY~CURRENCY_CODE1~COUNTRY_CODE1~COUNTRY_DESC1"};

var multipleEntryPageSize = {"BLK_CYTMS_CCY_COUNTRY_MAP_MASTER" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_CTRY_MAPPING__TAB_MAIN":"BLK_CYTMS_CCY_COUNTRY_MAP_MASTER"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CYTMS_CCY_DEFN_MASTER">MAINT_COUNTRY~CCY_CODE~CCY_NAME~COUNTRY~CCY_DECIMALS~CCY_ROUND_RULE~CCY_ROUND_UNIT~CCY_FORMAT_MASK~CCY_SPOT_DAYS~CCY_INT_METHOD~POSITION_GL~POSITION_EQVGL~CCY_EUR_TYPE~CCY_TOL_LIMIT~SETTLEMENT_MSG_DAYS~INDEX_FLAG~INDEX_BASE_CCY~CUT_OFF_HR~CUT_OFF_MIN~ALT_CCY_CODE~EUR_CONVERSION_REQD~CUT_OFF_DAYS~CR_AUTO_EX_RATE_LMT~DR_AUTO_EX_RATE_LMT~CCY_TYPE~GEN_103P~CLS_CCY~FX_NETTING_DAYS~ISO_NUM_CCY_CODE~GEN_CUST_COV~VALIDATE_50F~DESCRIPTION~MAINT_COUNTRY_NAME~COMMODITY_CODE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_CYTMS_CCY_DEFN_MASTER" RELATION_TYPE="N" TYPE="BLK_CYTMS_CCY_COUNTRY_MAP_MASTER">MAINT_COUNTRY~CURRENCY_CODE1~COUNTRY_CODE1~COUNTRY_DESC1</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CYTMS_CCY_DEFN_MASTER">AUTHSTAT~TXNSTAT~CCY_CODE~CCY_NAME~COUNTRY~CCY_DECIMALS~CCY_ROUND_RULE~CCY_ROUND_UNIT~CCY_SPOT_DAYS~CCY_INT_METHOD~POSITION_GL~POSITION_EQVGL~MAINT_COUNTRY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "CYDCDEFE";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CYTMS_CCY_DEFN_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CYTMS_CCY_DEFN_MASTER" : "","BLK_CYTMS_CCY_COUNTRY_MAP_MASTER" : "BLK_CYTMS_CCY_DEFN_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_CYTMS_CCY_DEFN_MASTER","BLK_CYTMS_CCY_COUNTRY_MAP_MASTER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside CYDCDEFE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside CYDCDEFE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CYTMS_CCY_DEFN_MASTER__MAINT_COUNTRY";
pkFields[0] = "BLK_CYTMS_CCY_DEFN_MASTER__MAINT_COUNTRY";
queryFields[1] = "BLK_CYTMS_CCY_DEFN_MASTER__CCY_CODE";
pkFields[1] = "BLK_CYTMS_CCY_DEFN_MASTER__CCY_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CYTMS_CCY_COUNTRY_MAP_MASTER":["COUNTRY_CODE1","COUNTRY_DESC1"],"BLK_CYTMS_CCY_DEFN_MASTER":["ALT_CCY_CODE","CCY_DECIMALS","CCY_EUR_TYPE","CCY_INT_METHOD","CCY_NAME","CCY_ROUND_RULE","CCY_ROUND_UNIT","CCY_SPOT_DAYS","CCY_TOL_LIMIT","CLS_CCY","COMMODITY_CODE","COUNTRY","CR_AUTO_EX_RATE_LMT","CUT_OFF_DAYS","CUT_OFF_HR","CUT_OFF_MIN","DR_AUTO_EX_RATE_LMT","EUR_CONVERSION_REQD","FX_NETTING_DAYS","GEN_103P","GEN_CUST_COV","INDEX_BASE_CCY","INDEX_FLAG","ISO_NUM_CCY_CODE","POSITION_EQVGL","POSITION_GL","SETTLEMENT_MSG_DAYS","VALIDATE_50F"]};
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
var lovInfoFlds = {"BLK_CYTMS_CCY_DEFN_MASTER__MAINT_COUNTRY__LOV_CTY_CODE":["BLK_CYTMS_CCY_DEFN_MASTER__MAINT_COUNTRY~BLK_CYTMS_CCY_DEFN_MASTER__MAINT_COUNTRY_NAME~","","N",""],"BLK_CYTMS_CCY_DEFN_MASTER__COUNTRY__LOV_CTY_CODE":["BLK_CYTMS_CCY_DEFN_MASTER__COUNTRY~BLK_CYTMS_CCY_DEFN_MASTER__DESCRIPTION~","","N",""],"BLK_CYTMS_CCY_DEFN_MASTER__POSITION_GL__LOV_POSITION_GL":["BLK_CYTMS_CCY_DEFN_MASTER__POSITION_GL~~","","N",""],"BLK_CYTMS_CCY_DEFN_MASTER__POSITION_EQVGL__LOV_POSEQV_GL":["BLK_CYTMS_CCY_DEFN_MASTER__POSITION_EQVGL~~","","N",""],"BLK_CYTMS_CCY_DEFN_MASTER__INDEX_BASE_CCY__LOV_INDEX_BASE_CCY":["BLK_CYTMS_CCY_DEFN_MASTER__INDEX_BASE_CCY~~","BLK_CYTMS_CCY_DEFN_MASTER__MAINT_COUNTRY!","N",""],"BLK_CYTMS_CCY_COUNTRY_MAP_MASTER__COUNTRY_CODE1__LOV_CNTRY_CODE_FOR_MAPPING":["BLK_CYTMS_CCY_COUNTRY_MAP_MASTER__COUNTRY_CODE1~BLK_CYTMS_CCY_COUNTRY_MAP_MASTER__COUNTRY_DESC1~","BLK_CYTMS_CCY_DEFN_MASTER__CCY_CODE_CTRY_MAP!~BLK_CYTMS_CCY_DEFN_MASTER__MAINT_COUNTRY_CTRY_MAP!","N",""]};
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
var multipleEntryIDs = new Array("BLK_CYTMS_CCY_COUNTRY_MAP_MASTER");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_CYTMS_CCY_DEFN_MASTER"); 

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

ArrFuncOrigin["CYDCDEFE"]="KERNEL";
ArrPrntFunc["CYDCDEFE"]="";
ArrPrntOrigin["CYDCDEFE"]="";
ArrRoutingType["CYDCDEFE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["CYDCDEFE"]="N";
ArrCustomModified["CYDCDEFE"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------