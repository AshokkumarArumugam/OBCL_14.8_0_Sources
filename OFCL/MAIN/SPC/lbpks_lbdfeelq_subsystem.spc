CREATE OR REPLACE PACKAGE lbpks_lbdfeelq_subsystem AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdfeelq_subsystem.spc
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

  FUNCTION fn_subsys_pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdfeelq         IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                            p_Prev_lbdfeelq    IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                            p_Wrk_lbdfeelq     IN OUT lbpks_lbdfeelq_main.Ty_lbdfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdfeelq         IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                            p_Prev_lbdfeelq    IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                            p_Wrk_lbdfeelq     IN OUT lbpks_lbdfeelq_main.Ty_lbdfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END lbpks_lbdfeelq_subsystem;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdfeelq_subsystem FOR lbpks_lbdfeelq_subsystem
/