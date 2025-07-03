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
**  File Name          : OLDTRINF_SYS.js
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
var fieldNameArray = {"BLK_HEAD":"REFNO~TXNFROMDATE~TXNTODATE~TXNFROMAMT~TXNTOAMT~STATUS~STATUS_DESCRIPTION~IS_WORST_STATUS","BLK_EVENT":"MODULE~CONTRACT_REF_NO~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~DESCRIPTION~AUTH_STATUS~MAKER_ID~CHECKER_ID~REVERSED_EVENT_SEQ_NO","BLK_ACCOUNT":"AC_BRANCH~AC_NO~AC_CCY~LCY~DRCR_IND~TRN_CODE~AMOUNT_TAG~FCY_AMOUNT~TRN_DT~VALUE_DT~TRN_REF_NO~AC_ENTRY_SR_NO~EXCH_RATE~LCY_AMOUNT~EVENT~AC_DESC~EVENT_SR_NO~RELATED_CUSTOMER~RELATED_REFERENCE~ACCTYPE","BLK_MSG":"REFNO~MSG~MSGTYPE~DCN~RUNNING_NO~AUTHSTAT~COUNTERPARTY~ESN~MEDIA~MSGSTAT~NAME~RECEIVER~TESTSTAT~CCY~PMNTREFNO~MSGDESC~SWIFTMSGTYPE","BLK_MSGDET":"DCN~MSG~RUNNINGNO"};

var multipleEntryPageSize = {"BLK_EVENT" :"15" ,"BLK_ACCOUNT" :"15" ,"BLK_MSG" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN_SCREEN__TAB_MAIN":"BLK_EVENT","CVS_MAIN_SCREEN__TAB_ACC":"BLK_ACCOUNT","CVS_MAIN_SCREEN__TAB_MSG":"BLK_MSG"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HEAD">REFNO~TXNFROMDATE~TXNTODATE~TXNFROMAMT~TXNTOAMT~STATUS~STATUS_DESCRIPTION~IS_WORST_STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_HEAD" RELATION_TYPE="N" TYPE="BLK_EVENT">MODULE~CONTRACT_REF_NO~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~DESCRIPTION~AUTH_STATUS~MAKER_ID~CHECKER_ID~REVERSED_EVENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_EVENT" RELATION_TYPE="N" TYPE="BLK_ACCOUNT">AC_BRANCH~AC_NO~AC_CCY~LCY~DRCR_IND~TRN_CODE~AMOUNT_TAG~FCY_AMOUNT~TRN_DT~VALUE_DT~TRN_REF_NO~AC_ENTRY_SR_NO~EXCH_RATE~LCY_AMOUNT~EVENT~AC_DESC~EVENT_SR_NO~RELATED_CUSTOMER~RELATED_REFERENCE~ACCTYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_EVENT" RELATION_TYPE="N" TYPE="BLK_MSG">REFNO~MSG~MSGTYPE~DCN~RUNNING_NO~AUTHSTAT~COUNTERPARTY~ESN~MEDIA~MSGSTAT~NAME~RECEIVER~TESTSTAT~CCY~PMNTREFNO~MSGDESC~SWIFTMSGTYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_MSG" RELATION_TYPE="N" TYPE="BLK_MSGDET">DCN~MSG~RUNNINGNO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN_SCREEN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_HEAD" : "","BLK_EVENT" : "BLK_HEAD~N","BLK_ACCOUNT" : "BLK_EVENT~N","BLK_MSG" : "BLK_EVENT~N","BLK_MSGDET" : "BLK_MSG~N"}; 

 var dataSrcLocationArray = new Array("BLK_HEAD","BLK_EVENT","BLK_ACCOUNT","BLK_MSG","BLK_MSGDET"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDTRINF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDTRINF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_HEAD__TXNTODATE";
pkFields[0] = "BLK_HEAD__TXNTODATE";
queryFields[1] = "BLK_HEAD__REFNO";
pkFields[1] = "BLK_HEAD__REFNO";
queryFields[2] = "BLK_HEAD__TXNTOAMT";
pkFields[2] = "BLK_HEAD__TXNTOAMT";
queryFields[3] = "BLK_HEAD__TXNFROMAMT";
pkFields[3] = "BLK_HEAD__TXNFROMAMT";
queryFields[4] = "BLK_HEAD__TXNFROMDATE";
pkFields[4] = "BLK_HEAD__TXNFROMDATE";
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
var lovInfoFlds = {"BLK_EVENT__EVENT_CODE__LOV_EVENT":["~~","__!","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_EVENT","BLK_ACCOUNT","BLK_MSG");
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

ArrFuncOrigin["OLDTRINF"]="KERNEL";
ArrPrntFunc["OLDTRINF"]="";
ArrPrntOrigin["OLDTRINF"]="";
ArrRoutingType["OLDTRINF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDTRINF"]="N";
ArrCustomModified["OLDTRINF"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"1","MODIFY":"1","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------