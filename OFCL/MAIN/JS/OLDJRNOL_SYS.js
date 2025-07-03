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
**  File Name          : OLDJRNOL_SYS.js
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
var fieldNameArray = {"BLK_JRNL_LOG":"FCCREF~BATCHNO~REFERENCENO~BRANCHCODE~CCYCD~LCYAMOUNT~AMOUNT~CURRNO~MAKERID~VALUEDATE~TXNCODE~ACCOUNTBRANCH~ACCOUNT~DRCR~INSTRUMENTNO~FINCYCLE~EXCHRATE~CHECKERDTSTAMP~CHECKERID~MAKERDTSTAMP~RECORDSTAT~AUTHSTAT~CARRYOVERADJGROUP~MISGROUP~ACCOUNTNEW~DWACNO~INITIATIONDATE~MISCODE~LCY~RELCUST~PERIODCODE~CRENTTOTAL~DRENTTOTAL~CRCHKTOTAL~DRCHKTOTAL~DESCRIPTION~TYPE~BTBAL~SUBSYSSTAT~FUNDID~ADDLETXT~ACCDESC"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_JRNL_LOG">FCCREF~BATCHNO~REFERENCENO~BRANCHCODE~CCYCD~LCYAMOUNT~AMOUNT~CURRNO~MAKERID~VALUEDATE~TXNCODE~ACCOUNTBRANCH~ACCOUNT~DRCR~INSTRUMENTNO~FINCYCLE~EXCHRATE~CHECKERDTSTAMP~CHECKERID~MAKERDTSTAMP~RECORDSTAT~AUTHSTAT~CARRYOVERADJGROUP~MISGROUP~ACCOUNTNEW~DWACNO~INITIATIONDATE~MISCODE~LCY~RELCUST~PERIODCODE~CRENTTOTAL~DRENTTOTAL~CRCHKTOTAL~DRCHKTOTAL~DESCRIPTION~TYPE~BTBAL~SUBSYSSTAT~FUNDID~ADDLETXT~ACCDESC</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_JRNL_LOG" RELATION_TYPE="1" TYPE="BLK_SUMMARY">FCCREF~BATCHNO~CURRNO~CCY~AMOUNT~LCYAMT~DRCR~ACNO~ACBRN~TXNCD~VALDT~MAKERID~MAKERSTAMP~AUTHSTAT~CHECKERID~CHECKERSTAMP~PRDCODE~FINCYC~EXRATE~INSTNO~RELCUST</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDJRNOL";
var defaultWhereClause = "BRN=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="FCCREF,BATCHNO,CURRNO,CCY,DRCR,ACNO,ACBRN,VALDT,AUTHSTAT";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_JRNL_LOG" : ""}; 

 var dataSrcLocationArray = new Array("BLK_JRNL_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDJRNOL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDJRNOL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_JRNL_LOG__REFERENCENO";
pkFields[0] = "BLK_JRNL_LOG__REFERENCENO";
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
var lovInfoFlds = {"BLK_JRNL_LOG__TXNCODE__LOV_TXN_CODE":["BLK_JRNL_LOG__TXNCODE~~","","N~N",""],"BLK_JRNL_LOG__ACCOUNT__LOV_ACCOUNTNO":["BLK_JRNL_LOG__ACCOUNT~BLK_JRNL_LOG__ACCDESC~BLK_JRNL_LOG__CCYCD~BLK_JRNL_LOG__RELCUST~","__!~__!","N~N~N~N",""],"BLK_JRNL_LOG__MISGROUP__LOV_MIS_GROUP":["BLK_JRNL_LOG__MISGROUP~","","N",""],"BLK_JRNL_LOG__RELCUST__LOV_REL_CUST":["BLK_JRNL_LOG__RELCUST~~","","N~N",""],"BLK_JRNL_LOG__PERIODCODE__LOV_PERIOD_FIN":["BLK_JRNL_LOG__PERIODCODE~BLK_JRNL_LOG__FINCYCLE~","","N~N",""]};
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

 var CallFormArray= new Array("OLCBATOP~BLK_JRNL_LOG","OLCTRMIS~BLK_JRNL_LOG","OLCTRUDF~BLK_JRNL_LOG"); 

 var CallFormRelat=new Array("OLTBS_JRNL_LOG_DE.BATCH_NO =OLTBS_BATCH_MASTER.BATCH_NO","OLTBS_JRNL_LOG_DE.REFERENCE_NO = OLTBS_CONTRACT__MIS.CONTRACT_REF_NO","OLTBS_JRNL_LOG_DE.REFERENCE_NO = OLTBS_CONT_UDF_UPLOAD_DETAIL.CONTRACT_REF_NO AND OLTBS_JRNL_LOG_DE.CURR_NO = OLTBS_CONT_UDF_UPLOAD_DETAIL.EXT_SEQ_NO"); 

 var CallRelatType= new Array("1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDJRNOL"]="KERNEL";
ArrPrntFunc["OLDJRNOL"]="";
ArrPrntOrigin["OLDJRNOL"]="";
ArrRoutingType["OLDJRNOL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDJRNOL"]="N";
ArrCustomModified["OLDJRNOL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCBATOP":"","OLCTRMIS":"CONTREF~ESN~PRDCD~BRNCD","OLCTRUDF":"CONTREFNO~LATVERNO~"};
var scrArgSource = {"OLCBATOP":"","OLCTRMIS":"BLK_JRNL_LOG__REFERENCENO~BLK_JRNL_LOG__CURRNO~BLK_JRNL_LOG__PERIODCODE~BLK_JRNL_LOG__BRANCHCODE","OLCTRUDF":"BLK_JRNL_LOG__REFERENCENO~BLK_JRNL_LOG__CURRNO~"};
var scrArgVals = {"OLCBATOP":"","OLCTRMIS":"~~~","OLCTRUDF":"~~"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCBATOP":"","OLCTRMIS":"","OLCTRUDF":""};
var dpndntOnSrvs = {"OLCBATOP":"","OLCTRMIS":"","OLCTRUDF":""};
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