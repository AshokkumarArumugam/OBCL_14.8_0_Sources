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
**  File Name          : BKDAGGRE_SYS.js
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
var fieldNameArray = {"BLK_BKTMS_AGGR_GROUP_MASTER":"BROKER~AGGR_GROUP~RESET_DAYS~RESET_MTHS~RESET_YEARS~RESET_BASIS_DATE~CUMULATIVE~PAYABLECCY~NAME~VOLUME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_BKTMS_AGGR_GROUP_SLAB":"BROKER~AGGR_GROUP~BASIS_AMOUNT_TO~DISCOUNT_RATE"};

var multipleEntryPageSize = {"BLK_BKTMS_AGGR_GROUP_SLAB" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_BKTMS_AGGR_GROUP_SLAB"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BKTMS_AGGR_GROUP_MASTER">BROKER~AGGR_GROUP~RESET_DAYS~RESET_MTHS~RESET_YEARS~RESET_BASIS_DATE~CUMULATIVE~PAYABLECCY~NAME~VOLUME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_BKTMS_AGGR_GROUP_MASTER" RELATION_TYPE="N" TYPE="BLK_BKTMS_AGGR_GROUP_SLAB">BROKER~AGGR_GROUP~BASIS_AMOUNT_TO~DISCOUNT_RATE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BKTMS_AGGR_GROUP_MASTER" : "","BLK_BKTMS_AGGR_GROUP_SLAB" : "BLK_BKTMS_AGGR_GROUP_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_BKTMS_AGGR_GROUP_MASTER","BLK_BKTMS_AGGR_GROUP_SLAB"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside BKDAGGRE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside BKDAGGRE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BKTMS_AGGR_GROUP_MASTER__AGGR_GROUP";
pkFields[0] = "BLK_BKTMS_AGGR_GROUP_MASTER__AGGR_GROUP";
queryFields[1] = "BLK_BKTMS_AGGR_GROUP_MASTER__BROKER";
pkFields[1] = "BLK_BKTMS_AGGR_GROUP_MASTER__BROKER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BKTMS_AGGR_GROUP_MASTER":["AGGR_GROUP","BROKER"],"BLK_BKTMS_AGGR_GROUP_SLAB":["AGGR_GROUP","BROKER"]};
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
var lovInfoFlds = {"BLK_BKTMS_AGGR_GROUP_MASTER__BROKER__LOV_BROKER":["BLK_BKTMS_AGGR_GROUP_MASTER__BROKER~BLK_BKTMS_AGGR_GROUP_MASTER__NAME~BLK_BKTMS_AGGR_GROUP_MASTER__PAYABLECCY~","","N~N~N",""],"BLK_BKTMS_AGGR_GROUP_MASTER__AGGR_GROUP__LOV_AGGR_GROUP":["BLK_BKTMS_AGGR_GROUP_MASTER__AGGR_GROUP~BLK_BKTMS_AGGR_GROUP_MASTER__VOLUME~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_BKTMS_AGGR_GROUP_SLAB");
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

ArrFuncOrigin["BKDAGGRE"]="KERNEL";
ArrPrntFunc["BKDAGGRE"]="";
ArrPrntOrigin["BKDAGGRE"]="";
ArrRoutingType["BKDAGGRE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["BKDAGGRE"]="N";
ArrCustomModified["BKDAGGRE"]="N";

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