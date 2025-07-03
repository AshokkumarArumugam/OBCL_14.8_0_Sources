create or replace package LFPKS_UPLOAD_CLUSTER AS

   /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : LFPKS_UPLOAD_CLUSTER.spc
  **
  ** Module     : Syndication Loans and Commitments
  ** 
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
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
  
    Date               : 08-Sep-2020
    Changed By         : Vineeth T M
    Change Description : HOOK REQUEST :: STP ENHANCEMENTS IN LB FOR CUSTOM ICCF FIELDS(forward port)
    Search String      : bug#31825343 Changes
  
  -------------------------------------------------------------------------------------------------------
  */
  --bug#31825343 Changes starts
FUNCTION FN_PRE_UPLOAD_INTEREST(P_MODULE_CODE     IN OLTBS_CONTRACT.MODULE_CODE%TYPE,
                              P_PRODUCT         IN OLTBS_CONTRACT.PRODUCT_CODE%TYPE,
                              P_CONTRACT_REF_NO IN OLTBS_CONTRACT.CONTRACT_REF_NO%TYPE,
                              TB_INTEREST       IN LFPKS_UPLOAD.TBL_INTEREST_TYPE,
                              P_ERROR_CODE      IN OUT VARCHAR2,
                              P_ERROR_PARAMETER IN OUT VARCHAR2,
                              l_fn_call_id      in out number,
                              l_Tb_Cluster_Data  IN OUT  global.Ty_Tb_Cluster_Data)
                              
RETURN BOOLEAN;

FUNCTION FN_POST_UPLOAD_INTEREST(P_MODULE_CODE     IN OLTBS_CONTRACT.MODULE_CODE%TYPE,
                              P_PRODUCT         IN OLTBS_CONTRACT.PRODUCT_CODE%TYPE,
                              P_CONTRACT_REF_NO IN OLTBS_CONTRACT.CONTRACT_REF_NO%TYPE,
                              TB_INTEREST       IN LFPKS_UPLOAD.TBL_INTEREST_TYPE,
                              P_ERROR_CODE      IN OUT VARCHAR2,
                              P_ERROR_PARAMETER IN OUT VARCHAR2,
                              l_fn_call_id      in out number,
                              l_Tb_Cluster_Data  IN OUT  global.Ty_Tb_Cluster_Data)
                              
RETURN BOOLEAN;
--bug#31825343 Changes Changes ends

end LFPKS_UPLOAD_CLUSTER;
/
CREATE OR REPLACE Synonym LFPKSS_UPLOAD_CLUSTER FOR LFPKS_UPLOAD_CLUSTER
/