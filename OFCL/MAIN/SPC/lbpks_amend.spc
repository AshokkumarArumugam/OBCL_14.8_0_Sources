CREATE OR REPLACE PACKAGE lbpks_amend IS
/*---------------------------------------------------------------------------------------
**
** File Name	: lbpks_amend.SQL
**
** Module	: LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------
*/
/*----------------------------------CHANGE HISTORY----------------------------------
DATE		VERSION NO	CODE		DESCRIPTION

------------------------------------END CHANGE HISTORY-------------------------------------
*/



TYPE ty_cont_rec IS RECORD
( ContractRefNo   oltbs_contract.CONTRACT_REF_NO%type);
 
TYPE ty_cont_tab IS TABLE of ty_cont_rec Index By Binary_Integer;

FUNCTION fn_participants_contract_amend
      (
	  p_borrower_contract_ref  IN oltbs_contract.CONTRACT_REF_NO%type,
	  p_latest_version_no      IN oltbs_contract.LATEST_VERSION_NO%type,
	  p_schedule_redefined     IN Varchar2,
	  p_schedule_changed       IN Varchar2,
	  p_participant_details_changed IN Varchar2,
        p_error_code             IN OUT   ERTBS_MSGS.ERR_CODE%type,
        p_error_param            IN OUT   Varchar2
      ) Return Boolean;

FUNCTION fn_note_amended_party_contract
	(
	 p_contract_ref_no	IN oltbs_contract.CONTRACT_REF_NO%type,
	 p_serial_no		IN Number
	) Return Boolean;

FUNCTION fn_check_contract_amended
	(
	 p_contract_ref_no	  IN oltbs_contract.CONTRACT_REF_NO%type,
     	 p_latest_version_no      IN oltbs_contract.LATEST_VERSION_NO%type,
	 p_schedule_redefined     IN Varchar2,
	 p_contract_amend_apply   OUT Varchar2,
	 p_error_code 		  OUT Varchar2
	) Return Boolean;	

FUNCTION fn_get_participant_share
	(
	   p_brw_contract_ref_no   IN oltbs_contract.contract_ref_no%type,
	   p_party_contract_ref_no IN oltbs_contract.contract_ref_no%type,
	   p_amount		    	   IN oltbs_contract_master.amount%type,
	   p_amount_ccy	    	   IN oltbs_contract_master.currency%type,
	   p_sharing_ratio  	   OUT oltbs_contract_party.participation%type,
	   p_particip_share 	   OUT oltbs_contract_master.amount%type,
	   p_error_code	    	   OUT Varchar2
	) Return Boolean;
	
end lbpks_amend;
/
create or replace synonym lbpkss_amend for lbpks_amend
/