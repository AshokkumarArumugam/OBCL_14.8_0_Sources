CREATE OR REPLACE PACKAGE olpks_auto_woff 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_auto_woff.SPC
** Module	: LOANS AND DEPOSITS
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

/*------------------------------------------CHANGE HISTORY----------------------------------
DATE			VERSION NO			CODE DESCRIPTION

22-APR-2003 	1.0 				FCC 4.2 OPS Changes - New package created to automatically liquidate LD components
									if they are less than or equal to the minimum write off amount maintained.
------------------------------------------END CHANGE HISTORY-------------------------------------------------------------
*/



FUNCTION	fn_auto_woff_liquidate
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_product_type 		IN		oltbs_contract.product_type%TYPE,
	p_product_code		IN		oltbs_contract.product_code%TYPE,
	p_ccy				IN		oltbs_contract.contract_ccy%TYPE,
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_value_date 		IN		DATE,
	p_limit_date		IN		DATE,
	p_auto_manual		IN		VARCHAR2,
	p_err_code			IN OUT	VARCHAR2,
	p_err_param			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

---------------------------------------------------------------------------------------------------------------------------
								--END OF PACKAGE DECLARATION--
---------------------------------------------------------------------------------------------------------------------------
END olpks_auto_woff;
/
create or replace synonym olpkss_auto_woff for olpks_auto_woff
/