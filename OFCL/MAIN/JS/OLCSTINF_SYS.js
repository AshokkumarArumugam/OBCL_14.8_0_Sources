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
**  File Name          : OLCSTINF_SYS.js
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
var fieldNameArray = {"BLK_SETTLEMENT_INFO":"CONTRACTREFNO~ORDERINGCUSTOMER1~ORDERINGCUSTOMER2~ORDERINGCUSTOMER3~ORDERINGCUSTOMER4~ORDERINGCUSTOMER5~ORDERINGINSTITUTION1~ORDERINGINSTITUTION2~ORDERINGINSTITUTION3~ORDERINGINSTITUTION4~ORDERINGINSTITUTION5~RCVRCORRESP1~RCVRCORRESP2~RCVRCORRESP3~RCVRCORRESP4~RCVRCORRESP5~INTREIMINST1~INTREIMINST2~INTREIMINST3~INTREIMINST4~INTREIMINST5~INTERMEDIARY1~INTERMEDIARY2~INTERMEDIARY3~INTERMEDIARY4~INTERMEDIARY5~ACCWITHINSTN1~ACCWITHINSTN2~ACCWITHINSTN3~ACCWITHINSTN4~ACCWITHINSTN5~BENEFINSTITUTION1~BENEFINSTITUTION2~BENEFINSTITUTION3~BENEFINSTITUTION4~BENEFINSTITUTION5~ULTBENEFICIARY1~ULTBENEFICIARY2~ULTBENEFICIARY3~ULTBENEFICIARY4~ULTBENEFICIARY5~CHARGESDETAILS~COVERREQUIRED~PAYMENTDETAILS1~PAYMENTDETAILS2~PAYMENTDETAILS3~PAYMENTDETAILS4~SNDRTORCVRINFO1~SNDRTORCVRINFO2~SNDRTORCVRINFO3~SNDRTORCVRINFO4~SNDRTORCVRINFO5~SNDRTORCVRINFO6~INSTRUMENTTYPE~INSTRUMENTNO~PAYMENTBY~TXT_PAYMENTBY~RECEIVER","BLK_SETTLEMENT_INFO_AS":"CONTRACTREFNO~AMOUNTTAG~TAGCCY~ACCBRANCH~ACCOUNT~ACCCCY~GENMESSAGE~PAYRECEIVE~TXT_PAYRECEIVE","BLK_SETTLEMENT_INFO_DET":"ACCOUNT~ACC_BRANCH~ACC_CCY~ACC_WITH_INSTN1~ACC_WITH_INSTN2~ACC_WITH_INSTN3~ACC_WITH_INSTN4~ACC_WITH_INSTN5~AMOUNT_TAG~AMOUNT_TAG_TYPE~BENEF_INSTITUTION1~BENEF_INSTITUTION2~BENEF_INSTITUTION3~BENEF_INSTITUTION4~BENEF_INSTITUTION5~CCY_RESTRICTION~CHANGE_AC~CHANGE_RATE~CHARGES_DETAILS~CONTRACT_REF_NO~COVER_REQUIRED~ERI_AMOUNT~ERI_CCY~EVENT_SEQ_NO~EXT_PARTY_ACCOUNT~EXT_PARTY_BIC~EXT_PARTY_NAME~EX_RATE~EX_RATE_FLAG~GEN_MESSAGE~IBAN_AC_NO~INSTRUMENT_NO~INSTRUMENT_TYPE~INTERMEDIARY1~INTERMEDIARY2~INTERMEDIARY3~INTERMEDIARY4~INTERMEDIARY5~INT_REIM_INST1~INT_REIM_INST2~INT_REIM_INST3~INT_REIM_INST4~INT_REIM_INST5~MIN_EVENT_SEQ_NO~NETTING_INDICATOR~ORDERING_CUSTOMER1~ORDERING_CUSTOMER2~ORDERING_CUSTOMER3~ORDERING_CUSTOMER4~ORDERING_CUSTOMER5~ORDERING_INSTITUTION1~ORDERING_INSTITUTION2~ORDERING_INSTITUTION3~ORDERING_INSTITUTION4~ORDERING_INSTITUTION5~OUR_CORRESPONDENT~PARTY_INFO_ALLOWED~PAYMENT_BY~PAYMENT_DETAILS1~PAYMENT_DETAILS2~PAYMENT_DETAILS3~PAYMENT_DETAILS4~PAY_RECEIVE~RATE_CODE_PREFERRED~RCVR_CORRESP1~RCVR_CORRESP2~RCVR_CORRESP3~RCVR_CORRESP4~RCVR_CORRESP5~RECEIVER~ROW_ID~SEND_MESG~SETTLEMENT_AMT~SNDR_TO_RCVR_INFO1~SNDR_TO_RCVR_INFO2~SNDR_TO_RCVR_INFO3~SNDR_TO_RCVR_INFO4~SNDR_TO_RCVR_INFO5~SNDR_TO_RCVR_INFO6~TAG_CCY~TRANSFER_TYPE~ULT_BENEFICIARY1~ULT_BENEFICIARY2~ULT_BENEFICIARY3~ULT_BENEFICIARY4~ULT_BENEFICIARY5~VALUE_DATE~VERSION_FLAG~TXT_PAYMENTBY"};

