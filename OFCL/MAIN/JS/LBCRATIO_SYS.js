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
**  File Name          : LBCRATIO_SYS.js
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
var fieldNameArray = {"BLK_CONTROL":"TXT_SUM_TOTAL~CONTRACT_REF_NO~PART~ESN~VALDT~TOTAL_PAID","BLK_LBTB_PART_NONPRORATA_RATIO":"PRINCIPAL_NONPRORATA_RATIO~VALUE_DATE~EVENT_SEQ_NO~PARTICIPANT~CONTRACT_REF_NO~PARTICIPANT_NAME"};

var multipleEntryPageSize = {"BLK_LBTB_PART_NONPRORATA_RATIO" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_PRATIO__TAB_MAIN":"BLK_LBTB_PART_NONPRORATA_RATIO"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTROL">TXT_SUM_TOTAL~CONTRACT_REF_NO~PART~ESN~VALDT~TOTAL_PAID</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTROL" RELATION_TYPE="N" TYPE="BLK_LBTB_PART_NONPRORATA_RATIO">PRINCIPAL_NONPRORATA_RATIO~VALUE_DATE~EVENT_SEQ_NO~PARTICIPANT~CONTRACT_REF_NO~PARTICIPANT_NAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PRATIO";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTROL" : "","BLK_LBTB_PART_NONPRORATA_RATIO" : "BLK_CONTROL~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTROL","BLK_LBTB_PART_NONPRORATA_RATIO"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCRATIO.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCRATIO.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTROL__CONTRACT_REF_NO";
pkFields[0] = "BLK_CONTROL__CONTRACT_REF_NO";
queryFields[1] = "BLK_CONTROL__PART";
pkFields[1] = "BLK_CONTROL__PART";
queryFields[2] = "BLK_CONTROL__ESN";
pkFields[2] = "BLK_CONTROL__ESN";
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
var lovInfoFlds = {"BLK_LBTB_PART_NONPRORATA_RATIO__PARTICIPANT__LOV_PARTICIPANT":["BLK_LBTB_PART_NONPRORATA_RATIO__PARTICIPANT~BLK_LBTB_PART_NONPRORATA_RATIO__PARTICIPANT_NAME~","BLK_CONTROL__CONTRACT_REF_NO!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTB_PART_NONPRORATA_RATIO");
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

ArrFuncOrigin["LBCRATIO"]="KERNEL";
ArrPrntFunc["LBCRATIO"]="";
ArrPrntOrigin["LBCRATIO"]="";
ArrRoutingType["LBCRATIO"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCRATIO"]="N";
ArrCustomModified["LBCRATIO"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PRATIO":"CONT_REF_NO~VALUE_DATE~ESN~TOTAL_PAID"};
var scrArgSource = {};
var scrArgVals = {"CVS_PRATIO":"~~~"};
var scrArgDest = {"CVS_PRATIO":"BLK_CONTROL__CONTRACT_REF_NO~BLK_CONTROL__VALDT~BLK_CONTROL__ESN~BLK_CONTROL__TOTAL_PAID"};
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