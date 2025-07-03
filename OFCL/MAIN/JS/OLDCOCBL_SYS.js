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
**  File Name          : OLDCOCBL_SYS.js
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
var fieldNameArray = {"BLK_HEADER":"EFFECTIVEDATE~RAPIDID","BLK_CONTRACT_DETAILS":"CONTRACTREFNO~EFFECTIVEDATE~CONTRACTCCY~CARRYINGCASEPERCENT~WRITEOFFCASEPERCENT~CARRYINGCASEAMOUNT~WRITEOFFCASEAMOUNT~FUNDED~UNFUNDED~GROSS~CONTRA~FAS91FEE~WRITEOFF~MARKS~FAS114RESERVEUNFUNDED~FAS114RESERVEFUNDED~FAS114RESERVE~TOTALREQDWRITEOFF~MAXWRITEOFFAMOUNT~TOTALREQDFAS114~NETFUNDEDEXWRITEOFF~NETFUNDEDEXMARKS~NETFUNDED~ENDINGCONTRA~ENDINGWRITEOFF~ENDINGMARKS~ENDINGFAS114RESERVE~ENDINGFAS114RESERVEFUNDED~ENDINGFAS114RESERVEUNFUNDED~CURRACTIONWRITEOFF~CURRACTIONMARKS~CURRACTIONRESERVE~CURRACTION_RESFUNDED~CURR_ACTIONRESUNFUNDED~RECOVERYPERCENT~CONTRAPERCENT~WRITEOFFPERCENT~WRITEOFFREBALANCEPERCENT~CONTRAREBALANCEPERCENT~NETRESERVEBUILDPERCENT~NETRESERVERELEASEPERCENT~FUNDEDRESREBALANCEPERCENT~COCVALUATIONSTATUS~ERRORCODE~RELEASEOFFSET~STANDALONERELEASE~SUB_TOTAL_FUND_UI~NET_CARRING_VAL_UI~TXT_UNFUNDED_BUILD_UI~TXT_UNFUNDED_RELEASE_UI~TOTAL_PL_UI","BLK_SUMM_BAL_SHEET":"LOANCCY~CMTMNTCCYPRINCIPALOS~CMTMNTCCYENDINGCONTRA~CMTMNTCCYENDINGWRITEOFF~CMTMNTCCYENDINGRESERVE~SUB_TOTAL_UI~NET_CARRYING_VAL_UI~COMMITMENTREFNO~LOANREFNO~EFFECTIVEDATE","BLK_SUMM_PNL":"LOANCCY~CMTMNTCCYFAS114RESRELEASE~CMTMNTCCYCURRACTIONWOFF~CMTMNTCCYCURRACTIONRECO~CMTMNTCCYCURRACTIONCONTRA~TOTAL_PL_UI~COMMITMENTREFNO~LOANREFNO~EFFECTIVEDATE~CMTMNTCCYFAS114RESBUILD","BLK_SUMM_BAL_SHEET_HEADER":"COMMITMENT_REF_NO_UI~CONTRACTCCY"};

