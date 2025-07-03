CREATE OR REPLACE FORCE VIEW olvw_fpml_msg
(in_out, branch, dcn, running_no, message, reference_no)
as
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_fpml_msg.VW
** Module       : MESSAGING SUBSYSTEM
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

----------------------------------------------------------------------------------------------------*/
/* CHANGE-HISTORY
  31-MAY-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes,View Added newly
  Changed By         : Prakash Ravi
  Changed On         : 20-AUG-2019
  Search String      : OBCL_14.4_DIARY_EVENT_UPDATE
  Change Reason      : Added reference no field to relate with the parent data source of OLDMESVW screen.
*/
SELECT 'OUT',branch_code,dcn,esn,message, reference_no FROM oltbs_fpml_msg_out 
/
CREATE OR REPLACE SYNONYM olvws_fpml_msg FOR olvw_fpml_msg
/