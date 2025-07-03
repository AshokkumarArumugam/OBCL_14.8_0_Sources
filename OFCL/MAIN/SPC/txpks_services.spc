create or replace package txpks_services is
/*----------------------------------------------------------------------------------------------------
**
** File Name    : txpks_services.SPC
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
/*  Change History
    ---------------
    25-Jul-2003 FCC4.3 	AUG2003 TIDE Changes - Currency Added.
    05-APR-2004	FCC4.5	MAY2004	Domicile Changes. Nationality Added
	
**Changed By         : Sowmya Bitra
**Date               : 22-April-2023
**Change Description : ECA Support for TAX
**Search String      : OBCL_14.8_ECA_Changes
*/


function fn_copy_rule(	old_rowid 		in out	varchar2,
				l_rule 				txtms_rule.rule_code%type, 
				l_effective_date 	in 		txtms_rule.effective_date%type, 
				l_customer 		in		txtms_rule.customer%type,
				l_country 		in		txtms_rule.country%type, 
				l_cust_tax_group 	in		txtms_rule.cust_tax_group%type,
				l_currency		in		txtms_rule.currency%type,
				l_nationality	IN		txtms_rule.nationality%TYPE
			) --25-Jul-2003 FCC4.3 AUG2003 TIDE Changes
return boolean; -- fcc4.2 ceemea change

--OBCL_14.8_ECA_Changes Start
FUNCTION Fn_Process_Eca_For_Tax(p_contract_ref_no IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_module          IN Oltbs_Contract.Module_Code%TYPE,
                                p_value_date      IN DATE,
                                p_event_code      IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                                p_mode            IN Char,
                                p_Err_Code        IN OUT VARCHAR2,
                                p_Err_Params      IN OUT VARCHAR2) 
RETURN BOOLEAN;
--OBCL_14.8_ECA_Changes End

end;
/
CREATE OR REPLACE SYNONYM txpkss_services FOR txpks_services
/