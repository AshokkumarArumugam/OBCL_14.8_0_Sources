/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : LBDPYAUT_SYS.js
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
var fieldNameArray = {"BLK_PMT_HDR":"CONTRACT_REF_NO~COUNTERPARTY~MODULE_CODE~CONTRACT_CCY~LATEST_VERSION_NO~CURR_EVENT_CODE~USER_DEFINED_STATUS~LATEST_EVENT_SEQ_NO~OSAMT~PAYMENT_STATUS~CURRENT_EVENT_SEQ_NO~TXT_DCN~UI_EVENT","BLK_PMT_SUMMARY":"CONTRACT_REF_NO~EVENT_SEQ_NO~VALUE_DATE~TOTAL_PAID~PREPAYMENT_PENALTY_RATE~PREPAYMENT_PENALTY_AMOUNT~PAYMENT_REMARKS~PAYMENT_STATUS~UI_NETPAID~UI_NETWAIVED~UI_NETCAP","BLK_PMT":"CONTRACT_REF_NO~EVENT_SEQ_NO~COMPONENT~AMOUNT_DUE~OVERDUE_DAYS~TAX_PAID~AMOUNT_PAID~AMOUNT_WAIVED~AMOUNT_CAPITALIZED","BLK_CONTRACT_OVD":"CONTRACT_REF_NO~EVENT_SEQ_NO~AUTH_BY~OVD_STATUS~OVD_STATUS_TXT~TXT_STATUS~PARAMETERS~MODULE~ERR_CODE~OVD_TYPE~REMARKS~AUTH_DT_STAMP~CONFIRMED~OVD_SEQ_NO~ONLINE_AUTH_ID~ERR_MESSAGE~CONFIRMATION~CONFIRMATION_REQD"};

var multipleEntryPageSize = {"BLK_PMT" :"15" ,"BLK_CONTRACT_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_PMT~BLK_CONTRACT_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PMT_HDR">CONTRACT_REF_NO~COUNTERPARTY~MODULE_CODE~CONTRACT_CCY~LATEST_VERSION_NO~CURR_EVENT_CODE~USER_DEFINED_STATUS~LATEST_EVENT_SEQ_NO~OSAMT~PAYMENT_STATUS~CURRENT_EVENT_SEQ_NO~TXT_DCN~UI_EVENT</FN>'; 
msgxml += '      <FN PARENT="BLK_PMT_HDR" RELATION_TYPE="1" TYPE="BLK_PMT_SUMMARY">CONTRACT_REF_NO~EVENT_SEQ_NO~VALUE_DATE~TOTAL_PAID~PREPAYMENT_PENALTY_RATE~PREPAYMENT_PENALTY_AMOUNT~PAYMENT_REMARKS~PAYMENT_STATUS~UI_NETPAID~UI_NETWAIVED~UI_NETCAP</FN>'; 
msgxml += '      <FN PARENT="BLK_PMT_SUMMARY" RELATION_TYPE="N" TYPE="BLK_PMT">CONTRACT_REF_NO~EVENT_SEQ_NO~COMPONENT~AMOUNT_DUE~OVERDUE_DAYS~TAX_PAID~AMOUNT_PAID~AMOUNT_WAIVED~AMOUNT_CAPITALIZED</FN>'; 
msgxml += '      <FN PARENT="BLK_PMT_SUMMARY" RELATION_TYPE="N" TYPE="BLK_CONTRACT_OVD">CONTRACT_REF_NO~EVENT_SEQ_NO~AUTH_BY~OVD_STATUS~OVD_STATUS_TXT~TXT_STATUS~PARAMETERS~MODULE~ERR_CODE~OVD_TYPE~REMARKS~AUTH_DT_STAMP~CONFIRMED~OVD_SEQ_NO~ONLINE_AUTH_ID~ERR_MESSAGE~CONFIRMATION~CONFIRMATION_REQD</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PMT_HDR" : "","BLK_PMT_SUMMARY" : "BLK_PMT_HDR~1","BLK_PMT" : "BLK_PMT_SUMMARY~N","BLK_CONTRACT_OVD" : "BLK_PMT_SUMMARY~N"}; 

 var dataSrcLocationArray = new Array("BLK_PMT_HDR","BLK_PMT_SUMMARY","BLK_PMT","BLK_CONTRACT_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDPYAUT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDPYAUT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PMT_HDR__CONTRACT_REF_NO";
pkFields[0] = "BLK_PMT_HDR__CONTRACT_REF_NO";
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
var multipleEntryIDs = new Array("BLK_PMT","BLK_CONTRACT_OVD");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCSTINF~BLK_PMT_HDR","LBCINTSH~BLK_PMT_HDR"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO=OLVW_SETTLEMENT_INFO.CONTRACT_REF_NO","OLTBS_CONTRCT.CONTRACT_REF_NO=OLTBS_CONTRACT__LBCINTSH.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LBDPYAUT"]="KERNEL";
ArrPrntFunc["LBDPYAUT"]="";
ArrPrntOrigin["LBDPYAUT"]="";
ArrRoutingType["LBDPYAUT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDPYAUT"]="N";
ArrCustomModified["LBDPYAUT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCSTINF":"CONTRACTREFNO~","LBCINTSH":"CONT_REF_NO~ESN~TXT_PRM_INT_AMT~TXT_BORR_AMT_DUE","OLDVWMSG":"DCN~ACTION_CODE","OLDMSGVW":"CONTREF~ESN~EVNTCD~ACTION_CODE"};
var scrArgSource = {"OLCSTINF":"BLK_PMT_HDR__CONTRACT_REF_NO~","LBCINTSH":"BLK_PMT_HDR__CONTRACT_REF_NO~BLK_PMT_HDR__LATEST_EVENT_SEQ_NO~~","OLDVWMSG":"BLK_PMT_HDR__TXT_DCN~","OLDMSGVW":"BLK_PMT_HDR__CONTRACT_REF_NO~BLK_PMT_HDR__LATEST_EVENT_SEQ_NO~BLK_PMT_HDR__UI_EVENT~"};
var scrArgVals = {"OLCSTINF":"~","LBCINTSH":"~~~","OLDVWMSG":"~EXECUTEQUERY","OLDMSGVW":"~~~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCSTINF":"","LBCINTSH":""};
var dpndntOnSrvs = {"OLCSTINF":"","LBCINTSH":""};
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