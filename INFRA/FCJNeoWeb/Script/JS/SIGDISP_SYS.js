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
**  Copyright © 2008 - 2011 by Oracle Financial Services Software Limited. All rights reserved.
**  
**  Written by         : 
**  Date of creation   : 
** File Name           :SIGDISP_SYS.js
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
var msgxml = "";
// Changes For Customer Signature Starts
msgxml += '    <FLD>';
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ACCOUNT_DETAILS">BRANCH~CUST_ACC~CCY~DESC_ACC~ACCMSG</FN>'; 
msgxml += '      <FN PARENT="BLK_ACCOUNT_DETAILS" RELATION_TYPE="N" TYPE="BLK_SIGNATURE_DETAILS">CIF_ID~JOINT_TYPE~SIGN_ID~SIG_NAME~SIGN_TYPE~APPR_LIMIT~SIGN_MSG~SOLO_SUFFICIENT</FN>'; 
msgxml += '      <FN PARENT="BLK_SIGNATURE_DETAILS" RELATION_TYPE="N" TYPE="BLK_SIGNATURE">SPECIMAN_NO~IMG_TYPE~FILE_TYPE</FN>'; 
msgxml += '    </FLD>';

var strScreenName = "CVS_MAIN";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
var relationArray = new Array(); // {Table Name} is the array index, {Parent Table Name}~{Relation} is the array value 
relationArray['BLK_ACCOUNT_DETAILS'] = "";
relationArray['BLK_SIGNATURE_DETAILS'] = "BLK_ACCOUNT_DETAILS~N"; 
relationArray['BLK_SIGNATURE'] = "BLK_SIGNATURE_DETAILS~N"; 

var dataSrcLocationArray = new Array(); // Array of all Data Sources used in the screen 
dataSrcLocationArray[0] = "BLK_ACCOUNT_DETAILS";
dataSrcLocationArray[1] = "BLK_SIGNATURE_DETAILS"; 
dataSrcLocationArray[2] = "BLK_SIGNATURE"; 
// Changes For Customer Signature Ends
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside CLRU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside CLRU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ACCOUNT_DETAILS__CUST_ACC";
pkFields[0] = "BLK_ACCOUNT_DETAILS__CUST_ACC";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var modifyAmendArr = new Array(); 
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liqidateAmendArr = new Array(); 
var queryAmendArr = new Array(); 
var authorizeAmendArr = new Array(); 
var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
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
multipleEntryIDs[0] = 'BLK_ACCOUNT_DETAILS';
multipleEntryIDs[1] = 'BLK_SIGNATURE_DETAILS';
multipleEntryIDs[2] = 'BLK_SIGNATURE';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 
 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();
 
ArrFuncOrigin["SIGDISP"]="KERNEL";
ArrPrntFunc["SIGDISP"]="";
ArrPrntOrigin["SIGDISP"]="";
ArrRoutingType["SIGDISP"]="X";

//***** CODE FOR COPY FIELDS *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = new Array(); 
var scrArgSource = new Array(); 
var scrArgDest = new Array(); 
var scrArgVals = new Array(); 
