create or replace package olpks_vd_sch_custom is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_vd_sch_custom.spc
  **
  ** Module   : OL
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
	
    Created by      : Gomathi G
	Created on      : 13-FEB-2020
	Description     : Hooks for Creation Of Commitments with various tranches with different usage deadlines 
	Search string   : OBCL_14.3_SUPPORT_BUG#30881375
  ----------------------------------------------------------------------------------------------------
  */ 

FUNCTION fn_pre_princ(p_ref_no           IN VARCHAR2,
                    p_component      IN oltbs_contract_iccf_calc.component%TYPE,
                    p_comput_handoff IN oltbs_computation_handoff%ROWTYPE,
                    p_error_code     IN OUT VARCHAR2) 
					RETURN BOOLEAN; 
					
FUNCTION fn_princ(p_ref_no         IN VARCHAR2,
                    p_component      IN oltbs_contract_iccf_calc.component%TYPE,
                    p_comput_handoff IN oltbs_computation_handoff%ROWTYPE,
                    p_error_code     IN OUT VARCHAR2) 
					RETURN BOOLEAN;
					
FUNCTION fn_post_princ(p_ref_no           IN VARCHAR2,
                    p_component      IN oltbs_contract_iccf_calc.component%TYPE,
                    p_comput_handoff IN oltbs_computation_handoff%ROWTYPE,
                    p_error_code     IN OUT VARCHAR2) 
					RETURN BOOLEAN;
					
end olpks_vd_sch_custom;
/
create or replace synonym olpkss_vd_sch_custom for olpks_vd_sch_custom
/