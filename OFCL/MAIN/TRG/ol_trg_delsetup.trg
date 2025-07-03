CREATE OR REPLACE TRIGGER ol_trg_delsetup
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_trg_delsetup.TRG
**
** Module       : AC
**
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form 
**  or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated
**  in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
AFTER DELETE 
ON OLTM_IB_SETUP
FOR EACH ROW
DECLARE
BEGIN
  BEGIN
    delete from OLTB_IB_ROUTE 
     where  branch1 = :old.branch_1 and 
     branch2 = :old.branch_2; 
    delete from OLTB_IB_ROUTE 
     where  branch1 = :old.branch_2 and 
     branch2 = :old.branch_1; 
  END;
END;
/