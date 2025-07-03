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
**  File Name          : LFDTRATE_SYS.js
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
var fieldNameArray = {"BLK_LFTM_TREASURY_RATE_CODE":"RATE_CODE_USAGE~ADHERE_TO_MONTH_END~LIQD_PREM_TENOR_UNIT~LIQD_PREM_TENOR_CODE~TOM_DIFF_RATE~CASH_DIFF_RATE~DOMICILE_CCY~DESCRIPTION~CCY_CODE~RATE_CODE~TREASURY_GROUP~TREASURY_DESC~RATE_CODE_DESC~CCY_DESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTM_TREASURY_RATE_CODE">RATE_CODE_USAGE~ADHERE_TO_MONTH_END~LIQD_PREM_TENOR_UNIT~LIQD_PREM_TENOR_CODE~TOM_DIFF_RATE~CASH_DIFF_RATE~DOMICILE_CCY~DESCRIPTION~CCY_CODE~RATE_CODE~TREASURY_GROUP~TREASURY_DESC~RATE_CODE_DESC~CCY_DESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTM_TREASURY_RATE_CODE">AUTHSTAT~TXNSTAT~TREASURY_GROUP~RATE_CODE~CCY_CODE~DOMICILE_CCY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LFDTRATE";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LFTM_TREASURY_RATE_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LFTM_TREASURY_RATE_CODE" : ""}; 

 var dataSrcLocationArray = new Array("BLK_LFTM_TREASURY_RATE_CODE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFDTRATE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFDTRATE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LFTM_TREASURY_RATE_CODE__TREASURY_GROUP";
pkFields[0] = "BLK_LFTM_TREASURY_RATE_CODE__TREASURY_GROUP";
queryFields[1] = "BLK_LFTM_TREASURY_RATE_CODE__RATE_CODE";
pkFields[1] = "BLK_LFTM_TREASURY_RATE_CODE__RATE_CODE";
queryFields[2] = "BLK_LFTM_TREASURY_RATE_CODE__CCY_CODE";
pkFields[2] = "BLK_LFTM_TREASURY_RATE_CODE__CCY_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTM_TREASURY_RATE_CODE":["ADHERE_TO_MONTH_END","CASH_DIFF_RATE","DESCRIPTION","DOMICILE_CCY","LIQD_PREM_TENOR_CODE","LIQD_PREM_TENOR_UNIT","RATE_CODE_USAGE","TOM_DIFF_RATE"]};
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
var lovInfoFlds = {"BLK_LFTM_TREASURY_RATE_CODE__DOMICILE_CCY__LOV_DOMICILE_CCY":["BLK_LFTM_TREASURY_RATE_CODE__DOMICILE_CCY~BLK_LFTM_TREASURY_RATE_CODE__CCY_DESC~","","N~N",""],"BLK_LFTM_TREASURY_RATE_CODE__CCY_CODE__LOV_CCY_CODE":["BLK_LFTM_TREASURY_RATE_CODE__CCY_CODE~BLK_LFTM_TREASURY_RATE_CODE__CCY_DESC~","","N~N",""],"BLK_LFTM_TREASURY_RATE_CODE__RATE_CODE__LOV_RATE_CODE":["BLK_LFTM_TREASURY_RATE_CODE__RATE_CODE~BLK_LFTM_TREASURY_RATE_CODE__RATE_CODE_DESC~BLK_LFTM_TREASURY_RATE_CODE__RATE_CODE_USAGE~","","N~N~N",""],"BLK_LFTM_TREASURY_RATE_CODE__TREASURY_GROUP__LOV_TREASURY_CODE":["BLK_LFTM_TREASURY_RATE_CODE__TREASURY_GROUP~BLK_LFTM_TREASURY_RATE_CODE__TREASURY_DESC~","","N~N",""]};
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

ArrFuncOrigin["LFDTRATE"]="KERNEL";
ArrPrntFunc["LFDTRATE"]="";
ArrPrntOrigin["LFDTRATE"]="";
ArrRoutingType["LFDTRATE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFDTRATE"]="N";
ArrCustomModified["LFDTRATE"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":""};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":""};
var scrArgDest = {"CVS_MAIN":""};
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