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
**  File Name          : LBDEXRFX_SYS.js
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
var fieldNameArray = {"BLK_EXRATE_FIXING_DETAILS":"CONTRACTREFNO~EXRATEEFFSTARTDATE~EVENTSEQNO~TXTPROCODE~TXTPRODESC~TXTUSRREFNO~TXTCUSTOMER~TXTCUSTNAME~TXTFACILITYNAME~TXTMARKITCONTRACTID~TXTBRANCH~CONTRACTCCY~TRANCHECCY~TXTCONTRACTAMT~TXTTRANCHEEQVAMT~EXRATEFIXINGDATE~TXTREVALUATIONRATECODE~EXRATEEFFECTIVEENDDATE~TXTREVALUATIONRATETYPE~EXRATEFIXNOTIFIDATE~NEXTEFFSTARTDATE~EXCHANGERATE~REMARKS~SUBSYSSTAT","BLK_OLTBS_CONTRACT_EVENT_LOG":"CONTREFNO~MAKERDTST~MAKERID~TXNSTAT~CHECKERID~AUTHSTAT~CHECKERDTST~TXTPARTICIPANTSTATUS~EVENT_SEQ_NO"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_EXRATE_FIXING_DETAILS">CONTRACTREFNO~EXRATEEFFSTARTDATE~EVENTSEQNO~TXTPROCODE~TXTPRODESC~TXTUSRREFNO~TXTCUSTOMER~TXTCUSTNAME~TXTFACILITYNAME~TXTMARKITCONTRACTID~TXTBRANCH~CONTRACTCCY~TRANCHECCY~TXTCONTRACTAMT~TXTTRANCHEEQVAMT~EXRATEFIXINGDATE~TXTREVALUATIONRATECODE~EXRATEEFFECTIVEENDDATE~TXTREVALUATIONRATETYPE~EXRATEFIXNOTIFIDATE~NEXTEFFSTARTDATE~EXCHANGERATE~REMARKS~SUBSYSSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_EXRATE_FIXING_DETAILS" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">CONTREFNO~MAKERDTST~MAKERID~TXNSTAT~CHECKERID~AUTHSTAT~CHECKERDTST~TXTPARTICIPANTSTATUS~EVENT_SEQ_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_EXRATE";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_EXRATE_FIXING_DETAILS">CONTRACTREFNO~EXRATEEFFSTARTDATE~EVENTSEQNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDEXRFX";
var defaultWhereClause = "exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_EXRATE_FIXING_DETAILS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_EXRATE_FIXING_DETAILS" : "","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_EXRATE_FIXING_DETAILS~1"}; 

 var dataSrcLocationArray = new Array("BLK_EXRATE_FIXING_DETAILS","BLK_OLTBS_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDEXRFX.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDEXRFX.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_EXRATE_FIXING_DETAILS__CONTRACTREFNO";
pkFields[0] = "BLK_EXRATE_FIXING_DETAILS__CONTRACTREFNO";
queryFields[1] = "BLK_EXRATE_FIXING_DETAILS__EXRATEEFFSTARTDATE";
pkFields[1] = "BLK_EXRATE_FIXING_DETAILS__EXRATEEFFSTARTDATE";
queryFields[2] = "BLK_EXRATE_FIXING_DETAILS__EVENTSEQNO";
pkFields[2] = "BLK_EXRATE_FIXING_DETAILS__EVENTSEQNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_EXRATE_FIXING_DETAILS":["EXCHANGERATE","EXRATEEFFECTIVEENDDATEI","EXRATEFIXNOTIFIDATEI","NEXTEFFSTARTDATEI"]};
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
var lovInfoFlds = {"BLK_EXRATE_FIXING_DETAILS__CONTRACTREFNO__LOV_CONTRACT_REF":["BLK_EXRATE_FIXING_DETAILS__CONTRACTREFNO~BLK_EXRATE_FIXING_DETAILS__TXTUSRREFNO~","","N~N",""]};
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

 var CallFormArray= new Array("LBCADVIC~BLK_EXRATE_FIXING_DETAILS"); 

 var CallFormRelat=new Array("LBTBS_EXRATE_FIXING_DETAILS.CONTRACT_REF_NO = OLTBS_GTEMP_EVENT_ADVICE.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LBDEXRFX"]="KERNEL";
ArrPrntFunc["LBDEXRFX"]="";
ArrPrntOrigin["LBDEXRFX"]="";
ArrRoutingType["LBDEXRFX"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDEXRFX"]="N";
ArrCustomModified["LBDEXRFX"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"LBCADVIC":"CONTREFNO~EVNTSEQNO"};
var scrArgSource = {"LBCADVIC":"BLK_EXRATE_FIXING_DETAILS__CONTRACTREFNO~BLK_EXRATE_FIXING_DETAILS__EVENTSEQNO"};
var scrArgVals = {"LBCADVIC":"~"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"LBCADVIC":""};
var dpndntOnSrvs = {"LBCADVIC":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------