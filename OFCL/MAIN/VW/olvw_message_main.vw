CREATE OR REPLACE VIEW olvw_message_main AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2007 - 2016  Oracle and/or its affiliates.  All rights reserved.
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
/* CHANGE HISTORY 
  **Created By         : Kavitha Asokan
  **Date               : 22-DEC-2022
  **Change Description : Modified the code to PRINT message for swift messages 
  **Search String      : Bug#34907149 Changes 
*/
SELECT REFERENCE_NO         FCCREF,
       ESN                  LVERNO,
       LOCATION             SENDER,
       SWIFT_MSG_TYPE       SWMSGTYP,
       DCN                  DCN,
       MEDIA                MEDIA,
       NODE                 NODE,
       ADDITIONAL_ADDRESSES REM,
       ADDITIONAL_ADDRESSES REJREASON,
       MSG_TRAILER          MSGTRAILERS,
       MAKER_ID             MAKID,
       MAKER_DT_STAMP       MAKDTST,
       CHECKER_ID           CHKID,
       CHECKER_DT_STAMP     CHKDTST,
       AUTH_STAT            AUTHSTATUS
  FROM oltbs_dly_msg_out
--Bug#34907149  changes starts
UNION ALL
SELECT REFERENCE_NO         FCCREF,
       ESN                  LVERNO,
       LOCATION             SENDER,
       SWIFT_MSG_TYPE       SWMSGTYP,
       DCN                  DCN,
       MEDIA                MEDIA,
       NODE                 NODE,
       ADDITIONAL_ADDRESSES REM,
       ADDITIONAL_ADDRESSES REJREASON,
       MSG_TRAILER          MSGTRAILERS,
       MAKER_ID             MAKID,
       MAKER_DT_STAMP       MAKDTST,
       CHECKER_ID           CHKID,
       CHECKER_DT_STAMP     CHKDTST,
       AUTH_STAT            AUTHSTATUS
  FROM oltbs_ext_dly_msg_out
--Bug#34907149  changes ends
/
CREATE OR REPLACE SYNONYM olvws_message_main FOR olvw_message_main
/