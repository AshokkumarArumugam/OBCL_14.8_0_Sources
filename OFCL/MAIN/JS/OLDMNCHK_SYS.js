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
**  File Name          : OLDMNCHK_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_GI_CHECK":"GI_CUST_REF~BRANCH~BRANCH_NAME~GI_MODULE~GI_ESN~GI_VERSION~GI_ONL_BATCH~GI_SYSTEM_DATE~GI_CHECK_DATE~GI_CHECK_DATE_DISP~GI_INTERDICT_ID~GI_REF_NO~GI_SEQ~GI_HITS~GI_REMARKS~GI_SYSDATE~GI_COUNTRY~GI_MATCH_STR1~GI_MATCH_STR2~GI_MATCH_STR3~GI_AUTH_REJECT~GI_CHECKER_ID~GI_CHECKER_DT_STAMP~GI_PROCESS_STATUS~GI_INSERT_TIME~MATCH_STRING~STATUS~GI_ONL_BATCH_V","BLK_OLTBS_GI_VALID":"GI_CUST_REF~GI_ESN~GI_VERSION~GI_SEQ~GI_REF_NO~GI_MODULE~GI_HITS~GI_SYSTEM_DATE~GI_CHECK_DATE~GI_MATCH_SEQ~GI_POSITION~GI_MATCH_LEN~GI_DESC~GI_MATCH_STR~GI_MATCH_STR_1~GI_DESC_1"};

var multipleEntryPageSize = {"BLK_OLTBS_GI_VALID" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_STACKED__TAB_MAIN":"BLK_OLTBS_GI_VALID"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_GI_CHECK">GI_CUST_REF~BRANCH~BRANCH_NAME~GI_MODULE~GI_ESN~GI_VERSION~GI_ONL_BATCH~GI_SYSTEM_DATE~GI_CHECK_DATE~GI_CHECK_DATE_DISP~GI_INTERDICT_ID~GI_REF_NO~GI_SEQ~GI_HITS~GI_REMARKS~GI_SYSDATE~GI_COUNTRY~GI_MATCH_STR1~GI_MATCH_STR2~GI_MATCH_STR3~GI_AUTH_REJECT~GI_CHECKER_ID~GI_CHECKER_DT_STAMP~GI_PROCESS_STATUS~GI_INSERT_TIME~MATCH_STRING~STATUS~GI_ONL_BATCH_V</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_GI_CHECK" RELATION_TYPE="N" TYPE="BLK_OLTBS_GI_VALID">GI_CUST_REF~GI_ESN~GI_VERSION~GI_SEQ~GI_REF_NO~GI_MODULE~GI_HITS~GI_SYSTEM_DATE~GI_CHECK_DATE~GI_MATCH_SEQ~GI_POSITION~GI_MATCH_LEN~GI_DESC~GI_MATCH_STR~GI_MATCH_STR_1~GI_DESC_1</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_GIMAINTCHK";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_GI_CHECK" : "","BLK_OLTBS_GI_VALID" : "BLK_OLTBS_GI_CHECK~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_GI_CHECK","BLK_OLTBS_GI_VALID"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDMNCHK.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDMNCHK.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_GI_CHECK__GI_SEQ";
pkFields[0] = "BLK_OLTBS_GI_CHECK__GI_SEQ";
queryFields[1] = "BLK_OLTBS_GI_CHECK__GI_VERSION";
pkFields[1] = "BLK_OLTBS_GI_CHECK__GI_VERSION";
queryFields[2] = "BLK_OLTBS_GI_CHECK__GI_ESN";
pkFields[2] = "BLK_OLTBS_GI_CHECK__GI_ESN";
queryFields[3] = "BLK_OLTBS_GI_CHECK__GI_CUST_REF";
pkFields[3] = "BLK_OLTBS_GI_CHECK__GI_CUST_REF";
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
var multipleEntryIDs = new Array("BLK_OLTBS_GI_VALID");
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

ArrFuncOrigin["OLDMNCHK"]="KERNEL";
ArrPrntFunc["OLDMNCHK"]="";
ArrPrntOrigin["OLDMNCHK"]="";
ArrRoutingType["OLDMNCHK"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDMNCHK"]="N";
ArrCustomModified["OLDMNCHK"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_GIMAINTCHK":"GI_CUST_REF"};
var scrArgSource = {};
var scrArgVals = {"CVS_GIMAINTCHK":""};
var scrArgDest = {"CVS_GIMAINTCHK":"BLK_OLTBS_GI_CHECK__GI_CUST_REF"};
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