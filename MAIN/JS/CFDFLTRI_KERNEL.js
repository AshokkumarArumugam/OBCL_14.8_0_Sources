/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
**  File Name          : CFDFLTRI_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
 function fnPostNew_KERNEL()
{
       document.getElementById("BLK_RATE_CODE__BRANCH_CODE").value =mainWin.CurrentBranch;	
	   fnDisableElement(document.getElementById("BLK_RATE_CODE__BRANCH_CODE"));
	return true;
}

function fnPostCopy_KERNEL() {
	   document.getElementById("BLK_RATE_CODE__BRANCH_CODE").value =mainWin.CurrentBranch;	
	   fnDisableElement(document.getElementById("BLK_RATE_CODE__BRANCH_CODE")); 
	return true;
}
function fnPostEnterQuery_KERNEL() {
	document.getElementById("BLK_RATE_CODE__BRANCH_CODE").value =mainWin.CurrentBranch;	
	fnDisableElement(document.getElementById("BLK_RATE_CODE__BRANCH_CODE")); 
	return true;
}
 function fnPostExecuteQuery_KERNEL()
{
	return true;
}