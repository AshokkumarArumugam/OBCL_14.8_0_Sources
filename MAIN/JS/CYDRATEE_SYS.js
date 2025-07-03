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
**  File Name          : CYDRATEE_SYS.js
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
var fieldNameArray = {"BLK_CCY_RATE_MASTER":"BRNCD~CCY1~CCY2~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_CCY_RATE_DETAILS":"BRNCD~CCY1~CCY2~RATETYPE~MIDRATE~BUYSPRD~SALESPRD~BUYRATE~SALERATE~UNAUTHMIDRATE~UNAUTHBUYSPRD~UNAUTHSALESPRD~UNAUTHBUYRATE~UNAUTHSALERATE~INTAUTHSTAT~RATEDATE~RATESER~UNAUTHRATEDATE~UNAUTHRATESER"};

var multipleEntryPageSize = {"BLK_CCY_RATE_DETAILS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_CCY_RATE_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CCY_RATE_MASTER">BRNCD~CCY1~CCY2~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_CCY_RATE_MASTER" RELATION_TYPE="N" TYPE="BLK_CCY_RATE_DETAILS">BRNCD~CCY1~CCY2~RATETYPE~MIDRATE~BUYSPRD~SALESPRD~BUYRATE~SALERATE~UNAUTHMIDRATE~UNAUTHBUYSPRD~UNAUTHSALESPRD~UNAUTHBUYRATE~UNAUTHSALERATE~INTAUTHSTAT~RATEDATE~RATESER~UNAUTHRATEDATE~UNAUTHRATESER</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CCY_RATE_MASTER">AUTHSTAT~TXNSTAT~BRNCD~CCY1~CCY2</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "CYDRATEE";
var defaultWhereClause = "Branch_Code = Global.Current_Branch";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CCY_RATE_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CCY_RATE_MASTER" : "","BLK_CCY_RATE_DETAILS" : "BLK_CCY_RATE_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_CCY_RATE_MASTER","BLK_CCY_RATE_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside CYDRATEE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside CYDRATEE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CCY_RATE_MASTER__BRNCD";
pkFields[0] = "BLK_CCY_RATE_MASTER__BRNCD";
queryFields[1] = "BLK_CCY_RATE_MASTER__CCY1";
pkFields[1] = "BLK_CCY_RATE_MASTER__CCY1";
queryFields[2] = "BLK_CCY_RATE_MASTER__CCY2";
pkFields[2] = "BLK_CCY_RATE_MASTER__CCY2";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CCY_RATE_DETAILS":["BUYRATE","BUYSPRD","INTAUTHSTAT","MIDRATE","RATEDATEI","RATESER","RATETYPE","SALERATE","SALESPRD","UNAUTHBUYRATE","UNAUTHBUYSPRD","UNAUTHMIDRATE","UNAUTHRATEDATE","UNAUTHRATESER","UNAUTHSALERATE","UNAUTHSALESPRD"]};
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
var lovInfoFlds = {"BLK_CCY_RATE_MASTER__CCY1__LOV_CCY_PAIR":["BLK_CCY_RATE_MASTER__CCY1~BLK_CCY_RATE_MASTER__CCY2~~~~","","N~N",""],"BLK_CCY_RATE_DETAILS__RATETYPE__LOV_RATE_TYPE":["BLK_CCY_RATE_DETAILS__RATETYPE~~","BLK_CCY_RATE_MASTER__CCY1!VARCHAR2~BLK_CCY_RATE_MASTER__CCY2!VARCHAR2","N~N","N"]};
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
var multipleEntryIDs = new Array("BLK_CCY_RATE_DETAILS");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_CCY_RATE_MASTER"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("N"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["CYDRATEE"]="KERNEL";
ArrPrntFunc["CYDRATEE"]="";
ArrPrntOrigin["CYDRATEE"]="";
ArrRoutingType["CYDRATEE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["CYDRATEE"]="N";
ArrCustomModified["CYDRATEE"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------