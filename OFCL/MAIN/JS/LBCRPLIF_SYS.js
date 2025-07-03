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
**  File Name          : LBCRPLIF_SYS.js
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
var fieldNameArray = {"BLK_INT_RATE_FIX":"REMARKS~SPLIT_NO~TENOR_UNIT~TENOR_VALUE~COMPONENT~SPLIT_SERIAL_NO~RATE_EFFECTIVE_END_DATE~RATE_EFFECTIVE_START_DATE~RATE_CODE~RATE~CONTRACT_REF_NO~TXTPRD~TXTPRDDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTOMERNAME~TXTPRDTYPE~TXTFACILITYTYPE~TXTCURRENCY~TXTCOMPDESC~TXTCCYDESC~TXTMATURITYDATE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_INT_RATE_FIX">REMARKS~SPLIT_NO~TENOR_UNIT~TENOR_VALUE~COMPONENT~SPLIT_SERIAL_NO~RATE_EFFECTIVE_END_DATE~RATE_EFFECTIVE_START_DATE~RATE_CODE~RATE~CONTRACT_REF_NO~TXTPRD~TXTPRDDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTOMERNAME~TXTPRDTYPE~TXTFACILITYTYPE~TXTCURRENCY~TXTCOMPDESC~TXTCCYDESC~TXTMATURITYDATE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_INTFIXING";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_INT_RATE_FIX" : ""}; 

 var dataSrcLocationArray = new Array("BLK_INT_RATE_FIX"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCRPLIF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCRPLIF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_INT_RATE_FIX__CONTRACT_REF_NO";
pkFields[0] = "BLK_INT_RATE_FIX__CONTRACT_REF_NO";
queryFields[1] = "BLK_INT_RATE_FIX__SPLIT_SERIAL_NO";
pkFields[1] = "BLK_INT_RATE_FIX__SPLIT_SERIAL_NO";
queryFields[2] = "BLK_INT_RATE_FIX__SPLIT_NO";
pkFields[2] = "BLK_INT_RATE_FIX__SPLIT_NO";
queryFields[3] = "BLK_INT_RATE_FIX__COMPONENT";
pkFields[3] = "BLK_INT_RATE_FIX__COMPONENT";
queryFields[4] = "BLK_INT_RATE_FIX__RATE_EFFECTIVE_START_DATE";
pkFields[4] = "BLK_INT_RATE_FIX__RATE_EFFECTIVE_START_DATE";
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

ArrFuncOrigin["LBCRPLIF"]="KERNEL";
ArrPrntFunc["LBCRPLIF"]="";
ArrPrntOrigin["LBCRPLIF"]="";
ArrRoutingType["LBCRPLIF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCRPLIF"]="N";
ArrCustomModified["LBCRPLIF"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_INTFIXING":"CONTRACT_REF_NO~COMPONENT~MATURITY_DATE~RATE_CODE~SPLIT_NO~SPLIT_SERIAL_NO~VALUE_DATE"};
var scrArgSource = {};
var scrArgVals = {"CVS_INTFIXING":"~~~~~~"};
var scrArgDest = {"CVS_INTFIXING":"BLK_INT_RATE_FIX__CONTRACT_REF_NO~BLK_INT_RATE_FIX__COMPONENT~BLK_INT_RATE_FIX__TXTMATURITYDATE~BLK_INT_RATE_FIX__RATE_CODE~BLK_INT_RATE_FIX__SPLIT_NO~BLK_INT_RATE_FIX__SPLIT_SERIAL_NO~BLK_INT_RATE_FIX__RATE_EFFECTIVE_START_DATE"};
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