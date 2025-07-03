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
**  File Name          : LFCTRCHG_SYS.js
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
var fieldNameArray = {"BLK_CHARGES":"LATEVNSEQNO~CONREFNO~MODULECODE","BLK_CHARGE_ASSOCIATION":"CONTRACT_REF_NO~EVENT_SEQ_NO~COMPNT~CREATESN~RULE~WAIVER~DISACCRAPPL~ACCRREQD~EVENT~ALLOWRULEAMENDMENT~AMENDAFTERASSOCIATION~DESC","BLK_CHARGE_APPLICATION":"CONTRACT_REF_NO~EVENT_SEQ_NO~CREATESN~COMPNT~TGCCY~TGAMT~CHRGCCY~CHRGAMT~DISACCRAPPL~WAIVER~LIQDIND~ALLOWAMOUNTAMENDMENT~LCY_EQUIVALENT~EXCHANGE_RATE","BLK_CHARGE_LIQUIDATION":"CONTRACT_REF_NO~ESN~COMPNT~CHRGCCY~CHRGAMT~LIQDSTAT~DEFERREDSTATUS~DISDEFERREDSTATUSUI"};

var multipleEntryPageSize = {"BLK_CHARGE_ASSOCIATION" :"15" ,"BLK_CHARGE_APPLICATION" :"15" ,"BLK_CHARGE_LIQUIDATION" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_CFCTRCHG__TAB_MAIN":"BLK_CHARGE_ASSOCIATION~BLK_CHARGE_APPLICATION~BLK_CHARGE_LIQUIDATION"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CHARGES">LATEVNSEQNO~CONREFNO~MODULECODE</FN>'; 
msgxml += '      <FN PARENT="BLK_CHARGES" RELATION_TYPE="N" TYPE="BLK_CHARGE_ASSOCIATION">CONTRACT_REF_NO~EVENT_SEQ_NO~COMPNT~CREATESN~RULE~WAIVER~DISACCRAPPL~ACCRREQD~EVENT~ALLOWRULEAMENDMENT~AMENDAFTERASSOCIATION~DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_CHARGES" RELATION_TYPE="N" TYPE="BLK_CHARGE_APPLICATION">CONTRACT_REF_NO~EVENT_SEQ_NO~CREATESN~COMPNT~TGCCY~TGAMT~CHRGCCY~CHRGAMT~DISACCRAPPL~WAIVER~LIQDIND~ALLOWAMOUNTAMENDMENT~LCY_EQUIVALENT~EXCHANGE_RATE</FN>'; 
msgxml += '      <FN PARENT="BLK_CHARGES" RELATION_TYPE="N" TYPE="BLK_CHARGE_LIQUIDATION">CONTRACT_REF_NO~ESN~COMPNT~CHRGCCY~CHRGAMT~LIQDSTAT~DEFERREDSTATUS~DISDEFERREDSTATUSUI</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_CFCTRCHG";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CHARGES" : "","BLK_CHARGE_ASSOCIATION" : "BLK_CHARGES~N","BLK_CHARGE_APPLICATION" : "BLK_CHARGES~N","BLK_CHARGE_LIQUIDATION" : "BLK_CHARGES~N"}; 

 var dataSrcLocationArray = new Array("BLK_CHARGES","BLK_CHARGE_ASSOCIATION","BLK_CHARGE_APPLICATION","BLK_CHARGE_LIQUIDATION"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFCTRCHG.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFCTRCHG.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CHARGES__CONREFNO";
pkFields[0] = "BLK_CHARGES__CONREFNO";
queryFields[1] = "BLK_CHARGES__LATEVNSEQNO";
pkFields[1] = "BLK_CHARGES__LATEVNSEQNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CHARGE_APPLICATION":["CHRGAMT","CHRGCCY","COMPNT","DISACCRAPPL","LIQDIND","TGAMT","TGCCY","WAIVER"],"BLK_CHARGE_ASSOCIATION":["ACCRREQD","COMPNT","CREATESN","DISACCRAPPL","RULE","WAIVER"],"BLK_CHARGE_LIQUIDATION":["CHRGAMT","CHRGCCY","LIQDSTAT"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
//***** Fields Amendable while Rollover *****
var rolloverAmendArr = {"BLK_CHARGE_APPLICATION":["CHRGAMT","CHRGCCY","COMPNT","DISACCRAPPL","LIQDIND","TGAMT","TGCCY","WAIVER"],"BLK_CHARGE_ASSOCIATION":["ACCRREQD","COMPNT","CREATESN","DISACCRAPPL","RULE","WAIVER"],"BLK_CHARGE_LIQUIDATION":["CHRGAMT","CHRGCCY","COMPNT","LIQDSTAT"]};
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
var queryAmendArr = new Array(); 
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_CHARGE_ASSOCIATION__RULE__LOV_RULE":["BLK_CHARGE_ASSOCIATION__RULE~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CHARGE_ASSOCIATION","BLK_CHARGE_APPLICATION","BLK_CHARGE_LIQUIDATION");
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

ArrFuncOrigin["LFCTRCHG"]="KERNEL";
ArrPrntFunc["LFCTRCHG"]="";
ArrPrntOrigin["LFCTRCHG"]="";
ArrRoutingType["LFCTRCHG"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFCTRCHG"]="N";
ArrCustomModified["LFCTRCHG"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_CFCTRCHG":"CONTREF~ESN~MODULECODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_CFCTRCHG":"~~"};
var scrArgDest = {"CVS_CFCTRCHG":"BLK_CHARGES__CONREFNO~BLK_CHARGES__LATEVNSEQNO~BLK_CHARGES__MODULECODE"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"2","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------