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
**  File Name          : TLDCOMRH_SYS.js
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
var fieldNameArray = {"BLK_LBTBS_CMTRED_HOFF_BORR":"TRANSID~AMOUNTNLEAD~ORIGGLOBALAMTNLEAD~PRICE~CCY~AMOUNT~BORROWERREFNO~CUSIPNO~VALUEDATE~REVERSEDGLOBALAMTNLEAD~ORIGGLOBALAMOUNT~SEQUENCENO~HANDOFFSTATUS~PIKFLAG~REVERSDGLOBALAMOUNT~EVENTSEQNO~TXTSEQ~TXTTOTAL~TXTBRANCH~TXTDESK~TXTPOSITIONQUALIFIER~TXTEXPENCECODE~TXTPOSITIONOWNER~TXTCUSIPNO~TXTORGGLOBALAMT~TXTREVSDGLOBALAMT~FACILITYNAME~GLOBALCMTREDAMT~TXTHANDOFFSTAT","BLK_LBTBS_CMTRED_HOFF_SELF":"PARTICIPANTREFNO~BORROWERREFNO~SEQUENCENO~POSITIONIDENTIFIER~CCY~ORIGGLBLAMT~AMT~REVERSDGLOBALAMOUNT"};

var multipleEntryPageSize = {"BLK_LBTBS_CMTRED_HOFF_SELF" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LBTBS_CMTRED_HOFF_SELF"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTBS_CMTRED_HOFF_BORR">TRANSID~AMOUNTNLEAD~ORIGGLOBALAMTNLEAD~PRICE~CCY~AMOUNT~BORROWERREFNO~CUSIPNO~VALUEDATE~REVERSEDGLOBALAMTNLEAD~ORIGGLOBALAMOUNT~SEQUENCENO~HANDOFFSTATUS~PIKFLAG~REVERSDGLOBALAMOUNT~EVENTSEQNO~TXTSEQ~TXTTOTAL~TXTBRANCH~TXTDESK~TXTPOSITIONQUALIFIER~TXTEXPENCECODE~TXTPOSITIONOWNER~TXTCUSIPNO~TXTORGGLOBALAMT~TXTREVSDGLOBALAMT~FACILITYNAME~GLOBALCMTREDAMT~TXTHANDOFFSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_CMTRED_HOFF_BORR" RELATION_TYPE="N" TYPE="BLK_LBTBS_CMTRED_HOFF_SELF">PARTICIPANTREFNO~BORROWERREFNO~SEQUENCENO~POSITIONIDENTIFIER~CCY~ORIGGLBLAMT~AMT~REVERSDGLOBALAMOUNT</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTBS_CMTRED_HOFF_BORR">BORROWERREFNO~EVENTSEQNO~HANDOFFSTATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDCOMRH";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LBTBS_CMTRED_HOFF_BORR";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBTBS_CMTRED_HOFF_BORR" : "","BLK_LBTBS_CMTRED_HOFF_SELF" : "BLK_LBTBS_CMTRED_HOFF_BORR~N"}; 

 var dataSrcLocationArray = new Array("BLK_LBTBS_CMTRED_HOFF_BORR","BLK_LBTBS_CMTRED_HOFF_SELF"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDCOMRH.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDCOMRH.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBTBS_CMTRED_HOFF_BORR__BORROWERREFNO";
pkFields[0] = "BLK_LBTBS_CMTRED_HOFF_BORR__BORROWERREFNO";
queryFields[1] = "BLK_LBTBS_CMTRED_HOFF_BORR__EVENTSEQNO";
pkFields[1] = "BLK_LBTBS_CMTRED_HOFF_BORR__EVENTSEQNO";
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
var lovInfoFlds = {"BLK_LBTBS_CMTRED_HOFF_BORR__BORROWERREFNO__LOV_BWREF":["BLK_LBTBS_CMTRED_HOFF_BORR__BORROWERREFNO~","","N",""],"BLK_LBTBS_CMTRED_HOFF_BORR__EVENTSEQNO__LOV_EVENT":["BLK_LBTBS_CMTRED_HOFF_BORR__EVENTSEQNO~","BLK_LBTBS_CMTRED_HOFF_BORR__BORROWERREFNO!Varchar2","N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_CMTRED_HOFF_SELF");
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

ArrFuncOrigin["TLDCOMRH"]="KERNEL";
ArrPrntFunc["TLDCOMRH"]="";
ArrPrntOrigin["TLDCOMRH"]="";
ArrRoutingType["TLDCOMRH"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDCOMRH"]="N";
ArrCustomModified["TLDCOMRH"]="N";

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