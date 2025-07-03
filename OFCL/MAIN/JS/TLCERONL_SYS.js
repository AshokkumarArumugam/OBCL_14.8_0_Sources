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
**  File Name          : TLCERONL_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_ERROR":"CONTRACTREFNO~LATESTVERNO","BLK_TLTBS_CONTRACT_EXCEPTION":"EXTCONTRACTREFNO~ERRCODE~ERRSEQNO~VERNO~SOURCECODE~ERRMSG~MESSAGEID~ERRORPARAM~EXTTRADEID","BLK_SUMMARY":"TRADEREFNO~CONTRACTREFNO~ERRSEQNO~SOURCECODE~LATESTVERNO"};

var multipleEntryPageSize = {"BLK_TLTBS_CONTRACT_EXCEPTION" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_ERROR__TAB_BODY":"BLK_TLTBS_CONTRACT_EXCEPTION"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_ERROR">CONTRACTREFNO~LATESTVERNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_ERROR" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONTRACT_EXCEPTION">EXTCONTRACTREFNO~ERRCODE~ERRSEQNO~VERNO~SOURCECODE~ERRMSG~MESSAGEID~ERRORPARAM~EXTTRADEID</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_SUMMARY">TRADEREFNO~CONTRACTREFNO~ERRSEQNO~SOURCECODE~LATESTVERNO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_ERROR";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_ERROR" : "","BLK_TLTBS_CONTRACT_EXCEPTION" : "BLK_OLTBS_CONTRACT_ERROR~N","BLK_SUMMARY" : ""}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_ERROR","BLK_TLTBS_CONTRACT_EXCEPTION","BLK_SUMMARY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLCERONL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLCERONL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_ERROR__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_ERROR__CONTRACTREFNO";
queryFields[1] = "BLK_OLTBS_CONTRACT_ERROR__LATESTVERNO";
pkFields[1] = "BLK_OLTBS_CONTRACT_ERROR__LATESTVERNO";
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
var strCurrentTabId = 'TAB_BODY';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_TLTBS_CONTRACT_EXCEPTION");
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

ArrFuncOrigin["TLCERONL"]="KERNEL";
ArrPrntFunc["TLCERONL"]="";
ArrPrntOrigin["TLCERONL"]="";
ArrRoutingType["TLCERONL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLCERONL"]="N";
ArrCustomModified["TLCERONL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ERROR":"CONTRACTREFNO~LATESTVERNO~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_ERROR":"~~EXECUTEQUERY"};
var scrArgDest = {"CVS_ERROR":"BLK_OLTBS_CONTRACT_ERROR__CONTRACTREFNO~BLK_OLTBS_CONTRACT_ERROR__LATESTVERNO~"};
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