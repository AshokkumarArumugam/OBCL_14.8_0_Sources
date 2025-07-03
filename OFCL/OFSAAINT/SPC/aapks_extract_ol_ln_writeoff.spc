CREATE OR REPLACE PACKAGE aapks_extract_ol_ln_writeoff AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : aapks_extract_ol_ln_writeoff.spc
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

  FUNCTION Fn_Stg_Load_WriteOff(p_Extraction_Date IN DATE,
                                p_Branch_Code     IN VARCHAR2,
                                p_Lcy             IN VARCHAR2) RETURN BOOLEAN;
END aapks_extract_ol_ln_writeoff;
/
CREATE OR REPLACE SYNONYM aapkss_extract_ol_ln_writeoff FOR aapks_extract_ol_ln_writeoff
/