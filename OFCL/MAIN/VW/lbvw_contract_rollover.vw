create or replace FORCE view lbvw_contract_rollover
as
/*----------------------------------------------------------------------------------------------------
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
select a.contract_ref_no,a.user_ref_no,a.counterparty,a.contract_ccy,a.product_code,a.contract_status,a.auth_status,
	   b.value_date,b.consolidation_type,b.rollover_type,b.rollover_status,b.rollover_contract_ref_no
from  oltbs_contract a,
	  lbtbs_contract_consol_master b
where a.contract_ref_no = b.contract_ref_no
and   b.rollover_contract_ref_no is not null
/
create OR REPLACE synonym lbvws_contract_rollover for lbvw_contract_rollover
/