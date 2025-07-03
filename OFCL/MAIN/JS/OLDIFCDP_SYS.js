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
**  File Name          : OLDIFCDP_SYS.js
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
var fieldNameArray = {"BLK_OLTB_IF_PRODUCT_MASTER":"ENDDATE~MAXIMUMRATEVARIANCE~MAXTENOR~MINTENOR~MODULECODE~NORMALRATEVARIANCE~PRODUCTCODE~PRODUCTTYPE~RATECODEPREF~RECORDSTAT~SOURCE~STARTDATE~STDTENOR~TENORUNIT~LIQD_MODE~PROD_DESC","BLK_OLTB_IF_PRODUCT_ICCF":"COMPONENT~COMPONENTDESCRIPTION~EXTERNALREFNUM~MODULECODE~PRODUCTCODE~RATECODE~RATECODEUSAGE~RATETYPE~SOURCE","BLK_OLTB_IF_PRODUCT_LIQ_ORDER":"COMPONENT~LIQ_ORDER~MODULE_CODE~PRODUCT"};

var multipleEntryPageSize = {"BLK_OLTB_IF_PRODUCT_ICCF" :"15" ,"BLK_OLTB_IF_PRODUCT_LIQ_ORDER" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTB_IF_PRODUCT_ICCF~BLK_OLTB_IF_PRODUCT_LIQ_ORDER"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTB_IF_PRODUCT_MASTER">ENDDATE~MAXIMUMRATEVARIANCE~MAXTENOR~MINTENOR~MODULECODE~NORMALRATEVARIANCE~PRODUCTCODE~PRODUCTTYPE~RATECODEPREF~RECORDSTAT~SOURCE~STARTDATE~STDTENOR~TENORUNIT~LIQD_MODE~PROD_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTB_IF_PRODUCT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTB_IF_PRODUCT_ICCF">COMPONENT~COMPONENTDESCRIPTION~EXTERNALREFNUM~MODULECODE~PRODUCTCODE~RATECODE~RATECODEUSAGE~RATETYPE~SOURCE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTB_IF_PRODUCT_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTB_IF_PRODUCT_LIQ_ORDER">COMPONENT~LIQ_ORDER~MODULE_CODE~PRODUCT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTB_IF_PRODUCT_MASTER" : "","BLK_OLTB_IF_PRODUCT_ICCF" : "BLK_OLTB_IF_PRODUCT_MASTER~N","BLK_OLTB_IF_PRODUCT_LIQ_ORDER" : "BLK_OLTB_IF_PRODUCT_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTB_IF_PRODUCT_MASTER","BLK_OLTB_IF_PRODUCT_ICCF","BLK_OLTB_IF_PRODUCT_LIQ_ORDER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDIFCDP.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDIFCDP.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTB_IF_PRODUCT_MASTER__PRODUCTCODE";
pkFields[0] = "BLK_OLTB_IF_PRODUCT_MASTER__PRODUCTCODE";
queryFields[1] = "BLK_OLTB_IF_PRODUCT_MASTER__MODULECODE";
pkFields[1] = "BLK_OLTB_IF_PRODUCT_MASTER__MODULECODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTB_IF_PRODUCT_ICCF":["COMPONENTDESCRIPTION","EXTERNALREFNUM","RATECODE","RATECODEUSAGE","RATETYPE","SOURCE"],"BLK_OLTB_IF_PRODUCT_LIQ_ORDER":["LIQ_ORDER"],"BLK_OLTB_IF_PRODUCT_MASTER":["ENDDATEI","LIQD_MODE","MAXIMUMRATEVARIANCE","MAXTENOR","MINTENOR","NORMALRATEVARIANCE","PRODUCTTYPE","PROD_DESC","RATECODEPREF","RECORDSTAT","SOURCE","STARTDATEI","STDTENOR","TENORUNIT"]};
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
var lovInfoFlds = {};
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
var multipleEntryIDs = new Array("BLK_OLTB_IF_PRODUCT_ICCF","BLK_OLTB_IF_PRODUCT_LIQ_ORDER");
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

ArrFuncOrigin["OLDIFCDP"]="KERNEL";
ArrPrntFunc["OLDIFCDP"]="";
ArrPrntOrigin["OLDIFCDP"]="";
ArrRoutingType["OLDIFCDP"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDIFCDP"]="N";
ArrCustomModified["OLDIFCDP"]="N";

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