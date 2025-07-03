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
**  File Name          : TLDFAMCC_SYS.js
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
var fieldNameArray = {"BLK_TLTMS_FIRMAC_MCC_DETAIL":"FIEM_ACCT_MNEMONIC~PORTFOLIO~MCC~HYPERION_CODE~PORTFOLIO_CREATION_STAT~LEGAL_ENTITY_CODE~SUB_STRATEGY_CODE~EXPENSE_CODE~STRATEGY_DESC~STRATEGY_CODE~LS_LD_MAPPING_CREATION_STAT","BLK_TLTBS_PORT_UPL_ERROR":"ERROR_MESSAGE~MCC~FIRM_ACCT_MNEMONIC"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTMS_FIRMAC_MCC_DETAIL">FIEM_ACCT_MNEMONIC~PORTFOLIO~MCC~HYPERION_CODE~PORTFOLIO_CREATION_STAT~LEGAL_ENTITY_CODE~SUB_STRATEGY_CODE~EXPENSE_CODE~STRATEGY_DESC~STRATEGY_CODE~LS_LD_MAPPING_CREATION_STAT</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTMS_FIRMAC_MCC_DETAIL" RELATION_TYPE="1" TYPE="BLK_TLTBS_PORT_UPL_ERROR">ERROR_MESSAGE~MCC~FIRM_ACCT_MNEMONIC</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTMS_FIRMAC_MCC_DETAIL">FIEM_ACCT_MNEMONIC~MCC~EXPENSE_CODE~STRATEGY_CODE~SUB_STRATEGY_CODE~LEGAL_ENTITY_CODE~HYPERION_CODE~STRATEGY_DESC~PORTFOLIO~PORTFOLIO_CREATION_STAT~LS_LD_MAPPING_CREATION_STAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDFAMCC";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="B";
var g_SummaryBtnCount =2;
var g_SummaryBlock ="BLK_TLTMS_FIRMAC_MCC_DETAIL";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTMS_FIRMAC_MCC_DETAIL" : "","BLK_TLTBS_PORT_UPL_ERROR" : "BLK_TLTMS_FIRMAC_MCC_DETAIL~1"}; 

 var dataSrcLocationArray = new Array("BLK_TLTMS_FIRMAC_MCC_DETAIL","BLK_TLTBS_PORT_UPL_ERROR"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDFAMCC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDFAMCC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTMS_FIRMAC_MCC_DETAIL__FIEM_ACCT_MNEMONIC";
pkFields[0] = "BLK_TLTMS_FIRMAC_MCC_DETAIL__FIEM_ACCT_MNEMONIC";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var modifyAmendArr = new Array(); 
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

ArrFuncOrigin["TLDFAMCC"]="KERNEL";
ArrPrntFunc["TLDFAMCC"]="";
ArrPrntOrigin["TLDFAMCC"]="";
ArrRoutingType["TLDFAMCC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDFAMCC"]="N";
ArrCustomModified["TLDFAMCC"]="N";

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