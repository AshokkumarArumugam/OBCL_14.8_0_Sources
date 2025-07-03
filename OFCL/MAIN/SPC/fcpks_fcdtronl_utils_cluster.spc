create or replace package FCPKS_FCDTRONL_UTILS_CLUSTER is
/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : fcpks_fcdtronl_utils_cluster.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright Â© 2018.  All rights reserved
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

  SFR Number         :
  Created By         :  Vineeth T M
  Change Description :

  **  Changed By         :
  **  Changed On         :
  **  Change Description :
  **  Search String      :
  
  Changed By         : Vineeth T M
	Changed On         : 14-Aug-2020
	Search String      : bug#31671272 changes
	Change Reason      : BCIE :: Multi Holiday CCY support in LB :: Hooks
  -------------------------------------------------------------------------------------------------------
  */

  --bug#31671272 changes begins
    Function Fn_Pre_Get_Ccy_Holiday_List(p_Wrk_Fcdtronl    IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl
                                     ,p_Validation_Type In Char
                                     ,p_Ccy_List in Out Varchar2
                                     ,p_Fn_Call_Id in out Number
                                     ,p_Tb_Cluster_Data in out Global.Ty_Tb_Cluster_Data
                                     ,p_Error_Code in Out Varchar2)
     RETURN BOOLEAN;
   Function Fn_Post_Get_Ccy_Holiday_List(p_Wrk_Fcdtronl    IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl
                                     ,p_Validation_Type In Char
                                     ,p_Ccy_List in Out Varchar2
                                     ,p_Fn_Call_Id in out Number
                                     ,p_Tb_Cluster_Data in out Global.Ty_Tb_Cluster_Data
                                     ,p_Error_Code in Out Varchar2)
    RETURN BOOLEAN;
	--bug#31671272 changes ends

end FCPKS_FCDTRONL_UTILS_CLUSTER;
/
CREATE OR REPLACE Synonym FCPKSS_FCDTRONL_UTILS_CLUSTER FOR FCPKS_FCDTRONL_UTILS_CLUSTER
/