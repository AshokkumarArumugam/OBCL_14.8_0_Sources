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
**  File Name          : LBDPTCNI_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_MASTER":"CONTRACT_REF_NO~EVENT_SEQ_NO~VERSION_NO","BLK_LBSVW_STP_PART_LD_CONTRACT_INFO":"BORROWER_CONTRACT_REF_NO~BORROWER_TRANCHE_REF_NO~OL_CONTRACT~PARTICIPANT~PART_CONT_REF~PART_RATIO","BLK_OLTBS_AMOUNT_DUE":"ADJUSTED_AMOUNT~AMOUNT_DUE~AMOUNT_DUE_ACTUAL~AMOUNT_SETTLED~COMPONENT~COMPONENT_TYPE~CONTRACT_REF_NO~CURRENCY_AMT_DUE~DUE_DATE~PAY_BY_DATE","BLK_OLTBS_CONTRACT_EVENT_LOG":"AUTHSTAT~CHECKERID~CONTRACT_REF_NO~TXNSTAT~CHECKERDTST~MAKERDTST~MAKERID"};

var multipleEntryPageSize = {"BLK_LBSVW_STP_PART_LD_CONTRACT_INFO" :"15" ,"BLK_OLTBS_AMOUNT_DUE" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LBSVW_STP_PART_LD_CONTRACT_INFO~BLK_OLTBS_AMOUNT_DUE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_MASTER">CONTRACT_REF_NO~EVENT_SEQ_NO~VERSION_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_LBSVW_STP_PART_LD_CONTRACT_INFO">BORROWER_CONTRACT_REF_NO~BORROWER_TRANCHE_REF_NO~OL_CONTRACT~PARTICIPANT~PART_CONT_REF~PART_RATIO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBSVW_STP_PART_LD_CONTRACT_INFO" RELATION_TYPE="N" TYPE="BLK_OLTBS_AMOUNT_DUE">ADJUSTED_AMOUNT~AMOUNT_DUE~AMOUNT_DUE_ACTUAL~AMOUNT_SETTLED~COMPONENT~COMPONENT_TYPE~CONTRACT_REF_NO~CURRENCY_AMT_DUE~DUE_DATE~PAY_BY_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_MASTER" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">AUTHSTAT~CHECKERID~CONTRACT_REF_NO~TXNSTAT~CHECKERDTST~MAKERDTST~MAKERID</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_MASTER" : "","BLK_LBSVW_STP_PART_LD_CONTRACT_INFO" : "BLK_OLTBS_CONTRACT_MASTER~N","BLK_OLTBS_AMOUNT_DUE" : "BLK_LBSVW_STP_PART_LD_CONTRACT_INFO~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT_MASTER~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_MASTER","BLK_LBSVW_STP_PART_LD_CONTRACT_INFO","BLK_OLTBS_AMOUNT_DUE","BLK_OLTBS_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDPTCNI.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDPTCNI.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_MASTER__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT_MASTER__CONTRACT_REF_NO";
queryFields[1] = "BLK_OLTBS_CONTRACT_MASTER__VERSION_NO";
pkFields[1] = "BLK_OLTBS_CONTRACT_MASTER__VERSION_NO";
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
var multipleEntryIDs = new Array("BLK_LBSVW_STP_PART_LD_CONTRACT_INFO","BLK_OLTBS_AMOUNT_DUE");
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

ArrFuncOrigin["LBDPTCNI"]="KERNEL";
ArrPrntFunc["LBDPTCNI"]="";
ArrPrntOrigin["LBDPTCNI"]="";
ArrRoutingType["LBDPTCNI"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDPTCNI"]="N";
ArrCustomModified["LBDPTCNI"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"CONTREF~VERSION~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":"~~EXECUTEQUERY"};
var scrArgDest = {"CVS_MAIN":"BLK_OLTBS_CONTRACT_MASTER__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT_MASTER__VERSION_NO~"};
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