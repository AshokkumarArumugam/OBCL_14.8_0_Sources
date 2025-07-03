CREATE OR REPLACE PACKAGE lbpks_reprice AS
/*--------------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_reprice.SQL
**
** Module	: LOANS SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------------
*/
/*----------------------------------Change History-------------------------------------------------------
03-AUG-2007 FCC V.CL Release 7.3 Reprice changes

07-AUG-2007 FCC V.CL Release 7.3 SPLIT Re Price changes

03-OCT-2007 FCC V.CL Release 7.3 Reprice Changes September '07 Changes
28-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 RETRO#5518, fn_insert_msg_hoff added in spc
28-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes, Gowri
29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes by Madhu
	    Added a new function fn_validate_sfunds_part for SightingFunds Validation to validate fronting type,unfunded amount
	    for participants across the child and parent contracts.
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - changed the copyright clause.

  **Changed By         : Revathi Dharmalingam
  **Date               : 03-Nov-2022
  **Change Description : Code Fix to Future Dated Reprise which moved to Java layer.
  **Search String      : OBCL_14.5_SUPPORT_BUG#34684957	
  
  **  Changed By         : Vineeth T M
  **  Changed On         : 31-Jul-2023
  **  Change Description : enabling eca for all components - charge related changes for rollover/reprice
  **  Search String      : OBCL_14.8_ECA_1_Changes
----------------------------------End of Change History--------------------------------------------------
*/
g_spltsrno			 NUMBER; -- Changes for Partial rollover advice
g_limit_tranche VARCHAR2(1); -- facility borrower limit changes
--FCC V.CL Release 7.3 SPLIT Re Price changes starts
g_reprice_flag   varchar2(6);
g_reprice VARCHAR2(1); --OBCL_14.3_SOFR_Rollover
PROCEDURE PR_SET_REPRICE_STATUS(PFLAG in VARCHAR2);
g_liq_int VARCHAR2(1) :='N';
g_tot_int_amount NUMBER:=0;
g_int_comp oltbs_amount_due_cs.component%TYPE ;
--FCC V.CL Release 7.3 SPLIT Re Price changes ends
g_split_vami varchar2(1) := 'N'; --OBCL_14.5_Discounted_Schedule_Changes_Split_Reprice

--FLEXCUBE V.CL Release 7.6 Sighting Fund Changes, 28-Apr-2009 starts
g_liq_unfund_int	VARCHAR2(1) :='N';
g_tot_unfund_int_amount	NUMBER:=0;
g_unfund_int_comp	oltbs_amount_due_cs.component%TYPE;
--FLEXCUBE V.CL Release 7.6 Sighting Fund Changes, 28-Apr-2009 ends
g_reprice_contract varchar2(1); --OBCL_14.4_SOFR_Reprice 
g_split_reprice varchar2(1):='N';--OBCL_14.5_LS_PARTICIPANT_BA_CHANGES
g_merge_reprice varchar2(1) := 'N';---Bug#34174970
g_sub_process   VARCHAR2(10); --OBCL_14.5_SUPPORT_BUG#34684957 Changes
g_action VARCHAR2(10); --Bug#35174669
FUNCTION Fn_Populate_Liq_Tables  (
								  p_Contract_ref_no IN 		oltbs_contract.contract_ref_no%TYPE
								 ,p_Process        	IN 		VARCHAR2
								 ,p_process_date	IN      DATE
								 ,p_Value_Date     	IN 		DATE
								 ,p_Limit_Date     	IN 		DATE
								 ,p_Liquidate      	IN 		VARCHAR2
								 ,p_split_master	IN      lbtbs_contract_split_master%ROWTYPE
								 ,p_liqd_int_prepay	IN  	oltbs_contract_preference.liqd_int_on_prepayment%TYPE
								 ,p_liqd_fired		   OUT	VARCHAR2
								 ,p_Spti_Principal 	IN OUT	oltbs_amount_due_cs.Amount_Due%TYPE
								 ,p_Err_Code       	IN OUT 	VARCHAR2
								 ,p_Err_Param      	IN OUT 	VARCHAR2
							 	)
