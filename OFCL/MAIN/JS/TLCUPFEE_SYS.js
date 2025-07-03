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
**  File Name          : TLCUPFEE_SYS.js
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
var fieldNameArray = {"BLK_TLTBS_UPLOAD_MASTER_FEE":"EXTCONTRACTREFNO~BRANCH~PORTFOLIO~POSITIONIDENTIFIER~CUSIPNO~EXPENSECODE~TRADEREFNO~DESKCODE~PORTFOLIODESC~POSITIONQUALIFIER~TICKETID~UPLOADREFNO~SOURCECODE~VERNO~DCFWAIVER~ASFEECCY~CURRENCY","BLK_TLTBS_UPLOAD_FEE_MASTER":"EXTCONTRACTREFNO~SOURCECODE~BRANCH~VERNO~COMPONENT~COMPONENTDESC~FEETYPE~DCFCATEGORY~FEECALCBASIS~FEEBASIS~RATE~COMPONENTCCY~AMOUNT~ASSIGNFEETYPE~BUYERSPLITAMT~SELLERSPLITAMT~WAIVER~DCFWAIVER"};

var multipleEntryPageSize = {"BLK_TLTBS_UPLOAD_FEE_MASTER" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_FEE__TAB_MAIN":"BLK_TLTBS_UPLOAD_FEE_MASTER"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_UPLOAD_MASTER_FEE">EXTCONTRACTREFNO~BRANCH~PORTFOLIO~POSITIONIDENTIFIER~CUSIPNO~EXPENSECODE~TRADEREFNO~DESKCODE~PORTFOLIODESC~POSITIONQUALIFIER~TICKETID~UPLOADREFNO~SOURCECODE~VERNO~DCFWAIVER~ASFEECCY~CURRENCY</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_UPLOAD_MASTER_FEE" RELATION_TYPE="N" TYPE="BLK_TLTBS_UPLOAD_FEE_MASTER">EXTCONTRACTREFNO~SOURCECODE~BRANCH~VERNO~COMPONENT~COMPONENTDESC~FEETYPE~DCFCATEGORY~FEECALCBASIS~FEEBASIS~RATE~COMPONENTCCY~AMOUNT~ASSIGNFEETYPE~BUYERSPLITAMT~SELLERSPLITAMT~WAIVER~DCFWAIVER</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_FEE";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTBS_UPLOAD_MASTER_FEE" : "","BLK_TLTBS_UPLOAD_FEE_MASTER" : "BLK_TLTBS_UPLOAD_MASTER_FEE~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTBS_UPLOAD_MASTER_FEE","BLK_TLTBS_UPLOAD_FEE_MASTER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLCUPFEE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLCUPFEE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTBS_UPLOAD_MASTER_FEE__EXTCONTRACTREFNO";
pkFields[0] = "BLK_TLTBS_UPLOAD_MASTER_FEE__EXTCONTRACTREFNO";
queryFields[1] = "BLK_TLTBS_UPLOAD_MASTER_FEE__VERNO";
pkFields[1] = "BLK_TLTBS_UPLOAD_MASTER_FEE__VERNO";
queryFields[2] = "BLK_TLTBS_UPLOAD_MASTER_FEE__SOURCECODE";
pkFields[2] = "BLK_TLTBS_UPLOAD_MASTER_FEE__SOURCECODE";
queryFields[3] = "BLK_TLTBS_UPLOAD_MASTER_FEE__BRANCH";
pkFields[3] = "BLK_TLTBS_UPLOAD_MASTER_FEE__BRANCH";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TLTBS_UPLOAD_FEE_MASTER":["AMOUNT","ASSIGNFEETYPE","BUYERSPLITAMT","COMPONENTCCY","DCFCATEGORY","FEEBASIS","FEECALCBASIS","RATE","SELLERSPLITAMT","WAIVER"]};
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
var lovInfoFlds = {"BLK_TLTBS_UPLOAD_FEE_MASTER__COMPONENTCCY__LOV_COMPONENTCCY":["~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TLTBS_UPLOAD_FEE_MASTER");
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

ArrFuncOrigin["TLCUPFEE"]="KERNEL";
ArrPrntFunc["TLCUPFEE"]="";
ArrPrntOrigin["TLCUPFEE"]="";
ArrRoutingType["TLCUPFEE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLCUPFEE"]="N";
ArrCustomModified["TLCUPFEE"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_FEE":"EXTCONTRACTREFNO~VERNO~SOURCECODE~BRANCH"};
var scrArgSource = {};
var scrArgVals = {"CVS_FEE":"~~~"};
var scrArgDest = {"CVS_FEE":"BLK_TLTBS_UPLOAD_MASTER_FEE__EXTCONTRACTREFNO~BLK_TLTBS_UPLOAD_MASTER_FEE__VERNO~BLK_TLTBS_UPLOAD_MASTER_FEE__SOURCECODE~BLK_TLTBS_UPLOAD_MASTER_FEE__BRANCH"};
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