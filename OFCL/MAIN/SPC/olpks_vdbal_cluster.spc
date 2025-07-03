create or replace package olpks_vdbal_cluster is
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_vdbal_cluster.spc
    **
    ** Module     : Loans and Deposits
    **
    ** This source is part of the Oracle FLEXCUBE Software Product.
    ** Copyright (R) 2008,2022 , Oracle and/or its affiliates.  All rights reserved
    **
    **
    ** No part of this work may be reproduced, stored in a retrieval system, adopted
    ** or transmitted in any form or by any means, electronic, mechanical,
    ** photographic, graphic, optic recording or otherwise, translated in any
    ** language or computer language, without the prior written permission of
    ** Oracle and/or its affiliates.
    **
    ** Oracle Financial Services Software Limited.
    ** Oracle Park, Off Western Express Highway,
    ** Goregaon (East),
    ** Mumbai - 400 063, India
    ** India
    -------------------------------------------------------------------------------------------------------
    CHANGE HISTORY
  
  **Changed By         : Chandra Achuta
  **Date               : 31-MAY-2022
  **Change Description : Hook request for error code skip case.
  **Search String      : Bug#34224604
  ----------------------------------------------------------------------------------------------------------
  */
  FUNCTION fn_build_vdbal_for_commitment(p_contract_ref_no IN VARCHAR2,
                                         p_event_code      IN VARCHAR2,
                                         p_value_date      IN DATE,
                                         p_error_code      OUT VARCHAR2,
                                         p_fn_call_id      IN OUT NUMBER,
                                         p_tb_cluster_data IN OUT GLOBAL.Ty_Tb_cluster_Data)
    RETURN BOOLEAN;

  FUNCTION fn_build_vdbal_for_loan(p_contract_ref_no IN VARCHAR2,
                                   p_event_code      IN VARCHAR2,
                                   p_value_date      IN DATE,
                                   p_error_code      OUT VARCHAR2,
                                   p_fn_call_id      IN OUT NUMBER,
                                   p_tb_cluster_data IN OUT GLOBAL.Ty_Tb_cluster_Data)
    RETURN BOOLEAN;

end olpks_vdbal_cluster;
/
create or replace synonym olpkss_vdbal_cluster for olpks_vdbal_cluster
/