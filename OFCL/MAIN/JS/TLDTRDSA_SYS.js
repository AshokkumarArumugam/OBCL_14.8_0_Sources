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
**  File Name          : TLDTRDSA_SYS.js
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
var fieldNameArray = {"BLK_TLTB_MARKIT_TRD_STL_Q":"MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID~EXTERNAL_CUSIP_NO~LQT_TICKET_ID~TRADE_DATE~EXPT_SETTL_DATE~TRADE_AMOUNT~TRADE_CCY~TRADE_PRICE~MAKER_ID~COUNTERPARTY~TRADE_REF_NO~MAKER_DT_STAMP~VISITED_STTL","BLK_CONTRACT_OVD":"CONTRACT_REF_NO~ERR_CODE~AUTH_BY~AUTH_DT_STAMP~OVD_STATUS~CONFIRMED~OVD_MSG~PARAMETERS~REMARKS~CONFIRMATION_REQD"};

var multipleEntryPageSize = {"BLK_CONTRACT_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_CONTRACT_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTB_MARKIT_TRD_STL_Q">MARKIT_TRADE_ID~MARKIT_ALLOCATION_ID~EXTERNAL_CUSIP_NO~LQT_TICKET_ID~TRADE_DATE~EXPT_SETTL_DATE~TRADE_AMOUNT~TRADE_CCY~TRADE_PRICE~MAKER_ID~COUNTERPARTY~TRADE_REF_NO~MAKER_DT_STAMP~VISITED_STTL</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTB_MARKIT_TRD_STL_Q" RELATION_TYPE="N" TYPE="BLK_CONTRACT_OVD">CONTRACT_REF_NO~ERR_CODE~AUTH_BY~AUTH_DT_STAMP~OVD_STATUS~CONFIRMED~OVD_MSG~PARAMETERS~REMARKS~CONFIRMATION_REQD</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTB_MARKIT_TRD_STL_Q" : "","BLK_CONTRACT_OVD" : "BLK_TLTB_MARKIT_TRD_STL_Q~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTB_MARKIT_TRD_STL_Q","BLK_CONTRACT_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTRDSA.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTRDSA.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTB_MARKIT_TRD_STL_Q__LQT_TICKET_ID";
pkFields[0] = "BLK_TLTB_MARKIT_TRD_STL_Q__LQT_TICKET_ID";
queryFields[1] = "BLK_TLTB_MARKIT_TRD_STL_Q__EXTERNAL_CUSIP_NO";
pkFields[1] = "BLK_TLTB_MARKIT_TRD_STL_Q__EXTERNAL_CUSIP_NO";
queryFields[2] = "BLK_TLTB_MARKIT_TRD_STL_Q__MARKIT_ALLOCATION_ID";
pkFields[2] = "BLK_TLTB_MARKIT_TRD_STL_Q__MARKIT_ALLOCATION_ID";
queryFields[3] = "BLK_TLTB_MARKIT_TRD_STL_Q__MARKIT_TRADE_ID";
pkFields[3] = "BLK_TLTB_MARKIT_TRD_STL_Q__MARKIT_TRADE_ID";
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
//***** Fields Amendable while Authorize *****
var authorizeAmenArr = {"BLK_CONTRACT_OVD":["CONFIRMED"]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_OVD");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCSTINF~BLK_TLTB_MARKIT_TRD_STL_Q"); 

 var CallFormRelat=new Array("TLTBS_MARKIT_TRADE_SETTL_QUEUE.TRADE_REF_NO = OLVW_SETTLEMENT_INFO.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDTRDSA"]="KERNEL";
ArrPrntFunc["TLDTRDSA"]="";
ArrPrntOrigin["TLDTRDSA"]="";
ArrRoutingType["TLDTRDSA"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTRDSA"]="N";
ArrCustomModified["TLDTRDSA"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCSTINF":"CONTRACTREFNO"};
var scrArgSource = {"OLCSTINF":"BLK_TLTB_MARKIT_TRD_STL_Q__TRADE_REF_NO"};
var scrArgVals = {"OLCSTINF":""};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------