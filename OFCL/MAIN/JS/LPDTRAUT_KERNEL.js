/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
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
**  File Name          : OLDTRAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : K.PRIYADARSHINI
**  Last modified on   : 08-NOV-2016
**  Search String      : OFCL_12.3.0.0.0_25045972 
**  Reason             : Added Custom function call to launch CallForm so that UI field value can be set
**  Last Modified By   : K.PRIYADARSHINI
**  Last modified on   : 10-NOV-2016
**  Search String      : OFCL_12.3.0.0.0_25073643  
**  Reason             : Changed the RAD and renamed the blocks etc
**  Last Modified By   : Ravi Ranjan 
**  Last modified on   : 21-NOV-2016
**  Search String      : OFCL_12.3.0.0.0_25049289  
**  Reason             : Added Counterparty field for enabel
**
**  Last Modified By   : Prakash Ravi
**  Last modified on   : 07-May-2020
**  Search String      : OBCL_14.1_SUPPORT_BUG#31101361
**  Reason             : Re-key field(s) value becomes non-editable when press ToggleAllOrNone checkbox in Change Log/Overrides multigrid
						 Re-key field(s) value vanishes when press Navigate button in Change Log

  Changed By         : Akhila Samson
  Date               : 09-Apr-2023
  Change Description : Redwood changes
  Search String      : Redwood_changes
****************************************************************************************************************************/
var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
//OFCL_12.3.0.0.0_25073643 changes starts
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_HEADER__BTNAUTH"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	   //fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNTI"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT")); //Redwood_changes
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));
	   //fnEnableElement(document.getElementById("BLK_HEADER__TXTREFRATEI"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTREFRATE")); //Redwood_changes
	   fnEnableElement(document.getElementById("BLK_HEADER__LSTINTRTSIGN"));        
	   //fnEnableElement(document.getElementById("BLK_HEADER__INTRTI"));      
	   fnEnableElement(document.getElementById("BLK_HEADER__INTRT"));//Redwood_changes
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCOUNTERPARTY")); //OFCL_12.3.0.0.0_25049289
	   //OFCL_12.3.0.0.0_25045972 changes starts
	//gAction = 'NEW';	
	//gAction = 'AUTH'; //OBCL_14.1_SUPPORT_BUG#31101361 
	   //OFCL_12.3.0.0.0_25045972 changes ends
	   
	gAction = 'NEW'; //OBCL_14.1_SUPPORT_BUG#31101361 
					 //Handled the AUTH in fnPreNavigate function.
	return true;
}

function fnPostExecuteQuery_KERNEL() {
	   DisableToolbar_buttons("Authorize");
	   var s = document.getElementById("BLK_HEADER__CONTRACTREFNO1").value;
       fnEnableElement(document.getElementById("BLK_HEADER__BTNAUTH"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	   //fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNTI"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT")); //Redwood_changes
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));
	   //fnEnableElement(document.getElementById("BLK_HEADER__TXTREFRATEI"))
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTREFRATE")); //Redwood_changes
	   fnEnableElement(document.getElementById("BLK_HEADER__LSTINTRTSIGN"));        
	   //fnEnableElement(document.getElementById("BLK_HEADER__INTRTI"));      
	   fnEnableElement(document.getElementById("BLK_HEADER__INTRT")); //Redwood_changes
	   fnEnableElement(document.getElementById("BLK_HEADER__TXTCOUNTERPARTY")); //OFCL_12.3.0.0.0_25049289
	   fnEnableElement(document.getElementById("BLK_HEADER__BTNSETLINFO")); //OFCL_12.3.0.0.0_25045972 changes
	 
 return true;
}

function Fn_OnAuth(){
    var gprev = gAction;
    gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	fnDisableElement(document.getElementById("BLK_HEADER__BTNAUTH"));        
			disableForm();
		}	
        return true;
    }
}

//OBCL_14.1_SUPPORT_BUG#31101361 Starts
function fnPreNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {

	gAction="";
    return true;
}

function fnPostNavigate_BLK_OLTBS_CONTRACT_CHANGE_LOG_KERNEL() {

	gAction='AUTH';
	fnEnableElement(document.getElementById("BLK_HEADER__TXTCCY"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTAMOUNT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTVALDT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTMATDT"));    
	fnEnableElement(document.getElementById("BLK_HEADER__INTRT"));
	fnEnableElement(document.getElementById("BLK_HEADER__TXTCOUNTERPARTY"));
    return true;
}
//OBCL_14.1_SUPPORT_BUG#31101361 Ends