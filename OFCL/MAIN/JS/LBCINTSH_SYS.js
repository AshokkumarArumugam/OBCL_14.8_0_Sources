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
**  File Name          : LBCINTSH_SYS.js
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
var fieldNameArray = {"BLK_UI_BORROWER_DETAILS":"CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO~CONTRACT_CCY~UI_PRODUCT_CODE~UI_PRODUCT_DESC~UI_PRODUCT_TYPE~PRM_PRDT_CCY~UI_BORROWER_REF_NO~UI_USER_REF_NO~UI_BORROWER_AMOUNT_DUE~UI_BORROWER_AMOUNT_PAID~UI_CUSTOMER_NO~UI_CUSTOMER_DESC~UI_FACILITY~UI_TOTAL~PRM_LATEST_EVENT_SEQ_NO","BLK_LBTBS_PARTICIPANT_SHARE_AMT__LBCINTSH":"EVENT_SEQ_NO~CONSOL_REF_NO~TXT_CURRENCY~AMOUNT_PAID~TOTAL_OUTSTANDING~BORROWER_REF_NO~COMPONENT~VALUE_DATE~EVENT_CODE~PARTICIPANT_REF_NO~PARTICIPANT~PROCESS_STAT~UI_PARTICIPANT_NAME"};

var multipleEntryPageSize = {"BLK_LBTBS_PARTICIPANT_SHARE_AMT__LBCINTSH" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_LBCINTSH__TAB_MAIN":"BLK_LBTBS_PARTICIPANT_SHARE_AMT__LBCINTSH"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_UI_BORROWER_DETAILS">CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO~CONTRACT_CCY~UI_PRODUCT_CODE~UI_PRODUCT_DESC~UI_PRODUCT_TYPE~PRM_PRDT_CCY~UI_BORROWER_REF_NO~UI_USER_REF_NO~UI_BORROWER_AMOUNT_DUE~UI_BORROWER_AMOUNT_PAID~UI_CUSTOMER_NO~UI_CUSTOMER_DESC~UI_FACILITY~UI_TOTAL~PRM_LATEST_EVENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_UI_BORROWER_DETAILS" RELATION_TYPE="N" TYPE="BLK_LBTBS_PARTICIPANT_SHARE_AMT__LBCINTSH">EVENT_SEQ_NO~CONSOL_REF_NO~TXT_CURRENCY~AMOUNT_PAID~TOTAL_OUTSTANDING~BORROWER_REF_NO~COMPONENT~VALUE_DATE~EVENT_CODE~PARTICIPANT_REF_NO~PARTICIPANT~PROCESS_STAT~UI_PARTICIPANT_NAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_LBCINTSH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_UI_BORROWER_DETAILS" : "","BLK_LBTBS_PARTICIPANT_SHARE_AMT__LBCINTSH" : "BLK_UI_BORROWER_DETAILS~N"}; 

 var dataSrcLocationArray = new Array("BLK_UI_BORROWER_DETAILS","BLK_LBTBS_PARTICIPANT_SHARE_AMT__LBCINTSH"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCINTSH.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCINTSH.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_UI_BORROWER_DETAILS__CONTRACT_REF_NO";
pkFields[0] = "BLK_UI_BORROWER_DETAILS__CONTRACT_REF_NO";
queryFields[1] = "BLK_UI_BORROWER_DETAILS__LATEST_EVENT_SEQ_NO";
pkFields[1] = "BLK_UI_BORROWER_DETAILS__LATEST_EVENT_SEQ_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LBTBS_PARTICIPANT_SHARE_AMT":["LBCINTSH"]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_PARTICIPANT_SHARE_AMT__LBCINTSH");
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

ArrFuncOrigin["LBCINTSH"]="KERNEL";
ArrPrntFunc["LBCINTSH"]="";
ArrPrntOrigin["LBCINTSH"]="";
ArrRoutingType["LBCINTSH"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCINTSH"]="N";
ArrCustomModified["LBCINTSH"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_LBCINTSH":"CONT_REF_NO~ESN~TXT_PRM_INT_AMT~TXT_BORR_AMT_DUE"};
var scrArgSource = {};
var scrArgVals = {"CVS_LBCINTSH":"~~~"};
var scrArgDest = {"CVS_LBCINTSH":"BLK_UI_BORROWER_DETAILS__CONTRACT_REF_NO~BLK_UI_BORROWER_DETAILS__LATEST_EVENT_SEQ_NO~BLK_UI_BORROWER_DETAILS__PRM_INT_AMT~BLK_UI_BORROWER_DETAILS__PRM_BORR_AMT_DUE"};
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