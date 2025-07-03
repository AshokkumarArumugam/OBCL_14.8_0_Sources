CREATE OR REPLACE PACKAGE olpks_olduplod_entity AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olduplod_entity.spc
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2019 , Oracle and/or its affiliates.  All rights reserved
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

  FUNCTION fn_upload_entity(p_Source           IN oltbs_upload_master.source_code%TYPE,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            pextrefno          IN oltbs_upload_master.ext_contract_ref_no%TYPE,
                            pimpmode           IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_Status           IN OUT VARCHAR2,
                            pcuberefno         OUT oltbs_contract.contract_ref_no%TYPE,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END olpks_olduplod_entity;
/
create or replace synonym olpkss_olduplod_entity for olpks_olduplod_entity
/