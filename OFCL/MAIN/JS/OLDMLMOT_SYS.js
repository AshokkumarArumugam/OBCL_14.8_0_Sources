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
**  File Name          : OLDMLMOT_SYS.js
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
var fieldNameArray = {"BLK_ML_TRAIN_PERF_MAS":"ID~MODELTYPE~USECASENAME~RUNREF~CORPUSSIZE~ENTITYNUMTOT~F1SCORE~ISOCOUNTRY~PRECISION~RECALL~TRAINDT~TRAINTIMEMIN~DOCTYPTRAINPATH","BLK_ML_TRAIN_PERF_DET":"ID~RUNREF~ENTITYTAG~PRECISION~RECALL~F1SCORE~ACCURACY"};

var multipleEntryPageSize = {"BLK_ML_TRAIN_PERF_DET" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_ML_TRAIN_PERF_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ML_TRAIN_PERF_MAS">ID~MODELTYPE~USECASENAME~RUNREF~CORPUSSIZE~ENTITYNUMTOT~F1SCORE~ISOCOUNTRY~PRECISION~RECALL~TRAINDT~TRAINTIMEMIN~DOCTYPTRAINPATH</FN>'; 
msgxml += '      <FN PARENT="BLK_ML_TRAIN_PERF_MAS" RELATION_TYPE="N" TYPE="BLK_ML_TRAIN_PERF_DET">ID~RUNREF~ENTITYTAG~PRECISION~RECALL~F1SCORE~ACCURACY</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ML_TRAIN_PERF_MAS" : "","BLK_ML_TRAIN_PERF_DET" : "BLK_ML_TRAIN_PERF_MAS~N"}; 

 var dataSrcLocationArray = new Array("BLK_ML_TRAIN_PERF_MAS","BLK_ML_TRAIN_PERF_DET"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDMLMOT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDMLMOT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ML_TRAIN_PERF_MAS__ID";
pkFields[0] = "BLK_ML_TRAIN_PERF_MAS__ID";
queryFields[1] = "BLK_ML_TRAIN_PERF_MAS__RUNREF";
pkFields[1] = "BLK_ML_TRAIN_PERF_MAS__RUNREF";
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
var lovInfoFlds = {"BLK_ML_TRAIN_PERF_MAS__USECASENAME__LOV_USE_CASE":["BLK_ML_TRAIN_PERF_MAS__USECASENAME~BLK_ML_TRAIN_PERF_MAS__DOCTYPTRAINPATH~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_ML_TRAIN_PERF_DET");
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

ArrFuncOrigin["OLDMLMOT"]="KERNEL";
ArrPrntFunc["OLDMLMOT"]="";
ArrPrntOrigin["OLDMLMOT"]="";
ArrRoutingType["OLDMLMOT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDMLMOT"]="N";
ArrCustomModified["OLDMLMOT"]="N";

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