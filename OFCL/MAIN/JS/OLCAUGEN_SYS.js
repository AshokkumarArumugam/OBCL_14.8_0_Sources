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
**  File Name          : OLCAUGEN_SYS.js
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
var fieldNameArray = {"BLK_DLY_MSG_OUT":"DCN~RUNNINGNO~REFERENCENO~ESN~MEDIA~MSGTYPE~BRANCH~MESSAGE~CONTRACTREFNO~RECEIVER~ENTITY~CCY~AMOUNT~MSGSTATUS~NAME~LOCATION~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~REPAIRREASON~EVENTCODE~TRNDATE~REASONDESC~RGPRNSPL~FORMID1~CLNSRV","BLK_DLY_MSG_OUT_MULTI":"DCN~RUNNINGNO~ESN~MSGTYPE~MEDIA~BRANCH~CONTRACTREFNO~RECEIVER~ENTITY~CCY~AMOUNT~MSGSTATUS~NAME~LOCATION~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~LEG_REFERENCENO~DESCINOUT~REFERENCE_NO~STATUSTEXT"};

var multipleEntryPageSize = {"BLK_DLY_MSG_OUT_MULTI" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MSGS__TAB_MAIN":"BLK_DLY_MSG_OUT_MULTI"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_DLY_MSG_OUT">DCN~RUNNINGNO~REFERENCENO~ESN~MEDIA~MSGTYPE~BRANCH~MESSAGE~CONTRACTREFNO~RECEIVER~ENTITY~CCY~AMOUNT~MSGSTATUS~NAME~LOCATION~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~REPAIRREASON~EVENTCODE~TRNDATE~REASONDESC~RGPRNSPL~FORMID1~CLNSRV</FN>'; 
msgxml += '      <FN PARENT="BLK_DLY_MSG_OUT" RELATION_TYPE="N" TYPE="BLK_DLY_MSG_OUT_MULTI">DCN~RUNNINGNO~ESN~MSGTYPE~MEDIA~BRANCH~CONTRACTREFNO~RECEIVER~ENTITY~CCY~AMOUNT~MSGSTATUS~NAME~LOCATION~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~LEG_REFERENCENO~DESCINOUT~REFERENCE_NO~STATUSTEXT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MSGS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_DLY_MSG_OUT" : "","BLK_DLY_MSG_OUT_MULTI" : "BLK_DLY_MSG_OUT~N"}; 

 var dataSrcLocationArray = new Array("BLK_DLY_MSG_OUT","BLK_DLY_MSG_OUT_MULTI"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCAUGEN.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCAUGEN.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_DLY_MSG_OUT__RUNNINGNO";
pkFields[0] = "BLK_DLY_MSG_OUT__RUNNINGNO";
queryFields[1] = "BLK_DLY_MSG_OUT__DCN";
pkFields[1] = "BLK_DLY_MSG_OUT__DCN";
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
var multipleEntryIDs = new Array("BLK_DLY_MSG_OUT_MULTI");
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

ArrFuncOrigin["OLCAUGEN"]="KERNEL";
ArrPrntFunc["OLCAUGEN"]="";
ArrPrntOrigin["OLCAUGEN"]="";
ArrRoutingType["OLCAUGEN"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCAUGEN"]="N";
ArrCustomModified["OLCAUGEN"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MSGS":"REFERENCENO~DCN~ESN"};
var scrArgSource = {};
var scrArgVals = {"CVS_MSGS":"~~"};
var scrArgDest = {"CVS_MSGS":"BLK_DLY_MSG_OUT__REFERENCENO~BLK_DLY_MSG_OUT__DCN~BLK_DLY_MSG_OUT__ESN"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------