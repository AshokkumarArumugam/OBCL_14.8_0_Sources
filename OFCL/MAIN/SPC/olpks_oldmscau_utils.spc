create or replace package olpks_oldmscau_utils IS
  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
  **
  ** No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
  ** translated in any language or computer language,
  ** without the prior written permission of Oracle and/or its affiliates.
  **
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India.
  ------------------------------------------------------------------------------------------
  */
  /*
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Query(p_Source           IN VARCHAR2
                    ,p_Source_Operation IN VARCHAR2
                    ,p_Function_Id      IN VARCHAR2
                    ,p_Action_Code      IN VARCHAR2
                    ,p_Full_Data        IN VARCHAR2 DEFAULT 'Y'
                    ,p_With_Lock        IN VARCHAR2 DEFAULT 'N'
                    ,p_oldmscau         IN olpks_oldmscau_main.ty_oldmscau
                    ,p_wrk_oldmscau     IN OUT olpks_oldmscau_main.ty_oldmscau
                    ,p_Err_Code         IN OUT VARCHAR2
                    ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2
                       ,p_Source_Operation IN VARCHAR2
                       ,p_Function_Id      IN VARCHAR2
                       ,p_Action_Code      IN VARCHAR2
                       ,p_oldmscdt         IN olpks_oldmscdt_main.ty_oldmscdt
                       ,p_wrk_oldmscdt     IN OUT olpks_oldmscdt_main.ty_oldmscdt
                       ,p_Err_Code         IN OUT VARCHAR2
                       ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_oldmscau_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldmscau_utils FOR olpks_oldmscau_utils
/