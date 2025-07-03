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
**  File Name          : OLCCONRL_SYS.js
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
var fieldNameArray = {"BLK_CONREL_MASTER":"CONTREFNO~LATVERNO~COUNTERPRTY~BRNCH","BLK_CONTRACT_RELATIONS":"CONTREFNO~VERNO~CUSTNO~BRNCD~RELATION~RELCUST~CUSTNAME~IDTYP~IDNUM~RELTYP"};

var multipleEntryPageSize = {"BLK_CONTRACT_RELATIONS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_CONREL__TAB_MAIN":"BLK_CONTRACT_RELATIONS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONREL_MASTER">CONTREFNO~LATVERNO~COUNTERPRTY~BRNCH</FN>'; 
msgxml += '      <FN PARENT="BLK_CONREL_MASTER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_RELATIONS">CONTREFNO~VERNO~CUSTNO~BRNCD~RELATION~RELCUST~CUSTNAME~IDTYP~IDNUM~RELTYP</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_CONREL";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONREL_MASTER" : "","BLK_CONTRACT_RELATIONS" : "BLK_CONREL_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONREL_MASTER","BLK_CONTRACT_RELATIONS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCCONRL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCCONRL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONREL_MASTER__CONTREFNO";
pkFields[0] = "BLK_CONREL_MASTER__CONTREFNO";
queryFields[1] = "BLK_CONREL_MASTER__LATVERNO";
pkFields[1] = "BLK_CONREL_MASTER__LATVERNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_RELATIONS":["CUSTNAME","IDNUM","IDTYP","RELATION","RELCUST"]};
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
var lovInfoFlds = {"BLK_CONTRACT_RELATIONS__RELATION__LOV_RELATION":["BLK_CONTRACT_RELATIONS__RELATION~","","N",""],"BLK_CONTRACT_RELATIONS__RELCUST__LOV_CUSTOMER":["BLK_CONTRACT_RELATIONS__RELCUST~BLK_CONTRACT_RELATIONS__CUSTNAME~","","N~N",""],"BLK_CONTRACT_RELATIONS__IDTYP__LOV_ID_TYPE":["BLK_CONTRACT_RELATIONS__IDTYP~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_RELATIONS");
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

ArrFuncOrigin["OLCCONRL"]="KERNEL";
ArrPrntFunc["OLCCONRL"]="";
ArrPrntOrigin["OLCCONRL"]="";
ArrRoutingType["OLCCONRL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCCONRL"]="N";
ArrCustomModified["OLCCONRL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_CONREL":"CONTREFNO~LATVERNO~COUNTERPRTY~BRNCH"};
var scrArgSource = {};
var scrArgVals = {"CVS_CONREL":"~~~"};
var scrArgDest = {"CVS_CONREL":"BLK_CONREL_MASTER__CONTREFNO~BLK_CONREL_MASTER__LATVERNO~BLK_CONREL_MASTER__COUNTERPRTY~BLK_CONREL_MASTER__BRNCH"};
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