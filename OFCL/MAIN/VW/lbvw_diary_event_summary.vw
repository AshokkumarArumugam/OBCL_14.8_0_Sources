CREATE OR REPLACE FORCE VIEW lbvw_diary_event_summary AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_diary_event_summary.VW
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
----------------------------------------------------------------------------------------------------
Change History 
	28-mar-2006 Flexcube V.CL Release 7.0 Backoffice Related Changes,Darshana
---------------------------------------------------------------------------------------------------
*/
SELECT A.CONTRACT_REF_NO,A.DIARY_EVENT_SEQ_NO,
   A.DIARY_EVENT_SUB_SEQ_NO,A.DIARY_EVENT_CODE,
   A.EFFECTIVE_DATE,A.STATUS,A.RECORD_STAT,
  A.AUTH_STAT, B.BRANCH, B.DEPARTMENT_CODE,
   B.TREASURY_SOURCE
FROM oltbs_contract_diary_status A ,oltbs_contract B
WHERE A.CONTRACT_REF_NO=B.CONTRACT_REF_NO
/
CREATE OR REPLACE  SYNONYM lbvws_diary_event_summary FOR lbvw_diary_event_summary
/