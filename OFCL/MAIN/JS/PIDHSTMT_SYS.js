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
**  File Name          : PIDHSTMT_SYS.js
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
var fieldNameArray = {"BLK_HOST_PARAM":"ACCOUNTING_SYSTEM_CODE~ELCM_SYSTEM~GL_SYSTEM_CODE~HOST_CODE~HOST_DESCRIPTION~UBS_SYSTEM~PAYMENT_SYSTEM~BLOCKCHAIN_CODE~PAY_NETWK_CODE~OBTF_SYSTEM~CD_SYSTEM~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HOST_PARAM">ACCOUNTING_SYSTEM_CODE~ELCM_SYSTEM~GL_SYSTEM_CODE~HOST_CODE~HOST_DESCRIPTION~UBS_SYSTEM~PAYMENT_SYSTEM~BLOCKCHAIN_CODE~PAY_NETWK_CODE~OBTF_SYSTEM~CD_SYSTEM~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HOST_PARAM">AUTHSTAT~TXNSTAT~HOST_CODE~HOST_DESCRIPTION~ACCOUNTING_SYSTEM_CODE~GL_SYSTEM_CODE~ELCM_SYSTEM~PAYMENT_SYSTEM~UBS_SYSTEM~OBTF_SYSTEM~CD_SYSTEM</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "PIDHSTMT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_HOST_PARAM";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_HOST_PARAM" : ""}; 

 var dataSrcLocationArray = new Array("BLK_HOST_PARAM"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside PIDHSTMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside PIDHSTMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_HOST_PARAM__HOST_CODE";
pkFields[0] = "BLK_HOST_PARAM__HOST_CODE";
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
var lovInfoFlds = {"BLK_HOST_PARAM__ACCOUNTING_SYSTEM_CODE__LOV_EXT_SYSTEM":["BLK_HOST_PARAM__ACCOUNTING_SYSTEM_CODE~~","","N~N",""],"BLK_HOST_PARAM__ELCM_SYSTEM__LOV_EXT_SYSTEM":["BLK_HOST_PARAM__ELCM_SYSTEM~~","","N~N",""],"BLK_HOST_PARAM__GL_SYSTEM_CODE__LOV_EXT_SYSTEM":["BLK_HOST_PARAM__GL_SYSTEM_CODE~~","","N~N",""],"BLK_HOST_PARAM__HOST_CODE__LOV_HOST_CODE":["BLK_HOST_PARAM__HOST_CODE~BLK_HOST_PARAM__HOST_DESCRIPTION~","","N~N",""],"BLK_HOST_PARAM__UBS_SYSTEM__LOV_EXT_SYSTEM":["BLK_HOST_PARAM__UBS_SYSTEM~~","","N~N",""],"BLK_HOST_PARAM__PAYMENT_SYSTEM__LOV_EXT_SYSTEM":["BLK_HOST_PARAM__PAYMENT_SYSTEM~~","","N~N",""],"BLK_HOST_PARAM__BLOCKCHAIN_CODE__LOV_EXT_SYSTEM":["~~","","N~N",""],"BLK_HOST_PARAM__OBTF_SYSTEM__LOV_EXT_SYSTEM":["BLK_HOST_PARAM__OBTF_SYSTEM~~","","N~N",""],"BLK_HOST_PARAM__CD_SYSTEM__LOV_EXT_SYSTEM":["BLK_HOST_PARAM__CD_SYSTEM~~","","N~N",""]};
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

ArrFuncOrigin["PIDHSTMT"]="KERNEL";
ArrPrntFunc["PIDHSTMT"]="";
ArrPrntOrigin["PIDHSTMT"]="";
ArrRoutingType["PIDHSTMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["PIDHSTMT"]="N";
ArrCustomModified["PIDHSTMT"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------