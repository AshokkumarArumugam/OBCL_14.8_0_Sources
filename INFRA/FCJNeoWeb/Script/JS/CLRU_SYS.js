/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software System and is copyrighted by 
**  Oracle Financial Services Software Limited.
**  
**  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle Financial Services Software Limited.
**  
**  Oracle Financial Services Software Limited.
**  10-11, SDF I, SEEPZ, Andheri (East),
**  Mumbai - 400 096.
**  India.
**  
**  Copyright (c) 2008 - 2011 by Oracle Financial Services Software Limited. All rights reserved.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : CLRU_SYS.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------

var fieldNameArray = {"BLK_USER":"LBL_USERID","BLK_USER_LIST":"BRN_CODE~USER_ID~USER_NAME","BLK_CLEAR":""};
var callFormBlocks = "";
var multipleEntrySVBlocks = "";
var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_USER">LBL_USERID</FN>'; 
msgxml += '      <FN PARENT="BLK_USER" RELATION_TYPE="N" TYPE="BLK_USER_LIST">BRN_CODE~USER_ID~USER_NAME</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CLEAR"></FN>'; 
msgxml += '    </FLD>'; 
var tabMEBlks = {"CVS_MAIN_TAB_MAIN":"BLK_USER_LIST"};
var multipleEntryPageSize = {"BLK_USER_LIST" :"15"};
var strScreenName = "CVS_MAIN";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
/*var relationArray = new Array(); 			// {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['BLK_USER'] = ""; 
relationArray['BLK_USER_LIST'] = "BLK_USER~N"; 
relationArray['BLK_CLEAR'] = ""; */
var relationArray = {"BLK_USER":"","BLK_USER_LIST":"BLK_USER~N","BLK_CLEAR":""};

var dataSrcLocationArray = new Array("BLK_USER","BLK_USER_LIST","BLK_CLEAR"); 	// Array of all Data Sources used in the screen 
/*dataSrcLocationArray[0] = "BLK_USER"; 
dataSrcLocationArray[1] = "BLK_USER_LIST"; 
dataSrcLocationArray[2] = "BLK_CLEAR"; */
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside CLRU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside CLRU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_USER__LBL_USERID";
pkFields[0] = "BLK_USER__LBL_USERID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var modifyAmendArr = new Array(); 
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
var queryAmendArr = new Array(); 
var authorizeAmendArr = new Array(); 
var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovVal = new Array();

var offlineRetflds = new Array();
var offlineBndFlds = new Array();

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
//--------------------------------------------
multipleEntryIDs[0] = 'BLK_USER_LIST';
//--------------------------------------------
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

ArrFuncOrigin["CLRU"]="KERNEL";
ArrPrntFunc["CLRU"]="";
ArrPrntOrigin["CLRU"]="";
ArrRoutingType["CLRU"]="X";

//***** CODE FOR COPY FIELDS *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = new Array(); 
var scrArgSource = new Array(); 
var scrArgDest = new Array(); 
var scrArgVals = new Array(); 
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = new Array(); 
var dpndntOnSrvs = new Array(); 
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1"};
