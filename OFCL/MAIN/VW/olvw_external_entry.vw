CREATE OR REPLACE FORCE VIEW olvw_external_entry ( RECON_CLASS, 
EXTERNAL_ENTITY, EXTERNAL_ACCOUNT, CURRENCY, YEAR, 
STATEMENT_SEQ_NO, STATEMENT_SUBSEQ_NO, ENTRY_CURRENT_NO, BOOKING_DATE, 
VALUE_DATE, DR_CR_INDICATOR, AMOUNT, DR_AMOUNT, 
CR_AMOUNT, FUNDS_CODE, TRANSACTION_CODE, INTERNAL_REF_NO, 
EXTERNAL_REF_NO, SUPPLEMENTARY_DETAILS, STATEMENT_STATUS, AUTH_STATUS, 
ENTRY_SEQ_NO, MATCH_INDICATOR ) AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_external_entry.VW
**
** Module       : CORE ENTITIES										
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
-----------------------------------------------------------------------------------------------
*/
SELECT	RECON_CLASS,
	EXTERNAL_ENTITY,
	EXTERNAL_ACCOUNT,
	CURRENCY,
	YEAR,
	STATEMENT_SEQ_NO,
	STATEMENT_SUBSEQ_NO,
	ENTRY_CURRENT_NO,
	BOOKING_DATE,
	VALUE_DATE,
	DR_CR_INDICATOR,
	AMOUNT,
	DECODE(DR_CR_INDICATOR,'D',AMOUNT,0)	DR_AMOUNT,
	DECODE(DR_CR_INDICATOR,'C',AMOUNT,0)	CR_AMOUNT,
	FUNDS_CODE,
	TRANSACTION_CODE,
	INTERNAL_REF_NO,
	EXTERNAL_REF_NO,
	SUPPLEMENTARY_DETAILS,
	STATEMENT_STATUS,
	AUTH_STATUS,
	ENTRY_SEQ_NO,
	MATCH_INDICATOR
FROM	OLTB_EXTERNAL_ENTRY
/
CREATE OR REPLACE SYNONYM olvws_external_entry FOR olvw_external_entry
/