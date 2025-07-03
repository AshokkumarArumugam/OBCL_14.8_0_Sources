CREATE OR REPLACE PACKAGE tlpks_advices AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlpks_advices.SPC
**
** Module	: LT
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

/* Change history
--01-AUG-2008 FLEXCUBE V.CL Release 7.4 SLT Changes, fmemo advice generation function has been added, by Maneeha
28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07, Trading Flat Changes
*/
------------------------------------------------------------------------------------------------------

FUNCTION fn_genmsg
	(
	p_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	P_event_seq_no		IN	tltbs_settlement_master.event_seq_no%TYPE,
	p_contrec		IN	oltbs_contract%rowtype,
	P_Error_code		IN OUT	VARCHAR2,
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_pop_fmem_advices
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE,
	p_error_code		IN OUT	ERTBS_MSGS.ERR_CODE%TYPE
	)
RETURN BOOLEAN;
--28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 changes start
FUNCTION	fn_pop_dcf_liqd_advice(
								p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE,
								p_error_code		IN OUT	ERTBS_MSGS.ERR_CODE%TYPE
								)
RETURN BOOLEAN;
--28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 changes end

END tlpks_advices;
/
CREATE or replace SYNONYM tlpkss_advices FOR tlpks_advices
/