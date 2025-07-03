CREATE OR REPLACE FORCE VIEW olvw_wms_cifmisaddr(
				IDENTIFIER,
				OPERATION_CODE,
				CUSTOMER,               
				FEDWIRE_NO,             
				CITINY_ACC_NO,          
				CHIPS_PARTICIPANT_ID,
				CHIPS_UNIVERSAL_ID,     
				BIC_RECV_CORR,  
				MOD_NO
				)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_wms_cifmisaddr.VW
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
02-JUN-2005	SFR PLC46180002 NEW VIEW
*/
			SELECT 
				'#CIFMISADDR#',
				' ',
				CUSTOMER,               
				FEDWIRE_NO,             
				CITINY_ACC_NO,          
				CHIPS_PARTICIPANT_ID,
				CHIPS_UNIVERSAL_ID,     
				BIC_RECV_CORR,          
				MOD_NO
			FROM
				OLTM_CIF_MISC_ADDR
/
CREATE OR REPLACE SYNONYM olvws_wms_cifmisaddr FOR olvw_wms_cifmisaddr
/