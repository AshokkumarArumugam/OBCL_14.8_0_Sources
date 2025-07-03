CREATE OR REPLACE force VIEW olvw_dept_workflow
		(
		 DEPARTMENT_CODE,
		 BATCH_NO,
		 WORKFLOW_STATUS
		)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_dept_workflow.VW
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
/*
Change History
S.No.	Release			Date		Description
------------------------------------------------------------------------------
1.	4.2 ITR1 SFR 628	21/04/03	Added JI work flow status to the view.	
*/
SELECT DEPARTMENT_CODE,
       BATCH_NO,
       DECODE(MIN(DECODE(NVL(Workflow_status,'IN'),'IN',1,'JE',1,'JS',1,'JA',1,'JI',1,'AU',2,'OL',3,'OL',4)),
	      1,'IN',2,'AU',3,'OL',4,'OL') WORKFLOW_STATUS
FROM   oltbs_jrnl_log_de
GROUP BY DEPARTMENT_CODE,BATCH_NO
/
create or replace synonym olvws_dept_workflow for olvw_dept_workflow
/