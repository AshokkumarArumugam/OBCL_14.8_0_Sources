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
**  File Name          : OLDMHOLD_SYS.js
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
var fieldNameArray = {"BLK_MSG_HOLD":"BRANCH~CUSTOMER~MEDIA~CCY~PRODUCT~MODULE~MSGTYPE~RECEIVER~HOLDDATETIME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSG_HOLD">BRANCH~CUSTOMER~MEDIA~CCY~PRODUCT~MODULE~MSGTYPE~RECEIVER~HOLDDATETIME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSG_HOLD">AUTHSTAT~TXNSTAT~BRANCH~CUSTOMER~MEDIA~CCY~PRODUCT~MODULE~MSGTYPE~RECEIVER~HOLDDATETIME</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDMHOLD";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MSG_HOLD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MSG_HOLD" : ""}; 

 var dataSrcLocationArray = new Array("BLK_MSG_HOLD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDMHOLD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDMHOLD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MSG_HOLD__BRANCH";
pkFields[0] = "BLK_MSG_HOLD__BRANCH";
queryFields[1] = "BLK_MSG_HOLD__CUSTOMER";
pkFields[1] = "BLK_MSG_HOLD__CUSTOMER";
queryFields[2] = "BLK_MSG_HOLD__MEDIA";
pkFields[2] = "BLK_MSG_HOLD__MEDIA";
queryFields[3] = "BLK_MSG_HOLD__CCY";
pkFields[3] = "BLK_MSG_HOLD__CCY";
queryFields[4] = "BLK_MSG_HOLD__PRODUCT";
pkFields[4] = "BLK_MSG_HOLD__PRODUCT";
queryFields[5] = "BLK_MSG_HOLD__MODULE";
pkFields[5] = "BLK_MSG_HOLD__MODULE";
queryFields[6] = "BLK_MSG_HOLD__MSGTYPE";
pkFields[6] = "BLK_MSG_HOLD__MSGTYPE";
queryFields[7] = "BLK_MSG_HOLD__RECEIVER";
pkFields[7] = "BLK_MSG_HOLD__RECEIVER";
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
var lovInfoFlds = {"BLK_MSG_HOLD__BRANCH__LOV_BRANCH":["BLK_MSG_HOLD__BRANCH~~","","N~N",""],"BLK_MSG_HOLD__CUSTOMER__LOV_CUSTOMER":["BLK_MSG_HOLD__CUSTOMER~~","","N~N",""],"BLK_MSG_HOLD__MEDIA__LOV_MEDIA":["BLK_MSG_HOLD__MEDIA~~","","N~N",""],"BLK_MSG_HOLD__CCY__LOV_CCY":["BLK_MSG_HOLD__CCY~~","","N~N",""],"BLK_MSG_HOLD__PRODUCT__LOV_PRODUCT":["BLK_MSG_HOLD__PRODUCT~~","","N~N",""],"BLK_MSG_HOLD__MODULE__LOV_MODULE":["BLK_MSG_HOLD__MODULE~~","","N~N",""],"BLK_MSG_HOLD__MSGTYPE__LOV_MSG_TYPE":["BLK_MSG_HOLD__MSGTYPE~~","","N~N",""],"BLK_MSG_HOLD__RECEIVER__LOV_RECEIVER":["BLK_MSG_HOLD__RECEIVER~~","","N~N",""]};
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

 var CallFormArray= new Array("CSCFNUDF~BLK_MSG_HOLD"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDMHOLD"]="KERNEL";
ArrPrntFunc["OLDMHOLD"]="";
ArrPrntOrigin["OLDMHOLD"]="";
ArrRoutingType["OLDMHOLD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDMHOLD"]="N";
ArrCustomModified["OLDMHOLD"]="N";

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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------