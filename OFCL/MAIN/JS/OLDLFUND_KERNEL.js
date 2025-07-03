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
**  File Name          : OLDLFUND_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  **  CHANGE LOG
**  Last Modified By   : MEHA
**  Last modified on   : 26-Feb-2018
**  Search String      : Bug#27536221 
**  Reason             : Seqno Disble while creating new record
****************************************************************************************************************************/
//Bug#27536221 Changes starts
function fnPostNew_KERNEL() {
fnDisableElement(document.getElementById("BLK_LONG_TERM_FUNDING__SEQNO"));
	return true;
}
//Bug#27536221 Changes Ends