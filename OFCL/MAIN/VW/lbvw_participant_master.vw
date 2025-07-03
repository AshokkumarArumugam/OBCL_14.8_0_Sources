CREATE OR REPLACE FORCE VIEW lbvw_participant_master
(CONTRACT_REF_NO,USER_REF_NO,COUNTERPARTY,CURRENCY,ASSET_RATIO,AMOUNT,SELF_PARITICIPATION,BORROWER_CONTRACT_REF_NO)
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
SELECT B.CONTRACT_REF_NO,B.USER_REF_NO,B.COUNTERPARTY,B.CURRENCY,A.ASSET_RATIO,B.AMOUNT,A.SELF_PARTICIPATION,B.BORROWER_CONTRACT_REF_NO
from lbtbs_contract_participant A,lptbs_contract_master B
WHERE A.CONTRACT_REF_NO=B.BORROWER_CONTRACT_REF_NO
AND A.PARTICIPANT=B.COUNTERPARTY
AND B.VERSION_NO=(SELECT MAX(VERSION_NO) FROM
    lptbs_contract_master C
    WHERE B.CONTRACT_REF_NO=C.CONTRACT_REF_NO)
/
create OR REPLACE synonym lbvws_participant_master for lbvw_participant_master 
/