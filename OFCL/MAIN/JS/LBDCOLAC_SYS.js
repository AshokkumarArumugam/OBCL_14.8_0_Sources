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
**  File Name          : LBDCOLAC_SYS.js
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
var fieldNameArray = {"BLK_LSTM_COLLAC_EFFDATE":"TRANCHE_REF_NO~EFFECTIVE_DATE~EVENT_SEQ_NO~CURRENCY~USER_REF_NO~PRODUCT_CODE~CUST_NAME~FACILITY_NAME~PRODUCT_DESC~COUNTERPARTY","BLK_LSTM_COLLAC_COLL":"TRANCHE_REF_NO~EFFECTIVE_DATE~COLLATERAL_CODE","BLK_LSTM_COLLAC_ACCOUNT":"TRANCHE_REF_NO~EFFECTIVE_DATE~COLLATERAL_CODE~COLLATERAL_ACCOUNT~INVESTMENT_TYPE~BALANCE_DISP_DEADLINE~OPENING_BALANCE~AVAILABLE_BALANCE~PENDING_TRANSFERS~DIFFERENCE_AMOUNT"};

var multipleEntryPageSize = {"BLK_LSTM_COLLAC_COLL" :"15" ,"BLK_LSTM_COLLAC_ACCOUNT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LSTM_COLLAC_COLL~BLK_LSTM_COLLAC_ACCOUNT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LSTM_COLLAC_EFFDATE">TRANCHE_REF_NO~EFFECTIVE_DATE~EVENT_SEQ_NO~CURRENCY~USER_REF_NO~PRODUCT_CODE~CUST_NAME~FACILITY_NAME~PRODUCT_DESC~COUNTERPARTY</FN>'; 
msgxml += '      <FN PARENT="BLK_LSTM_COLLAC_EFFDATE" RELATION_TYPE="N" TYPE="BLK_LSTM_COLLAC_COLL">TRANCHE_REF_NO~EFFECTIVE_DATE~COLLATERAL_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_LSTM_COLLAC_COLL" RELATION_TYPE="N" TYPE="BLK_LSTM_COLLAC_ACCOUNT">TRANCHE_REF_NO~EFFECTIVE_DATE~COLLATERAL_CODE~COLLATERAL_ACCOUNT~INVESTMENT_TYPE~BALANCE_DISP_DEADLINE~OPENING_BALANCE~AVAILABLE_BALANCE~PENDING_TRANSFERS~DIFFERENCE_AMOUNT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LSTM_COLLAC_EFFDATE" : "","BLK_LSTM_COLLAC_COLL" : "BLK_LSTM_COLLAC_EFFDATE~N","BLK_LSTM_COLLAC_ACCOUNT" : "BLK_LSTM_COLLAC_COLL~N"}; 

 var dataSrcLocationArray = new Array("BLK_LSTM_COLLAC_EFFDATE","BLK_LSTM_COLLAC_COLL","BLK_LSTM_COLLAC_ACCOUNT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDCOLAC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDCOLAC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LSTM_COLLAC_EFFDATE__TRANCHE_REF_NO";
pkFields[0] = "BLK_LSTM_COLLAC_EFFDATE__TRANCHE_REF_NO";
queryFields[1] = "BLK_LSTM_COLLAC_EFFDATE__EFFECTIVE_DATE";
pkFields[1] = "BLK_LSTM_COLLAC_EFFDATE__EFFECTIVE_DATE";
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
var lovInfoFlds = {"BLK_LSTM_COLLAC_EFFDATE__TRANCHE_REF_NO__LOV_TRANCHE_REF_NO":["BLK_LSTM_COLLAC_EFFDATE__TRANCHE_REF_NO~BLK_LSTM_COLLAC_EFFDATE__USER_REF_NO~BLK_LSTM_COLLAC_EFFDATE__PRODUCT_CODE~BLK_LSTM_COLLAC_EFFDATE__COUNTERPARTY~BLK_LSTM_COLLAC_EFFDATE__FACILITY_NAME~BLK_LSTM_COLLAC_EFFDATE__CURRENCY~BLK_LSTM_COLLAC_EFFDATE__CUST_NAME~BLK_LSTM_COLLAC_EFFDATE__PRODUCT_DESC~","","N~N~N~N~N~N~N~N",""],"BLK_LSTM_COLLAC_COLL__COLLATERAL_CODE__LOV_COLLATERAL_CODE":["BLK_LSTM_COLLAC_COLL__COLLATERAL_CODE~~","BLK_LSTM_COLLAC_EFFDATE__TRANCHE_REF_NO!~BLK_LSTM_COLLAC_EFFDATE__EFFECTIVE_DATE!","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LSTM_COLLAC_COLL","BLK_LSTM_COLLAC_ACCOUNT");
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

ArrFuncOrigin["LBDCOLAC"]="KERNEL";
ArrPrntFunc["LBDCOLAC"]="";
ArrPrntOrigin["LBDCOLAC"]="";
ArrRoutingType["LBDCOLAC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDCOLAC"]="N";
ArrCustomModified["LBDCOLAC"]="N";

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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------