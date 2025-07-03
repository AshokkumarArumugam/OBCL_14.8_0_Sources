CREATE OR REPLACE PACKAGE olpks_iso_camt054 AS
  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
  ** Copyright (R) 2008,2023 , Oracle and/or its affiliates.  All rights reserved
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
  /*-----------------------------------------------------------------------------------------------------
  
  CHANGE HISTORY
  
  **Changed By         : Kavitha Asokan
  **Date               : 03-NOV-2023
  **Change Description : Bug 35974584 - ISO MX MESSAGE - CAMT054                  
  **Search String      : OBCL_14.7_CAMT054_CHANGES
  
  -----------------------------------------------------------------------------------------------------
  */

  FUNCTION isogen_camt054(p_dly_msg_out_cur IN oltb_dly_msg_out%ROWTYPE,
                          p_is_msgho_rec    IN oltbs_msgho%ROWTYPE)
    RETURN BOOLEAN;
END olpks_iso_camt054;
/
CREATE OR REPLACE SYNONYM olpkss_iso_camt054 FOR olpks_iso_camt054
/