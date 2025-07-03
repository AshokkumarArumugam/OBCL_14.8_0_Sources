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
**  File Name          : OLCETMVW_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT_TLSETLINFO":"LATEST_VERSION_NO~PRODUCT_CODE~CONTRACTREFNO~LATEST_EVENT_SEQ_NO","BLK_SETTLEMENT_INFO":"CONTRACTREFNO~ORDERINGCUSTOMER1~ORDERINGCUSTOMER2~ORDERINGCUSTOMER3~ORDERINGCUSTOMER4~ORDERINGCUSTOMER5~ORDERINGINSTITUTION1~ORDERINGINSTITUTION2~ORDERINGINSTITUTION3~ORDERINGINSTITUTION4~ORDERINGINSTITUTION5~RCVRCORRESP1~RCVRCORRESP2~RCVRCORRESP3~RCVRCORRESP4~RCVRCORRESP5~INTREIMINST1~INTREIMINST2~INTREIMINST3~INTREIMINST4~INTREIMINST5~INTERMEDIARY1~INTERMEDIARY2~INTERMEDIARY3~INTERMEDIARY4~INTERMEDIARY5~ACCWITHINSTN1~ACCWITHINSTN2~ACCWITHINSTN3~ACCWITHINSTN4~ACCWITHINSTN5~BENEFINSTITUTION1~BENEFINSTITUTION2~BENEFINSTITUTION3~BENEFINSTITUTION4~BENEFINSTITUTION5~ULTBENEFICIARY1~ULTBENEFICIARY2~ULTBENEFICIARY3~ULTBENEFICIARY4~ULTBENEFICIARY5~CHARGESDETAILS~COVERREQUIRED~PAYMENTDETAILS1~PAYMENTDETAILS2~PAYMENTDETAILS3~PAYMENTDETAILS4~SNDRTORCVRINFO1~SNDRTORCVRINFO2~SNDRTORCVRINFO3~SNDRTORCVRINFO4~SNDRTORCVRINFO5~SNDRTORCVRINFO6~INSTRUMENTNO~INSTRUMENTTYPE~PAYMENTBY~ACCOUNT~ACCBRANCH~ACCCCY~AMOUNTTAG~EVENTSEQNO~GENMESSAGE~PAYRECEIVE~RECEIVER~SETTLEMENT_AMT~TAGCCY~TXT_PAYRECEIVE~TXT_PAYMENTBY"};

var multipleEntryPageSize = {"BLK_SETTLEMENT_INFO" :"15" };

var multipleEntrySVBlocks = "BLK_SETTLEMENT_INFO";

var tabMEBlks = {"CVS_SETTLEMENTINFO__TAB_MAIN":"BLK_SETTLEMENT_INFO"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT_TLSETLINFO">LATEST_VERSION_NO~PRODUCT_CODE~CONTRACTREFNO~LATEST_EVENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_TLSETLINFO" RELATION_TYPE="N" TYPE="BLK_SETTLEMENT_INFO">CONTRACTREFNO~ORDERINGCUSTOMER1~ORDERINGCUSTOMER2~ORDERINGCUSTOMER3~ORDERINGCUSTOMER4~ORDERINGCUSTOMER5~ORDERINGINSTITUTION1~ORDERINGINSTITUTION2~ORDERINGINSTITUTION3~ORDERINGINSTITUTION4~ORDERINGINSTITUTION5~RCVRCORRESP1~RCVRCORRESP2~RCVRCORRESP3~RCVRCORRESP4~RCVRCORRESP5~INTREIMINST1~INTREIMINST2~INTREIMINST3~INTREIMINST4~INTREIMINST5~INTERMEDIARY1~INTERMEDIARY2~INTERMEDIARY3~INTERMEDIARY4~INTERMEDIARY5~ACCWITHINSTN1~ACCWITHINSTN2~ACCWITHINSTN3~ACCWITHINSTN4~ACCWITHINSTN5~BENEFINSTITUTION1~BENEFINSTITUTION2~BENEFINSTITUTION3~BENEFINSTITUTION4~BENEFINSTITUTION5~ULTBENEFICIARY1~ULTBENEFICIARY2~ULTBENEFICIARY3~ULTBENEFICIARY4~ULTBENEFICIARY5~CHARGESDETAILS~COVERREQUIRED~PAYMENTDETAILS1~PAYMENTDETAILS2~PAYMENTDETAILS3~PAYMENTDETAILS4~SNDRTORCVRINFO1~SNDRTORCVRINFO2~SNDRTORCVRINFO3~SNDRTORCVRINFO4~SNDRTORCVRINFO5~SNDRTORCVRINFO6~INSTRUMENTNO~INSTRUMENTTYPE~PAYMENTBY~ACCOUNT~ACCBRANCH~ACCCCY~AMOUNTTAG~EVENTSEQNO~GENMESSAGE~PAYRECEIVE~RECEIVER~SETTLEMENT_AMT~TAGCCY~TXT_PAYRECEIVE~TXT_PAYMENTBY</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_SETTLEMENTINFO";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT_TLSETLINFO" : "","BLK_SETTLEMENT_INFO" : "BLK_CONTRACT_TLSETLINFO~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT_TLSETLINFO","BLK_SETTLEMENT_INFO"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCETMVW.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCETMVW.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT_TLSETLINFO__CONTRACTREFNO";
pkFields[0] = "BLK_CONTRACT_TLSETLINFO__CONTRACTREFNO";
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
var multipleEntryIDs = new Array("BLK_SETTLEMENT_INFO");
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

ArrFuncOrigin["OLCETMVW"]="KERNEL";
ArrPrntFunc["OLCETMVW"]="";
ArrPrntOrigin["OLCETMVW"]="";
ArrRoutingType["OLCETMVW"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCETMVW"]="N";
ArrCustomModified["OLCETMVW"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_SETTLEMENTINFO":"CONTRACTREFNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_SETTLEMENTINFO":""};
var scrArgDest = {"CVS_SETTLEMENTINFO":"BLK_CONTRACT_TLSETLINFO__CONTRACTREFNO"};
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