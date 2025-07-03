create or replace FORCE view lbvw_cashflow_amount_due
(CONTRACT_REF_NO,COMPONENT,DUE_DATE,AMOUNT_DUE,CURRENCY_AMT_DUE,INFLOW_OUTFLOW,COMPONENT_TYPE,
PAY_CONF_STATUS,PAY_CONF_MAKER_ID,PAY_CONF_MAKER_DT_STAMP,NETTING_STATUS,NETTING_TIMESTAMP,
SETTLED_STATUS
)
as 
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lbvw_cashflow_amount_due.vw
**
** Module       : LS
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
( 
  select CONTRACT_REF_NO,COMPONENT,DUE_DATE,AMOUNT_DUE,CURRENCY_AMT_DUE,INFLOW_OUTFLOW,COMPONENT_TYPE,
	PAY_CONF_STATUS,PAY_CONF_MAKER_ID,PAY_CONF_MAKER_DT_STAMP,NETTING_STATUS,NETTING_TIMESTAMP,
	SETTLED_STATUS
  from oltbs_amount_due_cs
  union
  select CONTRACT_REF_NO,COMPONENT,DUE_DATE,AMOUNT_DUE,CURRENCY_AMT_DUE,INFLOW_OUTFLOW,COMPONENT_TYPE,
	PAY_CONF_STATUS,PAY_CONF_MAKER_ID,PAY_CONF_MAKER_DT_STAMP,NETTING_STATUS,NETTING_TIMESTAMP,
	SETTLED_STATUS
  from lbtbs_outflow_amount_due
  )
/
create OR REPLACE synonym lbvws_cashflow_amount_due for lbvw_cashflow_amount_due
/