CREATE OR REPLACE VIEW OLVW_PAYMENT_REFUND AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : OLVW_PAYMENT_REFUND.VW
**
** Module       : LOANS and SYNDICATION				
**
This source is part of the Oracle Banking Corporate Lending  Software Product.
Copyright © 2007 - 2021  Oracle and/or its affiliates.  All rights reserved.
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission
of Oracle and/or its affiliates.
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East),
Mumbai - 400 063, India.
Change History
-------------------------------------------------------------------------------------------------------------------------------------

Changes By 	       : Ramya
Date               : 09-NOV-2021
Change Description : OBCL_14.5_OL_OBCL_DISCOUNTED_REFUND_GW_CHANGES
Search String	   : OBCL_14.5_Support_BUG#33484807
--------------------------------------------------------------------------------------------------------------------------------------
*/
SELECT CONTRACT_REF_NO AS CONTRACT_REF_NO,
0 AS EVENT_sEQ_NO,
AMOUNT_DUE AS AMOUNT_DUE,
Pay_Recv_Amount AS REFUND_AMT
FROM OLTBS_AMOUNT_DUE
WHERE 1=2
/
CREATE OR REPLACE SYNONYM OLVWS_PAYMENT_REFUND for OLVW_PAYMENT_REFUND
/