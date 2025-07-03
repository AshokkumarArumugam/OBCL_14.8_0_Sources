CREATE OR REPLACE VIEW olvw_dly_msg_hist(IN_OUT, BRANCH, DCN, RUNNING_NO, MESSAGE) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_dly_msg_hist.VW
**
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
-----------------------------------------------------------------------------------------------
*/
select 'OUT',branch,dcn,running_no,message from oltbs_dly_msg_out
union all
select 'OUT',branch,dcn,running_no,message from oltbs_archive_out
/
CREATE OR REPLACE SYNONYM olvws_dly_msg_hist FOR olvw_dly_msg_hist
/