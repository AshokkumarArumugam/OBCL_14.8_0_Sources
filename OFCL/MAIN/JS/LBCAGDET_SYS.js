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
**  File Name          : LBCAGDET_SYS.js
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
var fieldNameArray = {"BLK_HEADER_AGDET":"CONTRACT_REF_NO~CONTRACT_CCY~COUNTERPARTY~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~MODULE_CODE~PRODUCT_CODE~PRODUCT_TYPE~USER_REF_NO","BLK_SYNDICATION_AGREEMENT":"CONTRACT_REF_NO~VERSION_NO~AGREEMENT_START_DATE~AGREEMENT_END_DATE~CURRENCY~APPROVAL_AMOUNT~APPROVAL_DATE~WITHHELD_AMOUNT~DEC_WITHHELD_AMOUNT~SIGNING_AMOUNT~SIGNING_DATE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HEADER_AGDET">CONTRACT_REF_NO~CONTRACT_CCY~COUNTERPARTY~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~MODULE_CODE~PRODUCT_CODE~PRODUCT_TYPE~USER_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_HEADER_AGDET" RELATION_TYPE="1" TYPE="BLK_SYNDICATION_AGREEMENT">CONTRACT_REF_NO~VERSION_NO~AGREEMENT_START_DATE~AGREEMENT_END_DATE~CURRENCY~APPROVAL_AMOUNT~APPROVAL_DATE~WITHHELD_AMOUNT~DEC_WITHHELD_AMOUNT~SIGNING_AMOUNT~SIGNING_DATE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_LBCAGDET";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_HEADER_AGDET" : "","BLK_SYNDICATION_AGREEMENT" : "BLK_HEADER_AGDET~1"}; 

 var dataSrcLocationArray = new Array("BLK_HEADER_AGDET","BLK_SYNDICATION_AGREEMENT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCAGDET.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCAGDET.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_HEADER_AGDET__CONTRACT_REF_NO";
pkFields[0] = "BLK_HEADER_AGDET__CONTRACT_REF_NO";
queryFields[1] = "BLK_HEADER_AGDET__LATEST_VERSION_NO";
pkFields[1] = "BLK_HEADER_AGDET__LATEST_VERSION_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_SYNDICATION_AGREEMENT":["AGREEMENT_END_DATEI","AGREEMENT_START_DATEI","APPROVAL_AMOUNT","APPROVAL_DATEI","CURRENCY","DEC_WITHHELD_AMOUNT","SIGNING_AMOUNT","SIGNING_DATEI","WITHHELD_AMOUNT"]};
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

ArrFuncOrigin["LBCAGDET"]="KERNEL";
ArrPrntFunc["LBCAGDET"]="";
ArrPrntOrigin["LBCAGDET"]="";
ArrRoutingType["LBCAGDET"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCAGDET"]="N";
ArrCustomModified["LBCAGDET"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_LBCAGDET":"FCCREF~ESN~VER"};
var scrArgSource = {};
var scrArgVals = {"CVS_LBCAGDET":"~~"};
var scrArgDest = {"CVS_LBCAGDET":"BLK_HEADER_AGDET__CONTRACT_REF_NO~BLK_HEADER_AGDET__LATEST_EVENT_SEQ_NO~BLK_HEADER_AGDET__LATEST_VERSION_NO"};
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