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
**  File Name          : LBCENTTY_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_CENNTY":"CONREFNO~TXTPRODUCT~TXTPRODUCTDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTOMERNAME~TXTFACILITYN~LATESTVERSIONNO~TXTTRANCHEREFNO","BLK_LBTBS_CONTRACT_BORROWERS":"CUSTOMERNO~SSICOUNTERPARTY~CONTREFNO~VERSINO","BLK_LBTBS_BORR_SETTLE_CURR_DET":"CONTRAREFNO~VERNO~CUSTOMENO~SSICOUNTPARTY~CURRENCY~SSIMNEMO~SETTLEMENTSEQNO","BLK_LBTBS_BORROWER_ENTITIES":"CONTRACREFNO~VERSIONO~CUSTOMENO~ENTITY~DRAWDOWNNO~PRIMARY~TXTENTITYDESC"};

var multipleEntryPageSize = {"BLK_LBTBS_BORROWER_ENTITIES" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_ENTITYLB__TAB_MAIN":"BLK_LBTBS_BORROWER_ENTITIES"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_CENNTY">CONREFNO~TXTPRODUCT~TXTPRODUCTDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTOMERNAME~TXTFACILITYN~LATESTVERSIONNO~TXTTRANCHEREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_CENNTY" RELATION_TYPE="1" TYPE="BLK_LBTBS_CONTRACT_BORROWERS">CUSTOMERNO~SSICOUNTERPARTY~CONTREFNO~VERSINO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_CONTRACT_BORROWERS" RELATION_TYPE="1" TYPE="BLK_LBTBS_BORR_SETTLE_CURR_DET">CONTRAREFNO~VERNO~CUSTOMENO~SSICOUNTPARTY~CURRENCY~SSIMNEMO~SETTLEMENTSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_CONTRACT_BORROWERS" RELATION_TYPE="N" TYPE="BLK_LBTBS_BORROWER_ENTITIES">CONTRACREFNO~VERSIONO~CUSTOMENO~ENTITY~DRAWDOWNNO~PRIMARY~TXTENTITYDESC</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_ENTITYLB";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_CENNTY" : "","BLK_LBTBS_CONTRACT_BORROWERS" : "BLK_OLTBS_CONTRACT_CENNTY~1","BLK_LBTBS_BORR_SETTLE_CURR_DET" : "BLK_LBTBS_CONTRACT_BORROWERS~1","BLK_LBTBS_BORROWER_ENTITIES" : "BLK_LBTBS_CONTRACT_BORROWERS~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_CENNTY","BLK_LBTBS_CONTRACT_BORROWERS","BLK_LBTBS_BORR_SETTLE_CURR_DET","BLK_LBTBS_BORROWER_ENTITIES"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCENTTY.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCENTTY.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_CENNTY__CONREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_CENNTY__CONREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LBTBS_BORR_SETTLE_CURR_DET":["SSIMNEMO"]};
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
var lovInfoFlds = {"BLK_LBTBS_BORR_SETTLE_CURR_DET__SSIMNEMO__LOV_SSIMNEMONIC":["BLK_LBTBS_BORR_SETTLE_CURR_DET__SSIMNEMO~BLK_LBTBS_BORR_SETTLE_CURR_DET__SETTLEMENTSEQNO~~~~~~","BLK_LBTBS_CONTRACT_BORROWERS__SSICOUNTERPARTY!VARCHAR2~BLK_LBTBS_CONTRACT_BORROWERS__CUSTOMERNO!VARCHAR2~BLK_LBTBS_CONTRACT_BORROWERS__SSICOUNTERPARTY!VARCHAR2~BLK_LBTBS_CONTRACT_BORROWERS__CUSTOMERNO!VARCHAR2~BLK_OLTBS_CONTRACT_CENNTY__TXTPRODUCT!VARCHAR2~BLK_OLTBS_CONTRACT_CENNTY__TXTPRODUCT!VARCHAR2~BLK_LBTBS_BORR_SETTLE_CURR_DET__CURRENCY!VARCHAR2~BLK_OLTBS_CONTRACT_CENNTY__TXTPRODUCT!VARCHAR2","N~N~N~N~N~N~N",""],"BLK_LBTBS_BORROWER_ENTITIES__ENTITY__LOV_ENTITY":["BLK_LBTBS_BORROWER_ENTITIES__ENTITY~BLK_LBTBS_BORROWER_ENTITIES__TXTENTITYDESC~~~~~","BLK_OLTBS_CONTRACT_CENNTY__TXTCUSTOMER!VARCHAR2~BLK_OLTBS_CONTRACT_CENNTY__CONREFNO!VARCHAR2~BLK_OLTBS_CONTRACT_CENNTY__TXTCUSTOMER!VARCHAR2~BLK_OLTBS_CONTRACT_CENNTY__CONREFNO!VARCHAR2~BLK_OLTBS_CONTRACT_CENNTY__LATESTVERSIONNO!VARCHAR2~BLK_OLTBS_CONTRACT_CENNTY__TXTCUSTOMER!VARCHAR2~BLK_LBTBS_BORROWER_ENTITIES__DRAWDOWNNO!VARCHAR2","N~N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_BORROWER_ENTITIES");
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

ArrFuncOrigin["LBCENTTY"]="KERNEL";
ArrPrntFunc["LBCENTTY"]="";
ArrPrntOrigin["LBCENTTY"]="";
ArrRoutingType["LBCENTTY"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCENTTY"]="N";
ArrCustomModified["LBCENTTY"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ENTITYLB":"CONTRACTREFNO~VERSIONNO~TRANCHREFNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_ENTITYLB":"~~"};
var scrArgDest = {"CVS_ENTITYLB":"BLK_OLTBS_CONTRACT_CENNTY__CONREFNO~BLK_OLTBS_CONTRACT_CENNTY__LATESTVERSIONNO~BLK_OLTBS_CONTRACT_CENNTY__TXTTRANCHEREFNO"};
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