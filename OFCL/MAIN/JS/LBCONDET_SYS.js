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
**  File Name          : LBCONDET_SYS.js
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
var fieldNameArray = {"BLK_PARENT":"CONTRACT_REF_NO~LATEST_VERSION_NO~CONTCCY","BLK_LBVWS_BORROWER_DETAILS__LBBD":"FC_CONTRACT_REF_NO~FC_USER_REF_NO~FC_CUSTOM_REF_NO~TR_CONTRACT_REF_NO~TR_USER_REF_NO~TR_CUSTOM_REF_NO~BORROWER~UI_BORROWER_NAME~CONTRACT_REF_NO~DRAWDOWN_NO~DR_CUSTOM_REF_NO~DR_USER_REF_NO~DR_CONTRACT_REF_NO","BLK_LBVWS_PARTICIPANT_DETAILS__LBPD":"FC_CUSTOM_REF_NO~TR_CONTRACT_REF_NO~TR_USER_REF_NO~TR_CUSTOM_REF_NO~BORROWER~FC_CONTRACT_REF_NO~FC_USER_REF_NO~UI_BORROWER_NAME~CONTRACT_REF_NO~DRAWDOWN_NO~DR_CUSTOM_REF_NO~DR_USER_REF_NO~DR_CONTRACT_REF_NO~UI_ASSET_RATIO~UI_ASSET_AMOUNT"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PARENT">CONTRACT_REF_NO~LATEST_VERSION_NO~CONTCCY</FN>'; 
msgxml += '      <FN PARENT="BLK_PARENT" RELATION_TYPE="1" TYPE="BLK_LBVWS_BORROWER_DETAILS__LBBD">FC_CONTRACT_REF_NO~FC_USER_REF_NO~FC_CUSTOM_REF_NO~TR_CONTRACT_REF_NO~TR_USER_REF_NO~TR_CUSTOM_REF_NO~BORROWER~UI_BORROWER_NAME~CONTRACT_REF_NO~DRAWDOWN_NO~DR_CUSTOM_REF_NO~DR_USER_REF_NO~DR_CONTRACT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBVWS_PARTICIPANT_DETAILS__LBPD">FC_CUSTOM_REF_NO~TR_CONTRACT_REF_NO~TR_USER_REF_NO~TR_CUSTOM_REF_NO~BORROWER~FC_CONTRACT_REF_NO~FC_USER_REF_NO~UI_BORROWER_NAME~CONTRACT_REF_NO~DRAWDOWN_NO~DR_CUSTOM_REF_NO~DR_USER_REF_NO~DR_CONTRACT_REF_NO~UI_ASSET_RATIO~UI_ASSET_AMOUNT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_LBCONDET";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PARENT" : "","BLK_LBVWS_BORROWER_DETAILS__LBBD" : "BLK_PARENT~1","BLK_LBVWS_PARTICIPANT_DETAILS__LBPD" : ""}; 

 var dataSrcLocationArray = new Array("BLK_PARENT","BLK_LBVWS_BORROWER_DETAILS__LBBD","BLK_LBVWS_PARTICIPANT_DETAILS__LBPD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCONDET.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCONDET.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PARENT__CONTRACT_REF_NO";
pkFields[0] = "BLK_PARENT__CONTRACT_REF_NO";
queryFields[1] = "BLK_PARENT__LATEST_VERSION_NO";
pkFields[1] = "BLK_PARENT__LATEST_VERSION_NO";
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

ArrFuncOrigin["LBCONDET"]="KERNEL";
ArrPrntFunc["LBCONDET"]="";
ArrPrntOrigin["LBCONDET"]="";
ArrRoutingType["LBCONDET"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCONDET"]="N";
ArrCustomModified["LBCONDET"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_LBCONDET":"CONTRACT_REF_NO~LATEST_VERSION_NO"};
var scrArgSource = {};
var scrArgVals = {"CVS_LBCONDET":"~"};
var scrArgDest = {"CVS_LBCONDET":"BLK_PARENT__CONTRACT_REF_NO~BLK_PARENT__LATEST_VERSION_NO"};
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