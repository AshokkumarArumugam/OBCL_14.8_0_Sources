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
**  File Name          : FCDPRMNT_SYS.js
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
var fieldNameArray = {"BLK_PRODUCT":"PRDCD~PRDDESC~PRDGRP~PRDGRPDESC~PRDSLOGAN~PRDREMARKS~PRDSTARTDT~PRDENDDT~MODU~FORMATNAME~PRDTYP~NRMLRTVARI~MAXRTVARI~RTCODEPRFERD~RATETYPPRFERED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_PRDSTAT_MASTER":"PROD~PRODDESC~STAT~STATDESC~STATSEQ~ADVSTAT"};

var multipleEntryPageSize = {"BLK_PRDSTAT_MASTER" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_STATUSMASTER__TAB_MAIN":"BLK_PRDSTAT_MASTER"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRODUCT">PRDCD~PRDDESC~PRDGRP~PRDGRPDESC~PRDSLOGAN~PRDREMARKS~PRDSTARTDT~PRDENDDT~MODU~FORMATNAME~PRDTYP~NRMLRTVARI~MAXRTVARI~RTCODEPRFERD~RATETYPPRFERED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_PRODUCT" RELATION_TYPE="N" TYPE="BLK_PRDSTAT_MASTER">PROD~PRODDESC~STAT~STATDESC~STATSEQ~ADVSTAT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PRODUCT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRODUCT">AUTHSTAT~TXNSTAT~PRDCD~PRDDESC~PRDGRP~PRDSLOGAN~PRDREMARKS~PRDSTARTDT~PRDENDDT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "FCDPRMNT";
var defaultWhereClause = "module = 'FC'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_PRODUCT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PRODUCT" : "","BLK_PRDSTAT_MASTER" : "BLK_PRODUCT~N"}; 

 var dataSrcLocationArray = new Array("BLK_PRODUCT","BLK_PRDSTAT_MASTER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside FCDPRMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside FCDPRMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PRODUCT__PRDCD";
pkFields[0] = "BLK_PRODUCT__PRDCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_PRDSTAT_MASTER":["ADVSTAT","STAT","STATDESC","STATSEQ"],"BLK_PRODUCT":["FORMATNAME","MAXRTVARI","NRMLRTVARI","PRDDESC","PRDENDDTI","PRDGRP","PRDREMARKS","PRDSLOGAN","PRDSTARTDTI","PRDTYP","RATETYPPRFERED","RTCODEPRFERD"]};
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
var lovInfoFlds = {"BLK_PRODUCT__PRDGRP__LOV_GROUPS":["BLK_PRODUCT__PRDGRP~BLK_PRODUCT__PRDGRPDESC~","","N~N",""],"BLK_PRODUCT__FORMATNAME__LOV_FORMAT_NAME":["BLK_PRODUCT__FORMATNAME~~","","N~N",""],"BLK_PRDSTAT_MASTER__STAT__LOV_STATUS":["BLK_PRDSTAT_MASTER__STAT~BLK_PRDSTAT_MASTER__STATDESC~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_PRDSTAT_MASTER");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCACRHM~BLK_PRODUCT","OLCACADD~BLK_PRODUCT","FCCPPREF~BLK_PRODUCT","OLCPRMNT~BLK_PRODUCT","LFCLSFEE~BLK_PRODUCT","LFCROPAR~BLK_PRODUCT","LFCPRDIA~BLK_PRODUCT","OLCPDFDM~BLK_PRODUCT","LFCPRTAX~BLK_PRODUCT","LFCPRACF~BLK_PRODUCT"); 

 var CallFormRelat=new Array("OLTMS_PRODUCT.PRODUCT_CODE = OLTMS_PRODUCT__RH.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=CSTM_PRODUCT__AC.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=LBTMS_FACILITY_PRODUCT.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=OLTMS_PRODUCT__MI.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=CSTMS_PRODUCT_FE.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=OLTMS_PRODUCT.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=OLTMS_PRODUCT__DY.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=CSTM_PRODUCT__CD.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=OLTMS_PRODUCT__TA.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=OLTMS_PRODUCT__AC.PRODUCT_CODE"); 

 var CallRelatType= new Array("1","1","1","1","1","1","1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["FCDPRMNT"]="KERNEL";
ArrPrntFunc["FCDPRMNT"]="";
ArrPrntOrigin["FCDPRMNT"]="";
ArrRoutingType["FCDPRMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["FCDPRMNT"]="N";
ArrCustomModified["FCDPRMNT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_STATUSMASTER":"PRDCD~PRDDESC","OLCACRHM":"MODULE~PRDCD~PRDDESC~PRDTYP~PRD","OLCACADD":"MODULE~PRDCD~PRDDESC~PRDTYP","FCCPPREF":"PRODUCTCODE~PRODUCTDESCRIPTION","OLCPRMNT":"PRDCD","LFCLSFEE":"PROD~PRODDESC~MODU~PRODTYPE","LFCROPAR":"PRODUCT_CODE~PRODUCT_DESCRIPTION","LFCPRDIA":"PRDCD~PRDDESC~MODU~PRDTYP","OLCPDFDM":"PRDCD~PRDDESC","LFCPRTAX":"PRDCD~PRDDESC~MODU~PRDTYP","LFCPRACF":"PRDCD~PRDDESC~MODU~PRDTYP~PRD~"};
var scrArgSource = {"CVS_STATUSMASTER":"BLK_PRODUCT__PRDCD~BLK_PRODUCT__PRDDESC","OLCACRHM":"BLK_PRODUCT__MODU~BLK_PRODUCT__PRDCD~BLK_PRODUCT__PRDDESC~BLK_PRODUCT__PRDTYP~BLK_PRODUCT__PRDCD","OLCACADD":"BLK_PRODUCT__MODU~BLK_PRODUCT__PRDCD~BLK_PRODUCT__PRDDESC~BLK_PRODUCT__PRDTYP","FCCPPREF":"BLK_PRODUCT__PRDCD~BLK_PRODUCT__PRDDESC","OLCPRMNT":"BLK_PRODUCT__PRDCD","LFCLSFEE":"BLK_PRODUCT__PRDCD~BLK_PRODUCT__PRDDESC~BLK_PRODUCT__MODU~BLK_PRODUCT__PRDTYP","LFCROPAR":"BLK_PRODUCT__PRDCD~BLK_PRODUCT__PRDDESC","LFCPRDIA":"BLK_PRODUCT__PRDCD~BLK_PRODUCT__PRDDESC~BLK_PRODUCT__MODU~BLK_PRODUCT__PRDTYP","OLCPDFDM":"BLK_PRODUCT__PRDCD~BLK_PRODUCT__PRDDESC","LFCPRTAX":"BLK_PRODUCT__PRDCD~BLK_PRODUCT__PRDDESC~BLK_PRODUCT__MODU~BLK_PRODUCT__PRDTYP","LFCPRACF":"BLK_PRODUCT__PRDCD~BLK_PRODUCT__PRDDESC~BLK_PRODUCT__MODU~BLK_PRODUCT__PRDTYP~BLK_PRODUCT__PRDCD~"};
var scrArgVals = {"CVS_STATUSMASTER":"~","OLCACRHM":"~~~~","OLCACADD":"~~~","FCCPPREF":"~","OLCPRMNT":"","LFCLSFEE":"~~~","LFCROPAR":"~","LFCPRDIA":"~~~","OLCPDFDM":"~","LFCPRTAX":"~~~","LFCPRACF":"~~~~~"};
var scrArgDest = {"CVS_STATUSMASTER":"BLK_PRODUCT__PRDCDSTATUS~BLK_PRODUCT__PRDCDSTATUSDESC"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCACRHM":"","OLCACADD":"","FCCPPREF":"","OLCPRMNT":"","LFCLSFEE":"","LFCROPAR":"","LFCPRDIA":"","OLCPDFDM":"","LFCPRTAX":"","LFCPRACF":""};
var dpndntOnSrvs = {"OLCACRHM":"","OLCACADD":"","FCCPPREF":"","OLCPRMNT":"","LFCLSFEE":"","LFCROPAR":"","LFCPRDIA":"","OLCPDFDM":"","LFCPRTAX":"","LFCPRACF":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------