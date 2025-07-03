/*----------------------------------------------------------------------------------------------------
**
** File Name    :EXTAUTHORIZE_SYS.js
**
** Module       :FCJNeoWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services  Software Limited.
** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services Software Limited.
** Oracle Financial Services  Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 2004-2011   by Oracle Financial Services  Software Limited..
----------------------------------------------------------------------------------------------------
*/


var detailRequired = true ;

//***** SCRIPT FOR TABS *****
var l_HeaderTabId = '';
var strCurrentTabId = 'All';

var dataSrcLocationArray = new Array();
dataSrcLocationArray[0] = "BLK_AUDIT_LOG"; 
dataSrcLocationArray[1] = "BLK_OVERRIDE_MASTER"; 
dataSrcLocationArray[2] = "BLK_OVERRIDE_DETAILS"; 
dataSrcLocationArray[3] = "BLK_FIELD_LOG"; 

var relationArray = new Array(); 
relationArray['BLK_AUDIT_LOG'] = ""; 
relationArray['BLK_OVERRIDE_MASTER'] = "BLK_AUDIT_LOG~N"; 
//relationArray['BLK_OVERRIDE_DETAILS'] = "BLK_OVERRIDE_MASTER~N"; 
relationArray['BLK_OVERRIDE_DETAILS'] = "BLK_AUDIT_LOG~N"; 
relationArray['BLK_FIELD_LOG'] = "BLK_AUDIT_LOG~N"; 

//Primary Key Field Information
var pkFields    = new Array(); 
pkFields[0] = "BLK_AUDIT_LOG__MODNO";


//***** Ammendabale Fields *****
var amendArr = new Array(); 


//***** Subsystem Depended Fields. *****
var subsysArr    = new Array(); 

var fieldNameArray = {"BLK_AUDIT_LOG":"MODNO~TXNSTAT~FIRSTAUTHSTAT~AUTHSTAT~MAKER~MAKERSTAMP~FIRSTCHECKER~FIRSTCHECKERSTAMP~CHECKER~CHECKERSTAMP~MAKERREMARKS~FIRSTCHECKERREMARKS~CHECKERREMARKS","BLK_OVERRIDE_MASTER":"MODNO~REQID~MAKEROVDREMARKS","BLK_OVERRIDE_DETAILS":"REQID~WCODE~WDESC","BLK_FIELD_LOG":"MODNO~FIELDNAME~OLDVALUE~NEWVALUE"};
var multipleEntryPageSize = {"BLK_AUDIT_LOG" :"15","BLK_OVERRIDE_MASTER":"15","BLK_OVERRIDE_DETAILS":"15","BLK_FIELD_LOG":"15" };
var multipleEntrySVBlocks = "";
var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_AUDIT_LOG~BLK_OVERRIDE_MASTER~BLK_OVERRIDE_DETAILS~BLK_FIELD_LOG"};
//***** FCJ XML FOR THE SCREEN *****
var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN ISQUERY="0" PARENT="" RELATION_TYPE="N" TYPE="BLK_AUDIT_LOG">MODNO~TXNSTAT~FIRSTAUTHSTAT~AUTHSTAT~MAKER~MAKERSTAMP~FIRSTCHECKER~FIRSTCHECKERSTAMP~CHECKER~CHECKERSTAMP~MAKERREMARKS~FIRSTCHECKERREMARKS~CHECKERREMARKS</FN>'; 
msgxml += '      <FN ISQUERY="0" PARENT="BLK_AUDIT_LOG" RELATION_TYPE="N" TYPE="BLK_OVERRIDE_MASTER">MODNO~REQID~MAKEROVDREMARKS</FN>'; 
//msgxml += '      <FN ISQUERY="0" PARENT="BLK_OVERRIDE_MASTER" RELATION_TYPE="N" TYPE="BLK_OVERRIDE_DETAILS">REQID~WCODE~WDESC</FN>'; 
msgxml += '      <FN ISQUERY="0" PARENT="BLK_AUDIT_LOG" RELATION_TYPE="N" TYPE="BLK_OVERRIDE_DETAILS">REQID~WCODE~WDESC</FN>'; 
msgxml += '      <FN ISQUERY="0" PARENT="BLK_AUDIT_LOG" RELATION_TYPE="N" TYPE="BLK_FIELD_LOG">MODNO~FIELDNAME~OLDVALUE~NEWVALUE</FN>'; 
msgxml += '    </FLD>'; 


//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
var multipleEntryIDs = new Array();
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
multipleEntryIDs[0] = 'BLK_AUDIT_LOG';
multipleEntryIDs[1] = 'BLK_OVERRIDE_MASTER';
multipleEntryIDs[2] = 'BLK_OVERRIDE_DETAILS';
multipleEntryIDs[3] = 'BLK_FIELD_LOG';


//***** SCRIPT FOR Callform Details.*****
var ArrFuncOrigin =new Array();
var ArrPrntFunc	  =new Array();
var ArrPrntOrigin =new Array();
var ArrRoutingType =new Array();

ArrFuncOrigin['EXTAUTHORIZE'] ="KERNEL";
ArrPrntFunc['EXTAUTHORIZE']	  ="";
ArrPrntOrigin['EXTAUTHORIZE']="";
ArrRoutingType['EXTAUTHORIZE']="X";
