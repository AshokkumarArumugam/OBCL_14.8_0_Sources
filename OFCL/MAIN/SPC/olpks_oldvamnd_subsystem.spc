CREATE OR REPLACE PACKAGE olpks_oldvamnd_subsystem AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldvamnd_subsystem.spc
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
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  **Changed By         : Chandra Achuta
  **Date               : 14-JUN-2024
  **Change Description : Advices should be populated in the advice tab during Contract Booking before saving the contract (after clicking ICCF pickup).
                         Calling the advice pickup for BOOK, INIT events with event sequence no as 1.
                         and when the actual pickup happens during save then the table would be updated with the actual event sequence no
  **Search String      : BUG#36705283
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_get_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION fn_upd_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_stat       IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION fn_subsys_pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                            p_prev_oldvamnd    IN olpks_oldvamnd_main.ty_oldvamnd,
                            p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_explode_schedules(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                                p_prev_oldvamnd    IN olpks_oldvamnd_main.ty_oldvamnd,
                                p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                                P_product_master   IN oltms_product_master_ld%ROWTYPE,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                            p_prev_oldvamnd    IN olpks_oldvamnd_main.ty_oldvamnd,
                            p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --BUG#36705283  Changes Starts
  /*
  FUNCTION fn_populate_advices(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_upload_advices(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  */
  --BUG#36705283  Changes Ends
END olpks_oldvamnd_subsystem;
/
CREATE OR REPLACE SYNONYM olpkss_oldvamnd_subsystem FOR olpks_oldvamnd_subsystem
/