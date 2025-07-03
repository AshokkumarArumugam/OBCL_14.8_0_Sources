CREATE OR REPLACE PACKAGE olpks_oldifpmt_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldifpmt_utils.sql
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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
  Created by        :
  Created Date      :
  Description       :
  -------------------------------------------------------------------------------------------------------
  */

  Function fn_create_multi_payment(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_oldifpmt         IN olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Prev_oldifpmt    IN OUT olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Wrk_oldifpmt     IN OUT olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
                                       RETURN Boolean;
  
  Function fn_auth_multi_payment(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_oldifpmt         IN olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Prev_oldifpmt    IN OUT olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Wrk_oldifpmt     IN OUT olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
                                       RETURN Boolean;
                                       
  Function fn_revr_multi_payment(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_oldifpmt         IN olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Prev_oldifpmt    IN OUT olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Wrk_oldifpmt     IN OUT olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
                                       RETURN Boolean;
  
  Function fn_del_multi_payment(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_oldifpmt         IN olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Prev_oldifpmt    IN OUT olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Wrk_oldifpmt     IN OUT olpks_oldifpmt_Main.ty_oldifpmt,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
                                       RETURN Boolean;
                                         
/*Function fn_pi_chk(p_Source IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_lbdcolat         IN lbpks_lbdparol_Main.ty_lbdparol,
                                       p_Prev_lbdparol    IN OUT lbpks_lbdparol_Main.ty_lbdparol,
                                       p_Wrk_lbdparol     IN OUT lbpks_lbdparol_Main.ty_lbdparol,
                                       l_tranche_ref_no       VARCHAR2,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2) RETURN boolean;*/

end olpks_oldifpmt_utils;
/