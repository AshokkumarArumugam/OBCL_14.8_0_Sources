create or replace package olpks_ms_adv_cluster is

/*--------------------------------------------------------------------------------------------------------
    **
    ** File Name	: olpks_ms_adv_cluster.SPC
    **
    ** Module	: LOANS and DEPOSITS
    ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
    ** Copyright Ã‚Â© 2007 - 2020  Oracle and/or its affiliates.  All rights reserved.
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
    
    ----------------------------------------------------------------------------------------------------------
    CHANGE HISTORY

    **Created By         : Abhik Das
    **Date               : 09-Nov-2020
    **Change Description : Provided Hooks to generate advices dynamically for OBCL_14.4_Support_Bug#32129402
    ----------------------------------------------------------------------------------------------------------
 */
  FUNCTION fn_pre_ms_advgen(p_dly_msg_out_cur IN OUT oltbs_dly_msg_out%ROWTYPE) 
							RETURN BOOLEAN;
  
  FUNCTION fn_post_ms_advgen(p_dly_msg_out_cur IN OUT oltbs_dly_msg_out%ROWTYPE) 
							RETURN BOOLEAN;

end olpks_ms_adv_cluster;
/
CREATE OR REPLACE Synonym olpkss_ms_adv_cluster FOR olpks_ms_adv_cluster
/