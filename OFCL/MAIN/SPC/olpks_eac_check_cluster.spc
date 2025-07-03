CREATE OR REPLACE PACKAGE olpks_eac_check_cluster AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_eac_check_cluster.SPC
  **
  ** Module   : OL
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright 2022 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.


  ----------------------------------------------------------------------------------------------------
  */
  /*
      Name            : olpks_eac_check_cluster
      Description     : Cluster package
      Author          : Aruna Rajendran
      Date Created    : 7/FEB/2022
	  Search String   : Bug#33830522

   CHANGE HISTORY:

-------------------------------------------------------------------------------------------------------*/
--Bug#33830522 starts

FUNCTION Fn_Log_Sync_EAC_Validate(p_Ref            IN VARCHAR2,
                                    p_Brn            IN VARCHAR2,
                                    p_settl_acc_list   IN olpks_eac_check.g_acc_gp_extsys,
									p_acc_ext_system      IN VARCHAR2,
                                    p_Batch          IN VARCHAR2,
                                    p_Err_Code       IN OUT VARCHAR2,
                                    p_Err_Params     IN OUT VARCHAR2,
									p_fn_call_id       IN OUT NUMBER,
									p_Tb_Cluster_data      IN OUT GLOBAL.TY_TB_CLUSTER_DATA)
			RETURN BOOLEAN;
--Bug#33830522 ends
END olpks_eac_check_cluster;
/
Create or replace synonym olpkss_eac_check_cluster for olpks_eac_check_cluster
/