/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright Ã‚Â© 2008 - 2016  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : OLDREFRT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**	Modified By   :	
** 	Modified on   : 
** 	Description   : 
** 	Search String : 
****************************************************************************************************************************
********************************* END   OF LOG HISTORY **************************************
*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

function fnPostCopy_KERNEL(){
document.getElementById("BLK_OLTM_POOL_DLY_REF_RATE__BRANCH_CODE").value =  mainWin.CurrentBranch;
return true;
}