CREATE OR REPLACE VIEW olvw_ffmt_part_sum AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_ffmt_part_sum.VW
**
** Module       : LOANS and SYNDICATION				
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.
**Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted
**in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
**or otherwise, translated in any language or computer language, without the prior written permission
**of Oracle and/or its affiliates.
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East),
**Mumbai - 400 063, India.
**Change History
**-------------------------------------------------------------------------------------------------------------------------------------
**
**--------------------------------------------------------------------------------------------------------------------------------------
*/
SELECT Auth_Stat,
       Hold_Status,
       Email,
       Ffmt_Ref_No,
       Contract_Ref_No,
       Msg_Module,
       Event_Seq_No,
       Message_Type,
       Counterparty,
       Rel_Event,
       Receiver_Type,
       Entity_Type,
       Branch
  FROM Oltbs_Ffmt_Msg
 WHERE Nvl(Diary_Linked,
           'N') = 'N' AND
       Nvl(Borrower_Linked,
           'N') = 'N' AND
       Msg_Type = 'FREE_FORMAT'
/
CREATE OR REPLACE SYNONYM olvws_ffmt_part_sum for olvw_ffmt_part_sum
/