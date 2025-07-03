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
**  File Name          : OLDREFAU_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"CONTRACTCCY~LATESTEVENTDATE~CONTRACTREFNO~LATESTEVENTSEQNO~LATESTVERSIONNO~COUNTERPARTY~CURREVENTCODE~MODULECODE~USERDEFINEDSTATUS","BLK_OLTBS_CONTRACT_REFUND_SUMMARY":"CONTRACTREFNO~REFUNDESN~REFUNDVALUEDATE~TOTALREFUND~REMARKS","BLK_OLTBS_CONTRACT_REFUND":"CONTRACTREFNO~REFUNDESN~COMPONENT~AMOUNTDUE~AMOUNTPAID~REFUNDAMT~REFUNDSTATUS~AMOUNTOVERPAID","BLK_OLTBS_CONTRACT_OVD":"CONTRACTREFNO~EVENTSEQNO~OVDSEQNO~MODULE~ERRCODE~PARAMETERS~ONLINEAUTHID~REMARKS~AUTHBY~AUTHDTSTAMP~TXTSTATUS~OVDSTATUS~CONFIRMED~OVDTYPE"};

var multipleEntryPageSize = {"BLK_OLTBS_CONTRACT_REFUND" :"15" ,"BLK_OLTBS_CONTRACT_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_OLTBS_CONTRACT_REFUND~BLK_OLTBS_CONTRACT_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">CONTRACTCCY~LATESTEVENTDATE~CONTRACTREFNO~LATESTEVENTSEQNO~LATESTVERSIONNO~COUNTERPARTY~CURREVENTCODE~MODULECODE~USERDEFINEDSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_REFUND_SUMMARY">CONTRACTREFNO~REFUNDESN~REFUNDVALUEDATE~TOTALREFUND~REMARKS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_REFUND">CONTRACTREFNO~REFUNDESN~COMPONENT~AMOUNTDUE~AMOUNTPAID~REFUNDAMT~REFUNDSTATUS~AMOUNTOVERPAID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_OVD">CONTRACTREFNO~EVENTSEQNO~OVDSEQNO~MODULE~ERRCODE~PARAMETERS~ONLINEAUTHID~REMARKS~AUTHBY~AUTHDTSTAMP~TXTSTATUS~OVDSTATUS~CONFIRMED~OVDTYPE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_OLTBS_CONTRACT_REFUND_SUMMARY" : "BLK_OLTBS_CONTRACT~1","BLK_OLTBS_CONTRACT_REFUND" : "BLK_OLTBS_CONTRACT~N","BLK_OLTBS_CONTRACT_OVD" : "BLK_OLTBS_CONTRACT~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_OLTBS_CONTRACT_REFUND_SUMMARY","BLK_OLTBS_CONTRACT_REFUND","BLK_OLTBS_CONTRACT_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDREFAU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDREFAU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
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
var multipleEntryIDs = new Array("BLK_OLTBS_CONTRACT_REFUND","BLK_OLTBS_CONTRACT_OVD");
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

ArrFuncOrigin["OLDREFAU"]="KERNEL";
ArrPrntFunc["OLDREFAU"]="";
ArrPrntOrigin["OLDREFAU"]="";
ArrRoutingType["OLDREFAU"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDREFAU"]="N";
ArrCustomModified["OLDREFAU"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {};
var scrArgSource = {};
var scrArgVals = {};
var scrArgDest = {};
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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------