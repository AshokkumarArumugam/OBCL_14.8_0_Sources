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
**  File Name          : TLCSWONL_SYS.js
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
var fieldNameArray = {"BLK_HDR":"CONTRACTREFNO~VERSIONNO~BRANCH~DESKCODE~PORTFOLIO~PORTFOLIODESC~POSITIONIDENTIFIER~POSITIONQUALIFIER~CUSIPNO~TICKETID~TRADEUSERREFNO~EXPENSECODE~PARENTREFNO","BLK_SWAP":"CONTRACTREFNO~VERSIONNO~SWAPID~SWAPCOUNTERPARTY~SWAPAMOUNT~OASYSID~SWAPREFNO"};

var multipleEntryPageSize = {"BLK_SWAP" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_TLCSWONL__TAB_MAIN":"BLK_SWAP"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HDR">CONTRACTREFNO~VERSIONNO~BRANCH~DESKCODE~PORTFOLIO~PORTFOLIODESC~POSITIONIDENTIFIER~POSITIONQUALIFIER~CUSIPNO~TICKETID~TRADEUSERREFNO~EXPENSECODE~PARENTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_HDR" RELATION_TYPE="N" TYPE="BLK_SWAP">CONTRACTREFNO~VERSIONNO~SWAPID~SWAPCOUNTERPARTY~SWAPAMOUNT~OASYSID~SWAPREFNO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TLCSWONL";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_HDR" : "","BLK_SWAP" : "BLK_HDR~N"}; 

 var dataSrcLocationArray = new Array("BLK_HDR","BLK_SWAP"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLCSWONL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLCSWONL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_HDR__VERSIONNO";
pkFields[0] = "BLK_HDR__VERSIONNO";
queryFields[1] = "BLK_HDR__CONTRACTREFNO";
pkFields[1] = "BLK_HDR__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_SWAP":["OASYSID","SWAPAMOUNT","SWAPCOUNTERPARTY","SWAPID"]};
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
var multipleEntryIDs = new Array("BLK_SWAP");
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

ArrFuncOrigin["TLCSWONL"]="KERNEL";
ArrPrntFunc["TLCSWONL"]="";
ArrPrntOrigin["TLCSWONL"]="";
ArrRoutingType["TLCSWONL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLCSWONL"]="N";
ArrCustomModified["TLCSWONL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_TLCSWONL":"FCCREF~VERNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_TLCSWONL":"~"};
var scrArgDest = {"CVS_TLCSWONL":"BLK_HDR__CONTRACTREFNO~BLK_HDR__VERSIONNO"};
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