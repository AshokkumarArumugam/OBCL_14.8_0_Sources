CREATE OR REPLACE PACKAGE olpks_msg_vals
AS
/*-------------------------------------------------------------------------------------------------------------------
**
** File Name	: 	olpks_msg_vals.SPC
**
** Module		: 	SETTLEMENTS (IS)
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
------------------------------------------------------------------------------------------------------------------
*/
---------------------------------------------------------------------------------------------------------------
/*--CHANGE HISTORY

15-12-2004	FCC 4.6	CITIPLC	PLC46060005	Unit taken from london 441 prod baseline
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes
	29-aug-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#175 Changes
	06/07/2004		CITIPLC PLC44130049 	New Unit Introduced for Validations.
	
*/
---------------------------------------------------------------------------------------------------------------

FUNCTION	fn_validate_msg_fields
	(
	p_contract_record		IN		oltbs_contract%ROWTYPE,
	p_contractis_record	IN		oltbs_contractis_cs%ROWTYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
END olpks_msg_vals;
/
CREATE or replace SYNONYM olpkss_msg_vals FOR olpks_msg_vals
/