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
**  File Name          : OLCPRMNT_SYS.js
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
var fieldNameArray = {"BLK_PRODUCT_MIS_DETAILS":"MISGRP~POLCD~CSTCD1~CSTCD2~CSTCD3~CSTCD4~CSTCD5~PRDCDHID~PRDCD~RATE_FLAG~REF_FXD_RATE_CODE~REF_FXD_RATE_TYPE~REF_RATE_TYPE","BLK_DEFAULT_MIS_CODES":"MISTYP~MISCLS~MISCD~KYID"};

var multipleEntryPageSize = {"BLK_DEFAULT_MIS_CODES" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MIS_PRODUCT__All":"BLK_DEFAULT_MIS_CODES"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRODUCT_MIS_DETAILS">MISGRP~POLCD~CSTCD1~CSTCD2~CSTCD3~CSTCD4~CSTCD5~PRDCDHID~PRDCD~RATE_FLAG~REF_FXD_RATE_CODE~REF_FXD_RATE_TYPE~REF_RATE_TYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_PRODUCT_MIS_DETAILS" RELATION_TYPE="N" TYPE="BLK_DEFAULT_MIS_CODES">MISTYP~MISCLS~MISCD~KYID</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MIS_PRODUCT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PRODUCT_MIS_DETAILS" : "","BLK_DEFAULT_MIS_CODES" : "BLK_PRODUCT_MIS_DETAILS~N"}; 

 var dataSrcLocationArray = new Array("BLK_PRODUCT_MIS_DETAILS","BLK_DEFAULT_MIS_CODES"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCPRMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCPRMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PRODUCT_MIS_DETAILS__PRDCD";
pkFields[0] = "BLK_PRODUCT_MIS_DETAILS__PRDCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_DEFAULT_MIS_CODES":["KYID","MISCD","MISCLS","MISTYP"],"BLK_PRODUCT_MIS_DETAILS":["BTNMISGRP","CSTCD1","CSTCD2","CSTCD3","CSTCD4","CSTCD5","LINKTOGRP","MISGRP","POLCD","PRDCDHID","RATE_FLAG","REF_FXD_RATE_CODE","REF_FXD_RATE_TYPE","REF_RATE_TYPE"]};
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
var lovInfoFlds = {"BLK_PRODUCT_MIS_DETAILS__MISGRP__LOV_PRODUCT_MISGROUP":["BLK_PRODUCT_MIS_DETAILS__MISGRP~~","","N~N",""],"BLK_PRODUCT_MIS_DETAILS__POLCD__LOV_PRODUCT_POOL_CODE":["BLK_PRODUCT_MIS_DETAILS__POLCD~~","","N~N",""],"BLK_PRODUCT_MIS_DETAILS__CSTCD1__LOV_PRODUCT_COST_CODE1":["BLK_PRODUCT_MIS_DETAILS__CSTCD1~~","BLK_PRODUCT_MIS_DETAILS__CSTCD2!~BLK_PRODUCT_MIS_DETAILS__CSTCD3!~BLK_PRODUCT_MIS_DETAILS__CSTCD4!~BLK_PRODUCT_MIS_DETAILS__CSTCD5!","N~N",""],"BLK_PRODUCT_MIS_DETAILS__CSTCD2__LOV_PRODUCT_COST_CODE2":["BLK_PRODUCT_MIS_DETAILS__CSTCD2~~","BLK_PRODUCT_MIS_DETAILS__CSTCD1!~BLK_PRODUCT_MIS_DETAILS__CSTCD3!~BLK_PRODUCT_MIS_DETAILS__CSTCD4!~BLK_PRODUCT_MIS_DETAILS__CSTCD5!","N~N",""],"BLK_PRODUCT_MIS_DETAILS__CSTCD3__LOV_PRODUCT_COST_CODE3":["BLK_PRODUCT_MIS_DETAILS__CSTCD3~~","BLK_PRODUCT_MIS_DETAILS__CSTCD1!~BLK_PRODUCT_MIS_DETAILS__CSTCD2!~BLK_PRODUCT_MIS_DETAILS__CSTCD4!~BLK_PRODUCT_MIS_DETAILS__CSTCD5!","N~N",""],"BLK_PRODUCT_MIS_DETAILS__CSTCD4__LOV_PRODUCT_COST_CODE4":["BLK_PRODUCT_MIS_DETAILS__CSTCD4~~","BLK_PRODUCT_MIS_DETAILS__CSTCD1!~BLK_PRODUCT_MIS_DETAILS__CSTCD2!~BLK_PRODUCT_MIS_DETAILS__CSTCD3!~BLK_PRODUCT_MIS_DETAILS__CSTCD5!","N~N",""],"BLK_PRODUCT_MIS_DETAILS__CSTCD5__LOV_PRODUCT_COST_CODE5":["BLK_PRODUCT_MIS_DETAILS__CSTCD5~~","BLK_PRODUCT_MIS_DETAILS__CSTCD1!~BLK_PRODUCT_MIS_DETAILS__CSTCD2!~BLK_PRODUCT_MIS_DETAILS__CSTCD3!~BLK_PRODUCT_MIS_DETAILS__CSTCD4!","N~N",""],"BLK_PRODUCT_MIS_DETAILS__REF_FXD_RATE_CODE__LOV_RATE_CODE":["BLK_PRODUCT_MIS_DETAILS__REF_FXD_RATE_CODE~~","","N~N",""],"BLK_DEFAULT_MIS_CODES__MISCD__LOV_MIS_CLASS":["BLK_DEFAULT_MIS_CODES__MISCD~","BLK_DEFAULT_MIS_CODES__MISCLS!STRING","N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'All';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_DEFAULT_MIS_CODES");
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

ArrFuncOrigin["OLCPRMNT"]="KERNEL";
ArrPrntFunc["OLCPRMNT"]="";
ArrPrntOrigin["OLCPRMNT"]="";
ArrRoutingType["OLCPRMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCPRMNT"]="N";
ArrCustomModified["OLCPRMNT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MIS_PRODUCT":"PRDCD"};
var scrArgSource = {};
var scrArgVals = {"CVS_MIS_PRODUCT":""};
var scrArgDest = {"CVS_MIS_PRODUCT":"BLK_PRODUCT_MIS_DETAILS__PRDCD"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------