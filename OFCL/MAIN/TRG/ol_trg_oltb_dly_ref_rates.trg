CREATE OR REPLACE TRIGGER ol_trg_oltb_dly_ref_rates
/*----------------------------------------------------------------------------------------------------
**
** File Name	: ol_trg_oltb_dly_ref_rates.trg
**
** Module      : Mis
**
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form 
**  or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated
**  in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
**
**  Changed By         :Akhila Samson
**  Changed on         :27-Jun-2023
**  Change Description :Changing to editioning view name instead of synonym.
**  Search String      :Bug#35222052
*/
/* Added / in the file
*/

AFTER INSERT OR UPDATE ON --oltbs_dly_refinance_rates --Bug#35222052
oltb_dly_refinance_rates --Bug#35222052
FOR EACH ROW
WHEN (NEW.REF_RATE_TYPE = 'X')
BEGIN
	IF :NEW.eff_date < global.application_date THEN
		UPDATE oltbs_unit_head_det
		SET	daily_processed_flag = 'N'
		WHERE	branch_code = :new.branch_code
		AND unit_ref_no = :new.unit_ref_no
		AND value_date >= :new.eff_date;
	END IF;
END;
/