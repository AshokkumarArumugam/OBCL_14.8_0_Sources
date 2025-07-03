CREATE OR REPLACE package lfpks_services2 is
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_services2.SPC
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


FUNCTION fn_get_tea(p_contract_ref_no IN oltbs_contract_master.contract_ref_no%type,
			  p_fullprepmt IN varchar2 default 'N',					    		
			  p_tea  OUT number
				)			  
		    return boolean;

FUNCTION fn_get_tep(p_contract_ref_no IN oltbs_contract_master.contract_ref_no%type,
			  p_fullprepmt IN varchar2 default 'N',
                    p_tep  OUT number
				 )
		    return boolean;

FUNCTION fn_get_teac(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
		    		p_teac  OUT number  )
		    return boolean;
		    
FUNCTION fn_copy_treasury_rate(p_treasury_group  IN VARCHAR2,
                               p_rate_code       IN VARCHAR2,
   			             p_ccy_code        IN VARCHAR2,
                               p_old_eff_date    IN DATE,
                               p_new_eff_date    IN DATE,
                               p_rate_code_usage IN VARCHAR2,
                               pm_err_code	 IN OUT	ertbs_msgs.err_code%TYPE,
			             pm_params	       IN OUT	VARCHAR2)
RETURN boolean;

end lfpks_services2; 
/
create or replace synonym lfpkss_services2 for lfpks_services2
/