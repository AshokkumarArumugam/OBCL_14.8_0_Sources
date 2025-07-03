CREATE OR REPLACE PACKAGE olpks_cusip_reclass IS
/*-------------------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_cusip_reclass.spc
  **
  ** Module       : LD
  **
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
CHANGE HISTORY
30-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03,Cusip Swing changes, Created new package for Cusip reclass functionality
*/


TYPE P_REC_UPL_ERROR_LOG IS TABLE OF OLTB_CUSIP_RECLASS_EXCP_LOG%ROWTYPE INDEX BY BINARY_INTEGER;
RECLASS_UPL_ERROR_LOG P_REC_UPL_ERROR_LOG;

FUNCTION fn_reclass_master_lock
		(
		p_contract_ref_no	IN	oltbs_cusip_reclass_master.contract_ref_no%TYPE	
		,p_serial_number 	IN	oltbs_cusip_reclass_master.serial_number%TYPE
		,p_error_code		IN OUT	VARCHAR2
		,p_error_param		IN OUT  VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_process_contract
	(
	p_contract_ref_no		IN 	oltbs_contract.contract_ref_no%TYPE
	,p_serial_number 		IN  	oltbs_cusip_reclass_detail.serial_number%TYPE
	,p_current_cusip_no		IN 	oltbs_cusip_reclass_detail.current_cusip_no%TYPE	
	,p_new_cusip_no			IN 	oltbs_cusip_reclass_detail.new_cusip_no%TYPE	
	,p_processing_date		IN	DATE
	,p_branch			IN	oltbs_contract.branch%TYPE	
	,p_error_code			IN OUT 	VARCHAR2
	,p_error_param			IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_cusip_reclass_processing
              (
                p_branch      		IN	oltbs_contract.branch%TYPE   		
                ,p_seq_no      		IN	NUMBER
                ,p_processing_date  	IN	DATE
                ,p_error_code    	IN OUT 	VARCHAR2
                ,p_error_param    	IN OUT 	VARCHAR2
                ,p_contract_ref_no   	IN  	oltbs_cusip_reclass_master.contract_ref_no%TYPE DEFAULT '%'
              )
RETURN BOOLEAN;

PROCEDURE pr_cusip_reclass_job
                  (
                    p_branch  	IN   	oltbs_contract.branch%TYPE                    
                    ,p_seq_no  	IN 	NUMBER
                  );
FUNCTION fn_populate_contract_details (
					 p_ref_no        IN  oltbs_contract.contract_ref_no%TYPE
					,p_serial_number IN  oltbs_cusip_reclass_master.serial_number%TYPE
					,p_curr_cusip_no IN  oltbs_cusip_reclass_master.current_cusip_no%TYPE
					,p_new_cusip_no  IN  oltbs_cusip_reclass_master.new_cusip_no%TYPE
					,p_module        IN  oltbs_contract.module_code%TYPE
					,p_error_code    IN  OUT VARCHAR2
					,p_error_param   IN  OUT VARCHAR2
                                      )
RETURN BOOLEAN;

FUNCTION fn_populate_balance_details(
					p_ref_no   		IN 	oltbs_contract.contract_ref_no%TYPE,
					p_curr_cusip_no  	IN  	oltbs_cusip_reclass_master.current_cusip_no%TYPE,
					p_new_cusip_no   	IN  	oltbs_cusip_reclass_master.new_cusip_no%TYPE,
					p_serial_number		IN	oltbs_cusip_reclass_master.serial_number%TYPE,
					p_module   		IN   	oltbs_contract.module_code%TYPE,
					p_error_code		IN OUT 	VARCHAR2,
					p_error_param   	IN OUT 	VARCHAR2
				    )
RETURN BOOLEAN;	

FUNCTION fn_block_payment_reversal
				(
				  p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE
				)
RETURN VARCHAR2;
FUNCTION fn_get_reclass_batch_no
		 		(
		 		 p_branch		IN	oltbs_contract.branch%TYPE
		 		,p_batch_no		OUT 	NUMBER
		 		,p_error_code		IN OUT 	VARCHAR2
		 		,p_error_param  	IN OUT 	VARCHAR2
				)
RETURN BOOLEAN;
END olpks_cusip_reclass;
/
CREATE OR REPLACE SYNONYM olpkss_cusip_reclass FOR olpks_cusip_reclass
/