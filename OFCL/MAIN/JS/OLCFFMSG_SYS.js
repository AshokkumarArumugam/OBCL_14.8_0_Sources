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
**  File Name          : OLCFFMSG_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_FFMSG":"CONTRACT_REF_NO","BLK_FFMBR_MAS_MSG":"FFMTREFNO~COUNTERPARTY~INDUSTRY_CODE~MSGMODULE~CONTRACTREFNO~RECEIVERTYPE~ENTITYTYPE~LOCATION~NAME~MESSAGETYPE~HOLD~RELEVENT~RELEVENTDESC~TAGS~BTN_PRORATA~BILLINGDATE~FEECOMP~FUNDINGAMOUNT~CASH_INT_AMT~PREPAYMENT~FULLPAYMENT~TEMPLATECODE~MESSAGE~SWIFTMSGTYPE~L0~L1~L2~L3~L4~L5~L6~L7~L8~L9~L10~L11~L12~L13~L14~L15~L16~L17~L18~L19~L20~L21~L22~L23~L24~L25~L26~L27~L28~L29~L30~L31~L32~L33~L34~L35~L36~SEND_MSG_CONTENT~PDF_NAME~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~TXNSTAT~AUTHSTAT~FACILITYREFNO~TRANCHEREF~PRODTYPE~BRANCH~MSG_TYPE~NODE~NO_OF_COPIES~PRIORITY~PRODUCT~TESTING_STATUS~TESTWORD_STATUS~NAMED_AGENT~ESN~SUBSYSSTAT~ORIGACTION~BORROWER_LINKED~DIARY_EVENT_SEQ_NO~DIARY_LINKED~ADDR1~ADDR2~ADDR3~ADDR4~PRIVATE_LBL_BRANCH~TEMPLATE_TYPE~VALDT~CURRENCY","BLK_PART_DET":"BRR_COUNTERPARTY~BRR_CNPTY_NAME~BRR_PARTYMSGFLG~BRR_FFTREFNO~BRR_CONTREF~TAGS_VISITED","BLK_ENT_DET_MSG":"ENTITY~ENT_NAME~ENT_MEDIA~ENT_PRIMARY~ENT_MSG_FLG~ENT_CONTREF~ENT_COUNTERPARTY~ENT_FFTREFNO","BLK_PARTY_TAGS_MSG":"TAGDET_TAGNAME~TAGDET_TAGVALUE~TAGDET_CNPTY~TAGDET_CONTREF~TAGDET_FFTREFNO~TAG_DIARY_EVENT_SEQ_NO~TAG_Y_EVENT_SUB_SEQ_NO","BLK_PARTY_TAG_MAS_MSG":"TAGMAS_CONTREF~TAGMAS_FFTREFNO~TAGMAS_CNPTY~TAGMAS_CNPTYNAME","BLK_MSG_PREVIEW_MSG_MAS_MSG":"PRVWM_FFMTREF~PRVWM_CONTREF~PRVWM_ESN","BLK_PRORATA_MAS":"PROMAS_CONTREF~PROMAS_FFMTREF~PROMAS_CNPTY~PROMAS_CNPTYNAME","BLK_MSG_PREVIEW_MSG":"PRVW_DCN~PRVW_BRROWER~PRVW_MSG~PRVW_ESN~PRVW_REF~PRVW_CONTREF","BLK_PRORATA_BORR_DET":"PROBRR_TAG~PROBRR_TAGTXT~PROBRR_TAGCCY~PROBRR_TAGAMT~PROBRR_CONTREF~PROBRR_FFMTREF~PROBRR_DESN~PROBRR_DSESN","BLK_PRORATA_PART_DET":"PROPART_CNPTY~PROPART_NAME~PROPART_ASR~PROPART_AMT~PROPART_CONTREF~PROPART_FFMTREF~PROPART_MSGFLG"};

var multipleEntryPageSize = {"BLK_PART_DET" :"15" ,"BLK_ENT_DET_MSG" :"15" ,"BLK_PARTY_TAGS_MSG" :"15" ,"BLK_PRORATA_BORR_DET" :"15" ,"BLK_PRORATA_PART_DET" :"15" };

