CREATE OR REPLACE FORCE VIEW olvw_wms_cusmis (
				IDENTIFIER,
				OPERATION_CODE,
				CUSTOMER,
				MIS_GROUP,
				CUST_MIS_1,
				CUST_MIS_2,
				CUST_MIS_3,
				CUST_MIS_4,
				CUST_MIS_5,
				CUST_MIS_6,
				CUST_MIS_7,
				CUST_MIS_8,
				CUST_MIS_9,
				CUST_MIS_10,
				COMP_MIS_1,
				COMP_MIS_2,
				COMP_MIS_3,
				COMP_MIS_4,
				COMP_MIS_5,
				COMP_MIS_6,
				COMP_MIS_7,
				COMP_MIS_8,
				COMP_MIS_9,
				COMP_MIS_10,
				--PLC46180001 CHANGES STARTS
				DR_REF_RATE_CODE,				
				DR_REF_SPREAD,          
				CR_REF_RATE_TYPE,
				DR_REF_RATE_TYPE,
				VERSION_NO --PLC46180001 CHANGES ENDS
				)
AS

/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_wms_cusmis.VW
**
** Module       : INTERFACES
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
06-Feb-2004	SFR PLC44070022	New unit in 4.4 taken from 4.3 baseline
01-JUN-2005	SFR PLC46180001 ADDED NEW COLUMNS
*/
			SELECT 
				'#CUSMIS#',
				' ',
				CUSTOMER,
				MIS_GROUP,
				CUST_MIS_1,
				CUST_MIS_2,
				CUST_MIS_3,
				CUST_MIS_4,
				CUST_MIS_5,
				CUST_MIS_6,
				CUST_MIS_7,
				CUST_MIS_8,
				CUST_MIS_9,
				CUST_MIS_10,
				COMP_MIS_1,
				COMP_MIS_2,
				COMP_MIS_3,
				COMP_MIS_4,
				COMP_MIS_5,
				COMP_MIS_6,
				COMP_MIS_7,
				COMP_MIS_8,
				COMP_MIS_9,
				COMP_MIS_10,
				--PLC46180001 CHANGES STARTS
				DR_REF_RATE_CODE, 
				DR_REF_SPREAD,          
				CR_REF_RATE_TYPE,
				DR_REF_RATE_TYPE,
				VERSION_NO
				--PLC46180001 CHANGES ENDS
			FROM 	oltms_customer_default
/
CREATE OR REPLACE SYNONYM olvws_wms_cusmis FOR olvw_wms_cusmis
/