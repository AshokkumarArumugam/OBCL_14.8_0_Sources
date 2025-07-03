CREATE OR REPLACE FORCE VIEW oltm_branch_bic(
				BRANCH_CODE,
				BIC_CODE,
				CUSTOMER_NO,
				SK_ARRANGEMENT,
				GEN_MT103,
				GEN_MT103P,
				USE_SMALL_FX,
				MOD_NO,
				RECORD_STAT,
				AUTH_STAT,
				ONCE_AUTH,
				MAKER_ID,
				MAKER_DT_STAMP,
				CHECKER_ID,
				CHECKER_DT_STAMP,
				CUST_DD_MSG_PREF,
				BANK_DD_MSG_PREF,
				RTGS_MEMBER,
				RTGS_BIC
				)
AS
SELECT
/*-----------------------------------------------------------------------------------------------
**
** File Name    : oltm_branch_bic.vw
**
** Module       : OL
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2021 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
/*
CHANGE HISTORY
  **created By         : Reghuraj Vadakkedath
  **Date               : 19-FEB-2021
  **Change Description : Common core does not propogate Branch BIC data, so branch bic references would be changed to ISTM_BIC_DIRECTORY.
  **Search String      : Bug#31825782
*/
global.current_branch BRANCH_CODE,
BIC_CODE,
CUSTOMER_NO,
SK_ARRANGEMENT,
GEN_MT103,
GEN_MT103P,
NULL USE_SMALL_FX,
MOD_NO,
RECORD_STAT,
AUTH_STAT,
ONCE_AUTH,
MAKER_ID,
MAKER_DT_STAMP,
CHECKER_ID,
CHECKER_DT_STAMP,
NULL CUST_DD_MSG_PREF,
NULL BANK_DD_MSG_PREF,
NULL RTGS_MEMBER,
NULL RTGS_BIC
FROM istms_bic_directory
/
CREATE OR REPLACE SYNONYM oltms_branch_bic FOR oltm_branch_bic
/