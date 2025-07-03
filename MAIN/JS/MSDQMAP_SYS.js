/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
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
**  File Name          : MSDQMAP_SYS.js
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
var fieldNameArray = {"BLK_MSTBS_INCOMING_ROUTING":"FLDMEDIA~MSGTYP~BRN~QUE~BICCOD~CURR~BRNCODE~BRNNAME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSTBS_INCOMING_ROUTING">FLDMEDIA~MSGTYP~BRN~QUE~BICCOD~CURR~BRNCODE~BRNNAME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSTBS_INCOMING_ROUTING">AUTHSTAT~TXNSTAT~FLDMEDIA~MSGTYP~BICCOD~CURR</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "MSDQMAP";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MSTBS_INCOMING_ROUTING";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MSTBS_INCOMING_ROUTING" : ""}; 

 var dataSrcLocationArray = new Array("BLK_MSTBS_INCOMING_ROUTING"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside MSDQMAP.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside MSDQMAP.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MSTBS_INCOMING_ROUTING__BICCOD";
pkFields[0] = "BLK_MSTBS_INCOMING_ROUTING__BICCOD";
queryFields[1] = "BLK_MSTBS_INCOMING_ROUTING__MSGTYP";
pkFields[1] = "BLK_MSTBS_INCOMING_ROUTING__MSGTYP";
queryFields[2] = "BLK_MSTBS_INCOMING_ROUTING__FLDMEDIA";
pkFields[2] = "BLK_MSTBS_INCOMING_ROUTING__FLDMEDIA";
queryFields[3] = "BLK_MSTBS_INCOMING_ROUTING__CURR";
pkFields[3] = "BLK_MSTBS_INCOMING_ROUTING__CURR";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_MSTBS_INCOMING_ROUTING":["BRN","QUE"]};
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
var lovInfoFlds = {"BLK_MSTBS_INCOMING_ROUTING__FLDMEDIA__LOV_MEDIA":["BLK_MSTBS_INCOMING_ROUTING__FLDMEDIA~~","","N~N",""],"BLK_MSTBS_INCOMING_ROUTING__MSGTYP__LOV_MSG_TYPE":["BLK_MSTBS_INCOMING_ROUTING__MSGTYP~~","","N~N",""],"BLK_MSTBS_INCOMING_ROUTING__BRN__LOV_BRANCH":["BLK_MSTBS_INCOMING_ROUTING__BRN~BLK_MSTBS_INCOMING_ROUTING__BRNNAME~","","N~N",""],"BLK_MSTBS_INCOMING_ROUTING__QUE__LOV_QUEUE":["BLK_MSTBS_INCOMING_ROUTING__QUE~~","","N~N",""],"BLK_MSTBS_INCOMING_ROUTING__BICCOD__LOV_BIC_CODE":["BLK_MSTBS_INCOMING_ROUTING__BICCOD~~","","N~N",""],"BLK_MSTBS_INCOMING_ROUTING__CURR__LOV_CCY":["BLK_MSTBS_INCOMING_ROUTING__CURR~~","","N~N",""]};
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

 var CallFormArray= new Array("CSCFNUDF~BLK_MSTBS_INCOMING_ROUTING"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["MSDQMAP"]="KERNEL";
ArrPrntFunc["MSDQMAP"]="";
ArrPrntOrigin["MSDQMAP"]="";
ArrRoutingType["MSDQMAP"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["MSDQMAP"]="N";
ArrCustomModified["MSDQMAP"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CSCFNUDF":""};
var scrArgSource = {"CSCFNUDF":""};
var scrArgVals = {"CSCFNUDF":""};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"CSCFNUDF":""};
var dpndntOnSrvs = {"CSCFNUDF":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------