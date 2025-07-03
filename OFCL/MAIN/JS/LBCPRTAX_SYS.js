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
**  File Name          : LBCPRTAX_SYS.js
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
var fieldNameArray = {"BLK_LBCPRTAX":"USERREFNO~PRODUCTCODE~CONTRACTREFNO~EVENTSEQNO~TXT_PROD_DESC~TXT_CUSTOMER~TXT_CUSTOMER_NAME~TXT_FACILITY_NAME~PRODUCTTYPE~VERSIONNO","BLK_MAINTXN":"CONREFNO~CUSTOMER~ESN~SCHEME~WAIVER~SCHEMADESC","BLK_TXNRULE":"BASISAMNTAG~COMPUEVNT~CONREFNO~ESN~RATE~TAXCATY~WAIVER~RULE~TYP","BLK_TXNRULE_DETAIL":"CONREFNO~EFFECTIVEDT~ESN~RULE~AMT~COMPUTATIONDT~CCY~STAT~VALUEDT~RATE","BLK_LBTBS_CONTRACT_PARTICIPANT":"CONTRACTREFNO~NETTINGPREF~SSIMNEMONIC~VALUEDATE~VERSIONNO~CONTRACTTYPE~EVENTSEQNO~OPERATION~SELFPARTICIPATION~SETTLEMENTSEQNO~ASSETRATIO~PARTICIPANT~DRAWDOWNNO~TXT_PARTICIPANT","BLK_LBTBS_CONTRACT_TAX_PREF":"CONTRACTREFNO~TAXRULE~WAIVETAX~PARTICIPANT~VERSIONNO"};

var multipleEntryPageSize = {"BLK_TXNRULE" :"15" ,"BLK_TXNRULE_DETAIL" :"15" ,"BLK_LBTBS_CONTRACT_PARTICIPANT" :"15" ,"BLK_LBTBS_CONTRACT_TAX_PREF" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_PARTTAX__TAB_MAIN":"BLK_TXNRULE~BLK_TXNRULE_DETAIL","CVS_PARTTAX__TAB_PART_TAX":"BLK_LBTBS_CONTRACT_PARTICIPANT~BLK_LBTBS_CONTRACT_TAX_PREF"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBCPRTAX">USERREFNO~PRODUCTCODE~CONTRACTREFNO~EVENTSEQNO~TXT_PROD_DESC~TXT_CUSTOMER~TXT_CUSTOMER_NAME~TXT_FACILITY_NAME~PRODUCTTYPE~VERSIONNO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBCPRTAX" RELATION_TYPE="1" TYPE="BLK_MAINTXN">CONREFNO~CUSTOMER~ESN~SCHEME~WAIVER~SCHEMADESC</FN>'; 
msgxml += '      <FN PARENT="BLK_LBCPRTAX" RELATION_TYPE="N" TYPE="BLK_TXNRULE">BASISAMNTAG~COMPUEVNT~CONREFNO~ESN~RATE~TAXCATY~WAIVER~RULE~TYP</FN>'; 
msgxml += '      <FN PARENT="BLK_TXNRULE" RELATION_TYPE="N" TYPE="BLK_TXNRULE_DETAIL">CONREFNO~EFFECTIVEDT~ESN~RULE~AMT~COMPUTATIONDT~CCY~STAT~VALUEDT~RATE</FN>'; 
msgxml += '      <FN PARENT="BLK_LBCPRTAX" RELATION_TYPE="N" TYPE="BLK_LBTBS_CONTRACT_PARTICIPANT">CONTRACTREFNO~NETTINGPREF~SSIMNEMONIC~VALUEDATE~VERSIONNO~CONTRACTTYPE~EVENTSEQNO~OPERATION~SELFPARTICIPATION~SETTLEMENTSEQNO~ASSETRATIO~PARTICIPANT~DRAWDOWNNO~TXT_PARTICIPANT</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_CONTRACT_PARTICIPANT" RELATION_TYPE="N" TYPE="BLK_LBTBS_CONTRACT_TAX_PREF">CONTRACTREFNO~TAXRULE~WAIVETAX~PARTICIPANT~VERSIONNO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PARTTAX";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBCPRTAX" : "","BLK_MAINTXN" : "BLK_LBCPRTAX~1","BLK_TXNRULE" : "BLK_LBCPRTAX~N","BLK_TXNRULE_DETAIL" : "BLK_TXNRULE~N","BLK_LBTBS_CONTRACT_PARTICIPANT" : "BLK_LBCPRTAX~N","BLK_LBTBS_CONTRACT_TAX_PREF" : "BLK_LBTBS_CONTRACT_PARTICIPANT~N"}; 

 var dataSrcLocationArray = new Array("BLK_LBCPRTAX","BLK_MAINTXN","BLK_TXNRULE","BLK_TXNRULE_DETAIL","BLK_LBTBS_CONTRACT_PARTICIPANT","BLK_LBTBS_CONTRACT_TAX_PREF"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCPRTAX.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCPRTAX.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBCPRTAX__CONTRACTREFNO";
pkFields[0] = "BLK_LBCPRTAX__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LBTBS_CONTRACT_PARTICIPANT":["NETTINGPREF"],"BLK_LBTBS_CONTRACT_TAX_PREF":["CONTRACTREFNO","PARTICIPANT","VERSIONNO","WAIVETAX"],"BLK_MAINTXN":["SCHEME","WAIVER"],"BLK_TXNRULE_DETAIL":["AMT","CCY","COMPUTATIONDTI","EFFECTIVEDT","ESN","STAT"],"BLK_TXNRULE":["BASISAMNTAG","COMPUEVNT","ESN","RATE","WAIVER"]};
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
var multipleEntryIDs = new Array("BLK_TXNRULE","BLK_TXNRULE_DETAIL","BLK_LBTBS_CONTRACT_PARTICIPANT","BLK_LBTBS_CONTRACT_TAX_PREF");
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

ArrFuncOrigin["LBCPRTAX"]="KERNEL";
ArrPrntFunc["LBCPRTAX"]="";
ArrPrntOrigin["LBCPRTAX"]="";
ArrRoutingType["LBCPRTAX"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCPRTAX"]="N";
ArrCustomModified["LBCPRTAX"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PARTTAX":"CONTRACTREFNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_PARTTAX":""};
var scrArgDest = {"CVS_PARTTAX":"BLK_LBCPRTAX__CONTRACTREFNO"};
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