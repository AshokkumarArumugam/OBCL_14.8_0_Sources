/***************************************************************************************************************************
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © 2008 - 2015  Oracle and/or its affiliates.  All rights reserved.
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
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : SMDUSRAC_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : ANOOP R    
**  Last modified on   : 21-May-2015
**  Reason             : Added code to prevent the detail screen from launching when double clicking a record in summary screen
**  SFR NUM            : 12.1.0_21065005
****************************************************************************************************************************/
//12.1.0_21065005 starts
function fnPreShowDetail_Sum_KERNEL(arg){
    return false;
}
//12.1.0_21065005 ends