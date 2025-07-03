CREATE OR REPLACE PACKAGE tlpks_acc_entry 
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	:tlpks_acc_entry.SPC
** Module	:SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------
Change History

04-JUN-2008 FLEXCUBE V.CL Release 7.4 ,New Unit Developed to handle the accounting for secondary loan trading
27-APR-2012 Flexcube V.CL Release 7.11 FS Tag 05 Trade Date accounting entries Change:Added function Fn_trdt_referal
---------------------------------------------------------------------------------------------------

	Changed By         : Jayaram N
	Date               : 28-Apr-2020
	Change Description : SLT:LS:LOR_Adjustments
	Search String      : OBCL14.4:SFR#29959798:LOR_Adjustments

*/

FUNCTION Fn_enrich_lookup
	(
	P_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_acc_lookup		IN OUT	olpkss_accounting.tbl_lookup,
	P_Error_code		IN OUT	VARCHAR2,
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_pass_entries
	(	
	P_contract_ref_no 	IN 	oltbs_contract.contract_ref_no%TYPE,
	P_event_seq_no 		IN 	oltbs_contract.latest_event_seq_no%TYPE,
	p_event			IN	VARCHAR2,
	P_settlement_pickup	IN	VARCHAR2,
	p_rec_contract_mast	IN	tltbs_contract_master%ROWTYPE,
	p_rec_setl_mast		IN	tltbs_settlement_master%ROWTYPE,
	P_Error_code		IN OUT	VARCHAR2,
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_acc_entry
(
  P_contract_ref_no	IN		tltbs_contract_master.contract_ref_no%TYPE,
  P_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
  P_event_code		IN		oltbs_contract_event_log.event_code%TYPE,
  p_amt_tag_list		IN 		VARCHAR2,
  p_amt_list		IN 		VARCHAR2,
  p_ccy_list		IN 		VARCHAR2,
  P_Error_code		IN OUT	VARCHAR2,
  P_Error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_acc_referral
(
p_contract_ref_no 	IN	oltbs_contract.Contract_ref_no%Type,
p_event_code		IN	VARCHAR2,
p_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE, -- FLEXCUBE V.CL Release 7.4 SLT Changes - Position by Manjula
p_amt_tag_list		IN 	VARCHAR2,
p_amt_list			IN 	VARCHAR2,	
p_ccy_list			IN 	VARCHAR2,
l_amt_tag_list		IN OUT	VARCHAR2,
l_amt_list			IN OUT	VARCHAR2,	
l_ccy_list			IN OUT	VARCHAR2,
p_err_code			IN OUT	VARCHAR2,
p_err_param			IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_pop_swap_contractis
(
P_contract_ref_no	IN		tltbs_contract_master.contract_ref_no%TYPE,
P_swap_rec		IN		tlpks_swap.tbl_swap_record ,
P_event			IN		VARCHAR2,
P_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
P_Error_code		IN OUT		VARCHAR2,
P_Error_params		IN OUT		VARCHAR2
)
RETURN BOOLEAN;

--27-APR-2012 Flexcube V.CL Release 7.11 FS Tag 05 Trade Date accounting entries Change Start
FUNCTION Fn_trdt_referal
			(
			p_contract_rec		IN	tltbs_contract_master%ROWTYPE,
			p_event_code		IN	OLTB_CONTRACT_EVENT_LOG.event_code%TYPE,
			p_event_seq_no		IN	OLTB_CONTRACT_EVENT_LOG.event_seq_no%TYPE,
			p_amt_tag_list		IN OUT	VARCHAR2,
			p_amt_list		IN OUT	VARCHAR2,
			p_ccy_list		IN OUT	VARCHAR2,	
			p_error_code        	IN OUT  VARCHAR2,
      			p_error_param       	IN OUT  VARCHAR2
			)
RETURN BOOLEAN;
--27-APR-2012 Flexcube V.CL Release 7.11 FS Tag 05 Trade Date accounting entries Change End


--OBCL14.4:SFR#29959798:LOR_Adjustments - Start
FUNCTION Fn_Manual_Lor_Adj
           (
            p_contract_rec		IN	tltbs_contract_master%ROWTYPE,
			p_event_code		IN	OLTB_CONTRACT_EVENT_LOG.event_code%TYPE,
			p_event_seq_no		IN	OLTB_CONTRACT_EVENT_LOG.event_seq_no%TYPE,
			p_amt_tag_list		IN OUT	VARCHAR2,
			p_amt_list		    IN OUT	VARCHAR2,
			p_ccy_list		    IN OUT	VARCHAR2,
			p_error_code        IN OUT  VARCHAR2,
            p_error_param       IN OUT  VARCHAR2
			)  
RETURN BOOLEAN;
--OBCL14.4:SFR#29959798:LOR_Adjustments - End

END tlpks_acc_entry;
/
CREATE or replace SYNONYM tlpkss_acc_entry FOR tlpks_acc_entry
/