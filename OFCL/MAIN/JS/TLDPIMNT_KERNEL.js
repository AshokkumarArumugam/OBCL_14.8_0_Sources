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
**  File Name          : TLDPIMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  SFR NUMBER		   :29959798 
    Changed By         :Srinivasulu Ch
    Change Description :JS validations moved to backend
    Search String      :Bug#29959798

****************************************************************************************************************************/
var gNew = 'N';

//Bug#28522736 - Starts
/*function fnIdentifier(){	
	if((document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value=='S') &&  
		(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value!=null)){			
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__SILENT_PARTICIPANT").disabled=false;
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__FIRST_BUY_PARTICIPANT").disabled=false;			
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").value="";
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").disabled=true;
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").nextSibling.disabled = true;
     }
	else{
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__SILENT_PARTICIPANT").disabled=true;			
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").disabled=false;
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").nextSibling.disabled = false;	
	}
	if((document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__DESK").value=='DISTRESS' || 
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__DESK").value=='PAR') && 
		(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value=='S' )){				
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__SILENT_PARTICIPANT").disabled=false;			
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").value="";
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").disabled=true;
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").nextSibling.disabled = true;
	}
	if((document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__DESK").value!='DISTRESS' || 
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__DESK").value!='PAR') && 
		(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value!='S' )){				
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__SILENT_PARTICIPANT").disabled=true;			
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").disabled=false;
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").nextSibling.disabled = false;
	}
	document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__FIRST_BUY_PARTICIPANT").disabled=false;	
	return true;
}*/

//Bug#28522736 ends

function fnPostUnlock_KERNEL(){
	
	//Bug#28522736 - Start Commenting
	/*fnIdentifier();	
	document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC").disabled=true;
	document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC").disabled=true;			
	document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC").nextSibling.disabled=true;
	document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC").nextSibling.disabled=true;
	if((document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value=='W') ||  
		(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value=='S')){			
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").disabled=true;
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").nextSibling.disabled=true;	
		}	
	if((document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value!='W') && 
		(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value!='S')){			
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").disabled=false;
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").nextSibling.disabled=false;
		}*/
		//Bug#28522736 Ends
	return true;
}
function fnPostCopy_KERNEL(){
	
	//Bug#28522736 - Start Commenting
		/*fnIdentifier();
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC").disabled=true;
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC").disabled=true;	
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC").nextSibling.disabled=true;
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC").nextSibling.disabled=true;
	if((document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value=='W') ||  
		(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value=='S')){			
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").disabled=true;
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").nextSibling.disabled=true;	
		}
	if((document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value!='W') && 
		(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__IDENTIFIER_TYPE").value!='S')){			
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").disabled=false;
			document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__POSITION_QUALIFIER").nextSibling.disabled=false;
		}*/
		//Bug#28522736 Ends
	return true;
}
function fnPostNew_KERNEL(){	
    //Bug#28522736 Starts
	/*disableForm();
	fnEnableElement(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__PORTFOLIO"));	
	document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__PORTFOLIO").focus(); */
	//Bug#28522736 Ends
	gNew = 'Y';
	return true;
}
function fnId(){
	if(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__SILENT_PARTICIPANT").value){
		//Redwood_changes_akhila start
		/*
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC").disabled=false;
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC").disabled=false;	
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC").nextSibling.disabled=false; 
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC").nextSibling.disabled=false; 
		*/
		fnEnableElement(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC"));
        fnEnableElement(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC"));	
		//Redwood_changes_akhila end
	}	
	else{
		//Redwood_changes_akhila start
		/*
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC").disabled=true;
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC").disabled=true;
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC").nextSibling.disabled=true; 
		document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC").nextSibling.disabled=true;
		*/
		fnDisableElement(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC"));
		fnDisableElement(document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC")); 
		//Redwood_changes_akhila End
	}
}
function fnPostFocus_KERNEL(){
	
	//Bug#28522736 Starts
	/*if ((gAction != '') && (gNew == 'N')) {
		fnIdentifier();
	}*/
	return true;
}
function fnPostReturnValToParent_LOV_PORTFOLIO_KERNEL(){
	
	//Bug#28522736 Starts
	/*enableForm();
	fnIdentifier();
	document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC").disabled=true;
	document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC").disabled=true;
	document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_ONLINE_MNEMONIC").nextSibling.disabled=true;
	document.getElementById("BLK_TLTMS_POSITION_IDENTIFIER__COL_SETTLEMENT_MNEMONIC").nextSibling.disabled=true;*/
	
	gNew = 'N';
	//return true;
}