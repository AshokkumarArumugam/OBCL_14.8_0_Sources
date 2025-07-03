/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved.
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
**  File Name          :  LBDPCMAP_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**	Changed By           : JayaramN                                           
**	Date                 : 02-Aug-2020                                         
**	Change Description   : BRANCH CODE OF THE SELECTED SELF PARTICIPANT DOES NOT POPULATE IN LB OL PRODUCT COMPONENT MAPPING SCREEN
**	Search String        : Bug#31508717
****************************************************************************************************************************/
//Bug#31508717 - Starts
function Fn_setLDBranch()
{
	var intrfcType = document.getElementById("BLK_LBTMS_STP_PRODUCT_MAP__INTERFACETYPE").value;	
	var selfBrnch = document.getElementById("BLK_LBTMS_STP_PRODUCT_MAP__BRANCH").value;	
	var ldBranch = document.getElementById("BLK_LBTMS_STP_PRODUCT_MAP__LDBRANCH").value;
	if ( intrfcType == "I" && ldBranch=="" )
	{
		document.getElementById("BLK_LBTMS_STP_PRODUCT_MAP__LDBRANCH").value = selfBrnch;
	}	
	return true;	
}
//Bug#31508717 - Ends
