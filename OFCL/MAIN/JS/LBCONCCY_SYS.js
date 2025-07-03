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
**  File Name          : LBCONCCY_SYS.js
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
var fieldNameArray = {"BLK_LBTBS_BORROWER_CCY":"CONTRACTREFNO~CURRENCY~VERSIONNO~TXTPRODUCTCODE~TXTPRDCTDESC~TXTPRDCTTYPEDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTNAME~TXTFACILITYNAME","BLK_LBTBS_BORROWER_CCY_A":"INTRATEFIXDAYS~CONTRACTREFNUM~NOTCDAYS~EXCHRATEFIXTIME~CCYDESC~CCY~VERSIONNUM~NOTCTIME~EXCHRATEFIXDAYS~CANCNOTCDAYS~BLOCKCCY~EXCH_TIME_DUMMY~NOTC_TIME_DUMMY","BLK_BORROWER_EXRATE_CCY":"DDCCY~CCY~CONTRACTREFNO~VERSION~CCYDESC","BLK_BORROWER_INTRATE_CCY":"VERSIONNO~CONTRACTREF~CCY~DDCCY~CCYDESC","BLK_BORROWER_NOTC_CCY":"CONTRACTREF~CCY~DDCCY~VERSIONNO~CCYDESCR"};

var multipleEntryPageSize = {"BLK_LBTBS_BORROWER_CCY_A" :"15" ,"BLK_BORROWER_EXRATE_CCY" :"15" ,"BLK_BORROWER_INTRATE_CCY" :"15" ,"BLK_BORROWER_NOTC_CCY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_BORROWERDTLS__TAB_MAIN":"BLK_LBTBS_BORROWER_CCY_A~BLK_BORROWER_EXRATE_CCY~BLK_BORROWER_INTRATE_CCY~BLK_BORROWER_NOTC_CCY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTBS_BORROWER_CCY">CONTRACTREFNO~CURRENCY~VERSIONNO~TXTPRODUCTCODE~TXTPRDCTDESC~TXTPRDCTTYPEDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTNAME~TXTFACILITYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_BORROWER_CCY" RELATION_TYPE="N" TYPE="BLK_LBTBS_BORROWER_CCY_A">INTRATEFIXDAYS~CONTRACTREFNUM~NOTCDAYS~EXCHRATEFIXTIME~CCYDESC~CCY~VERSIONNUM~NOTCTIME~EXCHRATEFIXDAYS~CANCNOTCDAYS~BLOCKCCY~EXCH_TIME_DUMMY~NOTC_TIME_DUMMY</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_BORROWER_CCY" RELATION_TYPE="N" TYPE="BLK_BORROWER_EXRATE_CCY">DDCCY~CCY~CONTRACTREFNO~VERSION~CCYDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_BORROWER_CCY" RELATION_TYPE="N" TYPE="BLK_BORROWER_INTRATE_CCY">VERSIONNO~CONTRACTREF~CCY~DDCCY~CCYDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_BORROWER_CCY" RELATION_TYPE="N" TYPE="BLK_BORROWER_NOTC_CCY">CONTRACTREF~CCY~DDCCY~VERSIONNO~CCYDESCR</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_BORROWERDTLS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBTBS_BORROWER_CCY" : "","BLK_LBTBS_BORROWER_CCY_A" : "BLK_LBTBS_BORROWER_CCY~N","BLK_BORROWER_EXRATE_CCY" : "BLK_LBTBS_BORROWER_CCY~N","BLK_BORROWER_INTRATE_CCY" : "BLK_LBTBS_BORROWER_CCY~N","BLK_BORROWER_NOTC_CCY" : "BLK_LBTBS_BORROWER_CCY~N"}; 

 var dataSrcLocationArray = new Array("BLK_LBTBS_BORROWER_CCY","BLK_LBTBS_BORROWER_CCY_A","BLK_BORROWER_EXRATE_CCY","BLK_BORROWER_INTRATE_CCY","BLK_BORROWER_NOTC_CCY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCONCCY.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCONCCY.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBTBS_BORROWER_CCY__VERSIONNO";
pkFields[0] = "BLK_LBTBS_BORROWER_CCY__VERSIONNO";
queryFields[1] = "BLK_LBTBS_BORROWER_CCY__CONTRACTREFNO";
pkFields[1] = "BLK_LBTBS_BORROWER_CCY__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LBTBS_BORROWER_CCY_A":["BLOCKCCY"]};
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
var lovInfoFlds = {"BLK_LBTBS_BORROWER_CCY_A__CCY__LOV_PROD_CCY":["BLK_LBTBS_BORROWER_CCY_A__CCY~BLK_LBTBS_BORROWER_CCY_A__CCYDESC~","BLK_LBTBS_BORROWER_CCY__CONTRACTREFNO!VARCHAR2~BLK_LBTBS_BORROWER_CCY__CONTRACTREFNO!VARCHAR2~BLK_LBTBS_BORROWER_CCY__VERSIONNO!NUMBER~BLK_LBTBS_BORROWER_CCY_A__CONTRACTREFNUM!VARCHAR2~BLK_LBTBS_BORROWER_CCY_A__VERSIONNUM!NUMBER","N~N",""],"BLK_BORROWER_EXRATE_CCY__CCY__LOV_DETAIL_CCY":["BLK_BORROWER_EXRATE_CCY__CCY~BLK_BORROWER_EXRATE_CCY__CCYDESC~","","N~N",""],"BLK_BORROWER_INTRATE_CCY__CCY__LOV_DETAIL_CCY":["BLK_BORROWER_EXRATE_CCY__CCY~BLK_BORROWER_EXRATE_CCY__CCYDESC~","","N~N",""],"BLK_BORROWER_NOTC_CCY__CCY__LOV_DETAIL_CCY":["BLK_BORROWER_NOTC_CCY__CCY~BLK_BORROWER_NOTC_CCY__CCYDESCR~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_BORROWER_CCY_A","BLK_BORROWER_EXRATE_CCY","BLK_BORROWER_INTRATE_CCY","BLK_BORROWER_NOTC_CCY");
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

ArrFuncOrigin["LBCONCCY"]="KERNEL";
ArrPrntFunc["LBCONCCY"]="";
ArrPrntOrigin["LBCONCCY"]="";
ArrRoutingType["LBCONCCY"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCONCCY"]="N";
ArrCustomModified["LBCONCCY"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_BORROWERDTLS":"CONTRACTREFNO~VERSIONNO~CURRENCY"};
var scrArgSource = {};
var scrArgVals = {"CVS_BORROWERDTLS":"~~"};
var scrArgDest = {"CVS_BORROWERDTLS":"BLK_LBTBS_BORROWER_CCY__CONTRACTREFNO~BLK_LBTBS_BORROWER_CCY__VERSIONNO~BLK_LBTBS_BORROWER_CCY__CURRENCY"};
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