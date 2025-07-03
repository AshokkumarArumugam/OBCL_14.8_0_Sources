CREATE OR REPLACE PACKAGE lbpks_lbdcolat_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldexamd_utils.sql
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
  Created by        : Prakash Ravi
  Created Date      : 26-DEC-2016
  Description       : Development for OFCL-12.4
  -------------------------------------------------------------------------------------------------------
  */
    
 Function fn_calc_net_avail(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_lbdcolat         IN lbpks_lbdcolat_Main.ty_lbdcolat,
                                       p_Prev_lbdcolat    IN OUT lbpks_lbdcolat_Main.ty_lbdcolat,
                                       p_Wrk_lbdcolat     IN OUT lbpks_lbdcolat_Main.ty_lbdcolat,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2) RETURN boolean;

end lbpks_lbdcolat_utils;
/