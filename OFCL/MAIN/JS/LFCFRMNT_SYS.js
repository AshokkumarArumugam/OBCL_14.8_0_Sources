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
**  File Name          : LFCFRMNT_SYS.js
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
var fieldNameArray = {"BLK_LFTMS_FEE_COMPONENT":"COMPONENT~FEERULEDESC~CUST~CUSTDESC~CONTREFNO~MODULE~MODDESC~FACREFNO~USERREFNO~BOOKDATE~VALUEDATE~BRN~CONT_CCY","BLK_LFTMS_FEE_COMPONENT_MULTI":"BRNCODE~MODULE~CONTRREFNO~CUSTNUM~COMPO~AMTORPCT~RATEORAMT~CMPTYPE~FEERULEDESCRITION~COMPTYP","BLK_LFTMS_FEE_CCY":"CCY~CCYNAME~COMPONENT~CUST~CONTREFNO~MODULE~BRN","BLK_LFTMS_FEE_CCY_EFFDATE":"EFFDATE~CCY~COMPONENT~CUST~CONTREFNO~MODULE","BLK_LFTMS_FEE_RATE":"FEEAMT~FEERATE~CCY~TOBASISAMT~FROMBASISAMT~COMPONENT~CUST~CONTREFNO~MODULE~EFFDT"};

var multipleEntryPageSize = {"BLK_LFTMS_FEE_CCY" :"15" ,"BLK_LFTMS_FEE_CCY_EFFDATE" :"15" ,"BLK_LFTMS_FEE_RATE" :"15" };

var multipleEntrySVBlocks = "BLK_LFTMS_FEE_COMPONENT_MULTI";

