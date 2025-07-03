CREATE OR REPLACE FORCE VIEW olvw_grp_customer
AS
--24-FEB-2010 FLEXCUBE V.CL 7.6, PBG Site-Retro, CITIPBG TILL##712 CHANGES
/*----------------------------------------------------------------------------------------------------
 This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
SELECT a.contract_ref_no, 
       a.group_id,
       c.customer_no,
       c.customer_name1,
       c.customer_name2,
       c.address_line1,
       c.address_line3,
       c.address_line2,
       c.address_line4,
       c.country,
       c.short_name,  
       c.ssn,
       d.field_val part_sys_borr_id
  FROM OLTM_GRP_LINKED_ACCOUNTS a,
       oltbs_contract b,
       oltms_customer c,
       cstms_udf_vals d
 WHERE a.contract_ref_no = b.contract_ref_no
   AND b.counterparty = c.customer_no
   AND d.rec_key like c.customer_no||'%'
   AND d.function_id = 'STDCIF'
   AND d.field_name = 'PART-SYS-BORR-ID'
/
CREATE OR REPLACE SYNONYM olvws_grp_customer for olvw_grp_customer
/