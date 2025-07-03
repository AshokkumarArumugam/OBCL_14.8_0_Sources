CREATE OR REPLACE FORCE VIEW  olvw_all_cont_incexp_bal AS
--14-JUN-2012 CITIUS#14041 Changes : Fincon Revenue Report Generation,New view created
/*----------------------------------------------------------------------------------------------------
 This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
SELECT LD_COMMITMENT_REF,
       GFRN,
       BAL_DATE,
       ACCOUNT_NO,
       AMOUNT
FROM(SELECT LD_COMMITMENT_REF,
            GFRN,
            BAL_DATE,
            ACCOUNT_NO,
            AMOUNT
     FROM   oltbs_cont_incexp_bal
     UNION ALL
     SELECT LD_COMMITMENT_REF,
            GFRN,
            BAL_DATE,
            ACCOUNT_NO,
            AMOUNT
     FROM   oltbs_cont_incexp_bal_hist)
 ORDER BY BAL_DATE,LD_COMMITMENT_REF
/