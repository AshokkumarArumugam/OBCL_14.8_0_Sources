CREATE OR REPLACE PACKAGE olpks_ld_swift
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ld_swift.SPC
**
** Module	: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
*/
/*------------------------------------------CHANGE HISTORY----------------------------------

03-NOV-2003 FCC 4.4 :Moved the contract_struct record declaration to spec from body

03-NOV-2003 FCC 4.4 :Moved the function fn_get_calc_method_for_swift declaration to spec from body

----------------------------------------------------------------------------------------------------
*/


--
-- FCC 4.4 DEC 2003 03-NOV-2003 Fast Settlement change starts :moved this declaration to spec from body
--
TYPE contract_struct IS RECORD (
      module                oltbs_contract.module_code%TYPE,
      product_type          oltbs_contract.product_type%TYPE,
      contract_ccy          oltbs_contract.contract_ccy%TYPE,
      customer              oltbs_contract.counterparty%TYPE,
      contract_ref_no		oltbs_contract.contract_ref_no%TYPE,
      user_ref_no			oltbs_contract.user_ref_no%TYPE,
      custom_ref_no			oltbs_contract.custom_ref_no%TYPE,
      external_ref_no		oltbs_contract.external_ref_no%TYPE,
      latest_event_seq_no	oltbs_contract.latest_event_seq_no%TYPE,
      curr_event_code		oltbs_contract.curr_event_code%TYPE,
      product_code			oltbs_contract.product_code%TYPE,
      booking_date          DATE,
      payment_method        oltbs_contract_master.payment_method%TYPE,
      current_version_no    oltbs_contract.latest_version_no%TYPE,
      contract_amount       oltbs_contract_master.amount%TYPE,
      value_date            DATE,
      maturity_type         oltbs_contract_master.maturity_type%TYPE,
      maturity_date         DATE,
      notice_days           oltbs_contract_master.notice_days%TYPE,
      primary_interest      oltbs_contract_master.main_comp%TYPE,
      --FCC 3.9 changes fro formatting OF 83J starts
      op_scope              oltbs_contract_master.op_scope%TYPE,
 ins_party_name VARCHAR2 (35),
      ins_party_bic         VARCHAR2 (35),
      ins_party_acct        VARCHAR2 (35),
      ins_party_addr1       VARCHAR2 (35),
      ins_party_addr2       VARCHAR2 (35),
      ins_party_city        VARCHAR2 (35),
      ins_party_clrg_code   VARCHAR2 (40),
 ben_party_name VARCHAR2 (35),
      ben_party_bic         VARCHAR2 (35),
      ben_party_acct        VARCHAR2 (35),
      ben_party_addr1       VARCHAR2 (35),
      ben_party_addr2       VARCHAR2 (35),
      ben_party_city        VARCHAR2 (35),
      ben_party_clrg_code   VARCHAR2 (40),
      ins_party_fedwire     VARCHAR2 (9),
      ins_party_chipuid     VARCHAR2 (6),
      ins_party_chapsc      VARCHAR2 (6),
      ben_party_fedwire     VARCHAR2 (9),
      ben_party_chipuid     VARCHAR2 (6),
      ben_party_chapsc      VARCHAR2 (6),
      no_of_tracers         NUMBER (4),
      tracer_required       VARCHAR2 (1),
      -- Vichu Start
      parent_contract_ref_no	VARCHAR2(16),
      parent_fcc_reference	VARCHAR2(16)
      -- Vichu Ends
   );
 --
 -- FCC 4.4 DEC 2003 03-NOV-2003 Fast Settlement change Ends
 --

FUNCTION fn_swift_compatibility_checks
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,	
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_get_list_of_messages
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_current_event		IN	oltbs_contract.curr_event_code%TYPE,
	p_list_of_messages	IN OUT	varchar2,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_generate_swift_message
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE
	)
	RETURN boolean;
   
--
-- FCC 4.4 DEC 2003 03-NOV-2003 Fast Settlement change starts
--
   FUNCTION fn_get_calc_method_for_swift (
      p_out_msg_record          IN       oltbs_dly_msg_out%ROWTYPE,
      cs                        IN       contract_struct,
      p_calc_method_for_swift   OUT      CHAR
   )
      RETURN BOOLEAN;   
--
-- FCC 4.4 DEC 2003 03-NOV-2003 Fast Settlement change ends
--
END olpks_ld_swift;
/
CREATE or replace SYNONYM olpkss_ld_swift FOR olpks_ld_swift
/