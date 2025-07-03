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
**  File Name          : LPCRCMTT_SYS.js
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
var fieldNameArray = {"BLK_PARTICIPANT":"CONTRACTREFNO~TXT_USER_REFNO~TXT_CUSTOMER_NAME~TXT_PRODUCT~TXT_PRODUCT_DESC~TXT_PRODUCT_TYPE~TXT_PRODUCT_TYPE_DESC~TXT_PURPOSE_SYNDICATION~TXT_FACILITY_NAME~TXT_TOTAL_RATE~BRANCH~COUNTERPARTY","BLK_PART_MARGIN_COMPONENT":"BRANCHCODE~CONTRACTREFNO~CUSTOMERNO~COMPONENT~CURRENCY~SLABTIER~AMTORPERCENT~TXT_USER_REF_NO~TXT_CUSTOMER_NAME~TXT_FACILITY_REF_NO~TXT_COMPONENT_DESCRIPTION~TXT_BOOK_DATE~TXT_VALUE_DATE","BLK_PART_MARGIN_CCY":"CCY~BRANCHCODE~CUSTOMERNO~CONTRACTREFNO~COMPONENT~TXT_CCY_DESC","BLK_PART_MARGIN_EFFDATE":"BRANCHCODE~CUSTOMERNO~COMPONENT~CONTRACTREFNO~CCY~LASTCHAGETIMESTAMP~RECALCREQD~EFFECTIVEDATE","BLK_PART_MARGIN_RATE":"MARGIN~COMPONENT~EFFECTIVEDATE~CUSTOMERNO~MARGINRATE~CCY~FROMBASISAMT~CONTRACTREFNO~TOBASISAMT~BRANCHCODE~SEQ_NO~MARGINRECORDSTATUS","BLK_PARTICIPANT_MARGIN_RATE":"CONTRACTREFNO~BRANCHCODE~CUSTOMERNO~COMPONENT~EFFECTIVEDATE~SEQNO~MARGINRECORDSTATUS~CCY~MARGIN~PARTICIPANT~FROMBASISAMT~MARGINRATE~TOBASISAMT~TXT_PARTICIPANT_NAME~TXT_ASSET_RATIO"};

var multipleEntryPageSize = {"BLK_PART_MARGIN_CCY" :"15" ,"BLK_PART_MARGIN_EFFDATE" :"15" ,"BLK_PART_MARGIN_RATE" :"15" ,"BLK_PARTICIPANT_MARGIN_RATE" :"15" };

var multipleEntrySVBlocks = "BLK_PART_MARGIN_COMPONENT";

