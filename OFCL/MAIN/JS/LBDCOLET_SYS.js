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
**  File Name          : LBDCOLET_SYS.js
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
var fieldNameArray = {"BLK_LSTMS_COLLENT_EFFDATE":"TRANCHE_REF_NO~EFFECTIVE_DATE~CURRENCY~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LSTMS_COLLENT_COLL":"EFFECTIVE_DATE~TRANCHE_REF_NO~COLLATERAL_CODE","BLK_LSTMS_COLLENT_ENTITY":"ENTITY_CODE~GROSS_AMOUNT~INELIGIBLE_AMOUNT~AVAILABLE_AMOUNT~NET_AVAILABLE_AMOUNT~NET_REQUIRED_TOTAL~OPTIONAL_TOTAL~NET_OPTIONAL_TOTAL~EFFECTIVE_DATE~TRANCHE_REF_NO~COLLATERAL_CODE"};

var multipleEntryPageSize = {"BLK_LSTMS_COLLENT_COLL" :"15" ,"BLK_LSTMS_COLLENT_ENTITY" :"15" };

var multipleEntrySVBlocks = "BLK_LSTMS_COLLENT_ENTITY";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LSTMS_COLLENT_COLL~BLK_LSTMS_COLLENT_ENTITY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LSTMS_COLLENT_EFFDATE">TRANCHE_REF_NO~EFFECTIVE_DATE~CURRENCY~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_LSTMS_COLLENT_EFFDATE" RELATION_TYPE="N" TYPE="BLK_LSTMS_COLLENT_COLL">EFFECTIVE_DATE~TRANCHE_REF_NO~COLLATERAL_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_LSTMS_COLLENT_COLL" RELATION_TYPE="N" TYPE="BLK_LSTMS_COLLENT_ENTITY">ENTITY_CODE~GROSS_AMOUNT~INELIGIBLE_AMOUNT~AVAILABLE_AMOUNT~NET_AVAILABLE_AMOUNT~NET_REQUIRED_TOTAL~OPTIONAL_TOTAL~NET_OPTIONAL_TOTAL~EFFECTIVE_DATE~TRANCHE_REF_NO~COLLATERAL_CODE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LSTMS_COLLENT_EFFDATE" : "","BLK_LSTMS_COLLENT_COLL" : "BLK_LSTMS_COLLENT_EFFDATE~N","BLK_LSTMS_COLLENT_ENTITY" : "BLK_LSTMS_COLLENT_COLL~N"}; 

 var dataSrcLocationArray = new Array("BLK_LSTMS_COLLENT_EFFDATE","BLK_LSTMS_COLLENT_COLL","BLK_LSTMS_COLLENT_ENTITY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDCOLET.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDCOLET.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LSTMS_COLLENT_EFFDATE__EFFECTIVE_DATE";
pkFields[0] = "BLK_LSTMS_COLLENT_EFFDATE__EFFECTIVE_DATE";
queryFields[1] = "BLK_LSTMS_COLLENT_EFFDATE__TRANCHE_REF_NO";
pkFields[1] = "BLK_LSTMS_COLLENT_EFFDATE__TRANCHE_REF_NO";
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
var lovInfoFlds = {"BLK_LSTMS_COLLENT_EFFDATE__TRANCHE_REF_NO__LOV_CRN":["~~~~~~~~","","N~N~N~N~N~N~N~N",""],"BLK_LSTMS_COLLENT_EFFDATE__CURRENCY__LOV_CRN":["~~~~~~~~","","N~N~N~N~N~N~N~N",""],"BLK_LSTMS_COLLENT_COLL__COLLATERAL_CODE__LOV_COLCODE":["~~","","N~N",""],"BLK_LSTMS_COLLENT_ENTITY__ENTITY_CODE__LOV_ENTCODE":["~~~","","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LSTMS_COLLENT_COLL","BLK_LSTMS_COLLENT_ENTITY");
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

ArrFuncOrigin["LBDCOLET"]="KERNEL";
ArrPrntFunc["LBDCOLET"]="";
ArrPrntOrigin["LBDCOLET"]="";
ArrRoutingType["LBDCOLET"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDCOLET"]="N";
ArrCustomModified["LBDCOLET"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------