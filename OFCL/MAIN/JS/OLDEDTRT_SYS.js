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
**  File Name          : OLDEDTRT_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"CONTRACT_REF_NO~PRODUCT_CODE~TXNSTAT~AUTHSTAT","BLK_LFTBS_CONTRACT_INTEREST":"CONTRACT_REFERENCE_NO~COMPONENT~UI_COMPONENT_DESCRIPTION","BLK_LFTBS_CONTRACT_AGENCY_RATE":"CONTRACT_REF_NO~COMPONENT~EFFECTIVE_DATE~BASE_RATE~SPREAD~FINAL_RATE~STATUS","BLK_OLTBS_CONTRACT_EVENT_LOG":"CHECKER_DT_STAMP~AUTHSTAT~WORKFLOW_STATUS~CHECKER_ID~TXNSTAT~CONTRACT_REF_NO~REVERSED_EVENT_SEQ_NO~EVENT_SEQ_NO~EVENT_CODE~MODULE~NEW_VERSION_INDICATOR~MAKER_ID~MAKER_DT_STAMP~UI_AUTH_STATUS~UI_CONTRACT_STATUS"};

var multipleEntryPageSize = {"BLK_LFTBS_CONTRACT_INTEREST" :"15" ,"BLK_LFTBS_CONTRACT_AGENCY_RATE" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LFTBS_CONTRACT_INTEREST~BLK_LFTBS_CONTRACT_AGENCY_RATE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONTRACT_REF_NO~PRODUCT_CODE~TXNSTAT~AUTHSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_LFTBS_CONTRACT_INTEREST">CONTRACT_REFERENCE_NO~COMPONENT~UI_COMPONENT_DESCRIPTION</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_INTEREST" RELATION_TYPE="N" TYPE="BLK_LFTBS_CONTRACT_AGENCY_RATE">CONTRACT_REF_NO~COMPONENT~EFFECTIVE_DATE~BASE_RATE~SPREAD~FINAL_RATE~STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">CHECKER_DT_STAMP~AUTHSTAT~WORKFLOW_STATUS~CHECKER_ID~TXNSTAT~CONTRACT_REF_NO~REVERSED_EVENT_SEQ_NO~EVENT_SEQ_NO~EVENT_CODE~MODULE~NEW_VERSION_INDICATOR~MAKER_ID~MAKER_DT_STAMP~UI_AUTH_STATUS~UI_CONTRACT_STATUS</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONTRACT_REF_NO~PRODUCT_CODE~AUTHSTAT~TXNSTAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDEDTRT";
var defaultWhereClause = "module_code='OL' and product_type='L' and EXISTS (SELECT DISTINCT(component) FROM LFTBS_CONTRACT_INTEREST WHERE contract_reference_no = SUMMARYDSN.Contract_ref_no AND fixed_rate_type='A')";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_CONTRACT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_LFTBS_CONTRACT_INTEREST" : "BLK_OLTBS_CONTRACT~N","BLK_LFTBS_CONTRACT_AGENCY_RATE" : "BLK_LFTBS_CONTRACT_INTEREST~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_LFTBS_CONTRACT_INTEREST","BLK_LFTBS_CONTRACT_AGENCY_RATE","BLK_OLTBS_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDEDTRT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDEDTRT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACT_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTBS_CONTRACT_AGENCY_RATE":["BASE_RATE","EFFECTIVE_DATEI","SPREAD"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__CONTRACT_REF_NO__LOV_CONTRACT_REF_NO":["BLK_OLTBS_CONTRACT__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT__PRODUCT_CODE~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LFTBS_CONTRACT_INTEREST","BLK_LFTBS_CONTRACT_AGENCY_RATE");
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

ArrFuncOrigin["OLDEDTRT"]="KERNEL";
ArrPrntFunc["OLDEDTRT"]="";
ArrPrntOrigin["OLDEDTRT"]="";
ArrRoutingType["OLDEDTRT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDEDTRT"]="N";
ArrCustomModified["OLDEDTRT"]="N";

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