CREATE OR REPLACE FORCE VIEW tlvw_firmac_mcc
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlvw_firmac_mcc.VW
**
** Module       : LT-SECONDARY LOAN TRADING
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
---------------------------------------------------------------------------------------------------
*/
/* CHANGE-HISTORY
27-May-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration
*/
(
SELECT x.firm_acct_mnemonic ,x.mcc, m.expense_code, z.position_identifier
FROM tltms_firmac_mcc_detail x
     ,oltms_firmac_map_detail m
     ,tltms_portfolio y
     ,tltms_position_identifier z
WHERE x.firm_acct_mnemonic = m.firm_acct_mnemonic
AND x.firm_acct_mnemonic = y.firm_acct_mnemonic
AND y.portfolio = z.portfolio
)
/
CREATE OR REPLACE SYNONYM tlvws_firmac_mcc FOR tlvw_firmac_mcc
/