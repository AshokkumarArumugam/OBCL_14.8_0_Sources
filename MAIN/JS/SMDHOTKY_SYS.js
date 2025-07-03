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
**  File Name          : SMDHOTKY_SYS.js
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
var fieldNameArray = {"BLK_HOTKEYS":"USERID~HOTKEY1~HOTKEY2~HOTKEY3~HOTKEY4~HOTKEY5~HOTKEY6~HOTKEY7~HOTKEY8~HOTKEY9"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HOTKEYS">USERID~HOTKEY1~HOTKEY2~HOTKEY3~HOTKEY4~HOTKEY5~HOTKEY6~HOTKEY7~HOTKEY8~HOTKEY9</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_HOTKEYS" : ""}; 

 var dataSrcLocationArray = new Array("BLK_HOTKEYS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SMDHOTKY.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SMDHOTKY.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_HOTKEYS__USERID";
pkFields[0] = "BLK_HOTKEYS__USERID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_HOTKEYS":["HOTKEY1","HOTKEY2","HOTKEY3","HOTKEY4","HOTKEY5","HOTKEY6","HOTKEY7","HOTKEY8","HOTKEY9"]};
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
var lovInfoFlds = {"BLK_HOTKEYS__HOTKEY1__LOV_HOTKEY_FNID":["BLK_HOTKEYS__HOTKEY1~~","BLK_HOTKEYS__USERID!VARCHAR2","N~N",""],"BLK_HOTKEYS__HOTKEY2__LOV_HOTKEY_FNID":["BLK_HOTKEYS__HOTKEY2~~","BLK_HOTKEYS__USERID!VARCHAR2","N~N",""],"BLK_HOTKEYS__HOTKEY3__LOV_HOTKEY_FNID":["BLK_HOTKEYS__HOTKEY3~~","BLK_HOTKEYS__USERID!VARCHAR2","N~N",""],"BLK_HOTKEYS__HOTKEY4__LOV_HOTKEY_FNID":["BLK_HOTKEYS__HOTKEY4~~","BLK_HOTKEYS__USERID!VARCHAR2","N~N",""],"BLK_HOTKEYS__HOTKEY5__LOV_HOTKEY_FNID":["BLK_HOTKEYS__HOTKEY5~~","BLK_HOTKEYS__USERID!VARCHAR2","N~N",""],"BLK_HOTKEYS__HOTKEY6__LOV_HOTKEY_FNID":["BLK_HOTKEYS__HOTKEY6~~","BLK_HOTKEYS__USERID!VARCHAR2","N~N",""],"BLK_HOTKEYS__HOTKEY7__LOV_HOTKEY_FNID":["BLK_HOTKEYS__HOTKEY7~~","BLK_HOTKEYS__USERID!VARCHAR2","N~N",""],"BLK_HOTKEYS__HOTKEY8__LOV_HOTKEY_FNID":["BLK_HOTKEYS__HOTKEY8~~","BLK_HOTKEYS__USERID!VARCHAR2","N~N",""],"BLK_HOTKEYS__HOTKEY9__LOV_HOTKEY_FNID":["BLK_HOTKEYS__HOTKEY9~~","BLK_HOTKEYS__USERID!VARCHAR2","N~N",""]};
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

ArrFuncOrigin["SMDHOTKY"]="KERNEL";
ArrPrntFunc["SMDHOTKY"]="";
ArrPrntOrigin["SMDHOTKY"]="";
ArrRoutingType["SMDHOTKY"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["SMDHOTKY"]="N";
ArrCustomModified["SMDHOTKY"]="N";

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
var actStageArry = {"QUERY":"","NEW":"","MODIFY":"","AUTHORIZE":"","DELETE":"","CLOSE":"","REOPEN":"","REVERSE":"","ROLLOVER":"","CONFIRM":"","LIQUIDATE":"","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------