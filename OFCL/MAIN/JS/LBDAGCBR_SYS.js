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
**  File Name          : LBDAGCBR_SYS.js
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
var fieldNameArray = {"BLK_AGENCY_CONFIRM_BROWSER":"CUSIP_NO~EXT_AGENCY_REF~EXT_TICKET_ID~EXT_TRADE_ID~EXT_TRANSFEREE_ID~EXT_TRANSFEROR_ID~TRANCHEREFNO~TRADE_REF_NO~TRANSFEREE~TRANSFEROR~TXTCONTCCY~TRANSFER_AMOUNT~VALUE_DATE~AGENTMEICD~LQTID~MRKTALLOCID~MRKTTRDESTATS~PRMYTRADE~TRADESOURCE~TXT_FACILITY_NAME~CONFIRMSTATS~MSGSTATS~PROCESSTATS~TXT_TRANSFEROR_MEI_CODE~TXT_TRANSFEROR_CLEARPAR~TXT_TRANSFEROR_NAME~TXT_TRANSFEROR_NAME_DESC~TXT_TRANSFEREE_MEI_CODE~TXT_TRANSFEREE_CLEARPAR~TXT_TRANSFEREE_NAME~TXT_TRANSFEREE_NAME_DESC~AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~MAKER_DT_STAMP~MAKER_ID~MOD_NO~RECORD_STAT~ASGNFEEAMNT~ASGNFEECCY~ASSGNFEEREMTR~MARKED_PROCESSED","BLK_CONTRACT_EXCEPTION":"ERROR_CODE~ERROR_PARAM~ERR_SEQ_NO~EXT_CONTRACT_REF_NO~SOURCE_CODE~VERSION_NO"};

var multipleEntryPageSize = {"BLK_CONTRACT_EXCEPTION" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_EXCEP":"BLK_CONTRACT_EXCEPTION"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AGENCY_CONFIRM_BROWSER">CUSIP_NO~EXT_AGENCY_REF~EXT_TICKET_ID~EXT_TRADE_ID~EXT_TRANSFEREE_ID~EXT_TRANSFEROR_ID~TRANCHEREFNO~TRADE_REF_NO~TRANSFEREE~TRANSFEROR~TXTCONTCCY~TRANSFER_AMOUNT~VALUE_DATE~AGENTMEICD~LQTID~MRKTALLOCID~MRKTTRDESTATS~PRMYTRADE~TRADESOURCE~TXT_FACILITY_NAME~CONFIRMSTATS~MSGSTATS~PROCESSTATS~TXT_TRANSFEROR_MEI_CODE~TXT_TRANSFEROR_CLEARPAR~TXT_TRANSFEROR_NAME~TXT_TRANSFEROR_NAME_DESC~TXT_TRANSFEREE_MEI_CODE~TXT_TRANSFEREE_CLEARPAR~TXT_TRANSFEREE_NAME~TXT_TRANSFEREE_NAME_DESC~AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~MAKER_DT_STAMP~MAKER_ID~MOD_NO~RECORD_STAT~ASGNFEEAMNT~ASGNFEECCY~ASSGNFEEREMTR~MARKED_PROCESSED</FN>'; 
msgxml += '      <FN PARENT="BLK_AGENCY_CONFIRM_BROWSER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_EXCEPTION">ERROR_CODE~ERROR_PARAM~ERR_SEQ_NO~EXT_CONTRACT_REF_NO~SOURCE_CODE~VERSION_NO</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AGENCY_CONFIRM_BROWSER">EXT_AGENCY_REF~EXT_TICKET_ID~EXT_TRADE_ID~TRADE_REF_NO~CONFIRMSTATS~MSGSTATS~PROCESSTATS~TRANSFEREE~TRANSFEROR~MRKTTRDESTATS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDAGCBR";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_AGENCY_CONFIRM_BROWSER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_AGENCY_CONFIRM_BROWSER" : "","BLK_CONTRACT_EXCEPTION" : "BLK_AGENCY_CONFIRM_BROWSER~N"}; 

 var dataSrcLocationArray = new Array("BLK_AGENCY_CONFIRM_BROWSER","BLK_CONTRACT_EXCEPTION"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDAGCBR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDAGCBR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_AGENCY_CONFIRM_BROWSER__EXT_TRADE_ID";
pkFields[0] = "BLK_AGENCY_CONFIRM_BROWSER__EXT_TRADE_ID";
queryFields[1] = "BLK_AGENCY_CONFIRM_BROWSER__EXT_TICKET_ID";
pkFields[1] = "BLK_AGENCY_CONFIRM_BROWSER__EXT_TICKET_ID";
queryFields[2] = "BLK_AGENCY_CONFIRM_BROWSER__EXT_AGENCY_REF";
pkFields[2] = "BLK_AGENCY_CONFIRM_BROWSER__EXT_AGENCY_REF";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_AGENCY_CONFIRM_BROWSER":["CONFIRMSTATS","MARKED_PROCESSED","PROCESSTATS","TRADE_REF_NO"]};
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
var lovInfoFlds = {"BLK_AGENCY_CONFIRM_BROWSER__TRADE_REF_NO__LOV_TRADE_REF_NO":["BLK_AGENCY_CONFIRM_BROWSER__TRADE_REF_NO~","","N",""],"BLK_AGENCY_CONFIRM_BROWSER__TRANSFEREE__LOV_BUYER":["BLK_AGENCY_CONFIRM_BROWSER__TRANSFEREE~~","","N~N",""],"BLK_AGENCY_CONFIRM_BROWSER__TRANSFEROR__LOV_SELLER":["BLK_AGENCY_CONFIRM_BROWSER__TRANSFEROR~~","BLK_AGENCY_CONFIRM_BROWSER__TRANCHEREFNO!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_EXCEPTION");
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

ArrFuncOrigin["LBDAGCBR"]="KERNEL";
ArrPrntFunc["LBDAGCBR"]="";
ArrPrntOrigin["LBDAGCBR"]="";
ArrRoutingType["LBDAGCBR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDAGCBR"]="N";
ArrCustomModified["LBDAGCBR"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------