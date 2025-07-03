CREATE OR REPLACE PACKAGE lbpks_lbcukudf_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcukudf_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
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


   g_flr_clg_default  CHAR(1);
   g_net_rate   NUMBER;
	 g_margin     NUMBER;
   g_rate_basis  varchar2(20);
	 g_ref_rate number;
	 

  FUNCTION fn_validate(p_Source       IN Cotms_Source.Source_Code%TYPE,
                       p_Action_Code  IN VARCHAR2,
                       p_Module       IN VARCHAR2,
                       p_Function_Id  IN VARCHAR2,
                       p_Product_Code IN VARCHAR2,
                       p_Event_Seq_No IN VARCHAR2,
                      p_wrk_lbcukudf IN OUT lbpks_lbcukudf_main.ty_lbcukudf,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_upload(p_Source       IN Cotms_Source.Source_Code%TYPE,
                       p_Action_Code  IN VARCHAR2,
                       p_Module       IN VARCHAR2,
                       p_Function_Id  IN VARCHAR2,
                       p_Product_Code IN VARCHAR2,
                       p_Event_Seq_No IN VARCHAR2,
                       p_wrk_lbcukudf IN OUT lbpks_lbcukudf_main.ty_lbcukudf,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
                       
                       

end lbpks_lbcukudf_utils;
/
create or replace synonym lbpkss_lbcukudf_utils for lbpks_lbcukudf_utils
/