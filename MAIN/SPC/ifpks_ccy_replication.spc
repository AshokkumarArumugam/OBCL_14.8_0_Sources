CREATE OR REPLACE PACKAGE ifpks_ccy_replication AS
  /*
  ------------------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
  ** Copyright © 2021  Oracle and/or its affiliates.  All rights reserved.
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
  ------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  **  Created By         : Nisha B C
  **  Created On         : 17-Aug-2021
  **  Change description : Changes for the ODT entity replication into OBMA core.
  ---------------------------------------------------------------------------------------------
  */
  g_new_rate BOOLEAN := FALSE;
  FUNCTION fn_obma_exchrate_replicate(p_cytm_rate_master IN cytm_rates_master%ROWTYPE,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END ifpks_ccy_replication;
/
create or replace synonym ifpkss_ccy_replication for ifpks_ccy_replication
/