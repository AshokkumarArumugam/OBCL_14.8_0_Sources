CREATE OR REPLACE force VIEW olvw_intgl_obal_d ( BRN, 
DEPT, REL_CUST, ACC, CCY, 
APPL, DR_MOV, CR_MOV, DR_MOV_LCY, 
CR_MOV_LCY ) AS 
/*----------------------------------------------------------------------------------------------------
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT    a.cube_branch_code brn
 , SUBSTR(LPAD(NVL(A.DEPartment_number,'U'),3,'0'),2,2) dept
 , a.related_customer rel_cust
 , a.ac_no acc
 , a.cube_ccy_code ccy
        , a.itr_application_system
 , SUM(DECODE(a.drcr_ind,'D',NVL(a.fcy_amount,0),0)) dr_mov
 , SUM(DECODE(a.drcr_ind,'C',NVL(a.fcy_amount,0),0)) cr_mov
 , SUM(DECODE(a.drcr_ind,'D',a.lcy_amount,0)) dr_mov_lcy
 , SUM(DECODE(a.drcr_ind,'C',a.lcy_amount,0)) cr_mov_lcy
FROM   OLAC_HISTORY a
WHERE   gl_indicator = 'G'
GROUP BY a.cube_branch_code
 , SUBSTR(LPAD(NVL(A.DEPartment_number,'U'),3,'0'),2,2)
 , a.related_customer
 , a.ac_no
 , a.cube_ccy_code
        ,  a.itr_application_system
/