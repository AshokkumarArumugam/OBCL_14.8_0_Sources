CREATE OR REPLACE force VIEW lfvw_product_iccf ( PRODUCT, 
EVENT, COMPONENT, COMPONENT_SERIAL_NO, COMPONENT_DESCRIPTION, 
RULE, BASIS_AMOUNT_TYPE, BASIS_AMOUNT_CATEGORY, ACCRUAL_REQUIRED, 
ACCRUAL_CURRENCY, CHANGE_DURING_AMENDMENT, RATE_CODE_USAGE, RATE_TYPE, 
RATE_CODE, SHOWN_IN_CONTRACT_MAIN_SCREEN, SETTLEMENT_CURRENCY, STOP_APPLICATION, 
INTEREST_BASIS, BASIS_AMOUNT_TAG ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lfvw_product_iccf.VW
**
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY:
CitiLatam Retro SFR 4 29-Oct-2001
			 	    Number of columns in the select clause was matched with that of create clause
*/
(Select distinct 					                       		-- SFR 4 change  starts
i.PRODUCT, 
i.EVENT, i.COMPONENT, i.COMPONENT_SERIAL_NO, i.COMPONENT_DESCRIPTION, 
i.RULE, i.BASIS_AMOUNT_TYPE, i.BASIS_AMOUNT_CATEGORY, i.ACCRUAL_REQUIRED, 
i.ACCRUAL_CURRENCY, i.CHANGE_DURING_AMENDMENT, i.RATE_CODE_USAGE, i.RATE_TYPE, 
i.RATE_CODE, i.SHOWN_IN_CONTRACT_MAIN_SCREEN, i.SETTLEMENT_CURRENCY, i.STOP_APPLICATION, 
i.INTEREST_BASIS,						                     	-- SFR 4 change ends
decode(t.amount_tag_type,'I',
substr(i.basis_amount_type,1,instr(basis_amount_type,'_',-1)-1),'PRINCIPAL') basis_amount_tag
From lftms_product_iccf i, oltbs_amount_tag t
Where i.basis_amount_type=t.amount_tag
)
/
create or replace synonym lfvws_product_iccf for lfvw_product_iccf
/