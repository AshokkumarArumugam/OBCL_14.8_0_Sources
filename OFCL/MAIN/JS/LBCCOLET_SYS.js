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
**  File Name          : LBCCOLET_SYS.js
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
var fieldNameArray = {"BLK_COLLENT_EFFDATE":"TRANCHEREFNO~EFFDATE~TXTUSERREFNO~TXTPRDCD~TXTCUST~TXTCUSTNAME~TXTPRDDESC~TXTFACILITY~RECRDSTAT~CURRENCY~AUTHSTAT~ONCEAUTH~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~MODNO~TXT_N_REQ_TOTAL~TXT_N_OPT_TOTAL~TXTCUREVENT~TXTTOTALEVNT","BLK_COLLENT_COLL":"EFFDATE~TRANCHEREFNO~COLLATERALCODE","BLK_COLLENT_ENTITY":"TRANCHEREFNO~EFFDATE~COLLATERALCODE~ENTITYCODE~GROSSAMOUNT~INELIGIBLEAMOUNT~AVAILABLEAMOUNT~NETAVAILABAMT~NETRQRDTOTAL~OPTIONALTOTAL~NETOPTIONALTOTAL"};

var multipleEntryPageSize = {"BLK_COLLENT_COLL" :"15" ,"BLK_COLLENT_ENTITY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_COLLAT__TAB_MAIN":"BLK_COLLENT_COLL~BLK_COLLENT_ENTITY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_COLLENT_EFFDATE">TRANCHEREFNO~EFFDATE~TXTUSERREFNO~TXTPRDCD~TXTCUST~TXTCUSTNAME~TXTPRDDESC~TXTFACILITY~RECRDSTAT~CURRENCY~AUTHSTAT~ONCEAUTH~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~MODNO~TXT_N_REQ_TOTAL~TXT_N_OPT_TOTAL~TXTCUREVENT~TXTTOTALEVNT</FN>'; 
msgxml += '      <FN PARENT="BLK_COLLENT_EFFDATE" RELATION_TYPE="1" TYPE="BLK_COLLENT_COLL">EFFDATE~TRANCHEREFNO~COLLATERALCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_COLLENT_COLL" RELATION_TYPE="1" TYPE="BLK_COLLENT_ENTITY">TRANCHEREFNO~EFFDATE~COLLATERALCODE~ENTITYCODE~GROSSAMOUNT~INELIGIBLEAMOUNT~AVAILABLEAMOUNT~NETAVAILABAMT~NETRQRDTOTAL~OPTIONALTOTAL~NETOPTIONALTOTAL</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_COLLAT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_COLLENT_EFFDATE" : "","BLK_COLLENT_COLL" : "BLK_COLLENT_EFFDATE~1","BLK_COLLENT_ENTITY" : "BLK_COLLENT_COLL~1"}; 

 var dataSrcLocationArray = new Array("BLK_COLLENT_EFFDATE","BLK_COLLENT_COLL","BLK_COLLENT_ENTITY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCCOLET.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCCOLET.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_COLLENT_EFFDATE__TRANCHEREFNO";
pkFields[0] = "BLK_COLLENT_EFFDATE__TRANCHEREFNO";
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
var lovInfoFlds = {"BLK_COLLENT_COLL__COLLATERALCODE__LOV_COLCODE":["BLK_COLLENT_COLL__COLLATERALCODE~~","BLK_COLLENT_EFFDATE__TRANCHEREFNO!VARCHAR2~BLK_COLLENT_EFFDATE__EFFDATE!DATE","N~N",""],"BLK_COLLENT_ENTITY__ENTITYCODE__LOV_ENTCODE":["BLK_COLLENT_ENTITY__ENTITYCODE~~~","BLK_COLLENT_COLL__COLLATERALCODE!~BLK_COLLENT_EFFDATE__TRANCHEREFNO!~BLK_COLLENT_EFFDATE__EFFDATE!~BLK_COLLENT_COLL__COLLATERALCODE!","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_COLLENT_COLL","BLK_COLLENT_ENTITY");
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

ArrFuncOrigin["LBCCOLET"]="KERNEL";
ArrPrntFunc["LBCCOLET"]="";
ArrPrntOrigin["LBCCOLET"]="";
ArrRoutingType["LBCCOLET"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCCOLET"]="N";
ArrCustomModified["LBCCOLET"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_COLLAT":"TRANCHEREFNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_COLLAT":""};
var scrArgDest = {"CVS_COLLAT":"BLK_COLLENT_EFFDATE__TRANCHEREFNO"};
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