create or replace package lbpks_payrecv AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_payrecv.SPC
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
----------------------------------------------------------------------------------------------------
*/
/*
CHANGE_HISTORY 
09-aug-2006 FLEXCUBE V.CL Release 7.1 Sulav Created new package for BV Interest
*/


g_payrecv_appl	varchar2(1) := 'N';
g_source_ref_no oltbs_contract.contract_ref_no%TYPE;--SSR

FUNCTION fn_pop_payrecv_due
	(	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
		p_event_seq_no		IN	oltbs_contract_master.event_seq_no%TYPE,
		p_event_code		IN	oltbs_contract_event_log.event_code%TYPE,
		p_component		IN	lftbs_contract_interest.component%TYPE,
		p_currency		IN	oltbs_contract_master.currency%TYPE,
		p_event_date		IN	oltbs_contract_event_log.event_date%TYPE,
		p_diff_amount		IN OUT	oltbs_contract_master.amount%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_payrecv_liqd
		(	p_contract_ref_no	oltbs_contract.contract_ref_no%TYPE,
			p_esn/*Trig Event Esn*/ oltbs_contract.latest_event_seq_no%TYPE,
			p_payment_esn	IN	oltbs_contract_master.event_seq_no%TYPE,
			p_component		oltbs_amount_due_cs.component%TYPE,
			p_currency		oltbs_contract.contract_ccy%TYPE,
			p_party			lbtb_pay_recv_amount_paid.party_involved%TYPE,
			p_amount		oltbs_contract_master.amount%TYPE,
			p_eff_date		DATE,
			p_source_ref_no IN	oltbs_contract.contract_ref_no%TYPE,--SSR
			p_error_code		IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
		)
RETURN BOOLEAN ;

FUNCTION fn_payrecv_liqd_wrapper
	(	p_contract_ref_no IN	oltbs_contract.contract_ref_no%TYPE,
		p_esn		  IN	oltbs_contract.latest_event_seq_no%TYPE,
		p_payment_esn	  IN	oltbs_contract_master.event_seq_no%TYPE,
		p_source_ref_no	  IN	oltbs_contract.contract_ref_no%TYPE,--SSR
		p_error_code	  IN OUT	VARCHAR2,
		p_error_param	  IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_delete_payrecv
		( p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
		  p_event_seq_no	IN	oltbs_contract_master.event_seq_no%TYPE,
		  --p_component		IN	oltbs_amount_due_cs.component%TYPE,
		  p_payment_esn		IN	oltbs_contract_master.event_seq_no%TYPE,
		  p_source_ref_no       IN	oltbs_contract.contract_ref_no%TYPE,--SSR
  		  p_error_code		IN OUT	VARCHAR2,
		  p_error_param		IN OUT	VARCHAR2
		 )
RETURN BOOLEAN ;

FUNCTION fn_reverse_payrecv
			( 
			  p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
			  --p_component		IN	oltbs_amount_due_cs.component%TYPE,
			  p_event_seq_no	IN	oltbs_contract_master.event_seq_no%TYPE,
			  p_payment_esn		IN	oltbs_contract_master.event_seq_no%TYPE,
			  p_reversed_esn	IN	oltbs_contract_event_log.REVERSED_EVENT_SEQ_NO%TYPE,
			  p_source_ref_no       IN	oltbs_contract.contract_ref_no%TYPE,--SSR
			  p_error_code		IN OUT	VARCHAR2,
			  p_error_param		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_get_comp_desc 
				(	p_prod_code	IN	oltms_product_master_ld.product%TYPE ,
					p_component	IN	oltbs_amount_due_cs.component%TYPE
				)
RETURN VARCHAR2;

FUNCTION fn_process_rnd_part
		(	
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,	
			p_payment_esn		IN	oltbs_contract_master.event_seq_no%TYPE,
			p_event_code		IN	oltbs_contract_event_log.event_code%TYPE,
			p_amount		IN OUT	VARCHAR2,
			p_ccy			IN	VARCHAR2,
			p_amount_tag		IN	VARCHAR2,
			p_source_ref_no         IN	oltbs_contract.contract_ref_no%TYPE,--SSR
			p_error_code		IN OUT	VARCHAR2,
			p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

PROCEDURE pr_set_source_ref_no(p_source_ref_no	IN	oltbs_contract.contract_ref_no%TYPE);
FUNCTION fn_repop_payrecv
		(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,	
			p_source_ref_no       IN	oltbs_contract.contract_ref_no%TYPE,--SSR
			p_error_code		IN OUT	VARCHAR2,
			p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN ;



--FLEXCUBE V.CL Release 7.1 BV PRAM CHANGES BY VIJETH ON 17-08-2006 STARTS
FUNCTION fn_pop_payrecv_due_wrap
			(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,	
			p_participant_crn	IN	oltbs_contract.contract_ref_no%TYPE,	
			p_event_seq_no		IN	oltbs_contract_master.event_seq_no%TYPE,
			p_component		IN	lftbs_contract_interest.component%TYPE,	
			p_ccy			IN	oltbs_contract_master.currency%TYPE,
			p_date			IN	oltbs_contract_event_log.event_date%TYPE,
			p_diff_amount		IN OUT	oltbs_contract_master.amount%TYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_param		IN OUT	VARCHAR2,
			p_event_code		IN 	oltbs_contract_event_log.event_code%TYPE DEFAULT 'N'--FLEXCUBE V.CL Release 7.1 ITR1 SFR#123 Fix 
			)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.1 BV PRAM CHANGES BY VIJETH ON 17-08-2006 ENDS
end lbpks_payrecv;
/
CREATE or replace SYNONYM lbpkss_payrecv FOR lbpks_payrecv
/