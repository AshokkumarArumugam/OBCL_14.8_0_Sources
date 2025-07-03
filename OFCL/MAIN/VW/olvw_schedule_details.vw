CREATE OR REPLACE VIEW olvw_schedule_details AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_schedule_details.vw
** Module       : LD
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
SELECT
CONTRACT_REF_NO      FCCREF,
COMPONENT      SCOMP,
DUE_DATE      DUEDT,
AMOUNT_DUE      AMTDUE,
CURRENCY_AMT_DUE    CCYAMTDUE,  --add in XSD
ACCOUNT_DUE      ACCDUE  ,  --add in XSD
BRANCH_ACCOUNT_DUE    BRNACCDUE,  --add in XSD
COUNTERPARTY      CPTY,
AMOUNT_SETTLED      AMTSETTL,  --add in XSD
INFLOW_OUTFLOW      INOUTFLW,  --add in XSD
BASIS_AMOUNT_TAG    BASISAMTTAG,  --add in XSD
ADJUSTED_AMOUNT      ADJAMT,
SCHEDULE_LINKAGE    SCHDLINK,
MSG_EVENT_SEQ_NO    MSGESN,
SCH_PICKED_FOR_LIQ    SCHDFORLIQ,
BILLING_EVENT_SEQ_NO    BILLESN,
COMPONENT_TYPE      COMPTYPE,
SGEN_AC_BRANCH      SGENACBRN,
SGEN_AC_NO      SGENACNO,
SGEN_AC_CCY      SGENACCCY,
SGEN_AMOUNT      SGENAMT,
SGEN_XRATE      SGENXRATE,
--SUBSIDY_AMOUNT      SUBAMT    ,
--FIXED_AMOUNT_FLAG    FIXAMTFLG,
--UNBILLED_CURRENT    UNBILLCURR,
--UNBILLED_PREV      UNBILLPREV,
--NOTC_AMOUNT      NOTCAMT,
--AMOUNT_PREPAID      AMTPREPD,
--ORIGINAL_DUE_DATE    ORGDUEDT,
DISC_ACCR_APPLICABLE    DISCACCRAPPL,
--BV_ADJ_AMOUNT      BVADJAMT,
NOTC_GEN      NOTCGEN,
NOTC_EVENT_SEQ_NO    NOTCESN,
AMT_IN_CONT_CCY      AMTINCONTCCY,
CONTRACT_CCY      CONTCCY
,'' PAY_RECEIVE  --[SITECODE: 12.1,INTERNAL, Negative Interest Rate]
from oltbs_amount_due
/
create or replace synonym olvws_schedule_details for olvw_schedule_details
/