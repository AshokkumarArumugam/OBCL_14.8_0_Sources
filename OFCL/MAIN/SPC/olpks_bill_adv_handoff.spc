CREATE OR REPLACE PACKAGE olpks_bill_adv_handoff
AS
/*----------------------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_bill_adv_handoff.SQL
  **
  ** Module       : MESSAGING SUBSYSTEM
  **
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------

CHANGE_HISTORY
15-JUL-2009: CITIPBG TILL#155 New package for Billing handoff.
*/
----------------------------------------------------------------------------------------------------

	FUNCTION fn_pop_hoff_bills (
					file_name     IN     VARCHAR2,
					dir_name      IN     VARCHAR2,
					error_code    OUT    VARCHAR2,
					error_param   OUT    VARCHAR2
				    )
	RETURN BOOLEAN;

	PROCEDURE pr_log_bill_details(p_dcn VARCHAR2,
				p_msg_type VARCHAR2,
					p_errcode VARCHAR2,
					p_errparam VARCHAR2);

	FUNCTION fn_make_case_letter (
					p_str IN VARCHAR2
				     )
	RETURN VARCHAR2;

END olpks_bill_adv_handoff;
/