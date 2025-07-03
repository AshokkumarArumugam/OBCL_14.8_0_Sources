CREATE OR REPLACE PACKAGE olpks_olduplod_settlement AS
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
  Created  By         : Anub Mathew
	Created On         : 05-09-2018
	Modified Reason     :Added code to upload settlement.Bug no 27998758
  -------------------------------------------------------------------------------------------------------
  */

  
  FUNCTION fn_upload_settlement(p_Source           IN oltbs_upload_master.source_code%TYPE,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,  
                            p_source_ref_no     IN oltms_upload_instr.source_ref_no%TYPE,                    
                            --pimpmode           IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_Status           IN OUT VARCHAR2,                            
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END olpks_olduplod_settlement;
/
CREATE OR REPLACE SYNONYM olpkss_olduplod_settlement FOR olpks_olduplod_settlement
/