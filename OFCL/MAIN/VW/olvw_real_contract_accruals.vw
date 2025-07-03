CREATE OR REPLACE FORCE VIEW olvw_real_contract_accruals 
AS 
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
SELECT * FROM OLTB_CONTRACT_ACCRUAL_HISTORY 
WHERE EVENT_SEQ_NO IS NOT NULL
/
create OR REPLACE synonym olvws_real_contract_accruals for olvw_real_contract_accruals 
/