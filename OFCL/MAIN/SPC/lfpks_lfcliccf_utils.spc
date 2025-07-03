CREATE OR REPLACE PACKAGE lfpks_lfcliccf_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfcliccf_utils.spc
  **
  ** Module     : The ICCF
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
    /* global variables declaration */
  g_sighting_check       VARCHAR2(1);
  g_reprice              VARCHAR2(1);
  g_payment_method       oltms_product_master_ld.payment_method%TYPE;
  g_product_type         oltms_product_master_ld.product_type%type;
  /* global variables declaration */
  
  PROCEDURE PR_QUERY_DESCRIPTION(p_Wrk_lfcliccf IN OUT lfpks_lfcliccf_Main.Ty_lfcliccf,
                                 loop_count     NUMBER);
  FUNCTION Fn_Validate(p_Source       IN Cotms_Source.Source_Code%TYPE,
                       p_Function_Id  IN VARCHAR2,
                       p_Module       IN VARCHAR2,
                       p_Action_Code  IN VARCHAR2,
                       p_Wrk_lfcliccf IN OUT lfpks_lfcliccf_Main.Ty_lfcliccf,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Default(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_lfcliccf         IN OUT lfpks_lfcliccf_Main.Ty_lfcliccf,
                      p_loop_count       IN NUMBER,
                      p_Status           IN OUT VARCHAR2,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Post_Upload_Db_Validate(p_Source       IN Cotms_Source.Source_Code%TYPE,
                       p_Function_Id  IN VARCHAR2,
                       p_Action_Code  IN VARCHAR2,
                       p_Wrk_lfcliccf IN OUT lfpks_lfcliccf_Main.Ty_lfcliccf,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

END lfpks_lfcliccf_utils;
/
CREATE OR REPLACE SYNONYM lfpkss_lfcliccf_utils FOR lfpks_lfcliccf_utils
/