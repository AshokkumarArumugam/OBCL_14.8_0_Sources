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
**  File Name          : LFCSCHMN_SYS.js
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
var fieldNameArray = {"BLK_MAIN":"CONREFNO~CCYDESC~FEECOLMODEDESC~BASISTAGDESC~ENDDATEDESC~STARTDATEDESC~COMPONENTDESC~FEERULEDESC~EVENTSEQNO","BLK_SCH_DET":"AMOUNT~FREQUNIT~FREQUENCY~NOOFSCHEDULES~STARTDATE~EVENTSEQNO~COMPONENT~CONTRACTREFNO","BLK_AMOUNT_DUE":"AMOUNTSETTLED~DUEDATE~AMOUNTDUE"};

var multipleEntryPageSize = {"BLK_SCH_DET" :"15" ,"BLK_AMOUNT_DUE" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_SCH_DET~BLK_AMOUNT_DUE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MAIN">CONREFNO~CCYDESC~FEECOLMODEDESC~BASISTAGDESC~ENDDATEDESC~STARTDATEDESC~COMPONENTDESC~FEERULEDESC~EVENTSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_MAIN" RELATION_TYPE="N" TYPE="BLK_SCH_DET">AMOUNT~FREQUNIT~FREQUENCY~NOOFSCHEDULES~STARTDATE~EVENTSEQNO~COMPONENT~CONTRACTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_MAIN" RELATION_TYPE="N" TYPE="BLK_AMOUNT_DUE">AMOUNTSETTLED~DUEDATE~AMOUNTDUE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MAIN" : "","BLK_SCH_DET" : "BLK_MAIN~N","BLK_AMOUNT_DUE" : "BLK_MAIN~N"}; 

 var dataSrcLocationArray = new Array("BLK_MAIN","BLK_SCH_DET","BLK_AMOUNT_DUE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFCSCHMN.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFCSCHMN.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MAIN__CONREFNO";
pkFields[0] = "BLK_MAIN__CONREFNO";
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
var multipleEntryIDs = new Array("BLK_SCH_DET","BLK_AMOUNT_DUE");
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

ArrFuncOrigin["LFCSCHMN"]="KERNEL";
ArrPrntFunc["LFCSCHMN"]="";
ArrPrntOrigin["LFCSCHMN"]="";
ArrRoutingType["LFCSCHMN"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFCSCHMN"]="N";
ArrCustomModified["LFCSCHMN"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"CONREFNO~CCYDESC~FEECOLMODEDESC~ENDDATEDESC~STARTDATEDESC~COMPONENTDESC~FEERULEDESC~EVENTSEQNO~BASISTAGDESC~EVENTSEQNUM~CONTRACTREFNO~COMPONENT"};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":"~~~~~~~~~~~"};
var scrArgDest = {"CVS_MAIN":"BLK_MAIN__CONREFNO~BLK_MAIN__CCYDESC~BLK_MAIN__FEECOLMODEDESC~BLK_MAIN__ENDDATEDESC~BLK_MAIN__STARTDATEDESC~BLK_MAIN__COMPONENTDESC~BLK_MAIN__FEERULEDESC~BLK_MAIN__EVENTSEQNO~BLK_MAIN__BASISTAGDESC~BLK_SCH_DET__EVENTSEQNO~BLK_SCH_DET__CONTRACTREFNO~BLK_SCH_DET__COMPONENT"};
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