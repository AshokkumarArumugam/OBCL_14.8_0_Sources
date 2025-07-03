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
**  File Name          : LBDREPRC_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"CONTREFNUMBER~TXTUSERREFNO~LATEVNSEQNO","BLK_CONT_MERG_MASTER":"CONTRACTREFNO~MERGESERIALNO~MERGEVALUEDATE~MERGEBOOKDATE~CONTRACTCCY~COUNTERPARTY~TXTPRODUCT~TXTPRODUCTDESC~TXTCNTRDESC~TXTCCYDESC~TXTPRINCIPALOS~TXTINTERESTOS~SUBSYSSTAT~MERGESTATUS~ECAREQSTATUS","BLK_CONT_MERG_DETAIL":"AMOUNT~SERIALNO~TXTVALUEDATE~TXTCURRENCY~CHILDREFNO~TXTCHUSRREFNO~CONTRACTREFNO~MERGESERIALNO~CHILDSTATUS~MATURITYDATE~LIQDINTEREST~LIQDPRINCIPAL~KEEP_THIS_CONTRACT_ACTIVE","BLK_CONT_MERG_TOTAL":"REMARKS~TXTTOTMERAMOUNT","BLK_EVENT_LOG":"AUTHSTAT~TXNSTAT~EVTSEQNO~CHECKERDTSTAMP~CHECKERID~MAKERDTSTAMP~MAKERID~CONTREFNO~TXTMODNO~TXTREPRICESTATUS~TXTRECORDSTAT"};

var multipleEntryPageSize = {"BLK_CONT_MERG_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_CONT_MERG_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONTREFNUMBER~TXTUSERREFNO~LATEVNSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONT_MERG_MASTER">CONTRACTREFNO~MERGESERIALNO~MERGEVALUEDATE~MERGEBOOKDATE~CONTRACTCCY~COUNTERPARTY~TXTPRODUCT~TXTPRODUCTDESC~TXTCNTRDESC~TXTCCYDESC~TXTPRINCIPALOS~TXTINTERESTOS~SUBSYSSTAT~MERGESTATUS~ECAREQSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONT_MERG_MASTER" RELATION_TYPE="N" TYPE="BLK_CONT_MERG_DETAIL">AMOUNT~SERIALNO~TXTVALUEDATE~TXTCURRENCY~CHILDREFNO~TXTCHUSRREFNO~CONTRACTREFNO~MERGESERIALNO~CHILDSTATUS~MATURITYDATE~LIQDINTEREST~LIQDPRINCIPAL~KEEP_THIS_CONTRACT_ACTIVE</FN>'; 
msgxml += '      <FN PARENT="BLK_CONT_MERG_MASTER" RELATION_TYPE="1" TYPE="BLK_CONT_MERG_TOTAL">REMARKS~TXTTOTMERAMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONT_MERG_MASTER" RELATION_TYPE="1" TYPE="BLK_EVENT_LOG">AUTHSTAT~TXNSTAT~EVTSEQNO~CHECKERDTSTAMP~CHECKERID~MAKERDTSTAMP~MAKERID~CONTREFNO~TXTMODNO~TXTREPRICESTATUS~TXTRECORDSTAT</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRACT_SUMMARY">CONTREFNUMBER~AUTHSTATUS~MERGEVALDD~MERGEBOOKDT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDREPRC";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CONTRACT_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_CONT_MERG_MASTER" : "BLK_CONTRACT~1","BLK_CONT_MERG_DETAIL" : "BLK_CONT_MERG_MASTER~N","BLK_CONT_MERG_TOTAL" : "BLK_CONT_MERG_MASTER~1","BLK_EVENT_LOG" : "BLK_CONT_MERG_MASTER~1"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_CONT_MERG_MASTER","BLK_CONT_MERG_DETAIL","BLK_CONT_MERG_TOTAL","BLK_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDREPRC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDREPRC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONTREFNUMBER";
pkFields[0] = "BLK_CONTRACT__CONTREFNUMBER";
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
var lovInfoFlds = {"BLK_CONTRACT__CONTREFNUMBER__LOV_CONTRACT_MASTER":["BLK_CONTRACT__CONTREFNUMBER~BLK_CONTRACT__TXTUSERREFNO~BLK_CONT_MERG_MASTER__TXTPRODUCT~BLK_CONT_MERG_MASTER__TXTPRODUCTDESC~BLK_CONT_MERG_MASTER__COUNTERPARTY~BLK_CONT_MERG_MASTER__TXTCNTRDESC~BLK_CONT_MERG_MASTER__CONTRACTCCY~BLK_CONT_MERG_MASTER__TXTCCYDESC~BLK_CONT_MERG_MASTER__TXTPRINCIPALOS~","","N~N~N~N~N~N~N~N~N",""],"BLK_CONT_MERG_DETAIL__CHILDREFNO__LOV_CONTRACT_CHILD":["BLK_CONT_MERG_DETAIL__CHILDREFNO~BLK_CONT_MERG_DETAIL__TXTCHUSRREFNO~BLK_CONT_MERG_DETAIL__TXTCURRENCY~BLK_CONT_MERG_DETAIL__AMOUNT~BLK_CONT_MERG_DETAIL__MATURITYDATE~BLK_CONT_MERG_DETAIL__TXTVALUEDATE~","BLK_CONTRACT__CONTREFNUMBER!VARCHAR2~BLK_CONTRACT__CONTREFNUMBER!VARCHAR2~BLK_CONTRACT__CONTREFNUMBER!VARCHAR2~BLK_CONTRACT__CONTREFNUMBER!VARCHAR2~BLK_CONT_MERG_MASTER__MERGEVALUEDATE!DATE~BLK_CONT_MERG_MASTER__MERGEVALUEDATE!DATE~BLK_CONTRACT__CONTREFNUMBER!VARCHAR2~BLK_CONTRACT__CONTREFNUMBER!VARCHAR2~BLK_CONT_MERG_MASTER__MERGESERIALNO!NUMBER~BLK_CONT_MERG_MASTER__COUNTERPARTY!VARCHAR2~BLK_CONT_MERG_MASTER__CONTRACTCCY!VARCHAR2~BLK_CONTRACT__CONTREFNUMBER!VARCHAR2","N~N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CONT_MERG_DETAIL");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("LBCFPMLS~BLK_CONTRACT","LBCADVIC~BLK_CONTRACT"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO = LBTBS_CONT_MEDIA_FOR_ALL_PART.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_GTEMP_EVENT_ADVICE.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LBDREPRC"]="KERNEL";
ArrPrntFunc["LBDREPRC"]="";
ArrPrntOrigin["LBDREPRC"]="";
ArrRoutingType["LBDREPRC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDREPRC"]="N";
ArrCustomModified["LBDREPRC"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"LBCFPMLS":"CONTRACT_REF_NO~EVENT_SEQ_NO","LBCADVIC":"CONTREFNO~EVNTSEQNO"};
var scrArgSource = {"LBCFPMLS":"BLK_CONTRACT__CONTREFNUMBER~BLK_CONTRACT__LATEVNSEQNO","LBCADVIC":"BLK_CONTRACT__CONTREFNUMBER~BLK_CONTRACT__LATEVNSEQNO"};
var scrArgVals = {"LBCFPMLS":"~","LBCADVIC":"~"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"LBCFPMLS":"","LBCADVIC":""};
var dpndntOnSrvs = {"LBCFPMLS":"","LBCADVIC":""};
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