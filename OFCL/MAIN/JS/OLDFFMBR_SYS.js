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
**  File Name          : OLDFFMBR_SYS.js
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
var fieldNameArray = {"BLK_FFMBR_MAS":"FFMTREFNO~COUNTERPARTY~INDUSTRY_CODE~MSGMODULE~CONTRACTREFNO~RECEIVERTYPE~ENTITYTYPE~NAME~MESSAGETYPE~HOLD~RELEVENT~RELEVENTDESC~RECALLDATE~BILLINGDATE~FEECOMP~FUNDINGAMOUNT~PROPERTYCODE~PREPAYMENT~FULLPAYMENT~TEMPLATECODE~TAGS~MESSAGE~SWIFTMSGTYPE~L0~L1~L2~L3~L4~L5~L6~L7~L8~L9~L10~L11~L12~L13~L14~L15~L16~L17~L18~L19~L20~L21~L22~L23~L24~L25~L26~L27~L28~L29~L30~L31~L32~L33~L34~L35~L36~SEND_MSG_CONTENT~PDF_NAME~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~TXNSTAT~AUTHSTAT~FACILITYREFNO~TRANCHEREF~PRODTYPE~BRANCH~MSG_TYPE~NODE~NO_OF_COPIES~PRIORITY~PRODUCT~TESTING_STATUS~TESTWORD_STATUS~NAMED_AGENT~ESN~SUBSYSSTAT~LOCATION~ORIGACTION~BORROWER_LINKED~DIARY_EVENT_SEQ_NO~DIARY_LINKED~CCY","BLK_BORR_DET":"BRR_COUNTERPARTY~BRR_CNPTY_NAME~BRR_PARTYMSGFLG~BRR_FFTREFNO~BRR_CONTREF~TAGS_VISITED","BLK_ENT_DET":"ENTITY~ENT_NAME~ENT_MEDIA~ENT_PRIMARY~ENT_MSG_FLG~ENT_CONTREF~ENT_COUNTERPARTY~ENT_FFTREFNO","BLK_PAY_NOTC":"PAY_ESCROW1~PAY_ESCROW2~PAY_ESCROW3~PAY_ESCROW6~PAY_SPLPENAL~PAY_STATFEE~PAY_PREPAY~PAY_CONTRF~PAY_FFTREFNO","BLK_PARTY_TAG_MAS":"TAGMAS_CONTREF~TAGMAS_FFTREFNO~TAGMAS_CNPTY~TAGMAS_CNPTYNAME","BLK_PARTY_TAGS":"TAGDET_TAGNAME~TAGDET_TAGVALUE~TAGDET_CNPTY~TAGDET_CONTREF~TAGDET_FFTREFNO~TAG_DIARY_EVENT_SEQ_NO~TAG_Y_EVENT_SUB_SEQ_NO","BLK_MSG_PREVIEW_MAS":"PRVWM_FFMTREF~PRVWM_CONTREF~PRVWM_ESN","BLK_MSG_PREVIEW":"PRVW_DCN~PRVW_BRROWER~PRVW_MSG~PRVW_ESN~PRVW_REF","BLK_FFMTBR_SUMMARY":"AUTHSTAT~CONTRACTREFNO~COUNTERPARTY~EMAIL~ENTITYTYPE~EVENTSEQNO~FFMTREFNO~HOLD~MESSAGETYPE~MSGMODULE~RECEIVERTYPE~RELEVENT~SUMBRN"};

var multipleEntryPageSize = {"BLK_BORR_DET" :"15" ,"BLK_ENT_DET" :"15" ,"BLK_PARTY_TAGS" :"15" };

var multipleEntrySVBlocks = "BLK_MSG_PREVIEW~BLK_PARTY_TAG_MAS";

