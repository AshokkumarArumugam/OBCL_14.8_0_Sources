CREATE OR REPLACE PACKAGE Lbpks_Feeschd_Utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_feeschd_utils.spc
  **
  ** Module     : The ICCF
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright Â© 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  
  
       **Changed By         : Pallavi R
       **Date               : 29-Nov-2019/05-Apr-2020
       **Change Description : Expense fees Changes
       **Search String      : OBCL_14.4_LS_Expense_Fee Changes
  -------------------------------------------------------------------------------------------------------
  */
  g_Prm_Visit_Due      VARCHAR2(10) := 'FALSE';
  g_Prm_Sch_Exploded   VARCHAR2(10) := 'FALSE';
  g_Prm_Partdriven_Fee Lftms_Fee_Class.Participant_Driven_Fee%TYPE;
  g_Prm_Once_Split     CHAR(1) := 'N';
  g_Flag               NUMBER;

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                       p_Prev_Lbdfeamd    IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                       p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.4_LS_Expense_Fee Changes Starts
  FUNCTION Fn_Split(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Wrk_Lbdfeamd     IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.4_LS_Expense_Fee Changes Ends
  FUNCTION Fn_Insert(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Wrk_Lbdfeamd     IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END Lbpks_Feeschd_Utils;
/
CREATE OR REPLACE Synonym Lbpkss_Feeschd_Utils FOR Lbpks_Feeschd_Utils
/