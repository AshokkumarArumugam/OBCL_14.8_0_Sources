/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : OLDFFMSG_SYS.js
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
var fieldNameArray = {"BLK_FFMBR_MAS":"FFMTREFNO~COUNTERPARTY~INDUSTRY_CODE~MSGMODULE~CONTRACTREFNO~RECEIVERTYPE~ENTITYTYPE~LOCATION~NAME~MESSAGETYPE~HOLD~RELEVENT~RELEVENTDESC~TAGS~BTN_PRORATA~BILLINGDATE~FEECOMP~FUNDINGAMOUNT~CASH_INT_AMT~PREPAYMENT~FULLPAYMENT~TEMPLATECODE~MESSAGE~SWIFTMSGTYPE~L0~L1~L2~L3~L4~L5~L6~L7~L8~L9~L10~L11~L12~L13~L14~L15~L16~L17~L18~L19~L20~L21~L22~L23~L24~L25~L26~L27~L28~L29~L30~L31~L32~L33~L34~L35~L36~SEND_MSG_CONTENT~PDF_NAME~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~TXNSTAT~AUTHSTAT~FACILITYREFNO~TRANCHEREF~PRODTYPE~BRANCH~MSG_TYPE~NODE~NO_OF_COPIES~PRIORITY~PRODUCT~TESTING_STATUS~TESTWORD_STATUS~NAMED_AGENT~ESN~SUBSYSSTAT~ORIGACTION~BORROWER_LINKED~DIARY_EVENT_SEQ_NO~DIARY_LINKED~ADDR1~ADDR2~ADDR3~ADDR4~PRIVATE_LBL_BRANCH~TEMPLATE_TYPE~VALDT~CCY","BLK_PART_DET":"BRR_COUNTERPARTY~BRR_CNPTY_NAME~BRR_PARTYMSGFLG~BRR_FFTREFNO~BRR_CONTREF~TAGS_VISITED","BLK_ENT_DET":"ENTITY~ENT_NAME~ENT_MEDIA~ENT_PRIMARY~ENT_MSG_FLG~ENT_CONTREF~ENT_COUNTERPARTY~ENT_FFTREFNO","BLK_PARTY_TAG_MAS":"TAGMAS_CONTREF~TAGMAS_FFTREFNO~TAGMAS_CNPTY~TAGMAS_CNPTYNAME","BLK_PARTY_TAGS":"TAGDET_TAGNAME~TAGDET_TAGVALUE~TAGDET_CNPTY~TAGDET_CONTREF~TAGDET_FFTREFNO~TAG_DIARY_EVENT_SEQ_NO~TAG_Y_EVENT_SUB_SEQ_NO","BLK_MSG_PREVIEW_MAS":"PRVWM_FFMTREF~PRVWM_CONTREF~PRVWM_ESN","BLK_MSG_PREVIEW":"PRVW_DCN~PRVW_BRROWER~PRVW_MSG~PRVW_ESN~PRVW_REF~PRVW_CONTREF","BLK_PRORATA_MAS":"PROMAS_CONTREF~PROMAS_FFMTREF~PROMAS_CNPTY~PROMAS_CNPTYNAME","BLK_PRORATA_BORR_DET":"PROBRR_TAG~PROBRR_TAGTXT~PROBRR_TAGCCY~PROBRR_TAGAMT~PROBRR_CONTREF~PROBRR_FFMTREF~PROBRR_DESN~PROBRR_DSESN","BLK_PRORATA_PART_DET":"PROPART_CONTREF~PROPART_FFMTREF~PROPART_TAG~PROPART_CNPTY~PROPART_NAME~PROPART_ASR~PROPART_CCY~PROPART_AMT","BLK_FFMT_PARTICIPANT_SUMMARY":"AUTH_STAT~COUNTERPARTY~EMAIL~ENTITY_TYPE~EVENT_SEQ_NO~HOLD_STATUS~MESSAGE_TYPE~MSG_MODULE~RECEIVER_TYPE~REL_EVENT~CONTRACTREFNO~FFMTREFNO~SUMBRN"};

var multipleEntryPageSize = {"BLK_PART_DET" :"15" ,"BLK_ENT_DET" :"15" ,"BLK_PARTY_TAGS" :"15" ,"BLK_PRORATA_BORR_DET" :"15" ,"BLK_PRORATA_PART_DET" :"15" };

