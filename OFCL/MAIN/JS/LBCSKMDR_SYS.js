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
**  File Name          : LBCSKMDR_SYS.js
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
var fieldNameArray = {"BLK_MASTER":"CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~TXTPRODUCTCODE~TXTPRDCTDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTNAME~TXTFACILITYNAME~TXT_TRANCHEREFNO","BLK_CONTRACT_SKIM_MASTER":"CONTRACT_REF_NO~PAYER_PARTICIPANT~PAYERNAME~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~RECEIVER_PARTICIPANT~RECEIVERNAME~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~RECORD_SEQ_NO~VERSION_NO","BLK_CONTRACT_SKIM_DETAILS":"CONTRACT_REF_NO~EVENT_SEQ_NO~PAYER_PARTICIPANT~PAYERNAME~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~RECEIVER_PARTICIPANT~RECEIVERNAME~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~SKIM_RATE~RECORD_SEQ_NO~VALUE_DATE"};

var multipleEntryPageSize = {"BLK_CONTRACT_SKIM_MASTER" :"15" ,"BLK_CONTRACT_SKIM_DETAILS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_SKIMDTLS__TAB_MAIN":"BLK_CONTRACT_SKIM_MASTER~BLK_CONTRACT_SKIM_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MASTER">CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~TXTPRODUCTCODE~TXTPRDCTDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTNAME~TXTFACILITYNAME~TXT_TRANCHEREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_MASTER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_SKIM_MASTER">CONTRACT_REF_NO~PAYER_PARTICIPANT~PAYERNAME~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~RECEIVER_PARTICIPANT~RECEIVERNAME~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~RECORD_SEQ_NO~VERSION_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_SKIM_MASTER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_SKIM_DETAILS">CONTRACT_REF_NO~EVENT_SEQ_NO~PAYER_PARTICIPANT~PAYERNAME~PAYER_COMPONENT~PAYER_COMPONENT_SERIAL_NO~RECEIVER_PARTICIPANT~RECEIVERNAME~RECEIVER_COMPONENT~RECEIVER_COMPONENT_SERIAL_NO~SKIM_RATE~RECORD_SEQ_NO~VALUE_DATE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_SKIMDTLS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MASTER" : "","BLK_CONTRACT_SKIM_MASTER" : "BLK_MASTER~N","BLK_CONTRACT_SKIM_DETAILS" : "BLK_CONTRACT_SKIM_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_MASTER","BLK_CONTRACT_SKIM_MASTER","BLK_CONTRACT_SKIM_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCSKMDR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCSKMDR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MASTER__CONTRACT_REF_NO";
pkFields[0] = "BLK_MASTER__CONTRACT_REF_NO";
queryFields[1] = "BLK_MASTER__LATEST_EVENT_SEQ_NO";
pkFields[1] = "BLK_MASTER__LATEST_EVENT_SEQ_NO";
queryFields[2] = "BLK_MASTER__LATEST_VERSION_NO";
pkFields[2] = "BLK_MASTER__LATEST_VERSION_NO";
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
var lovInfoFlds = {"BLK_CONTRACT_SKIM_MASTER__PAYER_PARTICIPANT__LOV_PART_PAYER":["BLK_CONTRACT_SKIM_MASTER__PAYER_PARTICIPANT~BLK_CONTRACT_SKIM_MASTER__PAYERNAME~","BLK_MASTER__TXT_TRANCHEREFNO!VARCHAR2~BLK_MASTER__TXT_TRANCHEREFNO!VARCHAR2","N~N",""],"BLK_CONTRACT_SKIM_MASTER__RECEIVER_PARTICIPANT__LOV_PART_RECEIVER":["BLK_CONTRACT_SKIM_MASTER__RECEIVER_PARTICIPANT~BLK_CONTRACT_SKIM_MASTER__RECEIVERNAME~","BLK_MASTER__TXT_TRANCHEREFNO!VARCHAR2~BLK_MASTER__TXT_TRANCHEREFNO!VARCHAR2","N~N",""],"BLK_CONTRACT_SKIM_DETAILS__PAYER_PARTICIPANT__LOV_PART_PAYER":["BLK_CONTRACT_SKIM_DETAILS__PAYER_PARTICIPANT~BLK_CONTRACT_SKIM_DETAILS__PAYERNAME~","BLK_MASTER__TXT_TRANCHEREFNO!VARCHAR2~BLK_MASTER__TXT_TRANCHEREFNO!VARCHAR2","N~N",""],"BLK_CONTRACT_SKIM_DETAILS__RECEIVER_PARTICIPANT__LOV_PART_RECEIVER":["BLK_CONTRACT_SKIM_DETAILS__RECEIVER_PARTICIPANT~BLK_CONTRACT_SKIM_DETAILS__RECEIVERNAME~","BLK_MASTER__TXT_TRANCHEREFNO!VARCHAR2~BLK_MASTER__TXT_TRANCHEREFNO!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_SKIM_MASTER","BLK_CONTRACT_SKIM_DETAILS");
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

ArrFuncOrigin["LBCSKMDR"]="KERNEL";
ArrPrntFunc["LBCSKMDR"]="";
ArrPrntOrigin["LBCSKMDR"]="";
ArrRoutingType["LBCSKMDR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCSKMDR"]="N";
ArrCustomModified["LBCSKMDR"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_SKIMDTLS":"CONTRACTREFNO~EVENTSEQNO~VERSIONNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_SKIMDTLS":"~~"};
var scrArgDest = {"CVS_SKIMDTLS":"BLK_MASTER__CONTRACT_REF_NO~BLK_MASTER__LATEST_EVENT_SEQ_NO~BLK_MASTER__LATEST_VERSION_NO"};
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