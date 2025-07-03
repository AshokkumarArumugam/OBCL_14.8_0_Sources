CREATE OR REPLACE PACKAGE lbpks_consol_rollover
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_consol_rollover.SPC	 
**
** Module		: LOAN SYNDICATION
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
/* CHANGE HISTORY

18-MAY-2006 FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#217
26-jul-2007	FCC V.CL Release 7.3 Rollover changes 
12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801,To do the renewal process during batch in multiple background process because of the 
							volume of renewals during quarter end
							Jun-2007, Rollover Job changes
15-March-2010 FLEXCUBE V.CL Release 7.6 FS Tag04 Participant Netting Changes							
*/


PROCEDURE PR_SET_ROLLSTATUS(PFLAG in VARCHAR2);--FCC V.CL Release 7.3 Rollover changes 26-JUL-2007

FUNCTION fn_consol_rollover
		( 
		  p_contract_ref_no  	 IN  		oltbs_contract.contract_ref_no%TYPE,
		  p_processing_date	 IN     	DATE,
		  p_auth_status 		 IN     	oltbs_contract.auth_status%TYPE, 
		  p_error_code		 IN OUT	VARCHAR2,
		  p_error_parameter	 IN OUT	VARCHAR2
	 	)
RETURN BOOLEAN;

FUNCTION fn_populate_subsystem
			(p_master_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
			 p_source_code		IN VARCHAR2,
                   p_contract_ref_no 	IN oltbs_contract.contract_ref_no%TYPE,
                   p_type 			IN VARCHAR2) 
RETURN BOOLEAN;

FUNCTION fn_populate_interest
				(p_contract_ref_no 	IN oltbs_contract.contract_ref_no%TYPE,
				 p_source_code		IN VARCHAR2,
				 p_split_no			IN NUMBER,
                                 p_list_of_i_components IN OUT VARCHAR2,
                                 p_list_of_i_rate_types IN OUT VARCHAR2,
                                 p_rvr_method           IN VARCHAR2 --FLEXCUBE V.CL Release 7.1 Rollover Change by Sambhaji 27MAR06
                                 )
   
RETURN BOOLEAN;

FUNCTION  fn_pop_rate_fixing_and_margin
		( 
		  p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
		  p_source_code		IN VARCHAR2,
		  p_split_no			IN NUMBER,
	 	  p_error_code		IN OUT VARCHAR2,
		  p_error_parameter	IN OUT VARCHAR2,
		  p_rvr_method          IN VARCHAR2 --FLEXCUBE V.CL Release 7.1 Rollover Change by Sambhaji 04-apr-06
		)
RETURN BOOLEAN;


FUNCTION fn_update_tranche_utilization
			(p_contract_ref_no 	IN oltbs_contract.contract_ref_no%TYPE,
                   p_tranche_ref_no 	IN oltbs_contract.contract_ref_no%TYPE,
                   p_rollover_amount 	IN oltbs_contract_master.amount%TYPE,
                   p_value_date	 	IN DATE,
			 p_ccy			IN VARCHAR2,
                   p_error_code 		IN OUT VARCHAR2,
                   p_error_parameter 	IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION  fn_rollover_batch
		( 
		  p_seq_no	         IN NUMBER, -- Jun-2007, Rollover Job changes --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801
		  p_processing_date      IN  	DATE,
		  p_commit_frequency	 IN	OLTBS_COMMITFREQ.eod_commit_count%TYPE,
	 	  p_error_code		 IN OUT VARCHAR2,
		  p_error_parameter	 IN OUT VARCHAR2
		)
RETURN BOOLEAN;

--FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#217 START
FUNCTION fn_insert_msg_hoff(
      pcontractrefno          IN       oltbs_contract.contract_ref_no%TYPE,
      peventseqno             IN       oltbs_contract_event_advice.event_seq_no%TYPE,
      peventcode              IN       oltms_product_event_advice.event_code%TYPE,
      paction                 IN       CHAR,  -- (I)nput, (A)uthorize, (B)atch
      pprocessingdate         IN       DATE,
      perrorcode              OUT      ertbs_msgs.err_code%TYPE,
      pBorrrefno              IN       oltbs_contract.contract_ref_no%TYPE
)
      RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#217 END
--15-March-2010 FLEXCUBE V.CL Release 7.6 FS Tag04 Participant Netting Changes start
FUNCTION fn_populate_roll_net(
 p_contract_ref_no		IN	oltbs_contract.contract_ref_no%type,
 p_value_date		IN	DATE,
 p_error_code		IN OUT	VARCHAR2,
 p_error_param		IN OUT	VARCHAR
 )
 RETURN BOOLEAN;
 
FUNCTION fn_insert_outflow(
 p_contract_ref_no	IN	oltbs_contract.contract_ref_no%type,
 p_value_date		IN	DATE,
 p_error_code		IN OUT	VARCHAR2,
 p_error_param		IN OUT	VARCHAR2
 )
RETURN BOOLEAN;
--15-March-2010 FLEXCUBE V.CL Release 7.6 FS Tag04 Participant Netting Changes end

END lbpks_consol_rollover;
/
CREATE or replace SYNONYM lbpkss_consol_rollover for lbpks_consol_rollover
/