CREATE OR REPLACE PACKAGE lbpks_lbdrefnd_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdrefnd_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2022  Oracle and/or its affiliates.  All rights reserved.
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
  **Date               : 04-MAY-2022
  **Change Description : Introduced this package for supporting refund functionality for LS.
  **Search String      : Bug#34021830

  -------------------------------------------------------------------------------------------------------
  */
  g_refund_appl varchar2(1) := 'N';
  FUNCTION fn_upd_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_stat       IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdrefnd         IN lbpks_lbdrefnd_main.ty_lbdrefnd,
                            p_prev_lbdrefnd    IN lbpks_lbdrefnd_main.ty_lbdrefnd,
                            p_wrk_lbdrefnd     IN OUT lbpks_lbdrefnd_main.ty_lbdrefnd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  PROCEDURE pr_pop_details(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_lbdrefnd         IN lbpks_lbdrefnd_Main.Ty_lbdrefnd,
                           p_Prev_lbdrefnd    IN OUT lbpks_lbdrefnd_Main.Ty_lbdrefnd,
                           p_Wrk_lbdrefnd     IN OUT lbpks_lbdrefnd_Main.Ty_lbdrefnd,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);

  FUNCTION fn_validations(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_lbdrefnd         IN lbpks_lbdrefnd_Main.Ty_lbdrefnd,
                          p_Prev_lbdrefnd    IN OUT lbpks_lbdrefnd_Main.Ty_lbdrefnd,
                          p_Wrk_lbdrefnd     IN OUT lbpks_lbdrefnd_Main.Ty_lbdrefnd,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_lcy_eqvt(p_fcy_amount oltbs_contract_schedules.amount%TYPE,
                       p_fcy        oltbs_contract_master.currency%TYPE)
    RETURN NUMBER;
end lbpks_lbdrefnd_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdrefnd_utils FOR lbpks_lbdrefnd_utils
/