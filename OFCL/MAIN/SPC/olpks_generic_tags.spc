CREATE OR REPLACE PACKAGE olpks_generic_tags AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_generic_tags
**
** Module       : CORE SERVICES
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
-- FBMEUAT - TIL NO. 101

	FUNCTION fn_put_bank_name_and_addr (pDCN IN VARCHAR2) 
		RETURN BOOLEAN;
	FUNCTION fn_branch_addr ( pBranch IN VARCHAR2, pBranchAddr IN OUT VARCHAR2) 
		RETURN BOOLEAN;
	FUNCTION fn_bank_name (pBankName IN OUT VARCHAR2) 
		RETURN BOOLEAN;
END olpks_generic_tags;
/
CREATE or replace SYNONYM olpkss_generic_tags FOR olpks_generic_tags
/