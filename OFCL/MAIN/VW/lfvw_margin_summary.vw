CREATE OR REPLACE VIEW LFVW_MARGIN_SUMMARY 
(CONTRACT_REF_NO,CUSTOMER_NO,CUSTOMER_NAME,COMPONENT,BRANCH_CODE,AUTH_STAT,RECORD_STAT)
/* ----------------------------------------------------------------------------------------------------
**
** File Name	: LFVW_MARGIN_SUMMARY.VW
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
	
	Changed By         : Sowmya Bitra
	Date               : 02-Dec-2022
	Change Description : Adding customer name in summary screen
	Search String      : 34718509
	
	Changed By         : Mohan Pal
	Date               : 10-Oct-2023
	Change Description : Adding outer join to include customer as 'ALL'
	Search String      : Bug#35887681
---------------------------------------------------------------------------------------------------- 
*/
AS
(
  SELECT
    A.CONTRACT_REF_NO,
    A.CUSTOMER_NO,
   -- B.CUSTOMER_NAME1 CUSTOMER_NAME,----Bug#35887681 COMMENTED
    nvl(B.CUSTOMER_NAME1,'ALL') CUSTOMER_NAME,----Bug#35887681 ADDED
    A.COMPONENT,
    A.BRANCH_CODE,
    A.AUTH_STAT,
    A.RECORD_STAT
  FROM LFTMS_MARGIN_COMPONENT A, OLTMS_CUSTOMER B
--  WHERE A.CUSTOMER_NO = B.CUSTOMER_NO---Bug#35887681 COMMENTED
 WHERE A.CUSTOMER_NO = B.CUSTOMER_NO(+)---Bug#35887681 ADDED
)
/
CREATE OR REPLACE SYNONYM LFVWS_MARGIN_SUMMARY FOR LFVW_MARGIN_SUMMARY
/