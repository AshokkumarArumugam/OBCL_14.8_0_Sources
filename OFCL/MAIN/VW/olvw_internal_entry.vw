CREATE OR REPLACE FORCE VIEW olvw_internal_entry ( ENTRY_SEQ_NO, 
BOOKING_DATE, VALUE_DATE, DR_CR_INDICATOR, AMOUNT, 
DR_AMOUNT, CR_AMOUNT, TRANSACTION_CODE, INTERNAL_REF_NO, 
EXTERNAL_REF_NO, SUPPLEMENTARY_DETAILS, RECON_CLASS, EXTERNAL_ENTITY, 
EXTERNAL_ACCOUNT, CURRENCY, ACC_ENTRY_SR_NO, ACCGL_BRANCH, 
ACCGL, MATCH_INDICATOR ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_internal_entry.VW
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
SELECT	ENTRY_SEQ_NO,
	BOOKING_DATE,
	VALUE_DATE,
	DR_CR_INDICATOR,
	AMOUNT,
	DECODE(DR_CR_INDICATOR,'D',AMOUNT,0)	DR_AMOUNT,
	DECODE(DR_CR_INDICATOR,'C',AMOUNT,0)	CR_AMOUNT,
	TRANSACTION_CODE,
	INTERNAL_REF_NO,
	EXTERNAL_REF_NO,
	SUPPLEMENTARY_DETAILS,
	RECON_CLASS,
	EXTERNAL_ENTITY,
	EXTERNAL_ACCOUNT,
	CURRENCY,
	ACC_ENTRY_SR_NO,
	ACCGL_BRANCH,
	ACCGL,
	MATCH_INDICATOR
FROM	OLTB_INTERNAL_ENTRY
/
CREATE OR REPLACE SYNONYM olvws_internal_entry FOR olvw_internal_entry
/