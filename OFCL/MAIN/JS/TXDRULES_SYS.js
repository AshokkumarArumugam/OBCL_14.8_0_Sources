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
**  File Name          : TXDRULES_SYS.js
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
var fieldNameArray = {"BLK_TXTMS_RULE":"EFFECTIVE_DATE~RULE_CODE~CUMULATIVE~RULE_METHOD~MIN_AMOUNT~MAX_AMOUNT~DESCRIPTION~CCY_RATE_TYPE~CCY_BUY_SELL~COUNTRY~CUSTOMER~INVOICE_REQD~EFF_END_DATE~CALC_CCY~CALC_ROUND_OPT~CALC_ROUND_MTHD~CALC_CCY_RATE_TYPE~CALC_BUY_SELL~ROUND_OPT~ROUND_MTHD~CUST_TAX_GROUP~CALC_DECIMALS~CALC_ROUND_UNIT~ROUND_DECIMALS~ROUND_UNIT~CURRENCY~NATIONALITY~FORM_STATUS~SPECIAL_TAX_TYPE~TAX_GROUP~LINKED_TO_GROUP~COUNTRYNAME~NATIONALITYCOUNTRYNAME~CUSTGROUPDESC~CUSTOMERNAME~CALCCCYOPT~CCYOPT~CURRENCYNAME~CURRENCYRATEDESC1~REFCCYDESC~CCYRATETYPEDESC~CALCCCYDESC~REFCCY~INTEREST_BASIS~IOF_ADD_RATE~IOF_MAX_RATE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_TXTMS_SLAB":"RULE_CODE~EFFECTIVE_DATE~BASIS_AMT_TO~FLOOR_AMT~FLOOR_CHARGE~FLAT_AMT~BASIS_AMT_FROM~RATE~COUNTRY~CUSTOMER~EFF_END_DATE~CUST_TAX_GROUP~CURRENCY~NATIONALITY"};

