CREATE OR REPLACE FORCE VIEW olvw_upload_contract_master
	(
	   module
	 , counterparty
	 , external_init_date
	 , import_status
	 , post_import_status
	 , export_status
	 , citicube_ref_no
	 , ext_contract_ref_no
	 , source_code
	 , branch
	 , product
	 , product_type
	 , payment_method
	 , rollover_allowed
	 , user_ref_no
	 , currency
	 , amount
	 , amount_financed -- OBCL_14.3_DSBR Changes
         , disbursement_mode -- OBCL_14.3_DSBR Changes
	 , original_start_date
	 , cluster_id
	 , cluster_size
	 , dealer
	 , booking_date
	 , value_date
	 , maturity_type
	 , maturity_date
	 , notice_days
	 , remarks
	 , dflt_settle_ac
	 , dflt_settle_ac_branch
	 , rel_reference
	 , credit_line
	 , broker_code
	 , user_defined_status
	 , upload_status
	 , contract_schedule_type
	 , liq_back_valued_schedules
	 , principal_liquidation
	 , revolving_commitment
	 , holiday_ccy
	 , verify_funds
	 , schedule_movement
	 , ignore_holidays
	 , amortisation_type
	 , deduct_tax_on_capitalisation
	 , move_across_month
	 , cascade_schedules
	 , status_control
	 , rollover_amt
	 , rollover_type
	 , rollover_amount_type
	 , rollover_maturity_type
	 , rollover_maturity_date
	 , rollover_notice_days
	 , update_utilisation_on_rollover
	 , apply_tax_on_rollover
	 , rollover_iccf_from
	 , liquidate_od_schedules
	 , schedule_definition_basis
	 , apply_charge
	 , tax_scheme
	 , broker_confirm_status
	 --, cparty_confirm_status  --confirmation changes 
	 , loan_stmt_type
	 , loan_stmt_cycle
	 , statement_day
	 , recind
	 , payind
	 , roll_reset_tenor --13-MAR-2003 FCC 4.2 APR 2003 Deposit Rollover Changes
	 , department_code
	 , treasury_source
	 , funding_method
	 , workflow_status
	 , deal_date --07-APR-2003 FCC 4.2 OPS CHANGES
	 , offset_no --12-APR-2003 FCC 4.2 OPS CHANGES
	 , rate_revision_status --13-MAY-2003 FCC 4.2 OPS FOCUS TESTING CHANGES
	 , parent_contract_ref_no --FCC 4.3 MM Module changes....
	 , rollover_mechanism
	 , rollover_method
	 --,SUPRESS_CONFIRMATION FCC 4.3 Aug 2003 Retro Itr1 11
	 , suppress_confirmation
	 , custom_ref_no
	 , wht_tracking_reqd --FCC 4.3 August 2003 OFSWEB Interface Changes Starts
	 , rvn_ignore_holidays
	 , rvn_chk_rate_code_ccy
	 , rvn_holiday_chk
	 , rvn_move_across_months
	 , rvn_cascade_schedules
	 , rvn_schedule_movement
	 , rvn_holiday_ccy
	 , treat_spl_amt_as
	 , new_components_allowed
	 , user_id -- FCC 4.3 August 2003 OFSWEB Interface Changes ends
	 , trade_date --FCC 4.4 DEC2003 FXMM CHANGES 
	 --
	 , supp_bk_val_pymt_msgs        	--	FCC 4.6 Sep04 Interface Release
	 , apply_bk_val_revision        	--	FCC 4.6 Sep04 Interface Release
     --FCC V.CL 7.3 UK CONSOLIDATION RETRO START
	 , syndication_ref_no			-- Changes by Satya
	 , tranche_ref_no			-- Changes by Satya
   	--FCC 4.6.2 LD upload change starts, Amit
  	 ,agent_cif
   	 ,cusip_no
   	 ,facility_name
   	 ,rolling_loan
   	 ,contractual_effective_date
   	 ,contractual_maturity_date
   	 ,settlement_seq_no
    --FCC 4.6.2 LD upload changes , Ends
	,ssi_mnemonic --26-MAR-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag03,SSI Enhancement Changes
	 ,contract_repriced 	-- FCC 4.6.2 CITI LD REPRICE CHANGES BY KISHORE
	 ,primary_syndication 	--FCC 4.6.2 CITILS primary syndication changes , Amit Sinha
    	 ,initiation_mode 	--FCC 4.6.2 CITILS Upload related changes , Amit Sinha
	-- FCC 7.3 RETRO of CITILS46110406 Changes START
	 ,billing_notice_days			--CITILS46110406 Changes
	-- FCC 7.3 RETRO of CITILS46110406 Changes END
	--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
	,agency_id --FCC V.CL 7.3 Release STP changes sfr#1
	,agency_contract --FCC V.CL 7.3 Release STP changes sfr#1
	,lc_sublimit_amt--FLEXCUBE V.CL Release 7.4 BAU Auto Commitment Booking changes 
	,LIMIT_TRACK_REQD---FLEXCUBE V.CL Release 7.4 BAU Auto Commitment Booking changes sfr#41
	-- 04-Sep-2008 FCC V.CL Release 7.4 STP SFR#46 starts
	,m_sch_ignore_holidays
	,m_consider_branch_holiday
	,m_sch_apply_facility_hol_ccy
	,m_sch_apply_contract_hol_ccy
	,m_sch_apply_local_hol_ccy
	,m_sch_ccy
	,m_sch_move_across_month
	,m_sch_schedule_movement
	-- 04-Sep-2008 FCC V.CL Release 7.4 STP SFR#46 ends
	--FCC V.CL Release 7.5 Lot1 FS TAG 12 start
	,start_month
	,end_month
	,start_day
	,end_day
	--FCC V.CL Release 7.5 Lot1 FS TAG 12 end
	,last_available_date --FCC V.CL Release 7.5 CITIUS RETRO  TILL#5389
	,exclude_unutil_fee	--06-APR-2009 FLEXCUBE V.CL Release 7.5 LOT1 ITR2 SFR#7 changes, adding column exclude_unutil_fee in View
	--14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag07 change starts here
	, auto_extension
	, verify_billed_amount
	--14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag07 change ends here
	,capitalized_amount--09-JUL-2009 FLEXCUBE V.CL Release 7.5 lot2 RT SFR#239 changes here
	,external_cusip_no --FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION 30-SEP-2009 CITIUS-LS Till#6410, CUSIP amendment changes, added
	,allow_fdic_block --08-FEB-2010 Flexcube V.CL 7.6 Code FCCB001199EM_FDIC Release for FDIC, FCC 4.17 DEC 2009 FDIC FCCB001199EM_FDIC 
      --19-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIPBG Loan Changes starts here
	,mat_chk_contract_ccy
	,mat_chk_local_ccy
    	,last_contact_dt
    	,tenor_based_spread
	,roll_tenor_based_spread
      --19-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIPBG Loan Changes ends here
	,industry_code --24-JUN-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 06 Risk E-mail changes	
	--22-OCT-2010 FLEXCUBE V.CL Release 7.8 VOL1 FS TAG03 Separate holiday treatment for Principal - Start
	,prn_holiday_ccy
	,prn_ignore_holidays
	,prn_move_across_month
	,prn_schedule_movement
	,prn_cascade_schedules
	--22-OCT-2010 FLEXCUBE V.CL Release 7.8 VOL1 FS TAG03 Separate holiday treatment for Principal - End
	,coc_valuation_reqd --08-Mar-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes
	,amort_amount --18-APR-2012:CITIUS#14155:To add amort_amount in view
	,grace_days			--18-OCT-2012 Flexcube V.CL Release 7.12, Retro, EURCITIPLC#14776 changes for adjustment
	,pool_funding_refno		--18-OCT-2012 Flexcube V.CL Release 7.12, Retro, EURCITIPLC#14776 changes for adjustment
	,MASTER_FUNDING_REFNO		--18-OCT-2012 Flexcube V.CL Release 7.12, Retro, EURCITIPLC#14776 changes for adjustment
	,on_rate_revision		--26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16055 on_rate_revision flag is added	
	,net_negative_interest	--OFCL 12.2 changes
	  ,ZERO_CASH_FLOW --CASH_FLOW
      ,Discounted_sch --Bug#34224258 changes
	  ,Allow_pre_amort_interest --OBCL_14.5_SUPPORT_BUG#34361191 Changes
	  ---OBCL_14.6_Support_Bug#34629176_Changes Starts---
		,NET_ACROSS_DRAWDOWN
	    ,Alternate_Ref_No
      ----OBCL_14.6_Support_Bug#34629176_Changes Ends----
      ---Bug#35874079 Changes Starts ---
      ,allow_fx_variation
      ,spot_rate
       ---Bug#35874079 Changes Ends ---
	  ,partial_liqd_allowed --Bug#36486312
	)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_upload_contract_master.VW
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, **photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or **its affiliates. 
**
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
**
**Changed By         : Pallavi R
**Date               : 13-Mar-2019
**Change Description : Changes done for Disbursement
**Search String      : OBCL_14.3_DSBR Changes 