var multipleEntrySVBlocks = "BLK_MSG_PREVIEW~BLK_PARTY_TAG_MAS";

var tabMEBlks = {"CVS_FFMBR__TAB_MAIN":"BLK_PART_DET~BLK_ENT_DET","CVS_TAGS__TAB_MAIN":"BLK_PARTY_TAGS","CVS_PRORATA__TAB_MAIN":"BLK_PRORATA_BORR_DET~BLK_PRORATA_PART_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FFMBR_MAS">FFMTREFNO~COUNTERPARTY~INDUSTRY_CODE~MSGMODULE~CONTRACTREFNO~RECEIVERTYPE~ENTITYTYPE~LOCATION~NAME~MESSAGETYPE~HOLD~RELEVENT~RELEVENTDESC~TAGS~BTN_PRORATA~BILLINGDATE~FEECOMP~FUNDINGAMOUNT~CASH_INT_AMT~PREPAYMENT~FULLPAYMENT~TEMPLATECODE~MESSAGE~SWIFTMSGTYPE~L0~L1~L2~L3~L4~L5~L6~L7~L8~L9~L10~L11~L12~L13~L14~L15~L16~L17~L18~L19~L20~L21~L22~L23~L24~L25~L26~L27~L28~L29~L30~L31~L32~L33~L34~L35~L36~SEND_MSG_CONTENT~PDF_NAME~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~TXNSTAT~AUTHSTAT~FACILITYREFNO~TRANCHEREF~PRODTYPE~BRANCH~MSG_TYPE~NODE~NO_OF_COPIES~PRIORITY~PRODUCT~TESTING_STATUS~TESTWORD_STATUS~NAMED_AGENT~ESN~SUBSYSSTAT~ORIGACTION~BORROWER_LINKED~DIARY_EVENT_SEQ_NO~DIARY_LINKED~ADDR1~ADDR2~ADDR3~ADDR4~PRIVATE_LBL_BRANCH~TEMPLATE_TYPE~VALDT~CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMBR_MAS" RELATION_TYPE="N" TYPE="BLK_PART_DET">BRR_COUNTERPARTY~BRR_CNPTY_NAME~BRR_PARTYMSGFLG~BRR_FFTREFNO~BRR_CONTREF~TAGS_VISITED</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_DET" RELATION_TYPE="N" TYPE="BLK_ENT_DET">ENTITY~ENT_NAME~ENT_MEDIA~ENT_PRIMARY~ENT_MSG_FLG~ENT_CONTREF~ENT_COUNTERPARTY~ENT_FFTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_DET" RELATION_TYPE="N" TYPE="BLK_PARTY_TAG_MAS">TAGMAS_CONTREF~TAGMAS_FFTREFNO~TAGMAS_CNPTY~TAGMAS_CNPTYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_PARTY_TAG_MAS" RELATION_TYPE="N" TYPE="BLK_PARTY_TAGS">TAGDET_TAGNAME~TAGDET_TAGVALUE~TAGDET_CNPTY~TAGDET_CONTREF~TAGDET_FFTREFNO~TAG_DIARY_EVENT_SEQ_NO~TAG_Y_EVENT_SUB_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMBR_MAS" RELATION_TYPE="1" TYPE="BLK_MSG_PREVIEW_MAS">PRVWM_FFMTREF~PRVWM_CONTREF~PRVWM_ESN</FN>'; 
msgxml += '      <FN PARENT="BLK_MSG_PREVIEW_MAS" RELATION_TYPE="N" TYPE="BLK_MSG_PREVIEW">PRVW_DCN~PRVW_BRROWER~PRVW_MSG~PRVW_ESN~PRVW_REF~PRVW_CONTREF</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMBR_MAS" RELATION_TYPE="1" TYPE="BLK_PRORATA_MAS">PROMAS_CONTREF~PROMAS_FFMTREF~PROMAS_CNPTY~PROMAS_CNPTYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_PRORATA_MAS" RELATION_TYPE="N" TYPE="BLK_PRORATA_BORR_DET">PROBRR_TAG~PROBRR_TAGTXT~PROBRR_TAGCCY~PROBRR_TAGAMT~PROBRR_CONTREF~PROBRR_FFMTREF~PROBRR_DESN~PROBRR_DSESN</FN>'; 
msgxml += '      <FN PARENT="BLK_PRORATA_MAS" RELATION_TYPE="N" TYPE="BLK_PRORATA_PART_DET">PROPART_CONTREF~PROPART_FFMTREF~PROPART_TAG~PROPART_CNPTY~PROPART_NAME~PROPART_ASR~PROPART_CCY~PROPART_AMT</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FFMT_PARTICIPANT_SUMMARY">AUTH_STAT~COUNTERPARTY~EMAIL~ENTITY_TYPE~EVENT_SEQ_NO~HOLD_STATUS~MESSAGE_TYPE~MSG_MODULE~RECEIVER_TYPE~REL_EVENT~CONTRACTREFNO~FFMTREFNO~SUMBRN</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FFMT_PARTICIPANT_SUMMARY">AUTH_STAT~MSG_MODULE~HOLD_STATUS~EMAIL~FFMTREFNO~CONTRACTREFNO~EVENT_SEQ_NO~MESSAGE_TYPE~COUNTERPARTY~REL_EVENT~RECEIVER_TYPE~ENTITY_TYPE~SUMBRN</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDFFMSG";
var defaultWhereClause = "BRANCH = GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_FFMT_PARTICIPANT_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_FFMBR_MAS" : "","BLK_PART_DET" : "BLK_FFMBR_MAS~N","BLK_ENT_DET" : "BLK_PART_DET~N","BLK_PARTY_TAG_MAS" : "BLK_PART_DET~N","BLK_PARTY_TAGS" : "BLK_PARTY_TAG_MAS~N","BLK_MSG_PREVIEW_MAS" : "BLK_FFMBR_MAS~1","BLK_MSG_PREVIEW" : "BLK_MSG_PREVIEW_MAS~N","BLK_PRORATA_MAS" : "BLK_FFMBR_MAS~1","BLK_PRORATA_BORR_DET" : "BLK_PRORATA_MAS~N","BLK_PRORATA_PART_DET" : "BLK_PRORATA_MAS~N","BLK_FFMT_PARTICIPANT_SUMMARY" : ""}; 

 var dataSrcLocationArray = new Array("BLK_FFMBR_MAS","BLK_PART_DET","BLK_ENT_DET","BLK_PARTY_TAG_MAS","BLK_PARTY_TAGS","BLK_MSG_PREVIEW_MAS","BLK_MSG_PREVIEW","BLK_PRORATA_MAS","BLK_PRORATA_BORR_DET","BLK_PRORATA_PART_DET","BLK_FFMT_PARTICIPANT_SUMMARY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDFFMSG.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDFFMSG.js, in "BlockName__FieldName" format
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
var queryAmendArr = new Array(); 
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_FFMBR_MAS__CONTRACTREFNO__LOV_CONTRACT_REF":["~BLK_FFMBR_MAS__CONTRACTREFNO~BLK_FFMBR_MAS__COUNTERPARTY~~BLK_FFMBR_MAS__NAME~~","BLK_FFMBR_MAS__MSGMODULE!VARCHAR2","N~N~N~N~N~N",""],"BLK_FFMBR_MAS__ENTITYTYPE__LOV_ENTITY_TYPE":["BLK_FFMBR_MAS__ENTITYTYPE~","BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2","N",""],"BLK_FFMBR_MAS__LOCATION__LOV_LOCATION":["BLK_FFMBR_MAS__LOCATION~","BLK_FFMBR_MAS__COUNTERPARTY!VARCHAR2","N",""],"BLK_FFMBR_MAS__RELEVENT__LOV_EVENT":["BLK_FFMBR_MAS__RELEVENT~BLK_FFMBR_MAS__RELEVENTDESC~","","N~N",""],"BLK_FFMBR_MAS__TAGS__LOV_TAGS":["BLK_FFMBR_MAS__TAGS~~","BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__RELEVENT!VARCHAR2~BLK_FFMBR_MAS__RELEVENT!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__RELEVENT!VARCHAR2~BLK_FFMBR_MAS__MESSAGETYPE!VARCHAR2~BLK_FFMBR_MAS__MESSAGETYPE!VARCHAR2","N~N",""],"BLK_FFMBR_MAS__FEECOMP__LOV_FEE_COMP":["BLK_FFMBR_MAS__FEECOMP~","BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2","N","N"],"BLK_FFMBR_MAS__TEMPLATECODE__LOV_TEMPLATE":["BLK_FFMBR_MAS__TEMPLATECODE~~BLK_FFMBR_MAS__MESSAGE~BLK_FFMBR_MAS__TEMPLATE_TYPE~","BLK_FFMBR_MAS__NAMED_AGENT!VARCHAR2~BLK_FFMBR_MAS__MESSAGETYPE!VARCHAR2~BLK_FFMBR_MAS__PRIVATE_LBL_BRANCH!VARCHAR2~BLK_FFMBR_MAS__NAMED_AGENT!VARCHAR2~BLK_FFMBR_MAS__NAMED_AGENT!VARCHAR2","N~N~N",""],"BLK_PART_DET__BRR_COUNTERPARTY__LOV_BRR_NAME":["BLK_PART_DET__BRR_COUNTERPARTY~BLK_PART_DET__BRR_CNPTY_NAME~","BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__FFMTREFNO!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2","N~N",""],"BLK_ENT_DET__ENTITY__LOV_ENTITY_NAME":["BLK_ENT_DET__ENTITY~BLK_ENT_DET__ENT_NAME~~BLK_ENT_DET__ENT_PRIMARY~","BLK_FFMBR_MAS__FACILITYREFNO!VARCHAR2~BLK_ENT_DET__ENT_COUNTERPARTY!VARCHAR2~BLK_FFMBR_MAS__FACILITYREFNO!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2~BLK_ENT_DET__ENT_COUNTERPARTY!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS__MSGMODULE!VARCHAR2","N~N~N~N",""],"BLK_ENT_DET__ENT_MEDIA__LOV_MEDIA":["BLK_ENT_DET__ENT_MEDIA~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_PART_DET","BLK_ENT_DET","BLK_PARTY_TAGS","BLK_PRORATA_BORR_DET","BLK_PRORATA_PART_DET");
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

ArrFuncOrigin["OLDFFMSG"]="KERNEL";
ArrPrntFunc["OLDFFMSG"]="";
ArrPrntOrigin["OLDFFMSG"]="";
ArrRoutingType["OLDFFMSG"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDFFMSG"]="N";
ArrCustomModified["OLDFFMSG"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PREVIEW":"FFMTREF~CONTREF~ESN","CVS_TAGS":"CONTREF~FFTREF~CPTY~CPTYNAME","CVS_PRORATA":"PRO_CONTREF~PRO_FFMTREF~PRO_CNPTY~PRO_NAME"};
var scrArgSource = {"CVS_PREVIEW":"BLK_FFMBR_MAS__FFMTREFNO~BLK_FFMBR_MAS__COUNTERPARTY~BLK_FFMBR_MAS__ESN","CVS_TAGS":"BLK_PART_DET__BRR_CONTREF~BLK_PART_DET__BRR_FFTREFNO~BLK_PART_DET__BRR_COUNTERPARTY~BLK_PART_DET__BRR_CNPTY_NAME","CVS_PRORATA":"BLK_FFMBR_MAS__CONTRACTREFNO~BLK_FFMBR_MAS__FFMTREFNO~BLK_FFMBR_MAS__COUNTERPARTY~BLK_FFMBR_MAS__NAME"};
var scrArgVals = {"CVS_PREVIEW":"~~","CVS_TAGS":"~~~","CVS_PRORATA":"~~~"};
var scrArgDest = {"CVS_PREVIEW":"BLK_MSG_PREVIEW_MAS__PRVWM_FFMTREF~BLK_MSG_PREVIEW_MAS__PRVWM_CONTREF~BLK_MSG_PREVIEW_MAS__PRVWM_ESN","CVS_TAGS":"BLK_PARTY_TAG_MAS__TAGMAS_CONTREF~BLK_PARTY_TAG_MAS__TAGMAS_FFTREFNO~BLK_PARTY_TAG_MAS__TAGMAS_CNPTY~BLK_PARTY_TAG_MAS__TAGMAS_CNPTYNAME","CVS_PRORATA":"BLK_PRORATA_MAS__PROMAS_CONTREF~BLK_PRORATA_MAS__PROMAS_CONTREF~BLK_PRORATA_MAS__PROMAS_CNPTY~BLK_PRORATA_MAS__PROMAS_CNPTYNAME"};
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