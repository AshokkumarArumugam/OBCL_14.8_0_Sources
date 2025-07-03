CREATE OR REPLACE PACKAGE lbpks_init AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_init.SPC
**
** Module	: LOANS  DEPOSITS
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


/*------------------------------------------CHANGE HISTORY----------------------------------------
23-DEC-2004  Flexcube V.CL Release 7.0			Added new package for CITI-LS Phase II dev
03-AUG-2007  FCC V.CL Release 7.3 SPLIT Re Price changes
17-DEC-2007  FCC V.CL 7.3 UK CONSOLIDATION RETRO SGEN/FORWARD PROCESSING CHANGES
04-MAR-2008 Flexcube V.CL Release 7.4, BAU-ITR1 SFR#74 , Amendment of value date of future dated tranche, added the variable to identify value date change,MANEEHA
            Changed the copyright clause as well.
04-AUG-2008 FLEXCUBE V.CL Release 7.4 UK Retro Changes CITIUK-LS-<CITIUPG73100285> Save of new drawdown / tranche fails with error code lbpks_init timestamp error. 
09-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7518, Bangalore Missing Retro					  					   Changes done to .fn_book_ent only as this function is getting called from forms  

  Changed By          : Krithika G
  Change Description  : OBCL 14.1 LS ELCM Block Changes
  Search String       : OBCL_14.1_LS_ELCM_Block_Changes          
  
  **Changed By         : Baljinder Singh
  **Date               : 10-Aug-2020
  **Change Description : Margin to populated along with spread in SOFR
  **Search String      : LB SOFR 10 Aug changes
   
  **Changed By         : Mohan Pal
  **Date               : 23-May-2022
  **Change Description : FWDINIT Batch Call JAVA
  **Search String      : Bug#34147417
  
  **Changed By         : Sowmya Bitra
  **Date               : 22-April-2023
  **Change Description : ECA Support for Interest settled during INIT for discounted
  **Search String      : OBCL_14.8_ECA_Changes
-------------------------------------------END CHANGE HISTORY-------------------------------------
*/
g_DD_fwdinit varchar2(1) := 'N';---Bug#34673548 ADDED

--OBCL_14.8_ECA_Changes Start  
FUNCTION Fn_Eca_Fwd_Init(P_Branch     IN Oltms_Branch.Branch_Code%TYPE,
                           P_Module     IN Oltbs_Contract.Module_Code%TYPE,
                           P_Proc_Date  IN DATE,
                           P_Contref    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Eca_Ref_No IN OUT VARCHAR2,
                           P_Err_Code   IN OUT VARCHAR2,
                           P_Params     IN OUT VARCHAR2)
  
  RETURN VARCHAR2;
--OBCL_14.8_ECA_Changes End 

FUNCTION fn_fwd_init(
	pm_branch		IN	oltms_branch.branch_code%TYPE,
	pm_module		IN	oltbs_contract.module_code%TYPE,
	pm_proc_date		IN	DATE,
	pm_product		IN	oltms_product_master_ld.product%TYPE,
	pm_comt_freq		IN	oltbs_automatic_process_master.bod_commit_count%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	VARCHAR2
	)RETURN BOOLEAN ;
   --Bug#34147417 Palr Changes sTARTS 
 FUNCTION Fn_Fwd_Init(Pm_Branch     IN Oltms_Branch.Branch_Code%TYPE,
                       Pm_Module     IN Oltbs_Contract.Module_Code%TYPE,
                       Pm_Proc_Date  IN DATE,
                       Pm_Contref    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                     --  Pm_Product    IN Oltms_Product_Master_Ld.Product%TYPE,
                     --  Pm_Comt_Freq  IN Oltbs_Automatic_Process_Master.Bod_Commit_Count%TYPE,
					   Pm_Eca_Ref_No IN OUT VARCHAR2, --OBCL_14.8_ECA_Changes
                       Pm_Elcm_Msgid OUT VARCHAR2,
					   Pm_Rfr_Msgid OUT VARCHAR2,
                       Pm_Err_Code   IN OUT VARCHAR2,
                       Pm_Params     IN OUT VARCHAR2)
   RETURN VARCHAR2;
    --Bug#34147417 Palr Changes Ends

FUNCTION fn_cont_init(
	pm_reference		IN	oltbs_contract.contract_ref_no%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	VARCHAR2
	)RETURN BOOLEAN ;

FUNCTION fn_cont_save
	(
	pm_reference 		IN	oltbs_contract.contract_ref_no%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	varchar2
	) RETURN BOOLEAN ;

