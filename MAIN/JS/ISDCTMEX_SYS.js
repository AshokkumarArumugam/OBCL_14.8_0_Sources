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
**  File Name          : ISDCTMEX_SYS.js
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
var fieldNameArray = {"BLK_MAIN":"NETWORK_CODE~CLEARING_CODE~COUNTRY_CODE~CLEARING_CODE_DESC~BANK_NAME~ADDRESS_1~ADDRESS_2~ADDRESS_3~ADDRESS_4~OWN_CLEARING_CODE~CLEARING_CODE_IND~BIC_CODE~CUSTOMER_NO~CLEARING_CODE_TYP~CHAR_FIELD44~CHAR_FIELD71~CHAR_FIELD73~CHAR_FIELD78~CHAR_FIELD75~CHAR_FIELD72~CHAR_FIELD39~BRANCH_INFO~CITY~CPS~ISO_COUNTRY_CODE~POB_NUMBER~ZIP_CODE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MAIN">NETWORK_CODE~CLEARING_CODE~COUNTRY_CODE~CLEARING_CODE_DESC~BANK_NAME~ADDRESS_1~ADDRESS_2~ADDRESS_3~ADDRESS_4~OWN_CLEARING_CODE~CLEARING_CODE_IND~BIC_CODE~CUSTOMER_NO~CLEARING_CODE_TYP~CHAR_FIELD44~CHAR_FIELD71~CHAR_FIELD73~CHAR_FIELD78~CHAR_FIELD75~CHAR_FIELD72~CHAR_FIELD39~BRANCH_INFO~CITY~CPS~ISO_COUNTRY_CODE~POB_NUMBER~ZIP_CODE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MAIN">AUTHSTAT~TXNSTAT~NETWORK_CODE~CLEARING_CODE~COUNTRY_CODE~CLEARING_CODE_DESC~BANK_NAME~ADDRESS_1~ADDRESS_2~ADDRESS_3~ADDRESS_4~OWN_CLEARING_CODE~CLEARING_CODE_IND~BIC_CODE~CUSTOMER_NO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "ISDCTMEX";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MAIN";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MAIN" : ""}; 

 var dataSrcLocationArray = new Array("BLK_MAIN"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside ISDCTMEX.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside ISDCTMEX.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MAIN__NETWORK_CODE";
pkFields[0] = "BLK_MAIN__NETWORK_CODE";
queryFields[1] = "BLK_MAIN__CLEARING_CODE";
pkFields[1] = "BLK_MAIN__CLEARING_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_MAIN":["ADDRESS_1","ADDRESS_2","ADDRESS_3","ADDRESS_4","BANK_NAME","BIC_CODE","BRANCH_INFO","CHAR_FIELD39","CHAR_FIELD44","CHAR_FIELD71","CHAR_FIELD72","CHAR_FIELD73","CHAR_FIELD75","CHAR_FIELD78","CITY","CLEARING_CODE_DESC","CLEARING_CODE_IND","CLEARING_CODE_TYP","COUNTRY_CODE","CPS","CUSTOMER_NO","ISO_COUNTRY_CODE","OWN_CLEARING_CODE","POB_NUMBER","ZIP_CODE"]};
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
var lovInfoFlds = {"BLK_MAIN__NETWORK_CODE__LOV_NETWORK_CODE":["BLK_MAIN__NETWORK_CODE~BLK_MAIN__CHAR_FIELD75~~BLK_MAIN__CHAR_FIELD73~BLK_MAIN__CHAR_FIELD71~","","N~N~N~N~N",""],"BLK_MAIN__COUNTRY_CODE__LOV_COUNTRY_CODE":["BLK_MAIN__COUNTRY_CODE~BLK_MAIN__CHAR_FIELD72~","","N~N",""],"BLK_MAIN__OWN_CLEARING_CODE__LOV_OWN_CLRG_CODE":["BLK_MAIN__OWN_CLEARING_CODE~~","BLK_MAIN__NETWORK_CODE!VARCHAR2","N~N",""],"BLK_MAIN__BIC_CODE__LOV_BIC_CODE":["BLK_MAIN__BIC_CODE~BLK_MAIN__CHAR_FIELD78~","","N~N",""],"BLK_MAIN__CUSTOMER_NO__LOV_CUSTOMER":["BLK_MAIN__CUSTOMER_NO~","","N",""]};
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

ArrFuncOrigin["ISDCTMEX"]="KERNEL";
ArrPrntFunc["ISDCTMEX"]="";
ArrPrntOrigin["ISDCTMEX"]="";
ArrRoutingType["ISDCTMEX"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["ISDCTMEX"]="N";
ArrCustomModified["ISDCTMEX"]="N";

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