var multipleEntryPageSize = {"BLK_SETTLEMENT_INFO_AS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_SETTLEMENTINFO__TAB_MAIN":"BLK_SETTLEMENT_INFO_AS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_SETTLEMENT_INFO">CONTRACTREFNO~ORDERINGCUSTOMER1~ORDERINGCUSTOMER2~ORDERINGCUSTOMER3~ORDERINGCUSTOMER4~ORDERINGCUSTOMER5~ORDERINGINSTITUTION1~ORDERINGINSTITUTION2~ORDERINGINSTITUTION3~ORDERINGINSTITUTION4~ORDERINGINSTITUTION5~RCVRCORRESP1~RCVRCORRESP2~RCVRCORRESP3~RCVRCORRESP4~RCVRCORRESP5~INTREIMINST1~INTREIMINST2~INTREIMINST3~INTREIMINST4~INTREIMINST5~INTERMEDIARY1~INTERMEDIARY2~INTERMEDIARY3~INTERMEDIARY4~INTERMEDIARY5~ACCWITHINSTN1~ACCWITHINSTN2~ACCWITHINSTN3~ACCWITHINSTN4~ACCWITHINSTN5~BENEFINSTITUTION1~BENEFINSTITUTION2~BENEFINSTITUTION3~BENEFINSTITUTION4~BENEFINSTITUTION5~ULTBENEFICIARY1~ULTBENEFICIARY2~ULTBENEFICIARY3~ULTBENEFICIARY4~ULTBENEFICIARY5~CHARGESDETAILS~COVERREQUIRED~PAYMENTDETAILS1~PAYMENTDETAILS2~PAYMENTDETAILS3~PAYMENTDETAILS4~SNDRTORCVRINFO1~SNDRTORCVRINFO2~SNDRTORCVRINFO3~SNDRTORCVRINFO4~SNDRTORCVRINFO5~SNDRTORCVRINFO6~INSTRUMENTTYPE~INSTRUMENTNO~PAYMENTBY~TXT_PAYMENTBY~RECEIVER</FN>'; 
msgxml += '      <FN PARENT="BLK_SETTLEMENT_INFO" RELATION_TYPE="N" TYPE="BLK_SETTLEMENT_INFO_AS">CONTRACTREFNO~AMOUNTTAG~TAGCCY~ACCBRANCH~ACCOUNT~ACCCCY~GENMESSAGE~PAYRECEIVE~TXT_PAYRECEIVE</FN>'; 
msgxml += '      <FN PARENT="BLK_SETTLEMENT_INFO_AS" RELATION_TYPE="N" TYPE="BLK_SETTLEMENT_INFO_DET">ACCOUNT~ACC_BRANCH~ACC_CCY~ACC_WITH_INSTN1~ACC_WITH_INSTN2~ACC_WITH_INSTN3~ACC_WITH_INSTN4~ACC_WITH_INSTN5~AMOUNT_TAG~AMOUNT_TAG_TYPE~BENEF_INSTITUTION1~BENEF_INSTITUTION2~BENEF_INSTITUTION3~BENEF_INSTITUTION4~BENEF_INSTITUTION5~CCY_RESTRICTION~CHANGE_AC~CHANGE_RATE~CHARGES_DETAILS~CONTRACT_REF_NO~COVER_REQUIRED~ERI_AMOUNT~ERI_CCY~EVENT_SEQ_NO~EXT_PARTY_ACCOUNT~EXT_PARTY_BIC~EXT_PARTY_NAME~EX_RATE~EX_RATE_FLAG~GEN_MESSAGE~IBAN_AC_NO~INSTRUMENT_NO~INSTRUMENT_TYPE~INTERMEDIARY1~INTERMEDIARY2~INTERMEDIARY3~INTERMEDIARY4~INTERMEDIARY5~INT_REIM_INST1~INT_REIM_INST2~INT_REIM_INST3~INT_REIM_INST4~INT_REIM_INST5~MIN_EVENT_SEQ_NO~NETTING_INDICATOR~ORDERING_CUSTOMER1~ORDERING_CUSTOMER2~ORDERING_CUSTOMER3~ORDERING_CUSTOMER4~ORDERING_CUSTOMER5~ORDERING_INSTITUTION1~ORDERING_INSTITUTION2~ORDERING_INSTITUTION3~ORDERING_INSTITUTION4~ORDERING_INSTITUTION5~OUR_CORRESPONDENT~PARTY_INFO_ALLOWED~PAYMENT_BY~PAYMENT_DETAILS1~PAYMENT_DETAILS2~PAYMENT_DETAILS3~PAYMENT_DETAILS4~PAY_RECEIVE~RATE_CODE_PREFERRED~RCVR_CORRESP1~RCVR_CORRESP2~RCVR_CORRESP3~RCVR_CORRESP4~RCVR_CORRESP5~RECEIVER~ROW_ID~SEND_MESG~SETTLEMENT_AMT~SNDR_TO_RCVR_INFO1~SNDR_TO_RCVR_INFO2~SNDR_TO_RCVR_INFO3~SNDR_TO_RCVR_INFO4~SNDR_TO_RCVR_INFO5~SNDR_TO_RCVR_INFO6~TAG_CCY~TRANSFER_TYPE~ULT_BENEFICIARY1~ULT_BENEFICIARY2~ULT_BENEFICIARY3~ULT_BENEFICIARY4~ULT_BENEFICIARY5~VALUE_DATE~VERSION_FLAG~TXT_PAYMENTBY</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_SETTLEMENTINFO";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_SETTLEMENT_INFO" : "","BLK_SETTLEMENT_INFO_AS" : "BLK_SETTLEMENT_INFO~N","BLK_SETTLEMENT_INFO_DET" : "BLK_SETTLEMENT_INFO_AS~N"}; 

 var dataSrcLocationArray = new Array("BLK_SETTLEMENT_INFO","BLK_SETTLEMENT_INFO_AS","BLK_SETTLEMENT_INFO_DET"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCSTINF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCSTINF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_SETTLEMENT_INFO__CONTRACTREFNO";
pkFields[0] = "BLK_SETTLEMENT_INFO__CONTRACTREFNO";
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
var lovInfoFlds = {};
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
var multipleEntryIDs = new Array("BLK_SETTLEMENT_INFO_AS");
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

ArrFuncOrigin["OLCSTINF"]="KERNEL";
ArrPrntFunc["OLCSTINF"]="";
ArrPrntOrigin["OLCSTINF"]="";
ArrRoutingType["OLCSTINF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCSTINF"]="N";
ArrCustomModified["OLCSTINF"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_SETTLEMENTINFO":"CONTRACTREFNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_SETTLEMENTINFO":""};
var scrArgDest = {"CVS_SETTLEMENTINFO":"BLK_SETTLEMENT_INFO__CONTRACTREFNO"};
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