CREATE OR REPLACE PACKAGE olpks_init_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_init_custom.SPC
**
** Module		: Oracle Lending
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
   **SFR Number         :30020026
**Changed By         :Arvind Baskar
**Change Description :Hook for fn_init_ent
**Search String      :Bug#30020026
------------------------------------END CHANGE HISTORY-------------------------------------
*/



	FUNCTION fn_pre_fwd_init(
	pm_branch		IN	oltms_branch.branch_code%TYPE,
	pm_module		IN	oltbs_contract.module_code%TYPE,
	pm_proc_date	IN	DATE,
	pm_product		IN	oltms_product_master_ld.product%TYPE,
	pm_comt_freq	IN	oltbs_automatic_process_master.bod_commit_count%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	VARCHAR2
	)RETURN BOOLEAN ; 
	
	FUNCTION fn_post_fwd_init(
	pm_branch		IN	oltms_branch.branch_code%TYPE,
	pm_module		IN	oltbs_contract.module_code%TYPE,
	pm_proc_date	IN	DATE,
	pm_product		IN	oltms_product_master_ld.product%TYPE,
	pm_comt_freq	IN	oltbs_automatic_process_master.bod_commit_count%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	VARCHAR2
	)RETURN BOOLEAN ; 
--Bug#30020026
	FUNCTION fn_init_ent(
	pm_ldrec		IN 		oltbs_contract_master%ROWTYPE,
	pm_esn			IN 		oltbs_contract.latest_event_seq_no%TYPE,
	pm_mode			IN 		CHAR,
	pm_status		IN 		oltbs_contract.user_defined_status%TYPE,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	VARCHAR2,
	p_amt_tags		IN OUT	VARCHAR2,
	p_amts			IN OUT	VARCHAR2,
	p_ccys			IN OUT	VARCHAR2
	)RETURN BOOLEAN;
--Bug#30020026
END olpks_init_custom;
/


CREATE or replace SYNONYM olpkss_init_custom FOR olpks_init_custom
/