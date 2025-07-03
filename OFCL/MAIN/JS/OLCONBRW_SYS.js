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
**  File Name          : OLCONBRW_SYS.js
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
var fieldNameArray = {"BLK_BRW":"CONREFNO~LATEVNSEQNO~USEREFNO~LATVERNO~PRDCD~PRDTP~TXTCUSTOMERNO~TXTCUSTOMERNAME~TXTPRODDESC~TXTPRODTYPEDESC~TXTCOMMITMENTAMT~CURRENCY","BLK_OLTBS_CONTRACT_BORROWERS":"CONTRACTREFNO~VERSIONNO~CUSTOMERNO~TXTBORROWERNAME","BLK_OLTBS_CONTRACT_BORR_PROD":"CONTRACTREFNO~VERSIONNO~CUSTOMERNO~LOANPRODUCT~TXTLOANDESC","BLK_OLTBS_BORR_PROD_LIMIT":"CONTRACTREFNO~VERSIONNO~BORROWER~LOANPRODUCT~CCYCODE~LIMITAMOUNT~FACILITYID~FMREFNUMBER~MODIFIEDDATE~TXTCCYDESC"};

var multipleEntryPageSize = {"BLK_OLTBS_CONTRACT_BORROWERS" :"15" ,"BLK_OLTBS_CONTRACT_BORR_PROD" :"15" ,"BLK_OLTBS_BORR_PROD_LIMIT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_LDCONBRW__TAB_MAIN":"BLK_OLTBS_CONTRACT_BORROWERS~BLK_OLTBS_CONTRACT_BORR_PROD~BLK_OLTBS_BORR_PROD_LIMIT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BRW">CONREFNO~LATEVNSEQNO~USEREFNO~LATVERNO~PRDCD~PRDTP~TXTCUSTOMERNO~TXTCUSTOMERNAME~TXTPRODDESC~TXTPRODTYPEDESC~TXTCOMMITMENTAMT~CURRENCY</FN>'; 
msgxml += '      <FN PARENT="BLK_BRW" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_BORROWERS">CONTRACTREFNO~VERSIONNO~CUSTOMERNO~TXTBORROWERNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_BORROWERS" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_BORR_PROD">CONTRACTREFNO~VERSIONNO~CUSTOMERNO~LOANPRODUCT~TXTLOANDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_BORR_PROD" RELATION_TYPE="N" TYPE="BLK_OLTBS_BORR_PROD_LIMIT">CONTRACTREFNO~VERSIONNO~BORROWER~LOANPRODUCT~CCYCODE~LIMITAMOUNT~FACILITYID~FMREFNUMBER~MODIFIEDDATE~TXTCCYDESC</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_LDCONBRW";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BRW" : "","BLK_OLTBS_CONTRACT_BORROWERS" : "BLK_BRW~N","BLK_OLTBS_CONTRACT_BORR_PROD" : "BLK_OLTBS_CONTRACT_BORROWERS~N","BLK_OLTBS_BORR_PROD_LIMIT" : "BLK_OLTBS_CONTRACT_BORR_PROD~N"}; 

 var dataSrcLocationArray = new Array("BLK_BRW","BLK_OLTBS_CONTRACT_BORROWERS","BLK_OLTBS_CONTRACT_BORR_PROD","BLK_OLTBS_BORR_PROD_LIMIT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCONBRW.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCONBRW.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BRW__CONREFNO";
pkFields[0] = "BLK_BRW__CONREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTBS_BORR_PROD_LIMIT":["BORROWER","CCYCODE","CONTRACTREFNO","FACILITYID","FMREFNUMBER","LIMITAMOUNT","LOANPRODUCT","MODIFIEDDATEI","TXTCCYDESC","VERSIONNO"],"BLK_OLTBS_CONTRACT_BORROWERS":["CONTRACTREFNO","CUSTOMERNO","TXTBORROWERNAME","VERSIONNO"],"BLK_OLTBS_CONTRACT_BORR_PROD":["CONTRACTREFNO","CUSTOMERNO","LOANPRODUCT","TXTLOANDESC","VERSIONNO"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT_BORROWERS__CUSTOMERNO__LOV_CUSTOMER_NO":["BLK_OLTBS_CONTRACT_BORROWERS__CUSTOMERNO~BLK_OLTBS_CONTRACT_BORROWERS__TXTBORROWERNAME~","","N~N",""],"BLK_OLTBS_CONTRACT_BORR_PROD__LOANPRODUCT__LOV_LOAN_PRD":["BLK_OLTBS_CONTRACT_BORR_PROD__LOANPRODUCT~BLK_OLTBS_CONTRACT_BORR_PROD__TXTLOANDESC~","","N~N",""],"BLK_OLTBS_BORR_PROD_LIMIT__CCYCODE__LOV_CURRENCY":["BLK_OLTBS_BORR_PROD_LIMIT__CCYCODE~BLK_OLTBS_BORR_PROD_LIMIT__TXTCCYDESC~","BLK_OLTBS_CONTRACT_BORR_PROD__LOANPRODUCT!~BLK_BRW__PRDCD!~BLK_OLTBS_CONTRACT_BORR_PROD__LOANPRODUCT!","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_CONTRACT_BORROWERS","BLK_OLTBS_CONTRACT_BORR_PROD","BLK_OLTBS_BORR_PROD_LIMIT");
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

ArrFuncOrigin["OLCONBRW"]="KERNEL";
ArrPrntFunc["OLCONBRW"]="";
ArrPrntOrigin["OLCONBRW"]="";
ArrRoutingType["OLCONBRW"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCONBRW"]="N";
ArrCustomModified["OLCONBRW"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_LDCONBRW":"PRDCODE~CONTREFNO~USERREFNO~CUSTNO~COMMITAMT~LATESTVERNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_LDCONBRW":"~~~~~"};
var scrArgDest = {"CVS_LDCONBRW":"BLK_BRW__PRDCD~BLK_BRW__CONREFNO~BLK_BRW__USEREFNO~BLK_BRW__TXTCUSTOMERNO~BLK_BRW__TXTCOMMITMENTAMT~BLK_BRW__LATVERNO"};
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