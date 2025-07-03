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
**  File Name          : LBDPTADV_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT_MAIN":"CONTRACT_REF_NO~USER_REF_NO~BRANCH~DEPARTMENT_CODE~TREASURY_SOURCE~TXTSTATUS","BLK_LBVW_REGEN":"BORROWER_REF_NO~CONTRACT_TYPE~PARTICIPANT_REF_NO~PARTICIPANT~PRAM_SOURCE_REF_NO~PARTICIPANT_NAME~GENERATE~STATUS","BLK_LSTB_PRAM_REGEN":"BORROWER_REF_NO~PARTICIPANT_REF_NO~PARTICIPANT~PART_ESN~PRAM_SOURCE_REF_NO~EVENT_CODE~STATUS~GENERATE~EVENT_DATE~EVENT_VALUE_DATE"};

var multipleEntryPageSize = {"BLK_LBVW_REGEN" :"15" ,"BLK_LSTB_PRAM_REGEN" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LBVW_REGEN~BLK_LSTB_PRAM_REGEN"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT_MAIN">CONTRACT_REF_NO~USER_REF_NO~BRANCH~DEPARTMENT_CODE~TREASURY_SOURCE~TXTSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MAIN" RELATION_TYPE="N" TYPE="BLK_LBVW_REGEN">BORROWER_REF_NO~CONTRACT_TYPE~PARTICIPANT_REF_NO~PARTICIPANT~PRAM_SOURCE_REF_NO~PARTICIPANT_NAME~GENERATE~STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_LBVW_REGEN" RELATION_TYPE="N" TYPE="BLK_LSTB_PRAM_REGEN">BORROWER_REF_NO~PARTICIPANT_REF_NO~PARTICIPANT~PART_ESN~PRAM_SOURCE_REF_NO~EVENT_CODE~STATUS~GENERATE~EVENT_DATE~EVENT_VALUE_DATE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT_MAIN" : "","BLK_LBVW_REGEN" : "BLK_CONTRACT_MAIN~N","BLK_LSTB_PRAM_REGEN" : "BLK_LBVW_REGEN~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT_MAIN","BLK_LBVW_REGEN","BLK_LSTB_PRAM_REGEN"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDPTADV.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDPTADV.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT_MAIN__CONTRACT_REF_NO";
pkFields[0] = "BLK_CONTRACT_MAIN__CONTRACT_REF_NO";
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
var lovInfoFlds = {"BLK_CONTRACT_MAIN__CONTRACT_REF_NO__LOV_CONTRACT":["BLK_CONTRACT_MAIN__CONTRACT_REF_NO~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBVW_REGEN","BLK_LSTB_PRAM_REGEN");
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

ArrFuncOrigin["LBDPTADV"]="KERNEL";
ArrPrntFunc["LBDPTADV"]="";
ArrPrntOrigin["LBDPTADV"]="";
ArrRoutingType["LBDPTADV"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDPTADV"]="N";
ArrCustomModified["LBDPTADV"]="N";

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