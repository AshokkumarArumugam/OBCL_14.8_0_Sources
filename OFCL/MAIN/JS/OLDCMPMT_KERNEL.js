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
**  Date of creation   : 01-JUL-2016
**  File Name          : LDDCMPMT_KERNEL.js
**  Purpose            : 
**  Called From        : OLDCMPMT
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPostCopy_KERNEL() {
	document.getElementById("BLK_LFTM_COMP_RATE_CODE_MASTER__BRANCHCODE").value = mainWin.CurrentBranch; 
	return true;
}
function fnPostEnterQuery_KERNEL() {
	fnDisableElement(document.getElementById("BLK_LFTM_COMP_RATE_CODE_MASTER__BRANCHCODE"));
	return true;
}
