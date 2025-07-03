/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2004 - 2015  Oracle and/or its affiliates.  All rights reserved.
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


  Changed By         : Vineeth T M
  Changed On         : 09-Feb-2021
  Search String      : OBCL_14.4_SUPP#32476729 changes
  Change Reason      : Visit all pages for waive all .
------------------------------------------------------------------------------------------
*/
/*
---------------------------------------------------------------------------------------- 
*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";




function fnPreLoad_KERNEL()
{
	return true;
}

function fnPreLoad_Child_KERNEL()
{
	return true;
}

function fnPostLoad_CVS_TAX_KERNEL(screenArgs)
{
	 getElementsByOjName("cmdAddRow_BLK_RULE")[0].className="BTNhide";
	 getElementsByOjName("cmdDelRow_BLK_RULE")[0].className="BTNhide";
	 getElementsByOjName("BTN_SINGLE_VIEW_BLK_RULE")[0].className="BTNhide";

	 getElementsByOjName("cmdAddRow_BLK_RULE_DETAILS")[0].className="BTNhide";
	 getElementsByOjName("cmdDelRow_BLK_RULE_DETAILS")[0].className="BTNhide";
	 getElementsByOjName("BTN_SINGLE_VIEW_BLK_RULE_DETAILS")[0].className="BTNhide";
	 
	 //document.getElementById('BLK_TAXES__CONREFNO').value=screenArgs['CONTRACT_REF_NO'];
	 
	 return true;
}

function fnPostLoad_Child_KERNEL()
{
	return true;
}

function fnPreNew_KERNEL()
{
	return true;
}

function fnPreNew_Child_KERNEL()
{
	return true;
}

function fnPostNew_KERNEL()
{
    return true;
}

function fnPostNew_Child_KERNEL()
{
    return true;
}

function fnPreUnlock_KERNEL()
{
    return true;
}

function fnPreUnlock_Child_KERNEL()
{
    return true;
}

function fnPostUnlock_KERNEL()
{
    return true;
}

function fnPostUnlock_Child_KERNEL()
{
    return true;
}

function fnPreAuthorize_KERNEL()
{
    return true;
}

function fnPreAuthorize_Child_KERNEL()
{
    return true;
}

function fnPostAuthorize_KERNEL()
{
    return true;
}

function fnPostAuthorize_Child_KERNEL()
{
    return true;
}

function fnPreCopy_KERNEL()
{
    return true;
}

function fnPreCopy_Child_KERNEL()
{
    return true;
}

function fnPostCopy_KERNEL()
{
    return true;
}

function fnPostCopy_Child_KERNEL()
{
    return true;
}

function fnPreClose_KERNEL()
{
    return true;
}

function fnPreClose_Child_KERNEL()
{
    return true;
}

function fnPostClose_KERNEL()
{
    return true;
}

function fnPostClose_Child_KERNEL()
{
    return true;
}

function fnPreReOpen_KERNEL()
{
    return true;
}

function fnPreReOpen_Child_KERNEL()
{
    return true;
}

function fnPostReOpen_KERNEL()
{
    return true;
}

function fnPostReOpen_Child_KERNEL()
{
    return true;
}

function fnPreDelete_KERNEL()
{
    return true;
}

function fnPreDelete_Child_KERNEL()
{
    return true;
}

function fnPostDelete_KERNEL()
{
    return true;
}

function fnPostDelete_Child_KERNEL()
{
    return true;
}

function fnPreEnterQuery_KERNEL()
{
    return true;
}

function fnPreEnterQuery_Child_KERNEL()
{
    return true;
}

function fnPostEnterQuery_KERNEL()
{
    return true;
}

function fnPostEnterQuery_Child_KERNEL()
{
    return true;
}

function fnPreExecuteQuery_KERNEL()
{
    return true;
}

function fnPreExecuteQuery_Child_KERNEL()
{
    return true;
}

function fnPostExecuteQuery_KERNEL()
{
    return true;
}

function fnPostExecuteQuery_Child_KERNEL()
{
    return true;
}

function fnPreSave_KERNEL()
{
    var isValid = true;
    
    
    if (!isValid)
    {
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        return false;
    }

    return isValid;
}

function fnPreSave_Child_KERNEL()
{
    var isValid = true;
    
    
    if (!isValid)
    {
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        return false;
    }

    return isValid;
}

function fnPostSave_KERNEL()
{
    return true;
}

function fnPostSave_Child_KERNEL()
{
    return true;
}
function fnCheckWaiveAll()
{
	var tableRef =getTableObjForBlock("BLK_RULE");// Redwood_changes_akhila
	//OBCL_14.4_SUPP#32476729 changes start
	//var totalRows = tableRef.tBodies[0].rows.length;
	//var rowRef = tableRef.tBodies[0].rows;
	var totalRows ; 
	//Redwood_changes_akhila start
	//var l_tot = Number(getInnerText(document.getElementById("TotPage__BLK_RULE")));
	//var l_cur = Number(getInnerText(document.getElementById("CurrPage__BLK_RULE")));
	var l_tot = getInnerText(getNextSibling(document.getElementById("paging_BLK_RULE_nav_input")));
	l_tot = Number(l_tot.split(' ')[1]);
	var l_cur = Number(getInnerText(document.getElementById("paging_BLK_RULE_nav_input")));
	//Redwood_changes_akhila End
	Navigate(N_FIRST,'BLK_RULE');
	for (j=0;j<l_tot;j++){
		totalRows = tableRef.tBodies[0].rows.length;
		//OBCL_14.4_SUPP#32476729 changes end
	if (document.getElementById("BLK_TAX__WAIVER").value)
	{
			for( i=0 ; i <= totalRows ; i++ )
			{	   
			getElementsByOjName("WAIVER")[i].value = true;
			}		
	}	
	else
	{	
	for( i=0 ; i <= totalRows ; i++ )
			{	   
			getElementsByOjName("WAIVER")[i].value = false;
			}
	}
		//OBCL_14.4_SUPP#32476729 changes start
		//if(Number(getInnerText(document.getElementById("CurrPage__BLK_RULE")))==l_tot) //Redwood_changes_akhila
		if(Number(getInnerText(document.getElementById("paging_BLK_RULE_nav_input")))==l_tot) //Redwood_changes_akhila
		    break;
		else
		    Navigate(N_NEXT,'BLK_RULE');
	}
	//while(Number(getInnerText(document.getElementById("CurrPage__BLK_RULE")))!=l_cur) //Redwood_changes_akhila
	while(Number(getInnerText(document.getElementById("paging_BLK_RULE_nav_input")))!=l_cur)
	    Navigate(N_PREVIOUS,'BLK_RULE');
	//OBCL_14.4_SUPP#32476729 changes end
	return true;
}
