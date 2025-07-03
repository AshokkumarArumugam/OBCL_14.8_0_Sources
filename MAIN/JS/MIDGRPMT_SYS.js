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
**  File Name          : MIDGRPMT_SYS.js
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
var criteriaSearch  = 'N';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_MITMS_MIS_GROUP":"MISGROUP~GRPDESC~POOLCD~CUSTMIS1~CUSTMIS2~CUSTMIS3~CUSTMIS4~CUSTMIS5~CUSTMIS6~CUSTMIS7~CUSTMIS8~CUSTMIS9~CUSTMIS10~COMPMIS1~COMPMIS2~COMPMIS3~COMPMIS4~COMPMIS5~COMPMIS6~COMPMIS7~COMPMIS8~COMPMIS9~COMPMIS10~TXNMIS1~TXNMIS2~TXNMIS3~TXNMIS4~TXNMIS5~TXNMIS6~TXNMIS7~TXNMIS8~TXNMIS9~TXNMIS10~COSTCD1~COSTCD2~COSTCD3~COSTCD4~COSTCD5~MISCLASS0~MISCLASS1~MISCLASS2~MISCLASS3~MISCLASS4~MISCLASS5~MISCLASS6~MISCLASS7~MISCLASS8~MISCLASS9~MISCLASS10~COMPMISCLS1~COMPMISCLS2~COMPMISCLS3~COMPMISCLS4~COMPMISCLS5~COMPMISCLS6~COMPMISCLS7~COMPMISCLS8~COMPMISCLS9~COMPMISCLS10~TRNMISCLASS1~TRNMISCLASS2~TRNMISCLASS3~TRNMISCLASS4~TRNMISCLASS5~TRNMISCLASS6~TRNMISCLASS7~TRNMISCLASS8~TRNMISCLASS9~TRNMISCLASS10~POOLDESC~CUSTMISDESC1~CUSTMISDESC2~CUSTMISDESC3~CUSTMISDESC4~CUSTMISDESC5~CUSTMISDESC6~CUSTMISDESC7~CUSTMISDESC8~CUSTMISDESC9~CUSTMISDESC10~COMPMISDESC1~COMPMISDESC2~COMPMISDESC3~COMPMISDESC4~COMPMISDESC5~COMPMISDESC6~COMPMISDESC7~COMPMISDESC8~COMPMISDESC9~COMPMISDESC10~TXNMISDESC1~TXNMISDESC2~TXNMISDESC3~TXNMISDESC4~TXNMISDESC5~TXNMISDESC6~TXNMISDESC7~TXNMISDESC8~TXNMISDESC9~TXNMISDESC10~COSTMISDESC1~COSTMISDESC2~COSTMISDESC3~COSTMISDESC4~COSTMISDESC5~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MITMS_MIS_GROUP">MISGROUP~GRPDESC~POOLCD~CUSTMIS1~CUSTMIS2~CUSTMIS3~CUSTMIS4~CUSTMIS5~CUSTMIS6~CUSTMIS7~CUSTMIS8~CUSTMIS9~CUSTMIS10~COMPMIS1~COMPMIS2~COMPMIS3~COMPMIS4~COMPMIS5~COMPMIS6~COMPMIS7~COMPMIS8~COMPMIS9~COMPMIS10~TXNMIS1~TXNMIS2~TXNMIS3~TXNMIS4~TXNMIS5~TXNMIS6~TXNMIS7~TXNMIS8~TXNMIS9~TXNMIS10~COSTCD1~COSTCD2~COSTCD3~COSTCD4~COSTCD5~MISCLASS0~MISCLASS1~MISCLASS2~MISCLASS3~MISCLASS4~MISCLASS5~MISCLASS6~MISCLASS7~MISCLASS8~MISCLASS9~MISCLASS10~COMPMISCLS1~COMPMISCLS2~COMPMISCLS3~COMPMISCLS4~COMPMISCLS5~COMPMISCLS6~COMPMISCLS7~COMPMISCLS8~COMPMISCLS9~COMPMISCLS10~TRNMISCLASS1~TRNMISCLASS2~TRNMISCLASS3~TRNMISCLASS4~TRNMISCLASS5~TRNMISCLASS6~TRNMISCLASS7~TRNMISCLASS8~TRNMISCLASS9~TRNMISCLASS10~POOLDESC~CUSTMISDESC1~CUSTMISDESC2~CUSTMISDESC3~CUSTMISDESC4~CUSTMISDESC5~CUSTMISDESC6~CUSTMISDESC7~CUSTMISDESC8~CUSTMISDESC9~CUSTMISDESC10~COMPMISDESC1~COMPMISDESC2~COMPMISDESC3~COMPMISDESC4~COMPMISDESC5~COMPMISDESC6~COMPMISDESC7~COMPMISDESC8~COMPMISDESC9~COMPMISDESC10~TXNMISDESC1~TXNMISDESC2~TXNMISDESC3~TXNMISDESC4~TXNMISDESC5~TXNMISDESC6~TXNMISDESC7~TXNMISDESC8~TXNMISDESC9~TXNMISDESC10~COSTMISDESC1~COSTMISDESC2~COSTMISDESC3~COSTMISDESC4~COSTMISDESC5~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MITMS_MIS_GROUP">AUTHSTAT~TXNSTAT~MISGROUP~GRPDESC~POOLCD</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "MIDGRPMT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MITMS_MIS_GROUP";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MITMS_MIS_GROUP" : ""}; 

 var dataSrcLocationArray = new Array("BLK_MITMS_MIS_GROUP"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside MIDGRPMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside MIDGRPMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MITMS_MIS_GROUP__MISGROUP";
pkFields[0] = "BLK_MITMS_MIS_GROUP__MISGROUP";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_MITMS_MIS_GROUP":["COMPMIS1","COMPMIS10","COMPMIS2","COMPMIS3","COMPMIS4","COMPMIS5","COMPMIS6","COMPMIS7","COMPMIS8","COMPMIS9","CUSTMIS1","CUSTMIS10","CUSTMIS2","CUSTMIS3","CUSTMIS4","CUSTMIS5","CUSTMIS6","CUSTMIS7","CUSTMIS8","CUSTMIS9","GRPDESC","POOLCD","TXNMIS1","TXNMIS10","TXNMIS2","TXNMIS3","TXNMIS4","TXNMIS5","TXNMIS6","TXNMIS7","TXNMIS8","TXNMIS9"]};
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
var lovInfoFlds = {"BLK_MITMS_MIS_GROUP__POOLCD__LOV_POOL":["BLK_MITMS_MIS_GROUP__POOLCD~BLK_MITMS_MIS_GROUP__POOLDESC~","","N~N",""],"BLK_MITMS_MIS_GROUP__CUSTMIS1__LOV_CUST_MIS1":["BLK_MITMS_MIS_GROUP__CUSTMIS1~BLK_MITMS_MIS_GROUP__CUSTMISDESC1~","","N~N",""],"BLK_MITMS_MIS_GROUP__CUSTMIS2__LOV_CUST_MIS2":["BLK_MITMS_MIS_GROUP__CUSTMIS2~BLK_MITMS_MIS_GROUP__CUSTMISDESC2~","","N~N",""],"BLK_MITMS_MIS_GROUP__CUSTMIS3__LOV_CUST_MIS3":["BLK_MITMS_MIS_GROUP__CUSTMIS3~BLK_MITMS_MIS_GROUP__CUSTMISDESC3~","","N~N",""],"BLK_MITMS_MIS_GROUP__CUSTMIS4__LOV_CUST_MIS4":["BLK_MITMS_MIS_GROUP__CUSTMIS4~BLK_MITMS_MIS_GROUP__CUSTMISDESC4~","","N~N",""],"BLK_MITMS_MIS_GROUP__CUSTMIS5__LOV_CUST_MIS5":["BLK_MITMS_MIS_GROUP__CUSTMIS5~BLK_MITMS_MIS_GROUP__CUSTMISDESC5~","","N~N",""],"BLK_MITMS_MIS_GROUP__CUSTMIS6__LOV_CUST_MIS6":["BLK_MITMS_MIS_GROUP__CUSTMIS6~BLK_MITMS_MIS_GROUP__CUSTMISDESC6~","","N~N",""],"BLK_MITMS_MIS_GROUP__CUSTMIS7__LOV_CUST_MIS6":["BLK_MITMS_MIS_GROUP__CUSTMIS7~BLK_MITMS_MIS_GROUP__CUSTMISDESC7~","","N~N",""],"BLK_MITMS_MIS_GROUP__CUSTMIS8__LOV_CUST_MIS8":["BLK_MITMS_MIS_GROUP__CUSTMIS8~BLK_MITMS_MIS_GROUP__CUSTMISDESC8~","","N~N",""],"BLK_MITMS_MIS_GROUP__CUSTMIS9__LOV_CUST_MIS9":["BLK_MITMS_MIS_GROUP__CUSTMIS9~BLK_MITMS_MIS_GROUP__CUSTMISDESC9~","","N~N",""],"BLK_MITMS_MIS_GROUP__CUSTMIS10__LOV_CUST_MIS10":["BLK_MITMS_MIS_GROUP__CUSTMIS10~BLK_MITMS_MIS_GROUP__CUSTMISDESC10~","","N~N",""],"BLK_MITMS_MIS_GROUP__COMPMIS1__LOV_COMP_MIS1":["BLK_MITMS_MIS_GROUP__COMPMIS1~BLK_MITMS_MIS_GROUP__COMPMISDESC1~","","N~N",""],"BLK_MITMS_MIS_GROUP__COMPMIS2__LOV_COMP_MIS2":["BLK_MITMS_MIS_GROUP__COMPMIS2~BLK_MITMS_MIS_GROUP__COMPMISDESC2~","","N~N",""],"BLK_MITMS_MIS_GROUP__COMPMIS3__LOV_COMP_MIS3":["BLK_MITMS_MIS_GROUP__COMPMIS3~BLK_MITMS_MIS_GROUP__COMPMISDESC3~","","N~N",""],"BLK_MITMS_MIS_GROUP__COMPMIS4__LOV_COMP_MIS4":["BLK_MITMS_MIS_GROUP__COMPMIS4~BLK_MITMS_MIS_GROUP__COMPMISDESC4~","","N~N",""],"BLK_MITMS_MIS_GROUP__COMPMIS5__LOV_COMP_MIS5":["BLK_MITMS_MIS_GROUP__COMPMIS5~BLK_MITMS_MIS_GROUP__COMPMISDESC5~","","N~N",""],"BLK_MITMS_MIS_GROUP__COMPMIS6__LOV_COMP_MIS6":["BLK_MITMS_MIS_GROUP__COMPMIS6~BLK_MITMS_MIS_GROUP__COMPMISDESC6~","","N~N",""],"BLK_MITMS_MIS_GROUP__COMPMIS7__LOV_COMP_MIS7":["BLK_MITMS_MIS_GROUP__COMPMIS7~BLK_MITMS_MIS_GROUP__COMPMISDESC7~","","N~N",""],"BLK_MITMS_MIS_GROUP__COMPMIS8__LOV_COMP_MIS8":["BLK_MITMS_MIS_GROUP__COMPMIS8~BLK_MITMS_MIS_GROUP__COMPMISDESC8~","","N~N",""],"BLK_MITMS_MIS_GROUP__COMPMIS9__LOV_COMP_MIS9":["BLK_MITMS_MIS_GROUP__COMPMIS9~BLK_MITMS_MIS_GROUP__COMPMISDESC9~","","N~N",""],"BLK_MITMS_MIS_GROUP__COMPMIS10__LOV_COMP_MIS10":["BLK_MITMS_MIS_GROUP__COMPMIS10~BLK_MITMS_MIS_GROUP__COMPMISDESC10~","","N~N",""],"BLK_MITMS_MIS_GROUP__TXNMIS1__LOV_TXN_MIS1":["BLK_MITMS_MIS_GROUP__TXNMIS1~BLK_MITMS_MIS_GROUP__TXNMISDESC1~","","N~N",""],"BLK_MITMS_MIS_GROUP__TXNMIS2__LOV_TXN_MIS2":["BLK_MITMS_MIS_GROUP__TXNMIS2~BLK_MITMS_MIS_GROUP__TXNMISDESC2~","","N~N",""],"BLK_MITMS_MIS_GROUP__TXNMIS3__LOV_TXN_MIS3":["BLK_MITMS_MIS_GROUP__TXNMIS3~BLK_MITMS_MIS_GROUP__TXNMISDESC3~","","N~N",""],"BLK_MITMS_MIS_GROUP__TXNMIS4__LOV_TXN_MIS4":["BLK_MITMS_MIS_GROUP__TXNMIS4~BLK_MITMS_MIS_GROUP__TXNMISDESC4~","","N~N",""],"BLK_MITMS_MIS_GROUP__TXNMIS5__LOV_TXN_MIS5":["BLK_MITMS_MIS_GROUP__TXNMIS5~BLK_MITMS_MIS_GROUP__TXNMISDESC5~","","N~N",""],"BLK_MITMS_MIS_GROUP__TXNMIS6__LOV_TXN_MIS6":["BLK_MITMS_MIS_GROUP__TXNMIS6~BLK_MITMS_MIS_GROUP__TXNMISDESC6~","","N~N",""],"BLK_MITMS_MIS_GROUP__TXNMIS7__LOV_TXN_MIS7":["BLK_MITMS_MIS_GROUP__TXNMIS7~BLK_MITMS_MIS_GROUP__TXNMISDESC7~","","N~N",""],"BLK_MITMS_MIS_GROUP__TXNMIS8__LOV_TXN_MIS8":["BLK_MITMS_MIS_GROUP__TXNMIS8~BLK_MITMS_MIS_GROUP__TXNMISDESC8~","","N~N",""],"BLK_MITMS_MIS_GROUP__TXNMIS9__LOV_TXN_MIS9":["BLK_MITMS_MIS_GROUP__TXNMIS9~BLK_MITMS_MIS_GROUP__TXNMISDESC9~","","N~N",""],"BLK_MITMS_MIS_GROUP__TXNMIS10__LOV_TXN_MIS10":["BLK_MITMS_MIS_GROUP__TXNMIS10~BLK_MITMS_MIS_GROUP__TXNMISDESC10~","","N~N",""],"BLK_MITMS_MIS_GROUP__COSTCD1__LOV_COST_CODE1":["BLK_MITMS_MIS_GROUP__COSTCD1~BLK_MITMS_MIS_GROUP__COSTMISDESC1~","","N~N",""],"BLK_MITMS_MIS_GROUP__COSTCD2__LOV_COST_CODE2":["BLK_MITMS_MIS_GROUP__COSTCD2~BLK_MITMS_MIS_GROUP__COSTMISDESC2~","","N~N",""],"BLK_MITMS_MIS_GROUP__COSTCD3__LOV_COST_CODE3":["BLK_MITMS_MIS_GROUP__COSTCD3~BLK_MITMS_MIS_GROUP__COSTMISDESC3~","","N~N",""],"BLK_MITMS_MIS_GROUP__COSTCD4__LOV_COST_CODE4":["BLK_MITMS_MIS_GROUP__COSTCD4~BLK_MITMS_MIS_GROUP__COSTMISDESC4~","","N~N",""],"BLK_MITMS_MIS_GROUP__COSTCD5__LOV_COST_CODE5":["BLK_MITMS_MIS_GROUP__COSTCD5~BLK_MITMS_MIS_GROUP__COSTMISDESC5~","","N~N",""]};
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
var multipleEntryIDs = new Array();
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

ArrFuncOrigin["MIDGRPMT"]="KERNEL";
ArrPrntFunc["MIDGRPMT"]="";
ArrPrntOrigin["MIDGRPMT"]="";
ArrRoutingType["MIDGRPMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["MIDGRPMT"]="N";
ArrCustomModified["MIDGRPMT"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------