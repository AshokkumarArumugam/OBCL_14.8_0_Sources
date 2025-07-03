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
**  File Name          : OLDEXRES_SYS.js
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
var fieldNameArray = {"BLK_EXRES_MAS":"MAS_MSGID~MAS_COMM_MODE~MAS_FORCE_POST~MAS_PROCESS_STATUS~MAS_RETRY_COUNT~MAS_KEYID~MAS_EXT_STATUS~MAS_LOG_TIME~MAS_SEQ_NO~MAS_DESTINATION_SOURCE~MAS_SERVICE_CODE","BLK_EXRES_DET":"DET_REQ_SERIAL_NO~DET_ERROR_CODES~DET_ERROR_PARAM~DET_RESPONSE_XML~DET_REQUEST_TIME~DET_VERSIONED~DET_SEQ_NO~DET_RESPONSE_TIME~DET_MSGID~DET_EXT_STATUS~DET_REQUEST_XML"};

var multipleEntryPageSize = {"BLK_EXRES_DET" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_EXRES__TAB_MAIN":"BLK_EXRES_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_EXRES_MAS">MAS_MSGID~MAS_COMM_MODE~MAS_FORCE_POST~MAS_PROCESS_STATUS~MAS_RETRY_COUNT~MAS_KEYID~MAS_EXT_STATUS~MAS_LOG_TIME~MAS_SEQ_NO~MAS_DESTINATION_SOURCE~MAS_SERVICE_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_EXRES_MAS" RELATION_TYPE="N" TYPE="BLK_EXRES_DET">DET_REQ_SERIAL_NO~DET_ERROR_CODES~DET_ERROR_PARAM~DET_RESPONSE_XML~DET_REQUEST_TIME~DET_VERSIONED~DET_SEQ_NO~DET_RESPONSE_TIME~DET_MSGID~DET_EXT_STATUS~DET_REQUEST_XML</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_EXRES";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_EXRES_MAS" : "","BLK_EXRES_DET" : "BLK_EXRES_MAS~N"}; 

 var dataSrcLocationArray = new Array("BLK_EXRES_MAS","BLK_EXRES_DET"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDEXRES.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDEXRES.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_EXRES_MAS__MAS_MSGID";
pkFields[0] = "BLK_EXRES_MAS__MAS_MSGID";
queryFields[1] = "BLK_EXRES_MAS__MAS_SEQ_NO";
pkFields[1] = "BLK_EXRES_MAS__MAS_SEQ_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_EXRES_DET":["DET_ERROR_CODES","DET_ERROR_PARAM","DET_EXT_STATUS","DET_MSGID","DET_REQUEST_TIMEI","DET_REQUEST_XML","DET_REQ_SERIAL_NO","DET_RESPONSE_TIMEI","DET_RESPONSE_XML","DET_SEQ_NO","DET_VERSIONED"],"BLK_EXRES_MAS":["MAS_COMM_MODE","MAS_DESTINATION_SOURCE","MAS_EXT_STATUS","MAS_FORCE_POST","MAS_KEYID","MAS_LOG_TIMEI","MAS_MSGID","MAS_PROCESS_STATUS","MAS_RETRY_COUNT","MAS_SEQ_NO","MAS_SERVICE_CODE"]};
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
var multipleEntryIDs = new Array("BLK_EXRES_DET");
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

ArrFuncOrigin["OLDEXRES"]="KERNEL";
ArrPrntFunc["OLDEXRES"]="";
ArrPrntOrigin["OLDEXRES"]="";
ArrRoutingType["OLDEXRES"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDEXRES"]="N";
ArrCustomModified["OLDEXRES"]="N";

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