RETURN BOOLEAN;

FUNCTION Fn_process_spti
					(
					  p_Contract_Row   IN 	oltbs_contract%ROWTYPE
					 ,p_Process_Date   IN   Date
					 ,p_split_master   IN   lbtbs_contract_split_master%ROWTYPE
					 ,p_split_amount   IN   lbtbs_contract_split_detail.amount%TYPE
					 ,p_Err_Code       OUT 	VARCHAR2
					 ,p_Err_Param      OUT 	VARCHAR2
					)
RETURN BOOLEAN ;

FUNCTION Fn_partial_roll_a_contract
					(
					  p_Contract_ref_no   IN 	oltbs_contract.contract_ref_no%TYPE
					 ,p_split_serial_no	  IN    lbtbs_contract_split_master.split_serial_no%TYPE
					 ,p_Process_Date   	  IN    DATE
					 ,p_Err_Code          IN OUT 	VARCHAR2
					 ,p_Err_Param         IN OUT 	VARCHAR2
					)
RETURN BOOLEAN ;

FUNCTION Fn_process_partial_roll
					( p_seq_no		  IN 	NUMBER--FCC V.CL Release 7.3 SPLIT Re Price changes
					 ,p_branch   		  IN 	VARCHAR2
					 ,p_Process_Date   	  IN    DATE
					 ,p_Err_Code          IN OUT 	VARCHAR2
					 ,p_Err_Param         IN OUT 	VARCHAR2
					)
RETURN BOOLEAN ;

FUNCTION Fn_update_roll_esn	( p_contract_ref_no 	   oltbs_contract.contract_ref_no%TYPE,
							  p_split_serial_no 	   Number,
							  p_event_seq_no           Number,
							  p_err_code	   	IN OUT Varchar2,
							  p_err_param   	IN OUT Varchar2
							  )
RETURN BOOLEAN ;

FUNCTION Fn_roll_part_processing(p_contract_ref_no 	  oltbs_contract.contract_ref_no%TYPE,
								 p_latest_esn	   	  oltbs_contract.Latest_event_seq_no%TYPE,	--CAMD event sequence no of the borrower contract..
								 p_split_serial_no    lbtbs_contract_split_detail.split_serial_no%TYPE,
								 p_err_code	   IN OUT Varchar2,
								 p_err_param   IN OUT Varchar2
								 )
RETURN BOOLEAN;

FUNCTION Fn_roll_borr_processing(p_contract_ref_no 	  oltbs_contract.contract_ref_no%TYPE,
								 p_split_serial_no    lbtbs_contract_split_detail.split_serial_no%TYPE,
								 p_latest_esn	   	  oltbs_contract.Latest_event_seq_no%TYPE,
								 p_version_no		  oltbs_contract.Latest_version_no%TYPE,
								 p_err_code	   IN OUT Varchar2,
								 p_err_param   IN OUT Varchar2
								 )
RETURN BOOLEAN;


FUNCTION Fn_Populate_Components(Pcontract       IN oltbs_contract.Contract_Ref_No%TYPE
                                 ,Pccy            IN oltbs_contract.Contract_Ccy%TYPE
                                 ,Pbranch         IN oltbs_contract.Branch%TYPE
                                 ,Psplit_Serialno IN oltbs_contract_split_master.Split_Serial_No%TYPE
                                 ,Pproduct        IN oltbs_contract.Product_Code%TYPE
                                 ,p_Serial_No     IN oltbs_contract_split_detail.Serial_No%TYPE
                                 ,Pamount         IN oltbs_contract_split_detail.Amount%TYPE
                                 ,Pcont_Tenor     IN oltbs_split_product_intcomps.Reset_Tenor%TYPE
                                 ,Pvalue_Date     IN DATE)
RETURN BOOLEAN;

