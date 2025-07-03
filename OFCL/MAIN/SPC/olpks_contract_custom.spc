CREATE OR REPLACE PACKAGE olpks_contract_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_contract_custom.SPC
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
	
	**Changed By         : Ramya M
    **Date               : 18-May-2023
    **Change Description : Added hook for Create_New_Version
    **Search String      : Bug#35356873
------------------------------------END CHANGE HISTORY-------------------------------------
*/


	FUNCTION Fn_Pre_Create_New_Version(p_Ldtbs_Contract_Master_Rec IN Oltbs_contract_master%ROWTYPE,
                                 p_Update_Cstb               IN VARCHAR2 DEFAULT 'Y',
                                 p_Replicate_Sch_Defn        IN VARCHAR2 DEFAULT 'Y',
                                 p_New_Event_Seq_No          IN NUMBER,
								 p_Wrk_Oldtronl              IN Olpks_Oldtronl_Main.Ty_Oldtronl default  null)
    RETURN BOOLEAN ;
	
	FUNCTION Fn_Post_Create_New_Version(p_Ldtbs_Contract_Master_Rec IN Oltbs_contract_master%ROWTYPE,
                                 p_Update_Cstb               IN VARCHAR2 DEFAULT 'Y',
                                 p_Replicate_Sch_Defn        IN VARCHAR2 DEFAULT 'Y',
                                 p_New_Event_Seq_No          IN NUMBER,
								 p_Wrk_Oldtronl              IN Olpks_Oldtronl_Main.Ty_Oldtronl default  null)  
    RETURN BOOLEAN ;

END olpks_contract_custom;
/
CREATE or replace SYNONYM olpkss_contract_custom FOR olpks_contract_custom
/