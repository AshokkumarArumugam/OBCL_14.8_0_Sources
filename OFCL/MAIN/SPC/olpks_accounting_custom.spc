CREATE OR REPLACE PACKAGE olpks_accounting_custom AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_accounting_custom.spc
  **
  ** Module       : OL                        **
  **
  **This source is part of the Oracle Flexcube Corporate Lending  Software Product.   Copyright Â© 2016 ,
  Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  CHANGE HISTORY -----
        **Changed By         : Anub Mathew
  **Change Description : Hooks provided for  RABOCBT_12.2_31_JAN_2018_01_0000
  **Search String      : Bug#27514654 
  
  SFR		   : 30331198 
NAME	   : Arvind Baskar
Description: Provided Hook for fn_get_settlement_details
Search String: Bug#30331198 

**SFR		   : 30791823 
**NAME	       : Akhila Samson
**Description  : Provided Hook for fn_achandoff
**Search String: Bug#30791823 

  **Changed By         : Rashmi BV
  **Change Description : Provided Hook for fn_acservice
  **Search String      : Bug#34349896 
  
 **Changed By         : Sowmya Bitra
 **Date               : 01-Aug-2022
 **Change Description : Provided hook for fn_acfn_net
 **Search String      : Bug#34445796 

  */
  --Bug#27514654 starts
  FUNCTION fn_pre_achandoff1(ptrnrefno           IN oltbs_handoff.trn_ref_no%TYPE,
                         pcustomref          IN oltbs_handoff.custom_ref_no%TYPE,
                         peventseqno         IN oltbs_handoff.event_sr_no%TYPE,
                         pbranchdate         IN DATE,
                         phandoff            IN OUT NOCOPY olpks_accounting.tbl_achoff,
                         pactioncode         IN CHAR,
                         psuspense           IN CHAR,
                         pbalancing          IN CHAR,
                         puserid             IN CHAR,
                         p_defer_allowed     IN CHAR,
                         p_module_funcol_avl IN VARCHAR2,
                         perrcode            IN OUT NOCOPY VARCHAR2,
                         pparam              IN OUT NOCOPY VARCHAR2)
    RETURN BOOLEAN;
	 FUNCTION fn_post_achandoff1(ptrnrefno           IN oltbs_handoff.trn_ref_no%TYPE,
                         pcustomref          IN oltbs_handoff.custom_ref_no%TYPE,
                         peventseqno         IN oltbs_handoff.event_sr_no%TYPE,
                         pbranchdate         IN DATE,
                         phandoff            IN OUT NOCOPY olpks_accounting.tbl_achoff,
                         pactioncode         IN CHAR,
                         psuspense           IN CHAR,
                         pbalancing          IN CHAR,
                         puserid             IN CHAR,
                         p_defer_allowed     IN CHAR,
                         p_module_funcol_avl IN VARCHAR2,
                         perrcode            IN OUT NOCOPY VARCHAR2,
                         pparam              IN OUT NOCOPY VARCHAR2)
    RETURN BOOLEAN;
	FUNCTION fn_pre_acfn_lookup(pproduct IN oltms_product_event_acct_entry.product_code%TYPE,
                       pevent   IN oltms_product_event_acct_entry.event_code%TYPE,
                       pstatus  IN VARCHAR2,
                       ptrntype IN oltms_prod_trn_type.trn_type%TYPE,
                       plookup  IN OUT NOCOPY olpks_accounting.tbl_lookup,
                       perrcode IN OUT NOCOPY ertbs_msgs.err_code%TYPE)
	RETURN BOOLEAN; 
	
	FUNCTION fn_post_acfn_lookup(pproduct IN oltms_product_event_acct_entry.product_code%TYPE,
                       pevent   IN oltms_product_event_acct_entry.event_code%TYPE,
                       pstatus  IN VARCHAR2,
                       ptrntype IN oltms_prod_trn_type.trn_type%TYPE,
                       plookup  IN OUT NOCOPY olpks_accounting.tbl_lookup,
                       perrcode IN OUT NOCOPY ertbs_msgs.err_code%TYPE)
	RETURN BOOLEAN; 
