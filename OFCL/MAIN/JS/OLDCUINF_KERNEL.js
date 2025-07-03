/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2019, Oracle and/or its affiliates.
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
**  File Name          : OLDCUINF_KERNEL.js
**  Purpose            : 
**  Called From        : 

 **Changed By         : Aishwarya Sekar
 **Date               : 10-AUG-2021
 **Change Description : Addd more filter criterias in QuerycustInfo service request                        
 **Search String      : OBCL_14.5_OBTF310_Changes
****************************************************************************************************************************/
function fnPreEnterQuery_KERNEL() {
	fnEnableElement(document.getElementById("BLK_CUSTOMER__CONTRACT_REF_NO"));
	fnEnableElement(document.getElementById("BLK_CUSTOMER__BRANCH"));
	//OBCL_14.5_OBTF310 start
	fnEnableElement(document.getElementById("BLK_CUSTOMER__USER_REF_NO"));
	fnEnableElement(document.getElementById("BLK_CUSTOMER__PRODUCT"));
	fnEnableElement(document.getElementById("BLK_CUSTOMER__CURRENCY"));
	fnEnableElement(document.getElementById("BLK_CUSTOMER__LOAN_AMT_FROM"));
	fnEnableElement(document.getElementById("BLK_CUSTOMER__LOAN_AMT_TO"));
	fnEnableElement(document.getElementById("BLK_CUSTOMER__DSBR_FROM_DATE"));
	fnEnableElement(document.getElementById("BLK_CUSTOMER__DSBR_TO_DATE"));
	fnEnableElement(document.getElementById("BLK_CUSTOMER__MATURITY_FROM_DATE"));
	fnEnableElement(document.getElementById("BLK_CUSTOMER__MATURITY_TO_DATE"));
	//OBCL_14.5_OBTF310 end
	return true;
}