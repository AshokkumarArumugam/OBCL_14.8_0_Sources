CREATE OR REPLACE PACKAGE olpks_oldjraut_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldjraut_utils.spc
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
  
  Created by        : Neeraj.Krishna
  Created Date      : 26-AUG-2016
  Description       : Development for OFCL-12.3
  
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Authorize(p_Source           IN Cotms_Source.Source_Code%TYPE,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_wrk_oldjraut     IN OUT NOCOPY olpks_oldjraut_main.ty_oldjraut,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Rekey_Check(p_Source           IN Cotms_Source.Source_Code%TYPE,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_wrk_oldjraut     IN OUT NOCOPY olpks_oldjraut_main.ty_oldjraut,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source           IN Cotms_Source.Source_Code%TYPE,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_oldjraut         IN olpks_oldjraut_main.ty_oldjraut,
                       p_wrk_oldjraut     IN OUT NOCOPY olpks_oldjraut_main.ty_oldjraut,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_oldjraut_utils;
/