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
**  File Name          : OLCFLRCL_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT_DETAILS":"CONTREFNO~CCY~USERREFNUM~PRODCODE~PRODDESC~CUST~CUSTNAME~FACILITYNAME~ONCEAUTH","BLK_CURRENCY_DETAILS":"CCY~CCYNAME","BLK_EFFECTIVE_DATE":"EFFDATE","BLK_RATE_DETAILS":"LOANPRD~ICOMP~BRTFLR~BRTCEIL~AIRTFLR~AIRTCEIL"};

var multipleEntryPageSize = {"BLK_CURRENCY_DETAILS" :"15" ,"BLK_EFFECTIVE_DATE" :"15" ,"BLK_RATE_DETAILS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_FLRCL__TAB_MAIN":"BLK_CURRENCY_DETAILS~BLK_EFFECTIVE_DATE~BLK_RATE_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT_DETAILS">CONTREFNO~CCY~USERREFNUM~PRODCODE~PRODDESC~CUST~CUSTNAME~FACILITYNAME~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_DETAILS" RELATION_TYPE="N" TYPE="BLK_CURRENCY_DETAILS">CCY~CCYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_CURRENCY_DETAILS" RELATION_TYPE="N" TYPE="BLK_EFFECTIVE_DATE">EFFDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_EFFECTIVE_DATE" RELATION_TYPE="N" TYPE="BLK_RATE_DETAILS">LOANPRD~ICOMP~BRTFLR~BRTCEIL~AIRTFLR~AIRTCEIL</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_FLRCL";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT_DETAILS" : "","BLK_CURRENCY_DETAILS" : "BLK_CONTRACT_DETAILS~N","BLK_EFFECTIVE_DATE" : "BLK_CURRENCY_DETAILS~N","BLK_RATE_DETAILS" : "BLK_EFFECTIVE_DATE~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT_DETAILS","BLK_CURRENCY_DETAILS","BLK_EFFECTIVE_DATE","BLK_RATE_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCFLRCL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCFLRCL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT_DETAILS__CONTREFNO";
pkFields[0] = "BLK_CONTRACT_DETAILS__CONTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CURRENCY_DETAILS":["CCY"],"BLK_EFFECTIVE_DATE":["EFFDATEI"],"BLK_RATE_DETAILS":["AIRTCEIL","AIRTFLR","BRTCEIL","BRTFLR","ICOMP","LOANPRD"]};
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
var lovInfoFlds = {"BLK_CURRENCY_DETAILS__CCY__LOV_CURRENCY":["BLK_CURRENCY_DETAILS__CCY~BLK_CURRENCY_DETAILS__CCYNAME~","BLK_CONTRACT_DETAILS__CONTREFNO!VARCHAR2~BLK_CONTRACT_DETAILS__CONTREFNO!VARCHAR2","N~N",""],"BLK_RATE_DETAILS__LOANPRD__LOV_LOAN_PRODUCT":["BLK_RATE_DETAILS__LOANPRD~~","","N~N",""],"BLK_RATE_DETAILS__ICOMP__LOV_INTEREST_COMPONENT":["~BLK_RATE_DETAILS__ICOMP~~","BLK_RATE_DETAILS__LOANPRD!VARCHAR2","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CURRENCY_DETAILS","BLK_EFFECTIVE_DATE","BLK_RATE_DETAILS");
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

ArrFuncOrigin["OLCFLRCL"]="KERNEL";
ArrPrntFunc["OLCFLRCL"]="";
ArrPrntOrigin["OLCFLRCL"]="";
ArrRoutingType["OLCFLRCL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCFLRCL"]="N";
ArrCustomModified["OLCFLRCL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_FLRCL":"CONTREFNO~CCY~USERREFNUM~PRODCODE~PRODDESC~CUST~CUSTNAME~FACILITYNAME"};
var scrArgSource = {};
var scrArgVals = {"CVS_FLRCL":"~~~~~~~"};
var scrArgDest = {"CVS_FLRCL":"BLK_CONTRACT_DETAILS__CONTREFNO~BLK_CONTRACT_DETAILS__CCY~BLK_CONTRACT_DETAILS__USERREFNUM~BLK_CONTRACT_DETAILS__PRODCODE~BLK_CONTRACT_DETAILS__PRODDESC~BLK_CONTRACT_DETAILS__CUST~BLK_CONTRACT_DETAILS__CUSTNAME~BLK_CONTRACT_DETAILS__FACILITYNAME"};
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