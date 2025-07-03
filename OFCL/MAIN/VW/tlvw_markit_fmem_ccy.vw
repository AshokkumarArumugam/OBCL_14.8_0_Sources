CREATE OR REPLACE FORCE VIEW TLVW_MARKIT_FMEM_CCY AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : TLVW_MARKIT_FMEM_CCY.VW
**
** Module       : SECONDARY LOAN TRADING
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
/* 
CHANGE-HISTORY
16-Sep-2019 Bug#29959798, OBCL_14.4_Ticket_Settlement_Message_Director
*/
SELECT	a.contract_ref_no,a.ccy
FROM	LBTBS_BORROWER_CCY a,OLTB_CONTRACT b
WHERE	a.contract_ref_no = b.contract_ref_no
AND		a.version_no = b.latest_version_no
/
CREATE OR REPLACE SYNONYM TLVWS_MARKIT_FMEM_CCY FOR TLVW_MARKIT_FMEM_CCY
/