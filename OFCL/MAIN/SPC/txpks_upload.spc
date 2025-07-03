CREATE OR REPLACE PACKAGE txpks_upload
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : txpks_upload.SPC
**
** Module       : UPLOAD
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



FUNCTION fn_upload_tax
	(
	p_branch_code		IN	lftbs_upload_interest.branch_code%TYPE,
	p_source_code		IN	lftbs_upload_interest.source_code%TYPE,
	p_source_ref		IN	lftbs_upload_interest.source_ref%TYPE,
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

END txpks_upload;
/
CREATE OR REPLACE SYNONYM txpkss_upload FOR txpks_upload
/