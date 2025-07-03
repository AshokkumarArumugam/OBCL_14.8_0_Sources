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
**  Written by         : K.PRIYADARSHINI
**  Date of creation   : 27.5.2016
**  File Name          : CFCPRCHG_KERNEL.js
**  Purpose            : 
**  Called From        : OLDPRMNT
**  

***************************************************************************************************************************
*/

function fnPostLoad_CVS_CHARGE_CLASS_KERNEL(screenArgs) {
	document.getElementById("BLK_CHARGE_DETAILS__MODULE").value = document.getElementById("BLK_PRODUCT_CHARGES__MODULE").value;
if (gAction == "MODIFY"){
		
		getElementsByOjName("BTN_DEFAULT_CLASS")[0].disabled= false;
	   }
	return true;
}

function fnPreClassDefault_CVS_CHARGE_CLASS_KERNEL(screenArgs)
{ 
document.getElementById("BLK_CHARGE_DETAILS__CURRENT_COMP").value = document.getElementById("BLK_CHARGE_DETAILS__COMPONENT").value;
return true;
}

function fnPostClassDefault_CVS_CHARGE_CLASS_KERNEL(screenArgs)
{ 
document.getElementById("BLK_CHARGE_DETAILS__CURRENT_COMP").value = '';
return true;
}



