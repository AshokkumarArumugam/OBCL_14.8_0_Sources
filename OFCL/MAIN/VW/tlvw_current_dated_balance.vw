CREATE OR REPLACE FORCE VIEW tlvw_current_dated_balance AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlvw_current_dated_balance.VW
**
** Module       : SECONDARY LOAN TRADING
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
---------------------------------------------------------------------------------------------------
*/
/* CHANGE-HISTORY
17-jun-2009 FLEXCUBE V.CL Release 7.5 LOT1.1 Multiple Expense Code Changes
*/
(
SELECT A.POSITION_IDENTIFIER
       ,A.CUSIP_NO
       ,A.TRADE_CCY
       ,A.CLOSED_SETTLED_POSITION+CLOSED_UNSETTLED_POSITION TOTAL_POSITION
       ,A.CLOSED_UNSETTLED_POSITION
       ,A.CLOSED_SETTLED_POSITION
       ,B.PORTFOLIO
       ,C.BRANCH
       ,A.SWAP_COUNTERPARTY
       ,A.SWAP_ID
       --,C.EXPENSE_CODE--FLEXCUBE V.CL Release 7.5 LOT1.1 Multiple Expense Code Changes
       ,A.EXPENSE_CODE--FLEXCUBE V.CL Release 7.5 LOT1.1 Multiple Expense Code Changes
       ,C.DESK_CODE
FROM TLTB_CURRENT_DATED_BALANCE A,tltms_position_identifier B,tltms_portfolio C
WHERE A.POSITION_IDENTIFIER = B.POSITION_IDENTIFIER
AND B.PORTFOLIO = C.PORTFOLIO
)
/
CREATE OR REPLACE SYNONYM tlvws_current_dated_balance FOR tlvw_current_dated_balance
/