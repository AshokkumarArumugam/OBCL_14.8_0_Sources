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
**  File Name          : LBDMSGVW_SYS.js
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
var fieldNameArray = {"BLK_BORR_EVENTS":"CONTRACT_REF_NO~EVENT_SEQ_NO~EVENT_CODE~LATEST_EVENT_SEQ_NO~TOTAL_AMOUNT","BLK_BORR_MSG_OUT":"ENTITY_NAME~MSG_TYPE~CCY~AMOUNT~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~MSG_STATUS~ENTITY~DCN~RUNNING_NO~RECEIVER~NAME~REFERENCE_NO","BLK_PART_MSG_OUT":"ENTITY_NAME~REFERENCE_NO~MSG_TYPE~RECEIVER~CCY~AMOUNT~NAME~MSG_STATUS~ENTITY~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~DCN~RUNNING_NO"};

var multipleEntryPageSize = {"BLK_BORR_MSG_OUT" :"15" ,"BLK_PART_MSG_OUT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_BORR_MSG_OUT~BLK_PART_MSG_OUT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BORR_EVENTS">CONTRACT_REF_NO~EVENT_SEQ_NO~EVENT_CODE~LATEST_EVENT_SEQ_NO~TOTAL_AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_BORR_EVENTS" RELATION_TYPE="N" TYPE="BLK_BORR_MSG_OUT">ENTITY_NAME~MSG_TYPE~CCY~AMOUNT~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~MSG_STATUS~ENTITY~DCN~RUNNING_NO~RECEIVER~NAME~REFERENCE_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_BORR_EVENTS" RELATION_TYPE="N" TYPE="BLK_PART_MSG_OUT">ENTITY_NAME~REFERENCE_NO~MSG_TYPE~RECEIVER~CCY~AMOUNT~NAME~MSG_STATUS~ENTITY~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~DCN~RUNNING_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BORR_EVENTS" : "","BLK_BORR_MSG_OUT" : "BLK_BORR_EVENTS~N","BLK_PART_MSG_OUT" : "BLK_BORR_EVENTS~N"}; 

 var dataSrcLocationArray = new Array("BLK_BORR_EVENTS","BLK_BORR_MSG_OUT","BLK_PART_MSG_OUT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDMSGVW.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDMSGVW.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BORR_EVENTS__EVENT_SEQ_NO";
pkFields[0] = "BLK_BORR_EVENTS__EVENT_SEQ_NO";
queryFields[1] = "BLK_BORR_EVENTS__CONTRACT_REF_NO";
pkFields[1] = "BLK_BORR_EVENTS__CONTRACT_REF_NO";
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
var multipleEntryIDs = new Array("BLK_BORR_MSG_OUT","BLK_PART_MSG_OUT");
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

ArrFuncOrigin["LBDMSGVW"]="KERNEL";
ArrPrntFunc["LBDMSGVW"]="";
ArrPrntOrigin["LBDMSGVW"]="";
ArrRoutingType["LBDMSGVW"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDMSGVW"]="N";
ArrCustomModified["LBDMSGVW"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"CONTRACT_REF_NO~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":"~"};
var scrArgDest = {"CVS_MAIN":"BLK_BORR_EVENTS__CONTRACT_REF_NO~"};
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