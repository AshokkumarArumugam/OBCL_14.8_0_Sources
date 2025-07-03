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
**  File Name          : TLDBRKFN_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_CFDET":"CONTRACTREFNO~EVENTSEQNO~TXTUSERTRAREFNO~TXTBRANCH~TXTDESKCODE~TXTEXPENSECODE~TXTPORTFOLIO~TXTPORTFOLIODESC~TXTPOSIDENTIFIER~TXTPOSQUALIFIER~TXTCUSIP~TXTTICKETID~TXTSWAPID","BLK_TLVW_BFF_FEE_DETAIL":"FEEAMOUNT~COMPONENTCCY~COMPONENT~CONTRACTREFNO","BLK_TLVW_BFF_COMPUTATION_DETAIL":"RATE~CCY~AGENCYREFNO~DIFFERENTIALAMOUNT~ENDDATE~BASISAMOUNT~CONTRACTREFNO~STARTDATE~COMPONENT"};

var multipleEntryPageSize = {"BLK_TLVW_BFF_FEE_DETAIL" :"15" ,"BLK_TLVW_BFF_COMPUTATION_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_BRKFN__TAB_MAIN":"BLK_TLVW_BFF_FEE_DETAIL~BLK_TLVW_BFF_COMPUTATION_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_CFDET">CONTRACTREFNO~EVENTSEQNO~TXTUSERTRAREFNO~TXTBRANCH~TXTDESKCODE~TXTEXPENSECODE~TXTPORTFOLIO~TXTPORTFOLIODESC~TXTPOSIDENTIFIER~TXTPOSQUALIFIER~TXTCUSIP~TXTTICKETID~TXTSWAPID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_CFDET" RELATION_TYPE="N" TYPE="BLK_TLVW_BFF_FEE_DETAIL">FEEAMOUNT~COMPONENTCCY~COMPONENT~CONTRACTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_TLVW_BFF_FEE_DETAIL" RELATION_TYPE="N" TYPE="BLK_TLVW_BFF_COMPUTATION_DETAIL">RATE~CCY~AGENCYREFNO~DIFFERENTIALAMOUNT~ENDDATE~BASISAMOUNT~CONTRACTREFNO~STARTDATE~COMPONENT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_BRKFN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_CFDET">CONTRACTREFNO~EVENTSEQNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDBRKFN";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =1;
var g_SummaryBlock ="BLK_OLTBS_CONTRACT_CFDET";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_CFDET" : "","BLK_TLVW_BFF_FEE_DETAIL" : "BLK_OLTBS_CONTRACT_CFDET~N","BLK_TLVW_BFF_COMPUTATION_DETAIL" : "BLK_TLVW_BFF_FEE_DETAIL~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_CFDET","BLK_TLVW_BFF_FEE_DETAIL","BLK_TLVW_BFF_COMPUTATION_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDBRKFN.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDBRKFN.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_CFDET__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_CFDET__CONTRACTREFNO";
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
var multipleEntryIDs = new Array("BLK_TLVW_BFF_FEE_DETAIL","BLK_TLVW_BFF_COMPUTATION_DETAIL");
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

ArrFuncOrigin["TLDBRKFN"]="KERNEL";
ArrPrntFunc["TLDBRKFN"]="";
ArrPrntOrigin["TLDBRKFN"]="";
ArrRoutingType["TLDBRKFN"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDBRKFN"]="N";
ArrCustomModified["TLDBRKFN"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_BRKFN":"CONTRACTREFNO~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_BRKFN":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_BRKFN":"BLK_OLTBS_CONTRACT_CFDET__CONTRACTREFNO~"};
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