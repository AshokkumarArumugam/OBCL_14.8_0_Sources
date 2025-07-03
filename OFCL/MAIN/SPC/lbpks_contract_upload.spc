CREATE OR REPLACE PACKAGE lbpks_contract_upload
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_contract_upload.SPC
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
/* CHANGE HISTORY
22-MAR-2006 FLEXCUBE V.CL Release 7.0 Rollover Changes by Sambhaji
            Function declaration for fn_insert_part_upload, fn_insert_borr_upload, fn_subsystem_upload
            added and fn_populate_upload_tables, fn_upload_split_contracts, fn_clear_linkages, fn_delete_upload,
            fn_authorise_upload, fn_participant_upload


13-JUL-2006 FCC V.CL RELEASE 7.1 LS Participant call AND FUNCTION CALL commented by svs on 13-JUL-2006.
18-JUL-2007	FCC V.CL Release 7.3 Rollover changes
26-SEP-2011 FLEXCUBE V.CL Release 7.7.1 and 7.7.2 EURCITIPLC-LS#11429 changes, New function introduced to default contract UDF.
13-OCT-2011 Flexcube V.CL Release 7.10 FS Vol1 Tag 03 changes, Tax with-holding waiver based on borrower/participant country
	    Changes to have a common function for Country based Tax with-holding, included fn_default_tax here.
02-AUG-2012 Flexcube V.CL Release 7.11,Retro,CITIBLR#35099 Changes: Tax with-holding Waiver flag defaulting logic applied for new participant(s) added during PRAM.
----------------------------------------------------------------------------------------------------
  
  Changed By         : Sudharshini Balaji
  Changed On         : 10-Apr-2023
  Change Description : Proper error message is not displayed during Split Rollover
                       (added p_error_code and p_error_param to propagate Error code to kernel)
  Search String      : Bug#35168399

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

--FCC V.CL Release 7.3 Rollover changes STARTS
FUNCTION fn_update_parent_status
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
--FCC V.CL Release 7.3 Rollover changes ENDS

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

--FLEXCUBE V.CL Release 7.0 Rollover Changes by Sambhaji start
FUNCTION fn_subsystem_upload
   			(p_roll_rec IN oltbs_contract_rollover%rowtype
   			,p_split_no IN oltbs_contract_split_rollover.split_no%type
   			,p_roll_method IN oltbs_contract_master.rollover_method%type)
RETURN BOOLEAN;
   
FUNCTION fn_insert_part_upload(p_old_ref_no IN oltbs_contract.contract_ref_no%TYPE,
			       p_cube_ref_no IN oltbs_contract.contract_ref_no%TYPE,                               
                               p_master_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                               p_roll_method IN oltbs_contract_master.rollover_method%TYPE,
                               p_auth_status IN oltbs_contract.auth_status%TYPE,
                               p_drawdown_no IN oltbs_contract_master.drawdown_no%TYPE
                               ,p_error_code			 IN OUT	VARCHAR2,--$$Bug#35168399 
		                           p_error_param		 IN OUT	VARCHAR2 --$$ Bug#35168399 
                              )
RETURN BOOLEAN;
      
FUNCTION fn_insert_borr_upload(p_old_ref_no IN oltbs_contract.contract_ref_no%TYPE,
			       p_cube_ref_no IN oltbs_contract.contract_ref_no%TYPE,
			       p_drawdown_no IN oltbs_contract_master.drawdown_no%TYPE
                              )
RETURN BOOLEAN;
   
--FLEXCUBE V.CL Release 7.0 Rollover Changes by Sambhaji end  

--26-SEP-2011 FLEXCUBE V.CL Release 7.7.1 and 7.7.2 EURCITIPLC-LS#11429 changes,start
FUNCTION fn_default_contractudf(
				p_parent_contract_ref_no IN VARCHAR2,
				p_child_contract_ref_no IN VARCHAR2,
				p_old_version_no IN NUMBER,
				p_new_version_no IN NUMBER,
				p_field_name IN VARCHAR2,
				p_err IN OUT VARCHAR2,
				p_err_params IN OUT VARCHAR2
   				)
RETURN BOOLEAN;   			
--26-SEP-2011 FLEXCUBE V.CL Release 7.7.1 and 7.7.2 EURCITIPLC-LS#11429 changes, end


gRollCont	    VARCHAR2(1)  := 'N';

-- 13-OCT-2011 Flexcube V.CL Release 7.10 FS Vol1 Tag 03changes, starts
FUNCTION fn_default_tax (
			p_contract_ref_no IN		VARCHAR2,
			p_participant     IN		VARCHAR2, -- 02-AUG-2012 Flexcube V.CL Release 7.11,Retro,CITIBLR#35099 Changes
			p_tax_rule        IN		VARCHAR2, -- 02-AUG-2012 Flexcube V.CL Release 7.11,Retro,CITIBLR#35099 Changes
			p_version_no      IN		VARCHAR2, -- 02-AUG-2012 Flexcube V.CL Release 7.11,Retro,CITIBLR#35099 Changes
			p_contract_type	  IN		VARCHAR2,
			p_drawdown_no     IN 		NUMBER,
			p_err 		  IN OUT	VARCHAR2,
			p_err_params	  IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

-- 13-OCT-2011 Flexcube V.CL Release 7.10 FS Vol1 Tag 03 changes, ends
----14.1_SUP_EL_BLOCK_REF_CHANGES start 
function fn_roll_upload_acc_colletral_link(psourcecode     IN OLTBS_UPLOAD_ACC_COLL_LINK_DTL.source_code%TYPE,
                              pextrefno         IN  oltbs_upload_master.ext_contract_ref_no%TYPE,
                              pcontractrefno    in  oltbs_upload_master.ext_contract_ref_no%TYPE,
                              pversionnumber     IN  oltbs_contract.latest_version_no%TYPE,
                              p_BRANCH_CODE      IN LBTB_ACC_COLL_LINK_DTL.BRANCH_CODE%type
  )
  RETURN BOOLEAN; 
  ----14.1_SUP_EL_BLOCK_REF_CHANGES end 




END lbpks_contract_upload;
/
CREATE or replace SYNONYM lbpkss_contract_upload FOR lbpks_contract_upload
/