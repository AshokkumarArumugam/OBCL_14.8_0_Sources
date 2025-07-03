CREATE OR REPLACE force VIEW olvw_dw_accounting AS
/*----------------------------------------------------------------------------------------------------
File : olvw_dw_accounting.vw
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT  trn_ref_no,
						ac_branch,
						ac_no,
						ac_ccy,
						DECODE((SELECT sypks_utils.get_branch(AC_NO) FROM DUAL),'898','00000',DECODE(ac_no,'9999999999','00000',c.txn_mis_1)) expense_code,
						DECODE(a.event,
												'CADJ',
																DECODE(
																						(SELECT COUNT(1) FROM OLTB_CONTRACT_ADJ_DETAIL d  WHERE         d.contract_Ref_no =        a.trn_Ref_no AND d.event_seq_no =        a.event_sr_no AND d.adjustment_Type='F')
																						,0
																						,a.trn_dt,
																						a.value_Dt
																						)
												, a.trn_dt
										  )  value_date,
						lcy_amount,
						fcy_amount,
						b.run_date,
						b.branch,
						drcr_ind,
						ac_entry_sr_no
FROM                OLTB_DW_STATIC_INFO b, OLTB_DAILY_LOG_AC a, OLTB_CLASS_MAPPING C
WHERE        		a.trn_ref_no                       =           b.contract_ref_no
AND                 	c.unit_ref_no                 =           DECODE(b.module_code,'FC',NVL(a.related_reference,a.trn_ref_no),a.trn_ref_no)
AND                	a.ac_branch                   =           b.branch
AND                	a.auth_stat                    =           'A'
AND                	a.delete_stat                 <>         'D'
AND                	a.cust_gl                       =           'G'
AND NOT EXISTS (
						SELECT 1 FROM oltbs_interface_filter_param
						WHERE branch_code = (SELECT ho_branch FROM oltm_bank)
						AND external_system = 'LP'
						AND interface_code = 'LP'
						AND exclude_type = 'EXCLUDE_BATCH'
						AND exclude_value = NVL(a.batch_no,'0')
				)
AND NOT EXISTS (
						SELECT 1 FROM oltbs_interface_filter_param
						WHERE branch_code =  (SELECT ho_branch FROM oltm_bank)
						AND external_system = 'LP'
						AND interface_code = 'LP'
						AND exclude_type = 'EXCLUDE_EVENT'
						AND exclude_value = a.event
				)
--16-SEP-2014 CITIUS#19264 Genesis Expense Code related changes starts here
UNION ALL
SELECT  a.related_reference,
        ac_branch,
        ac_no,
        ac_ccy,
        DECODE((SELECT sypks_utils.get_branch(AC_NO) FROM DUAL),'898','00000',DECODE(ac_no,'9999999999','00000',c.txn_mis_1)) expense_code,
        DECODE( a.event,
                'CADJ',
                DECODE(
                        (SELECT COUNT(1) FROM OLTB_CONTRACT_ADJ_DETAIL d WHERE d.contract_Ref_no = a.trn_Ref_no AND d.event_seq_no =        a.event_sr_no AND d.adjustment_Type='F')
                        ,0
                        ,a.trn_dt
                        ,a.value_Dt
                      )
                , a.trn_dt
              )  value_date,
        lcy_amount,
        fcy_amount,
        b.run_date,
        b.branch,
        drcr_ind,
        ac_entry_sr_no
FROM    OLTB_DW_STATIC_INFO b, OLTB_DAILY_LOG_AC a, OLTB_CLASS_MAPPING C
WHERE   a.related_reference    = b.contract_ref_no
--AND   c.unit_ref_no   = DECODE(b.module_code,'FC',NVL(a.related_reference,a.trn_ref_no),a.trn_ref_no)-- Commenting this to ensure it will pick up expense code of reclass-ref-no
AND     c.unit_ref_no   = a.trn_ref_no --This is to ensure the pick up of expense code of reclass-ref-number
AND     a.ac_branch     = b.branch
AND     a.auth_stat     = 'A'
AND     a.delete_stat   <> 'D'
AND     a.cust_gl       = 'G'
and     a.module='OL'
AND NOT EXISTS (
                SELECT 1 FROM oltbs_interface_filter_param
                WHERE branch_code = (SELECT ho_branch FROM oltm_bank)
                AND external_system = 'LP'
                AND interface_code = 'LP'
                AND exclude_type = 'EXCLUDE_BATCH'
                AND exclude_value = NVL(a.batch_no,'0')
                )
AND NOT EXISTS (
                SELECT 1 FROM oltbs_interface_filter_param
                WHERE branch_code =  (SELECT ho_branch FROM oltm_bank)
                AND external_system = 'LP'
                AND interface_code = 'LP'
                AND exclude_type = 'EXCLUDE_EVENT'
                AND exclude_value = a.event
                )
--Below condition is for ensuring its reclass related entry.
AND EXISTS      (
                SELECT  1 FROM OLTB_EXP_CODE_RECLASS_BAL_DET x
                WHERE   x.related_ref_no=a.related_reference
                AND (   x.old_reclass_ref_no=a.trn_ref_no
                        OR
                        x.new_reclass_ref_no=a.trn_ref_no
                    )
                )
--16-SEP-2014 CITIUS#19264 Genesis Expense Code related changes ends here
/
CREATE OR REPLACE SYNONYM olvws_dw_accounting
FOR olvw_dw_accounting
/