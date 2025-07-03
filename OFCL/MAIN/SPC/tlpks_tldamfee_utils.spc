CREATE OR REPLACE PACKAGE tlpks_tldamfee_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdmenmc_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved
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
  
  SFR Number         :29959798 
  Changed By         :Srinivasulu Ch
  Change Description :OBCL_14.4_SLT_Amendment_Fee
  
  -------------------------------------------------------------------------------------------------------
  */

  ----OBCL_14.4_SLT_Amendment_Fee Changes
  FUNCTION fn_val_filter_conditions(p_source       IN VARCHAR2,
                                    p_function_id  IN VARCHAR2,
                                    p_action_code  IN VARCHAR2,
                                    p_wrk_tldamfee IN OUT tlpks_tldamfee_Main.Ty_tldamfee,
                                    p_err_code     IN OUT VARCHAR2,
                                    p_err_params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_liqd_trade_validation(p_Cont_ref IN VARCHAR2, P_DATE DATE)
    RETURN VARCHAR2;

  PROCEDURE Pr_pop_fee_amend_hist(p_wrk_tldamfee IN tlpks_tldamfee_Main.Ty_tldamfee);
  --OBCL_14.4_SLT_Amendment_Fee ends

END tlpks_tldamfee_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tldamfee_utils for tlpks_tldamfee_utils
/