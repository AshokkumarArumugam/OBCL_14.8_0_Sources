CREATE OR REPLACE FORCE VIEW olvw_dly_msg 
(IN_OUT, BRANCH, DCN, RUNNING_NO, MESSAGE, MEDIA, REFERENCE_NO, SWIFT_MSG_TYPE, RECVORSNDR, LATEST_VERSION_NO, MSG_TYPE) AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright © 2001 - 2016  Oracle and/or its affiliates.  All rights reserved.
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
** ----------------------------------------------------------------------------------------------------
/* CHANGE HISTORY 
  **Created By         : Kavitha Asokan
  **Date               : 22-DEC-2022
  **Change Description : Modified the code to PRINT message for swift messages 
  **Search String      :  Bug#34907149 Changes 
*/
select 'OUT',
       branch,
       dcn,
       running_no,
       message,
       MEDIA,
       Reference_No,
       Swift_Msg_Type,
       receiver recvorsndr,
       ESN,
       msg_type
  from oltbs_dly_msg_out
union all
select 'OUT',
       branch,
       dcn,
       1,
       message,
       MEDIA,
       Reference_No,
       '' Swift_Msg_Type,
       receiver recvorsndr,
       ESN,
       msg_type
  from oltbs_archive_out
--Bug#34907149  changes starts
union all
select 'OUT',
       branch,
       dcn,
       running_no,
       message,
       MEDIA,
       Reference_No,
       Swift_Msg_Type,
       receiver recvorsndr,
       ESN,
       msg_type
  from oltbs_ext_dly_msg_out
--Bug#34907149  changes ends
/
CREATE OR REPLACE SYNONYM olvws_dly_msg  FOR olvw_dly_msg 
/