FUNCTION Fn_Rates_Pickup(Pcontract       IN oltbs_contract.Contract_Ref_No%TYPE
                          ,Pccy            IN oltbs_contract.Contract_Ccy%TYPE
                          ,Pbranch         IN oltbs_contract.Branch%TYPE
                          ,Psplit_Serialno IN oltbs_contract_split_master.Split_Serial_No%TYPE
                          ,Pproduct        IN oltbs_contract.Product_Code%TYPE
                          ,p_Serial_No     IN oltbs_contract_split_detail.Serial_No%TYPE
                          ,Pamount         IN oltbs_contract_split_detail.Amount%TYPE
                          ,Pcont_Tenor     IN oltbs_split_product_intcomps.Reset_Tenor%TYPE
                          ,Pvalue_Date     IN DATE)
RETURN BOOLEAN;

FUNCTION Fn_Update_Maturity_Date(Pcontract         IN 	VARCHAR2
                                  ,Pccy            IN 	VARCHAR2
                                  ,Pbranch         IN 	VARCHAR2
                                  ,Psplit_Serialno IN 	NUMBER
                                  ,Pvalue_Date     IN 	DATE)
RETURN BOOLEAN;

FUNCTION fn_check_irfx_exfx_fixed( Pcontract		IN 		VARCHAR2
								  ,PSplit_serial_no	IN 		NUMBER
								  ,Pexfx_fixed		OUT		VARCHAR2
								  ,Pirfx_fixed		OUT 	VARCHAR2)

RETURN BOOLEAN;


FUNCTION Fn_split_backup
			( p_contract_ref_no 	   oltbs_contract.contract_ref_no%TYPE,
			  p_split_serial_no 	   Number,
			  p_err_code	   	IN OUT Varchar2,
			  p_err_param   	IN OUT Varchar2
			  )
RETURN BOOLEAN;

FUNCTION Fn_split_delete
			( p_contract_ref_no 	   oltbs_contract.contract_ref_no%TYPE,
			  p_split_serial_no 	   Number,
			  p_err_code	   	IN OUT Varchar2,
			  p_err_param   	IN OUT Varchar2
			  )
RETURN BOOLEAN;

FUNCTION Fn_split_restore_backup
			( p_contract_ref_no 	   oltbs_contract.contract_ref_no%TYPE,
			  p_split_serial_no 	   Number,
			  p_err_code	   	IN OUT Varchar2,
			  p_err_param   	IN OUT Varchar2
			  )
RETURN BOOLEAN;

FUNCTION Fn_split_authorise
			( p_contract_ref_no 	   oltbs_contract.contract_ref_no%TYPE,
			  p_split_serial_no 	   Number,
			  p_err_code	   	IN OUT Varchar2,
			  p_err_param   	IN OUT Varchar2
			  )
RETURN BOOLEAN;

--FCC V.CL Release 7.3 Reprice Changes September '07 Changes start
FUNCTION fn_reprice_reversal
		(p_contract_ref_no	IN	oltbs_contract_split_master.CONTRACT_REF_NO%TYPE
		,p_serial_no		IN	oltbs_contract_split_master.SPLIT_SERIAL_NO%TYPE
		,p_reprice_type		IN	oltbs_contract_master.CONTRACT_REPRICED%TYPE
		,p_error		IN OUT  VARCHAR2
		,p_error_param		IN OUT  VARCHAR2
		)
RETURN BOOLEAN;
FUNCTION fn_delete_reversal
		(
			p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
			p_serial_no		IN	NUMBER,
			p_renewal_type		IN	VARCHAR2,
			p_err_code		OUT	VARCHAR2,
			p_err_param		OUT	VARCHAR2
		)
RETURN BOOLEAN ;
--FCC V.CL Release 7.3 Reprice Changes September '07 Changes end


--FCC V.CL Release 7.3 Reprice changes start
g_reprice_serial_no	NUMBER;
g_parent_ref_no	oltbs_contract.contract_ref_no%TYPE;
g_parent_ref_no_rfr	oltbs_contract.contract_ref_no%TYPE; --OBCL_14.5_SOFR_Reprice
FUNCTION fn_start_merge_process
			(
				p_contract_ref_no	IN 	VARCHAR2 ,
				p_merge_serial_no	IN	NUMBER,
				p_err_code		IN OUT	VARCHAR2 ,
				p_err_param		IN OUT	VARCHAR2,
				p_action_code		IN	VARCHAR2 DEFAULT 'S'
			 )
