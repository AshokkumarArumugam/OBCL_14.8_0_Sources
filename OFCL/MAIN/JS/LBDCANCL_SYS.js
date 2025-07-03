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
**  File Name          : LBDCANCL_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT_TC":"CONTRACTREFNO~USERREFNO~PRDCODE~TXTPRDDESC~PRDTYPE~TXTPRDTYPE~COUNTERPARTY~TXTLB_PRDTYPE~TXTCUSTNAME~TXTCURRESN~TXTLATESTESN~CONTRACT_CCY","BLK_TRANCHE_CANC":"CONTREFNO~EVTSEQNO~VALUEDATE~AMOUNTTYPE~CANCPERCENT~CANCAMOUNT","BLK_AUDIT":"CONREFNO~MODULE~ENTSEQNO~EVENTDATE~EVENTCODE~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~NEWVERINDCT~CONTSTATUS~AUTHSTATUS"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT_TC">CONTRACTREFNO~USERREFNO~PRDCODE~TXTPRDDESC~PRDTYPE~TXTPRDTYPE~COUNTERPARTY~TXTLB_PRDTYPE~TXTCUSTNAME~TXTCURRESN~TXTLATESTESN~CONTRACT_CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_TC" RELATION_TYPE="1" TYPE="BLK_TRANCHE_CANC">CONTREFNO~EVTSEQNO~VALUEDATE~AMOUNTTYPE~CANCPERCENT~CANCAMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_TRANCHE_CANC" RELATION_TYPE="1" TYPE="BLK_AUDIT">CONREFNO~MODULE~ENTSEQNO~EVENTDATE~EVENTCODE~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~NEWVERINDCT~CONTSTATUS~AUTHSTATUS</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_CONTRACT_TC" RELATION_TYPE="1" TYPE="BLK_TRANCHE_CANC_SUMMARY">AUTHSTATUS~CONTRACTSTATUS~CONTRACTREFNO~VALUEDATE~CANCAMOUNT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDCANCL";
var defaultWhereClause = "BRANCH=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TRANCHE_CANC_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT_TC" : "","BLK_TRANCHE_CANC" : "BLK_CONTRACT_TC~1","BLK_AUDIT" : "BLK_TRANCHE_CANC~1"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT_TC","BLK_TRANCHE_CANC","BLK_AUDIT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDCANCL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDCANCL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT_TC__CONTRACTREFNO";
pkFields[0] = "BLK_CONTRACT_TC__CONTRACTREFNO";
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
var lovInfoFlds = {"BLK_CONTRACT_TC__CONTRACTREFNO__LOV_CONTRACT":["BLK_CONTRACT_TC__CONTRACTREFNO~BLK_CONTRACT_TC__PRDCODE~BLK_CONTRACT_TC__USERREFNO~BLK_CONTRACT_TC__PRDTYPE~BLK_CONTRACT_TC__COUNTERPARTY~BLK_CONTRACT_TC__TXTPRDDESC~BLK_CONTRACT_TC__TXTCUSTNAME~BLK_CONTRACT_TC__TXTPRDTYPE~BLK_CONTRACT_TC__CONTRACT_CCY~","","N~N~N~N~N~N~N~N~N",""]};
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

ArrFuncOrigin["LBDCANCL"]="KERNEL";
ArrPrntFunc["LBDCANCL"]="";
ArrPrntOrigin["LBDCANCL"]="";
ArrRoutingType["LBDCANCL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDCANCL"]="N";
ArrCustomModified["LBDCANCL"]="N";

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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------