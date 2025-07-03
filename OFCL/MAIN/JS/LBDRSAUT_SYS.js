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
**  File Name          : LBDRSAUT_SYS.js
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
var fieldNameArray = {"BLK_OLTBC_CONTRACT":"CONREFNO~USEREFNO~LATESTEVNTSEQNO","BLK_SPLIT_MASTER":"CONTRACTREFNO~SPLITSERIALNO~SPLIBOOKDATE~SPLIVALUEDATE~MAKER_ID~MAKER_DT_STAMP~RECORD_STAT~SPLIT_STATUS~EVENT_COMPLETE","BLK_SPLIT_DETAIL":"CONTREFNO~SPLITSERIALNO~SERIALNO~CHILDREFNO~CCY~AMOUNT~MATURITY_DATE~CONTRACT_SERIAL_NO","BLK_CONTRACT_OVD":"CONTREFNO~EVNTSEQNO~ERRORCODE~TXTOVD~TXTCONFIRM~AUTHBY~AUTHDTSTAMP~TXTUISTATUS"};

var multipleEntryPageSize = {"BLK_SPLIT_DETAIL" :"15" ,"BLK_CONTRACT_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_SPLIT_DETAIL~BLK_CONTRACT_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBC_CONTRACT">CONREFNO~USEREFNO~LATESTEVNTSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBC_CONTRACT" RELATION_TYPE="1" TYPE="BLK_SPLIT_MASTER">CONTRACTREFNO~SPLITSERIALNO~SPLIBOOKDATE~SPLIVALUEDATE~MAKER_ID~MAKER_DT_STAMP~RECORD_STAT~SPLIT_STATUS~EVENT_COMPLETE</FN>'; 
msgxml += '      <FN PARENT="BLK_SPLIT_MASTER" RELATION_TYPE="N" TYPE="BLK_SPLIT_DETAIL">CONTREFNO~SPLITSERIALNO~SERIALNO~CHILDREFNO~CCY~AMOUNT~MATURITY_DATE~CONTRACT_SERIAL_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBC_CONTRACT" RELATION_TYPE="N" TYPE="BLK_CONTRACT_OVD">CONTREFNO~EVNTSEQNO~ERRORCODE~TXTOVD~TXTCONFIRM~AUTHBY~AUTHDTSTAMP~TXTUISTATUS</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBC_CONTRACT" : "","BLK_SPLIT_MASTER" : "BLK_OLTBC_CONTRACT~1","BLK_SPLIT_DETAIL" : "BLK_SPLIT_MASTER~N","BLK_CONTRACT_OVD" : "BLK_OLTBC_CONTRACT~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBC_CONTRACT","BLK_SPLIT_MASTER","BLK_SPLIT_DETAIL","BLK_CONTRACT_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDRSAUT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDRSAUT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBC_CONTRACT__CONREFNO";
pkFields[0] = "BLK_OLTBC_CONTRACT__CONREFNO";
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
var multipleEntryIDs = new Array("BLK_SPLIT_DETAIL","BLK_CONTRACT_OVD");
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

ArrFuncOrigin["LBDRSAUT"]="KERNEL";
ArrPrntFunc["LBDRSAUT"]="";
ArrPrntOrigin["LBDRSAUT"]="";
ArrRoutingType["LBDRSAUT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDRSAUT"]="N";
ArrCustomModified["LBDRSAUT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_AUTH":"CONREFNO"};
var scrArgSource = {"CVS_AUTH":"BLK_OLTBC_CONTRACT__CONREFNO"};
var scrArgVals = {"CVS_AUTH":""};
var scrArgDest = {"CVS_AUTH":"BLK_OLTBC_CONTRACT__CONREFNO"};
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