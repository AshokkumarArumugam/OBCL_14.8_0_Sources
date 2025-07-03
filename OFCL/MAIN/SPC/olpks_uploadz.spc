CREATE OR REPLACE PACKAGE olpks_uploadz
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_uploadz.SPC
**
** Module       : Mi
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

/*	CHANGE HISTORY  
02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE  added one more new function fn_upload_mis for usiing the PL-SQL tables
29-JUL-2003 FCC 4.3 Aug 2003 Function fn_plc_dly_refrate_upload added.
*/


	FUNCTION fn_upload	(	p_source_code	IN		VARCHAR2
					,	p_external_ref_no	IN		VARCHAR2
					,	p_contract_ref_no	IN		VARCHAR2
					,	perr			IN OUT	VARCHAR2
					,	pprms			IN OUT	VARCHAR2
					)
	RETURN BOOLEAN;

	FUNCTION fn_getmis_rec	(	p_source_code	IN		VARCHAR2
					,	p_external_ref_no	IN		VARCHAR2
					,	p_contract_ref_no	IN		VARCHAR2
					,	p_misrec		OUT		oltbs_class_mapping%ROWTYPE
					,	perr			IN OUT	VARCHAR2
					,	pprms			IN OUT	VARCHAR2
					)
	RETURN BOOLEAN;
--02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE
	FUNCTION FN_UPLOAD_MIS 
				(
			 	 p_cube_ref_no		IN		VARCHAR2,
				 p_mis_rec			IN		oltbs_upload_class_mapping%ROWTYPE,
				 p_mitb_dly_ref_rates	IN		oltbs_dly_refinance_rates%ROWTYPE,
				 p_error_code		IN OUT 	VARCHAR2,
				 p_error_parameter	IN OUT	VARCHAR2
				)
	RETURN BOOLEAN;
--02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE	

-- FCC 4.3 Aug 2003 Citiplc Til No PLC0411006 starts here
	FUNCTION fn_plc_dly_refrate_upload
	RETURN BOOLEAN;
-- FCC 4.3 Aug 2003 Citiplc Til No PLC0411006 ends here

END olpks_uploadz;
/
create or replace synonym olpkss_uploadz for olpks_uploadz
/