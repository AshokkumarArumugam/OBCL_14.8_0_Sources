CREATE OR REPLACE PACKAGE olpks_oldlnkam_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldlnkam_utils.spc
  **
  ** Module     : Loans and Deposits
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

  SFR Number         : 27224926
  Changed By         : Prakash Ravi
  Change Description : Validate on unlock for LINKAGE AMENDMENT SCREEN
  Search String      : BUG#27224926
  
  Changed By         : Gomathi G
  Changed On         : 16-SEP-2019
  Change Description : OLDLNKAM - SYSTEM IS NOT VALIDATING THE COMMITMENT AMOUNT FOR LINKAGE
  Search String      : OBCL_14.3_SUPPORT_BUG#30310896
  
  **Changed By         : Chandra Achuta
  **Date               : 29-MAY-2023
  **Change Description : Inserting Missing Columns for lftb_contract_interest
  **Search String      : Bug#35428657
  -------------------------------------------------------------------------------------------------------
  */
  g_prm_lamd_esn        oltbs_contract.latest_event_seq_no%TYPE;
  g_prm_module_code     oltbs_contract.module_code%TYPE := 'OL';
  g_prm_linked_to_ref   oltbs_contract_link_amendment.linked_to_ref%TYPE;
  g_prm_check           VARCHAR2(1);
  g_prm_old_ref_no      oltbs_contract_link_amendment.linked_to_ref%TYPE;
  g_prm_linkage_success NUMBER := 0;--OBCL_14.3_SUPPORT_BUG#30310896 Modified
  g_prm_action_code     VARCHAR2(1);
  g_lddlnkam            olpks_oldlnkam_main.ty_oldlnkam;
  g_linked_commitment   VARCHAR2(1):='N';     --Bug#35428657  Code Added
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);

  PROCEDURE Pr_Old_Linkage_Population(P_contract_ref_no IN VARCHAR2,
                                      P_version_no      IN NUMBER,
                                      p_wrk_oldlnkam    IN OUT olpks_oldlnkam_main.ty_oldlnkam);
  PROCEDURE Pr_Contract_Interest_Bkp(p_Action_Code     IN VARCHAR2,
                                     P_contract_ref_no IN VARCHAR2);
  PROCEDURE Pr_Clear_Linkages(p_wrk_oldlnkam IN OUT olpks_oldlnkam_main.ty_oldlnkam);

  FUNCTION Fn_Check_Date(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                         p_contract_ref_no  IN oltbs_contract.contract_ref_no%TYPE,
                         P_Date             OUT DATE,
                         P_Err_Code         OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                    p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Populate_Contract(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                                p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Linkage(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                               p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Audit(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                             p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate_Amnd_Date(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN OUT VARCHAR2,
                                 p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                                 p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Validate_Lamd(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN OUT VARCHAR2,
                            p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                            p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Validate_Lc(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN OUT VARCHAR2,
                          p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                          p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --BUG#27224926 Changes start                        
  FUNCTION Fn_Populate_Contract_Control(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                                        p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --BUG#27224926 Changes end
  FUNCTION Fn_Unlock(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN OUT VARCHAR2,
                     p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                     p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Save(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN OUT VARCHAR2,
                   p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                   p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN OUT VARCHAR2,
                       p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                       p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Authorize(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN OUT VARCHAR2,
                        p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                        p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_oldlnkam         IN olpks_oldlnkam_main.ty_oldlnkam,
                     p_wrk_oldlnkam     IN OUT olpks_oldlnkam_main.ty_oldlnkam,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END olpks_oldlnkam_utils;
/