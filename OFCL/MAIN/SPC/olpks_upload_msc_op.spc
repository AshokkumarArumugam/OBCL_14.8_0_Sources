CREATE OR REPLACE PACKAGE olpks_upload_msc_op
IS
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
	FUNCTION fn_ldupload_auth
		(	p_external_ref_no in varchar2
		,	p_contract_ref_no in OUT varchar2
		,	p_errcode		in out varchar2
		,	p_params		in out varchar2
		)
	RETURN BOOLEAN;

	FUNCTION fn_ldupload_delete
		(	p_external_ref_no in varchar2
		,	p_contract_ref_no in OUT varchar2
		,	p_errcode		in out varchar2
		,	p_params		in out varchar2
		)
	RETURN BOOLEAN;

	FUNCTION fn_ldupload_reverse
		(	p_external_ref_no in varchar2
		,	p_contract_ref_no in OUT varchar2
		,	p_auth_status	IN VARCHAR2
		,	p_errcode		in out varchar2
		,	p_params		in out varchar2
		)
	RETURN BOOLEAN;

	FUNCTION fn_ldupload_rollover
		(	p_external_ref_no in varchar2
		,	p_contract_ref_no in OUT varchar2
		,	p_auth_status	IN VARCHAR2
		,	p_errcode		in out varchar2
		,	p_params		in out varchar2
		)
	RETURN BOOLEAN;

END olpks_upload_msc_op;
/
CREATE or replace SYNONYM olpkss_upload_msc_op FOR olpks_upload_msc_op
/