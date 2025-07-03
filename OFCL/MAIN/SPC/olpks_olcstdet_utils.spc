CREATE OR REPLACE PACKAGE olpks_olcstdet_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olcstdet_utils.spc
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
  
  SFR Number         : 25901894
  Changed By         : Mohan S
  Change Description : Function fn_validate added to do cross settlement currency validation. Search string: Bug#25901894
  
  -------------------------------------------------------------------------------------------------------
  */
  
  FUNCTION fn_upload_db(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_wrk_olcstdet     IN OUT olpks_olcstdet_main.ty_olcstdet,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  
  --Bug#25901894 changes starts
  FUNCTION Fn_Validate(p_Source       IN VARCHAR2,
                       p_Function_Id  IN VARCHAR2,
                       p_Module       IN VARCHAR2,
                       p_Action_Code  IN VARCHAR2,
					   p_wrk_olcstdet IN OUT olpks_olcstdet_main.ty_olcstdet,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --Bug#25901894 changes ends
END olpks_olcstdet_utils;
/
CREATE OR REPLACE SYNONYM olpkss_olcstdet_utils FOR olpks_olcstdet_utils
/