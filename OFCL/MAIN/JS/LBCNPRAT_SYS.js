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
**  File Name          : LBCNPRAT_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_CCYR":"CONTRACTREFNO~TXTPRODUCT~TXTPRODUCTDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTOMERNAME~TXTFACILITYN~TXTTOTALPARTRATIO~CONTCCY~TXTTOTALPARTAMT~LATESTEVENTSEQNO~TXTPRMAMOUNT~LATESTVERSIONNO~TXTVALUEDATE~TXTENTRYSEQNO","BLK_PART_NONPRORATA_RATIO":"CONTREFNO~PARTICIPANT~PRINONPRORATIO~EVENTSEQNO~VALDATE~TXTPARTICIPANT~TXTPARTIAMT~TXTOPERATION","BLK_LBTWS_CONTRACT_PARTICIPANT":"SETTLEMENTSEQNO~OPERATION~ASSETRATIO~VERSIONNO~SELFPARTICIPATION~VALUEDATE~PARTICIPANT~NETTINGPREF~ORIGINATOR~DRAWDOWNNO~SSIMNEMONIC~CONTRREFNO~ENTRSEQNO~CONTRACTYPE~PARTICIPANREFNO~PARTICIPATYPE~BORROWEREFNO~COUNTERPAY~TRANSACTIONPROCESTATUS~CUSTOMERRENO","BLK_LBTWS_PART_SETTLE_CURR_DET":"ENTSEQNO~VALUDATE~SSIMNEMON~DRAWDONO~PARTICIPA~CONREFNO~SETSEQNO~CURRE~CONTRACTYPE","BLK_OLTWS_CONTRACT_ENTITY":"CONTRACTTYP~VADATE~CUSTOMENO~DRAWDONO~REMARK~ENTRSEQNO~CONTRACTRFNO~PRIMARYENTITY~ENTITYID~TXTENTITYNAME"};

