CREATE OR REPLACE PACKAGE lbpks_lbdparol_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdparol_utils.sql
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
  Created by        : 
  Created Date      : 
  Description       : 
  -------------------------------------------------------------------------------------------------------
  */
                                         
  Function fn_roll_process(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_lbdcolat         IN lbpks_lbdparol_Main.ty_lbdparol,
                                       p_Prev_lbdparol    IN OUT lbpks_lbdparol_Main.ty_lbdparol,
                                       p_Wrk_lbdparol     IN OUT lbpks_lbdparol_Main.ty_lbdparol,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
                                       RETURN Boolean;
                                       
Function fn_pi_chk(p_Source IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_lbdcolat         IN lbpks_lbdparol_Main.ty_lbdparol,
                                       p_Prev_lbdparol    IN OUT lbpks_lbdparol_Main.ty_lbdparol,
                                       p_Wrk_lbdparol     IN OUT lbpks_lbdparol_Main.ty_lbdparol,
                                       l_tranche_ref_no 			VARCHAR2,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2) RETURN boolean;                                       

end lbpks_lbdparol_utils;
/