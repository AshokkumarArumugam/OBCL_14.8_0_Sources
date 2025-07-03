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
**  File Name          : OLDPDEQU_SYS.js
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
var fieldNameArray = {"BLK_BRANCH":"BRNCD~BRNNAME~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~PDETYPES~CHAR_FIELD1","BLK_DLYMSGOUT":"CCY~AMOUNT~MSGTYPE~MODULE~REFERENCENO~LOCATION~VALUEDATE~DCN~PDEDURING~MATCHEDDCN~PDESTATUS~MSGSTATUS~HOLDSTATUS~BRANCH~RECEIVER~CHKMRK","BLK_MSVWMSG":"MESSAGE~RUNNO~DCNO~DCNUM~RUNNGNUM"};

var multipleEntryPageSize = {"BLK_DLYMSGOUT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_DLYMSGOUT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BRANCH">BRNCD~BRNNAME~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~PDETYPES~CHAR_FIELD1</FN>'; 
msgxml += '      <FN PARENT="BLK_BRANCH" RELATION_TYPE="N" TYPE="BLK_DLYMSGOUT">CCY~AMOUNT~MSGTYPE~MODULE~REFERENCENO~LOCATION~VALUEDATE~DCN~PDEDURING~MATCHEDDCN~PDESTATUS~MSGSTATUS~HOLDSTATUS~BRANCH~RECEIVER~CHKMRK</FN>'; 
msgxml += '      <FN PARENT="BLK_DLYMSGOUT" RELATION_TYPE="N" TYPE="BLK_MSVWMSG">MESSAGE~RUNNO~DCNO~DCNUM~RUNNGNUM</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BRANCH" : "","BLK_DLYMSGOUT" : "BLK_BRANCH~N","BLK_MSVWMSG" : "BLK_DLYMSGOUT~N"}; 

 var dataSrcLocationArray = new Array("BLK_BRANCH","BLK_DLYMSGOUT","BLK_MSVWMSG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDPDEQU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDPDEQU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BRANCH__BRNCD";
pkFields[0] = "BLK_BRANCH__BRNCD";
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
var lovInfoFlds = {"BLK_BRANCH__BRNCD__LOV_BRANCH":["BLK_BRANCH__BRNCD~BLK_BRANCH__BRNNAME~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_DLYMSGOUT");
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

ArrFuncOrigin["OLDPDEQU"]="KERNEL";
ArrPrntFunc["OLDPDEQU"]="";
ArrPrntOrigin["OLDPDEQU"]="";
ArrRoutingType["OLDPDEQU"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDPDEQU"]="N";
ArrCustomModified["OLDPDEQU"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":""};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":""};
var scrArgDest = {"CVS_MAIN":""};
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