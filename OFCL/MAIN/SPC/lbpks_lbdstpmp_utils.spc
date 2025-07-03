CREATE OR REPLACE PACKAGE lbpks_lbdstpmp_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdstpmp_utils.spc
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

  SFR Number         :
  Changed By         :
  Change Description :

  -------------------------------------------------------------------------------------------------------
  */
  
  
   FUNCTION fn_validate(p_source       IN VARCHAR2,
                       p_function_id  IN VARCHAR2,
                       p_action_code  IN VARCHAR2,
                       p_Wrk_lbdstpmp IN OUT lbpks_lbdstpmp_main.ty_lbdstpmp,
                       p_err_code     IN OUT VARCHAR2,
                       p_err_params   IN OUT VARCHAR2) RETURN BOOLEAN;
                       
    FUNCTION fn_auth(p_source       IN VARCHAR2,
                       p_function_id  IN VARCHAR2,
                       p_action_code  IN VARCHAR2,
                       p_Wrk_lbdstpmp IN OUT lbpks_lbdstpmp_main.ty_lbdstpmp,
                       p_err_code     IN OUT VARCHAR2,
                       p_err_params   IN OUT VARCHAR2) RETURN BOOLEAN;                   
  
  FUNCTION fn_DELETE(p_source       IN VARCHAR2,
                     p_function_id  IN VARCHAR2,
                     p_action_code  IN VARCHAR2,
                     p_wrk_lbdstpmp IN OUT lbpks_lbdstpmp_main.ty_lbdstpmp,
                     p_err_code     IN OUT VARCHAR2,
                     p_err_params   IN OUT VARCHAR2) RETURN BOOLEAN;
  
  
  
  
  END lbpks_lbdstpmp_utils;
/