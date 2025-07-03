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
**  File Name          : LBCSKMTR_SYS.js
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
var fieldNameArray = {"BLK_CONTRACTDETLS":"CONTRACTREFNO~LATESTVERSIONNO~TXTPRODCODE~TXTPRDCTDESC~TXTPRODTYPEDESC~TXTCUSTOMER~TXTCUSTNAME~TXTUSERREFNO~TXTFACILITYNAME","BLK_TRANCHE_SKIM_MASTER":"PAYERPARTICIPANT~CONTRACTREFNUM~VERSIONNO~DEFAULTSKIMRATE~RECEIVERPARTICIPANT~RECORDSEQNO~TXTPAYERNAME~TXTRECVRNAME","BLK_TRANCHE_SKIM_PRODLINKGS":"CHANGEALLOWED~LINKEDYESNO~DDPRODUCTCODE~VERSIONNO~CONTRACTREFNUM~TXTPRODDESC","BLK_TRANCHE_SKIM_DTLS":"RECORDSEQNUM~RECVRCOMPONENT~DDPRODUCTCODE~PAYERCOMPONENT~VERSIONNO~PAYERPARTICIPANT~CONTRACTREF_NO~DEFAULTSKIM_RATE~RECEVRPARTICIPANT"};

var multipleEntryPageSize = {"BLK_TRANCHE_SKIM_MASTER" :"15" ,"BLK_TRANCHE_SKIM_PRODLINKGS" :"15" ,"BLK_TRANCHE_SKIM_DTLS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_SKIMDTLS__TAB_PARTICIPANTS":"BLK_TRANCHE_SKIM_MASTER","CVS_SKIMDTLS__TAB_LINKAGES":"BLK_TRANCHE_SKIM_PRODLINKGS~BLK_TRANCHE_SKIM_DTLS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACTDETLS">CONTRACTREFNO~LATESTVERSIONNO~TXTPRODCODE~TXTPRDCTDESC~TXTPRODTYPEDESC~TXTCUSTOMER~TXTCUSTNAME~TXTUSERREFNO~TXTFACILITYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACTDETLS" RELATION_TYPE="N" TYPE="BLK_TRANCHE_SKIM_MASTER">PAYERPARTICIPANT~CONTRACTREFNUM~VERSIONNO~DEFAULTSKIMRATE~RECEIVERPARTICIPANT~RECORDSEQNO~TXTPAYERNAME~TXTRECVRNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACTDETLS" RELATION_TYPE="N" TYPE="BLK_TRANCHE_SKIM_PRODLINKGS">CHANGEALLOWED~LINKEDYESNO~DDPRODUCTCODE~VERSIONNO~CONTRACTREFNUM~TXTPRODDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_TRANCHE_SKIM_PRODLINKGS" RELATION_TYPE="N" TYPE="BLK_TRANCHE_SKIM_DTLS">RECORDSEQNUM~RECVRCOMPONENT~DDPRODUCTCODE~PAYERCOMPONENT~VERSIONNO~PAYERPARTICIPANT~CONTRACTREF_NO~DEFAULTSKIM_RATE~RECEVRPARTICIPANT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_SKIMDTLS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACTDETLS" : "","BLK_TRANCHE_SKIM_MASTER" : "BLK_CONTRACTDETLS~N","BLK_TRANCHE_SKIM_PRODLINKGS" : "BLK_CONTRACTDETLS~N","BLK_TRANCHE_SKIM_DTLS" : "BLK_TRANCHE_SKIM_PRODLINKGS~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACTDETLS","BLK_TRANCHE_SKIM_MASTER","BLK_TRANCHE_SKIM_PRODLINKGS","BLK_TRANCHE_SKIM_DTLS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCSKMTR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCSKMTR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACTDETLS__CONTRACTREFNO";
pkFields[0] = "BLK_CONTRACTDETLS__CONTRACTREFNO";
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
var lovInfoFlds = {"BLK_TRANCHE_SKIM_MASTER__PAYERPARTICIPANT__LOV_PART_REVR":["BLK_TRANCHE_SKIM_MASTER__PAYERPARTICIPANT~BLK_TRANCHE_SKIM_MASTER__TXTPAYERNAME~","","N~N",""],"BLK_TRANCHE_SKIM_MASTER__RECEIVERPARTICIPANT__LOV_PART_REVR":["BLK_TRANCHE_SKIM_MASTER__RECEIVERPARTICIPANT~BLK_TRANCHE_SKIM_MASTER__TXTRECVRNAME~","","N~N",""],"BLK_TRANCHE_SKIM_PRODLINKGS__DDPRODUCTCODE__LOV_DD_PRODUCT":["BLK_TRANCHE_SKIM_PRODLINKGS__DDPRODUCTCODE~BLK_TRANCHE_SKIM_PRODLINKGS__TXTPRODDESC~","","N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_PARTICIPANTS';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_TRANCHE_SKIM_MASTER","BLK_TRANCHE_SKIM_PRODLINKGS","BLK_TRANCHE_SKIM_DTLS");
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

ArrFuncOrigin["LBCSKMTR"]="KERNEL";
ArrPrntFunc["LBCSKMTR"]="";
ArrPrntOrigin["LBCSKMTR"]="";
ArrRoutingType["LBCSKMTR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCSKMTR"]="N";
ArrCustomModified["LBCSKMTR"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_SKIMDTLS":"CONTRACTREFNO~LATESTVERSIONNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_SKIMDTLS":"~"};
var scrArgDest = {"CVS_SKIMDTLS":"BLK_CONTRACTDETLS__CONTRACTREFNO~BLK_CONTRACTDETLS__LATESTVERSIONNO"};
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