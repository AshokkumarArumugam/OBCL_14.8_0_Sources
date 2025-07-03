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
**  File Name          : OLDTRCYP_SYS.js
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
var fieldNameArray = {"BLK_OLTMS_PROD_CCY_PARAMS":"BRANCHCODE~PRODUCTTYPE~PRODUCTCODE~CCYCODE~MINPRINCIPALAMT~MAXPRINCIPALAMT~MINWOFFAMT~TXTBRANCHNAME~TXTPRODDESC~TXTCCYNAME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_PROD_CCY_PARAMS">BRANCHCODE~PRODUCTTYPE~PRODUCTCODE~CCYCODE~MINPRINCIPALAMT~MAXPRINCIPALAMT~MINWOFFAMT~TXTBRANCHNAME~TXTPRODDESC~TXTCCYNAME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_PROD_CCY_PARAMS">AUTHSTAT~TXNSTAT~BRANCHCODE~PRODUCTTYPE~PRODUCTCODE~CCYCODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDTRCYP";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =1;
var g_SummaryBlock ="BLK_OLTMS_PROD_CCY_PARAMS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTMS_PROD_CCY_PARAMS" : ""}; 

 var dataSrcLocationArray = new Array("BLK_OLTMS_PROD_CCY_PARAMS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDTRCYP.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDTRCYP.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTMS_PROD_CCY_PARAMS__BRANCHCODE";
pkFields[0] = "BLK_OLTMS_PROD_CCY_PARAMS__BRANCHCODE";
queryFields[1] = "BLK_OLTMS_PROD_CCY_PARAMS__PRODUCTTYPE";
pkFields[1] = "BLK_OLTMS_PROD_CCY_PARAMS__PRODUCTTYPE";
queryFields[2] = "BLK_OLTMS_PROD_CCY_PARAMS__PRODUCTCODE";
pkFields[2] = "BLK_OLTMS_PROD_CCY_PARAMS__PRODUCTCODE";
queryFields[3] = "BLK_OLTMS_PROD_CCY_PARAMS__CCYCODE";
pkFields[3] = "BLK_OLTMS_PROD_CCY_PARAMS__CCYCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTMS_PROD_CCY_PARAMS":["MAXPRINCIPALAMT","MINPRINCIPALAMT","MINWOFFAMT"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_OLTMS_PROD_CCY_PARAMS":["BRANCHCODE","CCYCODE","PRODUCTCODE"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_OLTMS_PROD_CCY_PARAMS__BRANCHCODE__LOV_BRANCH_CODE":["BLK_OLTMS_PROD_CCY_PARAMS__BRANCHCODE~BLK_OLTMS_PROD_CCY_PARAMS__TXTBRANCHNAME~","","N~N",""],"BLK_OLTMS_PROD_CCY_PARAMS__PRODUCTCODE__LOV_PRODUCT_CODE":["BLK_OLTMS_PROD_CCY_PARAMS__PRODUCTCODE~BLK_OLTMS_PROD_CCY_PARAMS__TXTPRODDESC~","","N~N",""],"BLK_OLTMS_PROD_CCY_PARAMS__CCYCODE__LOV_CCY_CODE":["BLK_OLTMS_PROD_CCY_PARAMS__CCYCODE~BLK_OLTMS_PROD_CCY_PARAMS__TXTCCYNAME~","","N~N",""]};
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

ArrFuncOrigin["OLDTRCYP"]="KERNEL";
ArrPrntFunc["OLDTRCYP"]="";
ArrPrntOrigin["OLDTRCYP"]="";
ArrRoutingType["OLDTRCYP"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDTRCYP"]="N";
ArrCustomModified["OLDTRCYP"]="N";

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