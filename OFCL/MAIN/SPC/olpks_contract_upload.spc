CREATE OR REPLACE PACKAGE olpks_contract_upload
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_contract_upload.SPC
**
** Module		: LOANS AND DEPOSITS
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



/*--------------------------------------CHANGE HISTORY------------------------------------------------------

13-JUL-2006 FCC V.CL RELEASE 7.1 LS Participant call AND FUNCTION CALL commented by svs on 13-JUL-2006.

----------------------------------------END CHANGE HISTORY--------------------------------------------------
*/ 

FUNCTION fn_populate_upload_tables	
		(
		  p_old_ref_no  		 IN 	oltbs_contract_master.contract_ref_no%TYPE,
		  p_processing_date 	 IN		DATE,
		  p_auth_status			 IN		oltbs_contract.auth_status%TYPE,
		  cs					 IN	    olpkss_rollover.contract_struct,
		  amt 					 IN		olpkss_rollover.amount_struct,
		  p_new_maturity_date	 IN 	DATE,
		  p_current_event_seq_no IN 	oltbs_contract.latest_event_seq_no%TYPE,
		  p_split_no			 IN     oltbs_contract_roll_int_rates.split_no%TYPE,
		  p_error_code			 IN OUT	VARCHAR2,
		  p_error_parameter		 IN OUT	VARCHAR2
		)
RETURN BOOLEAN;


FUNCTION fn_upload_split_contracts
 		(
 		  p_contract_ref_no  	 IN     oltbs_contract_master.contract_ref_no%TYPE,
 		  p_processing_date 	 IN		DATE,
 		  p_auth_status			 IN		oltbs_contract.auth_status%TYPE,
 		  cs					 IN OUT	olpkss_rollover.contract_struct,
		  amt 					 IN	OUT	olpkss_rollover.amount_struct,
 		  p_current_event_seq_no IN 	oltbs_contract.latest_event_seq_no%TYPE,
 		  p_error_code			 IN OUT	VARCHAR2,
		  p_error_parameter		 IN OUT	VARCHAR2
		) 
		
RETURN BOOLEAN;


FUNCTION fn_clear_linkages
	    (
	 	  p_old_ref_no 		     IN 	oltbs_contract.contract_ref_no%TYPE,
		  p_version_no		     IN     oltbs_contract_master.version_no%TYPE,
	 	  p_event_seq_no		 IN 	oltbs_contract_master.event_seq_no%TYPE,
		  p_processing_date	     IN 	DATE,
	  	  p_auth_status		     IN     oltbs_contract.auth_status%TYPE,
		  p_error_code		     IN OUT VARCHAR2,
	  	  p_error_parameter      IN OUT VARCHAR2
	    ) 
RETURN BOOLEAN;


FUNCTION fn_delete_upload
 	    (
 		  p_contract_ref_no  	 IN     oltbs_contract_master.contract_ref_no%TYPE,
 		  p_roll_method			 IN     CHAR,
		  p_error_code			 IN OUT	VARCHAR2,
		  p_error_param			 IN OUT	VARCHAR2
		)
RETURN BOOLEAN;


FUNCTION fn_authorise_upload
 		(
 		  p_contract_ref_no  	 IN     oltbs_contract_master.contract_ref_no%TYPE,
 		  p_roll_method			 IN     CHAR,
		  p_error_code			 IN OUT	VARCHAR2,
		  p_error_param			 IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

	--
	-- FCC V.CL RELEASE 7.1 LS Participant call AND FUNCTION CALL commented by svs on 13-JUL-2006. 
	--
/*
FUNCTION fn_participant_upload
		( 
		  p_cube_ref_no  		 IN  	oltbs_contract.contract_ref_no%TYPE,
		  p_drawdown_no	 		 IN  	oltbs_contract_master.drawdown_no%TYPE,
		  p_auth_status		 	 IN     oltbs_contract.auth_status%TYPE,
		  p_error_code   		 IN OUT VARCHAR2,
		  p_error_parameter 	 IN OUT VARCHAR2
		)  
RETURN BOOLEAN; 
*/
	--
	-- FCC V.CL RELEASE 7.1 LS Participant call AND FUNCTION CALL commented by svs on 13-JUL-2006. 
	--

gRollCont	    VARCHAR2(1)  := 'N';	

END olpks_contract_upload;
/
CREATE or replace SYNONYM olpkss_contract_upload FOR olpks_contract_upload
/