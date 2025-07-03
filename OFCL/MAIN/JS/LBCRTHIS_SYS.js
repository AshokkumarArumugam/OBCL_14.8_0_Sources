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
**  File Name          : LBCRTHIS_SYS.js
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
var fieldNameArray = {"BLK_INTEREST_MASTER":"RECALC_REQD~SHOWN_IN_CONTRACT_MAIN_SCREEN~RECALC_START_DATE~PROPAGATION_REQD~PENALTY_TYPE~RATE_FIXING_REQD~BASIS_AMOUNT_TYPE~PICKUP_EVENT_CODE~BASIS_AMOUNT_CATEGORY~UNFUND_COMPONENT~SKIM_COMPONENT~COMPONENT~LAST_CALC_TIMESTAMP~RULE~COMPONENT_SERIAL_NO~CONTRACT_REF_NO~TXTPROD~TXTPRODDESC~TXTUSERREFNO~TXTCOUNTERPART~TXTCUSTNAME~TXTPRODUCTTYPE~TXTFACILITYNAME","BLK_INTEREST_MASTER_SEC":"RECALC_REQD~SHOWN_IN_CONTRACT_MAIN_SCREEN~RECALC_START_DATE~PROPAGATION_REQD~PENALTY_TYPE~RATE_FIXING_REQD~BASIS_AMOUNT_TYPE~PICKUP_EVENT_CODE~BASIS_AMOUNT_CATEGORY~UNFUND_COMPONENT~SKIM_COMPONENT~COMPONENT~LAST_CALC_TIMESTAMP~RULE~COMPONENT_SERIAL_NO~CONTRACT_REF_NO~TXTCOMPDESC","BLK_INTEREST_DETAIL":"RATE_CODE~RATE_CODE_USAGE~VALUE_DATE~BORROW_LEND_IND~SPREAD~RATE_TYPE~ADJUSTMENT_RATE~COMPONENT~FIXED_RATE_TYPE~CONTRACT_REF_NO~BASE_RATE~FINAL_RATE~MARGIN","BLK_MARGIN_RATE":"VALUE_DATE~MARGIN_RATE~EVENT_SEQ_NO~COMPONENT~MARGIN_COMPONENT~CONTRACT_REF_NO~TXTMARGINBASIS","BLK_MARGIN_MASTER":"MARGIN_COMPONENT~MARGIN_RULE_REF_NO~SEQ_NO~MARGIN_BASIS~CONTRACT_REF_NO~COMPONENT~REPICKUP_REQD~LAST_CHANGE_TIMESTAMP~REPICKUP_FROM_DATE~CUSTOMER_NO~TXTCOMPONENTDESC1","BLK_MARGIN_MASTER_02":"MARGIN_COMPONENT~MARGIN_RULE_REF_NO~SEQ_NO~MARGIN_BASIS~CONTRACT_REF_NO~COMPONENT~REPICKUP_REQD~LAST_CHANGE_TIMESTAMP~REPICKUP_FROM_DATE~CUSTOMER_NO~TXTMARGINCOMPDESC","BLK_MARGIN_RATE_02":"VALUE_DATE~MARGIN_RATE~EVENT_SEQ_NO~COMPONENT~MARGIN_COMPONENT~CONTRACT_REF_NO"};

