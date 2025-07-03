CREATE OR REPLACE FORCE VIEW olvw_dly_msg_out 
(
	reference_no, 
	esn, 
	msg_type, 
	receiver, 
	name, 
	msg_status, 
	testing_status, 
	auth_stat, 
	hold_status, 
	dcn, 
	swift_msg_type, 
	swift_mx_type, --14.7_CAMT054_CHANGES 
	acc_class, 
	media, 
	running_no, 
	message,
	counterparty,
	queue_ref_no --OBCL_14.5_OBDX_Changes
) 
AS
SELECT 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_dly_msg_out.vw
**
** Module       : OL										
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2021, Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
  **Created By         : Revathi Dharmalingam
  **Date               : 28-Jan-2021
  **Change Description : OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES
  **Changed By         : Aishwarya Sekar
  **Date               : 27-OCT-2021
  **Change Description : Modified view to add queue_ref_no to fetch payment ref no                      
  **Search String      : OBCL_14.5_OBDX_Changes
  **Changed By         : Kavitha Asokan
  **Date               : 21-OCT-2023
  **Change Description : Modified view to display the "SWIFT MX_TYPE"                     
  **Search String      : 14.7_CAMT054_CHANGES  
 
  **Changed By         : Mohan Pal
  **Date               : 03-May-2024
  **Change Description : Modified view to Populate Archived Message record also                    
  **Search String      : Bug#36561223 
 
 
*/
reference_no,
esn,
msg_type,
receiver,
name,
msg_status,
testing_status,
auth_stat,
hold_status,
dcn,
swift_msg_type,
swift_mx_type, --14.7_CAMT054_CHANGES 
'Loans' As acc_class,
media,
RUNNING_NO,
message,
counterparty,
null AS queue_ref_no --OBCL_14.5_OBDX_Changes
FROM OLTBS_DLY_MSG_OUT
 
 
 
---Bug#36561223 ADDED STARTS
union all
select reference_no,
esn,
msg_type,
receiver,
name,
msg_status,
testing_status,
auth_stat,
hold_status,
dcn,
swift_msg_type,
null swift_mx_type,  
'Loans' As acc_class,
media,
RUNNING_NO,
message,
counterparty,
null AS queue_ref_no 
FROM OLTBS_ARCHIVE_OUT
---Bug#36561223 ADDED ENDS
 
 
 
 
UNION ALL
SELECT 
reference_no,
esn,
msg_type,
receiver,
name,
msg_status,
testing_status,
auth_stat,
hold_status,
dcn,
swift_msg_type,
swift_mx_type, --14.7_CAMT054_CHANGES 
'Payments' As acc_class,
media,
RUNNING_NO,
message,
counterparty,
external_ref_no AS queue_ref_no --OBCL_14.5_OBDX_Changes
FROM oltbs_ext_dly_msg_out
/
create or replace synonym olvws_dly_msg_out for olvw_dly_msg_out
/
