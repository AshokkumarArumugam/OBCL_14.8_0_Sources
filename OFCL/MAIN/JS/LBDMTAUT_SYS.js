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
**  File Name          : LBDMTAUT_SYS.js
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
var fieldNameArray = {"BLK_AUTH_REKEY":"CONTREFNUM~EVNTSQNO~INPUTBY~EVTDT~EVTCD~MSGGENREQD~CONTREFNUM1~LESN~LVERNO~CURRENCY","BLK_CONTRACT_OVD":"CONREFENO~EVNTSEQENO~OVDSEQNO~MOD~ERRCODE~ONLAUTHID~REMARK~AUTHBY~AUTHDTSTAMP~TXTSTAT~OVDSTAT~CONFIRMED~OVDREMARKS","BLK_BORR_ORR_MISMATCH":"FRONTSTAT~RATING~BORRFRONTTYP~CONTREFNO12~COUNTPARTY11~RATECODE11","BLK_PART_ORR_MISMATCH":"BORRREFNO10~FRONTINGTYP10~RATNG~FRONTSTAT10~INVEST","BLK_BORROWER_FRONT":"CONTREFNO2~ESN2","BLK_PART_PAYMENT_DETAILS":"FUNDAMT~COUNTERPARTY1~FUNDTYPE~CONTREFNO3~BORRCONTREFNO~PAYMNTDT"};

var multipleEntryPageSize = {"BLK_CONTRACT_OVD" :"15" ,"BLK_BORR_ORR_MISMATCH" :"15" ,"BLK_PART_ORR_MISMATCH" :"15" ,"BLK_PART_PAYMENT_DETAILS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTHVAMI__TAB_MAIN":"BLK_CONTRACT_OVD","CVS_MISMATCH_BORR__TAB_MAIN":"BLK_BORR_ORR_MISMATCH","CVS_MIS_INVEST__TAB_MAIN":"BLK_PART_ORR_MISMATCH","CVS_MSG__TAB_MAIN":"BLK_PART_PAYMENT_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AUTH_REKEY">CONTREFNUM~EVNTSQNO~INPUTBY~EVTDT~EVTCD~MSGGENREQD~CONTREFNUM1~LESN~LVERNO~CURRENCY</FN>'; 
msgxml += '      <FN PARENT="BLK_AUTH_REKEY" RELATION_TYPE="N" TYPE="BLK_CONTRACT_OVD">CONREFENO~EVNTSEQENO~OVDSEQNO~MOD~ERRCODE~ONLAUTHID~REMARK~AUTHBY~AUTHDTSTAMP~TXTSTAT~OVDSTAT~CONFIRMED~OVDREMARKS</FN>'; 
msgxml += '      <FN PARENT="BLK_AUTH_REKEY" RELATION_TYPE="N" TYPE="BLK_BORR_ORR_MISMATCH">FRONTSTAT~RATING~BORRFRONTTYP~CONTREFNO12~COUNTPARTY11~RATECODE11</FN>'; 
msgxml += '      <FN PARENT="BLK_AUTH_REKEY" RELATION_TYPE="N" TYPE="BLK_PART_ORR_MISMATCH">BORRREFNO10~FRONTINGTYP10~RATNG~FRONTSTAT10~INVEST</FN>'; 
msgxml += '      <FN PARENT="BLK_AUTH_REKEY" RELATION_TYPE="1" TYPE="BLK_BORROWER_FRONT">CONTREFNO2~ESN2</FN>'; 
msgxml += '      <FN PARENT="BLK_BORROWER_FRONT" RELATION_TYPE="N" TYPE="BLK_PART_PAYMENT_DETAILS">FUNDAMT~COUNTERPARTY1~FUNDTYPE~CONTREFNO3~BORRCONTREFNO~PAYMNTDT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTHVAMI";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_AUTH_REKEY" : "","BLK_CONTRACT_OVD" : "BLK_AUTH_REKEY~N","BLK_BORR_ORR_MISMATCH" : "BLK_AUTH_REKEY~N","BLK_PART_ORR_MISMATCH" : "BLK_AUTH_REKEY~N","BLK_BORROWER_FRONT" : "BLK_AUTH_REKEY~1","BLK_PART_PAYMENT_DETAILS" : "BLK_BORROWER_FRONT~N"}; 

 var dataSrcLocationArray = new Array("BLK_AUTH_REKEY","BLK_CONTRACT_OVD","BLK_BORR_ORR_MISMATCH","BLK_PART_ORR_MISMATCH","BLK_BORROWER_FRONT","BLK_PART_PAYMENT_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDMTAUT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDMTAUT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_AUTH_REKEY__CONTREFNUM";
pkFields[0] = "BLK_AUTH_REKEY__CONTREFNUM";
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
var multipleEntryIDs = new Array("BLK_CONTRACT_OVD","BLK_BORR_ORR_MISMATCH","BLK_PART_ORR_MISMATCH","BLK_PART_PAYMENT_DETAILS");
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

ArrFuncOrigin["LBDMTAUT"]="KERNEL";
ArrPrntFunc["LBDMTAUT"]="";
ArrPrntOrigin["LBDMTAUT"]="";
ArrRoutingType["LBDMTAUT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDMTAUT"]="N";
ArrCustomModified["LBDMTAUT"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------