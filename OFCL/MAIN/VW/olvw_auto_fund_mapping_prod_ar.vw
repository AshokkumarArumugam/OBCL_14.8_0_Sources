CREATE OR REPLACE FORCE VIEW olvw_auto_fund_mapping_prod_ar(PRODUCT_CODE,PRODUCT_DESCRIPTION,PRODUCT_TYPE,BRANCH_CODE,DEPARTMENT_CODE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_auto_fund_mapping_prod_ar.VW
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT a.product_code,a.product_description,a.product_type,b.branch_code,c.department_code
   FROM   oltms_product a,oltms_brn_af_prd_master b,oltms_dept_af_prd_master c
   WHERE  a.MODULE='OL'
   AND   a.product_type IN ('L','D')
   AND   a.record_stat='O'
   AND    a.auth_stat='A'
   AND   a.product_code IN
   (SELECT d.product_code
 FROM   oltms_brn_af_prd_detail d,oltms_dept_af_prd_detail e
 WHERE  d.product_code=e.product_code
 AND    d.branch_code=b.branch_code
 AND    e.department_code=c.department_code
 AND    b.record_stat='O'
 AND    b.auth_stat='A'
 AND    b.record_stat=c.record_stat
 AND    b.auth_stat=c.auth_stat
 )
/