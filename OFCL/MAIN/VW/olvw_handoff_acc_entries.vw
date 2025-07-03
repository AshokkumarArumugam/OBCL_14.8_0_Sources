CREATE OR REPLACE VIEW OLVW_HANDOFF_ACC_ENTRIES 
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_handoff_acc_entries.VW
**
** Module       : OL
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   
**Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, **graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
**
****Created By             : Pallavi R
****Created Date           : 21-Dec-2020
****Change Description     : 
** 
****Changed By             : 
****Date                   : 
****Change Description     : 
****Bug                    : 
****Search String          : 
----------------------------------------------------------------------------------------------------*/
SELECT Trn_Ref_No, Event_Sr_No, Handoff_Status
  FROM Oltbs_Daily_Log_Ac
 WHERE Handoff_Status = 'P'
UNION
SELECT Trn_Ref_No, Event_Sr_No, 'P' AS Handoff_Status
  FROM Oltbs_History
/
create or replace synonym OLVWS_HANDOFF_ACC_ENTRIES for OLVW_HANDOFF_ACC_ENTRIES
/