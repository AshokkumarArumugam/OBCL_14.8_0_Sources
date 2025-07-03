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
**  File Name          : LBCAGCIF_SYS.js
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
var fieldNameArray = {"BLK_ORIG_SSI_MAINT_MASTER":"CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~CUSTOMER_NO~CUSTOMER_DESC~TXT_PRODUCT_CODE~TXT_PRODUCT_DESC~TXT_USER_REF_NO~TXT_PURPOSE_OF_SYNDICATION~TXT_FACILITY_NAME~TXT_CUSTOMER~TXT_CUSTOMER_DESC~TXT_MODULE~TXT_BRANCH~TXT_COUNTERPARTY~TXT_FACILITY_REF","BLK_ORIG_SSI_MAINT_DETAIL":"CONTRACT_REF_NO~VERSION_NO~CUSTOMER_NO~CURRENCY~SSI_MNEMONIC~SETTLEMENT_CURRENCY~SETTLEMENT_MODULE~SETTLEMENT_BRN"};

var multipleEntryPageSize = {"BLK_ORIG_SSI_MAINT_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_ORIG_SSI_MAINT__TAB_MAIN":"BLK_ORIG_SSI_MAINT_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ORIG_SSI_MAINT_MASTER">CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~CUSTOMER_NO~CUSTOMER_DESC~TXT_PRODUCT_CODE~TXT_PRODUCT_DESC~TXT_USER_REF_NO~TXT_PURPOSE_OF_SYNDICATION~TXT_FACILITY_NAME~TXT_CUSTOMER~TXT_CUSTOMER_DESC~TXT_MODULE~TXT_BRANCH~TXT_COUNTERPARTY~TXT_FACILITY_REF</FN>'; 
msgxml += '      <FN PARENT="BLK_ORIG_SSI_MAINT_MASTER" RELATION_TYPE="N" TYPE="BLK_ORIG_SSI_MAINT_DETAIL">CONTRACT_REF_NO~VERSION_NO~CUSTOMER_NO~CURRENCY~SSI_MNEMONIC~SETTLEMENT_CURRENCY~SETTLEMENT_MODULE~SETTLEMENT_BRN</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_ORIG_SSI_MAINT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ORIG_SSI_MAINT_MASTER" : "","BLK_ORIG_SSI_MAINT_DETAIL" : "BLK_ORIG_SSI_MAINT_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_ORIG_SSI_MAINT_MASTER","BLK_ORIG_SSI_MAINT_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCAGCIF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCAGCIF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ORIG_SSI_MAINT_MASTER__CONTRACT_REF_NO";
pkFields[0] = "BLK_ORIG_SSI_MAINT_MASTER__CONTRACT_REF_NO";
queryFields[1] = "BLK_ORIG_SSI_MAINT_MASTER__VERSION_NO";
pkFields[1] = "BLK_ORIG_SSI_MAINT_MASTER__VERSION_NO";
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
var lovInfoFlds = {"BLK_ORIG_SSI_MAINT_MASTER__CUSTOMER_NO__LOV_CUSTOMER_NAME":["BLK_ORIG_SSI_MAINT_MASTER__CUSTOMER_NO~~BLK_ORIG_SSI_MAINT_MASTER__CUSTOMER_DESC~~","","N~N~N~N",""],"BLK_ORIG_SSI_MAINT_DETAIL__CURRENCY__LOV_CURRENCY":["BLK_ORIG_SSI_MAINT_DETAIL__CURRENCY~","BLK_ORIG_SSI_MAINT_MASTER__TXT_FACILITY_REF!","N",""],"BLK_ORIG_SSI_MAINT_DETAIL__SSI_MNEMONIC__LOV_SSI":["BLK_ORIG_SSI_MAINT_DETAIL__SSI_MNEMONIC~~~~~~~","BLK_ORIG_SSI_MAINT_MASTER__CUSTOMER_NO!~BLK_ORIG_SSI_MAINT_DETAIL__CURRENCY!~BLK_ORIG_SSI_MAINT_MASTER__TXT_PRODUCT_CODE!~BLK_ORIG_SSI_MAINT_MASTER__TXT_PRODUCT_CODE!","N~N~N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_ORIG_SSI_MAINT_DETAIL");
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

ArrFuncOrigin["LBCAGCIF"]="KERNEL";
ArrPrntFunc["LBCAGCIF"]="";
ArrPrntOrigin["LBCAGCIF"]="";
ArrRoutingType["LBCAGCIF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCAGCIF"]="N";
ArrCustomModified["LBCAGCIF"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ORIG_SSI_MAINT":"CONREFNO~VERSION~EVENTSEQNO~FACILITYREFNO~AGENTCIF"};
var scrArgSource = {};
var scrArgVals = {"CVS_ORIG_SSI_MAINT":"~~~~"};
var scrArgDest = {"CVS_ORIG_SSI_MAINT":"BLK_ORIG_SSI_MAINT_MASTER__CONTRACT_REF_NO~BLK_ORIG_SSI_MAINT_MASTER__VERSION_NO~BLK_ORIG_SSI_MAINT_MASTER__EVENT_SEQ_NO~BLK_ORIG_SSI_MAINT_MASTER__TXT_FACILITY_REF~BLK_ORIG_SSI_MAINT_MASTER__CUSTOMER_NO"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------