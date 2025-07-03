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
**  File Name          : OLDMNDSB_SYS.js
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
var fieldNameArray = {"BLK_MDSB_MAS":"CONTREF~ESN~BRN~CNPTY~CNPTYNAME~VALDT~MATDT~CONTCCY~LCYCCY~AMTFIN~AMTDSBR~AMTBAL~DSBRDT~AMT_TO_BE_DISBURSED~REMARKS~AMT~LCYAMT~STAT~TYPE~DSBMVER~APPLIEDESN~COMP~DSBS_CONTREF~DSBRMODE~MOD~SUBSYSSTAT~DSBM_CONTREF~DSBSVERNO~SCHCCY~SCHAPPLIED~SCHREVER~DSBRESN~CURRVERUI~TOTVERNOUI~ECAREQSTATUS","BLK_EVENT_LOG":"MAKER~MAKERDT~CHECKER~CHECKERDT~AUTHSTAT~TXNSTAT~FTR_CONTREF~FTR_ESN"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MDSB_MAS">CONTREF~ESN~BRN~CNPTY~CNPTYNAME~VALDT~MATDT~CONTCCY~LCYCCY~AMTFIN~AMTDSBR~AMTBAL~DSBRDT~AMT_TO_BE_DISBURSED~REMARKS~AMT~LCYAMT~STAT~TYPE~DSBMVER~APPLIEDESN~COMP~DSBS_CONTREF~DSBRMODE~MOD~SUBSYSSTAT~DSBM_CONTREF~DSBSVERNO~SCHCCY~SCHAPPLIED~SCHREVER~DSBRESN~CURRVERUI~TOTVERNOUI~ECAREQSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_MDSB_MAS" RELATION_TYPE="1" TYPE="BLK_EVENT_LOG">MAKER~MAKERDT~CHECKER~CHECKERDT~AUTHSTAT~TXNSTAT~FTR_CONTREF~FTR_ESN</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MNDSB";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_MDSB_MAS" RELATION_TYPE="1" TYPE="BLK_SUMMARY">CONTAUTH~CONTBRN~CONTREF~ESN~DUE_DATE~COUNTERPARTY~CONTCCY~AMOUNT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDMNDSB";
var defaultWhereClause = "BRANCH = GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MDSB_MAS" : "","BLK_EVENT_LOG" : "BLK_MDSB_MAS~1"}; 

 var dataSrcLocationArray = new Array("BLK_MDSB_MAS","BLK_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDMNDSB.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDMNDSB.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MDSB_MAS__CONTREF";
pkFields[0] = "BLK_MDSB_MAS__CONTREF";
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
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_MDSB_MAS":["CONTREF","ESN"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_MDSB_MAS__CONTREF__LOV_CONTREF":["BLK_MDSB_MAS__CONTREF~BLK_MDSB_MAS__TYPE~BLK_MDSB_MAS__DSBRDT~","","N~N~N~N~N~N",""]};
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

 var CallFormArray= new Array("OLCONDET~BLK_MDSB_MAS","TXCTRTAX~BLK_MDSB_MAS","LFCTRCHG~BLK_MDSB_MAS","OLCTRADV~BLK_MDSB_MAS"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT_DSBR_MASTER.CONTRACT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO AND OLTBS_CONTRACT_DSBR_MASTER.EVENT_SEQ_NO = OLTBS_CONTRACT__SETT.LATEST_EVENT_SEQ_NO","OLTBS_CONTRACT_DSBR_MASTER.CONTRACT_REF_NO=OLTBS_CONTRACT__TAX.CONTRACT_REF_NO AND OLTBS_CONTRACT_DSBR_MASTER.EVENT_SEQ_NO = OLTBS_CONTRACT__TAX.LATEST_EVENT_SEQ_NO","OLTBS_CONTRACT_DSBR_MASTER.CONTRACT_REF_NO=OLTBS_CONTRACT__CHG.CONTRACT_REF_NO AND OLTBS_CONTRACT_DSBR_MASTER.EVENT_SEQ_NO = OLTBS_CONTRACT__CHG.LATEST_EVENT_SEQ_NO","OLTBS_CONTRACT_DSBR_MASTER.CONTRACT_REF_NO=OLTBS_CONTRACT__ADV.CONTRACT_REF_NO AND OLTBS_CONTRACT_DSBR_MASTER.EVENT_SEQ_NO = OLTBS_CONTRACT__ADV.LATEST_EVENT_SEQ_NO"); 

 var CallRelatType= new Array("1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDMNDSB"]="KERNEL";
ArrPrntFunc["OLDMNDSB"]="";
ArrPrntOrigin["OLDMNDSB"]="";
ArrRoutingType["OLDMNDSB"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDMNDSB"]="N";
ArrCustomModified["OLDMNDSB"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN","TXCTRTAX":"CONTREF~ESN","LFCTRCHG":"CONTREF~ESN~MODULECODE","OLCTRADV":"CONTREF~ESN","OLDEVENT":"CONTREF~ACTION_CODE","OLDMSPRV":"CONTREF~ESN~MODULE~PARENTFUNCTION~ACTION_CODE","OLDDSBVW":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLCONDET":"BLK_MDSB_MAS__CONTREF~BLK_MDSB_MAS__ESN","TXCTRTAX":"BLK_MDSB_MAS__CONTREF~BLK_MDSB_MAS__ESN","LFCTRCHG":"BLK_MDSB_MAS__CONTREF~BLK_MDSB_MAS__ESN~BLK_MDSB_MAS__MOD","OLCTRADV":"BLK_MDSB_MAS__CONTREF~BLK_MDSB_MAS__ESN","OLDEVENT":"BLK_MDSB_MAS__CONTREF~","OLDMSPRV":"BLK_MDSB_MAS__CONTREF~BLK_MDSB_MAS__ESN~BLK_MDSB_MAS__MOD~~","OLDDSBVW":"BLK_MDSB_MAS__CONTREF~"};
var scrArgVals = {"OLCONDET":"~","TXCTRTAX":"~","LFCTRCHG":"~~","OLCTRADV":"~","OLDEVENT":"~EXECUTEQUERY","OLDMSPRV":"~~~OLDMNDSB~EXECUTEQUERY","OLDDSBVW":"~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":"","TXCTRTAX":"","LFCTRCHG":"","OLCTRADV":""};
var dpndntOnSrvs = {"OLCONDET":"","TXCTRTAX":"","LFCTRCHG":"","OLCTRADV":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"2","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------