CREATE OR REPLACE PACKAGE lfpks_pfee_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_pfee_utils.spc
  **
  ** Module     : Loans Syndication
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_wrk_lfcfeecf     IN OUT lfpks_lfcfeecf_Main.ty_lfcfeecf,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload_Db(p_Source           IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,                        
                        p_wrk_lfcfeecf     IN OUT lfpks_lfcfeecf_Main.ty_lfcfeecf,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Main_Function    IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_Key_Tags_Vals    IN OUT VARCHAR2,
                    p_QryData_Reqd     IN VARCHAR2,
                    p_lfcfeecf         IN lfpks_lfcfeecf_Main.ty_lfcfeecf,
                    p_wrk_lfcfeecf     IN OUT lfpks_lfcfeecf_Main.ty_lfcfeecf,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_SubsysPickup(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Main_Function    IN VARCHAR2,
                           p_esn              IN NUMBER,
                           p_contract_ref_no IN VARCHAR2,
                           /*p_lfcfeecf         IN lfpks_lfcfeecf_main.ty_lfcfeecf,
                           p_prev_lfcfeecf    IN lfpks_lfcfeecf_main.ty_lfcfeecf,
                           p_wrk_lfcfeecf     IN OUT lfpks_lfcfeecf_main.ty_lfcfeecf,*/
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END lfpks_pfee_utils;
/
CREATE OR REPLACE SYNONYM lfpkss_pfee_utils FOR lfpks_pfee_utils
/