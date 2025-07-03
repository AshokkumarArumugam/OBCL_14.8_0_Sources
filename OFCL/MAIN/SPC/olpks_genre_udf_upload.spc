CREATE OR REPLACE PACKAGE olpks_genre_udf_upload  --FCC V.CL 7.3 UK CONSOLIDATION RETRO
AS										--FCC V.CL 7.3 UK CONSOLIDATION RETRO
/*----------------------------------------------------------------------------------------------------

This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
FUNCTION fn_udf_upload
	(
	p_function_id		IN		oltms_upload_udf_vals.function_id%TYPE,
	p_rec_key			IN		oltms_upload_udf_vals.rec_key%TYPE,
	p_err_code			IN OUT	varchar2,
	p_err_params		IN OUT	varchar2
	)
RETURN BOOLEAN;
FUNCTION fn_process_records
	(
		p_for_udf_upload	IN OUT	oltms_upload_udf_vals%ROWTYPE,
		p_err_code			IN OUT	varchar2,
		p_err_params		IN OUT	varchar2
	)
RETURN BOOLEAN;

-- PLNCITI Til No 3487 Starts
FUNCTION fn_udf_upload
	(
	p_function_id		IN		oltms_upload_udf_vals.function_id%TYPE,
	p_err_code			IN OUT	varchar2,
	p_err_params		IN OUT	varchar2
	)
RETURN BOOLEAN;
-- PLNCITI Til No 3487 Ends

END olpks_genre_udf_upload;
/