create or replace force view olvw_contract_adj_amttag
as
/*----------------------------------------------------------------------------------------------------
 This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
select distinct contract_ref_no,account_number,amount_tag 
from   oltbs_contract_adj_detail a,
	   olvw_contract_adj_mnt b
where  dr_account = b.account_number	   
union
select distinct contract_ref_no,account_number,amount_tag 
from   oltbs_contract_adj_detail a,
	   olvw_contract_adj_mnt b
where  cr_account = b.account_number	
/

create or replace synonym olvws_contract_adj_amttag for olvw_contract_adj_amttag
/