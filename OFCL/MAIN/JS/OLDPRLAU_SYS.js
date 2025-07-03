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
**  File Name          : OLDPRLAU_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT__PAYAU":"CONTREFNO","BLK_OLTBS_CONTRACT_EVENT_LOG__PAYAU":"CONTRACTREFNO~ESNO~CONTSTAT~EVENTCODE~EVENTDATE~MAKERID~MODULE","BLK_OLTBS_PAYRECV_PAID__MULTI":"CONTREFNO~COMPONENT~DUEDATE~PAIDDATE~CURRENCY~AMOUNTSETTLED~AMTDUE~PAYMENTSTATUS"};

var multipleEntryPageSize = {"BLK_OLTBS_PAYRECV_PAID__MULTI" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_AUTH__TAB_MAIN":"BLK_OLTBS_PAYRECV_PAID__MULTI"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT__PAYAU">CONTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT__PAYAU" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG__PAYAU">CONTRACTREFNO~ESNO~CONTSTAT~EVENTCODE~EVENTDATE~MAKERID~MODULE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT__PAYAU" RELATION_TYPE="N" TYPE="BLK_OLTBS_PAYRECV_PAID__MULTI">CONTREFNO~COMPONENT~DUEDATE~PAIDDATE~CURRENCY~AMOUNTSETTLED~AMTDUE~PAYMENTSTATUS</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT__PAYAU" : "","BLK_OLTBS_CONTRACT_EVENT_LOG__PAYAU" : "BLK_OLTBS_CONTRACT__PAYAU~1","BLK_OLTBS_PAYRECV_PAID__MULTI" : "BLK_OLTBS_CONTRACT__PAYAU~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT__PAYAU","BLK_OLTBS_CONTRACT_EVENT_LOG__PAYAU","BLK_OLTBS_PAYRECV_PAID__MULTI"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDPRLAU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDPRLAU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__PAYAU__CONTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__PAYAU__CONTREFNO";
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
var multipleEntryIDs = new Array("BLK_OLTBS_PAYRECV_PAID__MULTI");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCSTINF~BLK_OLTBS_CONTRACT__PAYAU"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT__PAYAU.CONTRACT_REF_NO=OLVW_SETTLEMENT_INFO.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDPRLAU"]="KERNEL";
ArrPrntFunc["OLDPRLAU"]="";
ArrPrntOrigin["OLDPRLAU"]="";
ArrRoutingType["OLDPRLAU"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDPRLAU"]="N";
ArrCustomModified["OLDPRLAU"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCSTINF":"CONTRACTREFNO~"};
var scrArgSource = {"OLCSTINF":"BLK_OLTBS_CONTRACT__PAYAU__CONTREFNO~"};
var scrArgVals = {"OLCSTINF":"~"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------