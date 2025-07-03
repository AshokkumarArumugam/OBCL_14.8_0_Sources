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
**  File Name          : LPDPRMNT_SYS.js
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
var fieldNameArray = {"BLK_OLTMS_PRODUCT":"PRODUCTCODE~PRODUCTDESCRIPTION~PRODUCTTYPE~MODULE~PRODUCTSLOGAN~PRODUCTREMARKS~PRODUCTSTARTDATE~PRODUCTENDDATE~PRODUCTGROUP~NORMALRATEVARIANCE~MAXIMUMRATEVARIANCE~FORMATNAME~PRODCODE~AUTOCOLLECTION~AUTOINITIATION~BORROWERPRODUCTCODE~TXTLINKBORRPRODUCT~TXTPRODDESC~BRNLST~CCYLST~CATGLIS~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_PRODUCT">PRODUCTCODE~PRODUCTDESCRIPTION~PRODUCTTYPE~MODULE~PRODUCTSLOGAN~PRODUCTREMARKS~PRODUCTSTARTDATE~PRODUCTENDDATE~PRODUCTGROUP~NORMALRATEVARIANCE~MAXIMUMRATEVARIANCE~FORMATNAME~PRODCODE~AUTOCOLLECTION~AUTOINITIATION~BORROWERPRODUCTCODE~TXTLINKBORRPRODUCT~TXTPRODDESC~BRNLST~CCYLST~CATGLIS~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PRODUCT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_PRODUCT">AUTHSTAT~TXNSTAT~PRODUCTCODE~PRODUCTDESCRIPTION~PRODUCTTYPE~MODULE~PRODUCTSLOGAN~PRODUCTREMARKS~PRODUCTSTARTDATE~PRODUCTENDDATE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LPDPRMNT";
var defaultWhereClause = "module = 'LP'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="MODULE = 'LP'";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTMS_PRODUCT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTMS_PRODUCT" : ""}; 

 var dataSrcLocationArray = new Array("BLK_OLTMS_PRODUCT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LPDPRMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LPDPRMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTMS_PRODUCT__PRODUCTCODE";
pkFields[0] = "BLK_OLTMS_PRODUCT__PRODUCTCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTMS_PRODUCT":["AUTOCOLLECTION","AUTOINITIATION","MAXIMUMRATEVARIANCE","NORMALRATEVARIANCE","PRODUCTDESCRIPTION","PRODUCTENDDATEI","PRODUCTGROUP","PRODUCTSLOGAN","PRODUCTSTARTDATEI"]};
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
var lovInfoFlds = {"BLK_OLTMS_PRODUCT__PRODUCTGROUP__LOV_GROUP":["BLK_OLTMS_PRODUCT__PRODUCTGROUP~~","","N~N",""],"BLK_OLTMS_PRODUCT__FORMATNAME__LOV_FORMATNAME":["BLK_OLTMS_PRODUCT__FORMATNAME~~","","N~N",""],"BLK_OLTMS_PRODUCT__BORROWERPRODUCTCODE__LOV_BORROWER_PROD":["BLK_OLTMS_PRODUCT__BORROWERPRODUCTCODE~BLK_OLTMS_PRODUCT__TXTLINKBORRPRODUCT~","BLK_OLTMS_PRODUCT__PRODUCTTYPE!~BLK_OLTMS_PRODUCT__PRODUCTTYPE!~BLK_OLTMS_PRODUCT__PRODUCTCODE!~BLK_OLTMS_PRODUCT__PRODUCTCODE!","N~N",""]};
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

 var CallFormArray= new Array("OLCACRHM~BLK_OLTMS_PRODUCT","OLCACADD~BLK_OLTMS_PRODUCT","OLCPRMNT~BLK_OLTMS_PRODUCT","LFCLSFEE~BLK_OLTMS_PRODUCT","LFCPRDIA~BLK_OLTMS_PRODUCT","LFCPRTAX~BLK_OLTMS_PRODUCT","LFCLPICF~BLK_OLTMS_PRODUCT"); 

 var CallFormRelat=new Array("OLTMS_PRODUCT.PRODUCT_CODE = OLTMS_PRODUCT__RH.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=CSTM_PRODUCT__AC.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=OLTMS_PRODUCT__MI.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=CSTMS_PRODUCT_FE.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=OLTMS_PRODUCT__DY.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=OLTMS_PRODUCT__TA.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE = OLTMS_PRODUCT__IC.PRODUCT_CODE"); 

 var CallRelatType= new Array("1","1","1","1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LPDPRMNT"]="KERNEL";
