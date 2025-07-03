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
**  File Name          : OLCRORES_SYS.js
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
var fieldNameArray = {"BLK_OLTB_CONTRACT_RES":"CONREFNO~VERNO","BLK_OLTB_CONTRACT_LIQ_RESD":"CONREFNO~COMP~CCYAMTDUE~AMTDUE~AMTPAID"};

var multipleEntryPageSize = {"BLK_OLTB_CONTRACT_LIQ_RESD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_ROLRESD__TAB_MAIN":"BLK_OLTB_CONTRACT_LIQ_RESD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTB_CONTRACT_RES">CONREFNO~VERNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTB_CONTRACT_RES" RELATION_TYPE="N" TYPE="BLK_OLTB_CONTRACT_LIQ_RESD">CONREFNO~COMP~CCYAMTDUE~AMTDUE~AMTPAID</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_ROLRESD";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTB_CONTRACT_RES" : "","BLK_OLTB_CONTRACT_LIQ_RESD" : "BLK_OLTB_CONTRACT_RES~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTB_CONTRACT_RES","BLK_OLTB_CONTRACT_LIQ_RESD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCRORES.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCRORES.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTB_CONTRACT_RES__CONREFNO";
pkFields[0] = "BLK_OLTB_CONTRACT_RES__CONREFNO";
queryFields[1] = "BLK_OLTB_CONTRACT_RES__VERNO";
pkFields[1] = "BLK_OLTB_CONTRACT_RES__VERNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var modifyAmendArr = new Array(); 
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
//***** Fields Amendable while Rollover *****
var rolloverAmendArr = {"BLK_OLTB_CONTRACT_LIQ_RESD":["AMTPAID"]};
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
var multipleEntryIDs = new Array("BLK_OLTB_CONTRACT_LIQ_RESD");
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

ArrFuncOrigin["OLCRORES"]="KERNEL";
ArrPrntFunc["OLCRORES"]="";
ArrPrntOrigin["OLCRORES"]="";
ArrRoutingType["OLCRORES"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCRORES"]="N";
ArrCustomModified["OLCRORES"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ROLRESD":"CONREFNO~VERNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_ROLRESD":"CONREFNO~VERNO"};
var scrArgDest = {"CVS_ROLRESD":"BLK_OLTB_CONTRACT_RES__CONREFNO~BLK_OLTB_CONTRACT_RES__VERNO"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"2","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------