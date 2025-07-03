CREATE OR REPLACE PACKAGE txpks_txdrules_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : txpks_txdrules_utils.sql
  **
  ** Module     : The Tax
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
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */

  Function FN_DELETE(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                     -- p_prev_txdrules IN OUT txpks_txdrules_main.ty_txdrules,
                     p_wrk_txdrules IN OUT txpks_txdrules_main.ty_txdrules,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) Return Boolean;

  Function FN_LINKED_TO_GROUP_CHECK(p_rule_code        VARCHAR2,
                                    p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Child_Function   IN VARCHAR2,
                                    p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                                    p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                                    p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2) RETURN VARCHAR2;
  FUNCTION FN_CHECK_RULE(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Child_Function   IN VARCHAR2,
                         p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                         p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                         p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) Return Boolean;
  FUNCTION FN_CHECK_UNIQUE(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                           p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                           p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) Return Boolean;
  FUNCTION FN_UPDATE_TAX(p_rule             VARCHAR2,
                         p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Child_Function   IN VARCHAR2,
                         p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                         p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                         p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) Return Boolean;
  FUNCTION FN_VALIDATIONS(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                          p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                          p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) Return Boolean;
  FUNCTION FN_DEFAULT(p_rule_code        VARCHAR2,
                      p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                      p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                      p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) Return Boolean;
  FUNCTION FN_CHECK_NULL_FIELDS(p_rule_code        VARCHAR2,
                                p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                                p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                                p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2) RETURN boolean;
  FUNCTION FN_POPULATE_FOR_PROPAGATION(p_tax_group        varchar2,
                                       p_tax_rule         VARCHAR2,
                                       p_effective_date   txtms_rules_for_grp.effective_date%TYPE,
                                       p_country          txtms_rules_for_grp.country%TYPE,
                                       p_customer         txtms_rules_for_grp.customer%TYPE,
                                       p_cust_tax_group   txtms_rules_for_grp.cust_tax_group%TYPE,
                                       p_currency         txtms_rules_for_grp.currency%TYPE,
                                       p_nationality      txtms_rules_for_grp.nationality%TYPE,
                                       p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                                       p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                                       p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2) Return Boolean;
  FUNCTION FN_VALIDATE_TAX_TYPE(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                                p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                                p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2) Return Boolean;
  FUNCTION FN_SET_BASIS_AMT_FROM(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_Child_Function   IN VARCHAR2,
                                 p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                                 p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                                 p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2) Return Boolean;
  FUNCTION FN_DEFAULT_RULES(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                            p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                            p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2) Return Boolean;
  FUNCTION FN_POPU(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_txdrules         IN txpks_txdrules_main.ty_txdrules,
                   p_prev_txdrules    IN OUT txpks_txdrules_main.ty_txdrules,
                   p_wrk_txdrules     IN OUT txpks_txdrules_main.ty_txdrules,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) Return Boolean;

end txpks_txdrules_utils;
/