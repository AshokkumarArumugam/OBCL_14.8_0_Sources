CREATE OR REPLACE PACKAGE aapks_extract_ol_ln_recovery AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : aapks_extract_ol_ln_recovery.spc
  **
  ** Module     : OL
  **
  ** This source is part of the Oracle Banking Software Product.
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
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Stg_Load_Recovery(p_extraction_date IN DATE,
                                p_branch_code     IN VARCHAR2,
                                p_lcy             IN VARCHAR2) RETURN BOOLEAN;
END aapks_extract_ol_ln_recovery;
/
CREATE OR REPLACE SYNONYM aapkss_extract_ol_ln_recovery FOR aapks_extract_ol_ln_recovery
/