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
**  File Name          : OLDPRDRS_SYS.js
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
var fieldNameArray = {"BLK_PRD_RESTRICTION":"BRNLIST~PRDDESC~PRDCODE~CCYLST~MODU~CATGLIST~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_BRANCH_LIST":"PRDCD~BRNDISALOW~BRNNAME","BLK_CUST_LIST":"PRDCD~CSTID~CUSTNAME~ALWD","BLK_CCY_LIST":"BGTDLCCY~PRODCD~SOLDCCY~CCYNAME","BLK_BRN_CCY_CLASS":"CLASCD~CLASTYP~CLASSDESC~PRD","BLK_CATEGORY_LIST":"CATGDSAW~PRDCD~CUSTCATDESC","BLK_CATEGORY_CLASS":"CLASCD~CLASTYP~PRD","BLK_RESD_CCY":"CCY~NEG_RESD~PRODCOD~RESD_AMT~ALLOW_MULTI_CCY","BLK_PROD_ACNT_ACC_MSTR":"IS_ALLOWED~PRODUCT_CODE","BLK_PROD_ACNT_ACC_DTLS":"PRODUCT_CODE~ACCOUNT_DESC~AC_GL_NO"};

var multipleEntryPageSize = {"BLK_BRANCH_LIST" :"15" ,"BLK_CCY_LIST" :"15" ,"BLK_CATEGORY_LIST" :"15" ,"BLK_CUST_LIST" :"15" ,"BLK_RESD_CCY" :"15" ,"BLK_PROD_ACNT_ACC_DTLS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_BRN":"BLK_BRANCH_LIST~BLK_CCY_LIST~BLK_RESD_CCY","CVS_MAIN__TAB_CUST":"BLK_CATEGORY_LIST~BLK_CUST_LIST","CVS_MAIN__TAB_ACC":"BLK_PROD_ACNT_ACC_DTLS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRD_RESTRICTION">BRNLIST~PRDDESC~PRDCODE~CCYLST~MODU~CATGLIST~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_PRD_RESTRICTION" RELATION_TYPE="N" TYPE="BLK_BRANCH_LIST">PRDCD~BRNDISALOW~BRNNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_PRD_RESTRICTION" RELATION_TYPE="N" TYPE="BLK_CUST_LIST">PRDCD~CSTID~CUSTNAME~ALWD</FN>'; 
msgxml += '      <FN PARENT="BLK_PRD_RESTRICTION" RELATION_TYPE="N" TYPE="BLK_CCY_LIST">BGTDLCCY~PRODCD~SOLDCCY~CCYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_PRD_RESTRICTION" RELATION_TYPE="1" TYPE="BLK_BRN_CCY_CLASS">CLASCD~CLASTYP~CLASSDESC~PRD</FN>'; 
msgxml += '      <FN PARENT="BLK_PRD_RESTRICTION" RELATION_TYPE="N" TYPE="BLK_CATEGORY_LIST">CATGDSAW~PRDCD~CUSTCATDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_PRD_RESTRICTION" RELATION_TYPE="1" TYPE="BLK_CATEGORY_CLASS">CLASCD~CLASTYP~PRD</FN>'; 
msgxml += '      <FN PARENT="BLK_PRD_RESTRICTION" RELATION_TYPE="N" TYPE="BLK_RESD_CCY">CCY~NEG_RESD~PRODCOD~RESD_AMT~ALLOW_MULTI_CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_PRD_RESTRICTION" RELATION_TYPE="1" TYPE="BLK_PROD_ACNT_ACC_MSTR">IS_ALLOWED~PRODUCT_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_PROD_ACNT_ACC_MSTR" RELATION_TYPE="N" TYPE="BLK_PROD_ACNT_ACC_DTLS">PRODUCT_CODE~ACCOUNT_DESC~AC_GL_NO</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRD_RESTRICTION">AUTHSTAT~TXNSTAT~PRDCODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDPRDRS";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_PRD_RESTRICTION";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PRD_RESTRICTION" : "","BLK_BRANCH_LIST" : "BLK_PRD_RESTRICTION~N","BLK_CUST_LIST" : "BLK_PRD_RESTRICTION~N","BLK_CCY_LIST" : "BLK_PRD_RESTRICTION~N","BLK_BRN_CCY_CLASS" : "BLK_PRD_RESTRICTION~1","BLK_CATEGORY_LIST" : "BLK_PRD_RESTRICTION~N","BLK_CATEGORY_CLASS" : "BLK_PRD_RESTRICTION~1","BLK_RESD_CCY" : "BLK_PRD_RESTRICTION~N","BLK_PROD_ACNT_ACC_MSTR" : "BLK_PRD_RESTRICTION~1","BLK_PROD_ACNT_ACC_DTLS" : "BLK_PROD_ACNT_ACC_MSTR~N"}; 

 var dataSrcLocationArray = new Array("BLK_PRD_RESTRICTION","BLK_BRANCH_LIST","BLK_CUST_LIST","BLK_CCY_LIST","BLK_BRN_CCY_CLASS","BLK_CATEGORY_LIST","BLK_CATEGORY_CLASS","BLK_RESD_CCY","BLK_PROD_ACNT_ACC_MSTR","BLK_PROD_ACNT_ACC_DTLS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDPRDRS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDPRDRS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PRD_RESTRICTION__PRDCODE";
pkFields[0] = "BLK_PRD_RESTRICTION__PRDCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BRANCH_LIST":["BRNDISALOW","BRNNAME"],"BLK_BRN_CCY_CLASS":["BTN_DEF_BRCY_CLASS","CLASCD","CLASSDESC"],"BLK_CATEGORY_CLASS":["BTN_DEF_CUST_CLASS","CLASCD","CLASDESC"],"BLK_CATEGORY_LIST":["CATGDSAW","CUSTCATDESC"],"BLK_CCY_LIST":["BGTDLCCY","CCYNAME"],"BLK_CUST_LIST":["ALWD","CSTID","CUSTNAME"],"BLK_PRD_RESTRICTION":["BRNLIST","CATGLIST","CCYLST"],"BLK_PROD_ACNT_ACC_DTLS":["ACCOUNT_DESC","AC_GL_NO","PRODUCT_CODE"],"BLK_PROD_ACNT_ACC_MSTR":["IS_ALLOWED","PRODUCT_CODE"],"BLK_RESD_CCY":["ALLOW_MULTI_CCY","CCY","NEG_RESD","RESD_AMT"]};
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
var lovInfoFlds = {"BLK_PRD_RESTRICTION__PRDCODE__LOV_PRD_CODE":["BLK_PRD_RESTRICTION__PRDCODE~BLK_PRD_RESTRICTION__PRDDESC~BLK_PRD_RESTRICTION__BRNLIST~BLK_PRD_RESTRICTION__CCYLST~BLK_PRD_RESTRICTION__CATGLIST~BLK_PRD_RESTRICTION__MODU~","","N~N",""],"BLK_BRANCH_LIST__BRNDISALOW__LOV_BRANCH":["BLK_BRANCH_LIST__BRNDISALOW~BLK_BRANCH_LIST__BRNNAME~","","N~N",""],"BLK_CUST_LIST__CSTID__LOV_CUSTOMERS":["BLK_CUST_LIST__CSTID~~BLK_CUST_LIST__CUSTNAME~","","N~N~N",""],"BLK_CCY_LIST__BGTDLCCY__LOV_CCY":["BLK_CCY_LIST__BGTDLCCY~BLK_CCY_LIST__CCYNAME~","","N~N",""],"BLK_BRN_CCY_CLASS__CLASCD__LOV_CLASS_CB":["BLK_BRN_CCY_CLASS__CLASCD~BLK_BRN_CCY_CLASS__CLASSDESC~","BLK_PRD_RESTRICTION__MODU!STRING~BLK_PRD_RESTRICTION__BRNLIST!STRING~BLK_PRD_RESTRICTION__CCYLST!STRING","N~N",""],"BLK_CATEGORY_LIST__CATGDSAW__LOV_CATEGORY":["BLK_CATEGORY_LIST__CATGDSAW~BLK_CATEGORY_LIST__CUSTCATDESC~","","N~N",""],"BLK_CATEGORY_CLASS__CLASCD__LOV_CLASS_CR":["BLK_CATEGORY_CLASS__CLASCD~BLK_CATEGORY_CLASS__CLASDESC~","BLK_PRD_RESTRICTION__MODU!STRING~BLK_PRD_RESTRICTION__CATGLIST!STRING","N~N",""],"BLK_RESD_CCY__CCY__LOV_CCY":["BLK_RESD_CCY__CCY~~","","N~N",""],"BLK_PROD_ACNT_ACC_DTLS__AC_GL_NO__LOV_ACCOUNT":["BLK_PROD_ACNT_ACC_DTLS__AC_GL_NO~BLK_PROD_ACNT_ACC_DTLS__ACCOUNT_DESC~","","N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_BRN';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_BRANCH_LIST","BLK_CCY_LIST","BLK_CATEGORY_LIST","BLK_CUST_LIST","BLK_RESD_CCY","BLK_PROD_ACNT_ACC_DTLS");
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

ArrFuncOrigin["OLDPRDRS"]="KERNEL";
ArrPrntFunc["OLDPRDRS"]="";
ArrPrntOrigin["OLDPRDRS"]="";
ArrRoutingType["OLDPRDRS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDPRDRS"]="N";
ArrCustomModified["OLDPRDRS"]="N";

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