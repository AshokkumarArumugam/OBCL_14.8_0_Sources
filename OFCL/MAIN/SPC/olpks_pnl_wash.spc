CREATE OR REPLACE PACKAGE olpks_pnl_wash
AS

/* ----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_pnl_wash.SQL
**
** Module	: INTERFACES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
---------------------------------------------------------------------------------------------------- 
*/

--FCC V.CL 7.3 UK CONSOLIDATION RETRO 
-- FCC-7.3-RETRO-CITIUK-4.4-RETRO#117 
/*
05-MAY-2004	PLC44080051 Added PNL wash for MM also.
*/
FUNCTION 	fn_pnl_wash
		(	p_branch_code		IN		VARCHAR2
		--FCC V.CL 7.3 UK CONSOLIDATION RETRO STARTS
		--FCC-7.3-RETRO-CITIUK-4.4-RETRO#117 Start
		,	p_module		IN		VARCHAR2--FCC 4.4 05-MAY-2004 PLC44080051
		-- FCC-7.3-RETRO-CITIUK-4.4-RETRO#117 End
		--FCC V.CL 7.3 UK CONSOLIDATION RETRO ENDS
		,	p_err_codes  		IN OUT		VARCHAR2
		,	p_err_params 		IN OUT		VARCHAR2
		)	RETURN BOOLEAN;

END olpks_pnl_wash;
/
CREATE or replace SYNONYM olpkss_pnl_wash FOR olpks_pnl_wash
/