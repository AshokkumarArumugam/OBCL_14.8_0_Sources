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
**  File Name          : OLDINTAX_SYS.js
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
var fieldNameArray = {"BLK_TAX_MASTER":"PRIORTAXCURRENCY~TAXAMTDUE~CURRTAXCONSTANT~PRIORTAXAMOUNT~TAXAUTHID~NEXTDISBURSEMENTDATE~DISBURSEMENTFREQ~PARCELNUMBER~TAXTYPE~SEQNO~BRANCHCODE~BORROWERPAYMENTOPTION~LIENSEQNO~HITCODE~TOTALDELINQUENTAMOUNT~VENDORNAME~VERSIONNO~BILLINGSTATUS~DELINQUENTSTATUS~LASTPAIDDATE~LASTBILLTYPE~TAXAUTHSTATE~CONTRACTREFNO~PROPERTYCODE~TAXAUTHCOUNTY~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_TAX_HISTORY":"PRIORTAXCURRENCY~CONTRACTREFNO~SEQNO~TAXTYPE~PARCELNUMBER~DISBURSEMENTFREQ~NEXTDISBURSEMENTDATE~TAXAUTHID~PRIORTAXAMOUNT~CURRTAXCONSTANT~TAXAMTDUE~LASTPAIDDATE~DELINQUENTSTATUS~BILLINGSTATUS~PROPERTYCODE~VERSIONNO~VENDORNAME~TOTALDELINQUENTAMOUNT"};

var multipleEntryPageSize = {"BLK_TAX_HISTORY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_CHANGES":"BLK_TAX_HISTORY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TAX_MASTER">PRIORTAXCURRENCY~TAXAMTDUE~CURRTAXCONSTANT~PRIORTAXAMOUNT~TAXAUTHID~NEXTDISBURSEMENTDATE~DISBURSEMENTFREQ~PARCELNUMBER~TAXTYPE~SEQNO~BRANCHCODE~BORROWERPAYMENTOPTION~LIENSEQNO~HITCODE~TOTALDELINQUENTAMOUNT~VENDORNAME~VERSIONNO~BILLINGSTATUS~DELINQUENTSTATUS~LASTPAIDDATE~LASTBILLTYPE~TAXAUTHSTATE~CONTRACTREFNO~PROPERTYCODE~TAXAUTHCOUNTY~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_TAX_MASTER" RELATION_TYPE="N" TYPE="BLK_TAX_HISTORY">PRIORTAXCURRENCY~CONTRACTREFNO~SEQNO~TAXTYPE~PARCELNUMBER~DISBURSEMENTFREQ~NEXTDISBURSEMENTDATE~TAXAUTHID~PRIORTAXAMOUNT~CURRTAXCONSTANT~TAXAMTDUE~LASTPAIDDATE~DELINQUENTSTATUS~BILLINGSTATUS~PROPERTYCODE~VERSIONNO~VENDORNAME~TOTALDELINQUENTAMOUNT</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TAX_MASTER">AUTHSTAT~TXNSTAT~CONTRACTREFNO~TAXTYPE~PARCELNUMBER~BILLINGSTATUS~NEXTDISBURSEMENTDATE~PROPERTYCODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDINTAX";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TAX_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TAX_MASTER" : "","BLK_TAX_HISTORY" : "BLK_TAX_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_TAX_MASTER","BLK_TAX_HISTORY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDINTAX.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDINTAX.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TAX_MASTER__PROPERTYCODE";
pkFields[0] = "BLK_TAX_MASTER__PROPERTYCODE";
queryFields[1] = "BLK_TAX_MASTER__CONTRACTREFNO";
pkFields[1] = "BLK_TAX_MASTER__CONTRACTREFNO";
queryFields[2] = "BLK_TAX_MASTER__TAXTYPE";
pkFields[2] = "BLK_TAX_MASTER__TAXTYPE";
queryFields[3] = "BLK_TAX_MASTER__PARCELNUMBER";
pkFields[3] = "BLK_TAX_MASTER__PARCELNUMBER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TAX_MASTER":["BILLINGSTATUS","BORROWERPAYMENTOPTION","CURRTAXCONSTANT","DELINQUENTSTATUS","DISBURSEMENTFREQ","HITCODE","LASTPAIDDATEI","LIENSEQNO","NEXTDISBURSEMENTDATEI","PRIORTAXAMOUNT","TAXAMTDUE","TAXAUTHID","TOTALDELINQUENTAMOUNT","VENDORNAME"]};
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
var lovInfoFlds = {"BLK_TAX_MASTER__TAXAUTHID__LOV_TAX_AUTH_ID":["BLK_TAX_MASTER__TAXAUTHID~","","N",""],"BLK_TAX_MASTER__TAXTYPE__LOV_TAX_TYPE":["BLK_TAX_MASTER__TAXTYPE~~","","N~N",""],"BLK_TAX_MASTER__VENDORNAME__LOV_VENDOR_NAME":["BLK_TAX_MASTER__VENDORNAME~","BLK_TAX_MASTER__TAXAUTHID!VARCHAR2","N",""],"BLK_TAX_MASTER__CONTRACTREFNO__LOV_CONTRACT_REF":["BLK_TAX_MASTER__CONTRACTREFNO~~","","N~N",""],"BLK_TAX_MASTER__PROPERTYCODE__LOV_PROP_CODE":["BLK_TAX_MASTER__PROPERTYCODE~~","BLK_TAX_MASTER__CONTRACTREFNO!varchar2","N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_TAX';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_TAX_HISTORY");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_TAX_MASTER"); 

 var CallFormRelat=new Array("ONE TO ONE"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDINTAX"]="KERNEL";
ArrPrntFunc["OLDINTAX"]="";
ArrPrntOrigin["OLDINTAX"]="";
ArrRoutingType["OLDINTAX"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDINTAX"]="N";
ArrCustomModified["OLDINTAX"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------