create or replace package olpks_stmt_cluster is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_stmt_cluster.spc
  **
  ** Module   : OL
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright © 2021 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
	
  **Changed By         : Chandra Achuta
  **Date               : 17-MAR-2022
  **Change Description : Hook request for narratives case.
  **Search String      : Bug#33613314 

  **Changed By         : Vineeth T M
  **Date               : 07-MAR-2023
  **Change Description : Enabling NARRATIVES for LS
  **Search String      : OBCL_14.6_BUG#35087721 CHANGES\

  **  Modified By        : Dinesh VB
  **  Modified On        : 02-Aug-2023
  **  Modified Reason    : Barclays COE-PS3 - FCUBS107- Narration Changes
  **  Search String      : Barclays COE-PS3 - FCUBS107- Narration Changes
  
  **Changed By         : Vineeth T M
  **Date               : 03-AUG-2023
  **Change Description : Enabling NARRATIVES for SLT
  **Search String      : OBCL_14.7_BUG#35671776 CHANGES   
  ----------------------------------------------------------------------------------------------------
  */
		
  FUNCTION fn_pre_Populate_acst_info(pmodule          IN VARCHAR2,
                                     p_cont_ref_no    IN VARCHAR2,
                                     pVersionNo       IN OLTB_CONTRACT_MASTER.VERSION_NO%TYPE,
                                     p_event_seq_no   IN NUMBER,
                                     p_event_code     IN VARCHAR2,
                                     plang            IN VARCHAR2,
                                     patag            IN olvws_all_ac_entries.amount_tag%TYPE,
                                     pcontractinfo    IN OUT oltbs_contract_info%ROWTYPE,
                                     p_ac_entry_sr_no IN olvws_all_ac_entries.ac_entry_sr_no%TYPE,
                                     pContractInfoString IN OUT VARCHAR2
									 --Barclays COE-PS3 - FCUBS107- Narration Changes STARTS
								    ,pvaldt			 IN olvws_all_ac_entries.VALUE_DT%TYPE DEFAULT NULL,
								     plcyamt			 IN olvws_all_ac_entries.lcy_amount%TYPE DEFAULT NULL
								     --Barclays COE-PS3 - FCUBS107- Narration Changes ENDS
									 )
   RETURN BOOLEAN;	

  FUNCTION fn_post_Populate_acst_info(pmodule          IN VARCHAR2,
                                      p_cont_ref_no    IN VARCHAR2,
                                      pVersionNo       IN OLTB_CONTRACT_MASTER.VERSION_NO%TYPE,
                                      p_event_seq_no   IN NUMBER,
                                      p_event_code     IN VARCHAR2,
                                      plang            IN VARCHAR2,
                                      patag            IN olvws_all_ac_entries.amount_tag%TYPE,
                                      pcontractinfo    IN OUT oltbs_contract_info%ROWTYPE,
                                      p_ac_entry_sr_no IN olvws_all_ac_entries.ac_entry_sr_no%TYPE,
                                      pContractInfoString IN OUT VARCHAR2
									  --Barclays COE-PS3 - FCUBS107- Narration Changes STARTS
								     ,pvaldt			 IN olvws_all_ac_entries.VALUE_DT%TYPE DEFAULT NULL,
								      plcyamt			 IN olvws_all_ac_entries.lcy_amount%TYPE DEFAULT NULL
								     --Barclays COE-PS3 - FCUBS107- Narration Changes ENDS
									  ) 
   RETURN BOOLEAN;   
  
   --OBCL_14.6_BUG#35087721 CHANGES start
   FUNCTION fn_pre_Populate_acst_info_each(pmodule          IN VARCHAR2,
                                 p_cont_ref_no    IN VARCHAR2,
                                 p_event_seq_no   IN NUMBER,
                                 p_event_code     IN VARCHAR2,
                                 plang            IN VARCHAR2,
                                 pcontractinfo    IN OUT oltbs_contract_info%ROWTYPE,
                                 pContractInfoString in OUT VARCHAR2,
                                 p_acvws_stmt_cols in olvws_stmt_cols%ROWTYPE,
                                 p_coll in out oltbs_contract_info.COL1%TYPE,
                                 pcontract in oltbs_contract_master%ROWTYPE,
                                 p_chargedescs in olpks_stmt.ty_coll,
                                 p_charges in olpks_stmt.ty_coll,
                                 p_taxdescs in olpks_stmt.ty_coll,
                                 p_taxes in olpks_stmt.ty_coll,
                                 patag            IN olvws_all_ac_entries.amount_tag%TYPE,
                                 p_ac_entry_sr_no IN olvws_all_ac_entries.ac_entry_sr_no%TYPE,
                                 p_borr_ref_no IN lptbs_contract_master.BORROWER_CONTRACT_REF_NO%TYPE,
                                 p_tl_info     in olpkss_stmt.ty_tl_info --OBCL_14.7_BUG#35671776 CHANGES
								 --Barclays COE-PS3 - FCUBS107- Narration Changes STARTS
								 ,pvaldt			 IN olvws_all_ac_entries.VALUE_DT%TYPE DEFAULT NULL,
								 plcyamt			 IN olvws_all_ac_entries.lcy_amount%TYPE DEFAULT NULL
								 --Barclays COE-PS3 - FCUBS107- Narration Changes ENDS
								 )
   RETURN BOOLEAN;
   
   FUNCTION fn_post_Populate_acst_info_each(pmodule          IN VARCHAR2,
                                 p_cont_ref_no    IN VARCHAR2,
                                 p_event_seq_no   IN NUMBER,
                                 p_event_code     IN VARCHAR2,
                                 plang            IN VARCHAR2,
                                 pcontractinfo    IN OUT oltbs_contract_info%ROWTYPE,
                                 pContractInfoString in OUT VARCHAR2,
                                 p_acvws_stmt_cols in olvws_stmt_cols%ROWTYPE,
                                 p_coll in out oltbs_contract_info.COL1%TYPE,
                                 pcontract in oltbs_contract_master%ROWTYPE,
                                 p_chargedescs in olpks_stmt.ty_coll,
                                 p_charges in olpks_stmt.ty_coll,
                                 p_taxdescs in olpks_stmt.ty_coll,
                                 p_taxes in olpks_stmt.ty_coll,
                                 patag            IN olvws_all_ac_entries.amount_tag%TYPE,
                                 p_ac_entry_sr_no IN olvws_all_ac_entries.ac_entry_sr_no%TYPE,
                                 p_borr_ref_no IN lptbs_contract_master.BORROWER_CONTRACT_REF_NO%TYPE,
                                 p_tl_info     in olpkss_stmt.ty_tl_info --OBCL_14.7_BUG#35671776 CHANGES
								 --Barclays COE-PS3 - FCUBS107- Narration Changes STARTS
								 ,pvaldt			 IN olvws_all_ac_entries.VALUE_DT%TYPE DEFAULT NULL,
								 plcyamt			 IN olvws_all_ac_entries.lcy_amount%TYPE DEFAULT NULL
								 --Barclays COE-PS3 - FCUBS107- Narration Changes ENDS
								 )
   RETURN BOOLEAN;
   --OBCL_14.6_BUG#35087721 CHANGES end

end olpks_stmt_cluster;
/
create or replace synonym olpkss_stmt_cluster for olpks_stmt_cluster
/