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
**  File Name          : LBDIRAUT_SYS.js
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
var fieldNameArray = {"BLK_AUTH_RATE_FIX":"CONTRACT_REF_NO~UI_EVENT~UI_EVENT_DATE~UI_MAKER~EVENT_SEQ_NO~EVNTDT","BLK_CHANGES":"FIELD_DESCRIPTION~OLD_VALUE~NEW_VALUE~OLDDISPVAL~NEWDISPVAL","BLK_OVERRIDES":"CONTRACT_REF_NO~EVENT_SEQ_NO~AUTH_BY~AUTH_DT_STAMP~UI_OVD_TXT~UI_STATUS~CONFIRMED"};

var multipleEntryPageSize = {"BLK_CHANGES" :"15" ,"BLK_OVERRIDES" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH_IRFX__TAB_MAIN":"BLK_CHANGES~BLK_OVERRIDES"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AUTH_RATE_FIX">CONTRACT_REF_NO~UI_EVENT~UI_EVENT_DATE~UI_MAKER~EVENT_SEQ_NO~EVNTDT</FN>'; 
msgxml += '      <FN PARENT="BLK_AUTH_RATE_FIX" RELATION_TYPE="N" TYPE="BLK_CHANGES">FIELD_DESCRIPTION~OLD_VALUE~NEW_VALUE~OLDDISPVAL~NEWDISPVAL</FN>'; 
msgxml += '      <FN PARENT="BLK_AUTH_RATE_FIX" RELATION_TYPE="N" TYPE="BLK_OVERRIDES">CONTRACT_REF_NO~EVENT_SEQ_NO~AUTH_BY~AUTH_DT_STAMP~UI_OVD_TXT~UI_STATUS~CONFIRMED</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH_IRFX";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_AUTH_RATE_FIX" : "","BLK_CHANGES" : "BLK_AUTH_RATE_FIX~N","BLK_OVERRIDES" : "BLK_AUTH_RATE_FIX~N"}; 

 var dataSrcLocationArray = new Array("BLK_AUTH_RATE_FIX","BLK_CHANGES","BLK_OVERRIDES"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDIRAUT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDIRAUT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_AUTH_RATE_FIX__CONTRACT_REF_NO";
pkFields[0] = "BLK_AUTH_RATE_FIX__CONTRACT_REF_NO";
queryFields[1] = "BLK_AUTH_RATE_FIX__EVENT_SEQ_NO";
pkFields[1] = "BLK_AUTH_RATE_FIX__EVENT_SEQ_NO";
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
var multipleEntryIDs = new Array("BLK_CHANGES","BLK_OVERRIDES");
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

ArrFuncOrigin["LBDIRAUT"]="KERNEL";
ArrPrntFunc["LBDIRAUT"]="";
ArrPrntOrigin["LBDIRAUT"]="";
ArrRoutingType["LBDIRAUT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDIRAUT"]="N";
ArrCustomModified["LBDIRAUT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLDMSGVW":"CONTREF~ESN~EVNTCD~ACTION_CODE"};
var scrArgSource = {"OLDMSGVW":"BLK_AUTH_RATE_FIX__CONTRACT_REF_NO~BLK_AUTH_RATE_FIX__EVENT_SEQ_NO~BLK_AUTH_RATE_FIX__UI_EVENT~"};
var scrArgVals = {"OLDMSGVW":"~~~EXECUTEQUERY"};
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