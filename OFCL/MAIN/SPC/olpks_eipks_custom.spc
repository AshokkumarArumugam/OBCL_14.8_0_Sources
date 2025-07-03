CREATE OR REPLACE PACKAGE olpks_eipks_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_eipks_custom.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
**SFR Number         :
**Changed By         :
**Change Description :
**Search String      :
------------------------------------END CHANGE HISTORY-------------------------------------
*/

	FUNCTION FN_PRE_MARK_STATUS(branch IN VARCHAR2,
                   eoc_group  IN VARCHAR2,
                   app_date   IN DATE,
                   retmsgcode IN OUT VARCHAR2,
                   param      IN OUT VARCHAR2) RETURN BOOLEAN; 
	
	FUNCTION FN_POST_MARK_STATUS(branch IN VARCHAR2,
                   eoc_group  IN VARCHAR2,
                   app_date   IN DATE,
                   retmsgcode IN OUT VARCHAR2,
                   param      IN OUT VARCHAR2) RETURN BOOLEAN;  
	
END olpks_eipks_custom;
/


CREATE or replace SYNONYM olpkss_eipks_custom FOR olpks_eipks_custom
/