var multipleEntryPageSize = {"BLK_PART_NONPRORATA_RATIO" :"15" ,"BLK_LBTWS_PART_SETTLE_CURR_DET" :"15" ,"BLK_OLTWS_CONTRACT_ENTITY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_NONPRO__TAB_MAIN":"BLK_PART_NONPRORATA_RATIO~BLK_LBTWS_PART_SETTLE_CURR_DET~BLK_OLTWS_CONTRACT_ENTITY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_CCYR">CONTRACTREFNO~TXTPRODUCT~TXTPRODUCTDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTOMERNAME~TXTFACILITYN~TXTTOTALPARTRATIO~CONTCCY~TXTTOTALPARTAMT~LATESTEVENTSEQNO~TXTPRMAMOUNT~LATESTVERSIONNO~TXTVALUEDATE~TXTENTRYSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_CCYR" RELATION_TYPE="N" TYPE="BLK_PART_NONPRORATA_RATIO">CONTREFNO~PARTICIPANT~PRINONPRORATIO~EVENTSEQNO~VALDATE~TXTPARTICIPANT~TXTPARTIAMT~TXTOPERATION</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_NONPRORATA_RATIO" RELATION_TYPE="1" TYPE="BLK_LBTWS_CONTRACT_PARTICIPANT">SETTLEMENTSEQNO~OPERATION~ASSETRATIO~VERSIONNO~SELFPARTICIPATION~VALUEDATE~PARTICIPANT~NETTINGPREF~ORIGINATOR~DRAWDOWNNO~SSIMNEMONIC~CONTRREFNO~ENTRSEQNO~CONTRACTYPE~PARTICIPANREFNO~PARTICIPATYPE~BORROWEREFNO~COUNTERPAY~TRANSACTIONPROCESTATUS~CUSTOMERRENO</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_NONPRORATA_RATIO" RELATION_TYPE="N" TYPE="BLK_LBTWS_PART_SETTLE_CURR_DET">ENTSEQNO~VALUDATE~SSIMNEMON~DRAWDONO~PARTICIPA~CONREFNO~SETSEQNO~CURRE~CONTRACTYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_NONPRORATA_RATIO" RELATION_TYPE="N" TYPE="BLK_OLTWS_CONTRACT_ENTITY">CONTRACTTYP~VADATE~CUSTOMENO~DRAWDONO~REMARK~ENTRSEQNO~CONTRACTRFNO~PRIMARYENTITY~ENTITYID~TXTENTITYNAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_NONPRO";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_CCYR" : "","BLK_PART_NONPRORATA_RATIO" : "BLK_OLTBS_CONTRACT_CCYR~N","BLK_LBTWS_CONTRACT_PARTICIPANT" : "BLK_PART_NONPRORATA_RATIO~1","BLK_LBTWS_PART_SETTLE_CURR_DET" : "BLK_PART_NONPRORATA_RATIO~N","BLK_OLTWS_CONTRACT_ENTITY" : "BLK_PART_NONPRORATA_RATIO~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_CCYR","BLK_PART_NONPRORATA_RATIO","BLK_LBTWS_CONTRACT_PARTICIPANT","BLK_LBTWS_PART_SETTLE_CURR_DET","BLK_OLTWS_CONTRACT_ENTITY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCNPRAT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCNPRAT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_CCYR__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_CCYR__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LBTWS_PART_SETTLE_CURR_DET":["CURRE","SSIMNEMON"],"BLK_OLTWS_CONTRACT_ENTITY":["ENTITYID","PRIMARYENTITY","REMARK"],"BLK_PART_NONPRORATA_RATIO":["PARTICIPANT","PRINONPRORATIO","TXTPARTIAMT"]};
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
var lovInfoFlds = {"BLK_PART_NONPRORATA_RATIO__PARTICIPANT__LOV_PARTICIPANT":["BLK_PART_NONPRORATA_RATIO__PARTICIPANT~BLK_PART_NONPRORATA_RATIO__TXTPARTICIPANT~","","N~N",""],"BLK_LBTWS_CONTRACT_PARTICIPANT__SSIMNEMONIC__LOV_SSI_MNEMONIC":["~~~~~~~~","BLK_PART_NONPRORATA_RATIO__PARTICIPANT!VARCHAR2","N~N~N~N~N~N~N~N",""],"BLK_LBTWS_PART_SETTLE_CURR_DET__SSIMNEMON__LOV_SETTLEMNEMONIC":["~~~~~~~BLK_LBTWS_PART_SETTLE_CURR_DET__SSIMNEMON~","BLK_PART_NONPRORATA_RATIO__PARTICIPANT!VARCHAR2","N~N~N~N~N~N~N~N",""],"BLK_LBTWS_PART_SETTLE_CURR_DET__CURRE__LOV_TRANCHE_CURRENCY":["BLK_LBTWS_PART_SETTLE_CURR_DET__CURRE~~","","N~N",""],"BLK_OLTWS_CONTRACT_ENTITY__ENTITYID__LOV_FACILITY_ENTITIES":["BLK_OLTWS_CONTRACT_ENTITY__ENTITYID~BLK_OLTWS_CONTRACT_ENTITY__TXTENTITYNAME~~~~","BLK_PART_NONPRORATA_RATIO__PARTICIPANT!VARCHAR2","N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_PART_NONPRORATA_RATIO","BLK_LBTWS_PART_SETTLE_CURR_DET","BLK_OLTWS_CONTRACT_ENTITY");
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

ArrFuncOrigin["LBCNPRAT"]="KERNEL";
ArrPrntFunc["LBCNPRAT"]="";
ArrPrntOrigin["LBCNPRAT"]="";
ArrRoutingType["LBCNPRAT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCNPRAT"]="N";
ArrCustomModified["LBCNPRAT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_NONPRO":"CONTRACTRFNO~EVENTSEQNO~TXTPRMAMOUNT~LATESTVERSIONNO~TXTVALUEDATE"};
var scrArgSource = {};
var scrArgVals = {"CVS_NONPRO":"~~~~"};
var scrArgDest = {"CVS_NONPRO":"BLK_OLTBS_CONTRACT_CCYR__CONTRACTREFNO~BLK_OLTBS_CONTRACT_CCYR__LATESTEVENTSEQNO~BLK_OLTBS_CONTRACT_CCYR__TXTPRMAMOUNT~BLK_OLTBS_CONTRACT_CCYR__LATESTVERSIONNO~BLK_OLTBS_CONTRACT_CCYR__TXTVALUEDATE"};
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