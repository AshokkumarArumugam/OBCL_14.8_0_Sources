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
**  File Name          : OLDVMAUT_SYS.js
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
var fieldNameArray = {"BLK_AUTH_REKEY":"MATDT~VALDT~CCY~AMT~CPY~ESN~VRSNO~CONTREFNO~CONTREFNUM~INPUTBY~EVNTSQNO~EVTDT~EVTCD~MSGGENREQD~INTRT~TXTCOUNTERPARTY~REKEY_TXTCCY~REKEY_TXTAMOUNT~REKEY_TXTVALDT~REKEY_TXTMATDT~REKEY_INTRT~REKEY_TXTCOUNTERPARTY","BLK_CONTRACT_CHANGE_LOG":"CONREFNO~ESN~CHGSN~DTCHANGED~FLDCHANGED~FLDDESC~OLDVAL~OLDDISPVAL~NEWVAL~NEWDISPVAL","BLK_CONTRACT_OVD":"CONREFENO~EVNTSEQENO~OVDSEQNO~MOD~ERRCODE~ONLAUTHID~REMARK~AUTHBY~AUTHDTSTAMP~TXTSTAT~OVDSTAT~CONFIRMED~OVDREMARKS"};

var multipleEntryPageSize = {"BLK_CONTRACT_CHANGE_LOG" :"15" ,"BLK_CONTRACT_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTHVAMI__TAB_MAIN":"BLK_CONTRACT_CHANGE_LOG~BLK_CONTRACT_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AUTH_REKEY">MATDT~VALDT~CCY~AMT~CPY~ESN~VRSNO~CONTREFNO~CONTREFNUM~INPUTBY~EVNTSQNO~EVTDT~EVTCD~MSGGENREQD~INTRT~TXTCOUNTERPARTY~REKEY_TXTCCY~REKEY_TXTAMOUNT~REKEY_TXTVALDT~REKEY_TXTMATDT~REKEY_INTRT~REKEY_TXTCOUNTERPARTY</FN>'; 
msgxml += '      <FN PARENT="BLK_AUTH_REKEY" RELATION_TYPE="N" TYPE="BLK_CONTRACT_CHANGE_LOG">CONREFNO~ESN~CHGSN~DTCHANGED~FLDCHANGED~FLDDESC~OLDVAL~OLDDISPVAL~NEWVAL~NEWDISPVAL</FN>'; 
msgxml += '      <FN PARENT="BLK_AUTH_REKEY" RELATION_TYPE="N" TYPE="BLK_CONTRACT_OVD">CONREFENO~EVNTSEQENO~OVDSEQNO~MOD~ERRCODE~ONLAUTHID~REMARK~AUTHBY~AUTHDTSTAMP~TXTSTAT~OVDSTAT~CONFIRMED~OVDREMARKS</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTHVAMI";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_AUTH_REKEY" : "","BLK_CONTRACT_CHANGE_LOG" : "BLK_AUTH_REKEY~N","BLK_CONTRACT_OVD" : "BLK_AUTH_REKEY~N"}; 

 var dataSrcLocationArray = new Array("BLK_AUTH_REKEY","BLK_CONTRACT_CHANGE_LOG","BLK_CONTRACT_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDVMAUT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDVMAUT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_AUTH_REKEY__CONTREFNO";
pkFields[0] = "BLK_AUTH_REKEY__CONTREFNO";
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
var multipleEntryIDs = new Array("BLK_CONTRACT_CHANGE_LOG","BLK_CONTRACT_OVD");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCSTINF~BLK_AUTH_REKEY"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT_MASTER.CONTRACT_REF_NO = OLVW_SETTLEMENT_INFO.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDVMAUT"]="KERNEL";
ArrPrntFunc["OLDVMAUT"]="";
ArrPrntOrigin["OLDVMAUT"]="";
ArrRoutingType["OLDVMAUT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDVMAUT"]="N";
ArrCustomModified["OLDVMAUT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCSTINF":"CONTRACTREFNO"};
var scrArgSource = {"OLCSTINF":"BLK_AUTH_REKEY__CONTREFNO"};
var scrArgVals = {"OLCSTINF":""};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCSTINF":""};
var dpndntOnSrvs = {"OLCSTINF":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------