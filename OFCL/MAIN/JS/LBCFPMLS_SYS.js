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
**  File Name          : LBCFPMLS_SYS.js
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
var fieldNameArray = {"BLK_CONT_MEDIA_FOR_ALL_PART":"TXT_USER_REF_NO~TXT_PRODUCT_CODE~TXT_PRODUCT_DESC~TXT_PROD_TYPE_DESC~TXT_CUSTOMER~TXT_CUSTOMER_NAME~TXT_FACILITY_NAME~CONTRACT_REF_NO~EVENT_SEQ_NO~MEDIA~MEDIA_FOR_ALL_INVESTOR~TXT_TRN_REF_NO","BLK_LSTBS_CONT_PART_MEDIA":"CONREFNO~ESN~CUSTOMER_NO~MEDI~ENTIT~PRIMARY_ENTITY_APPLICABLE"};

var multipleEntryPageSize = {"BLK_LSTBS_CONT_PART_MEDIA" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MESSAGE_GENERATION__TAB_MAIN":"BLK_LSTBS_CONT_PART_MEDIA"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONT_MEDIA_FOR_ALL_PART">TXT_USER_REF_NO~TXT_PRODUCT_CODE~TXT_PRODUCT_DESC~TXT_PROD_TYPE_DESC~TXT_CUSTOMER~TXT_CUSTOMER_NAME~TXT_FACILITY_NAME~CONTRACT_REF_NO~EVENT_SEQ_NO~MEDIA~MEDIA_FOR_ALL_INVESTOR~TXT_TRN_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONT_MEDIA_FOR_ALL_PART" RELATION_TYPE="N" TYPE="BLK_LSTBS_CONT_PART_MEDIA">CONREFNO~ESN~CUSTOMER_NO~MEDI~ENTIT~PRIMARY_ENTITY_APPLICABLE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MESSAGE_GENERATION";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONT_MEDIA_FOR_ALL_PART" : "","BLK_LSTBS_CONT_PART_MEDIA" : "BLK_CONT_MEDIA_FOR_ALL_PART~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONT_MEDIA_FOR_ALL_PART","BLK_LSTBS_CONT_PART_MEDIA"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCFPMLS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCFPMLS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONT_MEDIA_FOR_ALL_PART__CONTRACT_REF_NO";
pkFields[0] = "BLK_CONT_MEDIA_FOR_ALL_PART__CONTRACT_REF_NO";
queryFields[1] = "BLK_CONT_MEDIA_FOR_ALL_PART__EVENT_SEQ_NO";
pkFields[1] = "BLK_CONT_MEDIA_FOR_ALL_PART__EVENT_SEQ_NO";
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
var lovInfoFlds = {"BLK_CONT_MEDIA_FOR_ALL_PART__MEDIA__LOV_COMMON_MEDIA":["BLK_CONT_MEDIA_FOR_ALL_PART__MEDIA~","BLK_CONT_MEDIA_FOR_ALL_PART__CONTRACT_REF_NO!VARCHAR2~BLK_CONT_MEDIA_FOR_ALL_PART__CONTRACT_REF_NO!VARCHAR2~BLK_CONT_MEDIA_FOR_ALL_PART__CONTRACT_REF_NO!VARCHAR2","N",""],"BLK_LSTBS_CONT_PART_MEDIA__CUSTOMER_NO__LOV_PART_NEW_DNOT":["BLK_LSTBS_CONT_PART_MEDIA__CUSTOMER_NO~BLK_LSTBS_CONT_PART_MEDIA__ENTIT~","BLK_CONT_MEDIA_FOR_ALL_PART__TXT_TRN_REF_NO!VARCHAR2","N~N",""],"BLK_LSTBS_CONT_PART_MEDIA__MEDI__LOV_ENTITY_MEDIA":["BLK_LSTBS_CONT_PART_MEDIA__MEDI~","BLK_CONT_MEDIA_FOR_ALL_PART__CONTRACT_REF_NO!VARCHAR2~BLK_LSTBS_CONT_PART_MEDIA__CUSTOMER_NO!VARCHAR2~BLK_CONT_MEDIA_FOR_ALL_PART__CONTRACT_REF_NO!VARCHAR2~BLK_LSTBS_CONT_PART_MEDIA__CUSTOMER_NO!VARCHAR2~BLK_CONT_MEDIA_FOR_ALL_PART__CONTRACT_REF_NO!VARCHAR2~BLK_LSTBS_CONT_PART_MEDIA__CUSTOMER_NO!VARCHAR2","N",""]};
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
var multipleEntryIDs = new Array("BLK_LSTBS_CONT_PART_MEDIA");
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

ArrFuncOrigin["LBCFPMLS"]="KERNEL";
ArrPrntFunc["LBCFPMLS"]="";
ArrPrntOrigin["LBCFPMLS"]="";
ArrRoutingType["LBCFPMLS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCFPMLS"]="N";
ArrCustomModified["LBCFPMLS"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MESSAGE_GENERATION":"CONTRACT_REF_NO~EVENT_SEQ_NO~TRN_REF_NO"};
var scrArgSource = {"CVS_MESSAGE_GENERATION":"BLK_CONT_MEDIA_FOR_ALL_PART__CONTRACT_REF_NO~BLK_CONT_MEDIA_FOR_ALL_PART__EVENT_SEQ_NO~BLK_CONT_MEDIA_FOR_ALL_PART__TXT_TRN_REF_NO"};
var scrArgVals = {"CVS_MESSAGE_GENERATION":"~~"};
var scrArgDest = {"CVS_MESSAGE_GENERATION":"BLK_CONT_MEDIA_FOR_ALL_PART__CONTRACT_REF_NO~BLK_CONT_MEDIA_FOR_ALL_PART__EVENT_SEQ_NO~BLK_CONT_MEDIA_FOR_ALL_PART__TXT_TRN_REF_NO"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------