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
**  File Name          : OLDPPMNT_SYS.js
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
var fieldNameArray = {"BLK_PROPERTY_MASTER":"ELEVATORTYPE~HEATTYPE~NUMBEROFELEVATORS~CONSTRUCTIONTYPE~LASTRENOVDATE~DATEACQUIRED~AC~NUMBEROFSTORIES~DATECONSTRUCTED~FUELTYPE~ACQUISITIONCOST~BUILDINGTYPE~LOANALLOCATION~PHOTOONFILE~RENTCNTRL~LIENPOSITION~RESDNRA~OWNEROCC~LEASEHOLD~SECONDARYDESC~COMMNRA~OVERALLRATING~PRIMARYDESC~GROSSSQFT~OVERALLCONDITION~MEASUREDIN~MGMTFEEPERCENT~MGMTCONTACTONSITE~PROPMANAGER~ZIP~STATE~COUNTY~CITY~VILLAGE~STREETNAME2~STREETNO2~STREETNAME1~STREETNO1~PROPERTYTYPE~PROPERTYNAME~PROPERTYCODE~CONTRACTREFNO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PROPERTY_MASTER">ELEVATORTYPE~HEATTYPE~NUMBEROFELEVATORS~CONSTRUCTIONTYPE~LASTRENOVDATE~DATEACQUIRED~AC~NUMBEROFSTORIES~DATECONSTRUCTED~FUELTYPE~ACQUISITIONCOST~BUILDINGTYPE~LOANALLOCATION~PHOTOONFILE~RENTCNTRL~LIENPOSITION~RESDNRA~OWNEROCC~LEASEHOLD~SECONDARYDESC~COMMNRA~OVERALLRATING~PRIMARYDESC~GROSSSQFT~OVERALLCONDITION~MEASUREDIN~MGMTFEEPERCENT~MGMTCONTACTONSITE~PROPMANAGER~ZIP~STATE~COUNTY~CITY~VILLAGE~STREETNAME2~STREETNO2~STREETNAME1~STREETNO1~PROPERTYTYPE~PROPERTYNAME~PROPERTYCODE~CONTRACTREFNO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PROPERTY_MASTER">AUTHSTAT~TXNSTAT~CONTRACTREFNO~PROPERTYCODE~PROPERTYNAME~PROPERTYTYPE~MEASUREDIN~BUILDINGTYPE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDPPMNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_PROPERTY_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PROPERTY_MASTER" : ""}; 

 var dataSrcLocationArray = new Array("BLK_PROPERTY_MASTER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDPPMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDPPMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PROPERTY_MASTER__CONTRACTREFNO";
pkFields[0] = "BLK_PROPERTY_MASTER__CONTRACTREFNO";
queryFields[1] = "BLK_PROPERTY_MASTER__PROPERTYCODE";
pkFields[1] = "BLK_PROPERTY_MASTER__PROPERTYCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_PROPERTY_MASTER":["AC","ACQUISITIONCOST","BUILDINGTYPE","CITY","COMMNRA","CONSTRUCTIONTYPE","COUNTY","DATEACQUIREDI","DATECONSTRUCTEDI","ELEVATORTYPE","FUELTYPE","GROSSSQFT","HEATTYPE","LASTRENOVDATEI","LEASEHOLD","LIENPOSITION","LOANALLOCATION","MEASUREDIN","MGMTCONTACTONSITE","MGMTFEEPERCENT","NUMBEROFELEVATORS","NUMBEROFSTORIES","OVERALLCONDITION","OVERALLRATING","OWNEROCC","PHOTOONFILE","PRIMARYDESC","PROPERTYNAME","PROPERTYTYPE","PROPMANAGER","RENTCNTRL","RESDNRA","SECONDARYDESC","STATE","STREETNAME1","STREETNAME2","STREETNO1","STREETNO2","VILLAGE","ZIP"]};
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
var lovInfoFlds = {"BLK_PROPERTY_MASTER__PRIMARYDESC__LOV_PRIMARY_DESC":["BLK_PROPERTY_MASTER__PRIMARYDESC~~","","N~N",""],"BLK_PROPERTY_MASTER__STATE__LOV_STATE":["BLK_PROPERTY_MASTER__STATE~~","","N~N",""],"BLK_PROPERTY_MASTER__COUNTY__LOV_COUNTY":["BLK_PROPERTY_MASTER__COUNTY~~","","N~N",""],"BLK_PROPERTY_MASTER__CONTRACTREFNO__LOV_CONTRACT_REF_NO":["BLK_PROPERTY_MASTER__CONTRACTREFNO~","","N",""]};
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

 var CallFormArray= new Array("CSCFNUDF~BLK_PROPERTY_MASTER"); 

 var CallFormRelat=new Array("ONE TO ONE"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDPPMNT"]="KERNEL";
ArrPrntFunc["OLDPPMNT"]="";
ArrPrntOrigin["OLDPPMNT"]="";
ArrRoutingType["OLDPPMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDPPMNT"]="N";
ArrCustomModified["OLDPPMNT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CSCFNUDF":""};
var scrArgSource = {"CSCFNUDF":""};
var scrArgVals = {"CSCFNUDF":""};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"CSCFNUDF":""};
var dpndntOnSrvs = {"CSCFNUDF":""};
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