var multipleEntryPageSize = {"BLK_INTEREST_MASTER_SEC" :"15" ,"BLK_INTEREST_DETAIL" :"15" ,"BLK_MARGIN_RATE" :"15" ,"BLK_MARGIN_MASTER" :"15" ,"BLK_MARGIN_MASTER_02" :"15" ,"BLK_MARGIN_RATE_02" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_RATE_HIST__TAB_MAIN":"BLK_INTEREST_MASTER_SEC~BLK_INTEREST_DETAIL~BLK_MARGIN_RATE","CVS_MARGIN_HIST__TAB_MAIN":"BLK_MARGIN_MASTER~BLK_MARGIN_MASTER_02~BLK_MARGIN_RATE_02"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_INTEREST_MASTER">RECALC_REQD~SHOWN_IN_CONTRACT_MAIN_SCREEN~RECALC_START_DATE~PROPAGATION_REQD~PENALTY_TYPE~RATE_FIXING_REQD~BASIS_AMOUNT_TYPE~PICKUP_EVENT_CODE~BASIS_AMOUNT_CATEGORY~UNFUND_COMPONENT~SKIM_COMPONENT~COMPONENT~LAST_CALC_TIMESTAMP~RULE~COMPONENT_SERIAL_NO~CONTRACT_REF_NO~TXTPROD~TXTPRODDESC~TXTUSERREFNO~TXTCOUNTERPART~TXTCUSTNAME~TXTPRODUCTTYPE~TXTFACILITYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_INTEREST_MASTER" RELATION_TYPE="N" TYPE="BLK_INTEREST_MASTER_SEC">RECALC_REQD~SHOWN_IN_CONTRACT_MAIN_SCREEN~RECALC_START_DATE~PROPAGATION_REQD~PENALTY_TYPE~RATE_FIXING_REQD~BASIS_AMOUNT_TYPE~PICKUP_EVENT_CODE~BASIS_AMOUNT_CATEGORY~UNFUND_COMPONENT~SKIM_COMPONENT~COMPONENT~LAST_CALC_TIMESTAMP~RULE~COMPONENT_SERIAL_NO~CONTRACT_REF_NO~TXTCOMPDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_INTEREST_MASTER_SEC" RELATION_TYPE="N" TYPE="BLK_INTEREST_DETAIL">RATE_CODE~RATE_CODE_USAGE~VALUE_DATE~BORROW_LEND_IND~SPREAD~RATE_TYPE~ADJUSTMENT_RATE~COMPONENT~FIXED_RATE_TYPE~CONTRACT_REF_NO~BASE_RATE~FINAL_RATE~MARGIN</FN>'; 
msgxml += '      <FN PARENT="BLK_INTEREST_DETAIL" RELATION_TYPE="N" TYPE="BLK_MARGIN_RATE">VALUE_DATE~MARGIN_RATE~EVENT_SEQ_NO~COMPONENT~MARGIN_COMPONENT~CONTRACT_REF_NO~TXTMARGINBASIS</FN>'; 
msgxml += '      <FN PARENT="BLK_INTEREST_MASTER" RELATION_TYPE="N" TYPE="BLK_MARGIN_MASTER">MARGIN_COMPONENT~MARGIN_RULE_REF_NO~SEQ_NO~MARGIN_BASIS~CONTRACT_REF_NO~COMPONENT~REPICKUP_REQD~LAST_CHANGE_TIMESTAMP~REPICKUP_FROM_DATE~CUSTOMER_NO~TXTCOMPONENTDESC1</FN>'; 
msgxml += '      <FN PARENT="BLK_MARGIN_MASTER" RELATION_TYPE="N" TYPE="BLK_MARGIN_MASTER_02">MARGIN_COMPONENT~MARGIN_RULE_REF_NO~SEQ_NO~MARGIN_BASIS~CONTRACT_REF_NO~COMPONENT~REPICKUP_REQD~LAST_CHANGE_TIMESTAMP~REPICKUP_FROM_DATE~CUSTOMER_NO~TXTMARGINCOMPDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_MARGIN_MASTER_02" RELATION_TYPE="N" TYPE="BLK_MARGIN_RATE_02">VALUE_DATE~MARGIN_RATE~EVENT_SEQ_NO~COMPONENT~MARGIN_COMPONENT~CONTRACT_REF_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_RATE_HIST";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_INTEREST_MASTER" : "","BLK_INTEREST_MASTER_SEC" : "BLK_INTEREST_MASTER~N","BLK_INTEREST_DETAIL" : "BLK_INTEREST_MASTER_SEC~N","BLK_MARGIN_RATE" : "BLK_INTEREST_DETAIL~N","BLK_MARGIN_MASTER" : "BLK_INTEREST_MASTER~N","BLK_MARGIN_MASTER_02" : "BLK_MARGIN_MASTER~N","BLK_MARGIN_RATE_02" : "BLK_MARGIN_MASTER_02~N"}; 

 var dataSrcLocationArray = new Array("BLK_INTEREST_MASTER","BLK_INTEREST_MASTER_SEC","BLK_INTEREST_DETAIL","BLK_MARGIN_RATE","BLK_MARGIN_MASTER","BLK_MARGIN_MASTER_02","BLK_MARGIN_RATE_02"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCRTHIS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCRTHIS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_INTEREST_MASTER__COMPONENT";
pkFields[0] = "BLK_INTEREST_MASTER__COMPONENT";
queryFields[1] = "BLK_INTEREST_MASTER__CONTRACT_REF_NO";
pkFields[1] = "BLK_INTEREST_MASTER__CONTRACT_REF_NO";
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
var multipleEntryIDs = new Array("BLK_INTEREST_MASTER_SEC","BLK_INTEREST_DETAIL","BLK_MARGIN_RATE","BLK_MARGIN_MASTER","BLK_MARGIN_MASTER_02","BLK_MARGIN_RATE_02");
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

ArrFuncOrigin["LBCRTHIS"]="KERNEL";
ArrPrntFunc["LBCRTHIS"]="";
ArrPrntOrigin["LBCRTHIS"]="";
ArrRoutingType["LBCRTHIS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCRTHIS"]="N";
ArrCustomModified["LBCRTHIS"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_RATE_HIST":"CONTRACT_REF_NO","CVS_MARGIN_HIST":""};
var scrArgSource = {};
var scrArgVals = {"CVS_RATE_HIST":"","CVS_MARGIN_HIST":""};
var scrArgDest = {"CVS_RATE_HIST":"BLK_INTEREST_MASTER__CONTRACT_REF_NO","CVS_MARGIN_HIST":""};
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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------