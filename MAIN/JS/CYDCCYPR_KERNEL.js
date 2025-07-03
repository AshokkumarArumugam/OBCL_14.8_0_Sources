/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 - 2020 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : CYDCCYPR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**  Last Modified By   : Nisha B C
**  Last modified on   : 24-Apr-2019
**  Full Version       : FCUBS_JC_Minicore Integration_Currency_V1.1
**  Reason             : JC_Minicore Integration_Currency

**  Last Modified By   : Nisha B C
**  Last modified on   : 29-May-2019
**  Full Version       : Bug 29830999 - CYDRATEE - DIRECT SPREAD - PAIR NOT COMING IN QUERY - CYDRATEE
**  Reason             : JCROFC_Minicore_Integration - #<29830999>

**	Modified By   :	Aiswarya Donthi
** 	Modified on   : 7-Feb-2022
** 	Description   : Redwood Changes done 
** 	Search String : redwood_changes

****************************************************************************************************************************/
//JC_Minicore Integration_Currency Starts
function fnPostNew_KERNEL() 
{
	document.getElementById('BLK_CCY_PAIR_DETAILS__DIRECT_SPREAD').disabled=true;
	fn_Enable();
	return true;
}
//JC_Minicore Integration_Currency Ends
//JCROFC_Minicore_Integration - #<29830999> starts
function fn_Enable()
{
	if(document.getElementById('BLK_CCY_PAIR_DETAILS__CHKCCY').value==true)  //redwood_changes
		document.getElementById('BLK_CCY_PAIR_DETAILS__DIRECT_SPREAD').disabled=false;
	
	if(document.getElementById('BLK_CCY_PAIR_DETAILS__CHKCCY').value==false)  //redwood_changes
	{
		document.getElementById('BLK_CCY_PAIR_DETAILS__DIRECT_SPREAD').disabled=true;
		document.getElementById('BLK_CCY_PAIR_DETAILS__DIRECT_SPREAD').value=false;  //redwood_changes
	}
	return true;
}

function fnPostUnlock_KERNEL() 
{
	fn_Enable();
	return true;
}
//JCROFC_Minicore_Integration - #<29830999> ends
