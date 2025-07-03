create or replace package olpks_adv_cluster is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_adv_cluster.SPC
  **
  ** Module   : OL
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */

  function pre_ldadv_input(p_dly_msg_cur in out olpkss_messaging.module_proc_curtype)
    return boolean;
  function post_ldadv_input(p_dly_msg_cur in out olpkss_messaging.module_proc_curtype)
    return boolean;

end olpks_adv_cluster;
/