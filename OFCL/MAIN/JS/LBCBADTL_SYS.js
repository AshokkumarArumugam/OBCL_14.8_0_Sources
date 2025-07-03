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
**  File Name          : LBCBADTL_SYS.js
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
var fieldNameArray = {"BLK_BA_CONT":"CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO","BLK_BA_CONT_MSTR":"COUNTERPARTY~FACILITY_NAME~PRODUCT~PRODUCT_TYPE~USER_REF_NO~CONTRACT_REF_NO~UI_PROD_DESC~UI_CUST_NAME~UI_PROD_TP_DESC~VERSION_NO~CONTCCY","BLK_BA_CONT_DETAILS":"AGENT_RATE~BA_BROKER_PROD~COF_AMT~CONTRACT_REF_NO~DISCOUNTED_RATE~DISCOUNT_AMT~INTEREST_DAY_BASIS~NET_BORROWING_AMT~PNL_AMT~SPLIT_NUMBER~SPLIT_SERIAL_NO~STAMPING_FEE_AMT~STAMPING_FEE_RATE~TREASURY_RATE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BA_CONT">CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_BA_CONT" RELATION_TYPE="1" TYPE="BLK_BA_CONT_MSTR">COUNTERPARTY~FACILITY_NAME~PRODUCT~PRODUCT_TYPE~USER_REF_NO~CONTRACT_REF_NO~UI_PROD_DESC~UI_CUST_NAME~UI_PROD_TP_DESC~VERSION_NO~CONTCCY</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BA_CONT_DETAILS">AGENT_RATE~BA_BROKER_PROD~COF_AMT~CONTRACT_REF_NO~DISCOUNTED_RATE~DISCOUNT_AMT~INTEREST_DAY_BASIS~NET_BORROWING_AMT~PNL_AMT~SPLIT_NUMBER~SPLIT_SERIAL_NO~STAMPING_FEE_AMT~STAMPING_FEE_RATE~TREASURY_RATE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_BADETS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BA_CONT" : "","BLK_BA_CONT_MSTR" : "BLK_BA_CONT~1","BLK_BA_CONT_DETAILS" : ""}; 

 var dataSrcLocationArray = new Array("BLK_BA_CONT","BLK_BA_CONT_MSTR","BLK_BA_CONT_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCBADTL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCBADTL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BA_CONT__CONTRACT_REF_NO";
pkFields[0] = "BLK_BA_CONT__CONTRACT_REF_NO";
queryFields[1] = "BLK_BA_CONT__LATEST_EVENT_SEQ_NO";
pkFields[1] = "BLK_BA_CONT__LATEST_EVENT_SEQ_NO";
queryFields[2] = "BLK_BA_CONT__LATEST_VERSION_NO";
pkFields[2] = "BLK_BA_CONT__LATEST_VERSION_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BA_CONT_DETAILS":["AGENT_RATE","BA_BROKER_PROD","DISCOUNTED_RATE","STAMPING_FEE_RATE","TREASURY_RATE"]};
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
var lovInfoFlds = {"BLK_BA_CONT_DETAILS__BA_BROKER_PROD__LOV_BROKER_PROD":["BLK_BA_CONT_DETAILS__BA_BROKER_PROD~~","","N~N",""]};
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

ArrFuncOrigin["LBCBADTL"]="KERNEL";
ArrPrntFunc["LBCBADTL"]="";
ArrPrntOrigin["LBCBADTL"]="";
ArrRoutingType["LBCBADTL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCBADTL"]="N";
ArrCustomModified["LBCBADTL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_BADETS":"cntrefno"};
var scrArgSource = {};
var scrArgVals = {"CVS_BADETS":""};
var scrArgDest = {"CVS_BADETS":"BLK_BA_CONT__CONTRACT_REF_NO"};
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