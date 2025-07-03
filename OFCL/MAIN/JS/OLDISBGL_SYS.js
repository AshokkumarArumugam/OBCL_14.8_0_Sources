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
**  File Name          : OLDISBGL_SYS.js
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
var fieldNameArray = {"BLK_OLTMS_EXTSYS_ISBGL":"EXTERNAL_SYSTEM~FUNCTION_ID~GL_CODE~MODULE_ID~PRODUCT_CODE~TXN_BRANCH~TXN_CCY~EXTSYSDESC~ISBGLDESC~PRODUCTDESC~TXNBRNDESC~MODULEDESC~CCYDESC~FUNCTIONIDDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_EXTSYS_ISBGL">EXTERNAL_SYSTEM~FUNCTION_ID~GL_CODE~MODULE_ID~PRODUCT_CODE~TXN_BRANCH~TXN_CCY~EXTSYSDESC~ISBGLDESC~PRODUCTDESC~TXNBRNDESC~MODULEDESC~CCYDESC~FUNCTIONIDDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_EXTSYS_ISBGL">AUTHSTAT~TXNSTAT~EXTERNAL_SYSTEM~FUNCTION_ID~GL_CODE~MODULE_ID~PRODUCT_CODE~TXN_BRANCH~TXN_CCY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDISBGL";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTMS_EXTSYS_ISBGL";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTMS_EXTSYS_ISBGL" : ""}; 

 var dataSrcLocationArray = new Array("BLK_OLTMS_EXTSYS_ISBGL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDISBGL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDISBGL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTMS_EXTSYS_ISBGL__EXTERNAL_SYSTEM";
pkFields[0] = "BLK_OLTMS_EXTSYS_ISBGL__EXTERNAL_SYSTEM";
queryFields[1] = "BLK_OLTMS_EXTSYS_ISBGL__TXN_CCY";
pkFields[1] = "BLK_OLTMS_EXTSYS_ISBGL__TXN_CCY";
queryFields[2] = "BLK_OLTMS_EXTSYS_ISBGL__PRODUCT_CODE";
pkFields[2] = "BLK_OLTMS_EXTSYS_ISBGL__PRODUCT_CODE";
queryFields[3] = "BLK_OLTMS_EXTSYS_ISBGL__TXN_BRANCH";
pkFields[3] = "BLK_OLTMS_EXTSYS_ISBGL__TXN_BRANCH";
queryFields[4] = "BLK_OLTMS_EXTSYS_ISBGL__FUNCTION_ID";
pkFields[4] = "BLK_OLTMS_EXTSYS_ISBGL__FUNCTION_ID";
queryFields[5] = "BLK_OLTMS_EXTSYS_ISBGL__MODULE_ID";
pkFields[5] = "BLK_OLTMS_EXTSYS_ISBGL__MODULE_ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTMS_EXTSYS_ISBGL":["GL_CODE"]};
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
var lovInfoFlds = {"BLK_OLTMS_EXTSYS_ISBGL__EXTERNAL_SYSTEM__LOV_EXTSYS":["BLK_OLTMS_EXTSYS_ISBGL__EXTERNAL_SYSTEM~BLK_OLTMS_EXTSYS_ISBGL__EXTSYSDESC~","","N~N",""],"BLK_OLTMS_EXTSYS_ISBGL__FUNCTION_ID__LOV_FUNCTIONID":["BLK_OLTMS_EXTSYS_ISBGL__FUNCTION_ID~BLK_OLTMS_EXTSYS_ISBGL__FUNCTIONIDDESC~","","N~N",""],"BLK_OLTMS_EXTSYS_ISBGL__GL_CODE__LOV_ISBGL":["BLK_OLTMS_EXTSYS_ISBGL__GL_CODE~BLK_OLTMS_EXTSYS_ISBGL__ISBGLDESC~","","N~N",""],"BLK_OLTMS_EXTSYS_ISBGL__MODULE_ID__LOV_MODULEID":["BLK_OLTMS_EXTSYS_ISBGL__MODULE_ID~BLK_OLTMS_EXTSYS_ISBGL__MODULEDESC~","","N~N",""],"BLK_OLTMS_EXTSYS_ISBGL__PRODUCT_CODE__LOV_PRODUCTCODE":["BLK_OLTMS_EXTSYS_ISBGL__PRODUCT_CODE~BLK_OLTMS_EXTSYS_ISBGL__PRODUCTDESC~","","N~N",""],"BLK_OLTMS_EXTSYS_ISBGL__TXN_BRANCH__LOV_TXNBRN":["BLK_OLTMS_EXTSYS_ISBGL__TXN_BRANCH~BLK_OLTMS_EXTSYS_ISBGL__TXNBRNDESC~","","N~N",""],"BLK_OLTMS_EXTSYS_ISBGL__TXN_CCY__LOV_CCY":["BLK_OLTMS_EXTSYS_ISBGL__TXN_CCY~BLK_OLTMS_EXTSYS_ISBGL__CCYDESC~","","N~N",""]};
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

ArrFuncOrigin["OLDISBGL"]="KERNEL";
ArrPrntFunc["OLDISBGL"]="";
ArrPrntOrigin["OLDISBGL"]="";
ArrRoutingType["OLDISBGL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDISBGL"]="N";
ArrCustomModified["OLDISBGL"]="N";

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