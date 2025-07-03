CREATE OR REPLACE PACKAGE lfpks_lfdfeelq_subsystem AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfdfeelq_subsystem.spc
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

  FUNCTION fn_subsys_pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lfdfeelq         IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                            p_Prev_lfdfeelq    IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                            p_Wrk_lfdfeelq     IN OUT lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lfdfeelq         IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                            p_Prev_lfdfeelq    IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                            p_Wrk_lfdfeelq     IN OUT lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END lfpks_lfdfeelq_subsystem;
/
CREATE OR REPLACE SYNONYM lfpkss_lfdfeelq_subsystem FOR lfpks_lfdfeelq_subsystem
/