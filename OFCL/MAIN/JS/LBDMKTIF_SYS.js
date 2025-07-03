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
**  File Name          : LBDMKTIF_SYS.js
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
var criteriaSearch  = 'N';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_OLTBS_MARKIT_TRADE_MASTER":"MESSAGE_SEQ_NO~MESSAGE_NAME~MARKITTRADEID~BUYER~VALUE_DATE~MARKIT_TRADE_STATUS~MESSAGE_STATUS~PARTICIPANT_TRANSFER_STATUS~MESSAGEID~MARKIT_ALLOCATION_ID~LQT_TICKET_ID~ASSIGN_FEE_AMOUNT~ASSIGN_FEE_REMITTER~ASSIGN_FEE_CCY~POS_UPDATE_MSG_STATUS~TRADE_TYPE~TRADE_COMPLETELY_SETTLED~REPLACED_MARKIT_TRADEID","BLK_EXCEPTION":"ERROR_PARAM~EXT_TRADE_ID~VERSION_NO~SOURCE_CODE~EXT_CONTRACT_REF_NO~ERR_SEQ_NO~ERROR_CODE~ERROR_MESSAGE~MESSAGE_NAME~MESSAGE_ID","BLK_OLTBS_MARKIT_TRADE_DETAIL":"TRANCHE_REF_NO~EXT_CUSIP_NO~CCY~FACILITY_NAME~TRADE_REF_NO~TRANSFER_AMOUNT~MESSAGE_ID~MARKIT_TRADE_ID"};

var multipleEntryPageSize = {"BLK_OLTBS_MARKIT_TRADE_DETAIL" :"15" ,"BLK_EXCEPTION" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTBS_MARKIT_TRADE_DETAIL~BLK_EXCEPTION"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_MARKIT_TRADE_MASTER">MESSAGE_SEQ_NO~MESSAGE_NAME~MARKITTRADEID~BUYER~VALUE_DATE~MARKIT_TRADE_STATUS~MESSAGE_STATUS~PARTICIPANT_TRANSFER_STATUS~MESSAGEID~MARKIT_ALLOCATION_ID~LQT_TICKET_ID~ASSIGN_FEE_AMOUNT~ASSIGN_FEE_REMITTER~ASSIGN_FEE_CCY~POS_UPDATE_MSG_STATUS~TRADE_TYPE~TRADE_COMPLETELY_SETTLED~REPLACED_MARKIT_TRADEID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_MARKIT_TRADE_MASTER" RELATION_TYPE="N" TYPE="BLK_EXCEPTION">ERROR_PARAM~EXT_TRADE_ID~VERSION_NO~SOURCE_CODE~EXT_CONTRACT_REF_NO~ERR_SEQ_NO~ERROR_CODE~ERROR_MESSAGE~MESSAGE_NAME~MESSAGE_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_MARKIT_TRADE_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_MARKIT_TRADE_DETAIL">TRANCHE_REF_NO~EXT_CUSIP_NO~CCY~FACILITY_NAME~TRADE_REF_NO~TRANSFER_AMOUNT~MESSAGE_ID~MARKIT_TRADE_ID</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_MARKIT_TRADE_MASTER">MARKITTRADEID~MESSAGEID~LQT_TICKET_ID~MESSAGE_STATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDMKTIF";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="B";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_MARKIT_TRADE_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_MARKIT_TRADE_MASTER" : "","BLK_EXCEPTION" : "BLK_OLTBS_MARKIT_TRADE_MASTER~N","BLK_OLTBS_MARKIT_TRADE_DETAIL" : "BLK_OLTBS_MARKIT_TRADE_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_MARKIT_TRADE_MASTER","BLK_EXCEPTION","BLK_OLTBS_MARKIT_TRADE_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDMKTIF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDMKTIF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_MARKIT_TRADE_MASTER__MARKITTRADEID";
pkFields[0] = "BLK_OLTBS_MARKIT_TRADE_MASTER__MARKITTRADEID";
queryFields[1] = "BLK_OLTBS_MARKIT_TRADE_MASTER__MESSAGEID";
pkFields[1] = "BLK_OLTBS_MARKIT_TRADE_MASTER__MESSAGEID";
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
var lovInfoFlds = {"BLK_OLTBS_MARKIT_TRADE_MASTER__MARKITTRADEID__LOV_MARKITTRADEID":["BLK_OLTBS_MARKIT_TRADE_MASTER__MARKITTRADEID~","","N",""],"BLK_OLTBS_MARKIT_TRADE_MASTER__MESSAGEID__LOV_MESSAGEID":["BLK_OLTBS_MARKIT_TRADE_MASTER__MESSAGEID~","","N",""],"BLK_OLTBS_MARKIT_TRADE_DETAIL__MESSAGE_ID__LOV_MESSAGEID":["BLK_OLTBS_MARKIT_TRADE_DETAIL__MESSAGE_ID~","","N",""],"BLK_OLTBS_MARKIT_TRADE_DETAIL__MARKIT_TRADE_ID__LOV_MARKITTRADEID":["BLK_OLTBS_MARKIT_TRADE_DETAIL__MARKIT_TRADE_ID~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_MARKIT_TRADE_DETAIL","BLK_EXCEPTION");
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

ArrFuncOrigin["LBDMKTIF"]="KERNEL";
ArrPrntFunc["LBDMKTIF"]="";
ArrPrntOrigin["LBDMKTIF"]="";
ArrRoutingType["LBDMKTIF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDMKTIF"]="N";
ArrCustomModified["LBDMKTIF"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------