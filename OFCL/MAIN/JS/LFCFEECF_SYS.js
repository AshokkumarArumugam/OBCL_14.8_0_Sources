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
**  File Name          : LFCFEECF_SYS.js
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
var fieldNameArray = {"BLK_CONTROL_FEE":"CONTREFNO~PRODDESC~PRODCD~PRODTYPE~USERREFNO~CUSTOMER~CUSTANME~FACILITYNAME~COMP~EVESEQN~TXTPFEECMP~TXTPFEECCY~TXTPFEESCHDAT","BLK_LFTBS_CONTRACT_FEE_MULTI":"CONTRANUM~COMPONENT~ESNUM~DISCACCRAPPLICABLE~BILLINGNOTICEDAYS~INTERESTBASIS~BILLINGNOTICEREQUIRED~LIQDPREFERENCE~ENDDATE~STARTDATE~CCY~FEERULE~ASSOCIATIONDATE~FEEREVERSED~COMPSTATUS~TOTALACCRUALAMOUNT~TILLDATEACCRUAL~COMPSTAT~TXTAGYFEE~TXTPFEE~TXTFAS91~TXTRATIO~FEECOLLECTIONMODE~FEE_PERIOD_BASIS~ACQUIRED_FEE","BLK_OLVWS_STP_GET_AGENCY_FEE_RATE":"PARTICIPANT~PARTREFNO~LDREFNO~LSREFNO~INTERESTBASIS~LDCOMPONENT~LSCOMPONENT","BLK_OLVES_STP_GET_AGENCY_FEE_RATE__MULTI":"FEERATE~CCY~TOBASISAMT~FROMBASISAMT~EFFECTIVEDATE","BLK_PFEE":"PFEEESN~PFEECOMP~PFEECONTREFNO~PFEEPART~TXTTOTPFEE~PFEESCHDT~TXTPFEECURRENCY","BLK_LFTBS_CONTRACT_PARTDRIVEN_FEE_MULTI":"FEEAMT~CONRE~CMP~EVESNO~PARTI~TXTPARTNAME~TXTPFEEAMT~SCHDAT","BLK_FAS91FEE":"FASREFNO~FASCOMP~FASESNO~FASCUSTNO~TXTFASCURR~TXTTOTFASFACAMT~TXTTOTFASMGMTCOMP~TXTTOTFASYIELDADJCOMP~TXTFASTOTCITIFEES~TXTFASTOTNONCITIFEES~TXTFASFEESTORECOGNIZE~TXTFASFEESTOAMORTIZE~TXTFASFEESTOWAVERAGEYIELD","BLK_LFTBS_FAS91_FEE_MASTER":"CONTRE~EVESN~COMPON~PASSACCTENTRY~WTDAVERAGEYIELD~FEESTOAMORTIZE~FEESTORECOGNIZE~TOTALCITIFEES~TOTALNONCITIFEES~ORIGINATOR~ORIGINATORMISCODE~TXTFESHPRDDESC~TXTFESHCONTREFNO~TXTFESHUSERREFNO~TXTFESHCUSTNAME~TXTFESHFACNAME~TXTFESHFEECOMP~TXTFESHTOTRATIO~TXTRATCONTREFNO~TXTRATUSERREFNO~TXTRATPRDCD~TXTRATPRDDESC~TXTRATCUST~TXTRATCUSTNAME~TXTRATFACNAME~TXTRATTOTRATIO~TXTRATCOMP","BLK_LFTBS_FAS91_FEE_DETAIL":"CONTREF~CMPO~EVENSENO~CUSTOMERNO~MANAGEMENTCOMP~PARTICIPANTTYPE~YIELDADJCOMP~SELFPARTICIPANT~FACILITYAMOUNT~TXTFAS91PARTNAME~TXTTOTFACAMT~TXTTOTMGMTAMT~TXTTOTYELDADJCOMP~TXTFAS91CCY","BLK_LFTBS_FAS91_FEE_MASTER_MULTI":"WTAVERAGEYIELD~FESTOAMORTIZE~FESTORECOGNIZE~TOTCITIFEES~TOTNONCITIFEES~COMPNEN~CREFNO~ESNUMBER~FESCHORIGINATOR~FESCHORIGINATORMISCODE~FASPASSACCTENTRY","BLK_FAS_FESCH":"FESCHMISCODE~FESCHBRNCODE~FESCHESN~FESCHCOMP~FESCHCONTREFNO~TXTTOTFESCHTRAIO","BLK_LFTBS_FAS91_FEE_SPLIT_DTLS":"BRNCODE~ESEQNO~CONREFNUMBER~COMPON~MISCODE~ACCOUNT~RATIO~AMT~TXTTOTFESHRATIO","BLK_PART_RATIO_MAS":"PART_VALDT~PART_COMP~PART_COMPTYP~PART_ESN~PART_FCCREF~PART_DDN~PART_COMP_RATIO~PART_COMP_TYP~PART_CUSNO~PART_TOT","BLK_LBTBS_PARTICIPANT_RATIO":"CUSTNO~DRAWDOWNNO~CONTRANO~ESNUM~COMPTYPE~COMPONE~VALDT~COMPORATIO~TXTPARTNAME~TXTTOTCMPRATIO"};

