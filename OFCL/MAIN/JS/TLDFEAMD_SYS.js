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
**  File Name          : TLDFEAMD_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_TLFEAMD":"CONTREFNO~USERREFNO~LATESTVERSIONNO~LATESTEVENTSEQNO~CONTRACTSTATUS~BRANCH","BLK_TLTBS_CONTRACT_MASTER":"VERSIONNO~CONTRREFNO~BRANCH~DESKCODE~EXPENSECODE~PORTFOLIO~POSITIONIDENTIFIER~POSITIONQUALIFIER~CUSIPNO~TICKETID~TXTPRTFOLIODESC~TRADEIDENTIFIER","BLK_TLTBS_CONTRACT_FEE":"CONTRAREFNO~COMP~COMPCCY~ACTUALAMOUNT~BUYERSPLITAMOUNT~SELLERSPLITAMOUNT~TXTAMTPAID~TXTOLDAMT~TXTOLDBUYERSPLITAMOUNT~TXTOLDSELLERSPLITAMOUNT~CALCULATEDAMOUNT~FEETYP","BLK_TLTBS_CONTRACT_FEE_MASTER":"CONTRACTREFNO~COMPO~ESNO~ASSIGNMENTFEETYPE~WAIVER~FEECALCBASIS~FEEBASIS~FEETYPE~TXTOLDASSIGNMENTFEETYPE~TXTOLDFEECALCBASIS~TXTOLDFEEBASIS~TXTOLDWAIVER~COMPSTAT~DCFCATEGORY","BLK_OLTBS_CONTRACT_EVENT_LOG":"CONREFNO~ESNUM~CHECKERDTST~AUTHSTAT~CHECKERID~MAKERID~MAKERDTST~TXNSTAT","BLK_SUBSYS":"SUBSYSCONTREFNO~FUNCID~SUBSYSSTAT"};

var multipleEntryPageSize = {"BLK_TLTBS_CONTRACT_FEE" :"15" };