var multipleEntryPageSize = {"BLK_CONTRACT_DETAILS" :"15" ,"BLK_SUMM_BAL_SHEET" :"15" ,"BLK_SUMM_PNL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_CONTRACT_DETAILS","CVS_SUMM_BAL__TAB_MAIN":"BLK_SUMM_BAL_SHEET","CVS_SUMM_BAL__TAB_PNL":"BLK_SUMM_PNL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HEADER">EFFECTIVEDATE~RAPIDID</FN>'; 
msgxml += '      <FN PARENT="BLK_HEADER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_DETAILS">CONTRACTREFNO~EFFECTIVEDATE~CONTRACTCCY~CARRYINGCASEPERCENT~WRITEOFFCASEPERCENT~CARRYINGCASEAMOUNT~WRITEOFFCASEAMOUNT~FUNDED~UNFUNDED~GROSS~CONTRA~FAS91FEE~WRITEOFF~MARKS~FAS114RESERVEUNFUNDED~FAS114RESERVEFUNDED~FAS114RESERVE~TOTALREQDWRITEOFF~MAXWRITEOFFAMOUNT~TOTALREQDFAS114~NETFUNDEDEXWRITEOFF~NETFUNDEDEXMARKS~NETFUNDED~ENDINGCONTRA~ENDINGWRITEOFF~ENDINGMARKS~ENDINGFAS114RESERVE~ENDINGFAS114RESERVEFUNDED~ENDINGFAS114RESERVEUNFUNDED~CURRACTIONWRITEOFF~CURRACTIONMARKS~CURRACTIONRESERVE~CURRACTION_RESFUNDED~CURR_ACTIONRESUNFUNDED~RECOVERYPERCENT~CONTRAPERCENT~WRITEOFFPERCENT~WRITEOFFREBALANCEPERCENT~CONTRAREBALANCEPERCENT~NETRESERVEBUILDPERCENT~NETRESERVERELEASEPERCENT~FUNDEDRESREBALANCEPERCENT~COCVALUATIONSTATUS~ERRORCODE~RELEASEOFFSET~STANDALONERELEASE~SUB_TOTAL_FUND_UI~NET_CARRING_VAL_UI~TXT_UNFUNDED_BUILD_UI~TXT_UNFUNDED_RELEASE_UI~TOTAL_PL_UI</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_DETAILS" RELATION_TYPE="N" TYPE="BLK_SUMM_BAL_SHEET">LOANCCY~CMTMNTCCYPRINCIPALOS~CMTMNTCCYENDINGCONTRA~CMTMNTCCYENDINGWRITEOFF~CMTMNTCCYENDINGRESERVE~SUB_TOTAL_UI~NET_CARRYING_VAL_UI~COMMITMENTREFNO~LOANREFNO~EFFECTIVEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_DETAILS" RELATION_TYPE="N" TYPE="BLK_SUMM_PNL">LOANCCY~CMTMNTCCYFAS114RESRELEASE~CMTMNTCCYCURRACTIONWOFF~CMTMNTCCYCURRACTIONRECO~CMTMNTCCYCURRACTIONCONTRA~TOTAL_PL_UI~COMMITMENTREFNO~LOANREFNO~EFFECTIVEDATE~CMTMNTCCYFAS114RESBUILD</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_DETAILS" RELATION_TYPE="1" TYPE="BLK_SUMM_BAL_SHEET_HEADER">COMMITMENT_REF_NO_UI~CONTRACTCCY</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_HEADER" : "","BLK_CONTRACT_DETAILS" : "BLK_HEADER~N","BLK_SUMM_BAL_SHEET" : "BLK_CONTRACT_DETAILS~N","BLK_SUMM_PNL" : "BLK_CONTRACT_DETAILS~N","BLK_SUMM_BAL_SHEET_HEADER" : "BLK_CONTRACT_DETAILS~1"}; 

 var dataSrcLocationArray = new Array("BLK_HEADER","BLK_CONTRACT_DETAILS","BLK_SUMM_BAL_SHEET","BLK_SUMM_PNL","BLK_SUMM_BAL_SHEET_HEADER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCOCBL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCOCBL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_HEADER__EFFECTIVEDATE";
pkFields[0] = "BLK_HEADER__EFFECTIVEDATE";
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
var lovInfoFlds = {"BLK_HEADER__EFFECTIVEDATE__LOV_EFFECTIVE_DATE":["BLK_HEADER__EFFECTIVEDATE~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_DETAILS","BLK_SUMM_BAL_SHEET","BLK_SUMM_PNL");
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

ArrFuncOrigin["OLDCOCBL"]="KERNEL";
ArrPrntFunc["OLDCOCBL"]="";
ArrPrntOrigin["OLDCOCBL"]="";
ArrRoutingType["OLDCOCBL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCOCBL"]="N";
ArrCustomModified["OLDCOCBL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_SUMM_BAL":"COMMITREF"};
var scrArgSource = {"CVS_SUMM_BAL":"BLK_CONTRACT_DETAILS__CONTRACTREFNO"};
var scrArgVals = {"CVS_SUMM_BAL":""};
var scrArgDest = {"CVS_SUMM_BAL":"BLK_SUMM_BAL_SHEET_HEADER__COMMITMENT_REF_NO_UI"};
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