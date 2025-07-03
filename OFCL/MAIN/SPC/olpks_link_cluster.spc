CREATE OR REPLACE PACKAGE olpks_link_cluster AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_link_cluster.SPC
**
** Module		: LOANS AND DEPOSITS
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
**SFR Number         :
**Changed By         :
**Change Description :
**Search String      :

  **Changed By         : Chandra Achuta
  **Date               : 02-JUN-2022
  **Change Description : Hook request for error code skip case.
  **Search String      : Bug#34224604
------------------------------------END CHANGE HISTORY-------------------------------------
*/

FUNCTION fn_update_linkages(pm_branch      IN oltbs_contract.branch%TYPE,
                              pm_reference   IN oltbs_contract.contract_ref_no%TYPE,
                              pm_version     IN oltbs_contract.latest_version_no%TYPE,
                              pm_cont_esn    IN oltbs_contract.latest_event_seq_no%TYPE,
                              pm_linked_ref  IN oltbs_contract_linkages.linked_to_ref%TYPE,
                              pm_linked_esn  IN oltbs_contract.latest_event_seq_no%TYPE,
                              pm_link_type   IN oltbs_contract_linkages.linkage_type%TYPE,
                              pm_amount      IN oltbs_contract_master.amount%TYPE,
                              pm_conv_amt    IN oltbs_contract_master.amount%TYPE,
                              pm_upd_con_tbl IN CHAR,
                              pm_amt_blk_no  IN oltbs_contract_linkages.amount_block_number%TYPE,
                              pm_vd 		 IN DATE,
                              pm_event       IN CHAR,
                              pm_err_code    IN OUT ertbs_msgs.err_code%TYPE,
                              pm_params      IN OUT VARCHAR2,
							  p_supress_elcm VARCHAR2 DEFAULT 'N',
							  p_fn_call_id	 IN NUMBER,
							  p_tb_custom_data IN OUT Global.ty_tb_custom_data) RETURN BOOLEAN;
  --Bug#34224604	Changes Starts					  
  FUNCTION fn_link_during_exrate_amend(pm_reference      IN oltbs_contract.contract_ref_no%TYPE,
                                       pm_batch_online   IN VARCHAR2,
                                       pm_err_code       IN OUT ertbs_msgs.err_code%TYPE,
                                       pm_params         IN OUT VARCHAR2,
                                       p_fn_call_id      IN OUT NUMBER,
                                       p_tb_cluster_data IN OUT GLOBAL.Ty_Tb_cluster_Data)
    RETURN BOOLEAN;
   --Bug#34224604	Changes Ends				  


END olpks_link_cluster;
/


CREATE or replace SYNONYM olpkss_link_cluster FOR olpks_link_cluster
/