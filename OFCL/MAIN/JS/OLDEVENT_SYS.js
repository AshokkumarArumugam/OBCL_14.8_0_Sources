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
**  File Name          : OLDEVENT_SYS.js
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
var fieldNameArray = {"BLK_EVENT":"REFNO~LATEVNSEQNO~LATVERNO~UICOL1~PARENTFID","BLK_EVENT_DETAILS":"MODULE~CONTRERNO~EVENTNO~EVENTDT~EVENTCD~DESCRIPTION~AUTH_STATUS~MAKERID~CHECKERID~REVERSEDEVENTSEQNO~CHANNEL_REF_NUM~PROCESS_REF_NUM"};

var multipleEntryPageSize = {"BLK_EVENT_DETAILS" : "20 "};

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_EVENTS__TAB_MAIN":"BLK_EVENT_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_EVENT">REFNO~LATEVNSEQNO~LATVERNO~UICOL1~PARENTFID</FN>'; 
msgxml += '      <FN PARENT="BLK_EVENT" RELATION_TYPE="N" TYPE="BLK_EVENT_DETAILS">MODULE~CONTRERNO~EVENTNO~EVENTDT~EVENTCD~DESCRIPTION~AUTH_STATUS~MAKERID~CHECKERID~REVERSEDEVENTSEQNO~CHANNEL_REF_NUM~PROCESS_REF_NUM</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_EVENTS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_EVENT" : "","BLK_EVENT_DETAILS" : "BLK_EVENT~N"}; 

 var dataSrcLocationArray = new Array("BLK_EVENT","BLK_EVENT_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDEVENT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDEVENT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_EVENT__REFNO";
pkFields[0] = "BLK_EVENT__REFNO";
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
var lovInfoFlds = {"BLK_EVENT_DETAILS__EVENTCD__LOV_EVENT":["~BLK_EVENT_DETAILS__DESCRIPTION~","BLK_EVENT_DETAILS__MODULE!STRING","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_EVENT_DETAILS");
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

ArrFuncOrigin["OLDEVENT"]="KERNEL";
ArrPrntFunc["OLDEVENT"]="";
ArrPrntOrigin["OLDEVENT"]="";
ArrRoutingType["OLDEVENT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDEVENT"]="N";
ArrCustomModified["OLDEVENT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_EVENTS":"CONTREF~ACTION_CODE","OLDACENT":"CONTREF~ESN~EVNTCD~ACTION_CODE","OLDMSGVW":"CONTREF~ESN~EVNTCD~ACTION_CODE"};
var scrArgSource = {"OLDACENT":"BLK_EVENT__REFNO~BLK_EVENT_DETAILS__EVENTNO~BLK_EVENT_DETAILS__EVENTCD~","OLDMSGVW":"BLK_EVENT__REFNO~BLK_EVENT_DETAILS__EVENTNO~BLK_EVENT_DETAILS__EVENTCD~"};
var scrArgVals = {"CVS_EVENTS":"~EXECUTEQUERY","OLDACENT":"~~~EXECUTEQUERY","OLDMSGVW":"~~~EXECUTEQUERY"};
var scrArgDest = {"CVS_EVENTS":"BLK_EVENT__REFNO~"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------