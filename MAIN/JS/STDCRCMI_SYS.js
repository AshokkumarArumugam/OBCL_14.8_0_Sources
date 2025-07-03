/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
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
**  File Name          : STDCRCMI_SYS.js
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
var fieldNameArray = {"BLK_CUSTDEFAULT":"CUSTOMER_NO~COMP_MIS_1~COMP_MIS_2~COMP_MIS_3~COMP_MIS_4~COMP_MIS_5~COMP_MIS_6~COMP_MIS_7~COMP_MIS_8~COMP_MIS_9~COMP_MIS_10","BLK_COMPOSITEMIS":"KEY_ID~MIS_CLASS~MIS_CODE~MIS_TYPE"};

var multipleEntryPageSize = {"BLK_COMPOSITEMIS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_COMPOSITEMIS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CUSTDEFAULT">CUSTOMER_NO~COMP_MIS_1~COMP_MIS_2~COMP_MIS_3~COMP_MIS_4~COMP_MIS_5~COMP_MIS_6~COMP_MIS_7~COMP_MIS_8~COMP_MIS_9~COMP_MIS_10</FN>'; 
msgxml += '      <FN PARENT="BLK_CUSTDEFAULT" RELATION_TYPE="N" TYPE="BLK_COMPOSITEMIS">KEY_ID~MIS_CLASS~MIS_CODE~MIS_TYPE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CUSTDEFAULT" : "","BLK_COMPOSITEMIS" : "BLK_CUSTDEFAULT~N"}; 

 var dataSrcLocationArray = new Array("BLK_CUSTDEFAULT","BLK_COMPOSITEMIS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside STDCRCMI.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside STDCRCMI.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CUSTDEFAULT__CUSTOMER_NO";
pkFields[0] = "BLK_CUSTDEFAULT__CUSTOMER_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_COMPOSITEMIS":["KEY_ID","MIS_CLASS","MIS_CODE","MIS_TYPE"],"BLK_CUSTDEFAULT":["COMP_MIS_1","COMP_MIS_10","COMP_MIS_2","COMP_MIS_3","COMP_MIS_4","COMP_MIS_5","COMP_MIS_6","COMP_MIS_7","COMP_MIS_8","COMP_MIS_9","CUSTOMER_NO"]};
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
var lovInfoFlds = {"BLK_CUSTDEFAULT__CUSTOMER_NO__LOV_CUST":["BLK_CUSTDEFAULT__CUSTOMER_NO~~","","N~N",""],"BLK_CUSTDEFAULT__COMP_MIS_1__LOV_COMPCD":["BLK_CUSTDEFAULT__COMP_MIS_1~~","BLK_CUSTDEFAULT__COMP_MIS_1!STRING","N~N","N"],"BLK_CUSTDEFAULT__COMP_MIS_2__LOV_COMPCD":["BLK_CUSTDEFAULT__COMP_MIS_2~~","BLK_CUSTDEFAULT__COMP_MIS_2!STRING","N~N","N"],"BLK_CUSTDEFAULT__COMP_MIS_3__LOV_COMPCD":["BLK_CUSTDEFAULT__COMP_MIS_3~~","BLK_CUSTDEFAULT__COMP_MIS_3!STRING","N~N","N"],"BLK_CUSTDEFAULT__COMP_MIS_4__LOV_COMPCD":["BLK_CUSTDEFAULT__COMP_MIS_4~~","BLK_CUSTDEFAULT__COMP_MIS_4!STRING","N~N","N"],"BLK_CUSTDEFAULT__COMP_MIS_5__LOV_COMPCD":["BLK_CUSTDEFAULT__COMP_MIS_5~~","BLK_CUSTDEFAULT__COMP_MIS_5!STRING","N~N","N"],"BLK_CUSTDEFAULT__COMP_MIS_6__LOV_COMPCD":["BLK_CUSTDEFAULT__COMP_MIS_6~~","BLK_CUSTDEFAULT__COMP_MIS_6!STRING","N~N","N"],"BLK_CUSTDEFAULT__COMP_MIS_7__LOV_COMPCD":["BLK_CUSTDEFAULT__COMP_MIS_7~~","BLK_CUSTDEFAULT__COMP_MIS_7!STRING","N~N","N"],"BLK_CUSTDEFAULT__COMP_MIS_8__LOV_COMPCD":["BLK_CUSTDEFAULT__COMP_MIS_8~~","BLK_CUSTDEFAULT__COMP_MIS_8!STRING","N~N","N"],"BLK_CUSTDEFAULT__COMP_MIS_9__LOV_COMPCD":["BLK_CUSTDEFAULT__COMP_MIS_9~~","BLK_CUSTDEFAULT__COMP_MIS_9!STRING","N~N","N"],"BLK_CUSTDEFAULT__COMP_MIS_10__LOV_COMPCD":["BLK_CUSTDEFAULT__COMP_MIS_10~~","BLK_CUSTDEFAULT__COMP_MIS_10!STRING","N~N","N"],"BLK_COMPOSITEMIS__MIS_CODE__LOV_COMPCD":["BLK_COMPOSITEMIS__MIS_CODE~~","BLK_COMPOSITEMIS__MIS_CLASS!STRING","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_COMPOSITEMIS");
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

ArrFuncOrigin["STDCRCMI"]="KERNEL";
ArrPrntFunc["STDCRCMI"]="";
ArrPrntOrigin["STDCRCMI"]="";
ArrRoutingType["STDCRCMI"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["STDCRCMI"]="N";
ArrCustomModified["STDCRCMI"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------