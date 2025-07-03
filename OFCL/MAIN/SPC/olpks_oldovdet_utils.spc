CREATE OR REPLACE PACKAGE olpks_oldovdet_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldovdet_utils.spc
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
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_check_auth_status(p_auth_stat     IN OUT VARCHAR2,
                                p_from_clearpar IN OUT VARCHAR2,
                                p_oldovdet      IN OUT olpks_oldovdet_main.ty_oldovdet,
                                i               IN NUMBER,
                                p_err_code      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_authorize(p_eca_status VARCHAR2,
                        p_oldovdet   IN OUT olpks_oldovdet_main.ty_oldovdet,
                        i            IN NUMBER) RETURN BOOLEAN;

END olpks_oldovdet_utils;
/