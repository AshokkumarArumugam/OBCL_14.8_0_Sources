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
**  File Name          : LBDSTPMP_SYS.js
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
var fieldNameArray = {"BLK_PART_PROC_STAT":"BORROWER_REF_NO~COUNTERPARTY~CUSTOMER_REF_NO~PARTICIPANT_REF_NO~PARTICIPANT_TYPE~TRANSACTIONPROCESS_STATUS~TXTFACILTYNAME~TXTCOUNTERPARTYNAME~TXTMARKALL","BLK_STP_MARK_PROCESS_MASTER":"AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~MAKER_DT_STAMP~MAKER_ID~MOD_NO~ONCE_AUTH~PARTICIPANT~RECORD_STAT~SEQ_NO~TRANCHE_REF_NO","BLK_STP_MARK_PROCESS_DETAIL":"ACTIVITY_SEQ_NO~MARK_PROCESSED~PARTICIPANT~PARTICIPANT_REF_NO~SEQ_NO~TRANCHE_REF_NO~TXTBORRREFNO~TXTEVENT_SEQ_NO~TXTEVENT_CODE~TXT_PROCESSING_DATE~TXT_PROCESSING_STATUS"};

var multipleEntryPageSize = {"BLK_STP_MARK_PROCESS_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_STP_MARK_PROCESS_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PART_PROC_STAT">BORROWER_REF_NO~COUNTERPARTY~CUSTOMER_REF_NO~PARTICIPANT_REF_NO~PARTICIPANT_TYPE~TRANSACTIONPROCESS_STATUS~TXTFACILTYNAME~TXTCOUNTERPARTYNAME~TXTMARKALL</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_PROC_STAT" RELATION_TYPE="1" TYPE="BLK_STP_MARK_PROCESS_MASTER">AUTH_STAT~CHECKER_DT_STAMP~CHECKER_ID~MAKER_DT_STAMP~MAKER_ID~MOD_NO~ONCE_AUTH~PARTICIPANT~RECORD_STAT~SEQ_NO~TRANCHE_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_STP_MARK_PROCESS_MASTER" RELATION_TYPE="N" TYPE="BLK_STP_MARK_PROCESS_DETAIL">ACTIVITY_SEQ_NO~MARK_PROCESSED~PARTICIPANT~PARTICIPANT_REF_NO~SEQ_NO~TRANCHE_REF_NO~TXTBORRREFNO~TXTEVENT_SEQ_NO~TXTEVENT_CODE~TXT_PROCESSING_DATE~TXT_PROCESSING_STATUS</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PART_PROC_STAT" : "","BLK_STP_MARK_PROCESS_MASTER" : "BLK_PART_PROC_STAT~1","BLK_STP_MARK_PROCESS_DETAIL" : "BLK_STP_MARK_PROCESS_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_PART_PROC_STAT","BLK_STP_MARK_PROCESS_MASTER","BLK_STP_MARK_PROCESS_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDSTPMP.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDSTPMP.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PART_PROC_STAT__PARTICIPANT_REF_NO";
pkFields[0] = "BLK_PART_PROC_STAT__PARTICIPANT_REF_NO";
queryFields[1] = "BLK_PART_PROC_STAT__BORROWER_REF_NO";
pkFields[1] = "BLK_PART_PROC_STAT__BORROWER_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_STP_MARK_PROCESS_DETAIL":["MARK_PROCESSED"]};
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
var lovInfoFlds = {"BLK_PART_PROC_STAT__BORROWER_REF_NO__LOV_BORR_REF":["BLK_PART_PROC_STAT__BORROWER_REF_NO~BLK_PART_PROC_STAT__TXTFACILTYNAME~","","N~N",""],"BLK_PART_PROC_STAT__COUNTERPARTY__LOV_SELFPARTICPANT":["BLK_PART_PROC_STAT__COUNTERPARTY~BLK_PART_PROC_STAT__TXTCOUNTERPARTYNAME~","BLK_PART_PROC_STAT__BORROWER_REF_NO!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_STP_MARK_PROCESS_DETAIL");
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

ArrFuncOrigin["LBDSTPMP"]="KERNEL";
ArrPrntFunc["LBDSTPMP"]="";
ArrPrntOrigin["LBDSTPMP"]="";
ArrRoutingType["LBDSTPMP"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDSTPMP"]="N";
ArrCustomModified["LBDSTPMP"]="N";

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