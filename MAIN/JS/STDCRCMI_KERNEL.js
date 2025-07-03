/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2022, Oracle and/or its affiliates.
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
**  File Name          : STDCRCMI_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Nisha B C
**  Last modified on   : 22-Sept-2022
**  Reason             : The order of the MIS class changes with inappropriate MIS code value while saving.
**  Search String      : FCUBS_14.6.0.0.0_INTERNAL_SFR#_34629281
****************************************************************************************************************************/
function fnPostNew_KERNEL()
{
debugs("In fnPostNew_KERNEL", "A");
  document.getElementById('cmdAddRow_BLK_COMPOSITEMIS').style.display='none';
  document.getElementById('cmdDelRow_BLK_COMPOSITEMIS').style.display='none';
return true;   
}
