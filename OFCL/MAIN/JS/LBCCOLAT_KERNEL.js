/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : LBCCOLAT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
****************************************************************************************************************************/
/*
function fnPostLoad_CVS_DRAWDOWN_PROD_KERNEL(){
	document.getElementsByName('cmdAddRow_BLK_LBTBS_BORR_DRAWDOWN_COMP')[0].style.visibility = 'hidden';
	document.getElementsByName('cmdDelRow_BLK_LBTBS_BORR_DRAWDOWN_COMP')[0].style.visibility = 'hidden';
	return true;
}*/

function fnCalculate()
{
	l_prev_gAction=gAction;
	gAction = "ENRICH";
	fnClassDefault("BLK_OLTBS_CONTRACT_COLAT");
	gAction = l_prev_gAction;
	
return true;	
}

function fnPostLoad_CVS_COLAT_KERNEL(screenArgs) {
	
	 fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT_COLAT__BTN_CALCULATE"));
	return true;
}

function fnPreClassDefault_CVS_COLAT_KERNEL(){
	gAction = 'ENRICH';
	return true;
}