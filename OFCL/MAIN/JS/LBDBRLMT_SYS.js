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
**  File Name          : LBDBRLMT_SYS.js
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
var fieldNameArray = {"BLK_CONT_BRLMT_MAS":"MAS_FCCREF~MAS_CNPTY~MAS_FACNAME~MAS_PRD~MAS_PRDTYP~MAS_USRREF~MAS_VER~TXTPRDDESCMAS~TXTCUSTNAMEMAS~CONT_CURRENCY","BLK_BORR_PROD_LIMIT_MULTI":"TRANCHEREFNO~BORROWER~LIMITTYPE~PRODUCT~CCYCODE~LIMITAMT~AVAILAMT~TXTLMTTYPETXT","BLK_BORR_PROD_VDUTIL":"TRANCHEREFNO~DRAWDREFNO~UTILIZEDAMT~UTILDATE~VDUTIL_BORROWER"};

var multipleEntryPageSize = {"BLK_BORR_PROD_LIMIT_MULTI" :"15" ,"BLK_BORR_PROD_VDUTIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_BORR_PROD_LIMIT_MULTI~BLK_BORR_PROD_VDUTIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONT_BRLMT_MAS">MAS_FCCREF~MAS_CNPTY~MAS_FACNAME~MAS_PRD~MAS_PRDTYP~MAS_USRREF~MAS_VER~TXTPRDDESCMAS~TXTCUSTNAMEMAS~CONT_CURRENCY</FN>'; 
msgxml += '      <FN PARENT="BLK_CONT_BRLMT_MAS" RELATION_TYPE="N" TYPE="BLK_BORR_PROD_LIMIT_MULTI">TRANCHEREFNO~BORROWER~LIMITTYPE~PRODUCT~CCYCODE~LIMITAMT~AVAILAMT~TXTLMTTYPETXT</FN>'; 
msgxml += '      <FN PARENT="BLK_BORR_PROD_LIMIT_MULTI" RELATION_TYPE="N" TYPE="BLK_BORR_PROD_VDUTIL">TRANCHEREFNO~DRAWDREFNO~UTILIZEDAMT~UTILDATE~VDUTIL_BORROWER</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_CONT_BRLMT_MAS" RELATION_TYPE="1" TYPE="BLK_BORR_PROD_LIMIT_SUMMARY">MAS_FCCREF~MAS_CNPTY~CUSTNAME~MAS_PRD~BRANCH</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDBRLMT";
var defaultWhereClause = "BRANCH=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_BORR_PROD_LIMIT_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONT_BRLMT_MAS" : "","BLK_BORR_PROD_LIMIT_MULTI" : "BLK_CONT_BRLMT_MAS~N","BLK_BORR_PROD_VDUTIL" : "BLK_BORR_PROD_LIMIT_MULTI~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONT_BRLMT_MAS","BLK_BORR_PROD_LIMIT_MULTI","BLK_BORR_PROD_VDUTIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDBRLMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDBRLMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONT_BRLMT_MAS__MAS_FCCREF";
pkFields[0] = "BLK_CONT_BRLMT_MAS__MAS_FCCREF";
queryFields[1] = "BLK_CONT_BRLMT_MAS__MAS_VER";
pkFields[1] = "BLK_CONT_BRLMT_MAS__MAS_VER";
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
var lovInfoFlds = {"BLK_CONT_BRLMT_MAS__MAS_FCCREF__LOV_CONTRACT":["BLK_CONT_BRLMT_MAS__MAS_FCCREF~","","N",""],"BLK_BORR_PROD_LIMIT_SUMMARY__MAS_CNPTY__LOV_CUSTNAME_S":["BLK_BORR_PROD_LIMIT_SUMMARY__MAS_CNPTY~BLK_BORR_PROD_LIMIT_SUMMARY__CUSTNAME~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_BORR_PROD_LIMIT_MULTI","BLK_BORR_PROD_VDUTIL");
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

ArrFuncOrigin["LBDBRLMT"]="KERNEL";
ArrPrntFunc["LBDBRLMT"]="";
ArrPrntOrigin["LBDBRLMT"]="";
ArrRoutingType["LBDBRLMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDBRLMT"]="N";
ArrCustomModified["LBDBRLMT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"CONTREF~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_MAIN":"BLK_CONT_BRLMT_MAS__MAS_FCCREF~"};
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