CREATE OR REPLACE FORCE VIEW tlvw_tckt_fmem_ccy_details AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlvw_tckt_fmem_ccy_details.VW
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
/* 
CHANGE-HISTORY
17-Mar-2010 FLEXCUBE V.CL Release 7.6 UK SLT Changes ,Ticket level Settlment Changes
		Added New View as part of UK requirement
23-JUL-2019 Bug#29959798,  changes - SLT-Enhanced Approval during Ticket Level Settlement. ( added new column TICKET_REF_NO )
*/
SELECT A.TICKET_ID,
       c.counterparty,
       b.CURRENCY,
       SUM(b.SETTL_AMOUNT) AS SETTL_AMOUNT,
       SUM(b.WAIVER_AMOUNT) AS WAIVER_AMOUNT,
       SUM(b.DCF_AMOUNT) AS DCF_AMOUNT,
       SUM(b.BFF_AMOUNT) AS BFF_AMOUNT,
       SUM(b.ASSIGN_FEE_AMOUNT) AS ASSIGN_FEE_AMOUNT,
       SUM(b.AMEND_FEE_AMOUNT) AS AMEND_FEE_AMOUNT,
       SUM(b.ADHOC_SELLER_AMOUNT) AS ADHOC_SELLER_AMOUNT,
       SUM(b.ADHOC_BUYER_AMOUNT) AS ADHOC_BUYER_AMOUNT
FROM tltb_ticket_detail a ,tltb_fmem_ccy_details b ,tltbs_contract_master c
WHERE a.trade_ref_no = b.contract_ref_no
AND  a.trade_ref_no =c.contract_ref_no
AND  c.version_no = (
                      SELECT MAX(version_no)
                      FROM tltbs_contract_master
                      WHERE contract_ref_no = b.contract_ref_no
                      )
AND b.event_seq_no = (SELECT MAX(event_seq_no)
                      FROM tltbs_fmem_ccy_details
                      WHERE contract_ref_no = b.contract_ref_no
                      )
GROUP BY A.TICKET_ID,c.counterparty,b.currency
/
CREATE OR REPLACE SYNONYM tlvws_tckt_fmem_ccy_details FOR tlvw_tckt_fmem_ccy_details
/