--Bug#27514654 ends
	--Bug#30791823  Start
	FUNCTION fn_pre_achandoff(ptrnrefno       IN oltbs_handoff.trn_ref_no%TYPE,
                        pcustomref      IN oltbs_handoff.custom_ref_no%TYPE,
                        peventseqno     IN oltbs_handoff.event_sr_no%TYPE,
                        pbranchdate     IN DATE,
                        phandoff        IN OUT NOCOPY olpks_accounting.tbl_achoff,
                        pactioncode     IN CHAR,
                        psuspense       IN CHAR,
                        pbalancing      IN CHAR,
                        p_defer_allowed IN CHAR,
                        puserid         IN CHAR,
                        pdocombac       IN VARCHAR2,
                        perrcode        IN OUT NOCOPY VARCHAR2,
                        pparam          IN OUT NOCOPY VARCHAR2)
    RETURN BOOLEAN ;
	
	FUNCTION fn_post_achandoff(ptrnrefno       IN oltbs_handoff.trn_ref_no%TYPE,
                        pcustomref      IN oltbs_handoff.custom_ref_no%TYPE,
                        peventseqno     IN oltbs_handoff.event_sr_no%TYPE,
                        pbranchdate     IN DATE,
                        phandoff        IN OUT NOCOPY olpks_accounting.tbl_achoff,
                        pactioncode     IN CHAR,
                        psuspense       IN CHAR,
                        pbalancing      IN CHAR,
                        p_defer_allowed IN CHAR,
                        puserid         IN CHAR,
                        pdocombac       IN VARCHAR2,
                        perrcode        IN OUT NOCOPY VARCHAR2,
                        pparam          IN OUT NOCOPY VARCHAR2)
    RETURN BOOLEAN ;
	
	--Bug#30791823  End

	--Bug#34349896 start	
	FUNCTION fn_pre_acservice(Pbranch     IN Oltbs_Handoff.Ac_Branch%TYPE,
                        Pbranchdate IN DATE,
                        Plcy        IN Oltbs_Handoff.Ac_Ccy%TYPE,
                        Ptranrefno  IN Oltbs_Handoff.Trn_Ref_No%TYPE,
                        Peventseqno IN Oltbs_Handoff.Event_Sr_No%TYPE,
                        Pactioncode IN CHAR,
                        Puserid     IN Oltbs_Handoff.User_Id%TYPE,
                        Perrcode    IN OUT NOCOPY VARCHAR2,
                        Pparam      IN OUT NOCOPY VARCHAR2) 
    RETURN BOOLEAN ;
	
	FUNCTION fn_post_acservice(Pbranch     IN Oltbs_Handoff.Ac_Branch%TYPE,
                        Pbranchdate IN DATE,
                        Plcy        IN Oltbs_Handoff.Ac_Ccy%TYPE,
                        Ptranrefno  IN Oltbs_Handoff.Trn_Ref_No%TYPE,
                        Peventseqno IN Oltbs_Handoff.Event_Sr_No%TYPE,
                        Pactioncode IN CHAR,
                        Puserid     IN Oltbs_Handoff.User_Id%TYPE,
                        Perrcode    IN OUT NOCOPY VARCHAR2,
                        Pparam      IN OUT NOCOPY VARCHAR2) 
    RETURN BOOLEAN ;	
	--Bug#34349896 end
	
  --Bug#34445796 Changes Start	
  FUNCTION fn_pre_acfn_net(PTRNREFNO    IN OLTBS_HANDOFF.TRN_REF_NO%TYPE,                        
                           PEVENTSEQNO  IN OLTBS_HANDOFF.EVENT_SR_NO%TYPE,                        
                           PHANDOFF     IN OUT NOCOPY OLPKS_ACCOUNTING.TBL_ACHOFF,
                           PACTIONCODE  IN CHAR,                        
                           PUSERID      IN CHAR,                        
                           PERRCODE     IN OUT NOCOPY VARCHAR2,
                           PPARAM       IN OUT NOCOPY VARCHAR2) 
  RETURN BOOLEAN;
  
  FUNCTION fn_post_acfn_net(PTRNREFNO    IN OLTBS_HANDOFF.TRN_REF_NO%TYPE,                        
                           PEVENTSEQNO  IN OLTBS_HANDOFF.EVENT_SR_NO%TYPE,                        
                           PHANDOFF     IN OUT NOCOPY OLPKS_ACCOUNTING.TBL_ACHOFF,
                           PACTIONCODE  IN CHAR,                        
                           PUSERID      IN CHAR,                        
                           PERRCODE     IN OUT NOCOPY VARCHAR2,
                           PPARAM       IN OUT NOCOPY VARCHAR2) 
  RETURN BOOLEAN;
  --Bug#34445796 Changes End
	
END olpks_accounting_custom;
/
CREATE OR REPLACE synonym olpkss_accounting_custom for olpks_accounting_custom
/