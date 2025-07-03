create or replace package olpks_ud_batch_custom is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_ud_batch_custom.SPC
  **
  ** Module   : OL
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, 
	mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written 
	permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  **  Created By           :  Rashmi B V
  **  Created On           :  20-Sep-2022
  **  Created Reason       :  HOOK REQUEST FOR FN_BATCH FUNCTION
  **  Search String         :  Bug#34611736
	
  */
 FUNCTION fn_pre_batch(p_brn varchar2)
    Return Boolean;

 FUNCTION fn_post_batch(p_brn varchar2)
    Return Boolean;

end olpks_ud_batch_custom;
/