RETURN BOOLEAN;
FUNCTION fn_batch_process
		(       p_seq_no	IN 	NUMBER,
			p_process_date  IN	DATE,
			p_commit_freq	IN	NUMBER,
			p_err_code	IN OUT VARCHAR2,
			p_err_param	IN OUT VARCHAR2
		)
RETURN BOOLEAN ;
FUNCTION fn_validate_part
			(
				p_contract_ref_no IN VARCHAR2,
				p_serial_no IN NUMBER,
				p_child_ref_no IN VARCHAR2    --FCC V.CL Release 7.3 Reprice Changes
			)
RETURN BOOLEAN;

FUNCTION fn_merge_delete
			(
				p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
				p_merge_serial_no	IN	lbtbs_contract_merge_master.merge_serial_no%type,
				p_err_code		OUT	VARCHAR2,
				p_err_param		OUT	VARCHAR2
			)
RETURN BOOLEAN;
FUNCTION fn_merge_auth
		(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
			p_merge_serial_no	IN	lbtbs_contract_merge_master.merge_serial_no%type,
			p_err_code		OUT	VARCHAR2,
			p_err_param		OUT	VARCHAR2
		)
RETURN BOOLEAN;
--FCC V.CL Release 7.3 Reprice changes ends

--28-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 RETRO#5518 start
FUNCTION Fn_insert_msg_hoff
	  (
      pcontractrefno          IN       oltbs_contract.contract_ref_no%TYPE,
      peventseqno             IN       oltbs_contract_event_advice.event_seq_no%TYPE,
      peventcode              IN       oltms_product_event_advice.event_code%TYPE,
      paction                 IN       CHAR,  -- (I)nput, (A)uthorize, (B)atch
      pprocessingdate         IN       DATE,
      pborrrefno			  IN       oltbs_contract.contract_ref_no%TYPE,
      p_split_no			  IN       NUMBER,
      p_borr_esn			  IN	   NUMBER,
      perrorcode              OUT      ertbs_msgs.err_code%TYPE
	  )
RETURN BOOLEAN;
--28-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 RETRO#5518 end
--FLEXCUBE V.CL Release 7.6 Sighting Fund Changes by Madhu Starts
FUNCTION fn_validate_sfunds_part
(
	p_contract_ref_no	 IN 	oltbs_contract.contract_ref_no%TYPE,
	p_child_ref_no		 IN 	oltbs_contract.contract_ref_no%TYPE,
	p_err_code		 OUT  	VARCHAR2,
	p_err_param		 OUT 	VARCHAR2
)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.6 Sighting Fund Changes by Madhu Ends

FUNCTION Fn_Temp_Roll_Refno(p_old_contract_ref_no IN  OLTBS_CONTRACT.CONTRACT_REF_NO%TYPE,
                                p_temp_roll_refno_rec IN  LBTBS_TEMP_ROLL_REFNO.CONTRACT_REF_NO%TYPE,
                                p_split_serial_no     in  LBTBS_TEMP_ROLL_REFNO.SPLIT_SERIAL_NO%TYPE,
                                P_SERIAL_NO           IN  LBTBS_TEMP_ROLL_REFNO.SERIAL_NO%TYPE,
                                p_version_no          IN  LBTBS_TEMP_ROLL_REFNO.VERSION_NO%TYPE,
                                p_Source_Code         IN  LBTBS_TEMP_ROLL_REFNO.SOURCE_CODE%TYPE,
                                p_Err_Code            IN OUT VARCHAR2)
    RETURN BOOLEAN;
	
--OBCL_14.5_SMTB_#34029017 changes starts

      FUNCTION Fn_log_error_ovd(p_reference_no oltbs_contract.contract_ref_no%TYPE,
                            p_error_codes  IN OUT Varchar2,
                            p_error_params Varchar2,
                            p_err_ovd      Varchar2)
  
   RETURN BOOLEAN;

