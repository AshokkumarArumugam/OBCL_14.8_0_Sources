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
**  File Name          : TLDMTSAU_SYS.js
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
var fieldNameArray = {"BLK_CONSOL_TICKET":"CONSOL_TICKET_REF_NO~MAKER_DT_STAMP~MAKER_ID~ACTUAL_SETTL_DATE~EXPT_SETTL_DATE~TRADE_DATE","BLK_OLTBS_CONTRACT_OVD":"TXT_STATUS~AUTH_DT_STAMP~CONFIRMED~CONTRACT_REF_NO~TXTOVD~TXT_CONFIRMATION_REQD~AUTH_BY~OVD_STATUS","BLK_CONSOLE_PMNT":"PAYMENT_REF_NO~FLAG~CONSOL_TICKET_REF_NO~COUNTERPARTY~CUSTNAME","BLK_CONSOL_FMEM_CCY_DETAILS":"ADHOC_BUYER_AMOUNT~ADHOC_SELLER_AMOUNT~AMEND_FEE_AMOUNT~ASSIGN_FEE_AMOUNT~BFF_AMOUNT~CONSOL_TICKET_REF_NO~COUNTERPARTY~CURRENCY~DCF_AMOUNT~SETTL_AMOUNT~WAIVER_AMOUNT~CCY_TOT_AMT"};

var multipleEntryPageSize = {"BLK_CONSOLE_PMNT" :"15" ,"BLK_CONSOL_FMEM_CCY_DETAILS" :"15" ,"BLK_OLTBS_CONTRACT_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_CONSOLE_PMNT~BLK_CONSOL_FMEM_CCY_DETAILS~BLK_OLTBS_CONTRACT_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONSOL_TICKET">CONSOL_TICKET_REF_NO~MAKER_DT_STAMP~MAKER_ID~ACTUAL_SETTL_DATE~EXPT_SETTL_DATE~TRADE_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_CONSOL_TICKET" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_OVD">TXT_STATUS~AUTH_DT_STAMP~CONFIRMED~CONTRACT_REF_NO~TXTOVD~TXT_CONFIRMATION_REQD~AUTH_BY~OVD_STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONSOL_TICKET" RELATION_TYPE="N" TYPE="BLK_CONSOLE_PMNT">PAYMENT_REF_NO~FLAG~CONSOL_TICKET_REF_NO~COUNTERPARTY~CUSTNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_CONSOLE_PMNT" RELATION_TYPE="N" TYPE="BLK_CONSOL_FMEM_CCY_DETAILS">ADHOC_BUYER_AMOUNT~ADHOC_SELLER_AMOUNT~AMEND_FEE_AMOUNT~ASSIGN_FEE_AMOUNT~BFF_AMOUNT~CONSOL_TICKET_REF_NO~COUNTERPARTY~CURRENCY~DCF_AMOUNT~SETTL_AMOUNT~WAIVER_AMOUNT~CCY_TOT_AMT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONSOL_TICKET" : "","BLK_OLTBS_CONTRACT_OVD" : "BLK_CONSOL_TICKET~N","BLK_CONSOLE_PMNT" : "BLK_CONSOL_TICKET~N","BLK_CONSOL_FMEM_CCY_DETAILS" : "BLK_CONSOLE_PMNT~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONSOL_TICKET","BLK_OLTBS_CONTRACT_OVD","BLK_CONSOLE_PMNT","BLK_CONSOL_FMEM_CCY_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDMTSAU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDMTSAU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONSOL_TICKET__CONSOL_TICKET_REF_NO";
pkFields[0] = "BLK_CONSOL_TICKET__CONSOL_TICKET_REF_NO";
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
var multipleEntryIDs = new Array("BLK_CONSOLE_PMNT","BLK_CONSOL_FMEM_CCY_DETAILS","BLK_OLTBS_CONTRACT_OVD");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCETMVW~BLK_CONSOLE_PMNT"); 

 var CallFormRelat=new Array("TLTBS_CONSOL_PAYMENT_DETAIL.PAYMENT_REF_NO=OLTBS_CONTRACT__TLSETLINFO.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDMTSAU"]="KERNEL";
ArrPrntFunc["TLDMTSAU"]="";
ArrPrntOrigin["TLDMTSAU"]="";
ArrRoutingType["TLDMTSAU"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDMTSAU"]="N";
ArrCustomModified["TLDMTSAU"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCETMVW":"CONTRACTREFNO"};
var scrArgSource = {"OLCETMVW":"BLK_CONSOLE_PMNT__PAYMENT_REF_NO"};
var scrArgVals = {"OLCETMVW":""};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCETMVW":""};
var dpndntOnSrvs = {"OLCETMVW":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------