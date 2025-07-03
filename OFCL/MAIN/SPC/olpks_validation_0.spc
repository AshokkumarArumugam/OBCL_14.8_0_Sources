CREATE OR REPLACE PACKAGE olpks_validation_0
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_validation_0.SPC
**
** Module		: MI
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

----------------------------------------------------------------------------------------------------
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
*/



FUNCTION Fn_mis_validation(
				   Pm_unit_ref_no			  oltbs_class_mapping.Unit_ref_no%TYPE,
				   Pm_unit_type			  oltbs_class_mapping.Unit_type%TYPE,
				   Pm_Branch_code			  oltbs_class_mapping.Branch_code%TYPE,
				   --Pm_ac_no				  Sttms_cust_account.Cust_ac_no%TYPE, -- OFCL12.2 Not required
				   Pm_ac_no				  oltb_account.ac_gl_no%TYPE,
				   Pm_ac_or_gl			  oltbs_account.Ac_or_gl%TYPE,
				   Pm_err_code		IN OUT  Varchar2,
				   Pm_err_param		IN OUT  Varchar2				   
				   )
RETURN BOOLEAN;

END;
/