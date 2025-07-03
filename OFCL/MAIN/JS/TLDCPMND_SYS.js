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
**  File Name          : TLDCPMND_SYS.js
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
var fieldNameArray = {"BLK_TLTB_LQT_MNEMONIC_BROWSER":"MNEMONICSEQNO~COUNTERPARTYMNEMONIC~TRADEID~PROCESSSTATUS~TRADEESN~TRADEREFNO~NEWCOUNTERPARTY~TRADEVERSION~OLDCOUNTERPARTY"};

var multipleEntryPageSize = {"BLK_TLTB_LQT_MNEMONIC_BROWSER" :"15" };

var multipleEntrySVBlocks = "BLK_TLTB_LQT_MNEMONIC_BROWSER";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_TLTB_LQT_MNEMONIC_BROWSER"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTB_LQT_MNEMONIC_BROWSER">MNEMONICSEQNO~COUNTERPARTYMNEMONIC~TRADEID~PROCESSSTATUS~TRADEESN~TRADEREFNO~NEWCOUNTERPARTY~TRADEVERSION~OLDCOUNTERPARTY</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTB_LQT_MNEMONIC_BROWSER">COUNTERPARTYMNEMONIC~TRADEID~MNEMONICSEQNO~TRADEREFNO~TRADEVERSION~TRADEESN~NEWCOUNTERPARTY~OLDCOUNTERPARTY~PROCESSSTATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDCPMND";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =1;
var g_SummaryBlock ="BLK_TLTB_LQT_MNEMONIC_BROWSER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTB_LQT_MNEMONIC_BROWSER" : ""}; 

 var dataSrcLocationArray = new Array("BLK_TLTB_LQT_MNEMONIC_BROWSER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDCPMND.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDCPMND.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTB_LQT_MNEMONIC_BROWSER__COUNTERPARTYMNEMONIC";
pkFields[0] = "BLK_TLTB_LQT_MNEMONIC_BROWSER__COUNTERPARTYMNEMONIC";
queryFields[1] = "BLK_TLTB_LQT_MNEMONIC_BROWSER__TRADEID";
pkFields[1] = "BLK_TLTB_LQT_MNEMONIC_BROWSER__TRADEID";
queryFields[2] = "BLK_TLTB_LQT_MNEMONIC_BROWSER__MNEMONICSEQNO";
pkFields[2] = "BLK_TLTB_LQT_MNEMONIC_BROWSER__MNEMONICSEQNO";
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
var lovInfoFlds = {"BLK_TLTB_LQT_MNEMONIC_BROWSER__MNEMONICSEQNO__LOV_MNEMONIC_SEQ_NO":["BLK_TLTB_LQT_MNEMONIC_BROWSER__MNEMONICSEQNO~","","N",""],"BLK_TLTB_LQT_MNEMONIC_BROWSER__COUNTERPARTYMNEMONIC__LOV_COUNTERPARTYMNO":["BLK_TLTB_LQT_MNEMONIC_BROWSER__COUNTERPARTYMNEMONIC~","","N",""],"BLK_TLTB_LQT_MNEMONIC_BROWSER__TRADEID__LOV_TRADEID":["BLK_TLTB_LQT_MNEMONIC_BROWSER__TRADEID~","","N",""]};
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
var multipleEntryIDs = new Array();
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

ArrFuncOrigin["TLDCPMND"]="KERNEL";
ArrPrntFunc["TLDCPMND"]="";
ArrPrntOrigin["TLDCPMND"]="";
ArrRoutingType["TLDCPMND"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDCPMND"]="N";
ArrCustomModified["TLDCPMND"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------