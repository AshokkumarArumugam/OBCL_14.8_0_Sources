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
**  File Name          : GWDAMDMT_SYS.js
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
var fieldNameArray = {"BLK_GWTM_AMEND_MASTER":"ORGSYS~EXTSYS~SRCOPRTN~SRVCNM~OPRCD~RDFID~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_GWTM_AMEND_NODES":"ORGSYS~EXTSYS~SRCOPR~NDNAME~NWALLWD~DLALLWD~ALRCRDS","BLK_GWTM_AMEND_FIELDS":"ORGSYS~EXTSYS~SRCOPR~NDNAM~FLDNAM"};

var multipleEntryPageSize = {"BLK_GWTM_AMEND_NODES" :"15" ,"BLK_GWTM_AMEND_FIELDS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_GWTM_AMEND_NODES~BLK_GWTM_AMEND_FIELDS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_GWTM_AMEND_MASTER">ORGSYS~EXTSYS~SRCOPRTN~SRVCNM~OPRCD~RDFID~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_GWTM_AMEND_MASTER" RELATION_TYPE="N" TYPE="BLK_GWTM_AMEND_NODES">ORGSYS~EXTSYS~SRCOPR~NDNAME~NWALLWD~DLALLWD~ALRCRDS</FN>'; 
msgxml += '      <FN PARENT="BLK_GWTM_AMEND_NODES" RELATION_TYPE="N" TYPE="BLK_GWTM_AMEND_FIELDS">ORGSYS~EXTSYS~SRCOPR~NDNAM~FLDNAM</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_GWTM_AMEND_MASTER">AUTHSTAT~TXNSTAT~EXTSYS~ORGSYS~SRCOPRTN</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "GWDAMDMT";
var defaultWhereClause = "";
var defaultOrderByClause ="EXT_SYSTEM,ORIGIN_SYSTEM,SOURCE_OPERATION";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_GWTM_AMEND_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_GWTM_AMEND_MASTER" : "","BLK_GWTM_AMEND_NODES" : "BLK_GWTM_AMEND_MASTER~N","BLK_GWTM_AMEND_FIELDS" : "BLK_GWTM_AMEND_NODES~N"}; 

 var dataSrcLocationArray = new Array("BLK_GWTM_AMEND_MASTER","BLK_GWTM_AMEND_NODES","BLK_GWTM_AMEND_FIELDS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside GWDAMDMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside GWDAMDMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_GWTM_AMEND_MASTER__EXTSYS";
pkFields[0] = "BLK_GWTM_AMEND_MASTER__EXTSYS";
queryFields[1] = "BLK_GWTM_AMEND_MASTER__SRCOPRTN";
pkFields[1] = "BLK_GWTM_AMEND_MASTER__SRCOPRTN";
queryFields[2] = "BLK_GWTM_AMEND_MASTER__ORGSYS";
pkFields[2] = "BLK_GWTM_AMEND_MASTER__ORGSYS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_GWTM_AMEND_FIELDS":["FLDNAM","NDNAM"],"BLK_GWTM_AMEND_NODES":["ALRCRDS","DLALLWD","NDNAME","NWALLWD"]};
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
var lovInfoFlds = {"BLK_GWTM_AMEND_MASTER__ORGSYS__LOV_ORIGIN_SYSTEM":["BLK_GWTM_AMEND_MASTER__ORGSYS~","","N",""],"BLK_GWTM_AMEND_MASTER__EXTSYS__LOV_EXT":["BLK_GWTM_AMEND_MASTER__EXTSYS~","","N",""],"BLK_GWTM_AMEND_MASTER__SRVCNM__LOV_SERVICE":["BLK_GWTM_AMEND_MASTER__SRVCNM~","","N",""],"BLK_GWTM_AMEND_MASTER__OPRCD__LOV_OPERATION":["BLK_GWTM_AMEND_MASTER__OPRCD~BLK_GWTM_AMEND_MASTER__RDFID~~","BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2","N~N~N",""],"BLK_GWTM_AMEND_NODES__NDNAME__LOV_NODE":["BLK_GWTM_AMEND_NODES__NDNAME~","BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2","N",""],"BLK_GWTM_AMEND_FIELDS__FLDNAM__LOV_FIELD_NAME":["BLK_GWTM_AMEND_FIELDS__FLDNAM~","BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_NODES__NDNAME!VARCHAR2~BLK_GWTM_AMEND_NODES__NDNAME!VARCHAR2~BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2~BLK_GWTM_AMEND_MASTER__SRVCNM!VARCHAR2~BLK_GWTM_AMEND_MASTER__OPRCD!VARCHAR2","N",""]};
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
var multipleEntryIDs = new Array("BLK_GWTM_AMEND_NODES","BLK_GWTM_AMEND_FIELDS");
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

ArrFuncOrigin["GWDAMDMT"]="KERNEL";
ArrPrntFunc["GWDAMDMT"]="";
ArrPrntOrigin["GWDAMDMT"]="";
ArrRoutingType["GWDAMDMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["GWDAMDMT"]="N";
ArrCustomModified["GWDAMDMT"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------