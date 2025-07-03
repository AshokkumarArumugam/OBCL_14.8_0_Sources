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
**  File Name          : LBDAGYIB_SYS.js
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
var fieldNameArray = {"BLK_AGENCY_WRAPPER_BROWSER":"PROCESSING_DATE~PARTICIPANT~AGENCY_ESN~WRAPPER_PARTICIPANT~EXPENSE_CODE~PRODUCT_CODE~WRAPPER_REF_NO~EVENT_VALUE_DATE~PROCESSING_STATUS~AGENCY_REF_NO~AGENCY_EVENT_CODE~WRAPPER_EVENT_CODE~WRAPPER_ESN~TXT_CURRENCY~TXT_BRANCH_CODE~TXT_SILENT_PART~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_WRAPPER_TR_DD_SUMMARY":"WRAPPER_EVENT_SEQ_NO~AGENCY_ESN~AGENCY_REF_NO~WRAPPER_REF_NO~PARTICIPANT~PROCESS_STATUS","BLK_UPLOAD_EXCEPTION_CS":"SOURCE_REF~ERROR_CODE_TYPE~BRANCH_CODE~UPLOAD_ID~ERROR_CODE~SOURCE_CODE~ERROR_PARAMETERS"};

var multipleEntryPageSize = {"BLK_WRAPPER_TR_DD_SUMMARY" :"15" ,"BLK_UPLOAD_EXCEPTION_CS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_WRAPPER_TR_DD_SUMMARY~BLK_UPLOAD_EXCEPTION_CS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AGENCY_WRAPPER_BROWSER">PROCESSING_DATE~PARTICIPANT~AGENCY_ESN~WRAPPER_PARTICIPANT~EXPENSE_CODE~PRODUCT_CODE~WRAPPER_REF_NO~EVENT_VALUE_DATE~PROCESSING_STATUS~AGENCY_REF_NO~AGENCY_EVENT_CODE~WRAPPER_EVENT_CODE~WRAPPER_ESN~TXT_CURRENCY~TXT_BRANCH_CODE~TXT_SILENT_PART~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_AGENCY_WRAPPER_BROWSER" RELATION_TYPE="N" TYPE="BLK_WRAPPER_TR_DD_SUMMARY">WRAPPER_EVENT_SEQ_NO~AGENCY_ESN~AGENCY_REF_NO~WRAPPER_REF_NO~PARTICIPANT~PROCESS_STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_AGENCY_WRAPPER_BROWSER" RELATION_TYPE="N" TYPE="BLK_UPLOAD_EXCEPTION_CS">SOURCE_REF~ERROR_CODE_TYPE~BRANCH_CODE~UPLOAD_ID~ERROR_CODE~SOURCE_CODE~ERROR_PARAMETERS</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AGENCY_WRAPPER_BROWSER">AUTHSTAT~TXNSTAT~AGENCY_REF_NO~AGENCY_ESN~AGENCY_EVENT_CODE~PARTICIPANT~PROCESSING_DATE~WRAPPER_REF_NO~WRAPPER_ESN~WRAPPER_EVENT_CODE~EXPENSE_CODE~PRODUCT_CODE~PROCESSING_STATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDAGYIB";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="B";
var g_SummaryBtnCount =1;
var g_SummaryBlock ="BLK_AGENCY_WRAPPER_BROWSER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_AGENCY_WRAPPER_BROWSER" : "","BLK_WRAPPER_TR_DD_SUMMARY" : "BLK_AGENCY_WRAPPER_BROWSER~N","BLK_UPLOAD_EXCEPTION_CS" : "BLK_AGENCY_WRAPPER_BROWSER~N"}; 

 var dataSrcLocationArray = new Array("BLK_AGENCY_WRAPPER_BROWSER","BLK_WRAPPER_TR_DD_SUMMARY","BLK_UPLOAD_EXCEPTION_CS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDAGYIB.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDAGYIB.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_AGENCY_WRAPPER_BROWSER__AGENCY_REF_NO";
pkFields[0] = "BLK_AGENCY_WRAPPER_BROWSER__AGENCY_REF_NO";
queryFields[1] = "BLK_AGENCY_WRAPPER_BROWSER__AGENCY_ESN";
pkFields[1] = "BLK_AGENCY_WRAPPER_BROWSER__AGENCY_ESN";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_AGENCY_WRAPPER_BROWSER":["EXPENSE_CODE","PROCESSING_STATUS","PRODUCT_CODE"]};
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
var multipleEntryIDs = new Array("BLK_WRAPPER_TR_DD_SUMMARY","BLK_UPLOAD_EXCEPTION_CS");
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

ArrFuncOrigin["LBDAGYIB"]="KERNEL";
ArrPrntFunc["LBDAGYIB"]="";
ArrPrntOrigin["LBDAGYIB"]="";
ArrRoutingType["LBDAGYIB"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDAGYIB"]="N";
ArrCustomModified["LBDAGYIB"]="N";

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