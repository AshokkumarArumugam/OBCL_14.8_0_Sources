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
**  File Name          : LBCLCISR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**    
**  Last Modified By   : Anusha k
	**  Last modified on   : 12-DEC-2019
	**  Reason             : Changes done to enable add row and delete row in lc issuer callform
	
**  CHANGE LOG         : RAMYA M
**  Last modified on   : 27-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES	
****************************************************************************************************************************/
function fnPostLoad_CVS_PARTLCISS_KERNEL(){	
//fnDisableElement(document.getElementById('cmdAddRow_BLK_CONTRACT_LCISSUER_DTL'));
//fnDisableElement(document.getElementById('cmdDelRow_BLK_CONTRACT_LCISSUER_DTL'));
return true;
}
