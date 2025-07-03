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
**  File Name          : LBCROIFX_SYS.js
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
var fieldNameArray = {"BLK_MAIN_ROIRFX":"CONTRACT_REF_NO~MODULE_CODE~PRODUCT_CODE~PRODUCT_TYPE~BRANCH~USER_REF_NO~COUNTERPARTY~UI_FAC_NAME~CONTRACT_CCY","BLK_INTRATE_FIX":"RATE_EFFECTIVE_START_DATE~TENOR_VALUE~CONTRACT_REF_NO~RATE_EFFECTIVE_END_DATE~RATE~RATE_CODE~SPLIT_NO~REMARKS~COMPONENT~TENOR_UNIT~UI_COMP_DESC~UI_CCY~UI_CCY_DESC~UI_RATE_CODE_DESC"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MAIN_ROIRFX">CONTRACT_REF_NO~MODULE_CODE~PRODUCT_CODE~PRODUCT_TYPE~BRANCH~USER_REF_NO~COUNTERPARTY~UI_FAC_NAME~CONTRACT_CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_MAIN_ROIRFX" RELATION_TYPE="1" TYPE="BLK_INTRATE_FIX">RATE_EFFECTIVE_START_DATE~TENOR_VALUE~CONTRACT_REF_NO~RATE_EFFECTIVE_END_DATE~RATE~RATE_CODE~SPLIT_NO~REMARKS~COMPONENT~TENOR_UNIT~UI_COMP_DESC~UI_CCY~UI_CCY_DESC~UI_RATE_CODE_DESC</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_ROIRFX";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MAIN_ROIRFX" : "","BLK_INTRATE_FIX" : "BLK_MAIN_ROIRFX~1"}; 

 var dataSrcLocationArray = new Array("BLK_MAIN_ROIRFX","BLK_INTRATE_FIX"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCROIFX.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCROIFX.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MAIN_ROIRFX__CONTRACT_REF_NO";
pkFields[0] = "BLK_MAIN_ROIRFX__CONTRACT_REF_NO";
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
var lovInfoFlds = {"BLK_INTRATE_FIX__TENOR_VALUE__LOV_FREQ":["~~BLK_INTRATE_FIX__TENOR_UNIT~~","BLK_INTRATE_FIX__RATE_CODE!varchar2~BLK_INTRATE_FIX__UI_CCY!varchar2","N~N~N~N",""],"BLK_INTRATE_FIX__RATE_CODE__LOV_RATE":["~~","","N~N",""]};
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

ArrFuncOrigin["LBCROIFX"]="KERNEL";
ArrPrntFunc["LBCROIFX"]="";
ArrPrntOrigin["LBCROIFX"]="";
ArrRoutingType["LBCROIFX"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCROIFX"]="N";
ArrCustomModified["LBCROIFX"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ROIRFX":"FCCREF~CCY~COMPONENT"};
var scrArgSource = {};
var scrArgVals = {"CVS_ROIRFX":"~~"};
var scrArgDest = {"CVS_ROIRFX":"BLK_MAIN_ROIRFX__CONTRACT_REF_NO~BLK_MAIN_ROIRFX__CONTRACT_CCY~BLK_INTRATE_FIX__COMPONENT"};
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