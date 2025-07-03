CREATE OR REPLACE force VIEW olvw_all_ac_entries_fin (
   trn_ref_no
   ,custom_ref_no
   ,ac_entry_sr_no
   ,event_sr_no
   ,event
   ,ac_branch
   ,ac_no
   ,ac_ccy
   ,drcr_ind
   ,trn_code
   ,fcy_amount
   ,exch_rate
   ,batch_no
   ,user_id
   ,lcy_amount
   ,trn_dt
   ,value_dt
   ,txn_init_date
   ,amount_tag
   ,related_account
   ,related_customer
   ,related_reference
   ,mis_head
   ,mis_flag
   ,instrument_code
   ,bank_code
   ,balance_upd
   ,auth_stat
   ,module
   ,cust_gl
   ,dly_hist
   ,financial_cycle
   ,period_code
   ,ib
   -- FCC 4.4 DEC 2003 PYPROD TIL#68 New Columns added.
   ,curr_no
   ,print_stat
   ,transaction_count
   ,interface_ref_no
   ,customer_ref_no
   ,hide_txn_in_stmt
   -- FCC 4.4 DEC 2003 PYPROD TIL#68 New Columns added Ends.
   ,gaap_indicator  --FCC 4.3 AUG 2003 GAAP Changes
)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_all_ac_entries_fin.VW
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
CHANGE_HISTORY
-- 17.05.2002 FCC 4.0 JUNE 2002 PLNCITI Til# 2106 Added CUSTOM_REF_NO.
-- 08-OCT-2002 FCC4.1 OCT 2002  ITR1 #94 Added BATCH_NO,USER_ID.
08-JUL-2003	FCC 4.3 AUG 2003 GAAP Changes Added gaap_indicator. 
18-OCT-2003 FCC 4.4 DEC 2003 PYPROD TIL#68 New Columns added.
*/
SELECT	trn_ref_no
  		, custom_ref_no
  		, ac_entry_sr_no
  		, event_sr_no
  		, event
  		, ac_branch
          	, ac_no
          	, ac_ccy
          	, drcr_ind
          	, trn_code
          	, fcy_amount
          	, exch_rate
          	, batch_no
          	, user_id
          	, lcy_amount
          	, trn_dt
          	, value_dt
          	, txn_init_date
          	, amount_tag
          	, related_account
          	, related_customer
          	, related_reference
          	, mis_head
          	, mis_flag
          	, instrument_code
          	, bank_code
          	, balance_upd
          	, auth_stat
          	, module
          	, cust_gl
          	, 'D' dly_hist
          	, financial_cycle
          	, period_code
          	, ib
		-- FCC 4.4 DEC 2003 PYPROD TIL#68 New Columns added.
		,curr_no
	      ,print_stat
		,transaction_count
		,interface_ref_no
		,customer_ref_no
	      ,hide_txn_in_stmt
		-- FCC 4.4 DEC 2003 PYPROD TIL#68 New Columns added Ends.
          	, gaap_indicator  --FCC 4.3 AUG 2003 GAAP Changes
     FROM	oltbs_daily_log_ac
    WHERE	delete_stat <> 'D'
   UNION ALL
   SELECT	trn_ref_no
		, custom_ref_no
   		, ac_entry_sr_no
   		, event_sr_no
   		, event
   		, ac_branch
          	, ac_no
          	, ac_ccy
          	, drcr_ind
          	, trn_code
          	, fcy_amount
          	, exch_rate
          	, batch_no
          	, user_id
          	, lcy_amount
          	, trn_dt
          	, value_dt
          	, txn_init_date
          	, amount_tag
          	, related_account
          	, related_customer
          	, related_reference
          	, mis_head
          	, mis_flag
          	, instrument_code
          	, bank_code
          	, 'U'
          	, 'A'
          	, module
          	, cust_gl
          	, 'H'
          	, financial_cycle
          	, period_code
          	, ib
		-- FCC 4.4 DEC 2003 PYPROD TIL#68 New Columns added.
		,curr_no
	      ,print_stat
		,transaction_count
		,interface_ref_no
		,customer_ref_no
	      ,hide_txn_in_stmt
		-- FCC 4.4 DEC 2003 PYPROD TIL#68 New Columns added Ends.
          	, gaap_indicator  --FCC 4.3 AUG 2003 GAAP Changes
     FROM oltbs_history
/
create or replace synonym olvws_all_ac_entries_fin for olvw_all_ac_entries_fin
/