CREATE OR REPLACE PACKAGE lfpks_lfcfrmnt_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfcfrmnt_utils.spc
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

  FUNCTION Fn_Validate(p_Source       IN Cotms_Source.Source_Code%TYPE,
                       p_Function_Id  IN VARCHAR2,
                       p_Module       IN VARCHAR2,
                       p_Action_Code  IN VARCHAR2,
                       p_Product_Code IN VARCHAR2,
                       p_Fcc_Ref      IN VARCHAR2,
                       p_Event_Seq_No IN VARCHAR2,
                       p_wrk_lfcfrmnt IN OUT lfpks_lfcfrmnt_main.ty_lfcfrmnt,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload(p_Source       IN Cotms_Source.Source_Code%TYPE,
                     p_Module       IN VARCHAR2,
                     p_Action_Code  IN VARCHAR2,
                     p_Function_Id  IN VARCHAR2,
                     p_Product_Code IN VARCHAR2,
                     p_Fcc_Ref      IN VARCHAR2,
                     p_Event_Seq_No IN VARCHAR2,
                     p_wrk_lfcfrmnt IN OUT lfpks_lfcfrmnt_main.ty_lfcfrmnt,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
END lfpks_lfcfrmnt_utils;
/
CREATE OR REPLACE SYNONYM lfpkss_lfcfrmnt_utils for lfpks_lfcfrmnt_utils
/