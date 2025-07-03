/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : OLDACENT_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"CONREFNO~LATEVNSEQNO~LATVERNO~EVNTCD~SPOSTION","BLK_ACCOUNT":"ACBRN~ACNO~ACCCY~LCY~DRBRIND~TRNCD~AMTTAG~FCYAMT~TRNDT~VALDT~TRNREFNO~ACSRNO~EXRATE~LCYAMT~EVENT~AC_DESC~ACCOUNTING_SYSTEM~EXT_SYS_UNIQUE_REF_NO~HANDOFF_STATUS~RETRY_COUNT","BLK_OVERRIDE":"AUTHBY~AUTHDTSTAMP~OVDSTATUS~OVDREMARKS~CONREFNO~ESN"};

var multipleEntryPageSize = {"BLK_ACCOUNT" :"15" ,"BLK_OVERRIDE" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_ACCOUNTS__TAB_MAIN":"BLK_ACCOUNT","CVS_ACCOUNTS__TAB_OVD":"BLK_OVERRIDE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONREFNO~LATEVNSEQNO~LATVERNO~EVNTCD~SPOSTION</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="N" TYPE="BLK_ACCOUNT">ACBRN~ACNO~ACCCY~LCY~DRBRIND~TRNCD~AMTTAG~FCYAMT~TRNDT~VALDT~TRNREFNO~ACSRNO~EXRATE~LCYAMT~EVENT~AC_DESC~ACCOUNTING_SYSTEM~EXT_SYS_UNIQUE_REF_NO~HANDOFF_STATUS~RETRY_COUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="N" TYPE="BLK_OVERRIDE">AUTHBY~AUTHDTSTAMP~OVDSTATUS~OVDREMARKS~CONREFNO~ESN</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_ACCOUNTS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_ACCOUNT" : "BLK_CONTRACT~N","BLK_OVERRIDE" : "BLK_CONTRACT~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_ACCOUNT","BLK_OVERRIDE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDACENT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDACENT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONREFNO";
pkFields[0] = "BLK_CONTRACT__CONREFNO";
queryFields[1] = "BLK_CONTRACT__EVNTCD";
pkFields[1] = "BLK_CONTRACT__EVNTCD";
queryFields[2] = "BLK_CONTRACT__LATEVNSEQNO";
pkFields[2] = "BLK_CONTRACT__LATEVNSEQNO";
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
var multipleEntryIDs = new Array("BLK_ACCOUNT","BLK_OVERRIDE");
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

ArrFuncOrigin["OLDACENT"]="KERNEL";
ArrPrntFunc["OLDACENT"]="";
ArrPrntOrigin["OLDACENT"]="";
ArrRoutingType["OLDACENT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDACENT"]="N";
ArrCustomModified["OLDACENT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ACCOUNTS":"CONTREF~ESN~EVNTCD~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_ACCOUNTS":"~~~EXECUTEQUERY"};
var scrArgDest = {"CVS_ACCOUNTS":"BLK_CONTRACT__CONREFNO~BLK_CONTRACT__LATEVNSEQNO~BLK_CONTRACT__EVNTCD~"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------