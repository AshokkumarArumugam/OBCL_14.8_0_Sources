/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : CSCPDFDM_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**  Modified By         : Kakumani Pavan Kumar
**  Modified On         : 10-July-2012
**  Modified Reason     : + and - buttons are not enabled, for BUGDB 14241316
**  Search String       : FCUBS11.2 Retro LSINTERNAL  Ref LSINTERNAL_SFR#New BUGDB 14241316
****************************************************************************************************************************/
//FCUBS11.2 Retro LSINTERNAL  Ref LSINTERNAL_SFR#New BUGDB 14241316 changes starts
function fnPostLoad_CVS_MAIN_KERNEL(screenArgs)
{
	enableform(); 
}
//FCUBS11.2 Retro LSINTERNAL  Ref LSINTERNAL_SFR#New BUGDB 14241316 changes ends
