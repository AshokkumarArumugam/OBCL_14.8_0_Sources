CREATE OR REPLACE FORCE VIEW lbvw_borrower_history
(borrower_contract_ref_no, payment_date, funding_amount)
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
--FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Arthy Starts
SELECT 	borrower_contract_ref_no,
        payment_date,
        sum(funding_amount)
FROM  	lbtbs_borrower_payment_history	
WHERE	renewal_transaction = 'N'
group by payment_date,borrower_contract_ref_no
--FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Arthy ends
/