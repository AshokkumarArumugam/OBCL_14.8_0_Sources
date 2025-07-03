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
**  File Name          : BKDASSOC_SYS.js
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
var fieldNameArray = {"BLK_BKTMS_ASSOC":"BROKER~PRODUCT~RULE~CCY1~CCY2~PRODUCT_DESCRIPTION~BROKER_DESCRIPTION~RULE_DESCRIPTION~CCY_DESCRIPTION~CCY2_DESCRIPTION~CURRENCY~SLAB_BASIS~APPLY_TENOR_DISCOUNT~TENOR_BASED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BKTMS_ASSOC">BROKER~PRODUCT~RULE~CCY1~CCY2~PRODUCT_DESCRIPTION~BROKER_DESCRIPTION~RULE_DESCRIPTION~CCY_DESCRIPTION~CCY2_DESCRIPTION~CURRENCY~SLAB_BASIS~APPLY_TENOR_DISCOUNT~TENOR_BASED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BKTMS_ASSOC">AUTHSTAT~TXNSTAT~BROKER~PRODUCT~CCY1~CCY2~RULE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "BKDASSOC";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_BKTMS_ASSOC";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BKTMS_ASSOC" : ""}; 

 var dataSrcLocationArray = new Array("BLK_BKTMS_ASSOC"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside BKDASSOC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside BKDASSOC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BKTMS_ASSOC__BROKER";
pkFields[0] = "BLK_BKTMS_ASSOC__BROKER";
queryFields[1] = "BLK_BKTMS_ASSOC__PRODUCT";
pkFields[1] = "BLK_BKTMS_ASSOC__PRODUCT";
queryFields[2] = "BLK_BKTMS_ASSOC__CCY1";
pkFields[2] = "BLK_BKTMS_ASSOC__CCY1";
queryFields[3] = "BLK_BKTMS_ASSOC__CCY2";
pkFields[3] = "BLK_BKTMS_ASSOC__CCY2";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BKTMS_ASSOC":["CURRENCY","RULE"]};
//***** Fields Amendable while Close *****
var closeAmendArr = {"BLK_BKTMS_ASSOC":["PRODUCT"]};
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_BKTMS_ASSOC":["BROKER","CCY1","CCY2","CURRENCY","PRODUCT"]};
//***** Fields Amendable while Authorize *****
var authorizeAmenArr = {"BLK_BKTMS_ASSOC":["RULE"]};
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_BKTMS_ASSOC__BROKER__LOV_BROKER":["BLK_BKTMS_ASSOC__BROKER~BLK_BKTMS_ASSOC__BROKER_DESCRIPTION~","","N~N",""],"BLK_BKTMS_ASSOC__PRODUCT__LOV_PRODUCT":["BLK_BKTMS_ASSOC__PRODUCT~BLK_BKTMS_ASSOC__PRODUCT_DESCRIPTION~","","N~N",""],"BLK_BKTMS_ASSOC__RULE__LOV_RULE":["BLK_BKTMS_ASSOC__RULE~BLK_BKTMS_ASSOC__RULE_DESCRIPTION~BLK_BKTMS_ASSOC__SLAB_BASIS~BLK_BKTMS_ASSOC__APPLY_TENOR_DISCOUNT~BLK_BKTMS_ASSOC__TENOR_BASED~","","N~N",""],"BLK_BKTMS_ASSOC__CCY1__LOV_CCY1":["BLK_BKTMS_ASSOC__CCY1~BLK_BKTMS_ASSOC__CCY_DESCRIPTION~","","N~N",""],"BLK_BKTMS_ASSOC__CCY2__LOV_CCY2":["BLK_BKTMS_ASSOC__CCY2~BLK_BKTMS_ASSOC__CCY2_DESCRIPTION~","","N~N",""]};
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

 var CallFormArray= new Array("CSCFNUDF~BLK_BKTMS_ASSOC"); 

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

ArrFuncOrigin["BKDASSOC"]="KERNEL";
ArrPrntFunc["BKDASSOC"]="";
ArrPrntOrigin["BKDASSOC"]="";
ArrRoutingType["BKDASSOC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["BKDASSOC"]="N";
ArrCustomModified["BKDASSOC"]="N";

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