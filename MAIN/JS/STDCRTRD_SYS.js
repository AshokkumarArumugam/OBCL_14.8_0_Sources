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
**  File Name          : STDCRTRD_SYS.js
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
var fieldNameArray = {"BLK_STTM_CORE_TRADE_CONTRACT":"HOST_CODE~TRADE_CONTRACT_NO~TRADE_CONTRACT_BRN~TRADE_CUSTOMER_NO~TRADE_CONTRACT_CCY~TRADE_CONTRACT_STATUS~SOURCE_SYSTEM~SOURCE_SYSTEM_CONT_BRN~SOURCE_SYSTEM_CONT_NO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_STTM_CORE_TRADE_CONTRACT">HOST_CODE~TRADE_CONTRACT_NO~TRADE_CONTRACT_BRN~TRADE_CUSTOMER_NO~TRADE_CONTRACT_CCY~TRADE_CONTRACT_STATUS~SOURCE_SYSTEM~SOURCE_SYSTEM_CONT_BRN~SOURCE_SYSTEM_CONT_NO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_STTM_CORE_TRADE_CONTRACT">AUTHSTAT~TXNSTAT~TRADE_CONTRACT_NO~TRADE_CUSTOMER_NO~TRADE_CONTRACT_STATUS~SOURCE_SYSTEM_CONT_BRN~SOURCE_SYSTEM~SOURCE_SYSTEM_CONT_NO~TRADE_CONTRACT_CCY~TRADE_CONTRACT_BRN</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "STDCRTRD";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_STTM_CORE_TRADE_CONTRACT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_STTM_CORE_TRADE_CONTRACT" : ""}; 

 var dataSrcLocationArray = new Array("BLK_STTM_CORE_TRADE_CONTRACT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside STDCRTRD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside STDCRTRD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CONTRACT_NO";
pkFields[0] = "BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CONTRACT_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_STTM_CORE_TRADE_CONTRACT":["TRADE_CONTRACT_STATUS"]};
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
var lovInfoFlds = {"BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CONTRACT_BRN__LOV_AC_BRN":["BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CONTRACT_BRN~~","","N~N",""],"BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CUSTOMER_NO__LOV_CUST_NO":["BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CUSTOMER_NO~~","","N~N",""],"BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CONTRACT_CCY__LOV_AC_CCY":["BLK_STTM_CORE_TRADE_CONTRACT__TRADE_CONTRACT_CCY~~","","N~N",""],"BLK_STTM_CORE_TRADE_CONTRACT__SOURCE_SYSTEM__LOV_ECA_SYSTEM":["BLK_STTM_CORE_TRADE_CONTRACT__SOURCE_SYSTEM~~","","N~N",""],"BLK_STTM_CORE_TRADE_CONTRACT__SOURCE_SYSTEM_CONT_BRN__LOV_AC_BRN":["BLK_STTM_CORE_TRADE_CONTRACT__SOURCE_SYSTEM_CONT_BRN~~","","N~N",""]};
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

ArrFuncOrigin["STDCRTRD"]="KERNEL";
ArrPrntFunc["STDCRTRD"]="";
ArrPrntOrigin["STDCRTRD"]="";
ArrRoutingType["STDCRTRD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["STDCRTRD"]="N";
ArrCustomModified["STDCRTRD"]="N";

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