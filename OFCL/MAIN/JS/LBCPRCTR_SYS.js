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
**  File Name          : LBCPRCTR_SYS.js
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
var fieldNameArray = {"BLK_HEAD":"CONTRACTREFNO~CONTRACT_REF_NO2~DET_INSTR_UI~CCY_UI~CCY_UI2","BLK_PARTIC_PRCD":"CONTRACTREFNO~TRANSFERBY3WAY~VALUEDATE~TRANSFERRATIO~IS3WAYTFR~TRANSFERAMT~AMOUNT3WAY~TRANSFERFROM~EVENTSEQNO~TRANSFERTO~TRANSFEROR_NAME~TRANSFEREE_NAME~TXT_INTERMEDIARY_NAME","BLK_CONSOL":"VALUEDATE~TRANSFERAMT~CONTRACTREFNO~PARTICIPANTNEWAMT~PARTICIPANTOLDAMT~PARTICIPANT~EVENTSEQNO~PARTICIPANTNAME"};

var multipleEntryPageSize = {"BLK_PARTIC_PRCD" :"15" ,"BLK_CONSOL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_TRNFR_HIST__TAB_MAIN":"BLK_PARTIC_PRCD","CVS_CONSOL_TRNFR_HIST1__TAB_MAIN":"BLK_CONSOL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HEAD">CONTRACTREFNO~CONTRACT_REF_NO2~DET_INSTR_UI~CCY_UI~CCY_UI2</FN>'; 
msgxml += '      <FN PARENT="BLK_HEAD" RELATION_TYPE="N" TYPE="BLK_PARTIC_PRCD">CONTRACTREFNO~TRANSFERBY3WAY~VALUEDATE~TRANSFERRATIO~IS3WAYTFR~TRANSFERAMT~AMOUNT3WAY~TRANSFERFROM~EVENTSEQNO~TRANSFERTO~TRANSFEROR_NAME~TRANSFEREE_NAME~TXT_INTERMEDIARY_NAME</FN>'; 
msgxml += '      <FN PARENT="BLK_HEAD" RELATION_TYPE="N" TYPE="BLK_CONSOL">VALUEDATE~TRANSFERAMT~CONTRACTREFNO~PARTICIPANTNEWAMT~PARTICIPANTOLDAMT~PARTICIPANT~EVENTSEQNO~PARTICIPANTNAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TRNFR_HIST";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_HEAD" : "","BLK_PARTIC_PRCD" : "BLK_HEAD~N","BLK_CONSOL" : "BLK_HEAD~N"}; 

 var dataSrcLocationArray = new Array("BLK_HEAD","BLK_PARTIC_PRCD","BLK_CONSOL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCPRCTR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCPRCTR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_HEAD__CONTRACTREFNO";
pkFields[0] = "BLK_HEAD__CONTRACTREFNO";
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
var multipleEntryIDs = new Array("BLK_PARTIC_PRCD","BLK_CONSOL");
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

ArrFuncOrigin["LBCPRCTR"]="KERNEL";
ArrPrntFunc["LBCPRCTR"]="";
ArrPrntOrigin["LBCPRCTR"]="";
ArrRoutingType["LBCPRCTR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCPRCTR"]="N";
ArrCustomModified["LBCPRCTR"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_TRNFR_HIST":"CONTRACT_REF_NO~CCY","CVS_CONSOL_TRNFR_HIST1":"CONTREF2~CURRENCY2"};
var scrArgSource = {"CVS_CONSOL_TRNFR_HIST1":"BLK_HEAD__CONTRACTREFNO~BLK_HEAD__CCY_UI"};
var scrArgVals = {"CVS_TRNFR_HIST":"~","CVS_CONSOL_TRNFR_HIST1":"~"};
var scrArgDest = {"CVS_TRNFR_HIST":"BLK_HEAD__CONTRACTREFNO~BLK_HEAD__CCY_UI","CVS_CONSOL_TRNFR_HIST1":"BLK_HEAD__CONTRACT_REF_NO2~BLK_HEAD__CCY_UI2"};
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