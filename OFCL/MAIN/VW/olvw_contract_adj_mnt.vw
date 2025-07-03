create or replace force view olvw_contract_adj_mnt
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
SELECT a.account_number,b.amount_tag,a.amount_type 
FROM   oltms_ac_transaction_category a,
	   oltms_account_type b
WHERE  a.amount_type =  b.amount_type 
AND    a.record_stat = 'O'
AND    b.record_stat = 'O'
AND    a.auth_stat 	 = 'A'
AND    b.auth_stat 	 = 'A'
/
create or replace synonym olvws_contract_adj_mnt for olvw_contract_adj_mnt
/