var tabMEBlks = {"CVS_FFMBR__TAB_MAIN":"BLK_BORR_DET~BLK_ENT_DET","CVS_TAGS__TAB_MAIN":"BLK_PARTY_TAGS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FFMBR_MAS">FFMTREFNO~COUNTERPARTY~INDUSTRY_CODE~MSGMODULE~CONTRACTREFNO~RECEIVERTYPE~ENTITYTYPE~NAME~MESSAGETYPE~HOLD~RELEVENT~RELEVENTDESC~RECALLDATE~BILLINGDATE~FEECOMP~FUNDINGAMOUNT~PROPERTYCODE~PREPAYMENT~FULLPAYMENT~TEMPLATECODE~TAGS~MESSAGE~SWIFTMSGTYPE~L0~L1~L2~L3~L4~L5~L6~L7~L8~L9~L10~L11~L12~L13~L14~L15~L16~L17~L18~L19~L20~L21~L22~L23~L24~L25~L26~L27~L28~L29~L30~L31~L32~L33~L34~L35~L36~SEND_MSG_CONTENT~PDF_NAME~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~TXNSTAT~AUTHSTAT~FACILITYREFNO~TRANCHEREF~PRODTYPE~BRANCH~MSG_TYPE~NODE~NO_OF_COPIES~PRIORITY~PRODUCT~TESTING_STATUS~TESTWORD_STATUS~NAMED_AGENT~ESN~SUBSYSSTAT~LOCATION~ORIGACTION~BORROWER_LINKED~DIARY_EVENT_SEQ_NO~DIARY_LINKED~CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMBR_MAS" RELATION_TYPE="N" TYPE="BLK_BORR_DET">BRR_COUNTERPARTY~BRR_CNPTY_NAME~BRR_PARTYMSGFLG~BRR_FFTREFNO~BRR_CONTREF~TAGS_VISITED</FN>'; 
msgxml += '      <FN PARENT="BLK_BORR_DET" RELATION_TYPE="N" TYPE="BLK_ENT_DET">ENTITY~ENT_NAME~ENT_MEDIA~ENT_PRIMARY~ENT_MSG_FLG~ENT_CONTREF~ENT_COUNTERPARTY~ENT_FFTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMBR_MAS" RELATION_TYPE="1" TYPE="BLK_PAY_NOTC">PAY_ESCROW1~PAY_ESCROW2~PAY_ESCROW3~PAY_ESCROW6~PAY_SPLPENAL~PAY_STATFEE~PAY_PREPAY~PAY_CONTRF~PAY_FFTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_BORR_DET" RELATION_TYPE="N" TYPE="BLK_PARTY_TAG_MAS">TAGMAS_CONTREF~TAGMAS_FFTREFNO~TAGMAS_CNPTY~TAGMAS_CNPTYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_PARTY_TAG_MAS" RELATION_TYPE="N" TYPE="BLK_PARTY_TAGS">TAGDET_TAGNAME~TAGDET_TAGVALUE~TAGDET_CNPTY~TAGDET_CONTREF~TAGDET_FFTREFNO~TAG_DIARY_EVENT_SEQ_NO~TAG_Y_EVENT_SUB_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMBR_MAS" RELATION_TYPE="1" TYPE="BLK_MSG_PREVIEW_MAS">PRVWM_FFMTREF~PRVWM_CONTREF~PRVWM_ESN</FN>'; 
msgxml += '      <FN PARENT="BLK_MSG_PREVIEW_MAS" RELATION_TYPE="N" TYPE="BLK_MSG_PREVIEW">PRVW_DCN~PRVW_BRROWER~PRVW_MSG~PRVW_ESN~PRVW_REF</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FFMTBR_SUMMARY">AUTHSTAT~CONTRACTREFNO~COUNTERPARTY~EMAIL~ENTITYTYPE~EVENTSEQNO~FFMTREFNO~HOLD~MESSAGETYPE~MSGMODULE~RECEIVERTYPE~RELEVENT~SUMBRN</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_FFMBR";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FFMTBR_SUMMARY">AUTHSTAT~MSGMODULE~HOLD~EMAIL~FFMTREFNO~CONTRACTREFNO~EVENTSEQNO~MESSAGETYPE~COUNTERPARTY~RELEVENT~RECEIVERTYPE~ENTITYTYPE~SUMBRN</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDFFMBR";
var defaultWhereClause = "BRANCH = GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_FFMTBR_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_FFMBR_MAS" : "","BLK_BORR_DET" : "BLK_FFMBR_MAS~N","BLK_ENT_DET" : "BLK_BORR_DET~N","BLK_PAY_NOTC" : "BLK_FFMBR_MAS~1","BLK_PARTY_TAG_MAS" : "BLK_BORR_DET~N","BLK_PARTY_TAGS" : "BLK_PARTY_TAG_MAS~N","BLK_MSG_PREVIEW_MAS" : "BLK_FFMBR_MAS~1","BLK_MSG_PREVIEW" : "BLK_MSG_PREVIEW_MAS~N","BLK_FFMTBR_SUMMARY" : ""}; 

 var dataSrcLocationArray = new Array("BLK_FFMBR_MAS","BLK_BORR_DET","BLK_ENT_DET","BLK_PAY_NOTC","BLK_PARTY_TAG_MAS","BLK_PARTY_TAGS","BLK_MSG_PREVIEW_MAS","BLK_MSG_PREVIEW","BLK_FFMTBR_SUMMARY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDFFMBR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDFFMBR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_FFMBR_MAS__CONTRACTREFNO";
pkFields[0] = "BLK_FFMBR_MAS__CONTRACTREFNO";
queryFields[1] = "BLK_FFMBR_MAS__FFMTREFNO";
pkFields[1] = "BLK_FFMBR_MAS__FFMTREFNO";
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
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_FFMBR_MAS":["BTN_DOWNLOAD","BTN_MSG_PREVIEW"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_FFMBR_MAS__CONTRACTREFNO__LOV_CONTRACT_REF":["~BLK_FFMBR_MAS__CONTRACTREFNO~BLK_FFMBR_MAS__COUNTERPARTY~~BLK_FFMBR_MAS__NAME~~","BLK_FFMBR_MAS__MSGMODULE!VARCHAR2","N~N~N~N~N~N",""],"BLK_FFMBR_MAS__ENTITYTYPE__LOV_ENTITY_TYPE":["BLK_FFMBR_MAS__ENTITYTYPE~","BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2","N",""],"BLK_FFMBR_MAS__RELEVENT__LOV_EVENT":["BLK_FFMBR_MAS__RELEVENT~BLK_FFMBR_MAS__RELEVENTDESC~","","N~N",""],"BLK_FFMBR_MAS__FEECOMP__LOV_FEE_COMP":["BLK_FFMBR_MAS__FEECOMP~","BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2","N","N"],"BLK_FFMBR_MAS__PROPERTYCODE__LOV_PROPERTY_CODE":["BLK_FFMBR_MAS__PROPERTYCODE~","BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2","N",""],"BLK_FFMBR_MAS__TEMPLATECODE__LOV_TEMPLATE":["BLK_FFMBR_MAS__TEMPLATECODE~~BLK_FFMBR_MAS__MESSAGE~","BLK_FFMBR_MAS__MESSAGETYPE!VARCHAR2~BLK_FFMBR_MAS__RELEVENT!VARCHAR2~BLK_FFMBR_MAS__NAMED_AGENT!VARCHAR2~BLK_FFMBR_MAS__NAMED_AGENT!VARCHAR2~BLK_FFMBR_MAS__NAMED_AGENT!VARCHAR2","N~N~N",""],"BLK_FFMBR_MAS__TAGS__LOV_TAGS":["BLK_FFMBR_MAS__TAGS~~","BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__RELEVENT!VARCHAR2~BLK_FFMBR_MAS__RELEVENT!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__RELEVENT!VARCHAR2~BLK_FFMBR_MAS__MESSAGETYPE!VARCHAR2","N~N",""],"BLK_BORR_DET__BRR_COUNTERPARTY__LOV_BRR_NAME":["BLK_BORR_DET__BRR_COUNTERPARTY~BLK_BORR_DET__BRR_CNPTY_NAME~","BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__FFMTREFNO!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2","N~N",""],"BLK_ENT_DET__ENTITY__LOV_ENTITY_NAME":["BLK_ENT_DET__ENTITY~BLK_ENT_DET__ENT_NAME~~BLK_ENT_DET__ENT_PRIMARY~","BLK_FFMBR_MAS__FACILITYREFNO!VARCHAR2~BLK_ENT_DET__ENT_COUNTERPARTY!VARCHAR2~BLK_FFMBR_MAS__FACILITYREFNO!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_ENT_DET__ENT_COUNTERPARTY!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2","N~N~N~N",""],"BLK_ENT_DET__ENT_MEDIA__LOV_MEDIA":["BLK_ENT_DET__ENT_MEDIA~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_BORR_DET","BLK_ENT_DET","BLK_PARTY_TAGS");
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

ArrFuncOrigin["OLDFFMBR"]="KERNEL";
ArrPrntFunc["OLDFFMBR"]="";
ArrPrntOrigin["OLDFFMBR"]="";
ArrRoutingType["OLDFFMBR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDFFMBR"]="N";
ArrCustomModified["OLDFFMBR"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PREVIEW":"FFMTREF~CONTREF~ESN","CVS_TAGS":"CONTREF~FFTREF~CPTY~CPTYNAME"};
var scrArgSource = {"CVS_PREVIEW":"BLK_FFMBR_MAS__FFMTREFNO~BLK_FFMBR_MAS__CONTRACTREFNO~BLK_FFMBR_MAS__ESN","CVS_TAGS":"BLK_BORR_DET__BRR_CONTREF~BLK_BORR_DET__BRR_FFTREFNO~BLK_BORR_DET__BRR_COUNTERPARTY~BLK_BORR_DET__BRR_CNPTY_NAME"};
var scrArgVals = {"CVS_PREVIEW":"~~","CVS_TAGS":"~~~"};
var scrArgDest = {"CVS_PREVIEW":"BLK_MSG_PREVIEW_MAS__PRVWM_FFMTREF~BLK_MSG_PREVIEW_MAS__PRVWM_CONTREF~BLK_MSG_PREVIEW_MAS__PRVWM_ESN","CVS_TAGS":"BLK_PARTY_TAG_MAS__TAGMAS_CONTREF~BLK_PARTY_TAG_MAS__TAGMAS_FFTREFNO~BLK_PARTY_TAG_MAS__TAGMAS_CNPTY~BLK_PARTY_TAG_MAS__TAGMAS_CNPTYNAME"};
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