----Bug#35056639 STARTS
FUNCTION Fn_Batch_Process_Merge(p_Seq_No       IN NUMBER,
                            p_Process_Date IN DATE,
                            p_Tranche_Ref_No   IN VARCHAR2,
                            p_Merge_parent_contract_ref  IN oltbs_contract.contract_ref_no%TYPE,
                            p_Merge_serial_no         IN Oltbs_Contract_Merge_Master.Merge_Serial_No%TYPE,
                            p_merge_value_date IN Oltbs_Contract_Merge_Master.MERGE_VALUE_DATE%TYPE,                            
                            p_Elcm_Msgid       OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
                            p_rfr_Msgid        OUT Sypks_Utils.g_rfr_Msgid%TYPE,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Param    IN OUT VARCHAR2) 
    RETURN VARCHAR2;
----Bug#35056639 ENDS


--OBCL_14.5_SMTB_#34029017 changes ends	
--OBCL_14.5_SUPPORT_BUG#34684957 Changes Starts
FUNCTION Fn_Batch_Process_Partial_Roll
      (p_Seq_No           IN NUMBER,
	   p_Branch           IN VARCHAR2,
	   p_Process_Date     IN DATE,
	   p_Tranche_Ref_No   IN VARCHAR2,
	   p_Contract_Ref_No  IN VARCHAR2,
	   p_Split_Serial_No  IN NUMBER,
	   p_Split_Value_Date IN DATE,
	   p_Split_Book_Date  IN DATE,
	   p_Split_Status     IN VARCHAR2,
	   p_Elcm_Msgid       OUT  Sypks_Utils.g_Elcm_Msgid%TYPE,                                   
	   p_rfr_Msgid        OUT  Sypks_Utils.g_rfr_Msgid%TYPE,
     p_eca_ref_no   IN OUT VARCHAR2,--OBCL_14.8_ECA_1_Changes  
	   p_Err_Code         IN OUT VARCHAR2,
	   p_Err_Param        IN OUT VARCHAR2)
   RETURN VARCHAR2; 

FUNCTION Fn_Compute_Eca_For_Reprice_Wrapper
       (   p_Contract_Ref_No             IN Oltbs_Contract.Contract_Ref_No%TYPE,
		   p_Processing_Date             IN DATE,
		   p_Authorization_Status        IN Oltbs_Contract.Auth_Status%TYPE,
		   p_Split_Serial_No             IN NUMBER,
		   p_Split_Value_Date            IN DATE,
		   p_Eca_Ref_No                  OUT VARCHAR2,                                       
		   p_Error_Code                  IN OUT VARCHAR2,
		   p_Error_Parameter             IN OUT VARCHAR2
		)
RETURN VARCHAR2;

 FUNCTION Fn_Compute_Eca_For_Reprice
  (
    p_contract_ref_no          IN    oltbs_contract.contract_ref_no%TYPE,
    p_processing_date          IN    DATE,
    p_authorization_status     IN    oltbs_contract.auth_status%TYPE,
    p_Split_Serial_No          IN NUMBER,
    p_Split_Value_Date         IN DATE,
    p_Eca_Ref_No               OUT VARCHAR2,
    p_error_code               IN OUT    VARCHAR2,
    p_error_parameter          IN OUT    VARCHAR2
  )
  RETURN BOOLEAN;

   FUNCTION Fn_batch_fwd_repc_Auth
   (  p_Contract_Ref_No IN Oltbs_Contract_Payment_Due.Contract_Ref_No%TYPE,
	  p_Event_Seq_No    IN Oltbs_Contract_Payment_Due.Event_Seq_No%TYPE,
	  p_Branch          IN Oltbs_Contract.Branch%TYPE,
	  p_User_Id         IN VARCHAR2,
	  p_Eca_Ref         IN VARCHAR2,
	  Perrorcode        IN OUT VARCHAR2,
	  Perrorparam       IN OUT VARCHAR2)
    RETURN VARCHAR2;
--OBCL_14.5_SUPPORT_BUG#34684957 Changes Ends

END lbpks_reprice;
/
create or replace synonym lbpkss_reprice for lbpks_reprice
/