CREATE OR REPLACE VIEW olvw_payment_breakup AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_payment_breakup.vw
** Module       : LD
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

  **Changed By         : Sowmya Bitra
  **Date               : 25-April-2024
  **Change Description : OBCL_14.8_Payment_Waive Changes 
  **Search String      : Bug#36548811
 
  **Changed By         : Sowmya Bitra
  **Date               : 15-July-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
  **Search String      : Bug#36830170
----------------------------------------------------------------------------------------------------
*/
SELECT
a.CONTRACT_REF_NO  FCCREF,
a.component  COMP,
a.amount_due AMTDUE,
a.overdue_days OVERDUE,
a.amount_paid AMTPAID,
--a.int_prepay  INTPREPAY,
a.tax_paid TAXPAID
--,0 PAY_RECEIVE --Bug 24936916
,cast(0 as number) PAY_RECEIVE --OFCL_12.3.0.0.0_24963114
,a.EVENT_SEQ_NO EVENTSEQNO
, a.RESIDUAL_AMOUNT RESIDUAL_AMOUNT--OBCL_14.2_RESD
, a.AMOUNT_WAIVED AMTWAIVED --Bug#36548811 Changes
, a.AMOUNT_CAPITALIZED AMTCAPITALIZED --Bug#36830170 Changes
FROM oltbs_contract_liq a
WHERE nvl(amount_due,0) <> 0---SOFR_Bug#33040217_#2

/
CREATE OR REPLACE SYNONYM olvws_payment_breakup FOR olvw_payment_breakup
/