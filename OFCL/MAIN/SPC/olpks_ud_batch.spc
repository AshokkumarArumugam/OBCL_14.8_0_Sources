create or replace package olpks_ud_batch as
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2001 - 2010  Oracle and/or its affiliates.  All rights reserved.
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
/*
  **  Modified By           :  Rashmi B V
  **  Modified On           :  22-Feb-2023
  **  Modified Reason       :  HOOK REQUEST FOR FN_BATCH FUNCTION
  **  Search String         :  Bug#34611736
  
*/
-----------------------------------------------------------------------------------------*/
--Bug#34611736 Changes starts
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
 --Bug#34611736 Changes ends
 
function fn_get_lcy_amt( l_contract_ref_no 	varchar2,
				 l_event_seq_no         number,
				 l_event_code           varchar2 )
return boolean;

function fn_batch(p_brn varchar2)
return boolean ;

end olpks_ud_batch;

/
create or replace synonym olpkss_ud_batch for olpks_ud_batch			
/