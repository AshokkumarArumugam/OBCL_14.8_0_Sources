CREATE OR REPLACE FORCE VIEW lbvw_stp_positions AS 
/*
----------------------------------------------------------------------------------------------------
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


**  Changed By         : Vineeth T M
**  Date               : 13-May-2021
**  Change Description : Exclude disbursment amount due for ol contract
**  Search String      : OBCL_14.4_BUG#32877730 CHANGES

**	Changed By         : Narendra Dhaker
**	Date               : 11-OCT-2021
**	Change Description : 'AL' CURRENCY CHANGES.
**	Search String      : Bug#33450122  
----------------------------------------------------------------------------------------------------
*/
SELECT distinct lsrec.component AS LBCOMPONENT,
                lsrec.position AS LBPOSITION,
                ls.contract_ccy AS LSCCY,
                ldrec.component AS OLCOMPONENT,
                ldrec.position AS OLPOSITION,
                ld.contract_ccy AS LDCCY,
                aq.calculated_amount as acq_interest,
                Mas.Borr_Ref_No,
                Mas.Part_Ref_No,
                Mas.Ld_Ref_No,
                Mas.Borr_Esn
  FROM Lbtbs_Stp_Interface_Browser Mas,
       (

        SELECT SUM(NVL(a.amount_due, '0') - NVL(a.amount_settled, '0') -
                    NVL(a.pay_recv_amount, '0') - NVL(a.adjusted_amount, '0')) AS position,
                a.component,
                a.currency_amt_due,
                Mas_a.part_ref_no,
                Mas_a.Part_Esn
          FROM oltbs_amount_due a, Lbtbs_Stp_Interface_Browser Mas_a
         WHERE a.contract_ref_no = Mas_a.part_ref_no

           AND a.component_type IN ('I', 'F', 'P')
         GROUP BY a.component, a.currency_amt_due, Mas_a.part_ref_no, Mas_a.Part_Esn) lsrec,
       (

        SELECT SUM(NVL(b.amount_due, '0') - NVL(b.amount_settled, '0') -
                    NVL(b.adjusted_amount, '0') - NVL(b.pay_recv_amount, '0')) AS position,
                b.component,
                b.contract_ref_no,
                b.currency_amt_due,
                Mas_b.Ld_Ref_No,
                Mas_b.Ld_Esn
          FROM oltbs_amount_due b, Lbtbs_Stp_Interface_Browser Mas_b
         WHERE b.contract_ref_no = Mas_b.Ld_Ref_No

           AND b.component_type IN ('I', 'F', 'P')
		   AND Inflow_outflow = CASE WHEN Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END--OBCL_14.4_BUG#32877730 CHANGES
         GROUP BY b.component,
                   b.currency_amt_due,
                   b.contract_ref_no,
                   Mas_b.Ld_Ref_No,Mas_b.Ld_Esn) ldrec,

       (select ls_component,
               ld_component,
               ls_product,
               ld_product,
               ls_branch,
               ld_branch,
               self_participant,
               ls_ccy
          FROM lbtms_stp_component_mapping
        union
        select 'PRINCIPAL',
               'PRINCIPAL',
               ls_product,
               ld_product,
               ls_branch,
               ld_branch,
               self_participant,
               ls_ccy
          FROM lbtms_stp_component_mapping) recmap,
       oltbs_contract ls,
       oltbs_contract ld,

       (SELECT position_identifier, lt.portfolio, branch
          FROM tltms_position_identifier lt, tltms_portfolio ltp
         WHERE lt.portfolio = ltp.portfolio) sp,

       (select contract_ref_no,
               component,
               nvl(calculated_amount, 0) calculated_amount,
               Mas_b.Ld_Ref_No

          from oltbs_contract_iccf_calc, Lbtbs_Stp_Interface_Browser Mas_b
         where contract_ref_no(+) = Mas_b.Ld_Ref_No

           and prepayment_penalty_seq_no = -1

        union
        select contract_ref_no,
               component,
               nvl(calculated_amount, 0) calculated_amount,
               Mas_b.Ld_Ref_No
          from lftbs_contract_fee_calc, Lbtbs_Stp_Interface_Browser Mas_b
         where contract_ref_no(+) = Mas_b.Ld_Ref_No
           and pickup_esn = -1) aq

 WHERE lsrec.part_ref_no = Mas.part_ref_no
   AND ldrec.Ld_Ref_No = Mas.Ld_Ref_No
   AND Mas.Ld_Esn = ldrec.Ld_Esn
   AND Mas.Part_Esn = lsrec.Part_Esn
   AND

       recmap.ls_component = lsrec.component
   AND recmap.ld_component = ldrec.component

   AND DECODE(recmap.self_participant,
              'ALL',
              sp.portfolio,
              recmap.self_participant) = sp.portfolio

   AND recmap.ld_branch = sp.branch

   --AND decode(recmap.ls_ccy, 'AL', ls.contract_ccy, recmap.ls_ccy) =    --Bug#33450122
     AND decode(recmap.ls_ccy, '*.*', ls.contract_ccy, recmap.ls_ccy) =   --Bug#33450122
       ls.contract_ccy
   AND ls_branch = (SELECT sypks_utils.get_branch(MAS.BORR_REF_NO) FROM DUAL)
   AND RECMAP.LS_PRODUCT = (SELECT sypks_utils.get_product(MAS.BORR_REF_NO) FROM DUAL)

   AND RECMAP.ld_product = (SELECT sypks_utils.get_product(MAS.LD_REF_NO) FROM DUAL)
   AND ls.contract_ref_no = Mas.part_ref_no
   AND ld.contract_ref_no = Mas.Ld_Ref_No
   and aq.contract_reF_no(+) = ldrec.contract_ref_no
   and aq.component(+) = ldrec.component
/
CREATE OR REPLACE SYNONYM lbvws_stp_positions FOR lbvw_stp_positions
/