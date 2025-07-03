CREATE OR REPLACE VIEW olvw_derived_tag 
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_derived_tag.VW
**
** Module       : CO
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

    Changed By         : Navoneel Nandan
    Changed On         : 20-JAN-2020
    Search String      : OBCL_14.4_CDI
    Change Reason      : Derivation of penalty components for CDI, this is used in OLPKS_PENALTY


    Changed By         : Navoneel Nandan
    Changed On         : 11-MAY-2020
    Search String      : OBCL_14.4_CDI_bugfix
    Change Reason      : Based on Penalty Logic Change
    
    Changed By         : Navoneel Nandan
    Date               : 18-Feb-2022
    Change Description : Tuning for Exponential Components 
    Search String      : Bug#33874439
*/
SELECT * FROM oltb_derived_tag_detail
--Moved the connect by logic during Derived tag population in lfpks_lfddrvtg_kernel into oltb_derived_tag_detail table
/*SELECT derived_tag,
       based_on_Tag,
       actual_tag,
       based_on_derived,
       \*--OBCL_14.4_CDI_bugfix changes starts
       (SELECT  MIN(based_on_penalty)
      FROM  oltb_derived_tag b
      WHERE   a.derived_tag = b.derived_tag) 
       *\--OBCL_14.4_CDI_bugfix changes ends
       based_on_penalty
FROM 
(
  SELECT  CONNECT_BY_ROOT(derived_tag) derived_tag,
      derived_tag based_on_Tag,
      actual_tag,
      based_on_derived
            ,based_on_penalty--OBCL_14.4_CDI_bugfix changes
    FROM  oltb_derived_tag x
    CONNECT BY PRIOR actual_tag = derived_tag
) a
WHERE based_on_derived = 'N'
*/
/
create or replace synonym olvws_derived_tag for olvw_derived_tag 
/