var multipleEntryPageSize = {"BLK_TXTMS_SLAB" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_TXTMS_SLAB"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TXTMS_RULE">EFFECTIVE_DATE~RULE_CODE~CUMULATIVE~RULE_METHOD~MIN_AMOUNT~MAX_AMOUNT~DESCRIPTION~CCY_RATE_TYPE~CCY_BUY_SELL~COUNTRY~CUSTOMER~INVOICE_REQD~EFF_END_DATE~CALC_CCY~CALC_ROUND_OPT~CALC_ROUND_MTHD~CALC_CCY_RATE_TYPE~CALC_BUY_SELL~ROUND_OPT~ROUND_MTHD~CUST_TAX_GROUP~CALC_DECIMALS~CALC_ROUND_UNIT~ROUND_DECIMALS~ROUND_UNIT~CURRENCY~NATIONALITY~FORM_STATUS~SPECIAL_TAX_TYPE~TAX_GROUP~LINKED_TO_GROUP~COUNTRYNAME~NATIONALITYCOUNTRYNAME~CUSTGROUPDESC~CUSTOMERNAME~CALCCCYOPT~CCYOPT~CURRENCYNAME~CURRENCYRATEDESC1~REFCCYDESC~CCYRATETYPEDESC~CALCCCYDESC~REFCCY~INTEREST_BASIS~IOF_ADD_RATE~IOF_MAX_RATE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_TXTMS_RULE" RELATION_TYPE="N" TYPE="BLK_TXTMS_SLAB">RULE_CODE~EFFECTIVE_DATE~BASIS_AMT_TO~FLOOR_AMT~FLOOR_CHARGE~FLAT_AMT~BASIS_AMT_FROM~RATE~COUNTRY~CUSTOMER~EFF_END_DATE~CUST_TAX_GROUP~CURRENCY~NATIONALITY</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TXTMS_RULE">AUTHSTAT~TXNSTAT~RULE_CODE~EFFECTIVE_DATE~COUNTRY~CUST_TAX_GROUP~CUSTOMER~DESCRIPTION~RULE_METHOD~MIN_AMOUNT~MAX_AMOUNT~CCY_RATE_TYPE~CCY_BUY_SELL~CURRENCY~NATIONALITY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TXDRULES";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TXTMS_RULE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TXTMS_RULE" : "","BLK_TXTMS_SLAB" : "BLK_TXTMS_RULE~N"}; 

 var dataSrcLocationArray = new Array("BLK_TXTMS_RULE","BLK_TXTMS_SLAB"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TXDRULES.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TXDRULES.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TXTMS_RULE__EFFECTIVE_DATE";
pkFields[0] = "BLK_TXTMS_RULE__EFFECTIVE_DATE";
queryFields[1] = "BLK_TXTMS_RULE__RULE_CODE";
pkFields[1] = "BLK_TXTMS_RULE__RULE_CODE";
queryFields[2] = "BLK_TXTMS_RULE__COUNTRY";
pkFields[2] = "BLK_TXTMS_RULE__COUNTRY";
queryFields[3] = "BLK_TXTMS_RULE__CUSTOMER";
pkFields[3] = "BLK_TXTMS_RULE__CUSTOMER";
queryFields[4] = "BLK_TXTMS_RULE__CUST_TAX_GROUP";
pkFields[4] = "BLK_TXTMS_RULE__CUST_TAX_GROUP";
queryFields[5] = "BLK_TXTMS_RULE__CURRENCY";
pkFields[5] = "BLK_TXTMS_RULE__CURRENCY";
queryFields[6] = "BLK_TXTMS_RULE__NATIONALITY";
pkFields[6] = "BLK_TXTMS_RULE__NATIONALITY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TXTMS_RULE":["EFF_END_DATEI","INTEREST_BASIS","IOF_ADD_RATE","IOF_MAX_RATE"],"BLK_TXTMS_SLAB":["BASIS_AMT_TO","EFF_END_DATE","FLOOR_AMT","FLOOR_CHARGE","RATE"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_TXTMS_RULE":["RULE_CODE"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_TXTMS_RULE__RULE_CODE__LOV_RULE":["BLK_TXTMS_RULE__RULE_CODE~BLK_TXTMS_RULE__DESCRIPTION~","","N~N",""],"BLK_TXTMS_RULE__CCY_RATE_TYPE__LOV_CCY_RATE_TYPE":["BLK_TXTMS_RULE__CCY_RATE_TYPE~BLK_TXTMS_RULE__CCYRATETYPEDESC~","","N~N",""],"BLK_TXTMS_RULE__COUNTRY__LOV_COUNTRY":["BLK_TXTMS_RULE__COUNTRY~BLK_TXTMS_RULE__COUNTRYNAME~","","N~N",""],"BLK_TXTMS_RULE__CUSTOMER__LOV_CUSTOMER":["BLK_TXTMS_RULE__CUSTOMER~BLK_TXTMS_RULE__CUSTOMERNAME~","","N~N",""],"BLK_TXTMS_RULE__CALC_CCY__LOV_CCY":["BLK_TXTMS_RULE__CALC_CCY~BLK_TXTMS_RULE__CALCCCYDESC~","","N~N",""],"BLK_TXTMS_RULE__CALC_CCY_RATE_TYPE__LOV_CCY_RATE_TYPE1":["BLK_TXTMS_RULE__CALC_CCY_RATE_TYPE~BLK_TXTMS_RULE__CURRENCYRATEDESC1~","","N~N",""],"BLK_TXTMS_RULE__CUST_TAX_GROUP__LOV_CUST_TAX_GROUP":["BLK_TXTMS_RULE__CUST_TAX_GROUP~BLK_TXTMS_RULE__CUSTGROUPDESC~","","N~N",""],"BLK_TXTMS_RULE__CURRENCY__LOV_CCYALLOWED":["BLK_TXTMS_RULE__CURRENCY~BLK_TXTMS_RULE__CURRENCYNAME~","","N~N",""],"BLK_TXTMS_RULE__NATIONALITY__LOV_NATIONALITY":["BLK_TXTMS_RULE__NATIONALITY~BLK_TXTMS_RULE__NATIONALITYCOUNTRYNAME~","","N~N",""],"BLK_TXTMS_RULE__REFCCY__LOV_CCY":["BLK_TXTMS_RULE__REFCCY~BLK_TXTMS_RULE__REFCCYDESC~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TXTMS_SLAB");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_TXTMS_RULE"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TXDRULES"]="KERNEL";
ArrPrntFunc["TXDRULES"]="";
ArrPrntOrigin["TXDRULES"]="";
ArrRoutingType["TXDRULES"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TXDRULES"]="N";
ArrCustomModified["TXDRULES"]="N";

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