var multipleEntryPageSize = {"BLK_LFTBS_CONTRACT_FEE_MULTI" :"15" ,"BLK_OLVES_STP_GET_AGENCY_FEE_RATE__MULTI" :"15" ,"BLK_LFTBS_CONTRACT_PARTDRIVEN_FEE_MULTI" :"15" ,"BLK_LFTBS_FAS91_FEE_SPLIT_DTLS" :"15" ,"BLK_LBTBS_PARTICIPANT_RATIO" :"15" ,"BLK_LFTBS_FAS91_FEE_DETAIL" :"15" };

var multipleEntrySVBlocks = "BLK_PART_RATIO_MAS~BLK_PFEE~BLK_FAS91FEE~BLK_FAS_FESCH~BLK_LFTBS_FAS91_FEE_MASTER_MULTI";

var tabMEBlks = {"CVS_FEECOMP__TAB_MAIN":"BLK_LFTBS_CONTRACT_FEE_MULTI","CVS_AGY_FEE__TAB_MAIN":"BLK_OLVES_STP_GET_AGENCY_FEE_RATE__MULTI","CVS_PARTFEE__TAB_MAIN":"BLK_LFTBS_CONTRACT_PARTDRIVEN_FEE_MULTI","CVS_FEESH__TAB_MAIN":"BLK_LFTBS_FAS91_FEE_SPLIT_DTLS","CVS_RATIO__TAB_MAIN":"BLK_LBTBS_PARTICIPANT_RATIO","CVS_FAS91FEE__TAB_MAIN":"BLK_LFTBS_FAS91_FEE_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTROL_FEE">CONTREFNO~PRODDESC~PRODCD~PRODTYPE~USERREFNO~CUSTOMER~CUSTANME~FACILITYNAME~COMP~EVESEQN~TXTPFEECMP~TXTPFEECCY~TXTPFEESCHDAT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTROL_FEE" RELATION_TYPE="N" TYPE="BLK_LFTBS_CONTRACT_FEE_MULTI">CONTRANUM~COMPONENT~ESNUM~DISCACCRAPPLICABLE~BILLINGNOTICEDAYS~INTERESTBASIS~BILLINGNOTICEREQUIRED~LIQDPREFERENCE~ENDDATE~STARTDATE~CCY~FEERULE~ASSOCIATIONDATE~FEEREVERSED~COMPSTATUS~TOTALACCRUALAMOUNT~TILLDATEACCRUAL~COMPSTAT~TXTAGYFEE~TXTPFEE~TXTFAS91~TXTRATIO~FEECOLLECTIONMODE~FEE_PERIOD_BASIS~ACQUIRED_FEE</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTROL_FEE" RELATION_TYPE="1" TYPE="BLK_OLVWS_STP_GET_AGENCY_FEE_RATE">PARTICIPANT~PARTREFNO~LDREFNO~LSREFNO~INTERESTBASIS~LDCOMPONENT~LSCOMPONENT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_STP_GET_AGENCY_FEE_RATE" RELATION_TYPE="N" TYPE="BLK_OLVES_STP_GET_AGENCY_FEE_RATE__MULTI">FEERATE~CCY~TOBASISAMT~FROMBASISAMT~EFFECTIVEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_FEE_MULTI" RELATION_TYPE="N" TYPE="BLK_PFEE">PFEEESN~PFEECOMP~PFEECONTREFNO~PFEEPART~TXTTOTPFEE~PFEESCHDT~TXTPFEECURRENCY</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_FEE_MULTI" RELATION_TYPE="N" TYPE="BLK_LFTBS_CONTRACT_PARTDRIVEN_FEE_MULTI">FEEAMT~CONRE~CMP~EVESNO~PARTI~TXTPARTNAME~TXTPFEEAMT~SCHDAT</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_FEE_MULTI" RELATION_TYPE="N" TYPE="BLK_FAS91FEE">FASREFNO~FASCOMP~FASESNO~FASCUSTNO~TXTFASCURR~TXTTOTFASFACAMT~TXTTOTFASMGMTCOMP~TXTTOTFASYIELDADJCOMP~TXTFASTOTCITIFEES~TXTFASTOTNONCITIFEES~TXTFASFEESTORECOGNIZE~TXTFASFEESTOAMORTIZE~TXTFASFEESTOWAVERAGEYIELD</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTROL_FEE" RELATION_TYPE="1" TYPE="BLK_LFTBS_FAS91_FEE_MASTER">CONTRE~EVESN~COMPON~PASSACCTENTRY~WTDAVERAGEYIELD~FEESTOAMORTIZE~FEESTORECOGNIZE~TOTALCITIFEES~TOTALNONCITIFEES~ORIGINATOR~ORIGINATORMISCODE~TXTFESHPRDDESC~TXTFESHCONTREFNO~TXTFESHUSERREFNO~TXTFESHCUSTNAME~TXTFESHFACNAME~TXTFESHFEECOMP~TXTFESHTOTRATIO~TXTRATCONTREFNO~TXTRATUSERREFNO~TXTRATPRDCD~TXTRATPRDDESC~TXTRATCUST~TXTRATCUSTNAME~TXTRATFACNAME~TXTRATTOTRATIO~TXTRATCOMP</FN>'; 
msgxml += '      <FN PARENT="BLK_FAS91FEE" RELATION_TYPE="N" TYPE="BLK_LFTBS_FAS91_FEE_DETAIL">CONTREF~CMPO~EVENSENO~CUSTOMERNO~MANAGEMENTCOMP~PARTICIPANTTYPE~YIELDADJCOMP~SELFPARTICIPANT~FACILITYAMOUNT~TXTFAS91PARTNAME~TXTTOTFACAMT~TXTTOTMGMTAMT~TXTTOTYELDADJCOMP~TXTFAS91CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_FEE_MULTI" RELATION_TYPE="N" TYPE="BLK_LFTBS_FAS91_FEE_MASTER_MULTI">WTAVERAGEYIELD~FESTOAMORTIZE~FESTORECOGNIZE~TOTCITIFEES~TOTNONCITIFEES~COMPNEN~CREFNO~ESNUMBER~FESCHORIGINATOR~FESCHORIGINATORMISCODE~FASPASSACCTENTRY</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_FEE_MULTI" RELATION_TYPE="N" TYPE="BLK_FAS_FESCH">FESCHMISCODE~FESCHBRNCODE~FESCHESN~FESCHCOMP~FESCHCONTREFNO~TXTTOTFESCHTRAIO</FN>'; 
msgxml += '      <FN PARENT="BLK_FAS_FESCH" RELATION_TYPE="N" TYPE="BLK_LFTBS_FAS91_FEE_SPLIT_DTLS">BRNCODE~ESEQNO~CONREFNUMBER~COMPON~MISCODE~ACCOUNT~RATIO~AMT~TXTTOTFESHRATIO</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_FEE_MULTI" RELATION_TYPE="N" TYPE="BLK_PART_RATIO_MAS">PART_VALDT~PART_COMP~PART_COMPTYP~PART_ESN~PART_FCCREF~PART_DDN~PART_COMP_RATIO~PART_COMP_TYP~PART_CUSNO~PART_TOT</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_FEE_MULTI" RELATION_TYPE="N" TYPE="BLK_LBTBS_PARTICIPANT_RATIO">CUSTNO~DRAWDOWNNO~CONTRANO~ESNUM~COMPTYPE~COMPONE~VALDT~COMPORATIO~TXTPARTNAME~TXTTOTCMPRATIO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_FEECOMP";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTROL_FEE" : "","BLK_LFTBS_CONTRACT_FEE_MULTI" : "BLK_CONTROL_FEE~N","BLK_OLVWS_STP_GET_AGENCY_FEE_RATE" : "BLK_CONTROL_FEE~1","BLK_OLVES_STP_GET_AGENCY_FEE_RATE__MULTI" : "BLK_OLVWS_STP_GET_AGENCY_FEE_RATE~N","BLK_PFEE" : "BLK_LFTBS_CONTRACT_FEE_MULTI~N","BLK_LFTBS_CONTRACT_PARTDRIVEN_FEE_MULTI" : "BLK_LFTBS_CONTRACT_FEE_MULTI~N","BLK_FAS91FEE" : "BLK_LFTBS_CONTRACT_FEE_MULTI~N","BLK_LFTBS_FAS91_FEE_MASTER" : "BLK_CONTROL_FEE~1","BLK_LFTBS_FAS91_FEE_DETAIL" : "BLK_FAS91FEE~N","BLK_LFTBS_FAS91_FEE_MASTER_MULTI" : "BLK_LFTBS_CONTRACT_FEE_MULTI~N","BLK_FAS_FESCH" : "BLK_LFTBS_CONTRACT_FEE_MULTI~N","BLK_LFTBS_FAS91_FEE_SPLIT_DTLS" : "BLK_FAS_FESCH~N","BLK_PART_RATIO_MAS" : "BLK_LFTBS_CONTRACT_FEE_MULTI~N","BLK_LBTBS_PARTICIPANT_RATIO" : "BLK_LFTBS_CONTRACT_FEE_MULTI~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTROL_FEE","BLK_LFTBS_CONTRACT_FEE_MULTI","BLK_OLVWS_STP_GET_AGENCY_FEE_RATE","BLK_OLVES_STP_GET_AGENCY_FEE_RATE__MULTI","BLK_PFEE","BLK_LFTBS_CONTRACT_PARTDRIVEN_FEE_MULTI","BLK_FAS91FEE","BLK_LFTBS_FAS91_FEE_MASTER","BLK_LFTBS_FAS91_FEE_DETAIL","BLK_LFTBS_FAS91_FEE_MASTER_MULTI","BLK_FAS_FESCH","BLK_LFTBS_FAS91_FEE_SPLIT_DTLS","BLK_PART_RATIO_MAS","BLK_LBTBS_PARTICIPANT_RATIO"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFCFEECF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFCFEECF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTROL_FEE__CONTREFNO";
pkFields[0] = "BLK_CONTROL_FEE__CONTREFNO";
queryFields[1] = "BLK_CONTROL_FEE__COMP";
pkFields[1] = "BLK_CONTROL_FEE__COMP";
queryFields[2] = "BLK_CONTROL_FEE__EVESEQN";
pkFields[2] = "BLK_CONTROL_FEE__EVESEQN";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTBS_CONTRACT_FEE_MULTI":["BILLINGNOTICEDAYS","BILLINGNOTICEREQUIRED","ENDDATEI"]};
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
var lovInfoFlds = {"BLK_LFTBS_FAS91_FEE_MASTER__ORIGINATOR__LOV_ORIGINATOR":["BLK_LFTBS_FAS91_FEE_MASTER__ORIGINATOR~~","","N~N",""],"BLK_LFTBS_FAS91_FEE_MASTER__ORIGINATORMISCODE__LOV_ORG_MIS_CODE":["BLK_LFTBS_FAS91_FEE_MASTER__ORIGINATORMISCODE~~","","N~N",""],"BLK_LFTBS_FAS91_FEE_DETAIL__CUSTOMERNO__LOV_PARTICIPANT":["BLK_LFTBS_FAS91_FEE_DETAIL__CUSTOMERNO~BLK_LFTBS_FAS91_FEE_DETAIL__TXTFAS91PARTNAME~","","N~N",""],"BLK_LFTBS_FAS91_FEE_MASTER_MULTI__FESCHORIGINATOR__LOV_ORIGINATOR":["BLK_LFTBS_FAS91_FEE_MASTER_MULTI__FESCHORIGINATOR~~","","N~N",""],"BLK_LFTBS_FAS91_FEE_MASTER_MULTI__FESCHORIGINATORMISCODE__LOV_ORG_MIS_CODE":["BLK_LFTBS_FAS91_FEE_MASTER_MULTI__FESCHORIGINATORMISCODE~~","","N~N",""],"BLK_LFTBS_FAS91_FEE_SPLIT_DTLS__BRNCODE__LOV_BRANCH":["BLK_LFTBS_FAS91_FEE_SPLIT_DTLS__BRNCODE~~","","N~N",""],"BLK_LFTBS_FAS91_FEE_SPLIT_DTLS__MISCODE__LOV_MIS_CODE":["BLK_LFTBS_FAS91_FEE_SPLIT_DTLS__MISCODE~~","BLK_CONTROL_FEE__CONTREFNO!VARCHAR2~BLK_LFTBS_FAS91_FEE_SPLIT_DTLS__COMPON!VARCHAR2~BLK_LFTBS_FAS91_FEE_SPLIT_DTLS__BRNCODE!VARCHAR2","N~N",""],"BLK_LFTBS_FAS91_FEE_SPLIT_DTLS__ACCOUNT__LOV_ACCOUNT":["BLK_LFTBS_FAS91_FEE_SPLIT_DTLS__ACCOUNT~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LFTBS_CONTRACT_FEE_MULTI","BLK_OLVES_STP_GET_AGENCY_FEE_RATE__MULTI","BLK_LFTBS_CONTRACT_PARTDRIVEN_FEE_MULTI","BLK_LFTBS_FAS91_FEE_SPLIT_DTLS","BLK_LBTBS_PARTICIPANT_RATIO","BLK_LFTBS_FAS91_FEE_DETAIL");
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

ArrFuncOrigin["LFCFEECF"]="KERNEL";
ArrPrntFunc["LFCFEECF"]="";
ArrPrntOrigin["LFCFEECF"]="";
ArrRoutingType["LFCFEECF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFCFEECF"]="N";
ArrCustomModified["LFCFEECF"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_FEECOMP":"CONTREFNO","CVS_PARTFEE":"PFEECOMP~PFEESCHDT~TXTPFEECURRENCY","CVS_FAS91FEE":"FASCOMP~TXTFASCURR","CVS_RATIO":"PART_COMP"};
var scrArgSource = {"CVS_PARTFEE":"BLK_LFTBS_CONTRACT_FEE_MULTI__COMPONENT~BLK_LFTBS_CONTRACT_FEE_MULTI__ASSOCIATIONDATE~BLK_LFTBS_CONTRACT_FEE_MULTI__CCY","CVS_FAS91FEE":"BLK_LFTBS_CONTRACT_FEE_MULTI__COMPONENT~BLK_LFTBS_CONTRACT_FEE_MULTI__CCY","CVS_RATIO":"BLK_LFTBS_CONTRACT_FEE_MULTI__COMPONENT"};
var scrArgVals = {"CVS_FEECOMP":"","CVS_PARTFEE":"~~","CVS_FAS91FEE":"~","CVS_RATIO":""};
var scrArgDest = {"CVS_FEECOMP":"BLK_CONTROL_FEE__CONTREFNO","CVS_PARTFEE":"BLK_PFEE__PFEECOMP~BLK_PFEE__PFEESCHDT~BLK_PFEE__TXTPFEECURRENCY","CVS_FAS91FEE":"BLK_FAS91FEE__FASCOMP~BLK_FAS91FEE__TXTFASCURR","CVS_RATIO":"BLK_PART_RATIO_MAS__PART_COMP"};
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