**  Modified By     : Kavitha Asokan
**  Modified On     : 08-JUN-2022
**  Modified Reason : Added discounted schedules for contract_upload validations
**  Search String   : Bug#34224258

**  Modified By     : Revathi Dharmalingam
**  Modified On     : 12-JUL-2022
**  Modified Reason : Added new column for Allow Pre Amort Interest when contract_upload validations
**  Search String   : OBCL_14.5_SUPPORT_BUG#34361191

**  Modified By     : Abhik Das
**  Modified On     : 26-SEP-2022
**  Modified Reason : Added new columns NET_ACROSS_DRAWDOWN and Alternate_Ref_No for contract_upload validations
**  Search String   : OBCL_14.6_Support_Bug#34629176_Changes

**  Modified By     : Akhila Samson
**  Modified On     : 06-Oct-2023
**  Modified Reason : Added new columns ALLOW_FX_VARIATION and SPOT_RATE for contract_upload validations
**  Search String   : Bug#35874079

**  Modified By     : Satheesh Seshan
**  Modified On     : 12-Mar-2024
**  Modified Reason : NBE - Contract level partial liqd allowed field inclusion
**  Search String   : Bug#36486312
----------------------------------------------------------------------------------------------------
*/
   SELECT	  a.module 
   		, a.counterparty
   		, a.external_init_date
   		, a.import_status
		, a.post_import_status, a.export_status, a.citicube_ref_no
		, b.ext_contract_ref_no, b.source_code, b.branch, b.product
		, b.product_type, b.payment_method, b.rollover_allowed, b.user_ref_no
		  --	B.COUNTERPARTY,
		, b.currency
		, b.amount
		, b.amount_financed -- OBCL_14.3_DSBR Changes
    , b.disbursement_mode  -- OBCL_14.3_DSBR Changes
		, b.original_start_date
		, b.cluster_id
		, b.cluster_size, b.dealer, b.booking_date, b.value_date, b.maturity_type
		, b.maturity_date, b.notice_days, b.remarks, b.dflt_settle_ac
		, b.dflt_settle_ac_branch, b.rel_reference, b.credit_line, b.broker_code
		, b.user_defined_status, b.upload_status, b.contract_schedule_type
		, b.liq_back_valued_schedules, b.principal_liquidation
		, b.revolving_commitment, b.holiday_ccy, b.verify_funds
		, b.schedule_movement, b.ignore_holidays, b.amortisation_type
		, b.deduct_tax_on_capitalisation, b.move_across_month
		, b.cascade_schedules, b.status_control, b.rollover_amt, b.rollover_type
		, b.rollover_amount_type, b.rollover_maturity_type
		, b.rollover_maturity_date, b.rollover_notice_days
		, b.update_utilisation_on_rollover, b.apply_tax_on_rollover
		, b.rollover_iccf_from, b.liquidate_od_schedules
		, b.schedule_definition_basis, b.apply_charge, b.tax_scheme
		, b.broker_confirm_status
		  --, b.cparty_confirm_status--confirmation changes 
		, b.loan_stmt_type
		, b.loan_stmt_cycle, b.statement_day, b.recind, b.payind
		, b.roll_reset_tenor --13-MAR-2003 FCC 4.2 APR 2003 Deposit Rollover Changes
				    --07-APR-2003 FCC 4.2 OPS CHANGES START
		, b.department_code
		, b.treasury_source
		, b.funding_method
		, b.workflow_status
		, b.deal_date--07-APR-2003 FCC 4.2 OPS CHANGES END
		, b.offset_no --12-APR-2003 FCC 4.2 OPS CHANGES
		, b.rate_revision_status --13-MAY-2003 FCC 4.2 OPS FOCUS TESTING CHANGES
		, b.parent_contract_ref_no --FCC 4.3 MM Module changes....
		, b.rollover_mechanism, b.rollover_method--,B.SUPRESS_CONFIRMATION FCC 4.3 Aug 2003 Retro Itr1 11
		, b.suppress_confirmation
		, b.custom_ref_no, b.wht_tracking_reqd -- FCC 4.3 August 2003 OFSWEB Interface Changes starts
		, b.rvn_ignore_holidays
		, b.rvn_chk_rate_code_ccy, b.rvn_holiday_chk, b.rvn_move_across_months
		, b.rvn_cascade_schedules, b.rvn_schedule_movement, b.rvn_holiday_ccy
		, b.treat_spl_amt_as, b.new_components_allowed, b.user_id -- FCC 4.3 August 2003 OFSWEB Interface Changes ends
		, b.trade_date 				--	FCC 4.4 DEC2003 FXMM CHANGES 
		, b.supp_bk_val_pymt_msgs        	--	FCC 4.6 Sep04 Interface Release
		, b.apply_bk_val_revision        	--	FCC 4.6 Sep04 Interface Release
		--FCC V.CL 7.3 UK CONSOLIDATION RETRO START
		, b.syndication_ref_no			-- Changes by Satya
		, b.tranche_ref_no			-- Changes by Satya
   	 	--FCC 4.6.2 LD upload change starts, Amit
  		 ,b.agent_cif
   		 ,b.cusip_no
   		 ,b.facility_name
   		 ,b.rolling_loan
   		 ,b.contractual_effective_date
   		 ,b.contractual_maturity_date
   		 ,b.settlement_seq_no
    		--FCC 4.6.2 LD upload changes , Ends
		,b.ssi_mnemonic --26-MAR-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag03,SSI Enhancement Changes
		 ,b.contract_repriced  		-- FCC 4.6.2 CITI LD REPRICE CHANGES BY KISHORE
		 ,b.primary_syndication 	--FCC 4.6.2 CITILS primary syndication changes , Amit Sinha
    		 ,b.initiation_mode 		--FCC 4.6.2 CITILS Upload related changes , Amit Sinha
		-- FCC 7.3 RETRO of CITILS46110406 Changes START
		 ,billing_notice_days			--CITILS46110406 Changes
		-- FCC 7.3 RETRO of CITILS46110406 Changes END
		--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
		,b.agency_id --FCC V.CL 7.3 Release STP changes sfr#1
		,b.agency_contract --FCC V.CL 7.3 Release STP changes sfr#1
		,b.lc_sublimit_amt--FLEXCUBE V.CL Release 7.4 BAU Auto Commitment Booking changes 
		,b.LIMIT_TRACK_REQD---FLEXCUBE V.CL Release 7.4 BAU Auto Commitment Booking changes sfr#41
		-- 04-Sep-2008 FCC V.CL Release 7.4 STP SFR#46 starts
		,b.m_sch_ignore_holidays
		,b.m_consider_branch_holiday
		,b.m_sch_apply_facility_hol_ccy
		,b.m_sch_apply_contract_hol_ccy
		,b.m_sch_apply_local_hol_ccy
		,b.m_sch_ccy
		,b.m_sch_move_across_month
		,b.m_sch_schedule_movement
		-- 04-Sep-2008 FCC V.CL Release 7.4 STP SFR#46 ends
		--FCC V.CL Release 7.5 Lot1 FS TAG 12 start
		,b.start_month
		,b.end_month
		,b.start_day
		,b.end_day
		--FCC V.CL Release 7.5 Lot1 FS TAG 12 end
		,last_available_date --FCC V.CL Release 7.5 CITIUS RETRO  TILL#5389
		,b.exclude_unutil_fee	--06-APR-2009 FLEXCUBE V.CL Release 7.5 LOT1 ITR2 SFR#7 changes, adding column exclude_unutil_fee in View
		--14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag07 change starts here
		, b.auto_extension
		, b.verify_billed_amount
		--14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag07 change ends here
		, capitalized_amount --09-JUL-2009 FLEXCUBE V.CL Release 7.5 lot2 RT SFR#239 changes here
		,b.external_cusip_no --FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION 30-SEP-2009 CITIUS-LS Till#6410, CUSIP amendment changes, added
		,b.allow_fdic_block --08-FEB-2010 Flexcube V.CL 7.6 Code FCCB001199EM_FDIC Release for FDIC, FCC 4.17 DEC 2009 FDIC FCCB001199EM_FDIC
	     --19-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIPBG Loan Changes starts here
		,b.mat_chk_contract_ccy
		,b.mat_chk_local_ccy
    		,b.last_contact_dt
    		,b.tenor_based_spread
		,b.roll_tenor_based_spread
    	     --19-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIPBG Loan Changes ends here
    	     	,b.industry_code --24-JUN-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 06 Risk E-mail changes
		--22-OCT-2010 FLEXCUBE V.CL Release 7.8 VOL1 FS TAG03 Separate holiday treatment for Principal - Start
		,b.prn_holiday_ccy
		,b.prn_ignore_holidays
		,b.prn_move_across_month
		,b.prn_schedule_movement
		,b.prn_cascade_schedules
		--22-OCT-2010 FLEXCUBE V.CL Release 7.8 VOL1 FS TAG03 Separate holiday treatment for Principal - End
		,b.coc_valuation_reqd --08-Mar-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes
		,b.amort_amount	--18-APR-2012:CITIUS#14155:To add amort_amount in view
		,b.grace_days			--18-OCT-2012 Flexcube V.CL Release 7.12, Retro, EURCITIPLC#14776 changes for adjustment
		,b.pool_funding_refno		--18-OCT-2012 Flexcube V.CL Release 7.12, Retro, EURCITIPLC#14776 changes for adjustment
		,b.MASTER_FUNDING_REFNO		--18-OCT-2012 Flexcube V.CL Release 7.12, Retro, EURCITIPLC#14776 changes for adjustment
		,b.on_rate_revision		--26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16055 on_rate_revision flag is added
		,b.net_negative_interest --OFCL 12.2 changes done
		  ,B.ZERO_CASH_FLOW --CASH_FLOW
        ,b.discounted_sch        --Bug#34224258 changes
		,b.Allow_pre_amort_interest --OBCL_14.5_SUPPORT_BUG#34361191 Changes
		---OBCL_14.6_Support_Bug#34629176_Changes Starts---
		,b.NET_ACROSS_DRAWDOWN
	    ,b.Alternate_Ref_No
		----OBCL_14.6_Support_Bug#34629176_Changes Ends----
         ---Bug#35874079 Changes Starts ---
        ,NVL(b.allow_fx_variation,'N')
      ,b.spot_rate
       ---Bug#35874079 Changes Ends ---
	   ,b.partial_liqd_allowed --Bug#36486312
   FROM   oltbs_ext_contract_stat a
	  , oltbs_upload_master b
   WHERE a.branch_code = b.branch
   AND   a.SOURCE = b.source_code
   AND   a.external_ref_no = b.ext_contract_ref_no
/
create or replace synonym olvws_upload_contract_master for olvw_upload_contract_master
/