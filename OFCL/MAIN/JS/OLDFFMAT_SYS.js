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
**  File Name          : OLDFFMAT_SYS.js
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
var fieldNameArray = {"BLK_MSG_PREVIEW_MAS":"PRVWM_FFMTREF~PRVWM_CONTREF~PRVWM_ESN","BLK_MSG_PREVIEW":"PRVW_DCN~PRVW_BRROWER~PRVW_MSG~PRVW_ESN~PRVW_REF"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "BLK_MSG_PREVIEW";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSG_PREVIEW_MAS">PRVWM_FFMTREF~PRVWM_CONTREF~PRVWM_ESN</FN>'; 
msgxml += '      <FN PARENT="BLK_MSG_PREVIEW_MAS" RELATION_TYPE="N" TYPE="BLK_MSG_PREVIEW">PRVW_DCN~PRVW_BRROWER~PRVW_MSG~PRVW_ESN~PRVW_REF</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MSG_PREVIEW_MAS" : "","BLK_MSG_PREVIEW" : "BLK_MSG_PREVIEW_MAS~N"}; 

 var dataSrcLocationArray = new Array("BLK_MSG_PREVIEW_MAS","BLK_MSG_PREVIEW"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDFFMAT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDFFMAT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MSG_PREVIEW_MAS__PRVWM_CONTREF";
pkFields[0] = "BLK_MSG_PREVIEW_MAS__PRVWM_CONTREF";
queryFields[1] = "BLK_MSG_PREVIEW_MAS__PRVWM_FFMTREF";
pkFields[1] = "BLK_MSG_PREVIEW_MAS__PRVWM_FFMTREF";
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

ArrFuncOrigin["OLDFFMAT"]="KERNEL";
ArrPrntFunc["OLDFFMAT"]="";
ArrPrntOrigin["OLDFFMAT"]="";
ArrRoutingType["OLDFFMAT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDFFMAT"]="N";
ArrCustomModified["OLDFFMAT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_AUTH":"FFMTREF~CONTREF"};
var scrArgSource = {};
var scrArgVals = {"CVS_AUTH":"~"};
var scrArgDest = {"CVS_AUTH":"BLK_MSG_PREVIEW_MAS__PRVWM_FFMTREF~BLK_MSG_PREVIEW_MAS__PRVWM_CONTREF"};
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