CREATE OR REPLACE PACKAGE olpks_reprice_job AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_reprice_job.SPC
**
** Module		: LOANS AND DEPOSIT
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
/*------------------------------------------CHANGE HISTORY----------------------------------
DATE		VERSION NO	CODE		DESCRIPTION

------------------------------------END CHANGE HISTORY-----------------------------------------------------------
*/



  FUNCTION Fn_Job_Start(p_Error_Code IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Job_Stop(p_Error_Code IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_reprice_job;
/
create or replace SYNONYM olpkss_reprice_job FOR olpks_reprice_job
/