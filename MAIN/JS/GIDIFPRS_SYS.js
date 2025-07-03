/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
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
**  File Name          : GIDIFPRS_SYS.js
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
var fieldNameArray = {"BLK_GITM_INTERFACE_TRIGGER":"BRANCH_CODE~EXTERNAL_SYSTEM~FILE_MASK~FILE_NAME~INTERFACE_CODE~INTERFACE_TYPE~PHY_FILE_NAME~PROCESS_CODE~STATUS~FILE_PATH~PK_SERIAL_NO~ALL_CHECK~ALL_FILE_NAME"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_GITM_INTERFACE_TRIGGER">BRANCH_CODE~EXTERNAL_SYSTEM~FILE_MASK~FILE_NAME~INTERFACE_CODE~INTERFACE_TYPE~PHY_FILE_NAME~PROCESS_CODE~STATUS~FILE_PATH~PK_SERIAL_NO~ALL_CHECK~ALL_FILE_NAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_GITM_INTERFACE_TRIGGER" : ""}; 

 var dataSrcLocationArray = new Array("BLK_GITM_INTERFACE_TRIGGER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside GIDIFPRS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside GIDIFPRS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_GITM_INTERFACE_TRIGGER__INTERFACE_CODE";
pkFields[0] = "BLK_GITM_INTERFACE_TRIGGER__INTERFACE_CODE";
queryFields[1] = "BLK_GITM_INTERFACE_TRIGGER__STATUS";
pkFields[1] = "BLK_GITM_INTERFACE_TRIGGER__STATUS";
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
var lovInfoFlds = {"BLK_GITM_INTERFACE_TRIGGER__FILE_NAME__LOV_FILE_NAMES":["BLK_GITM_INTERFACE_TRIGGER__FILE_NAME~","BLK_GITM_INTERFACE_TRIGGER__INTERFACE_CODE!VARCHAR2","N","N"],"BLK_GITM_INTERFACE_TRIGGER__INTERFACE_CODE__LOV_INTERFACE_CODE":["BLK_GITM_INTERFACE_TRIGGER__INTERFACE_CODE~BLK_GITM_INTERFACE_TRIGGER__EXTERNAL_SYSTEM~BLK_GITM_INTERFACE_TRIGGER__BRANCH_CODE~BLK_GITM_INTERFACE_TRIGGER__INTERFACE_TYPE~BLK_GITM_INTERFACE_TRIGGER__FILE_PATH~BLK_GITM_INTERFACE_TRIGGER__FILE_MASK~","","N~N~N~N~N~N",""]};
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

ArrFuncOrigin["GIDIFPRS"]="KERNEL";
ArrPrntFunc["GIDIFPRS"]="";
ArrPrntOrigin["GIDIFPRS"]="";
ArrRoutingType["GIDIFPRS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["GIDIFPRS"]="N";
ArrCustomModified["GIDIFPRS"]="N";

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