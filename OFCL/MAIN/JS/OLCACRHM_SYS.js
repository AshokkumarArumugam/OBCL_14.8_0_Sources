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
**  File Name          : OLCACRHM_SYS.js
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
var fieldNameArray = {"BLK_ROLE_TO_HEAD_MAPPING":"PRDCD~MODULE~PRDTYP~CLASCD~CLASTYP~PRD~PRDDESC~CLASDESC","BLK_MAPPING_DETAILS":"ACCTRL~ROLDESC~ACCTHD~GLDESC~PRDCD~ROLTYP~STAT~MAP_TYPE","BLK_ROLE_MAPPING":"ACCOUNTING_ROLE~ACCOUNT_HEAD~COND~PRODUCT_CODE~RTH_RULE_NO~STATUS","BLK_CONDITION_BUILDER":""};

var multipleEntryPageSize = {"BLK_MAPPING_DETAILS" :"15" ,"BLK_ROLE_MAPPING" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_ROLE_TO_HEAD_MAP__All":"BLK_MAPPING_DETAILS","CVS_ROLE_MAPPING__TAB_MAIN":"BLK_ROLE_MAPPING"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ROLE_TO_HEAD_MAPPING">PRDCD~MODULE~PRDTYP~CLASCD~CLASTYP~PRD~PRDDESC~CLASDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLE_TO_HEAD_MAPPING" RELATION_TYPE="N" TYPE="BLK_MAPPING_DETAILS">ACCTRL~ROLDESC~ACCTHD~GLDESC~PRDCD~ROLTYP~STAT~MAP_TYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_MAPPING_DETAILS" RELATION_TYPE="N" TYPE="BLK_ROLE_MAPPING">ACCOUNTING_ROLE~ACCOUNT_HEAD~COND~PRODUCT_CODE~RTH_RULE_NO~STATUS</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONDITION_BUILDER"></FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_ROLE_TO_HEAD_MAP";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ROLE_TO_HEAD_MAPPING" : "","BLK_MAPPING_DETAILS" : "BLK_ROLE_TO_HEAD_MAPPING~N","BLK_ROLE_MAPPING" : "BLK_MAPPING_DETAILS~N","BLK_CONDITION_BUILDER" : ""}; 

 var dataSrcLocationArray = new Array("BLK_ROLE_TO_HEAD_MAPPING","BLK_MAPPING_DETAILS","BLK_ROLE_MAPPING","BLK_CONDITION_BUILDER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCACRHM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCACRHM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ROLE_TO_HEAD_MAPPING__PRDCD";
pkFields[0] = "BLK_ROLE_TO_HEAD_MAPPING__PRDCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONDITION_BUILDER":["BTN_ACCEPT","BTN_AND","BTN_CLEAR","BTN_OR","CONDITION","FIELDS","MATH_OP","OPERATOR","VALUE"],"BLK_MAPPING_DETAILS":["ACCTHD","ACCTRL","BTN_RULE","MAP_TYPE"],"BLK_ROLE_MAPPING":["ACCOUNTING_ROLE","ACCOUNT_HEAD","BTN_CONDITION","COND","PRODUCT_CODE","RTH_RULE_NO"],"BLK_ROLE_TO_HEAD_MAPPING":["CLASCD"]};
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
var lovInfoFlds = {"BLK_ROLE_TO_HEAD_MAPPING__CLASCD__LOV_CLASS_CODE":["BLK_ROLE_TO_HEAD_MAPPING__CLASCD~BLK_ROLE_TO_HEAD_MAPPING__CLASDESC~","BLK_ROLE_TO_HEAD_MAPPING__MODULE!STRING","N~N",""],"BLK_MAPPING_DETAILS__ACCTRL__LOV_ACCROLE":["BLK_MAPPING_DETAILS__ACCTRL~BLK_MAPPING_DETAILS__ROLDESC~BLK_MAPPING_DETAILS__ROLTYP~~~","BLK_ROLE_TO_HEAD_MAPPING__PRDCD!STRING~BLK_ROLE_TO_HEAD_MAPPING__MODULE!STRING~BLK_ROLE_TO_HEAD_MAPPING__PRDCD!STRING~BLK_ROLE_TO_HEAD_MAPPING__PRDTYP!STRING~BLK_ROLE_TO_HEAD_MAPPING__PRDCD!STRING~BLK_ROLE_TO_HEAD_MAPPING__MODULE!STRING","N~N~N~N~N",""],"BLK_MAPPING_DETAILS__ACCTHD__LOV_ACCHEAD":["BLK_MAPPING_DETAILS__ACCTHD~BLK_MAPPING_DETAILS__GLDESC~","BLK_ROLE_TO_HEAD_MAPPING__MODULE!STRING~BLK_ROLE_TO_HEAD_MAPPING__MODULE!STRING","N~N",""],"BLK_ROLE_MAPPING__ACCOUNT_HEAD__LOV_ROLLHEAD":["BLK_ROLE_MAPPING__ACCOUNT_HEAD~","BLK_ROLE_TO_HEAD_MAPPING__MODULE!STRING~BLK_ROLE_TO_HEAD_MAPPING__MODULE!STRING","N",""],"BLK_CONDITION_BUILDER__FIELDS__LOV_FIELDS":["BLK_CONDITION_BUILDER__FIELDS~","","N","N"]};
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
var multipleEntryIDs = new Array("BLK_MAPPING_DETAILS","BLK_ROLE_MAPPING");
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

ArrFuncOrigin["OLCACRHM"]="KERNEL";
ArrPrntFunc["OLCACRHM"]="";
ArrPrntOrigin["OLCACRHM"]="";
ArrRoutingType["OLCACRHM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCACRHM"]="N";
ArrCustomModified["OLCACRHM"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ROLE_TO_HEAD_MAP":"MODULE~PRDCD~PRDDESC~PRDTYP~PRD","CVS_ROLE_MAPPING":"Prodcode~accrole"};
var scrArgSource = {"CVS_ROLE_MAPPING":"BLK_MAPPING_DETAILS__PRDCD~BLK_MAPPING_DETAILS__ACCTRL"};
var scrArgVals = {"CVS_ROLE_TO_HEAD_MAP":"~~~~","CVS_ROLE_MAPPING":"~"};
var scrArgDest = {"CVS_ROLE_TO_HEAD_MAP":"BLK_ROLE_TO_HEAD_MAPPING__MODULE~BLK_ROLE_TO_HEAD_MAPPING__PRDCD~BLK_ROLE_TO_HEAD_MAPPING__PRDDESC~BLK_ROLE_TO_HEAD_MAPPING__PRDTYP~BLK_ROLE_TO_HEAD_MAPPING__PRD","CVS_ROLE_MAPPING":"BLK_ROLE_MAPPING__PRODUCT_CODE~BLK_ROLE_MAPPING__ACCOUNTING_ROLE"};
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