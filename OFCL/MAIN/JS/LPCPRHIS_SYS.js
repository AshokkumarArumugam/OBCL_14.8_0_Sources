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
**  File Name          : LPCPRHIS_SYS.js
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
var fieldNameArray = {"BLK_INTEREST_MASTER":"CONTRACT_REF_NO~COMPONENT~TXTPROD~TXTPRODDESC~TXTUSERREFNO~TXTCOUNTERPARTY~TXTCUSTNAME~TXTPRODUCTTYPE~TXTFACILITYAME~TXTPARTCONTRACT","BLK_INTEREST_MASTER_ALIAS":"CONTRACT_REF_NO~COMPONENT~TXTCOMPDESC","BLK_INTEREST_DETAIL":"CONTRACT_REF_NO~COMPONENT~VALUE_DATE~RATE_TYPE~FIXED_RATE_TYPE~RATE_CODE_USAGE~RATE_CODE~BORROW_LEND_IND~BASE_RATE~SPREAD~MARGIN~FINAL_RATE~ADJUSTMENT_RATE~BORROWER_CONTRACT_REF_NO~PARTICIPANT","BLK_MARGIN_RATES":"CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~VALUE_DATE~EVENT_SEQ_NO~MARGIN_RATE~BORROWER_CONTRACT_REF_NO~TXT_MARGIN_BASIS","BLK_MARGIN_MASTER":"CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~MARGIN_BASIS~CUSTOMER_NO~TXTCOMPDESC~TXTCOMPONENTDESC","BLK_MARGIN_MASTHIST":"MARGIN_COMPONENT~MARGIN_BASIS~CONTRACT_REF_NO~COMPONENT~CUSTOMER_NO~TXTCOMPONENTDESCRIPTION2~TXTCOMPONENT","BLK_MARGIN_RATES_ALIAS":"CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~VALUE_DATE~EVENT_SEQ_NO~MARGIN_RATE~BORROWER_CONTRACT_REF_NO"};

var multipleEntryPageSize = {"BLK_INTEREST_MASTER_ALIAS" :"15" ,"BLK_INTEREST_DETAIL" :"15" ,"BLK_MARGIN_RATES" :"15" ,"BLK_MARGIN_MASTHIST" :"15" ,"BLK_MARGIN_RATES_ALIAS" :"15" };

var multipleEntrySVBlocks = "BLK_MARGIN_MASTER";

var tabMEBlks = {"CVS_MAIN_RATE__TAB_MAIN":"BLK_INTEREST_MASTER_ALIAS~BLK_INTEREST_DETAIL~BLK_MARGIN_RATES","CVS_MARGIN_HIST__TAB_MAIN":"BLK_MARGIN_MASTHIST~BLK_MARGIN_RATES_ALIAS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_INTEREST_MASTER">CONTRACT_REF_NO~COMPONENT~TXTPROD~TXTPRODDESC~TXTUSERREFNO~TXTCOUNTERPARTY~TXTCUSTNAME~TXTPRODUCTTYPE~TXTFACILITYAME~TXTPARTCONTRACT</FN>'; 
msgxml += '      <FN PARENT="BLK_INTEREST_MASTER" RELATION_TYPE="N" TYPE="BLK_INTEREST_MASTER_ALIAS">CONTRACT_REF_NO~COMPONENT~TXTCOMPDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_INTEREST_MASTER_ALIAS" RELATION_TYPE="N" TYPE="BLK_INTEREST_DETAIL">CONTRACT_REF_NO~COMPONENT~VALUE_DATE~RATE_TYPE~FIXED_RATE_TYPE~RATE_CODE_USAGE~RATE_CODE~BORROW_LEND_IND~BASE_RATE~SPREAD~MARGIN~FINAL_RATE~ADJUSTMENT_RATE~BORROWER_CONTRACT_REF_NO~PARTICIPANT</FN>'; 
msgxml += '      <FN PARENT="BLK_INTEREST_DETAIL" RELATION_TYPE="N" TYPE="BLK_MARGIN_RATES">CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~VALUE_DATE~EVENT_SEQ_NO~MARGIN_RATE~BORROWER_CONTRACT_REF_NO~TXT_MARGIN_BASIS</FN>'; 
msgxml += '      <FN PARENT="BLK_INTEREST_MASTER_ALIAS" RELATION_TYPE="N" TYPE="BLK_MARGIN_MASTER">CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~MARGIN_BASIS~CUSTOMER_NO~TXTCOMPDESC~TXTCOMPONENTDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_MARGIN_MASTER" RELATION_TYPE="N" TYPE="BLK_MARGIN_MASTHIST">MARGIN_COMPONENT~MARGIN_BASIS~CONTRACT_REF_NO~COMPONENT~CUSTOMER_NO~TXTCOMPONENTDESCRIPTION2~TXTCOMPONENT</FN>'; 
msgxml += '      <FN PARENT="BLK_MARGIN_MASTHIST" RELATION_TYPE="N" TYPE="BLK_MARGIN_RATES_ALIAS">CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~VALUE_DATE~EVENT_SEQ_NO~MARGIN_RATE~BORROWER_CONTRACT_REF_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN_RATE";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_INTEREST_MASTER" : "","BLK_INTEREST_MASTER_ALIAS" : "BLK_INTEREST_MASTER~N","BLK_INTEREST_DETAIL" : "BLK_INTEREST_MASTER_ALIAS~N","BLK_MARGIN_RATES" : "BLK_INTEREST_DETAIL~N","BLK_MARGIN_MASTER" : "BLK_INTEREST_MASTER_ALIAS~N","BLK_MARGIN_MASTHIST" : "BLK_MARGIN_MASTER~N","BLK_MARGIN_RATES_ALIAS" : "BLK_MARGIN_MASTHIST~N"}; 

 var dataSrcLocationArray = new Array("BLK_INTEREST_MASTER","BLK_INTEREST_MASTER_ALIAS","BLK_INTEREST_DETAIL","BLK_MARGIN_RATES","BLK_MARGIN_MASTER","BLK_MARGIN_MASTHIST","BLK_MARGIN_RATES_ALIAS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LPCPRHIS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LPCPRHIS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_INTEREST_MASTER__CONTRACT_REF_NO";
pkFields[0] = "BLK_INTEREST_MASTER__CONTRACT_REF_NO";
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
var multipleEntryIDs = new Array("BLK_INTEREST_MASTER_ALIAS","BLK_INTEREST_DETAIL","BLK_MARGIN_RATES","BLK_MARGIN_MASTHIST","BLK_MARGIN_RATES_ALIAS");
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

ArrFuncOrigin["LPCPRHIS"]="KERNEL";
ArrPrntFunc["LPCPRHIS"]="";
ArrPrntOrigin["LPCPRHIS"]="";
ArrRoutingType["LPCPRHIS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LPCPRHIS"]="N";
ArrCustomModified["LPCPRHIS"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN_RATE":"CONTRACT_REF_NO~COMPONENT","CVS_MARGIN_HIST":"COMPONENT"};
var scrArgSource = {"CVS_MAIN_RATE":"~BLK_INTEREST_MASTER_ALIAS__COMPONENT","CVS_MARGIN_HIST":"BLK_INTEREST_MASTER_ALIAS__COMPONENT"};
var scrArgVals = {"CVS_MAIN_RATE":"~","CVS_MARGIN_HIST":""};
var scrArgDest = {"CVS_MAIN_RATE":"BLK_INTEREST_MASTER__TXTPARTCONTRACT~BLK_MARGIN_MASTER__COMPONENT","CVS_MARGIN_HIST":"BLK_MARGIN_MASTER__COMPONENT"};
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