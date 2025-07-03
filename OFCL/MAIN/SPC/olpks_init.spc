CREATE OR REPLACE PACKAGE olpks_init AS
-- FCC 4.6 Sep04 Retro (India) 

/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_init.SPC
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
28/JAN/2002 FCC3.9  LATAM CHANGES    NEW FUNCTION FN_COMPUTE_CONT_INTEREST is added to calculate the 
                                     contingent interest of each interest component which is called
				     during the events like amendment,rate revision.

27-APR-2002 FCC 4.0 June 2002 PLNCITI TIL #2963 Added overloaded PROCEDURE pr_upd_log which will update event_value_date 
			              in OLTB_CONTRACT_EVENT_LOG..Bsk.
			              
25-JUL-2003 FCC 4.3 Added new function fn_project_parent for projecting parent's amount as of maturity date.			              
16-FEB-2004 FCC 4.5lot1  APRIL 2004 FX/MM Fast Changes  Modified the fn_fwd_init and introduced
                                                        a new function fn_fwd_init_wrp
                                                        
29-MAR-2004 FCC4.5 LOT2 ONLINE QUEUE CHANGES
18-SEP-2004 FCC4.6 Sep04 ITR1 sfr 540 err_code type changed from err_code%type to varchar2 in all palces 
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Start Here
	07-Sep-2007 FCC 7.3 RETRO of CITILS46110391 Problem - SGEN for rollover
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO End Here
05-NOV-2009	CITIUS-LS#6852.Changes for carry forward contra and reserve to the child contract during rollover.
28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION changes
	a) 23-NOV-2009 CITIUS-LS#6930 -  Handling the contrac,resever processing for reprice-child
18-MAR-2010 FLEXCUBE V.CL Release 7.6  CITIUS-LS#7181  I consolidated 001L001093160026 this contract had reserves and 001L001093160027 with contra and reserves.  
							When the contracts were consolidated the contra and the reserves on contract 001L001093160027 are missing on 
							the child contract 001L001093562004.  The accounting entries were created for the contra and the reserves creating a Pr	
20-APR-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,Added a new function fn_insert_status_due to store the status change of commitment contracts.
08-JUL-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 07 ITR1#125 Changes, Non-Performing Loans, while booking LD contract (even with non-performing status), system pass accrual for NORM status.
28-DEC-2011 CITIUS-LD#12221 Changes: When a loan is built or renewed with acquired interest the STCH Event is removing the acquired interest from the income account. The products needs to be updated to prevent funds from being removed from income. On renewals when the interest is acquired the Contra balance increases by the amount acquired.

CHANGE HISTORY

  Changed By         : Krithika Gopalakrishna
  Change Description : Changes for Multiple Collateral/Pool linkages 
  Search String 	 : OBCL 12.5.0.0.0_Changes for Multiple Collateral/Pool Linkages
  
  Changed By         : Krithika Gopalakrishna
  Change Description : Track Accrual Interest Changes - ELCM
  Search String 	 : OBCL 12.5.0.0.0_TrackAccInt_Changes
  
      **Changed By         : Prakash Ravi
      **Date               : 03-APR-2019
      **Change Description : Changes done for OBCL CD integration with DSBR.
      **Search String      : OBCL_14.3_CD_Integration
	  
**SFR Number         : 29401742  
**Changed By         : Arvind Baskar
**Change Description : Hooks provided for fn_fwd_init 
**Search String      : Bug#29401742 	  

  **Changed By         : Chandra Achuta
  **Date               : 20-Aug-2021
  **Change Description : Code Change for supporting tax on charge component for BOOK and DSBR events
  **Search String      : Bug#33135228

  **Changed By         : Navoneel Nandan
  **Date               : 23-Sep-2021
  **Change Description : Code Change for Blocking the Amount Financed
  **Search String      : OBCL_14.4_Progessive_DSBR
-------------------------------------------END CHANGE HISTORY-------------------------------------
*/
-- FCC 4.6 Sep04 Retro (India) 

--Bug#29401742  changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#29401742  changes end

