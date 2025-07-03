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
**  File Name          : LBCCOLAC_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_COLAC":"CONTRACT_REF_NO~LATEST_VERSION_NO~PRODUCT_CODE~USER_REF_NO~COUNTERPARTY~CONTRACT_CCY~FACILITY_NAME~PRODUCT_DESCRIPTION~CUSTOMER_NAME~LATEST_EVENT_SEQ_NO","BLK_LBTMS_TRANCHE_COLLAC_EFFDATE":"TRANCHE_REF_NO~EFFECTIVE_DATE~EVENT_SEQ_NO~CURRENCY~MOD_NO","BLK_LBTMS_TRANCHE_COLLAC_COLL":"TRANCHE_REF_NO~EFFECTIVE_DATE~COLLATERAL_CODE","BLK_LBTMS_TRANCHE_COLLAC_ACCOUNT":"DIFFERENCE_AMOUNT~PENDING_TRANSFERS~AVAILABLE_BALANCE~OPENING_BALANCE~BALANCE_DISP_DEADLINE~INVESTMENT_TYPE~COLLATERAL_ACCOUNT~COLLATERAL_CODE~EFFECTIVE_DATE~TRANCHE_REF_NO"};

var multipleEntryPageSize = {"BLK_LBTMS_TRANCHE_COLLAC_COLL" :"15" ,"BLK_LBTMS_TRANCHE_COLLAC_ACCOUNT" :"15" };

var multipleEntrySVBlocks = "BLK_LBTMS_TRANCHE_COLLAC_EFFDATE";

var tabMEBlks = {"CVS_COLAC__TAB_MAIN":"BLK_LBTMS_TRANCHE_COLLAC_COLL~BLK_LBTMS_TRANCHE_COLLAC_ACCOUNT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_COLAC">CONTRACT_REF_NO~LATEST_VERSION_NO~PRODUCT_CODE~USER_REF_NO~COUNTERPARTY~CONTRACT_CCY~FACILITY_NAME~PRODUCT_DESCRIPTION~CUSTOMER_NAME~LATEST_EVENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_COLAC" RELATION_TYPE="N" TYPE="BLK_LBTMS_TRANCHE_COLLAC_EFFDATE">TRANCHE_REF_NO~EFFECTIVE_DATE~EVENT_SEQ_NO~CURRENCY~MOD_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTMS_TRANCHE_COLLAC_EFFDATE" RELATION_TYPE="N" TYPE="BLK_LBTMS_TRANCHE_COLLAC_COLL">TRANCHE_REF_NO~EFFECTIVE_DATE~COLLATERAL_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTMS_TRANCHE_COLLAC_COLL" RELATION_TYPE="N" TYPE="BLK_LBTMS_TRANCHE_COLLAC_ACCOUNT">DIFFERENCE_AMOUNT~PENDING_TRANSFERS~AVAILABLE_BALANCE~OPENING_BALANCE~BALANCE_DISP_DEADLINE~INVESTMENT_TYPE~COLLATERAL_ACCOUNT~COLLATERAL_CODE~EFFECTIVE_DATE~TRANCHE_REF_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_COLAC";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_COLAC" : "","BLK_LBTMS_TRANCHE_COLLAC_EFFDATE" : "BLK_OLTBS_CONTRACT_COLAC~N","BLK_LBTMS_TRANCHE_COLLAC_COLL" : "BLK_LBTMS_TRANCHE_COLLAC_EFFDATE~N","BLK_LBTMS_TRANCHE_COLLAC_ACCOUNT" : "BLK_LBTMS_TRANCHE_COLLAC_COLL~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_COLAC","BLK_LBTMS_TRANCHE_COLLAC_EFFDATE","BLK_LBTMS_TRANCHE_COLLAC_COLL","BLK_LBTMS_TRANCHE_COLLAC_ACCOUNT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCCOLAC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCCOLAC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_COLAC__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT_COLAC__CONTRACT_REF_NO";
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
var lovInfoFlds = {"BLK_LBTMS_TRANCHE_COLLAC_COLL__COLLATERAL_CODE__LOV_COLL_CODE":["BLK_LBTMS_TRANCHE_COLLAC_COLL__COLLATERAL_CODE~~","BLK_LBTMS_TRANCHE_COLLAC_EFFDATE__TRANCHE_REF_NO!VARCHAR2~BLK_LBTMS_TRANCHE_COLLAC_EFFDATE__EFFECTIVE_DATE!DATE","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTMS_TRANCHE_COLLAC_COLL","BLK_LBTMS_TRANCHE_COLLAC_ACCOUNT");
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

ArrFuncOrigin["LBCCOLAC"]="KERNEL";
ArrPrntFunc["LBCCOLAC"]="";
ArrPrntOrigin["LBCCOLAC"]="";
ArrRoutingType["LBCCOLAC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCCOLAC"]="N";
ArrCustomModified["LBCCOLAC"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_COLAC":"CONTRACT_REF_NO~EVENT_SEQ_NO"};
var scrArgSource = {};
var scrArgVals = {"CVS_COLAC":"~"};
var scrArgDest = {"CVS_COLAC":"BLK_OLTBS_CONTRACT_COLAC__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT_COLAC__LATEST_EVENT_SEQ_NO"};
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