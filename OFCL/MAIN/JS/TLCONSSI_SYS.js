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
**  File Name          : TLCONSSI_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_SSI":"CONTRACTREFNO~LATESTVERNO~USERREFNO~LATESTESN~EXPENSECODE~PORTFOLIO~PORTFOLIODESC~POSITIONIDENTIFIER~POSITIONQUALIFIER~CUSIP~TICKETID~BRANCH~PARENTREFNO~DESKCODE~TRADEREFNO~ESN~VERNO~PRODUCTCODE~CURRENCY~SOURCECODE~AGENCYID~COUNTERPARTY","BLK_TLTBS_CONTRACT_CURR_DET_AGENT":"CONTRACTREFNO~MNEMONICFOR~CUSTOMERNO~REMARKS~ESN~SETTLEMENTSEQNO~SSIMNEMONIC~CURRENCY~CURRENCYDESC","BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY":"CONTRACTREFNO~MNEMONICFOR~CUSTOMERNO~REMARKS~ESN~SETTLEMENTSEQNO~SSIMNEMONIC~CURRENCY~CURRENCYDESC"};

var multipleEntryPageSize = {"BLK_TLTBS_CONTRACT_CURR_DET_AGENT" :"15" ,"BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_SSI__TAB_MAIN":"BLK_TLTBS_CONTRACT_CURR_DET_AGENT~BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_SSI">CONTRACTREFNO~LATESTVERNO~USERREFNO~LATESTESN~EXPENSECODE~PORTFOLIO~PORTFOLIODESC~POSITIONIDENTIFIER~POSITIONQUALIFIER~CUSIP~TICKETID~BRANCH~PARENTREFNO~DESKCODE~TRADEREFNO~ESN~VERNO~PRODUCTCODE~CURRENCY~SOURCECODE~AGENCYID~COUNTERPARTY</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_SSI" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONTRACT_CURR_DET_AGENT">CONTRACTREFNO~MNEMONICFOR~CUSTOMERNO~REMARKS~ESN~SETTLEMENTSEQNO~SSIMNEMONIC~CURRENCY~CURRENCYDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_SSI" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY">CONTRACTREFNO~MNEMONICFOR~CUSTOMERNO~REMARKS~ESN~SETTLEMENTSEQNO~SSIMNEMONIC~CURRENCY~CURRENCYDESC</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_SSI";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_SSI" : "","BLK_TLTBS_CONTRACT_CURR_DET_AGENT" : "BLK_OLTBS_CONTRACT_SSI~N","BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY" : "BLK_OLTBS_CONTRACT_SSI~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_SSI","BLK_TLTBS_CONTRACT_CURR_DET_AGENT","BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLCONSSI.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLCONSSI.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_SSI__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_SSI__CONTRACTREFNO";
queryFields[1] = "BLK_OLTBS_CONTRACT_SSI__LATESTVERNO";
pkFields[1] = "BLK_OLTBS_CONTRACT_SSI__LATESTVERNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TLTBS_CONTRACT_CURR_DET_AGENT":["SSIMNEMONIC"],"BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY":["CURRENCY","CURRENCYDESC"]};
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
var lovInfoFlds = {"BLK_TLTBS_CONTRACT_CURR_DET_AGENT__SSIMNEMONIC__LOV_MNEMONIC":["BLK_TLTBS_CONTRACT_CURR_DET_AGENT__SSIMNEMONIC~~~BLK_TLTBS_CONTRACT_CURR_DET_AGENT__SETTLEMENTSEQNO~~~~~~~~~~~~~~","BLK_OLTBS_CONTRACT_SSI__AGENCYID!VARCHAR2~BLK_OLTBS_CONTRACT_SSI__PRODUCTCODE!VARCHAR2","N~N~N~N~N~N~N~N~N~N~N~N~N~N~N~N~N",""],"BLK_TLTBS_CONTRACT_CURR_DET_AGENT__CURRENCY__LOV_CCY":["BLK_TLTBS_CONTRACT_CURR_DET_AGENT__CURRENCY~BLK_TLTBS_CONTRACT_CURR_DET_AGENT__CURRENCYDESC~","","N~N",""],"BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY__SSIMNEMONIC__LOV_MNEMONIC":["BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY__SSIMNEMONIC~~~BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY__SETTLEMENTSEQNO~~~~~~~~~~~~~~","BLK_OLTBS_CONTRACT_SSI__COUNTERPARTY!VARCHAR2~BLK_OLTBS_CONTRACT_SSI__PRODUCTCODE!VARCHAR2","N~N~N~N~N~N~N~N~N~N~N~N~N~N~N~N~N",""],"BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY__CURRENCY__LOV_CCY":["BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY__CURRENCY~BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY__CURRENCYDESC~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TLTBS_CONTRACT_CURR_DET_AGENT","BLK_TLTBS_CONTRACT_CURR_DET_COUNTERPARTY");
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

ArrFuncOrigin["TLCONSSI"]="KERNEL";
ArrPrntFunc["TLCONSSI"]="";
ArrPrntOrigin["TLCONSSI"]="";
ArrRoutingType["TLCONSSI"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLCONSSI"]="N";
ArrCustomModified["TLCONSSI"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_SSI":"CONTRACTREFNO~LATESTVERNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_SSI":"~"};
var scrArgDest = {"CVS_SSI":"BLK_OLTBS_CONTRACT_SSI__CONTRACTREFNO~BLK_OLTBS_CONTRACT_SSI__LATESTVERNO"};
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