/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2016  Oracle and/or its affiliates.  All rights reserved.
**                                                                                                                                                                                           
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.


------------------------------------------------------------------------------------------
*/
/*
---------------------------------------------------------------------------------------
**  Written by         : Geetanjali Patted 
**  Date of creation   : 17th November 2016
**  File Name          : EIDDEOTI_KERNEL.js

**	Modified By   :	Aiswarya Donthi
** 	Modified on   : 7-Feb-2022
** 	Description   : Redwood Changes done 
** 	Search String : redwood_changes

  **  Modified By          : Pooja Kamath
  **  Modified On          : 15-Dec-2023
  **  Modified Reason      : Changes to enable Drop EOTI button in EIDDEOTI screen when multi branch access is enabled.
  **  Base Bug             : 35911682
  **  Search String        : Bug_36128720 
*/
//------------------------------------------------------------------------------
var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";


function fnPostLoad_KERNEL() {
	
	try{
        gAction = 'NEW';
        fnNew();
	   //DisableToolbar_buttons("Save");
	   //getElementsByOjName("Save")[0].style.visibility = "hidden";
        getElementsByOjName('BRANCH_CODE')[0].value = mainWin.CurrentBranch;  //redwood_changes
        getElementsByOjName('BRANCH_NAME')[0].value = mainWin.CurrentBranchName;  //redwood_changes
        getElementsByOjName('END_OF_INPUT')[0].value = mainWin.BranchEoi;  //redwood_changes
        var branchEoiDesc = mainWin.BranchEoi;
        branchEoiDesc = (branchEoiDesc=='B')?'Beginning of Day'
            :(branchEoiDesc=='N')?'Daily Transactions Input'
            :(branchEoiDesc=='T')?'End of Transactions Input'
            :(branchEoiDesc=='F')?'End of Financials Input'
            :'Unknown Status';
        getElementsByOjName('END_OF_INPUT')[0].value = branchEoiDesc;  //redwood_changes
	    gAction = '';
	    DisableToolbar_buttons("Save");
	   //getElementsByOjName("Save")[0].style.visibility = "hidden";
	    gAction = '';
return true;
}
catch(e) {return false;}
		
		}

function fn_drop() 
{
        // DisableToolbar_buttons("Save");
	    //getElementsByOjName("Save")[0].style.visibility = "hidden";
	     gAction ='DROPEOTI';  
		getElementsByOjName('BRANCH_NAME')[0].value = '';  //redwood_changes
        getElementsByOjName('END_OF_INPUT')[0].value = '';  //redwood_changes
		getElementsByOjName('END_OF_INPUT')[0].value ='';  //redwood_changes
        appendData();
		gAction ='DROPEOTI';  
		fcjRequestDOM = buildUBSXml();
		fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
		resetIndex();
		var msgStatus = fnProcessResponse();
		fnPostProcessResponse(msgStatus);
		gAction = '';
		getElementsByOjName('BRANCH_CODE')[0].value = mainWin.CurrentBranch;  //redwood_changes
        getElementsByOjName('BRANCH_NAME')[0].value = mainWin.CurrentBranchName;  //redwood_changes
        getElementsByOjName('END_OF_INPUT')[0].value = mainWin.BranchEoi;  //redwood_changes
        var branchEoiDesc = mainWin.BranchEoi;
        branchEoiDesc = (branchEoiDesc=='B')?'Beginning of Day'
            :(branchEoiDesc=='N')?'Daily Transactions Input'
            :(branchEoiDesc=='T')?'End of Transactions Input'
            :(branchEoiDesc=='F')?'End of Financials Input'
            :'Unknown Status';
        getElementsByOjName('END_OF_INPUT')[0].value = branchEoiDesc;  //redwood_changes
	    DisableToolbar_buttons("Save");
		//getElementsByOjName("Save")[0].style.visibility = "hidden";
	    gAction = '';
	return true;
}
	
//introduced function fnPostExecuteQuery_KERNEL
//Bug_36128720 starts
function fnPostExecuteQuery_KERNEL()
{
try{
fnEnableElement(document.getElementById("BLK_MASTER__DROP_END_OF_TRANSCATION_INPUT"));	
return true;
		}
catch(e) {return false;}
		
		}
//Bug_36128720 ends