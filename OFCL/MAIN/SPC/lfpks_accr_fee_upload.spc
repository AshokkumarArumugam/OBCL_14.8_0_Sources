CREATE OR REPLACE PACKAGE lfpks_accr_fee_upload
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_accr_fee_upload.SPC
**
** Module       : CF
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
CHANGE HISTORY
18-June-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-118
21-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR2 SFR#24, New function fn_insert_accr_fee is added
*/


	FUNCTION fn_accr_fee_upload (   pSource         IN              VARCHAR2,
					pBranch         IN              VARCHAR2,
                                        pModule         IN              VARCHAR2,
                                        pSourceRef              IN              VARCHAR2,
                                        pContractRef    IN              VARCHAR2,
                                        pErrCode                IN OUT  VARCHAR2,
                                        pParam          IN OUT  VARCHAR2
                                     )
	RETURN BOOLEAN;
	--21-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR2 SFR#24 start
	FUNCTION fn_insert_accr_fee
	(
		p_module   			IN		oltbs_contract.module_Code%TYPE,  
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
		p_error_code			IN OUT		VARCHAR2,
		p_error_parameter		IN OUT		VARCHAR2
	)
	RETURN BOOLEAN;
	--21-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR2 SFR#24 End
END lfpks_accr_fee_upload;
/
CREATE or replace SYNONYM lfpkss_accr_fee_upload FOR lfpks_accr_fee_upload
/