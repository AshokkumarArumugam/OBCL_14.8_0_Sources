CREATE OR REPLACE VIEW OLVW_IF_OLCONTRACT_MASTER AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : OLVW_IF_OLCONTRACT_MASTER.VW
** Module       : OL
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2018 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT *
  FROM OLTB_IF_OLCONTRACT_MASTER A
 WHERE A.STATUS = 'E' 
   AND A.SEQ_NO = (SELECT MAX(SEQ_NO)
                     FROM OLTB_IF_OLCONTRACT_MASTER B
                    where B.contract_ref_no = A.contract_ref_no)
 ORDER BY A.SEQ_NO, A.CONTRACT_REF_NO
/
CREATE OR REPLACE SYNONYM OLVWS_IF_OLCONTRACT_MASTER FOR OLVW_IF_OLCONTRACT_MASTER
/