var multipleEntrySVBlocks = "BLK_MSG_PREVIEW_MSG~BLK_PARTY_TAG_MAS_MSG";

var tabMEBlks = {"CVS_FFMBR__TAB_MAIN":"BLK_PART_DET~BLK_ENT_DET_MSG","CVS_TAGS__TAB_MAIN":"BLK_PARTY_TAGS_MSG","CVS_PRORATA__TAB_MAIN":"BLK_PRORATA_BORR_DET~BLK_PRORATA_PART_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_FFMSG">CONTRACT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_FFMSG" RELATION_TYPE="1" TYPE="BLK_FFMBR_MAS_MSG">FFMTREFNO~COUNTERPARTY~INDUSTRY_CODE~MSGMODULE~CONTRACTREFNO~RECEIVERTYPE~ENTITYTYPE~LOCATION~NAME~MESSAGETYPE~HOLD~RELEVENT~RELEVENTDESC~TAGS~BTN_PRORATA~BILLINGDATE~FEECOMP~FUNDINGAMOUNT~CASH_INT_AMT~PREPAYMENT~FULLPAYMENT~TEMPLATECODE~MESSAGE~SWIFTMSGTYPE~L0~L1~L2~L3~L4~L5~L6~L7~L8~L9~L10~L11~L12~L13~L14~L15~L16~L17~L18~L19~L20~L21~L22~L23~L24~L25~L26~L27~L28~L29~L30~L31~L32~L33~L34~L35~L36~SEND_MSG_CONTENT~PDF_NAME~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~TXNSTAT~AUTHSTAT~FACILITYREFNO~TRANCHEREF~PRODTYPE~BRANCH~MSG_TYPE~NODE~NO_OF_COPIES~PRIORITY~PRODUCT~TESTING_STATUS~TESTWORD_STATUS~NAMED_AGENT~ESN~SUBSYSSTAT~ORIGACTION~BORROWER_LINKED~DIARY_EVENT_SEQ_NO~DIARY_LINKED~ADDR1~ADDR2~ADDR3~ADDR4~PRIVATE_LBL_BRANCH~TEMPLATE_TYPE~VALDT~CURRENCY</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMBR_MAS_MSG" RELATION_TYPE="N" TYPE="BLK_PART_DET">BRR_COUNTERPARTY~BRR_CNPTY_NAME~BRR_PARTYMSGFLG~BRR_FFTREFNO~BRR_CONTREF~TAGS_VISITED</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_DET" RELATION_TYPE="N" TYPE="BLK_ENT_DET_MSG">ENTITY~ENT_NAME~ENT_MEDIA~ENT_PRIMARY~ENT_MSG_FLG~ENT_CONTREF~ENT_COUNTERPARTY~ENT_FFTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_PARTY_TAG_MAS_MSG" RELATION_TYPE="N" TYPE="BLK_PARTY_TAGS_MSG">TAGDET_TAGNAME~TAGDET_TAGVALUE~TAGDET_CNPTY~TAGDET_CONTREF~TAGDET_FFTREFNO~TAG_DIARY_EVENT_SEQ_NO~TAG_Y_EVENT_SUB_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_DET" RELATION_TYPE="N" TYPE="BLK_PARTY_TAG_MAS_MSG">TAGMAS_CONTREF~TAGMAS_FFTREFNO~TAGMAS_CNPTY~TAGMAS_CNPTYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMBR_MAS_MSG" RELATION_TYPE="1" TYPE="BLK_MSG_PREVIEW_MSG_MAS_MSG">PRVWM_FFMTREF~PRVWM_CONTREF~PRVWM_ESN</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMBR_MAS_MSG" RELATION_TYPE="1" TYPE="BLK_PRORATA_MAS">PROMAS_CONTREF~PROMAS_FFMTREF~PROMAS_CNPTY~PROMAS_CNPTYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_MSG_PREVIEW_MSG_MAS_MSG" RELATION_TYPE="N" TYPE="BLK_MSG_PREVIEW_MSG">PRVW_DCN~PRVW_BRROWER~PRVW_MSG~PRVW_ESN~PRVW_REF~PRVW_CONTREF</FN>'; 
msgxml += '      <FN PARENT="BLK_PRORATA_MAS" RELATION_TYPE="N" TYPE="BLK_PRORATA_BORR_DET">PROBRR_TAG~PROBRR_TAGTXT~PROBRR_TAGCCY~PROBRR_TAGAMT~PROBRR_CONTREF~PROBRR_FFMTREF~PROBRR_DESN~PROBRR_DSESN</FN>'; 
msgxml += '      <FN PARENT="BLK_PRORATA_MAS" RELATION_TYPE="N" TYPE="BLK_PRORATA_PART_DET">PROPART_CNPTY~PROPART_NAME~PROPART_ASR~PROPART_AMT~PROPART_CONTREF~PROPART_FFMTREF~PROPART_MSGFLG</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_FFMBR";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_FFMSG" : "","BLK_FFMBR_MAS_MSG" : "BLK_OLTBS_CONTRACT_FFMSG~1","BLK_PART_DET" : "BLK_FFMBR_MAS_MSG~N","BLK_ENT_DET_MSG" : "BLK_PART_DET~N","BLK_PARTY_TAGS_MSG" : "BLK_PARTY_TAG_MAS_MSG~N","BLK_PARTY_TAG_MAS_MSG" : "BLK_PART_DET~N","BLK_MSG_PREVIEW_MSG_MAS_MSG" : "BLK_FFMBR_MAS_MSG~1","BLK_PRORATA_MAS" : "BLK_FFMBR_MAS_MSG~1","BLK_MSG_PREVIEW_MSG" : "BLK_MSG_PREVIEW_MSG_MAS_MSG~N","BLK_PRORATA_BORR_DET" : "BLK_PRORATA_MAS~N","BLK_PRORATA_PART_DET" : "BLK_PRORATA_MAS~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_FFMSG","BLK_FFMBR_MAS_MSG","BLK_PART_DET","BLK_ENT_DET_MSG","BLK_PARTY_TAGS_MSG","BLK_PARTY_TAG_MAS_MSG","BLK_MSG_PREVIEW_MSG_MAS_MSG","BLK_PRORATA_MAS","BLK_MSG_PREVIEW_MSG","BLK_PRORATA_BORR_DET","BLK_PRORATA_PART_DET"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCFFMSG.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCFFMSG.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_FFMSG__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT_FFMSG__CONTRACT_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_ENT_DET_MSG":["ENTITY","ENT_MEDIA","ENT_MSG_FLG","ENT_NAME","ENT_PRIMARY"],"BLK_FFMBR_MAS_MSG":["BILLINGDATEI","BORROWER_LINKED","BTN_DOWNLOAD","BTN_POPULATE","BTN_PRORATA","BTN_UPLOAD","CASH_INT_AMT","DIARY_LINKED","ENTITYTYPE","FEECOMP","FULLPAYMENT","FUNDINGAMOUNT","HOLD","LOCATION","MESSAGE","MESSAGETYPE","NAME","PDF_NAME","PREPAYMENT","RECEIVERTYPE","RELEVENT","RELEVENTDESC","SEND_MSG_CONTENT","SUBSYSSTAT","SWIFTMSGTYPE","TAGS","TEMPLATECODE","TEMPLATE_TYPE"],"BLK_PARTY_TAGS_MSG":["TAGDET_TAGNAME","TAGDET_TAGVALUE"],"BLK_PARTY_TAG_MAS_MSG":["TAGMAS_CNPTY","TAGMAS_CNPTYNAME","TAGMAS_CONTREF","TAGMAS_FFTREFNO"],"BLK_PART_DET":["BRR_CNPTY_NAME","BRR_CONTREF","BRR_COUNTERPARTY","BRR_FFTREFNO","BRR_PARTYMSGFLG","BTN_PARTY_TAGS","TAGS_VISITED"],"BLK_PRORATA_BORR_DET":["PROBRR_CONTREF","PROBRR_TAG","PROBRR_TAGAMT","PROBRR_TAGCCY","PROBRR_TAGTXT"],"BLK_PRORATA_MAS":["BTN_CALC","PROMAS_CNPTY","PROMAS_CNPTYNAME","PROMAS_CONTREF","PROMAS_FFMTREF"],"BLK_PRORATA_PART_DET":["PROPART_AMT","PROPART_ASR","PROPART_CNPTY","PROPART_NAME"]};
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
var lovInfoFlds = {"BLK_FFMBR_MAS_MSG__CONTRACTREFNO__LOV_CONTRACT_REF":["BLK_FFMBR_MAS_MSG__MSGMODULE~BLK_FFMBR_MAS_MSG__CONTRACTREFNO~BLK_FFMBR_MAS_MSG__COUNTERPARTY~BLK_FFMBR_MAS_MSG__NAME~~","BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2","N~N~N~N~N",""],"BLK_FFMBR_MAS_MSG__ENTITYTYPE__LOV_ENTITY_TYPE":["BLK_FFMBR_MAS_MSG__ENTITYTYPE~","BLK_FFMBR_MAS_MSG__RECEIVERTYPE!VARCHAR2","N",""],"BLK_FFMBR_MAS_MSG__LOCATION__LOV_LOCATION":["BLK_FFMBR_MAS_MSG__LOCATION~","BLK_FFMBR_MAS_MSG__COUNTERPARTY!VARCHAR2","N",""],"BLK_FFMBR_MAS_MSG__RELEVENT__LOV_EVENT":["BLK_FFMBR_MAS_MSG__RELEVENT~BLK_FFMBR_MAS_MSG__RELEVENTDESC~","","N~N",""],"BLK_FFMBR_MAS_MSG__TAGS__LOV_TAGS":["BLK_FFMBR_MAS_MSG__TAGS~~","BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__RELEVENT!VARCHAR2~BLK_FFMBR_MAS_MSG__RELEVENT!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS_MSG__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__PRODTYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__RELEVENT!VARCHAR2~BLK_FFMBR_MAS_MSG__MESSAGETYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__MESSAGETYPE!VARCHAR2","N~N",""],"BLK_FFMBR_MAS_MSG__FEECOMP__LOV_FEE_COMP":["BLK_FFMBR_MAS_MSG__FEECOMP~","BLK_FFMBR_MAS_MSG__CONTRACTREFNO!VARCHAR2","N","N"],"BLK_FFMBR_MAS_MSG__TEMPLATECODE__LOV_TEMPLATE":["BLK_FFMBR_MAS_MSG__TEMPLATECODE~~BLK_FFMBR_MAS_MSG__MESSAGE~BLK_FFMBR_MAS_MSG__TEMPLATE_TYPE~","BLK_FFMBR_MAS_MSG__NAMED_AGENT!VARCHAR2~BLK_FFMBR_MAS_MSG__MESSAGETYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__PRIVATE_LBL_BRANCH!VARCHAR2~BLK_FFMBR_MAS_MSG__NAMED_AGENT!VARCHAR2~BLK_FFMBR_MAS_MSG__NAMED_AGENT!VARCHAR2","N~N~N",""],"BLK_PART_DET__BRR_COUNTERPARTY__LOV_BRR_NAME":["BLK_PART_DET__BRR_COUNTERPARTY~BLK_PART_DET__BRR_CNPTY_NAME~","BLK_FFMBR_MAS_MSG__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS_MSG__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS_MSG__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS_MSG__FFMTREFNO!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_FFMBR_MAS_MSG__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS_MSG__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS_MSG__CONTRACTREFNO!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2","N~N",""],"BLK_ENT_DET_MSG__ENTITY__LOV_ENTITY_NAME":["BLK_ENT_DET_MSG__ENTITY~BLK_ENT_DET_MSG__ENT_NAME~~BLK_ENT_DET_MSG__ENT_PRIMARY~","BLK_FFMBR_MAS_MSG__FACILITYREFNO!VARCHAR2~BLK_ENT_DET_MSG__ENT_COUNTERPARTY!VARCHAR2~BLK_FFMBR_MAS_MSG__FACILITYREFNO!VARCHAR2~BLK_FFMBR_MAS_MSG__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2~BLK_ENT_DET_MSG__ENT_COUNTERPARTY!VARCHAR2~BLK_FFMBR_MAS_MSG__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__RECEIVERTYPE!VARCHAR2~BLK_FFMBR_MAS_MSG__MSGMODULE!VARCHAR2","N~N~N~N",""],"BLK_ENT_DET_MSG__ENT_MEDIA__LOV_MEDIA":["BLK_ENT_DET_MSG__ENT_MEDIA~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_PART_DET","BLK_ENT_DET_MSG","BLK_PARTY_TAGS_MSG","BLK_PRORATA_BORR_DET","BLK_PRORATA_PART_DET");
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

ArrFuncOrigin["OLCFFMSG"]="KERNEL";
ArrPrntFunc["OLCFFMSG"]="";
ArrPrntOrigin["OLCFFMSG"]="";
ArrRoutingType["OLCFFMSG"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCFFMSG"]="N";
ArrCustomModified["OLCFFMSG"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_FFMBR":"CONTRACTREFNO~MODULE~PRM_ACTIONCODE~COUNTERPARTY","CVS_PREVIEW":"FFMTREF~CONTREF~ESN","CVS_TAGS":"CONTREF~FFTREF~CPTY~CPTYNAME","CVS_PRORATA":"PRO_CONTREF~PRO_FFMTREF~PRO_CNPTY~PRO_NAME"};
var scrArgSource = {"CVS_PREVIEW":"BLK_FFMBR_MAS_MSG__FFMTREFNO~BLK_FFMBR_MAS_MSG__COUNTERPARTY~BLK_FFMBR_MAS_MSG__ESN","CVS_TAGS":"BLK_PART_DET__BRR_CONTREF~BLK_PART_DET__BRR_FFTREFNO~BLK_PART_DET__BRR_COUNTERPARTY~BLK_PART_DET__BRR_CNPTY_NAME","CVS_PRORATA":"BLK_FFMBR_MAS_MSG__CONTRACTREFNO~BLK_FFMBR_MAS_MSG__FFMTREFNO~BLK_FFMBR_MAS_MSG__COUNTERPARTY~BLK_FFMBR_MAS_MSG__NAME"};
var scrArgVals = {"CVS_FFMBR":"~~~","CVS_PREVIEW":"~~","CVS_TAGS":"~~~","CVS_PRORATA":"~~~"};
var scrArgDest = {"CVS_FFMBR":"BLK_FFMBR_MAS_MSG__CONTRACTREFNO~BLK_FFMBR_MAS_MSG__MSGMODULE~BLK_FFMBR_MAS_MSG__ORIGACTION~BLK_FFMBR_MAS_MSG__NAME","CVS_PREVIEW":"BLK_MSG_PREVIEW_MSG_MAS_MSG__PRVWM_FFMTREF~BLK_MSG_PREVIEW_MSG_MAS_MSG__PRVWM_CONTREF~BLK_MSG_PREVIEW_MSG_MAS_MSG__PRVWM_ESN","CVS_TAGS":"BLK_PARTY_TAG_MAS_MSG__TAGMAS_CONTREF~BLK_PARTY_TAG_MAS_MSG__TAGMAS_FFTREFNO~BLK_PARTY_TAG_MAS_MSG__TAGMAS_CNPTY~BLK_PARTY_TAG_MAS_MSG__TAGMAS_CNPTYNAME","CVS_PRORATA":"BLK_PRORATA_MAS__PROMAS_CONTREF~BLK_PRORATA_MAS__PROMAS_CONTREF~BLK_PRORATA_MAS__PROMAS_CNPTY~BLK_PRORATA_MAS__PROMAS_CNPTYNAME"};
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