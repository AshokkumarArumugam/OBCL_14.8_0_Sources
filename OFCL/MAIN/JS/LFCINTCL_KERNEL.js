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
**  Written by         : 
**  Date of creation   : 
**  File Name          : CFCINTCL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

 **Changed By         : Navoneel Nandan
  **Date               : 02-Dec-2019
  **Change Description : Added code to restict reset to default to Class to the selected Interest Component
  **Search String      : OBCL_14.3_support_bug#30672633
  
****************************************************************************************************************************/
/*start of OBCL_14.3_support_bug#30672633*/
function fnPreClassDefault_CVS_INTEREST_KERNEL(screenArgs)
{ 
if (typeof document.getElementById("BLK_PRODUCT_ICCF__CURRENT_COMP").value == 'undefined') {
	document.getElementById("BLK_PRODUCT_ICCF__CURRENT_COMP").value = '';
}
document.getElementById("BLK_PRODUCT_ICCF__CURRENT_COMP").value = document.getElementById("BLK_PRODUCT_ICCF__COMPONENT").value;
return true;
}

function fnPostClassDefault_CVS_INTEREST_KERNEL(screenArgs)
{ 
document.getElementById("BLK_PRODUCT_ICCF__CURRENT_COMP").value = '';
return true;
}
/*end of OBCL_14.3_support_bug#30672633*/