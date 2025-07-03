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
**  File Name          : OLDPLMNT_SYS.js
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
var fieldNameArray = {"BLK_OLTM_PROD_TXN_LIMITS":"MODULE_ID~MODULE_DESC~PRODUCT_CODE~PRODUCT_DESC~LIMIT_CCY~CUST_TYPE~SOURCE~ROLE_BASED_AUTH~FOLLOW_SEQ~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_OLTM_PROD_TXN_AUTH_LIMITS":"MODULE_ID~PRODUCT_CODE~CUST_TYPE~SOURCE~TXN_LIMIT~AUTH_LEVELS~CUMULATIVE~MIN_AUTH_LIMIT","BLK_OLTM_AUTH_ROLE_MAP":"MODULE_ID~PRODUCT_CODE~CUST_TYPE~SOURCE~TXN_LIMIT~AUTH_ROLE~LEVEL1~LEVEL2~LEVEL3~LEVEL4"};

var multipleEntryPageSize = {"BLK_OLTM_PROD_TXN_AUTH_LIMITS" :"15" ,"BLK_OLTM_AUTH_ROLE_MAP" : "2 "};

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTM_PROD_TXN_AUTH_LIMITS~BLK_OLTM_AUTH_ROLE_MAP"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTM_PROD_TXN_LIMITS">MODULE_ID~MODULE_DESC~PRODUCT_CODE~PRODUCT_DESC~LIMIT_CCY~CUST_TYPE~SOURCE~ROLE_BASED_AUTH~FOLLOW_SEQ~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTM_PROD_TXN_LIMITS" RELATION_TYPE="N" TYPE="BLK_OLTM_PROD_TXN_AUTH_LIMITS">MODULE_ID~PRODUCT_CODE~CUST_TYPE~SOURCE~TXN_LIMIT~AUTH_LEVELS~CUMULATIVE~MIN_AUTH_LIMIT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTM_PROD_TXN_AUTH_LIMITS" RELATION_TYPE="N" TYPE="BLK_OLTM_AUTH_ROLE_MAP">MODULE_ID~PRODUCT_CODE~CUST_TYPE~SOURCE~TXN_LIMIT~AUTH_ROLE~LEVEL1~LEVEL2~LEVEL3~LEVEL4</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTM_PROD_TXN_LIMITS">AUTHSTAT~TXNSTAT~MODULE_ID~PRODUCT_CODE~LIMIT_CCY~CUST_TYPE~SOURCE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDPLMNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTM_PROD_TXN_LIMITS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTM_PROD_TXN_LIMITS" : "","BLK_OLTM_PROD_TXN_AUTH_LIMITS" : "BLK_OLTM_PROD_TXN_LIMITS~N","BLK_OLTM_AUTH_ROLE_MAP" : "BLK_OLTM_PROD_TXN_AUTH_LIMITS~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTM_PROD_TXN_LIMITS","BLK_OLTM_PROD_TXN_AUTH_LIMITS","BLK_OLTM_AUTH_ROLE_MAP"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDPLMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDPLMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTM_PROD_TXN_LIMITS__CUST_TYPE";
pkFields[0] = "BLK_OLTM_PROD_TXN_LIMITS__CUST_TYPE";
queryFields[1] = "BLK_OLTM_PROD_TXN_LIMITS__SOURCE";
pkFields[1] = "BLK_OLTM_PROD_TXN_LIMITS__SOURCE";
queryFields[2] = "BLK_OLTM_PROD_TXN_LIMITS__MODULE_ID";
pkFields[2] = "BLK_OLTM_PROD_TXN_LIMITS__MODULE_ID";
queryFields[3] = "BLK_OLTM_PROD_TXN_LIMITS__PRODUCT_CODE";
pkFields[3] = "BLK_OLTM_PROD_TXN_LIMITS__PRODUCT_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTM_AUTH_ROLE_MAP":["LEVEL1","LEVEL2","LEVEL3","LEVEL4"],"BLK_OLTM_PROD_TXN_AUTH_LIMITS":["AUTH_LEVELS","CUMULATIVE","MIN_AUTH_LIMIT","TXN_LIMIT"],"BLK_OLTM_PROD_TXN_LIMITS":["BTN_FIELDS","FOLLOW_SEQ","ROLE_BASED_AUTH"]};
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
var lovInfoFlds = {"BLK_OLTM_PROD_TXN_LIMITS__MODULE_ID__LOV_MODULE":["BLK_OLTM_PROD_TXN_LIMITS__MODULE_ID~BLK_OLTM_PROD_TXN_LIMITS__MODULE_DESC~","","N~N",""],"BLK_OLTM_PROD_TXN_LIMITS__PRODUCT_CODE__LOV_PRODUCT":["BLK_OLTM_PROD_TXN_LIMITS__PRODUCT_CODE~BLK_OLTM_PROD_TXN_LIMITS__PRODUCT_DESC~","BLK_OLTM_PROD_TXN_LIMITS__MODULE_ID!VARCHAR2","N~N",""],"BLK_OLTM_PROD_TXN_LIMITS__LIMIT_CCY__LOV_CCY":["BLK_OLTM_PROD_TXN_LIMITS__LIMIT_CCY~~","","N~N",""],"BLK_OLTM_PROD_TXN_LIMITS__SOURCE__LOV_SOURCE":["BLK_OLTM_PROD_TXN_LIMITS__SOURCE~","","N",""],"BLK_OLTM_PROD_TXN_AUTH_LIMITS__MODULE_ID__LOV_MODULE":["~~","","N~N",""],"BLK_OLTM_PROD_TXN_AUTH_LIMITS__PRODUCT_CODE__LOV_PRODUCT":["~~","__!","N~N",""],"BLK_OLTM_PROD_TXN_AUTH_LIMITS__SOURCE__LOV_SOURCE":["~","","N",""],"BLK_OLTM_AUTH_ROLE_MAP__MODULE_ID__LOV_MODULE":["BLK_OLTM_AUTH_ROLE_MAP__MODULE_ID~~","","N~N",""],"BLK_OLTM_AUTH_ROLE_MAP__PRODUCT_CODE__LOV_PRODUCT":["BLK_OLTM_AUTH_ROLE_MAP__PRODUCT_CODE~~","__!","N~N",""],"BLK_OLTM_AUTH_ROLE_MAP__SOURCE__LOV_SOURCE":["BLK_OLTM_AUTH_ROLE_MAP__SOURCE~","","N",""],"BLK_OLTM_AUTH_ROLE_MAP__LEVEL1__LOV_LEVELS":["BLK_OLTM_AUTH_ROLE_MAP__LEVEL1~~","","N~N",""],"BLK_OLTM_AUTH_ROLE_MAP__LEVEL2__LOV_LEVELS":["BLK_OLTM_AUTH_ROLE_MAP__LEVEL2~~","","N~N",""],"BLK_OLTM_AUTH_ROLE_MAP__LEVEL3__LOV_LEVELS":["BLK_OLTM_AUTH_ROLE_MAP__LEVEL3~~","","N~N",""],"BLK_OLTM_AUTH_ROLE_MAP__LEVEL4__LOV_LEVELS":["BLK_OLTM_AUTH_ROLE_MAP__LEVEL4~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTM_PROD_TXN_AUTH_LIMITS","BLK_OLTM_AUTH_ROLE_MAP");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_OLTM_PROD_TXN_LIMITS"); 

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

ArrFuncOrigin["OLDPLMNT"]="KERNEL";
ArrPrntFunc["OLDPLMNT"]="";
ArrPrntOrigin["OLDPLMNT"]="";
ArrRoutingType["OLDPLMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDPLMNT"]="N";
ArrCustomModified["OLDPLMNT"]="N";

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