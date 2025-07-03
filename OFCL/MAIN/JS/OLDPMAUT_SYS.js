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
**  File Name          : OLDPMAUT_SYS.js
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
var fieldNameArray = {"BLK_CSTBS_CONTRACT_PMT_HDR":"CONTCCY~USERDEFINEDSTATUS~MODULECODE~CURREVENTCODE~COUNTERPARTY~LATVERNO~LATEVNSEQNO~CONREFNO~OSAMT~PAYMENTSTATUSUI~CURRENTESNUI","BLK_OLTBS_CONTRACT_LIQ_SUMMARY":"TOTALPAID~VALUEDATE~EVENTSEQNO~CONTRACTREFNO~PAYMENTSTATUS~PAYMENTREMARKS~PREPAYMENTPENALTYAMOUNT~PREPAYMENTPENALTYRATE~UI_NETPAID~UI_NETWAIVED~UI_NETCAP","BLK_OLTBS_CONTRACT_LIQ_PMT":"TAXPAID~OVERDUEDAYS~AMOUNTPAID~AMOUNTDUE~COMPONENT~EVENTSEQNO~CONTRACTREFNO~AMTWAIVED~AMTCAPITALIZED","BLK_OLTBS_CONTRACT_OVD":"OVDTYPE~CONFIRMED~OVDSTATUS~TXTSTATUS~AUTHDTSTAMP~AUTHBY~REMARKS~ONLINEAUTHID~ERRCODE~MODULE~OVDSEQNO~EVENTSEQNO~CONTRACTREFNO~TXT_STATUS_UI~ERRMSGUI~PARAMETERS"};

var multipleEntryPageSize = {"BLK_OLTBS_CONTRACT_LIQ_PMT" :"15" ,"BLK_OLTBS_CONTRACT_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_OLTBS_CONTRACT_LIQ_PMT~BLK_OLTBS_CONTRACT_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CSTBS_CONTRACT_PMT_HDR">CONTCCY~USERDEFINEDSTATUS~MODULECODE~CURREVENTCODE~COUNTERPARTY~LATVERNO~LATEVNSEQNO~CONREFNO~OSAMT~PAYMENTSTATUSUI~CURRENTESNUI</FN>'; 
msgxml += '      <FN PARENT="BLK_CSTBS_CONTRACT_PMT_HDR" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_LIQ_SUMMARY">TOTALPAID~VALUEDATE~EVENTSEQNO~CONTRACTREFNO~PAYMENTSTATUS~PAYMENTREMARKS~PREPAYMENTPENALTYAMOUNT~PREPAYMENTPENALTYRATE~UI_NETPAID~UI_NETWAIVED~UI_NETCAP</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_LIQ_SUMMARY" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_LIQ_PMT">TAXPAID~OVERDUEDAYS~AMOUNTPAID~AMOUNTDUE~COMPONENT~EVENTSEQNO~CONTRACTREFNO~AMTWAIVED~AMTCAPITALIZED</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_LIQ_SUMMARY" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_OVD">OVDTYPE~CONFIRMED~OVDSTATUS~TXTSTATUS~AUTHDTSTAMP~AUTHBY~REMARKS~ONLINEAUTHID~ERRCODE~MODULE~OVDSEQNO~EVENTSEQNO~CONTRACTREFNO~TXT_STATUS_UI~ERRMSGUI~PARAMETERS</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CSTBS_CONTRACT_PMT_HDR" : "","BLK_OLTBS_CONTRACT_LIQ_SUMMARY" : "BLK_CSTBS_CONTRACT_PMT_HDR~1","BLK_OLTBS_CONTRACT_LIQ_PMT" : "BLK_OLTBS_CONTRACT_LIQ_SUMMARY~N","BLK_OLTBS_CONTRACT_OVD" : "BLK_OLTBS_CONTRACT_LIQ_SUMMARY~N"}; 

 var dataSrcLocationArray = new Array("BLK_CSTBS_CONTRACT_PMT_HDR","BLK_OLTBS_CONTRACT_LIQ_SUMMARY","BLK_OLTBS_CONTRACT_LIQ_PMT","BLK_OLTBS_CONTRACT_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDPMAUT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDPMAUT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CSTBS_CONTRACT_PMT_HDR__CONREFNO";
pkFields[0] = "BLK_CSTBS_CONTRACT_PMT_HDR__CONREFNO";
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
var lovInfoFlds = {"BLK_CSTBS_CONTRACT_PMT_HDR__CONREFNO__LOV_CONTRACT_REF_NO":["BLK_CSTBS_CONTRACT_PMT_HDR__CONREFNO~BLK_CSTBS_CONTRACT_PMT_HDR__CONTCCY~BLK_CSTBS_CONTRACT_PMT_HDR__COUNTERPARTY~BLK_CSTBS_CONTRACT_PMT_HDR__USERDEFINEDSTATUS~BLK_CSTBS_CONTRACT_PMT_HDR__OSAMT~BLK_CSTBS_CONTRACT_PMT_HDR__LATEVNSEQNO~","","N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_CONTRACT_LIQ_PMT","BLK_OLTBS_CONTRACT_OVD");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCSTINF~BLK_CSTBS_CONTRACT_PMT_HDR"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO = OLVW_SETTLEMENT_INFO.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDPMAUT"]="KERNEL";
ArrPrntFunc["OLDPMAUT"]="";
ArrPrntOrigin["OLDPMAUT"]="";
ArrRoutingType["OLDPMAUT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDPMAUT"]="N";
ArrCustomModified["OLDPMAUT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCSTINF":"CONTRACTREFNO~"};
var scrArgSource = {"OLCSTINF":"BLK_CSTBS_CONTRACT_PMT_HDR__CONREFNO~"};
var scrArgVals = {"OLCSTINF":"~"};
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
var actStageArry = {"QUERY":"2","NEW":"1","MODIFY":"1","AUTHORIZE":"2","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------