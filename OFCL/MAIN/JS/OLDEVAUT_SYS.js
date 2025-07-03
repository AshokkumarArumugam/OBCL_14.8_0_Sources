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
**  File Name          : OLDEVAUT_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"COUNTERPARTY~CONTCCY~USERDEFSTAT~LATEVNTSEQNO~FCCREF~UI_PAYSTATUS","BLK_LIQ_SUMMARY":"VALUEDATE~PAYREMARK~ESN~FCCREF","BLK_LIQ":"CCY~AMTPAID~COMPONENT","BLK_CONTRACT_OVD":"OVDSTATUS~TXTSTATUS~AUTHDTSTAMP~AUTHBY~REMARKS~ONLINEAUTHID~PARAMETERS~ERRCODE~MODULE~OVDSEQNO~EVENTSEQNO~CONTRACTREFNO~ERRMSG~STATUS_UI"};

var multipleEntryPageSize = {"BLK_LIQ" :"15" ,"BLK_CONTRACT_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_LIQ~BLK_CONTRACT_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">COUNTERPARTY~CONTCCY~USERDEFSTAT~LATEVNTSEQNO~FCCREF~UI_PAYSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_LIQ_SUMMARY">VALUEDATE~PAYREMARK~ESN~FCCREF</FN>'; 
msgxml += '      <FN PARENT="BLK_LIQ_SUMMARY" RELATION_TYPE="N" TYPE="BLK_LIQ">CCY~AMTPAID~COMPONENT</FN>'; 
msgxml += '      <FN PARENT="BLK_LIQ_SUMMARY" RELATION_TYPE="N" TYPE="BLK_CONTRACT_OVD">OVDSTATUS~TXTSTATUS~AUTHDTSTAMP~AUTHBY~REMARKS~ONLINEAUTHID~PARAMETERS~ERRCODE~MODULE~OVDSEQNO~EVENTSEQNO~CONTRACTREFNO~ERRMSG~STATUS_UI</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_LIQ_SUMMARY" : "BLK_CONTRACT~1","BLK_LIQ" : "BLK_LIQ_SUMMARY~N","BLK_CONTRACT_OVD" : "BLK_LIQ_SUMMARY~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_LIQ_SUMMARY","BLK_LIQ","BLK_CONTRACT_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDEVAUT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDEVAUT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__FCCREF";
pkFields[0] = "BLK_CONTRACT__FCCREF";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LIQ_SUMMARY":["PAYREMARK","VALUEDATEI"],"BLK_LIQ":["AMTPAID","CCY"]};
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
var lovInfoFlds = {"BLK_CONTRACT__FCCREF__LOV_CONTRACT":["BLK_CONTRACT__FCCREF~BLK_CONTRACT__COUNTERPARTY~BLK_CONTRACT__CONTCCY~BLK_CONTRACT__USERDEFSTAT~BLK_CONTRACT__LATEVNTSEQNO~","","N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LIQ","BLK_CONTRACT_OVD");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCTRUDF~BLK_CONTRACT"); 

 var CallFormRelat=new Array("OLVWS_CONTRACT_EVENT.FCCREF = OLTBS_CONTRACT__FLD.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("N"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDEVAUT"]="KERNEL";
ArrPrntFunc["OLDEVAUT"]="";
ArrPrntOrigin["OLDEVAUT"]="";
ArrRoutingType["OLDEVAUT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDEVAUT"]="N";
ArrCustomModified["OLDEVAUT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCTRUDF":""};
var scrArgSource = {"OLCTRUDF":""};
var scrArgVals = {"OLCTRUDF":""};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCTRUDF":""};
var dpndntOnSrvs = {"OLCTRUDF":""};
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