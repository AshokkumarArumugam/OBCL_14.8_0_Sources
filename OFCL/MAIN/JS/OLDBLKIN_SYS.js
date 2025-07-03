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
**  File Name          : OLDBLKIN_SYS.js
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
var fieldNameArray = {"BLK_HEADER_BLOCK":"CONTRACT_REF_NO","BLK_CONTRACT_EL_BLOCK":"AMOUNT~BLOCK_REF_NO~CONTRACT_CCY~CONTRACT_REF_NO~EVENT_CODE~EVENT_SEQ_NO~MODULE_CODE~ACTIVE_BLOCK~PARTICIPANT"};

var multipleEntryPageSize = {"BLK_CONTRACT_EL_BLOCK" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_OLDBLKIN__TAB_MAIN":"BLK_CONTRACT_EL_BLOCK"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HEADER_BLOCK">CONTRACT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_HEADER_BLOCK" RELATION_TYPE="N" TYPE="BLK_CONTRACT_EL_BLOCK">AMOUNT~BLOCK_REF_NO~CONTRACT_CCY~CONTRACT_REF_NO~EVENT_CODE~EVENT_SEQ_NO~MODULE_CODE~ACTIVE_BLOCK~PARTICIPANT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_OLDBLKIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_HEADER_BLOCK" : "","BLK_CONTRACT_EL_BLOCK" : "BLK_HEADER_BLOCK~N"}; 

 var dataSrcLocationArray = new Array("BLK_HEADER_BLOCK","BLK_CONTRACT_EL_BLOCK"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDBLKIN.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDBLKIN.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_HEADER_BLOCK__CONTRACT_REF_NO";
pkFields[0] = "BLK_HEADER_BLOCK__CONTRACT_REF_NO";
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
var multipleEntryIDs = new Array("BLK_CONTRACT_EL_BLOCK");
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

ArrFuncOrigin["OLDBLKIN"]="KERNEL";
ArrPrntFunc["OLDBLKIN"]="";
ArrPrntOrigin["OLDBLKIN"]="";
ArrRoutingType["OLDBLKIN"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDBLKIN"]="N";
ArrCustomModified["OLDBLKIN"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_OLDBLKIN":"CONTREFNO~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_OLDBLKIN":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_OLDBLKIN":"BLK_HEADER_BLOCK__CONTRACT_REF_NO~"};
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