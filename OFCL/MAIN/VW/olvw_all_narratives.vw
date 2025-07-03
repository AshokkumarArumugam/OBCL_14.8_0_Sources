CREATE OR REPLACE force VIEW olvw_all_narratives
(module, code, narrative_type, ord_no)
as
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_all_narratives.VW
**
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

  Changed By         : Ravi
  Date               : 31-OCT-2018
  Change Description : Changed the reference from lftms_rule to LFTB_ICCF_RLAVL
-----------------------------------------------------------------------------------------------
*/
select DISTINCT
       module_code,
       prompt_code,
       'NARRATIVE',
       col_no
from   oltbs_stmt_cols
union all
select DISTINCT
       module,
       event_code,
       'EVENT',1
from   oltbs_event
union all
select DISTINCT
       c.module,
       a.rate_code,
       'INTEREST',1
from   lftms_product_iccf a,
       LFTB_ICCF_RLAVL         b,
       oltms_product      c
where  a.rule      = b.rule_id
and    b.rule_type      = 'I'
and    a.product   = c.product_code
union all
select DISTINCT
       c.module,
       a.component,
       'CHARGE',1
from   lftms_product_iccf a,
       LFTB_ICCF_RLAVL         b,
       oltms_product      c
where  a.rule      = b.rule_id
and    b.rule_type      = 'H'
and    a.product   = c.product_code
union all
--BEFADB CHANGES START
select DISTINCT
       c.module,
       a.component,
       'CHARGE',1
from   lftms_product_charge a,
       LFTB_ICCF_RLAVL           b,
       oltms_product        c
where  a.default_rule= b.rule_id
and    b.rule_type        = 'H'
and    a.product     = c.product_code
union all
select DISTINCT
       c.module,
       a.rule,
       'TAX',1
from   txtm_product_tax    a,
       oltms_product       c
where  a.product=c.product_code
union all
--BEFADB CHANGES END
select DISTINCT
       c.module,
       a.component,
       'COMMISSION',1
from   lftms_product_iccf a,
       LFTB_ICCF_RLAVL    b,
       oltms_product      c
where  a.rule      = b.rule_id
and    b.rule_type      = 'C'
and    a.product   = c.product_code
union all
select DISTINCT
       'AC',
       trn_code,
       'TXN',1
from   oltms_trn_code
union all
-- KWDKFC SFR NO 61 added for fixed interest too. Would be required for advices
select DISTINCT
       c.module,
       a.component,
       'INTEREST',1
from   lftms_product_iccf a,
       LFTB_ICCF_RLAVL         b,
       oltms_product      c
where  a.rule      = b.rule_id
and    b.rule_type      = 'I'
and    a.product   = c.product_code
/
create or replace synonym olvws_all_narratives for olvw_all_narratives
/