ArrPrntFunc["LPDPRMNT"]="";
ArrPrntOrigin["LPDPRMNT"]="";
ArrRoutingType["LPDPRMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LPDPRMNT"]="N";
ArrCustomModified["LPDPRMNT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PREFERENCE":"PRODCODE~PRODDESC","OLCACRHM":"MODULE~PRDCD~PRDDESC~PRDTYP~PRD","OLCACADD":"MODULE~PRDCD~PRDDESC~PRDTYP","OLCPRMNT":"PRDCD","LFCLSFEE":"PROD~PRODDESC~MODU~PRODTYPE","LFCPRDIA":"PRDCD~PRDDESC~MODU~PRDTYP","LFCPRTAX":"PRDCD~PRDDESC~MODU~PRDTYP","LFCLPICF":"PRDCD~PRDDESC~MODULE"};
var scrArgSource = {"CVS_PREFERENCE":"BLK_OLTMS_PRODUCT__PRODUCTCODE~BLK_OLTMS_PRODUCT__PRODUCTDESCRIPTION","OLCACRHM":"BLK_OLTMS_PRODUCT__MODULE~BLK_OLTMS_PRODUCT__PRODUCTCODE~BLK_OLTMS_PRODUCT__PRODUCTDESCRIPTION~BLK_OLTMS_PRODUCT__PRODUCTTYPE~BLK_OLTMS_PRODUCT__PRODUCTCODE","OLCACADD":"BLK_OLTMS_PRODUCT__MODULE~BLK_OLTMS_PRODUCT__PRODUCTCODE~BLK_OLTMS_PRODUCT__PRODUCTDESCRIPTION~BLK_OLTMS_PRODUCT__PRODUCTTYPE","OLCPRMNT":"BLK_OLTMS_PRODUCT__PRODUCTCODE","LFCLSFEE":"BLK_OLTMS_PRODUCT__PRODUCTCODE~BLK_OLTMS_PRODUCT__PRODUCTDESCRIPTION~BLK_OLTMS_PRODUCT__MODULE~BLK_OLTMS_PRODUCT__PRODUCTTYPE","LFCPRDIA":"BLK_OLTMS_PRODUCT__PRODUCTCODE~BLK_OLTMS_PRODUCT__PRODUCTDESCRIPTION~BLK_OLTMS_PRODUCT__MODULE~BLK_OLTMS_PRODUCT__PRODUCTTYPE","LFCPRTAX":"BLK_OLTMS_PRODUCT__PRODUCTCODE~BLK_OLTMS_PRODUCT__PRODUCTDESCRIPTION~BLK_OLTMS_PRODUCT__MODULE~BLK_OLTMS_PRODUCT__PRODUCTTYPE","LFCLPICF":"BLK_OLTMS_PRODUCT__PRODUCTCODE~BLK_OLTMS_PRODUCT__PRODUCTDESCRIPTION~BLK_OLTMS_PRODUCT__MODULE"};
var scrArgVals = {"CVS_PREFERENCE":"~","OLCACRHM":"~~~~","OLCACADD":"~~~","OLCPRMNT":"","LFCLSFEE":"~~~","LFCPRDIA":"~~~","LFCPRTAX":"~~~","LFCLPICF":"~~"};
var scrArgDest = {"CVS_PREFERENCE":"BLK_OLTMS_PRODUCT__PRODCODE~BLK_OLTMS_PRODUCT__TXTPRODDESC"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCACRHM":"","OLCACADD":"","OLCPRMNT":"","LFCLSFEE":"","LFCPRDIA":"","LFCPRTAX":"","LFCLPICF":""};
var dpndntOnSrvs = {"OLCACRHM":"","OLCACADD":"","OLCPRMNT":"","LFCLSFEE":"","LFCPRDIA":"","LFCPRTAX":"","LFCLPICF":""};
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