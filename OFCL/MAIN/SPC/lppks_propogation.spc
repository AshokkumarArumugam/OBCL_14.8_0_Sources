CREATE OR REPLACE PACKAGE lppks_propogation
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lppks_propogation.SPC
**
** Module       : LL
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* Change History - Start
11-APR-2006 FLEXCUBE V.CL  Release 7.0 Added propagate funciton for penalty processing by piyush.
01-AUG-2006 FLEXCUBE V.CL Release 7.1 FS 3.0 Participant Currency Restriction Changes
11-OCT-2006	FLEXCUBE V.CL Release 7.1 ITR2 SFR#34 changes added one parameter to fn_update_party_amount_due.
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#257,STP Consolidation,By Swapnasish,Retroe of conversion changes to the softbase version.
			                    Added new funtion for populating the new participant vdbal table by intersecting vdbal with 
			                    participant ratio table. This will hold good for prorata cases.
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1356,STP Consolidation,By Swapnasish,Rollover Tuning Changes.
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1346 ,STP Consolidation,By Swapnasish,Rollover tuning changes
Change History - End
*/

	--
	FUNCTION fn_populate_propagation_master(
      	      				    P_borrower_RefNo 	 IN 	  	oltbs_contract.contract_ref_no%TYPE,
           						    p_value_date     	 IN 	  	DATE,
           						    P_ErrCode   		 IN OUT 	VARCHAR2,
           						    P_ErrParam      	 IN OUT 	VARCHAR2)
	RETURN BOOLEAN;
	--
	FUNCTION FN_UPDATE_PROPAGATION_MASTER(
					  		  p_ref_no	  			IN 		lbtbs_propagation_master.borrower_ref_no%type,
					  		  p_component 			IN 		lbtbs_propagation_master.component%type,
					  		  p_prop_value 			IN 		lbtbs_propagation_master.propagate_value%type,
					  		  p_prop_value_start_date 	IN 		lbtbs_propagation_master.propagate_value_start_date%type,
					  		  p_prop_schd 			IN 		lbtbs_propagation_master.propagate_schd%type,
				  			  p_prop_schd_start_date 	IN 		lbtbs_propagation_master.propagate_schd_start_date%type,
				  			  p_err_code 			IN OUT 	Varchar2,
					  		  p_err_param 			IN OUT 	Varchar2)
	RETURN BOOLEAN;
	--
	FUNCTION fn_restore_propagation_master(p_ref_no		IN	lbtbs_propagation_master.borrower_ref_no%TYPE,
							   p_err_code	OUT	VARCHAR2,
					      	   p_err_param	OUT	VARCHAR2)
	RETURN BOOLEAN;
	--
	FUNCTION fn_delete_propagation_mstr_bk(p_ref_no		IN	lbtbs_propagation_master.borrower_ref_no%TYPE,
							   p_err_code	OUT	VARCHAR2,
					      	   p_err_param	OUT	VARCHAR2)
	RETURN BOOLEAN;
	--
	FUNCTION fn_propagation_changes(
						p_borrower_ref_no    IN 		oltbs_contract.contract_ref_no%TYPE,
						p_err_code           IN OUT		VARCHAR2,
						p_err_params		IN OUT		VARCHAR2)
	RETURN BOOLEAN;
	--
	FUNCTION fn_update_party_amount_due(
							P_ContractRefNo		IN		oltbs_contract.contract_ref_no%TYPE,
							p_counterparty		IN		oltbs_amount_paid.counterparty%TYPE,
							p_component			IN		oltbs_amount_due_cs.component%TYPE,
							p_due_date			IN		oltbs_amount_due_cs.due_date%TYPE,
							p_borrower_event_seq_no	IN		oltbs_contract_event_log.event_seq_no%TYPE,
						        P_part_esn                    oltbs_contract_event_log.event_seq_no%TYPE,--FLEXCUBE V.CL Release 7.1 ITR2 SFR#34 changes on 11-OCT-2006 changes
							p_component_ccy		IN		oltbs_amount_due_cs.currency_amt_due%TYPE,
							p_amount_due		IN		oltbs_amount_due_cs.amount_due%TYPE,
							p_inflow_outflow		IN		oltbs_amount_due_cs.INFLOW_OUTFLOW%TYPE,
							P_ErrCode			IN OUT	VARCHAR2,
							P_ErrParam			IN OUT	VARCHAR2)
	RETURN BOOLEAN;
	--

	--FLEXCUBE V.CL  Release 7.0 Added propagate funciton for penalty 110406 CHANGES STARTS,PIYUSH
	FUNCTION FN_PROPAGATE_PENALTY_PART(
						p_borrower_ref_no	IN	lptbs_contract_master.borrower_contract_ref_no%type,
						p_esn			IN	number,
						p_event_date 	IN	date,
						p_ccy  	oltbs_amount_due_cs.currency_amt_due%TYPE,	
						p_err_code		OUT	Varchar2,
						p_err_param		OUT	Varchar2)
	RETURN BOOLEAN;

	--FLEXCUBE V.CL  Release 7.0 Added propagate funciton for penalty 110406 CHANGES ENDS,PIYUSH
	--FLEXCUBE V.CL Release 7.1 FS 3.0 Participant Currency Restriction Changes starts
	TYPE balance_comptype IS 
		RECORD (p_contract_ref_no lbtbs_propagation_master.borrower_ref_no%TYPE,
						p_component				lbtbs_propagation_master.component%type,
						p_effective_date	DATE );

	TYPE ty_bal_comptype IS TABLE OF balance_comptype INDEX BY BINARY_INTEGER;

	FUNCTION fn_update_affected_partbals(
						p_contract_ref_no IN lbtbs_propagation_master.borrower_ref_no%TYPE,
						p_event_code			IN oltbs_contract.curr_event_code%type,
						p_effective_date	IN lbtbs_propagation_master.propagate_value_start_date%TYPE)
	RETURN BOOLEAN;
	FUNCTION fn_end_part_bal_propagation(
					p_contract_reference_no IN lbtbs_propagation_master.borrower_ref_no%TYPE,  
					p_component 						IN lbtbs_propagation_master.component%TYPE)
	RETURN BOOLEAN;
	--FLEXCUBE V.CL Release 7.1 FS 3.0 Participant Currency Restriction Changes ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#257 Start By Swapnasish
	--CITIUS-LS#257 Addition Starts
	FUNCTION Fn_update_part_asset_amount(p_borrower_ref_no 	  IN		Varchar2,
										 p_participant	   	  IN		Varchar2,
										 p_participant_ref_no IN		Varchar2,
										 p_contracT_type	  IN		Varchar2,
										 p_value_date		  IN		Date,
										 p_err_code			  IN OUT	Varchar2,
										 p_err_param	      IN OUT	Varchar2									 
										 )
	RETURN BOOLEAN;
	--CITIUS-LS#257 Ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#257 End By Swapnasish
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1356 Start By Swapnasish
--CITIUS-LS#1356 Starts
	p_propagate_tr_party	varchar2(20);
	
	p_prop_event			varchar2(200);
	
	PROCEDURE pr_set_prop_events(p_value VARCHAR2);
	
	PROCEDURE pr_set_tr_comp_propagation(p_value VARCHAR2);
	
	FUNCTION fn_pop_job_queue_part_prop 
										(	 									 
											p_contract_ref_no	varchar2,
											p_tranche_ref_no	varchar2,
											p_esn				varchar2,
											p_event_code		varchar2
										)
	RETURN BOOLEAN;
	
	PROCEDURE pr_participant_prop	( p_seq	number );
	
	FUNCTION fn_process_participant_prop(p_contract_ref_no	varchar2) RETURN BOOLEAN;
	--CITIUS-LS#1356 Ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1356 End By Swapnasish
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1346 Start By Swapnasish
        g_gtemp_ins VARCHAR2(1);-- CITIUS-LS#1346
	
	PROCEDURE pr_set_gtemp_ins(p_value VARCHAR2);-- CITIUS-LS#1346

--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1346 End By Swapnasish

   PROCEDURE pr_participant_prop_Cont ( p_contract_ref VARCHAR2); --OBCL_LS_Auto_Auth 
END lppks_propogation;
/
CREATE or replace SYNONYM lppkss_propogation FOR lppks_propogation
/