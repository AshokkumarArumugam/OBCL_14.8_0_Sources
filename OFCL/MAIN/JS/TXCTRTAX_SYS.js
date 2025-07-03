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
**  File Name          : TXCTRTAX_SYS.js
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
var fieldNameArray = {"BLK_TAXES":"CONREFNO~LATEVNSEQNO~LATVERNO","BLK_TAX":"ESN~CONREFNO~SCHEME~WAIVER~SCHEMADESC","BLK_RULE":"RULE~CONREFNO~BASISAMNTAG~COMPUEVNT~WAIVER~ESN~TYP~RATE~TAXCATY","BLK_RULE_DETAILS":"CONREFNO~RULE~VALUEDT~COMPUTATIONDT~CCY~AMT~ESN~EFFECTIVEDT~STAT~RATE~LCY_REVAL_AMT~EXCHANGE_RATE"};

var multipleEntryPageSize = {"BLK_RULE" :"15" ,"BLK_RULE_DETAILS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_TAX__All":"BLK_RULE~BLK_RULE_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TAXES">CONREFNO~LATEVNSEQNO~LATVERNO</FN>'; 
msgxml += '      <FN PARENT="BLK_TAXES" RELATION_TYPE="1" TYPE="BLK_TAX">ESN~CONREFNO~SCHEME~WAIVER~SCHEMADESC</FN>'; 
msgxml += '      <FN PARENT="BLK_TAX" RELATION_TYPE="N" TYPE="BLK_RULE">RULE~CONREFNO~BASISAMNTAG~COMPUEVNT~WAIVER~ESN~TYP~RATE~TAXCATY</FN>'; 
msgxml += '      <FN PARENT="BLK_RULE" RELATION_TYPE="N" TYPE="BLK_RULE_DETAILS">CONREFNO~RULE~VALUEDT~COMPUTATIONDT~CCY~AMT~ESN~EFFECTIVEDT~STAT~RATE~LCY_REVAL_AMT~EXCHANGE_RATE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TAX";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TAXES" : "","BLK_TAX" : "BLK_TAXES~1","BLK_RULE" : "BLK_TAX~N","BLK_RULE_DETAILS" : "BLK_RULE~N"}; 

 var dataSrcLocationArray = new Array("BLK_TAXES","BLK_TAX","BLK_RULE","BLK_RULE_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TXCTRTAX.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TXCTRTAX.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TAXES__CONREFNO";
pkFields[0] = "BLK_TAXES__CONREFNO";
queryFields[1] = "BLK_TAXES__LATEVNSEQNO";
pkFields[1] = "BLK_TAXES__LATEVNSEQNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_RULE_DETAILS":["AMT","CCY","COMPUTATIONDTI","EFFECTIVEDT","ESN","STAT"],"BLK_RULE":["BASISAMNTAG","COMPUEVNT","ESN","RATE","WAIVER"],"BLK_TAX":["SCHEME","WAIVER"]};
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
var strCurrentTabId = 'All';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_RULE","BLK_RULE_DETAILS");
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

ArrFuncOrigin["TXCTRTAX"]="KERNEL";
ArrPrntFunc["TXCTRTAX"]="";
ArrPrntOrigin["TXCTRTAX"]="";
ArrRoutingType["TXCTRTAX"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TXCTRTAX"]="N";
ArrCustomModified["TXCTRTAX"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_TAX":"CONTREF~ESN"};
var scrArgSource = {};
var scrArgVals = {"CVS_TAX":"~"};
var scrArgDest = {"CVS_TAX":"BLK_TAX__CONREFNO~BLK_TAX__ESN"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------