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
**  File Name          : LBCADVIC_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT_EVENT_ADVIC":"CONTREFNO~EVNTSEQNO~SUPPRESSALL~CHKSUPPRESS","BLK_CONTRACT_EVENT_ADVIC_MULTI":"MSGTYPE~TXTDESC~SUPPRESS~CONTRACTREFNO~EVENTSEQNO~MODULE~RECEIVER~RECEIVER_NAME"};

var multipleEntryPageSize = {"BLK_CONTRACT_EVENT_ADVIC_MULTI" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_ADVICE__TAB_MAIN":"BLK_CONTRACT_EVENT_ADVIC_MULTI"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT_EVENT_ADVIC">CONTREFNO~EVNTSEQNO~SUPPRESSALL~CHKSUPPRESS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_EVENT_ADVIC" RELATION_TYPE="N" TYPE="BLK_CONTRACT_EVENT_ADVIC_MULTI">MSGTYPE~TXTDESC~SUPPRESS~CONTRACTREFNO~EVENTSEQNO~MODULE~RECEIVER~RECEIVER_NAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_ADVICE";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT_EVENT_ADVIC" : "","BLK_CONTRACT_EVENT_ADVIC_MULTI" : "BLK_CONTRACT_EVENT_ADVIC~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT_EVENT_ADVIC","BLK_CONTRACT_EVENT_ADVIC_MULTI"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCADVIC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCADVIC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT_EVENT_ADVIC__CONTREFNO";
pkFields[0] = "BLK_CONTRACT_EVENT_ADVIC__CONTREFNO";
queryFields[1] = "BLK_CONTRACT_EVENT_ADVIC__EVNTSEQNO";
pkFields[1] = "BLK_CONTRACT_EVENT_ADVIC__EVNTSEQNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_EVENT_ADVIC_MULTI":["SUPPRESS"],"BLK_CONTRACT_EVENT_ADVIC":["SUPPRESSALL"]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_EVENT_ADVIC_MULTI");
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

ArrFuncOrigin["LBCADVIC"]="KERNEL";
ArrPrntFunc["LBCADVIC"]="";
ArrPrntOrigin["LBCADVIC"]="";
ArrRoutingType["LBCADVIC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCADVIC"]="N";
ArrCustomModified["LBCADVIC"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ADVICE":"CONTREFNO~EVNTSEQNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_ADVICE":"~"};
var scrArgDest = {"CVS_ADVICE":"BLK_CONTRACT_EVENT_ADVIC__CONTREFNO~BLK_CONTRACT_EVENT_ADVIC__EVNTSEQNO"};
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