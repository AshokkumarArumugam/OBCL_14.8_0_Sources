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
**  File Name          : STDCUENT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : ANUSHA K
**  Last modified on   : 29-MAY-2019
**  Search string      : obcl_14.2_supp_#29835247  changes
**  Reason             : function name in js and rad are not same
****************************************************************************************************************************/
function FNPOPSCHDLS(){  //obcl_14.2_supp_#29835247  changes
	//function fnpopschdls(){ obcl_14.2_supp_#29835247  changes

   //STDCUENT subscreen Start
     var e = mainWin.event || e;
	currRow = getRowIndex(e);
	fnSubScreenMain('OLDCUENT', 'OLDCUENT', 'CVS_MEDIA_ORDER',false);
	//STDCUENT subscreen  End
}
