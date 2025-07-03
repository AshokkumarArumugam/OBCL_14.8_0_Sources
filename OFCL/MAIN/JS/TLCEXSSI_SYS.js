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
**  File Name          : TLCEXSSI_SYS.js
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
var fieldNameArray = {"BLK_TLVW_EXT_TKT_CUSIP_DET__V":"TICKET_ID~COUNTERPARTY~CUSIP_NO~REFERENCE~CONSOL_TICKET_REF_NO","BLK_TLVW_EXT_TKT_CUSIP_DET":"TRANCHE_REF_NO~TICKET_ID~CUSIP_NO~COUNTERPARTY~PRODUCT_CODE","BLK_TLTB_EXT_CPTY_CURR_DET":"SETTLEMENT_SEQ_NO~SSI_MNEMONIC~CURRENCY~CUSIP~COUNTERPARTY","BLK_TLTB_EXT_CPTY_ENTITY":"COUNTERPARTY~REMARKS~CUSIP~PRIMARY_ENTITY~ENTITY_ID~ENTITY_NAME"};

var multipleEntryPageSize = {"BLK_TLVW_EXT_TKT_CUSIP_DET" :"15" ,"BLK_TLTB_EXT_CPTY_CURR_DET" :"15" ,"BLK_TLTB_EXT_CPTY_ENTITY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_TLCEXSSI__TAB_MAIN":"BLK_TLVW_EXT_TKT_CUSIP_DET~BLK_TLTB_EXT_CPTY_CURR_DET~BLK_TLTB_EXT_CPTY_ENTITY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLVW_EXT_TKT_CUSIP_DET__V">TICKET_ID~COUNTERPARTY~CUSIP_NO~REFERENCE~CONSOL_TICKET_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_TLVW_EXT_TKT_CUSIP_DET__V" RELATION_TYPE="N" TYPE="BLK_TLVW_EXT_TKT_CUSIP_DET">TRANCHE_REF_NO~TICKET_ID~CUSIP_NO~COUNTERPARTY~PRODUCT_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_TLVW_EXT_TKT_CUSIP_DET" RELATION_TYPE="N" TYPE="BLK_TLTB_EXT_CPTY_CURR_DET">SETTLEMENT_SEQ_NO~SSI_MNEMONIC~CURRENCY~CUSIP~COUNTERPARTY</FN>'; 
msgxml += '      <FN PARENT="BLK_TLVW_EXT_TKT_CUSIP_DET" RELATION_TYPE="N" TYPE="BLK_TLTB_EXT_CPTY_ENTITY">COUNTERPARTY~REMARKS~CUSIP~PRIMARY_ENTITY~ENTITY_ID~ENTITY_NAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TLCEXSSI";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLVW_EXT_TKT_CUSIP_DET__V" : "","BLK_TLVW_EXT_TKT_CUSIP_DET" : "BLK_TLVW_EXT_TKT_CUSIP_DET__V~N","BLK_TLTB_EXT_CPTY_CURR_DET" : "BLK_TLVW_EXT_TKT_CUSIP_DET~N","BLK_TLTB_EXT_CPTY_ENTITY" : "BLK_TLVW_EXT_TKT_CUSIP_DET~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLVW_EXT_TKT_CUSIP_DET__V","BLK_TLVW_EXT_TKT_CUSIP_DET","BLK_TLTB_EXT_CPTY_CURR_DET","BLK_TLTB_EXT_CPTY_ENTITY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLCEXSSI.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLCEXSSI.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLVW_EXT_TKT_CUSIP_DET__V__REFERENCE";
pkFields[0] = "BLK_TLVW_EXT_TKT_CUSIP_DET__V__REFERENCE";
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
var lovInfoFlds = {"BLK_TLTB_EXT_CPTY_CURR_DET__SSI_MNEMONIC__LOV_SSI_MNEMONIC":["~~~BLK_TLTB_EXT_CPTY_CURR_DET__CURRENCY~~~~BLK_TLTB_EXT_CPTY_CURR_DET__SSI_MNEMONIC~~~~~~~~~~","BLK_TLVW_EXT_TKT_CUSIP_DET__COUNTERPARTY!VARCHAR2~BLK_TLTB_EXT_CPTY_CURR_DET__CURRENCY!VARCHAR2~BLK_TLVW_EXT_TKT_CUSIP_DET__PRODUCT_CODE!VARCHAR2","N~N~N~N~N~N~N~N~N~N~N~N~N~N~N~N~N",""],"BLK_TLTB_EXT_CPTY_CURR_DET__CURRENCY__LOV_CURRENCY":["BLK_TLTB_EXT_CPTY_CURR_DET__CURRENCY~~","BLK_TLVW_EXT_TKT_CUSIP_DET__TRANCHE_REF_NO!VARCHAR~BLK_TLVW_EXT_TKT_CUSIP_DET__COUNTERPARTY!VARCHAR~BLK_TLVW_EXT_TKT_CUSIP_DET__CUSIP_NO!VARCHAR","N~N",""],"BLK_TLTB_EXT_CPTY_ENTITY__ENTITY_ID__LOV_ENTITY":["BLK_TLTB_EXT_CPTY_ENTITY__ENTITY_ID~BLK_TLTB_EXT_CPTY_ENTITY__ENTITY_NAME~~~~~","BLK_TLVW_EXT_TKT_CUSIP_DET__COUNTERPARTY!VARCHAR~BLK_TLVW_EXT_TKT_CUSIP_DET__COUNTERPARTY!VARCHAR~BLK_TLVW_EXT_TKT_CUSIP_DET__CUSIP_NO!VARCHAR","N~N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TLVW_EXT_TKT_CUSIP_DET","BLK_TLTB_EXT_CPTY_CURR_DET","BLK_TLTB_EXT_CPTY_ENTITY");
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

ArrFuncOrigin["TLCEXSSI"]="KERNEL";
ArrPrntFunc["TLCEXSSI"]="";
ArrPrntOrigin["TLCEXSSI"]="";
ArrRoutingType["TLCEXSSI"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLCEXSSI"]="N";
ArrCustomModified["TLCEXSSI"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_TLCEXSSI":"REFERENCE"};
var scrArgSource = {};
var scrArgVals = {"CVS_TLCEXSSI":""};
var scrArgDest = {"CVS_TLCEXSSI":"BLK_TLVW_EXT_TKT_CUSIP_DET__V__REFERENCE"};
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