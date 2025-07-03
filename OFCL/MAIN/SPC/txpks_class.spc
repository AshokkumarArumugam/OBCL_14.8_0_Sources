CREATE OR REPLACE PACKAGE  txpks_class
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : txpks_class.SPC
**
** Module       : CORE
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



FUNCTION fn_tag_insert
(
pMODULE		IN		SMTBS_MODULES.MODULE_ID%type, 
pCLASS_CODE		IN 		oltms_class.CLASS_CODE%type,
pTAX_BASIS		IN		oltms_class.TAX_BASIS%type,
pERROR_CODE 	IN OUT	ERTBS_MSGS.ERR_CODE%type	
) 
RETURN BOOLEAN;


FUNCTION fn_role_insert
(
pMODULE	 	IN		SMTBS_MODULES.MODULE_ID%type, 
pCLASS_CODE		IN 		oltms_class.CLASS_CODE%type,
pTAX_BASIS		IN		oltms_class.TAX_BASIS%type,
pBORNE_BY		IN		txtms_tran_tax_class.BORNE_BY%type,
pCASH			IN		txtms_tran_tax_class.CASH_OUTFLOW_INDICATOR%type,
pERROR_CODE 	IN OUT	ERTBS_MSGS.ERR_CODE%type
)
RETURN BOOLEAN;

END txpks_class;
/
CREATE or replace SYNONYM txpkss_class FOR  txpks_class
/