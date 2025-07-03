CREATE OR REPLACE PACKAGE olpks_revn_job AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_revn_job.SPC
**
** Module		: LOANS and DEPOSITS
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


PROCEDURE PR_REVN_JOB(
	pm_job		integer,
	pm_node		varchar2,
	pm_module	Varchar2
	);

END olpks_revn_job;
/
create or replace  synonym olpkss_revn_job for olpks_revn_job
/