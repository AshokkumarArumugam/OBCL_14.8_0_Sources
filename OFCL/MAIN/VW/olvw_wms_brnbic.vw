CREATE OR REPLACE FORCE VIEW olvw_wms_brnbic(
				IDENTIFIER,
				OPERATION_CODE,
				BRANCH_CODE,            
				BIC_CODE,               
				CUSTOMER_NO,            
				SK_ARRANGEMENT,         
				GEN_MT103,              
				GEN_MT103P,             
				USE_SMALL_FX,           
				CUST_DD_MSG_PREF,       
				BANK_DD_MSG_PREF,       
				RTGS_MEMBER,            
				RTGS_BIC,
				MOD_NO
				)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_wms_brnbic.VW
**
** Module       : INTERFACES
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
02-JUN-2005	SFR PLC46180002 NEW VIEW

  **Changed By         : Reghuraj Vadakkedath
  **Date               : 19-FEB-2021
  **Change Description : OLTM_BRANCH_BIC changes
  **Search String      : Bug#31825782
*/
			SELECT 
				'#BRNBIC#',
				' ',
				global.current_branch BRANCH_CODE,   --Bug#31825782  added current_branch       
				BIC_CODE,               
				CUSTOMER_NO,            
				SK_ARRANGEMENT,         
				GEN_MT103,              
				GEN_MT103P,            
				NULL USE_SMALL_FX,           --Bug#31825782     added NULL
				NULL CUST_DD_MSG_PREF,       --Bug#31825782     added NULL
				NULL BANK_DD_MSG_PREF,       --Bug#31825782     added NULL
				NULL RTGS_MEMBER,            --Bug#31825782     added NULL
				NULL RTGS_BIC,               --Bug#31825782     added NULL
				NULL MOD_NO                  --Bug#31825782     added NULL
			FROM
				OLTM_BIC_DIRECTORY --Bug#31825782  -- commended OLTM_BRANCH_BIC
/
CREATE OR REPLACE SYNONYM olvws_wms_brnbic FOR olvw_wms_brnbic
/