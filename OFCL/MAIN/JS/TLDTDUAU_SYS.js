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
**  File Name          : TLDTDUAU_SYS.js
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
var fieldNameArray = {"BLK_CONTDET":"EXT_FCCREF~TRD_REF_NO~PRD~POS_ID~PORTFOLIO~POS_QUA~CUSIP~TKTID~VERNO~SRCCD~BRN~INPUTBY~TRDID~PROCESSSTAT","BLK_REKEY":"EXT_CONTRACT_REF_NO~SOURCE_CODE~VERSION_NO~BRANCH~CPTY~CCY~TRD_AMT~TRD_PRICE~TRD_DT~EXPT_STL_DT~TXTCPTY~TXTCCY~TXTTRD_AMT~TXTTRD_PRICE~TXTTRD_DT~TXTEXPT_STL_DT"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTDET">EXT_FCCREF~TRD_REF_NO~PRD~POS_ID~PORTFOLIO~POS_QUA~CUSIP~TKTID~VERNO~SRCCD~BRN~INPUTBY~TRDID~PROCESSSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTDET" RELATION_TYPE="1" TYPE="BLK_REKEY">EXT_CONTRACT_REF_NO~SOURCE_CODE~VERSION_NO~BRANCH~CPTY~CCY~TRD_AMT~TRD_PRICE~TRD_DT~EXPT_STL_DT~TXTCPTY~TXTCCY~TXTTRD_AMT~TXTTRD_PRICE~TXTTRD_DT~TXTEXPT_STL_DT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TDUAU";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTDET" : "","BLK_REKEY" : "BLK_CONTDET~1"}; 

 var dataSrcLocationArray = new Array("BLK_CONTDET","BLK_REKEY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTDUAU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTDUAU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTDET__EXT_FCCREF";
pkFields[0] = "BLK_CONTDET__EXT_FCCREF";
queryFields[1] = "BLK_CONTDET__SRCCD";
pkFields[1] = "BLK_CONTDET__SRCCD";
queryFields[2] = "BLK_CONTDET__BRN";
pkFields[2] = "BLK_CONTDET__BRN";
queryFields[3] = "BLK_CONTDET__VERNO";
pkFields[3] = "BLK_CONTDET__VERNO";
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

ArrFuncOrigin["TLDTDUAU"]="KERNEL";
ArrPrntFunc["TLDTDUAU"]="";
ArrPrntOrigin["TLDTDUAU"]="";
ArrRoutingType["TLDTDUAU"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTDUAU"]="N";
ArrCustomModified["TLDTDUAU"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------