var tabMEBlks = {"CVS_PARTICIPANT__TAB_MAIN":"BLK_PART_MARGIN_CCY~BLK_PART_MARGIN_EFFDATE~BLK_PART_MARGIN_RATE~BLK_PARTICIPANT_MARGIN_RATE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PARTICIPANT">CONTRACTREFNO~TXT_USER_REFNO~TXT_CUSTOMER_NAME~TXT_PRODUCT~TXT_PRODUCT_DESC~TXT_PRODUCT_TYPE~TXT_PRODUCT_TYPE_DESC~TXT_PURPOSE_SYNDICATION~TXT_FACILITY_NAME~TXT_TOTAL_RATE~BRANCH~COUNTERPARTY</FN>'; 
msgxml += '      <FN PARENT="BLK_PARTICIPANT" RELATION_TYPE="N" TYPE="BLK_PART_MARGIN_COMPONENT">BRANCHCODE~CONTRACTREFNO~CUSTOMERNO~COMPONENT~CURRENCY~SLABTIER~AMTORPERCENT~TXT_USER_REF_NO~TXT_CUSTOMER_NAME~TXT_FACILITY_REF_NO~TXT_COMPONENT_DESCRIPTION~TXT_BOOK_DATE~TXT_VALUE_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_MARGIN_COMPONENT" RELATION_TYPE="N" TYPE="BLK_PART_MARGIN_CCY">CCY~BRANCHCODE~CUSTOMERNO~CONTRACTREFNO~COMPONENT~TXT_CCY_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_MARGIN_CCY" RELATION_TYPE="N" TYPE="BLK_PART_MARGIN_EFFDATE">BRANCHCODE~CUSTOMERNO~COMPONENT~CONTRACTREFNO~CCY~LASTCHAGETIMESTAMP~RECALCREQD~EFFECTIVEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_MARGIN_EFFDATE" RELATION_TYPE="N" TYPE="BLK_PART_MARGIN_RATE">MARGIN~COMPONENT~EFFECTIVEDATE~CUSTOMERNO~MARGINRATE~CCY~FROMBASISAMT~CONTRACTREFNO~TOBASISAMT~BRANCHCODE~SEQ_NO~MARGINRECORDSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_MARGIN_RATE" RELATION_TYPE="N" TYPE="BLK_PARTICIPANT_MARGIN_RATE">CONTRACTREFNO~BRANCHCODE~CUSTOMERNO~COMPONENT~EFFECTIVEDATE~SEQNO~MARGINRECORDSTATUS~CCY~MARGIN~PARTICIPANT~FROMBASISAMT~MARGINRATE~TOBASISAMT~TXT_PARTICIPANT_NAME~TXT_ASSET_RATIO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PARTICIPANT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PARTICIPANT" : "","BLK_PART_MARGIN_COMPONENT" : "BLK_PARTICIPANT~N","BLK_PART_MARGIN_CCY" : "BLK_PART_MARGIN_COMPONENT~N","BLK_PART_MARGIN_EFFDATE" : "BLK_PART_MARGIN_CCY~N","BLK_PART_MARGIN_RATE" : "BLK_PART_MARGIN_EFFDATE~N","BLK_PARTICIPANT_MARGIN_RATE" : "BLK_PART_MARGIN_RATE~N"}; 

 var dataSrcLocationArray = new Array("BLK_PARTICIPANT","BLK_PART_MARGIN_COMPONENT","BLK_PART_MARGIN_CCY","BLK_PART_MARGIN_EFFDATE","BLK_PART_MARGIN_RATE","BLK_PARTICIPANT_MARGIN_RATE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LPCRCMTT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LPCRCMTT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PARTICIPANT__BRANCH";
pkFields[0] = "BLK_PARTICIPANT__BRANCH";
queryFields[1] = "BLK_PARTICIPANT__CONTRACTREFNO";
pkFields[1] = "BLK_PARTICIPANT__CONTRACTREFNO";
queryFields[2] = "BLK_PARTICIPANT__COUNTERPARTY";
pkFields[2] = "BLK_PARTICIPANT__COUNTERPARTY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_PART_MARGIN_CCY":["CCY","TXT_CCY_DESC"],"BLK_PART_MARGIN_EFFDATE":["EFFECTIVEDATEI"],"BLK_PART_MARGIN_RATE":["FROMBASISAMT","MARGINRATE","TOBASISAMT"]};
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
var lovInfoFlds = {"BLK_PART_MARGIN_COMPONENT__CONTRACTREFNO__LOV_CONTRACT":["BLK_PART_MARGIN_COMPONENT__CONTRACTREFNO~BLK_PART_MARGIN_COMPONENT__TXT_USER_REF_NO~BLK_PART_MARGIN_COMPONENT__BRANCHCODE~BLK_PART_MARGIN_COMPONENT__CURRENCY~","","N~N~N~N",""],"BLK_PART_MARGIN_COMPONENT__CUSTOMERNO__LOV_CUSTOMER":["BLK_PART_MARGIN_COMPONENT__CUSTOMERNO~BLK_PART_MARGIN_COMPONENT__TXT_CUSTOMER_NAME~","BLK_PART_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2~BLK_PART_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2","N~N",""],"BLK_PART_MARGIN_COMPONENT__COMPONENT__LOV_COMPONENT":["BLK_PART_MARGIN_COMPONENT__COMPONENT~BLK_PART_MARGIN_COMPONENT__TXT_COMPONENT_DESCRIPTION~BLK_PART_MARGIN_COMPONENT__SLABTIER~","BLK_PART_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2","N~N~N",""],"BLK_PART_MARGIN_CCY__CCY__LOV_CCY":["BLK_PART_MARGIN_CCY__CCY~BLK_PART_MARGIN_CCY__TXT_CCY_DESC~","BLK_PART_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2","N~N",""],"BLK_PARTICIPANT_MARGIN_RATE__PARTICIPANT__LOV_PARTICIPANT":["BLK_PARTICIPANT_MARGIN_RATE__PARTICIPANT~BLK_PARTICIPANT_MARGIN_RATE__TXT_PARTICIPANT_NAME~","BLK_PART_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_PART_MARGIN_CCY","BLK_PART_MARGIN_EFFDATE","BLK_PART_MARGIN_RATE","BLK_PARTICIPANT_MARGIN_RATE");
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

ArrFuncOrigin["LPCRCMTT"]="KERNEL";
ArrPrntFunc["LPCRCMTT"]="";
ArrPrntOrigin["LPCRCMTT"]="";
ArrRoutingType["LPCRCMTT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LPCRCMTT"]="N";
ArrCustomModified["LPCRCMTT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PARTICIPANT":"CONTRACTREFNO~BRANCH~COUNTERPARTY~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_PARTICIPANT":"~~~EXECUTEQUERY"};
var scrArgDest = {"CVS_PARTICIPANT":"BLK_PARTICIPANT__CONTRACTREFNO~BLK_PARTICIPANT__BRANCH~BLK_PARTICIPANT__COUNTERPARTY~"};
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