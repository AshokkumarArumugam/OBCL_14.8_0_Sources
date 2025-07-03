CREATE OR REPLACE VIEW lbvw_transfer_master_temp AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_transfer_master_temp.vw
**
** Module      : Syndication Loans and Commitments
**
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
/* created for Participant Transfer - lbpks_pram - fn_build_amount */
SELECT CONTRACT_REF_NO,
USER_REF_NO,
VALUE_DATE,
ENTRY_SEQ_NO,
BRANCH,
MAKER_ID,
MAKER_DT_STAMP,
CONTRACT_STATUS,
AUTH_STATUS,
TRANSFER_STATUS,
TRANSACTION_DATE,
PAMB_ESN,
PAMI_ESN,
ACC_ENTRY_REQUIRED,
TRANSFER_TYPE,
TRANSFER_REF_NO,
FIRST_TIME_BUY
from 
lbtws_transfer_master_temp
UNION
SELECT CONTRACT_REF_NO,
USER_REF_NO,
VALUE_DATE,
ENTRY_SEQ_NO,
BRANCH,
MAKER_ID,
MAKER_DT_STAMP,
CONTRACT_STATUS,
AUTH_STATUS,
TRANSFER_STATUS,
TRANSACTION_DATE,
PAMB_ESN,
PAMI_ESN,
ACC_ENTRY_REQUIRED,
TRANSFER_TYPE,
TRANSFER_REF_NO,
FIRST_TIME_BUY
from 
lbtws_transfer_master
/
CREATE OR REPLACE SYNONYM LBVWS_TRANSFER_MASTER_TEMP FOR LBVW_TRANSFER_MASTER_TEMP 
/