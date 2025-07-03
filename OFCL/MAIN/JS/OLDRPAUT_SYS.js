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
**  File Name          : OLDRPAUT_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"CONREFNO","BLK_MERGE_MASTER_HDR":"CONTRACTREFNO~MERGESERIALNO~MERGEVALUEDATE~MERGEBOOKDATE","BLK_MERGE_MASTER":"MODNO~MAKERDTSTAMP~MAKERID~RECORDSTAT","BLK_CONT_CHANGE_LOG":"NEWVALUE~OLDVALUE~FIELDCHANGED","BLK_CONT_OVD":"CONFIRMED~TXTSTATUS~AUTHDTSTAMP~AUTHBY~TXTOVDMSG~CONTRACTREFNO","BLK_AUTH":""};

var multipleEntryPageSize = {"BLK_CONT_CHANGE_LOG" :"15" ,"BLK_CONT_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_CONT_CHANGE_LOG~BLK_CONT_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_MERGE_MASTER_HDR">CONTRACTREFNO~MERGESERIALNO~MERGEVALUEDATE~MERGEBOOKDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_MERGE_MASTER_HDR" RELATION_TYPE="1" TYPE="BLK_MERGE_MASTER">MODNO~MAKERDTSTAMP~MAKERID~RECORDSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_MERGE_MASTER_HDR" RELATION_TYPE="N" TYPE="BLK_CONT_CHANGE_LOG">NEWVALUE~OLDVALUE~FIELDCHANGED</FN>'; 
msgxml += '      <FN PARENT="BLK_MERGE_MASTER_HDR" RELATION_TYPE="N" TYPE="BLK_CONT_OVD">CONFIRMED~TXTSTATUS~AUTHDTSTAMP~AUTHBY~TXTOVDMSG~CONTRACTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_MERGE_MASTER_HDR" RELATION_TYPE="1" TYPE="BLK_AUTH"></FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_MERGE_MASTER_HDR" : "BLK_CONTRACT~1","BLK_MERGE_MASTER" : "BLK_MERGE_MASTER_HDR~1","BLK_CONT_CHANGE_LOG" : "BLK_MERGE_MASTER_HDR~N","BLK_CONT_OVD" : "BLK_MERGE_MASTER_HDR~N","BLK_AUTH" : "BLK_MERGE_MASTER_HDR~1"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_MERGE_MASTER_HDR","BLK_MERGE_MASTER","BLK_CONT_CHANGE_LOG","BLK_CONT_OVD","BLK_AUTH"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDRPAUT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDRPAUT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONREFNO";
pkFields[0] = "BLK_CONTRACT__CONREFNO";
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
var multipleEntryIDs = new Array("BLK_CONT_CHANGE_LOG","BLK_CONT_OVD");
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

ArrFuncOrigin["OLDRPAUT"]="KERNEL";
ArrPrntFunc["OLDRPAUT"]="";
ArrPrntOrigin["OLDRPAUT"]="";
ArrRoutingType["OLDRPAUT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDRPAUT"]="N";
ArrCustomModified["OLDRPAUT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_AUTH":""};
var scrArgSource = {};
var scrArgVals = {"CVS_AUTH":""};
var scrArgDest = {"CVS_AUTH":""};
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