--28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION changes start here (CITIUS-LS#6930)
g_split_processing Varchar2(1) := 'N';
--28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION changes end here (CITIUS-LS#6930)

g_ld_cont_book	VARCHAR2(1) := 'N'; --08-JUL-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 07 ITR1#125 Changes here

g_acqrd_spti Varchar2(1) := 'N';--28-DEC-2011 CITIUS-LD#12221 Changes
g_tax_on_charge	Varchar2(1):= 'N';   --Bug#33135228   Code Added
FUNCTION fn_fwd_init(
	pm_branch		IN	oltms_branch.branch_code%TYPE,
	pm_module		IN	oltbs_contract.module_code%TYPE,
	pm_proc_date	IN	DATE,
	pm_product		IN	oltms_product_master_ld.product%TYPE,
	pm_comt_freq	IN	oltbs_automatic_process_master.bod_commit_count%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	VARCHAR2
	)RETURN BOOLEAN ; 
 
FUNCTION fn_cont_init(
	pm_reference	IN		oltbs_contract.contract_ref_no%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	VARCHAR2
	)RETURN BOOLEAN ; 
 
FUNCTION fn_cont_save
	(
	pm_reference 	IN		oltbs_contract.contract_ref_no%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	varchar2
	) RETURN BOOLEAN ; 
 
FUNCTION fn_book_ent(
			pm_ldrec	IN		oltbs_contract_master%ROWTYPE,
			pm_status	IN		oltbs_contract.user_defined_status%TYPE,
			pm_err_code	IN OUT	VARCHAR2,
			pm_params	IN OUT	varchar2
		    )RETURN BOOLEAN ; 
 
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

--OBCL 12.5.0.0.0_Changes for Multiple Collateral/Pool Linkages --Krithika
/*FUNCTION fn_call_multiple_linkages(
	pm_ldrec		IN oltbs_contract_master%ROWTYPE,
	pm_mode			IN CHAR,
	pm_err_code		IN OUT VARCHAR2,
  coll_link_dtls   IN oltbs_acc_coll_link_dtls%ROWTYPE
	)RETURN INTEGER; */
--OBCL 12.5.0.0.0_Changes for Multiple Collateral/Pool Linkages Ends --Krithika 

--Added by Krithika
FUNCTION Fn_Call_Multi_Limits(Pm_Ldrec    IN OUT Oltbs_Contract_Master%ROWTYPE,
                              --OBCL 12.5.0.0.0_TrackAccInt_Changes
                                Pm_Mode     IN CHAR,
                                Pm_Err_Code IN OUT VARCHAR2
                                ,Pm_Event    IN VARCHAR2 DEFAULT 'INIT'--OBCL_14.4_Progessive_DSBR Changes
                                ) RETURN INTEGER;
--Added by Krithika

 
PROCEDURE pr_upd_log( 
	pm_reference 		IN 	oltbs_contract.contract_ref_no%TYPE,
	pm_module			IN	oltbs_contract.module_code%TYPE,
	pm_esn				IN	oltbs_contract.latest_event_seq_no%TYPE,
	pm_event			IN	oltbs_contract_event_log.event_code%TYPE,
	pm_status			IN	oltbs_contract_event_log.contract_status%TYPE,
	pm_auth_stat		IN	char,
	pm_reversed_esn		IN	oltbs_contract_event_log.reversed_event_seq_no%TYPE
	           ); 

--FCC 4.0 June 2002 TIL #2963 PLNCITI Added the overloaded procedure pr_upd_log..Starts..Bsk

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
-- FCC 4.0 June 2002 TIL #2963 PLNCITI Added the overloaded procedure pr_upd_log..Ends..Bsk

 
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
--
--FCC 4.3 Added this  function to project parent's amounts as off maturity date starts			
--
FUNCTION fn_project_parent(
	p_contract_ref_no				IN		oltbs_contract_master.parent_contract_ref_no%TYPE,
	p_child_ref_no					IN		oltbs_contract_master.contract_ref_no%TYPE,
	p_cross_ref						IN		VARCHAR2,
	p_processing_date				IN		DATE,
	amt								IN OUT	olpkss_rollover.amount_struct,
	p_error_code					IN OUT	VARCHAR2,
	p_error_param					IN OUT	VARCHAR2
	) RETURN BOOLEAN;


--
--FCC 4.3 Added this  function to project parent's amounts as off maturity date ends
--


--fcc3.9 LATAM and PARAGUAY changes starts
FUNCTION FN_COMPUTE_CONT_INTEREST(
	p_contract_ref_no  	IN 	varchar2,
        p_component 		IN 	varchar2,
        p_list_of_amount_tags 	IN OUT 	VARCHAR2,
	p_list_of_amounts 	IN OUT 	VARCHAR2,
	p_list_of_amount_ccys 	IN OUT 	VARCHAR2)
RETURN BOOLEAN;
--fcc3.9 LATAM and PARAGUAY changes ends

-- FCC 4.5Lot1 FX/MM Fast Changes start

FUNCTION fn_fwd_init_wrp 
	(
	pm_tbl							IN		olpkss_parallel.contracts_table,
	pm_function_id					IN		VARCHAR2,
	pm_mode 						IN 		VARCHAR2,
	pm_err_code						IN OUT	VARCHAR2,
	pm_params						IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_fwd_init_for_a_contract
	(
	pm_contract_ref_no				IN		oltbs_contract.contract_ref_no%TYPE,
	pm_module						IN		oltbs_contract.module_code%TYPE,
	pm_err_code						IN OUT	VARCHAR2,
	pm_params						IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_populate_init_queue
	(
	pm_module			IN		oltbs_contract.module_code%TYPE,	
	pm_eod_bod_pop		IN		VARCHAR2,
	pm_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	pm_err_code			IN OUT	VARCHAR2,
	pm_params			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
--fcc45 lot2	 added pm_contract_ref_no as a param
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

-- FCC 4.5Lot1 FX/MM Fast Changes end

-- FCC 4.6 Sep04 Retro (India)

-- FCC LOT2 ITR2 SFR 15

FUNCTION fn_recalculate_tax_amount
				(
				  p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
				, p_error_code			IN OUT	VARCHAR2
				)
RETURN BOOLEAN;

-- FCC LOT2 ITR2 SFR 15
--19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Start Here
-- 07-Sep-2007 FCC 7.3 RETRO of CITILS46110391 Start Here
FUNCTION fn_calc_roll_details
		(
		p_contract_ref_no	IN		oltbs_contract_master.contract_ref_no%TYPE,
		p_processing_date	IN		DATE,
		p_special_amt		IN 		NUMBER,
		amt					IN OUT	olpkss_rollover.amount_struct,
		p_error_code		IN OUT	VARCHAR2 ,    -- ertbs_msgs.err_code%TYPE, PLC46060020
		p_error_param		IN OUT	VARCHAR2
		)
		RETURN BOOLEAN;
-- 07-Sep-2007 FCC 7.3 RETRO of CITILS46110391 End Here
--19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO End Here
--CITIUS-LS#6852
FUNCTION Fn_Roll_Contra_Reserve
	(
		p_Contract_Ref_No	IN		oltbs_contract.contract_ref_no%TYPE,
		 p_roll_type		IN	VARCHAR2,----FLEXCUBE V.CL Release 7.6  CITIUS-LS#7181 
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--CITIUS-LS#6852

--20-APR-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,changes start
FUNCTION fn_insert_status_due
	(
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
		p_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
		p_status		IN	oltbs_contract.user_defined_status%TYPE,
		p_processing_date	IN	DATE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
	)	
RETURN BOOLEAN;
--20-APR-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,changes end
--OBCL_14.3_CD_Integration changes start
  FUNCTION Fn_Validate_Afmap(p_Contract_Record IN Oltbs_Contract_Master%ROWTYPE,
                             p_Cstb_Contract   IN Oltbs_Contract%ROWTYPE,
                             p_Afrec           OUT Oltms_Auto_Fund_Mapping%ROWTYPE, --OBCL_14.2_CD_Integration Changes
                             p_Error_Code      IN OUT VARCHAR2,
                             p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --TILL#203. Retro as part of Flexcube V.CL Release 7.0 changes end
--OBCL_14.3_CD_Integration changes end
 
END olpks_init;
/
CREATE or replace SYNONYM olpkss_init FOR olpks_init 
/