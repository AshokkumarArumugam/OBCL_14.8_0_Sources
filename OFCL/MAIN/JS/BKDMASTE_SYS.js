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
**  File Name          : BKDMASTE_SYS.js
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
var fieldNameArray = {"BLK_BKTMS_BRMASTER":"BROKER~NAME~STREET~CITY~COUNTRY~TAX_PAYABLE_ACCT~TAX_EXP_ACCT~LIQ_TXN_CODE~TAX_SCHEME~TAX_PAYABLE_TXNCODE~TAX_EXP_TXNCODE~PAYABLE_CCY~BROK_PAYABLE_GL~BROK_EXP_GL~DISC_MIS_GROUP~LIQD_MIS_GROUP~VOL_DISC_TXNCODE~LIQ_DESC~TAX_EXP_CODE_DESC~TXN_CODE_DESCRIPTION~BROK_EXP_GL_DESC~BROK_PAYABLE_DESC~VOLUME_DESC~BOOKING_METHOD~CCYDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BKTMS_BRMASTER">BROKER~NAME~STREET~CITY~COUNTRY~TAX_PAYABLE_ACCT~TAX_EXP_ACCT~LIQ_TXN_CODE~TAX_SCHEME~TAX_PAYABLE_TXNCODE~TAX_EXP_TXNCODE~PAYABLE_CCY~BROK_PAYABLE_GL~BROK_EXP_GL~DISC_MIS_GROUP~LIQD_MIS_GROUP~VOL_DISC_TXNCODE~LIQ_DESC~TAX_EXP_CODE_DESC~TXN_CODE_DESCRIPTION~BROK_EXP_GL_DESC~BROK_PAYABLE_DESC~VOLUME_DESC~BOOKING_METHOD~CCYDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_BKTMS_BRMASTER" RELATION_TYPE="1" TYPE="BLK_SUMMARY">AUTHSTAT~TXNSTAT~BROKER~NAME~CITY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "BKDMASTE";
var defaultWhereClause = "(SMPKS_MASK_USER.pr_setusrctx(global.user_id,'BKSMASTE') IN ('N','Y'))";
var defaultOrderByClause ="";
var multiBrnWhereClause ="(SMPKS_MASK_USER.pr_setusrctx(global.user_id,'BKSMASTE') IN ('N','Y'))";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BKTMS_BRMASTER" : ""}; 

 var dataSrcLocationArray = new Array("BLK_BKTMS_BRMASTER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside BKDMASTE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside BKDMASTE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BKTMS_BRMASTER__BROKER";
pkFields[0] = "BLK_BKTMS_BRMASTER__BROKER";
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
var lovInfoFlds = {"BLK_BKTMS_BRMASTER__BROKER__LOV_BROKER":["BLK_BKTMS_BRMASTER__BROKER~BLK_BKTMS_BRMASTER__NAME~BLK_BKTMS_BRMASTER__STREET~BLK_BKTMS_BRMASTER__CITY~BLK_BKTMS_BRMASTER__COUNTRY~","","N~N~N~N~N",""],"BLK_BKTMS_BRMASTER__TAX_PAYABLE_ACCT__LOV_TAX_PAYABLE_ACCT":["BLK_BKTMS_BRMASTER__TAX_PAYABLE_ACCT~BLK_BKTMS_BRMASTER__TAX_PAYABLE_ACNT_DESC~","","N~N",""],"BLK_BKTMS_BRMASTER__TAX_EXP_ACCT__LOV_TAX_EXP_ACCT":["BLK_BKTMS_BRMASTER__TAX_EXP_ACCT~BLK_BKTMS_BRMASTER__TAX_EXPACNT_DESC~","","N~N",""],"BLK_BKTMS_BRMASTER__LIQ_TXN_CODE__LOV_TXNCODELIQ":["BLK_BKTMS_BRMASTER__LIQ_TXN_CODE~BLK_BKTMS_BRMASTER__LIQ_DESC~","","N~N",""],"BLK_BKTMS_BRMASTER__TAX_SCHEME__LOV_TATMSCHEME":["BLK_BKTMS_BRMASTER__TAX_SCHEME~","","N",""],"BLK_BKTMS_BRMASTER__TAX_PAYABLE_TXNCODE__LOV_TXNCODEPAY":["BLK_BKTMS_BRMASTER__TAX_PAYABLE_TXNCODE~BLK_BKTMS_BRMASTER__TAX_PAYABLE_ACNT_DESC~","","N~N",""],"BLK_BKTMS_BRMASTER__TAX_EXP_TXNCODE__LOV_TXNCODEPAID":["BLK_BKTMS_BRMASTER__TAX_EXP_TXNCODE~BLK_BKTMS_BRMASTER__TAX_EXP_CODE_DESC~","","N~N",""],"BLK_BKTMS_BRMASTER__PAYABLE_CCY__LOV_CCY":["BLK_BKTMS_BRMASTER__PAYABLE_CCY~BLK_BKTMS_BRMASTER__CCYDESC~","","N~N",""],"BLK_BKTMS_BRMASTER__BROK_PAYABLE_GL__LOV_TAX_PAYABLE_ACCT":["BLK_BKTMS_BRMASTER__BROK_PAYABLE_GL~BLK_BKTMS_BRMASTER__BROK_PAYABLE_DESC~","","N~N",""],"BLK_BKTMS_BRMASTER__BROK_EXP_GL__LOV_TAX_EXP_ACCT":["BLK_BKTMS_BRMASTER__BROK_EXP_GL~BLK_BKTMS_BRMASTER__TXN_CODE_DESCRIPTION~","","N~N",""],"BLK_BKTMS_BRMASTER__DISC_MIS_GROUP__LOV_MIS":["BLK_BKTMS_BRMASTER__DISC_MIS_GROUP~BLK_BKTMS_BRMASTER__GROUP_DESC~","","N~N",""],"BLK_BKTMS_BRMASTER__LIQD_MIS_GROUP__LOV_MIS":["BLK_BKTMS_BRMASTER__LIQD_MIS_GROUP~BLK_BKTMS_BRMASTER__MIS_LIQ_DESC~","","N~N",""],"BLK_BKTMS_BRMASTER__VOL_DISC_TXNCODE__LOV_TXNCODEPAY":["BLK_BKTMS_BRMASTER__VOL_DISC_TXNCODE~BLK_BKTMS_BRMASTER__VOLUME_DESC~","","N~N",""]};
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

 var CallFormArray= new Array("CSCFNUDF~BLK_BKTMS_BRMASTER"); 

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

ArrFuncOrigin["BKDMASTE"]="KERNEL";
ArrPrntFunc["BKDMASTE"]="";
ArrPrntOrigin["BKDMASTE"]="";
ArrRoutingType["BKDMASTE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["BKDMASTE"]="N";
ArrCustomModified["BKDMASTE"]="N";

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