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
**  File Name          : LFCPRACF_SYS.js
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
var fieldNameArray = {"BLK_ACCR_FEE_MAS":"PRDCD~PRDDESC~MODU~PRDTYP","BLK_ACCR_FEE":"CMP~STOPASS~ACCRMETH~BASISAMT~ALLOWMETHAMND~MODULE~ALLOWENDDTIN~FEETYPE~PAYMETH~ACCRREQD~DISCACCRAPP~CLPBUYPRICEDIFF~MARKS~DEFERREDINTCOMP~COMPDESC~AC_PRD~ECA_CHK_REQD","BLK_ACCR_FEE_PREF":"REKEYFEEVALDT~REKEYENDDT~REKEYSTST~REKEYFEECURR~REKEYREALISEDAMT~REKEYREFUNDAMT~REKEYFEEAMT~REKEYREQD~ACCRDAY~ACCRMONTH~ACCRFREQ~ACPRF_PRDCD"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "BLK_ACCR_FEE";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ACCR_FEE_MAS">PRDCD~PRDDESC~MODU~PRDTYP</FN>'; 
msgxml += '      <FN PARENT="BLK_ACCR_FEE_MAS" RELATION_TYPE="N" TYPE="BLK_ACCR_FEE">CMP~STOPASS~ACCRMETH~BASISAMT~ALLOWMETHAMND~MODULE~ALLOWENDDTIN~FEETYPE~PAYMETH~ACCRREQD~DISCACCRAPP~CLPBUYPRICEDIFF~MARKS~DEFERREDINTCOMP~COMPDESC~AC_PRD~ECA_CHK_REQD</FN>'; 
msgxml += '      <FN PARENT="BLK_ACCR_FEE_MAS" RELATION_TYPE="1" TYPE="BLK_ACCR_FEE_PREF">REKEYFEEVALDT~REKEYENDDT~REKEYSTST~REKEYFEECURR~REKEYREALISEDAMT~REKEYREFUNDAMT~REKEYFEEAMT~REKEYREQD~ACCRDAY~ACCRMONTH~ACCRFREQ~ACPRF_PRDCD</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ACCR_FEE_MAS" : "","BLK_ACCR_FEE" : "BLK_ACCR_FEE_MAS~N","BLK_ACCR_FEE_PREF" : "BLK_ACCR_FEE_MAS~1"}; 

 var dataSrcLocationArray = new Array("BLK_ACCR_FEE_MAS","BLK_ACCR_FEE","BLK_ACCR_FEE_PREF"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFCPRACF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFCPRACF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ACCR_FEE_MAS__PRDCD";
pkFields[0] = "BLK_ACCR_FEE_MAS__PRDCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_ACCR_FEE_PREF":["ACCRDAY","ACCRFREQ","ACCRMONTH","REKEYENDDT","REKEYFEEAMT","REKEYFEECURR","REKEYFEEVALDT","REKEYREALISEDAMT","REKEYREFUNDAMT","REKEYREQD","REKEYSTST"],"BLK_ACCR_FEE":["ACCRMETH","ACCRREQD","ALLOWENDDTIN","ALLOWMETHAMND","BASISAMT","BTN_DEFAULTCLASS","CLPBUYPRICEDIFF","COMPDESC","DEFERREDINTCOMP","DISCACCRAPP","ECA_CHK_REQD","FEETYPE","MARKS","PAYMETH","STOPASS"]};
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
var lovInfoFlds = {"BLK_ACCR_FEE__CMP__LOV_COMPONENT":["BLK_ACCR_FEE__CMP~~","BLK_ACCR_FEE_MAS__MODU!VARCHAR2","N~N",""]};
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

ArrFuncOrigin["LFCPRACF"]="KERNEL";
ArrPrntFunc["LFCPRACF"]="";
ArrPrntOrigin["LFCPRACF"]="";
ArrRoutingType["LFCPRACF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFCPRACF"]="N";
ArrCustomModified["LFCPRACF"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"PRDCD~PRDDESC~MODU~PRDTYP~PRD"};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":"~~~~"};
var scrArgDest = {"CVS_MAIN":"BLK_ACCR_FEE_MAS__PRDCD~BLK_ACCR_FEE_MAS__PRDDESC~BLK_ACCR_FEE_MAS__MODU~BLK_ACCR_FEE_MAS__PRDTYP~BLK_ACCR_FEE_PREF__ACPRF_PRDCD"};
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