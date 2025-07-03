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
**  File Name          : OLDSPMNT_SYS.js
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
var fieldNameArray = {"BLK_LFTMS_SPREAD_MASTER":"CONTRACTREFNO~CUSTOMERNO~BRANCHCODE~PRODUCTCODE~SPREADTYPE~AMOUNTTYPE~DEPARTMENTCODE~TREASURYSOURCE~TXTUSERREFNO~TXTCCY~TXTCUSTOMERNAME~TXTPRODUCTDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LFTMS_SPREAD_CCY":"CURRENCY~TXTCCYDESC","BLK_LFTMS_SPREAD_EFFDATE":"EFFECTIVEDATE","BLK_LFTMS_SPREAD_RATE":"FROMBASISAMT~TOBASISAMT~SPREADRATE~CURRENCY"};

var multipleEntryPageSize = {"BLK_LFTMS_SPREAD_CCY" :"15" ,"BLK_LFTMS_SPREAD_EFFDATE" :"15" ,"BLK_LFTMS_SPREAD_RATE" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LFTMS_SPREAD_CCY~BLK_LFTMS_SPREAD_EFFDATE~BLK_LFTMS_SPREAD_RATE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTMS_SPREAD_MASTER">CONTRACTREFNO~CUSTOMERNO~BRANCHCODE~PRODUCTCODE~SPREADTYPE~AMOUNTTYPE~DEPARTMENTCODE~TREASURYSOURCE~TXTUSERREFNO~TXTCCY~TXTCUSTOMERNAME~TXTPRODUCTDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_SPREAD_MASTER" RELATION_TYPE="N" TYPE="BLK_LFTMS_SPREAD_CCY">CURRENCY~TXTCCYDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_SPREAD_CCY" RELATION_TYPE="N" TYPE="BLK_LFTMS_SPREAD_EFFDATE">EFFECTIVEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_SPREAD_EFFDATE" RELATION_TYPE="N" TYPE="BLK_LFTMS_SPREAD_RATE">FROMBASISAMT~TOBASISAMT~SPREADRATE~CURRENCY</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTMS_SPREAD_MASTER">AUTHSTAT~TXNSTAT~CONTRACTREFNO~CUSTOMERNO~BRANCHCODE~PRODUCTCODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDSPMNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LFTMS_SPREAD_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LFTMS_SPREAD_MASTER" : "","BLK_LFTMS_SPREAD_CCY" : "BLK_LFTMS_SPREAD_MASTER~N","BLK_LFTMS_SPREAD_EFFDATE" : "BLK_LFTMS_SPREAD_CCY~N","BLK_LFTMS_SPREAD_RATE" : "BLK_LFTMS_SPREAD_EFFDATE~N"}; 

 var dataSrcLocationArray = new Array("BLK_LFTMS_SPREAD_MASTER","BLK_LFTMS_SPREAD_CCY","BLK_LFTMS_SPREAD_EFFDATE","BLK_LFTMS_SPREAD_RATE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDSPMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDSPMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LFTMS_SPREAD_MASTER__CONTRACTREFNO";
pkFields[0] = "BLK_LFTMS_SPREAD_MASTER__CONTRACTREFNO";
queryFields[1] = "BLK_LFTMS_SPREAD_MASTER__CUSTOMERNO";
pkFields[1] = "BLK_LFTMS_SPREAD_MASTER__CUSTOMERNO";
queryFields[2] = "BLK_LFTMS_SPREAD_MASTER__BRANCHCODE";
pkFields[2] = "BLK_LFTMS_SPREAD_MASTER__BRANCHCODE";
queryFields[3] = "BLK_LFTMS_SPREAD_MASTER__PRODUCTCODE";
pkFields[3] = "BLK_LFTMS_SPREAD_MASTER__PRODUCTCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTMS_SPREAD_CCY":["CURRENCY","TXTCCYDESC"],"BLK_LFTMS_SPREAD_EFFDATE":["EFFECTIVEDATEI"],"BLK_LFTMS_SPREAD_RATE":["FROMBASISAMT","SPREADRATE","TOBASISAMT"]};
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
var lovInfoFlds = {"BLK_LFTMS_SPREAD_MASTER__CONTRACTREFNO__LOV_CONTRACT":["BLK_LFTMS_SPREAD_MASTER__CONTRACTREFNO~BLK_LFTMS_SPREAD_MASTER__TXTUSERREFNO~BLK_LFTMS_SPREAD_MASTER__TXTCCY~","","N~N~N",""],"BLK_LFTMS_SPREAD_MASTER__CUSTOMERNO__LOV_CUSTOMER":["BLK_LFTMS_SPREAD_MASTER__CUSTOMERNO~BLK_LFTMS_SPREAD_MASTER__TXTCUSTOMERNAME~","","N~N",""],"BLK_LFTMS_SPREAD_MASTER__PRODUCTCODE__LOV_PRODUCT":["BLK_LFTMS_SPREAD_MASTER__PRODUCTCODE~BLK_LFTMS_SPREAD_MASTER__TXTPRODUCTDESC~","BLK_CFTMS_SPREAD_MASTER__CONTRACTREFNO!~BLK_CFTMS_SPREAD_MASTER__CONTRACTREFNO!~BLK_CFTMS_SPREAD_MASTER__CUSTOMERNO!","N~N",""],"BLK_LFTMS_SPREAD_CCY__CURRENCY__LOV_CCY":["BLK_LFTMS_SPREAD_CCY__CURRENCY~BLK_LFTMS_SPREAD_CCY__TXTCCYDESC~","BLK_CFTMS_SPREAD_MASTER__CONTRACTREFNO!~BLK_CFTMS_SPREAD_MASTER__CONTRACTREFNO!","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LFTMS_SPREAD_CCY","BLK_LFTMS_SPREAD_EFFDATE","BLK_LFTMS_SPREAD_RATE");
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

ArrFuncOrigin["OLDSPMNT"]="KERNEL";
ArrPrntFunc["OLDSPMNT"]="";
ArrPrntOrigin["OLDSPMNT"]="";
ArrRoutingType["OLDSPMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDSPMNT"]="N";
ArrCustomModified["OLDSPMNT"]="N";

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