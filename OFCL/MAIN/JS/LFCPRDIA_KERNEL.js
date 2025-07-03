/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
**  Written by         : 
**  Date of creation   : 
**  File Name          : CFCPRDIA_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  SFR No              : 71
**  Modified By         : Pavan K
**  Modified On         : 28-Jun-2012
**  Modified Reason     : Screenargs were not passed from Main screen to callform, for BUGDB 14238431
**  Search String       : FCUBS11.2 Retro LSINTERNAL  Ref LSINTERNAL_SFR#71
**  SFR No              : 18725485
**  Modified By         : Devicharan N
**  Modified On         : 15-May-2014
**  Modified Reason     : Product Code and Description are not defaulted in Ad hoc Charges.
**  Search String       : bug#18725485

**  SFR No              : 19916472
**  Modified By         : Kusuma R
**  Modified On         : 28-Oct-2014
**  Modified Reason     : Product Code and Description are going as undefined
**  Search String       : bug#19916472
****************************************************************************************************************************/
function fnPostLoad_CVS_CFCPRDIA_KERNEL(screenArgs) {//fc11.2_ft1_lsinternal_17 starts
	
	
	if (screenArgs)
	{
	document.getElementById("BLK_PRODUCT_DIARY__PRDCD").value = screenArgs['PRDCD'];
	document.getElementById("BLK_PRODUCT_DIARY__PRDDESC").value = screenArgs['PRDDESC'] ;
	document.getElementById("BLK_PRODUCT_DIARY__MODU").value = screenArgs['MODU'];
	document.getElementById("BLK_PRODUCT_DIARY__PRDTYP").value = screenArgs['PRDTYP'];
	//document.getElementById("BLK_PRODUCT_DIARY__MODULE1").value = screenArgs['MODU'];//18725485 bug#19916472
	//document.getElementById('BLK_PRODUCT_DIARY__MOD').value  = 'FC'; //bug#18725485	  bug#19916472
	
	}
	   appendData();  
	return true;
	}//fc11.2_ft1_lsinternal_17 ends
