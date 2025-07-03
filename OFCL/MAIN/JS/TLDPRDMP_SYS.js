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
**  File Name          : TLDPRDMP_SYS.js
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
var fieldNameArray = {"BLK_IFTM_PRODUCT_MAPPING":"DESK_CODE~BRANCH~PRODUCT_CODE~TXT_BRANCH~TXT_PRODUCT_DESC~TRADECLAIM~SETTLEMENTAPPLICABLE~CLPPRODUCT~TXT_DESK_DESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_IFTM_PRODUCT_MAPPING">DESK_CODE~BRANCH~PRODUCT_CODE~TXT_BRANCH~TXT_PRODUCT_DESC~TRADECLAIM~SETTLEMENTAPPLICABLE~CLPPRODUCT~TXT_DESK_DESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PRODUCT_MAPPING";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_IFTM_PRODUCT_MAPPING">AUTHSTAT~TXNSTAT~DESK_CODE~BRANCH~SETTLEMENTAPPLICABLE~PRODUCT_CODE~CLPPRODUCT~TRADECLAIM</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDPRDMP";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_IFTM_PRODUCT_MAPPING";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_IFTM_PRODUCT_MAPPING" : ""}; 

 var dataSrcLocationArray = new Array("BLK_IFTM_PRODUCT_MAPPING"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDPRDMP.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDPRDMP.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_IFTM_PRODUCT_MAPPING__TRADECLAIM";
pkFields[0] = "BLK_IFTM_PRODUCT_MAPPING__TRADECLAIM";
queryFields[1] = "BLK_IFTM_PRODUCT_MAPPING__CLPPRODUCT";
pkFields[1] = "BLK_IFTM_PRODUCT_MAPPING__CLPPRODUCT";
queryFields[2] = "BLK_IFTM_PRODUCT_MAPPING__SETTLEMENTAPPLICABLE";
pkFields[2] = "BLK_IFTM_PRODUCT_MAPPING__SETTLEMENTAPPLICABLE";
queryFields[3] = "BLK_IFTM_PRODUCT_MAPPING__BRANCH";
pkFields[3] = "BLK_IFTM_PRODUCT_MAPPING__BRANCH";
queryFields[4] = "BLK_IFTM_PRODUCT_MAPPING__DESK_CODE";
pkFields[4] = "BLK_IFTM_PRODUCT_MAPPING__DESK_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_IFTM_PRODUCT_MAPPING":["PRODUCT_CODE"]};
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
var lovInfoFlds = {"BLK_IFTM_PRODUCT_MAPPING__DESK_CODE__LOV_DESK_CODE":["BLK_IFTM_PRODUCT_MAPPING__DESK_CODE~BLK_IFTM_PRODUCT_MAPPING__TXT_DESK_DESC~","","N~N",""],"BLK_IFTM_PRODUCT_MAPPING__BRANCH__LOV_BRANCH_CODE":["BLK_IFTM_PRODUCT_MAPPING__BRANCH~BLK_IFTM_PRODUCT_MAPPING__TXT_BRANCH~","","N~N",""],"BLK_IFTM_PRODUCT_MAPPING__PRODUCT_CODE__LOV_PRODUCT_CODE":["BLK_IFTM_PRODUCT_MAPPING__PRODUCT_CODE~BLK_IFTM_PRODUCT_MAPPING__TXT_PRODUCT_DESC~","","N~N",""]};
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

ArrFuncOrigin["TLDPRDMP"]="KERNEL";
ArrPrntFunc["TLDPRDMP"]="";
ArrPrntOrigin["TLDPRDMP"]="";
ArrRoutingType["TLDPRDMP"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDPRDMP"]="N";
ArrCustomModified["TLDPRDMP"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------