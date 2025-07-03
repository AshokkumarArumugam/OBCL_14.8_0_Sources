/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : LFDACAUT_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"CONREFNO~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~PRODUCT_CODE~EVENT_DATE~EVENT~MAKER","BLK_ACCR_FEE":"COMPONENT_CCY~CALCULATION_END_DATE~REFUND_AMOUNT~FEE_AMOUNT~CALCULATION_START_DATE~VALUE_DATE~COMPONENT","BLK_CHANGES":"NEW_VALUE~OLD_VALUE~FIELD_DESCRIPTION","BLK_CON_OVD":"AUTH_BY~AUTH_DT_STAMP~TXT_STATUS~UI_OVD_TXT~FCCREF~ESN"};

var multipleEntryPageSize = {"BLK_CHANGES" :"15" ,"BLK_CON_OVD" :"15" };

var multipleEntrySVBlocks = "BLK_ACCR_FEE";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_CHANGES~BLK_CON_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONREFNO~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~PRODUCT_CODE~EVENT_DATE~EVENT~MAKER</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="N" TYPE="BLK_ACCR_FEE">COMPONENT_CCY~CALCULATION_END_DATE~REFUND_AMOUNT~FEE_AMOUNT~CALCULATION_START_DATE~VALUE_DATE~COMPONENT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="N" TYPE="BLK_CHANGES">NEW_VALUE~OLD_VALUE~FIELD_DESCRIPTION</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="N" TYPE="BLK_CON_OVD">AUTH_BY~AUTH_DT_STAMP~TXT_STATUS~UI_OVD_TXT~FCCREF~ESN</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_ACCR_FEE" : "BLK_CONTRACT~N","BLK_CHANGES" : "BLK_CONTRACT~N","BLK_CON_OVD" : "BLK_CONTRACT~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_ACCR_FEE","BLK_CHANGES","BLK_CON_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFDACAUT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFDACAUT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONREFNO";
pkFields[0] = "BLK_CONTRACT__CONREFNO";
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
var lovInfoFlds = {"BLK_CONTRACT__CONREFNO__LOV_CONT":["BLK_CONTRACT__CONREFNO~BLK_CONTRACT__LATEST_EVENT_SEQ_NO~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CHANGES","BLK_CON_OVD");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCSTINF~BLK_CONTRACT"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO = OLVW_SETTLEMENT_INFO.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LFDACAUT"]="KERNEL";
ArrPrntFunc["LFDACAUT"]="";
ArrPrntOrigin["LFDACAUT"]="";
ArrRoutingType["LFDACAUT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFDACAUT"]="N";
ArrCustomModified["LFDACAUT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCSTINF":"CONTRACTREFNO"};
var scrArgSource = {"OLCSTINF":"BLK_CONTRACT__CONREFNO"};
var scrArgVals = {"OLCSTINF":""};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCSTINF":""};
var dpndntOnSrvs = {"OLCSTINF":""};
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