CREATE OR REPLACE PACKAGE lbpks_lbdprpmt_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdprpmt_utils.spc
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
  PROCEDURE pr_pop_details(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_lbdprpmt         IN lbpks_lbdprpmt_Main.Ty_lbdprpmt,
                           p_Prev_lbdprpmt    IN OUT lbpks_lbdprpmt_Main.Ty_lbdprpmt,
                           p_Wrk_lbdprpmt     IN OUT lbpks_lbdprpmt_Main.Ty_lbdprpmt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);

  FUNCTION fn_validations(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_lbdprpmt         IN lbpks_lbdprpmt_Main.Ty_lbdprpmt,
                          p_Prev_lbdprpmt    IN OUT lbpks_lbdprpmt_Main.Ty_lbdprpmt,
                          p_Wrk_lbdprpmt     IN OUT lbpks_lbdprpmt_Main.Ty_lbdprpmt,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

end lbpks_lbdprpmt_utils;
/