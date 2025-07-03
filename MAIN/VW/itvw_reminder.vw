CREATE OR REPLACE FORCE view itvw_reminder AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2011 - 2012  Oracle and/or its affiliates.  All rights reserved.
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
** Modified  By         : Ranjana Ladia
** Modified  On         : 21-SEP 2016
** Modified Reason      :Bug 24294375 - INTERACTION DASBOARD - REMINDERS - HANGS ON LAUNCH
** Search String        : FCUBS_12.2_RETRO_BUG#24344445

------------------------------------------------------------------------------------------*/
SELECT Email_Subject,
       Message,
       Effective_Date,
       Process_status,
       Communication_id
  FROM Ittb_Communications
 WHERE trunc(SYSDATE) = effective_date --FCUBS_12.2_RETRO_BUG#24344445
        /*to_date(SYSDATE, 'DD-MON-YYYY') =
       to_date(effective_date, 'DD-MON-YYYY')--FCUBS_12.2_RETRO_BUG#24344445 removed to_date, added trunc
        */
   AND TARGET = GLOBAL.USER_ID
   AND COMMUNICATION_TYPE = 'R'
   AND PROCESS_STATUS = 'N'
   AND (FREQUENCY = 'D' OR FREQUENCY = 'O')
union
SELECT Email_Subject,
       Message,
       Effective_Date,
       Process_status,
       Communication_id
  FROM Ittb_Communications
 WHERE trunc(SYSDATE) >= effective_date  --FCUBS_12.2_RETRO_BUG#24344445
 AND trunc(SYSDATE) <= expiry_date --FCUBS_12.2_RETRO_BUG#24344445
        /* FCUBS_12.2_RETRO_BUG#24344445 commented
         to_date(SYSDATE, 'DD-MON-YYYY') >=
       to_date(effective_date, 'DD-MON-YYYY')
   and to_date(SYSDATE, 'DD-MON-YYYY') <=
       to_date(expiry_date, 'DD-MON-YYYY')
         */
   AND TARGET = GLOBAL.USER_ID
   AND COMMUNICATION_TYPE = 'R'
   AND PROCESS_STATUS = 'N'
   AND (FREQUENCY = 'W' OR FREQUENCY = 'M' OR FREQUENCY = 'Y')
/
CREATE OR REPLACE SYNONYM ITVWS_REMINDER FOR ITVW_REMINDER
/