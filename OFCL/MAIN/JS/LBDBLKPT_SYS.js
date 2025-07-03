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
**  File Name          : LBDBLKPT_SYS.js
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
var fieldNameArray = {"BLK_BULK_PYMNT_MASTER":"PROCESS_REF_NO~SIMULATE~COUNTERPARTY~PROCESSING_DATE~ACTION_CODE~FINAL_RESPONSE_STATUS~CURRENCY~TOTAL_AMOUNT_PAID","BLK_PYMNT_HDR":"CONTRACT_REF_NO~BRANCH~CCY~COUNTERPARTY~TXT_RES_STATUS~LATEST_EVENT_SEQ_NO~USER_DEFINED_STATUS","BLK_PYMNT_SUMMARY":"CONTRACT_REF_NO~EVENT_SEQ_NO~VALUE_DATE~LIMIT_DATE~SCH_DATE~TOTAL_PAID","BLK_PYMT_DETAILS":"CONTRACT_REF_NO~EVENT_SEQ_NO~COMPONENT~AMOUNT_DUE~OVERDUE_DAYS~AMOUNT_PAID~TAX_PAID","BLK_ERROR_RESP":"CONTRACT_REF_NO~EVENT_SEQ_NO~OVD_SEQ_NO~ERR_CODE~ERR_DESC~ERR_TYPE"};

var multipleEntryPageSize = {"BLK_PYMNT_HDR" :"15" ,"BLK_PYMNT_SUMMARY" :"15" ,"BLK_PYMT_DETAILS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_PYMNT_HDR~BLK_PYMNT_SUMMARY~BLK_PYMT_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BULK_PYMNT_MASTER">PROCESS_REF_NO~SIMULATE~COUNTERPARTY~PROCESSING_DATE~ACTION_CODE~FINAL_RESPONSE_STATUS~CURRENCY~TOTAL_AMOUNT_PAID</FN>'; 
msgxml += '      <FN PARENT="BLK_BULK_PYMNT_MASTER" RELATION_TYPE="N" TYPE="BLK_PYMNT_HDR">CONTRACT_REF_NO~BRANCH~CCY~COUNTERPARTY~TXT_RES_STATUS~LATEST_EVENT_SEQ_NO~USER_DEFINED_STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_PYMNT_HDR" RELATION_TYPE="N" TYPE="BLK_PYMNT_SUMMARY">CONTRACT_REF_NO~EVENT_SEQ_NO~VALUE_DATE~LIMIT_DATE~SCH_DATE~TOTAL_PAID</FN>'; 
msgxml += '      <FN PARENT="BLK_PYMNT_SUMMARY" RELATION_TYPE="N" TYPE="BLK_PYMT_DETAILS">CONTRACT_REF_NO~EVENT_SEQ_NO~COMPONENT~AMOUNT_DUE~OVERDUE_DAYS~AMOUNT_PAID~TAX_PAID</FN>'; 
msgxml += '      <FN PARENT="BLK_PYMNT_HDR" RELATION_TYPE="N" TYPE="BLK_ERROR_RESP">CONTRACT_REF_NO~EVENT_SEQ_NO~OVD_SEQ_NO~ERR_CODE~ERR_DESC~ERR_TYPE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BULK_PYMNT_MASTER" : "","BLK_PYMNT_HDR" : "BLK_BULK_PYMNT_MASTER~N","BLK_PYMNT_SUMMARY" : "BLK_PYMNT_HDR~N","BLK_PYMT_DETAILS" : "BLK_PYMNT_SUMMARY~N","BLK_ERROR_RESP" : "BLK_PYMNT_HDR~N"}; 

 var dataSrcLocationArray = new Array("BLK_BULK_PYMNT_MASTER","BLK_PYMNT_HDR","BLK_PYMNT_SUMMARY","BLK_PYMT_DETAILS","BLK_ERROR_RESP"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDBLKPT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDBLKPT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BULK_PYMNT_MASTER__PROCESS_REF_NO";
pkFields[0] = "BLK_BULK_PYMNT_MASTER__PROCESS_REF_NO";
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
var multipleEntryIDs = new Array("BLK_PYMNT_HDR","BLK_PYMNT_SUMMARY","BLK_PYMT_DETAILS");
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

ArrFuncOrigin["LBDBLKPT"]="KERNEL";
ArrPrntFunc["LBDBLKPT"]="";
ArrPrntOrigin["LBDBLKPT"]="";
ArrRoutingType["LBDBLKPT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDBLKPT"]="N";
ArrCustomModified["LBDBLKPT"]="N";

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