var tabMEBlks = {"CVS_FEERULEMAINT__TAB_MAIN":"BLK_LFTMS_FEE_CCY~BLK_LFTMS_FEE_CCY_EFFDATE~BLK_LFTMS_FEE_RATE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTMS_FEE_COMPONENT">COMPONENT~FEERULEDESC~CUST~CUSTDESC~CONTREFNO~MODULE~MODDESC~FACREFNO~USERREFNO~BOOKDATE~VALUEDATE~BRN~CONT_CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_FEE_COMPONENT" RELATION_TYPE="N" TYPE="BLK_LFTMS_FEE_COMPONENT_MULTI">BRNCODE~MODULE~CONTRREFNO~CUSTNUM~COMPO~AMTORPCT~RATEORAMT~CMPTYPE~FEERULEDESCRITION~COMPTYP</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_FEE_COMPONENT_MULTI" RELATION_TYPE="N" TYPE="BLK_LFTMS_FEE_CCY">CCY~CCYNAME~COMPONENT~CUST~CONTREFNO~MODULE~BRN</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_FEE_CCY" RELATION_TYPE="N" TYPE="BLK_LFTMS_FEE_CCY_EFFDATE">EFFDATE~CCY~COMPONENT~CUST~CONTREFNO~MODULE</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_FEE_CCY_EFFDATE" RELATION_TYPE="N" TYPE="BLK_LFTMS_FEE_RATE">FEEAMT~FEERATE~CCY~TOBASISAMT~FROMBASISAMT~COMPONENT~CUST~CONTREFNO~MODULE~EFFDT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_FEERULEMAINT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LFTMS_FEE_COMPONENT" : "","BLK_LFTMS_FEE_COMPONENT_MULTI" : "BLK_LFTMS_FEE_COMPONENT~N","BLK_LFTMS_FEE_CCY" : "BLK_LFTMS_FEE_COMPONENT_MULTI~N","BLK_LFTMS_FEE_CCY_EFFDATE" : "BLK_LFTMS_FEE_CCY~N","BLK_LFTMS_FEE_RATE" : "BLK_LFTMS_FEE_CCY_EFFDATE~N"}; 

 var dataSrcLocationArray = new Array("BLK_LFTMS_FEE_COMPONENT","BLK_LFTMS_FEE_COMPONENT_MULTI","BLK_LFTMS_FEE_CCY","BLK_LFTMS_FEE_CCY_EFFDATE","BLK_LFTMS_FEE_RATE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFCFRMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFCFRMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LFTMS_FEE_COMPONENT__MODULE";
pkFields[0] = "BLK_LFTMS_FEE_COMPONENT__MODULE";
queryFields[1] = "BLK_LFTMS_FEE_COMPONENT__CONTREFNO";
pkFields[1] = "BLK_LFTMS_FEE_COMPONENT__CONTREFNO";
queryFields[2] = "BLK_LFTMS_FEE_COMPONENT__CUST";
pkFields[2] = "BLK_LFTMS_FEE_COMPONENT__CUST";
queryFields[3] = "BLK_LFTMS_FEE_COMPONENT__COMPONENT";
pkFields[3] = "BLK_LFTMS_FEE_COMPONENT__COMPONENT";
queryFields[4] = "BLK_LFTMS_FEE_COMPONENT__BRN";
pkFields[4] = "BLK_LFTMS_FEE_COMPONENT__BRN";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTMS_FEE_CCY_EFFDATE":["CCY","COMPONENT","EFFDATEI"],"BLK_LFTMS_FEE_CCY":["CCY","CCYNAME","COMPONENT"],"BLK_LFTMS_FEE_COMPONENT_MULTI":["AMTORPCT","CMPTYPE","COMPO","COMPTYP","CUSTNUM","FEERULEDESCRITION","RATEORAMT"],"BLK_LFTMS_FEE_RATE":["CCY","COMPONENT","EFFDT","FEEAMT","FROMBASISAMT","TOBASISAMT"]};
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
var lovInfoFlds = {"BLK_LFTMS_FEE_COMPONENT__COMPONENT__LOV_COMPONENT":["BLK_LFTMS_FEE_COMPONENT__COMPONENT~BLK_LFTMS_FEE_COMPONENT__FEERULEDESC~","BLK_CFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_CFTMS_FEE_COMPONENT__MODULE!VARCHAR2~BLK_CFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_CFTMS_FEE_COMPONENT__CUST!VARCHAR2~BLK_CFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_CFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_CFTMS_FEE_COMPONENT__MODULE!VARCHAR2~BLK_CFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_CFTMS_FEE_COMPONENT__CUST!VARCHAR2~BLK_CFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_CFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2","N~N~N~N",""],"BLK_LFTMS_FEE_COMPONENT_MULTI__COMPO__LOV_COMPONENT":["BLK_LFTMS_FEE_COMPONENT_MULTI__COMPO~BLK_LFTMS_FEE_COMPONENT_MULTI__FEERULEDESCRITION~BLK_LFTMS_FEE_COMPONENT_MULTI__COMPTYP~BLK_LFTMS_FEE_COMPONENT_MULTI__RATEORAMT~","BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2","N~N~N~N",""],"BLK_LFTMS_FEE_CCY__CCY__LOV_FEECCY":["BLK_LFTMS_FEE_CCY__CCY~BLK_LFTMS_FEE_CCY__CCYNAME~","BLK_LFTMS_FEE_COMPONENT__CONT_CCY!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LFTMS_FEE_CCY","BLK_LFTMS_FEE_CCY_EFFDATE","BLK_LFTMS_FEE_RATE");
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

ArrFuncOrigin["LFCFRMNT"]="KERNEL";
ArrPrntFunc["LFCFRMNT"]="";
ArrPrntOrigin["LFCFRMNT"]="";
ArrRoutingType["LFCFRMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFCFRMNT"]="N";
ArrCustomModified["LFCFRMNT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_FEERULEMAINT":"MODULE~CONTREFNO~USERREFNO~BOOKDATE~VALUEDATE~CUST~CCY"};
var scrArgSource = {};
var scrArgVals = {"CVS_FEERULEMAINT":"~~~~~~"};
var scrArgDest = {"CVS_FEERULEMAINT":"BLK_LFTMS_FEE_COMPONENT__MODULE~BLK_LFTMS_FEE_COMPONENT__CONTREFNO~BLK_LFTMS_FEE_COMPONENT__USERREFNO~BLK_LFTMS_FEE_COMPONENT__BOOKDATE~BLK_LFTMS_FEE_COMPONENT__VALUEDATE~BLK_LFTMS_FEE_COMPONENT__CUST~BLK_LFTMS_FEE_COMPONENT__CONT_CCY"};
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