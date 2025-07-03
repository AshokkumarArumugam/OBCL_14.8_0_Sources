CREATE OR REPLACE PACKAGE  lfpks_class
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_class.spc
**
** Module       : INTEREST, COMMISSION, CHARGES, FEES (ICCF)
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
CHANGE HISTORY:
26-JULY-2004 FCC 4.6 RETRO FROM 4.3 (03-01-2002 Derivatives related changes done.)
				    (09-MAR-2000 DERIVATIVES4.0 1.1 Added leg type as IN parameter.)

----------------------------------------------------------------------------------------------------
*/


FUNCTION fn_amount_tag_insert
(
pMODULE			IN		SMTBS_MODULES.MODULE_ID%type,
pCLASS_CODE		IN 		oltms_class.CLASS_CODE%type,
p_leg_type		IN		lftms_interest_class.leg_type%TYPE,
pBASIS_AMT_TYPE	IN		VARCHAR2,
pERROR_CODE 	IN OUT	ERTBS_MSGS.ERR_CODE%type
)
RETURN BOOLEAN;

FUNCTION fn_amount_tag_insert
(
pMODULE		IN	SMTBS_MODULES.MODULE_ID%type, 
pCLASS_CODE	IN 	oltms_class.CLASS_CODE%type,
pBASIS_AMT_TYPE	IN	VARCHAR2,
pERROR_CODE 	IN OUT	ERTBS_MSGS.ERR_CODE%type	
) 
RETURN BOOLEAN;

FUNCTION fn_acc_role_insert
(
pMODULE	 		IN		SMTBS_MODULES.MODULE_ID%type,
pCLASS_CODE		IN 		oltms_class.CLASS_CODE%type,
p_leg_type		IN		lftms_interest_class.leg_type%TYPE,
pERROR_CODE 	IN OUT	ERTBS_MSGS.ERR_CODE%type
)
RETURN BOOLEAN;

FUNCTION fn_acc_role_insert
(
pMODULE	 	IN	SMTBS_MODULES.MODULE_ID%type, 
pCLASS_CODE	IN 	oltms_class.CLASS_CODE%type,
pERROR_CODE 	IN OUT	ERTBS_MSGS.ERR_CODE%type
)
RETURN BOOLEAN;

END lfpks_class;
/
CREATE or replace SYNONYM lfpkss_class FOR  lfpks_class
/