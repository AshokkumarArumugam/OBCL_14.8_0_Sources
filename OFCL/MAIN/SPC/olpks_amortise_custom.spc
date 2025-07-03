CREATE OR REPLACE PACKAGE olpks_amortise_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_amortise_custom.SPC
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
    Changed By         : Gomathi G
    Changed On         : 22-JUN-2021
    Change Description : Provided hooks to Auto-Capitalisation for Amortised Loans.
    Search String      : OBCL_14.4_SUPPORT_BUG#33029926
------------------------------------END CHANGE HISTORY-------------------------------------
*/

	FUNCTION fn_pre_amort
			(
			p_action_code			IN 		VARCHAR2,
			p_ref_no				IN 		VARCHAR2,
			p_latest_ver_no 			IN 		NUMBER,
			p_principal				IN 		NUMBER,
			p_component				IN 		VARCHAR2,
			p_amort_meth			IN 		VARCHAR2,
			p_eff_date				IN 		DATE,
			p_proc_date				IN		DATE,
			p_holiday_chk_failed	IN	OUT		BOOLEAN,
			p_errmsg				IN OUT	VARCHAR2
			)
			RETURN BOOLEAN;
			
	FUNCTION fn_post_amort
			(
			p_action_code			IN 		VARCHAR2,
			p_ref_no				IN 		VARCHAR2,
			p_latest_ver_no 			IN 		NUMBER,
			p_principal				IN 		NUMBER,
			p_component				IN 		VARCHAR2,
			p_amort_meth			IN 		VARCHAR2,
			p_eff_date				IN 		DATE,
			p_proc_date				IN		DATE,
			p_holiday_chk_failed	IN	OUT		BOOLEAN,
                         p_errmsg             IN OUT VARCHAR2) RETURN BOOLEAN;
						 
  --OBCL_14.4_SUPPORT_BUG#33029926 changes starts     
  FUNCTION fn_pre_amort(p_action_code        IN VARCHAR2,
                        p_ref_no             IN VARCHAR2,
                        p_latest_ver_no      IN NUMBER,
                        p_principal          IN NUMBER,
                        p_component          IN VARCHAR2,
                        p_amort_meth         IN VARCHAR2,
                        p_eff_date           IN DATE,
                        p_proc_date          IN DATE,
                        h_tab                IN olpkss_recompute_schedules.tab_ty_comput,
                        p_vamb_esn           IN oltbs_contract_event_log.event_seq_no%TYPE,
                        p_holiday_chk_failed OUT BOOLEAN,
                        p_errmsg             IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_amort(p_action_code        IN VARCHAR2,
                    p_ref_no             IN VARCHAR2,
                    p_latest_ver_no      IN NUMBER,
                    p_principal          IN NUMBER,
                    p_component          IN VARCHAR2,
                    p_amort_meth         IN VARCHAR2,
                    p_eff_date           IN DATE,
                    p_proc_date          IN DATE,
                    h_tab                IN olpkss_recompute_schedules.tab_ty_comput,
                    p_vamb_esn           IN oltbs_contract_event_log.event_seq_no%TYPE,
                    p_holiday_chk_failed OUT BOOLEAN,
                    p_errmsg             IN OUT VARCHAR2,
                    p_fn_call_id         IN OUT NUMBER,
                    p_Tb_Custom_data     IN OUT GLOBAL.Ty_Tb_Custom_Data)
    RETURN BOOLEAN;

  FUNCTION fn_post_amort(p_action_code        IN VARCHAR2,
                         p_ref_no             IN VARCHAR2,
                         p_latest_ver_no      IN NUMBER,
                         p_principal          IN NUMBER,
                         p_component          IN VARCHAR2,
                         p_amort_meth         IN VARCHAR2,
                         p_eff_date           IN DATE,
                         p_proc_date          IN DATE,
                         h_tab                IN olpkss_recompute_schedules.tab_ty_comput,
                         p_vamb_esn           IN oltbs_contract_event_log.event_seq_no%TYPE,
                         p_holiday_chk_failed OUT BOOLEAN,
                         p_errmsg             IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.4_SUPPORT_BUG#33029926 changes ends 
END olpks_amortise_custom;
/


CREATE or replace SYNONYM olpkss_amortise_custom FOR olpks_amortise_custom
/