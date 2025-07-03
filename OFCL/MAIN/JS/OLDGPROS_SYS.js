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
**  File Name          : OLDGPROS_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_BG_STATUS":"SEQNO~NODE~PROCESS~JOBNO~STATUS~BRANCHCODE","BLK_OLVWS_MSG_SUMMARY":"NO~MSGSTATUS~BRANCH~BRANCHNAME","BLK_OLTBS_DLY_MSG_OUT":"DCN~RUNNINGNO~CCY~AMOUNT~RECEIVER~MSGTYPE~REFERENCENO~BRANCH~MSGSTATUS","BLK_OLTBS_BG_STATUS___AL":"STATUS~PROCESS~JOB_NO~NODE~BRANCH_CODE~SEQ_NO"};

var multipleEntryPageSize = {"BLK_OLTBS_BG_STATUS___AL" :"15" ,"BLK_OLVWS_MSG_SUMMARY" :"15" ,"BLK_OLTBS_DLY_MSG_OUT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_STATUS":"BLK_OLTBS_BG_STATUS___AL~BLK_OLVWS_MSG_SUMMARY","CVS_MAIN__TAB_DETAILS":"BLK_OLTBS_DLY_MSG_OUT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_BG_STATUS">SEQNO~NODE~PROCESS~JOBNO~STATUS~BRANCHCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_BG_STATUS" RELATION_TYPE="N" TYPE="BLK_OLVWS_MSG_SUMMARY">NO~MSGSTATUS~BRANCH~BRANCHNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_BG_STATUS" RELATION_TYPE="N" TYPE="BLK_OLTBS_DLY_MSG_OUT">DCN~RUNNINGNO~CCY~AMOUNT~RECEIVER~MSGTYPE~REFERENCENO~BRANCH~MSGSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_BG_STATUS" RELATION_TYPE="N" TYPE="BLK_OLTBS_BG_STATUS___AL">STATUS~PROCESS~JOB_NO~NODE~BRANCH_CODE~SEQ_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_BG_STATUS" : "","BLK_OLVWS_MSG_SUMMARY" : "BLK_OLTBS_BG_STATUS~N","BLK_OLTBS_DLY_MSG_OUT" : "BLK_OLTBS_BG_STATUS~N","BLK_OLTBS_BG_STATUS___AL" : "BLK_OLTBS_BG_STATUS~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_BG_STATUS","BLK_OLVWS_MSG_SUMMARY","BLK_OLTBS_DLY_MSG_OUT","BLK_OLTBS_BG_STATUS___AL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDGPROS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDGPROS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_BG_STATUS__PROCESS";
pkFields[0] = "BLK_OLTBS_BG_STATUS__PROCESS";
queryFields[1] = "BLK_OLTBS_BG_STATUS__NODE";
pkFields[1] = "BLK_OLTBS_BG_STATUS__NODE";
queryFields[2] = "BLK_OLTBS_BG_STATUS__SEQNO";
pkFields[2] = "BLK_OLTBS_BG_STATUS__SEQNO";
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
var strCurrentTabId = 'TAB_STATUS';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_OLTBS_BG_STATUS___AL","BLK_OLVWS_MSG_SUMMARY","BLK_OLTBS_DLY_MSG_OUT");
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

ArrFuncOrigin["OLDGPROS"]="KERNEL";
ArrPrntFunc["OLDGPROS"]="";
ArrPrntOrigin["OLDGPROS"]="";
ArrRoutingType["OLDGPROS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDGPROS"]="N";
ArrCustomModified["OLDGPROS"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------