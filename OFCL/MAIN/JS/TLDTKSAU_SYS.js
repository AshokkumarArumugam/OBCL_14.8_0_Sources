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
**  File Name          : TLDTKSAU_SYS.js
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
var fieldNameArray = {"BLK_TLTB_TICKET":"TICKET_ID~ACTUAL_SETTL_DATE~MAKER_DT_STAMP~TICKET_REF_NO~MAKER_ID~TRADE_DATE~EXPT_SETTL_DATE","BLK_TLTB_SUBTICKET":"SUB_TICKET_REF_NO~CHECKBOX_FLAG~TICKET_REF_NO~TICKET_ID~COUNTERPARTY~CUSTNAME","BLK_TCKT_FMEM_CCY_DETAILS":"ADHOC_BUYER_AMOUNT~ADHOC_SELLER_AMOUNT~AMEND_FEE_AMOUNT~ASSIGN_FEE_AMOUNT~BFF_AMOUNT~CURRENCY~DCF_AMOUNT~TICKET_ID~WAIVER_AMOUNT~COUNTERPARTY~CCY_TOT_AMT~SETTL_AMOUNT","BLK_OLTB_CONTRACT_OVD":"CONFIRMED~AUTH_DT_STAMP~TXT_STATUS~OVD_STATUS~AUTH_BY~CONTRACT_REF_NO~EVENT_SEQ_NO~OVD_SEQ_NO"};

var multipleEntryPageSize = {"BLK_TLTB_SUBTICKET" :"15" ,"BLK_TCKT_FMEM_CCY_DETAILS" :"15" ,"BLK_OLTB_CONTRACT_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_TLTB_SUBTICKET~BLK_TCKT_FMEM_CCY_DETAILS~BLK_OLTB_CONTRACT_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTB_TICKET">TICKET_ID~ACTUAL_SETTL_DATE~MAKER_DT_STAMP~TICKET_REF_NO~MAKER_ID~TRADE_DATE~EXPT_SETTL_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTB_TICKET" RELATION_TYPE="N" TYPE="BLK_TLTB_SUBTICKET">SUB_TICKET_REF_NO~CHECKBOX_FLAG~TICKET_REF_NO~TICKET_ID~COUNTERPARTY~CUSTNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTB_SUBTICKET" RELATION_TYPE="N" TYPE="BLK_TCKT_FMEM_CCY_DETAILS">ADHOC_BUYER_AMOUNT~ADHOC_SELLER_AMOUNT~AMEND_FEE_AMOUNT~ASSIGN_FEE_AMOUNT~BFF_AMOUNT~CURRENCY~DCF_AMOUNT~TICKET_ID~WAIVER_AMOUNT~COUNTERPARTY~CCY_TOT_AMT~SETTL_AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTB_TICKET" RELATION_TYPE="N" TYPE="BLK_OLTB_CONTRACT_OVD">CONFIRMED~AUTH_DT_STAMP~TXT_STATUS~OVD_STATUS~AUTH_BY~CONTRACT_REF_NO~EVENT_SEQ_NO~OVD_SEQ_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTB_TICKET" : "","BLK_TLTB_SUBTICKET" : "BLK_TLTB_TICKET~N","BLK_TCKT_FMEM_CCY_DETAILS" : "BLK_TLTB_SUBTICKET~N","BLK_OLTB_CONTRACT_OVD" : "BLK_TLTB_TICKET~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTB_TICKET","BLK_TLTB_SUBTICKET","BLK_TCKT_FMEM_CCY_DETAILS","BLK_OLTB_CONTRACT_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTKSAU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTKSAU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTB_TICKET__TICKET_ID";
pkFields[0] = "BLK_TLTB_TICKET__TICKET_ID";
queryFields[1] = "BLK_TLTB_TICKET__TICKET_REF_NO";
pkFields[1] = "BLK_TLTB_TICKET__TICKET_REF_NO";
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
var multipleEntryIDs = new Array("BLK_TLTB_SUBTICKET","BLK_TCKT_FMEM_CCY_DETAILS","BLK_OLTB_CONTRACT_OVD");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCETMVW~BLK_TLTB_SUBTICKET"); 

 var CallFormRelat=new Array("TLTBS_SUBTICKET_DETAIL.SUB_TICKET_REF_NO=OLTBS_CONTRACT__TLSETLINFO.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDTKSAU"]="KERNEL";
ArrPrntFunc["TLDTKSAU"]="";
ArrPrntOrigin["TLDTKSAU"]="";
ArrRoutingType["TLDTKSAU"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTKSAU"]="N";
ArrCustomModified["TLDTKSAU"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCETMVW":"CONTRACTREFNO"};
var scrArgSource = {"OLCETMVW":"BLK_TLTB_SUBTICKET__SUB_TICKET_REF_NO"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------