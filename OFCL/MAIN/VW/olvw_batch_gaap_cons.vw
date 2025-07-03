CREATE OR REPLACE force VIEW olvw_batch_gaap_cons
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_batch_gaap_cons.VW
**
** Module      : Data Entry
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
SELECT 
	   BRANCH_CODE, DEPARTMENT_CODE, BATCH_NO,GAAP_INDICATOR,
	   ALL_REAL_DR + REAL_DR REAL_DR,
	   ALL_REAL_CR + REAL_CR REAL_CR,
	   ALL_CONT_CR + CONT_CR CONT_CR,
	   ALL_CONT_DR + CONT_DR CONT_DR 
 FROM OLTB_BATCH_DETAIL
 WHERE gaap_indicator <> 'AL'
/
create or replace synonym olvws_batch_gaap_cons for olvw_batch_gaap_cons
/