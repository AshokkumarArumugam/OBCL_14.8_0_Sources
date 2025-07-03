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
**  File Name          : LBCPARFE_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT_PARTDRIVEN_FEE":"CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~COMPONENT~COMPONENT_NAME~SCHEDULE_DATE~CURRENCY~SUM_FEE_AMOUNT","BLK_PARTICIPANT":"PARTICIPANT~FEE_AMOUNT~TXT_PARTICIPANT"};

var multipleEntryPageSize = {"BLK_PARTICIPANT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_PARTFEE__TAB_MAIN":"BLK_PARTICIPANT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT_PARTDRIVEN_FEE">CONTRACT_REF_NO~VERSION_NO~EVENT_SEQ_NO~COMPONENT~COMPONENT_NAME~SCHEDULE_DATE~CURRENCY~SUM_FEE_AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_PARTDRIVEN_FEE" RELATION_TYPE="N" TYPE="BLK_PARTICIPANT">PARTICIPANT~FEE_AMOUNT~TXT_PARTICIPANT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PARTFEE";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT_PARTDRIVEN_FEE" : "","BLK_PARTICIPANT" : "BLK_CONTRACT_PARTDRIVEN_FEE~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT_PARTDRIVEN_FEE","BLK_PARTICIPANT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCPARFE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCPARFE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT_PARTDRIVEN_FEE__COMPONENT";
pkFields[0] = "BLK_CONTRACT_PARTDRIVEN_FEE__COMPONENT";
queryFields[1] = "BLK_CONTRACT_PARTDRIVEN_FEE__EVENT_SEQ_NO";
pkFields[1] = "BLK_CONTRACT_PARTDRIVEN_FEE__EVENT_SEQ_NO";
queryFields[2] = "BLK_CONTRACT_PARTDRIVEN_FEE__CONTRACT_REF_NO";
pkFields[2] = "BLK_CONTRACT_PARTDRIVEN_FEE__CONTRACT_REF_NO";
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
var lovInfoFlds = {"BLK_PARTICIPANT__PARTICIPANT__LOV_PARTICIPANT":["BLK_PARTICIPANT__PARTICIPANT~","BLK_CONTRACT_PARTDRIVEN_FEE__CONTRACT_REF_NO!VARCHAR2","N",""]};
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
var multipleEntryIDs = new Array("BLK_PARTICIPANT");
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

ArrFuncOrigin["LBCPARFE"]="KERNEL";
ArrPrntFunc["LBCPARFE"]="";
ArrPrntOrigin["LBCPARFE"]="";
ArrRoutingType["LBCPARFE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCPARFE"]="N";
ArrCustomModified["LBCPARFE"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------