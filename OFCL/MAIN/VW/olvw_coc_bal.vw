CREATE OR REPLACE VIEW olvw_coc_bal
(effective_date,contract_ccy,Rapidid)
AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_coc_bal.VW
** Module       : LD
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Created by : K.PRIYADARSHINI
Created Date : 28- AUG-2016
Purpose : Header block for Cost Of Credit Balance Sheet - OLDCOCBL
*/
SELECT  distinct c.effective_date, c.contract_ccy, '' Rapidid
from  oltbs_commitment_balances_coc c
/
CREATE OR REPLACE SYNONYM olvws_coc_bal FOR olvw_coc_bal
/