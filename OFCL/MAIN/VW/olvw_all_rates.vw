create or replace force view olvw_all_rates as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_rates.VW
** Module	: CORE SERVICES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
select BRANCH_CODE,CCY1,CCY2,RATE_TYPE,MID_RATE,
       BUY_SPREAD,SALE_SPREAD,BUY_RATE,SALE_RATE,UNAUTH_MID_RATE,UNAUTH_BUY_SPREAD,
       UNAUTH_SALE_SPREAD,UNAUTH_BUY_RATE,UNAUTH_SALE_RATE,INT_AUTH_STAT
from   cytm_rates
union
select BRANCH_CODE,CCY1,CCY2,RATE_TYPE,MID_RATE,BUY_SPREAD,
       SALE_SPREAD,BUY_RATE,SALE_RATE,UNAUTH_MID_RATE,UNAUTH_BUY_SPREAD,
       UNAUTH_SALE_SPREAD,UNAUTH_BUY_RATE,UNAUTH_SALE_RATE,
       INT_AUTH_STAT
from   cytm_derived_rates
/