var multipleEntrySVBlocks = "BLK_TLTBS_CONTRACT_FEE_MASTER~BLK_TLTBS_CONTRACT_FEE";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_TLTBS_CONTRACT_FEE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_TLFEAMD">CONTREFNO~USERREFNO~LATESTVERSIONNO~LATESTEVENTSEQNO~CONTRACTSTATUS~BRANCH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_TLFEAMD" RELATION_TYPE="1" TYPE="BLK_TLTBS_CONTRACT_MASTER">VERSIONNO~CONTRREFNO~BRANCH~DESKCODE~EXPENSECODE~PORTFOLIO~POSITIONIDENTIFIER~POSITIONQUALIFIER~CUSIPNO~TICKETID~TXTPRTFOLIODESC~TRADEIDENTIFIER</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_TLFEAMD" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONTRACT_FEE">CONTRAREFNO~COMP~COMPCCY~ACTUALAMOUNT~BUYERSPLITAMOUNT~SELLERSPLITAMOUNT~TXTAMTPAID~TXTOLDAMT~TXTOLDBUYERSPLITAMOUNT~TXTOLDSELLERSPLITAMOUNT~CALCULATEDAMOUNT~FEETYP</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_CONTRACT_FEE" RELATION_TYPE="N" TYPE="BLK_TLTBS_CONTRACT_FEE_MASTER">CONTRACTREFNO~COMPO~ESNO~ASSIGNMENTFEETYPE~WAIVER~FEECALCBASIS~FEEBASIS~FEETYPE~TXTOLDASSIGNMENTFEETYPE~TXTOLDFEECALCBASIS~TXTOLDFEEBASIS~TXTOLDWAIVER~COMPSTAT~DCFCATEGORY</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_TLFEAMD" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">CONREFNO~ESNUM~CHECKERDTST~AUTHSTAT~CHECKERID~MAKERID~MAKERDTST~TXNSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_TLFEAMD" RELATION_TYPE="1" TYPE="BLK_SUBSYS">SUBSYSCONTREFNO~FUNCID~SUBSYSSTAT</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONTRACT_TLFEAMD" RELATION_TYPE="1" TYPE="BLK_SUMMARY">CONTREFNO~CONSTS~AUTSTS~MODU</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDFEAMD";
var defaultWhereClause = "MODULE='TL' AND EVENT_SEQ_NO = (SELECT MAX(EVENT_SEQ_NO) FROM OLTB_CONTRACT_EVENT_LOG B WHERE B . CONTRACT_REF_NO = SUMMARYDSN.CONTRACT_REF_NO) AND GLOBAL.CURRENT_BRANCH =sypks_utils.get_branch(CONTRACT_REF_NO)and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_TLFEAMD" : "","BLK_TLTBS_CONTRACT_MASTER" : "BLK_OLTBS_CONTRACT_TLFEAMD~1","BLK_TLTBS_CONTRACT_FEE" : "BLK_OLTBS_CONTRACT_TLFEAMD~N","BLK_TLTBS_CONTRACT_FEE_MASTER" : "BLK_TLTBS_CONTRACT_FEE~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT_TLFEAMD~1","BLK_SUBSYS" : "BLK_OLTBS_CONTRACT_TLFEAMD~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_TLFEAMD","BLK_TLTBS_CONTRACT_MASTER","BLK_TLTBS_CONTRACT_FEE","BLK_TLTBS_CONTRACT_FEE_MASTER","BLK_OLTBS_CONTRACT_EVENT_LOG","BLK_SUBSYS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDFEAMD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDFEAMD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_TLFEAMD__CONTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_TLFEAMD__CONTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TLTBS_CONTRACT_FEE_MASTER":["ASSIGNMENTFEETYPE","FEEBASIS","FEECALCBASIS","WAIVER"],"BLK_TLTBS_CONTRACT_FEE":["ACTUALAMOUNT","BUYERSPLITAMOUNT","SELLERSPLITAMOUNT"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT_TLFEAMD__CONTREFNO__LOV_CONTRACT":["BLK_OLTBS_CONTRACT_TLFEAMD__CONTREFNO~BLK_OLTBS_CONTRACT_TLFEAMD__USERREFNO~BLK_TLTBS_CONTRACT_MASTER__BRANCH~BLK_TLTBS_CONTRACT_MASTER__DESKCODE~BLK_TLTBS_CONTRACT_MASTER__PORTFOLIO~BLK_TLTBS_CONTRACT_MASTER__TXTPRTFOLIODESC~BLK_TLTBS_CONTRACT_MASTER__POSITIONIDENTIFIER~BLK_TLTBS_CONTRACT_MASTER__POSITIONQUALIFIER~BLK_TLTBS_CONTRACT_MASTER__CUSIPNO~BLK_TLTBS_CONTRACT_MASTER__EXPENSECODE~BLK_TLTBS_CONTRACT_MASTER__TICKETID~","","N~N~N~N~N~N~N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TLTBS_CONTRACT_FEE");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_OLTBS_CONTRACT_TLFEAMD"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT__TLFEAMD.CONTRACT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDFEAMD"]="KERNEL";
ArrPrntFunc["TLDFEAMD"]="";
ArrPrntOrigin["TLDFEAMD"]="";
ArrRoutingType["TLDFEAMD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDFEAMD"]="N";
ArrCustomModified["TLDFEAMD"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN~","OLDEVENT":"CONTREF~ACTION_CODE~"};
var scrArgSource = {"OLCONDET":"BLK_OLTBS_CONTRACT_TLFEAMD__CONTREFNO~BLK_OLTBS_CONTRACT_TLFEAMD__LATESTEVENTSEQNO~","OLDEVENT":"BLK_OLTBS_CONTRACT_TLFEAMD__CONTREFNO~~"};
var scrArgVals = {"OLCONDET":"~~","OLDEVENT":"~EXECUTEQUERY~"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":""};
var dpndntOnSrvs = {"OLCONDET":""};
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