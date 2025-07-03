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
**  File Name          : OLDINHST_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"CONTRACT_REF_NO","BLK_COMPONENTS":"COMPONENT~CLASS_DESCRIPTION~COMPONENT_TYPE","BLK_CONTRACT_INTEREST_DETAIL":"ADJUSTMENT_RATE~BASE_RATE~BORROW_LEND_IND~COMPONENT~CONTRACT_REF_NO~FINAL_RATE~FIXED_RATE_TYPE~MARGIN~RATE_BASIS~RATE_CODE~RATE_CODE_USAGE~RATE_TYPE~SPREAD~VALUE_DATE","BLK_CONTRACT_INTEREST_HISTORY":"BASE_RATE~COMPONENT~CONTRACT_REF_NO~FINAL_RATE~RATE_CODE~RATE_TYPE~SPREAD~VALUE_DATE~SPREAD_ADJ~BORROW_LEND_IND~RATE_CODE_USAGE"};

var multipleEntryPageSize = {"BLK_COMPONENTS" :"15" ,"BLK_CONTRACT_INTEREST_HISTORY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_INTEREST_HISTORY__TAB_MAIN":"BLK_COMPONENTS~BLK_CONTRACT_INTEREST_HISTORY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONTRACT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="N" TYPE="BLK_COMPONENTS">COMPONENT~CLASS_DESCRIPTION~COMPONENT_TYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_COMPONENTS" RELATION_TYPE="N" TYPE="BLK_CONTRACT_INTEREST_DETAIL">ADJUSTMENT_RATE~BASE_RATE~BORROW_LEND_IND~COMPONENT~CONTRACT_REF_NO~FINAL_RATE~FIXED_RATE_TYPE~MARGIN~RATE_BASIS~RATE_CODE~RATE_CODE_USAGE~RATE_TYPE~SPREAD~VALUE_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_COMPONENTS" RELATION_TYPE="N" TYPE="BLK_CONTRACT_INTEREST_HISTORY">BASE_RATE~COMPONENT~CONTRACT_REF_NO~FINAL_RATE~RATE_CODE~RATE_TYPE~SPREAD~VALUE_DATE~SPREAD_ADJ~BORROW_LEND_IND~RATE_CODE_USAGE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_INTEREST_HISTORY";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_COMPONENTS" : "BLK_CONTRACT~N","BLK_CONTRACT_INTEREST_DETAIL" : "BLK_COMPONENTS~N","BLK_CONTRACT_INTEREST_HISTORY" : "BLK_COMPONENTS~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_COMPONENTS","BLK_CONTRACT_INTEREST_DETAIL","BLK_CONTRACT_INTEREST_HISTORY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDINHST.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDINHST.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONTRACT_REF_NO";
pkFields[0] = "BLK_CONTRACT__CONTRACT_REF_NO";
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
var lovInfoFlds = {"BLK_CONTRACT__CONTRACT_REF_NO__LOV_CONTRACTS":["BLK_CONTRACT__CONTRACT_REF_NO~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_COMPONENTS","BLK_CONTRACT_INTEREST_HISTORY");
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

ArrFuncOrigin["OLDINHST"]="KERNEL";
ArrPrntFunc["OLDINHST"]="";
ArrPrntOrigin["OLDINHST"]="";
ArrRoutingType["OLDINHST"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDINHST"]="N";
ArrCustomModified["OLDINHST"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_INTEREST_HISTORY":"CONTREF~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_INTEREST_HISTORY":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_INTEREST_HISTORY":"BLK_CONTRACT__CONTRACT_REF_NO~"};
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