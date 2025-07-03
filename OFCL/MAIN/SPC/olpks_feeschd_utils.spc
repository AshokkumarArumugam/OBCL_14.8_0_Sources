create or replace package olpks_feeschd_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_feeschd_utils.spc
  **
  ** Module     : The ICCF
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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
  
  Created by        :
  Created Date      :
  Description       :
  
  -------------------------------------------------------------------------------------------------------
  */
  g_PRM_VISIT_DUE      VARCHAR2(10) := 'FALSE';
  g_PRM_SCH_EXPLODED   VARCHAR2(10) := 'FALSE';
  g_PRM_PARTDRIVEN_FEE lftms_fee_class.participant_driven_fee%type;
  g_prm_once_split     CHAR(1) := 'N';
  g_flag               NUMBER;

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_oldfeamd         IN olpks_oldfeamd_main.Ty_oldfeamd,
                       p_Prev_oldfeamd    IN OUT olpks_oldfeamd_main.Ty_oldfeamd,
                       p_wrk_oldfeamd     IN OUT olpks_oldfeamd_main.Ty_oldfeamd,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Insert(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Prev_oldfeamd    IN olpks_oldfeamd_main.Ty_oldfeamd,
                     p_wrk_oldfeamd     IN olpks_oldfeamd_main.Ty_oldfeamd,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END olpks_feeschd_utils;
/
CREATE OR REPLACE SYNONYM olpkss_feeschd_utils FOR olpks_feeschd_utils
/