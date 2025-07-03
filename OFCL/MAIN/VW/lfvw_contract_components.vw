CREATE OR REPLACE VIEW LFVW_CONTRACT_COMPONENTS AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : LFVW_CONTRACT_COMPONENTS.vw
**
** Module       : OL
  This source is part of the Oracle Banking Corporate Lending  Software Product.
  Copyright © 2007 - 2020  Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
CHANGE HISTORY
    Changed By         :
    Changed On         :
    Change Reason      :
    Search String      :
                
    **Changed By         : Navoneel Nandan
    **Date               : 08-Oct-2020
    **Change Description : Added Component Type to the Select List.
    **Search String      : OBCL_14.5_Historic_Interest_2
-----------------------------------------------------------------------------------------------
*/
SELECT DISTINCT CONTRACT_REFERENCE_NO CONTRACT_REF_NO, COMPONENT,
DECODE(PENALTY_TYPE,'Y','Penalty Interest','N','Interest') COMPONENT_TYPE,--OBCL_14.5_Historic_Interest_2 Changes 
CLASS_DESCRIPTION
  FROM LFTBS_CONTRACT_INTEREST A, OLTMS_CLASS B
 WHERE A.COMPONENT = B.CLASS_CODE
   AND B.MODULE = 'OL'
 ORDER BY 3,1, 2
/
CREATE OR REPLACE SYNONYM LFVWS_CONTRACT_COMPONENTS FOR LFVW_CONTRACT_COMPONENTS 
/