FUNCTION fn_book_ent(
			pm_ldrec	IN	oltbs_contract_master%ROWTYPE,
			pm_status	IN	oltbs_contract.user_defined_status%TYPE,
			pm_err_code	IN OUT	VARCHAR2,
			pm_params	IN OUT	varchar2
		    )RETURN BOOLEAN ;

   -- LB SOFR 10 Aug changes Starts
 FUNCTION fn_rfr_init( Pm_Module    IN Oltbs_Contract.Module_Code%TYPE,
                     p_processing_date IN DATE,
                     p_contract_ref_no   IN Oltbs_Contract.Contract_Ref_no%TYPE,                     
                     p_err_code  IN OUT VARCHAR2,
                     p_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
    -- LB SOFR 10 Aug changes ends                           

FUNCTION fn_init_ent(
	pm_ldrec	IN 		oltbs_contract_master%ROWTYPE,
	pm_esn		IN 		oltbs_contract.latest_event_seq_no%TYPE,
	pm_mode		IN 		CHAR,
	pm_status	IN 		oltbs_contract.user_defined_status%TYPE,
	pm_err_code	IN OUT	VARCHAR2,
	pm_params	IN OUT	varchar2
	)RETURN BOOLEAN ;

FUNCTION fn_call_limits(
	pm_ldrec		IN oltbs_contract_master%ROWTYPE,
	pm_mode			IN char,
	pm_err_code		IN OUT VARCHAR2
	)RETURN INTEGER ;

PROCEDURE pr_upd_log(
	pm_reference 		IN 	oltbs_contract.contract_ref_no%TYPE,
	pm_module			IN	oltbs_contract.module_code%TYPE,
	pm_esn				IN	oltbs_contract.latest_event_seq_no%TYPE,
	pm_event			IN	oltbs_contract_event_log.event_code%TYPE,
	pm_status			IN	oltbs_contract_event_log.contract_status%TYPE,
	pm_auth_stat		IN	char,
	pm_reversed_esn		IN	oltbs_contract_event_log.reversed_event_seq_no%TYPE
	           );


PROCEDURE pr_upd_log(
	pm_reference 		IN 	oltbs_contract.contract_ref_no%TYPE,
	pm_module			IN	oltbs_contract.module_code%TYPE,
	pm_esn				IN	oltbs_contract.latest_event_seq_no%TYPE,
	pm_event			IN	oltbs_contract_event_log.event_code%TYPE,
	pm_status			IN	oltbs_contract_event_log.contract_status%TYPE,
	pm_auth_stat		IN	char,
	pm_event_date		IN	date,
	pm_reversed_esn		IN	oltbs_contract_event_log.reversed_event_seq_no%TYPE
	           );


PROCEDURE pr_upd_excep(
	pm_reference		IN		oltbs_contract.contract_ref_no%TYPE,
	pm_esn				IN		oltbs_contract.latest_event_seq_no%TYPE,
	pm_event			IN		oltbs_contract.curr_event_code%TYPE,
	pm_counterparty		IN		oltbs_contract.counterparty%TYPE,
	pm_module			IN		oltbs_contract.module_code%TYPE,
	pm_err_code_list	IN		VARCHAR2,
	pm_params_list		IN		VARCHAR2) ;

PROCEDURE pr_ins_excep(
	pm_reference		IN	oltbs_contract_master.contract_ref_no%TYPE,
	pm_esn				IN	oltbs_contract_exception.event_seq_no%TYPE,
	pm_event			IN	oltbs_contract_exception.event_code%TYPE,
	pm_counter_party 	IN	oltbs_contract_exception.counterparty%TYPE,
	pm_error_code		IN	oltbs_contract_exception.error_code%TYPE,
	pm_module			IN	oltbs_contract_exception.module%TYPE,
	pm_params			IN	oltbs_contract_exception.parameters%TYPE
	);

FUNCTION fn_upd_iccf(
	pm_reference	IN	oltbs_contract_master.contract_ref_no%TYPE,
	pm_ccy			IN	oltbs_contract_master.currency%TYPE,
	pm_vdate		IN	DATE,
	pm_pay_method	IN	oltbs_contract_master.payment_method%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT 	VARCHAR2
			) RETURN BOOLEAN;

FUNCTION fn_project_parent(
	p_contract_ref_no				IN		oltbs_contract_master.parent_contract_ref_no%TYPE,
	p_child_ref_no					IN		oltbs_contract_master.contract_ref_no%TYPE,
	p_cross_ref						IN		VARCHAR2,
	p_processing_date				IN		DATE,
	amt								IN OUT	olpkss_rollover.amount_struct,
	p_error_code					IN OUT	VARCHAR2,
	p_error_param					IN OUT	VARCHAR2
	) RETURN BOOLEAN;




FUNCTION FN_COMPUTE_CONT_INTEREST(
	p_contract_ref_no  	IN 	varchar2,
        p_component 		IN 	varchar2,
        p_list_of_amount_tags 	IN OUT 	VARCHAR2,
	p_list_of_amounts 	IN OUT 	VARCHAR2,
	p_list_of_amount_ccys 	IN OUT 	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_fwd_init_wrp
	(
	pm_tbl				IN	olpkss_parallel.contracts_table,
	pm_function_id			IN	VARCHAR2,
	pm_mode 			IN 	VARCHAR2,
	pm_err_code			IN OUT	VARCHAR2,
	pm_params			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_fwd_init_for_a_contract
	(
	pm_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	pm_module		IN	oltbs_contract.module_code%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_populate_init_queue
	(
	pm_module		IN	oltbs_contract.module_code%TYPE,
	pm_eod_bod_pop		IN	VARCHAR2,
	pm_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
FUNCTION fn_insert_init_queue
	(
	pm_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	pm_function_id			IN	eitms_modules_installed.function_id%TYPE,
	pm_processing_date		IN 	DATE,
	pm_err_code				IN 	OUT	VARCHAR2,
	pm_params				IN 	OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_process_init_exception
	(
	p_errcode	IN  OUT      VARCHAR2,
	p_errparam	IN  OUT      VARCHAR2
	)
	RETURN BOOLEAN;


FUNCTION fn_recalculate_tax_amount
				(
				  p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
				, p_error_code			IN OUT	VARCHAR2
				)
RETURN BOOLEAN;

greprice VARCHAR2(1);---FCC V.CL Release 7.3 SPLIT Re Price changes

PROCEDURE pr_set_greprice(P_set varchar2);  --FCC V.CL Release 7.3 SPLIT Re Price changes

--04-MAR-2008 Flexcube V.CL Release 7.4, BAU-ITR1 SFR#74 , Amendment of value date of future dated tranche,MANEEHA STARTS
gvdch VARCHAR2(1);
PROCEDURE  pr_set_gvdch(P_set VARCHAR2);
--04-MAR-2008 Flexcube V.CL Release 7.4, BAU-ITR1 SFR#74 , Amendment of value date of future dated tranche,MANEEHA ends

--FCC V.CL 7.3 UK CONSOLIDATION RETRO starts
--FLEXCUBE V.CL Release 7.3 ITR2 SFR#7 starts
FUNCTION fn_calc_roll_details
		(
		p_contract_ref_no	IN		oltbs_contract_master.contract_ref_no%TYPE,
		p_processing_date	IN		DATE,
		p_special_amt		IN 		NUMBER,
		amt					IN OUT	olpkss_rollover.amount_struct,
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
		)
		RETURN BOOLEAN;
--FCC V.CL 7.3 UK CONSOLIDATION RETRO ends
--FLEXCUBE V.CL Release 7.3 ITR2 SFR#7 ends
--FLEXCUBE V.CL Release 7.4 UK Retro Changes CITIUK-LS-<CITIUPG73100285> Starts--
FUNCTION fn_book_ent(
			pm_reference	IN		oltbs_contract.contract_ref_no%TYPE,
			pm_status		IN		oltbs_contract.user_defined_status%TYPE,
			pm_err_code	IN OUT	VARCHAR2,
			pm_params		IN OUT	varchar2
				)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.4 UK Retro Changes CITIUK-LS-<CITIUPG73100285> Ends--	
--09-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7518, Declared funtion
FUNCTION fn_get_lsroll_parent_ref_no
		(
			p_child_ref_no	IN	VARCHAR2,
			p_parent_ref_no	OUT	VARCHAR2,
			l_err_code		OUT VARCHAR2
		)
RETURN BOOLEAN;
--09-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7518,End

----OBCL_14.1_LS_ELCM_Block_Changes
FUNCTION Fn_Call_Multi_Limits(Pm_Ldrec    IN OUT Oltbs_Contract_Master%ROWTYPE,                  --OBCL_12.5_TrackAcc_Int_Changes
                                Pm_Mode     IN CHAR,
                                Pm_Err_Code IN OUT VARCHAR2
                                /*self_participants  IN lbtb_contract_participant%ROWTYPE*/) RETURN INTEGER; --14.5_PARTICIPANT_LIMIT_CHANGES
--OBCL_14.1_LS_ELCM_Block_Changes Ends

END lbpks_init;
/
CREATE or replace SYNONYM lbpkss_init FOR lbpks_init
/