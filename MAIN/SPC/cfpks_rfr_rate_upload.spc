create or replace package CFPKS_RFR_RATE_UPLOAD as
  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
  ** Copyright © 2000 - 2010  Oracle and/or its affiliates.  All rights reserved.
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
 

  FUNCTION fn_upload(p_source  in varchar2,
                     p_service in varchar2,
                     p_err     in out varchar2,
                     p_prm     in out varchar2) RETURN BOOLEAN;

  
  FUNCTION fn_upload_interest_rates_rfr(l_post_upload_status IN varchar2,
                                        p_err                IN OUT varchar2,
                                        p_prm                IN OUT varchar2)
    RETURN BOOLEAN;
  

end CFPKS_RFR_RATE_UPLOAD;
/
Create or replace synonym CFPKSS_RFR_RATE_UPLOAD for CFPKS_RFR_RATE_UPLOAD
/