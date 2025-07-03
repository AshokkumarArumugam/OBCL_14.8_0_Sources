CREATE OR REPLACE PACKAGE olpks_workflow_4
AS
/*-----------------------------------------------------------------------------------------
**
** File Name	: olpks_workflow_4.SQL
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------------------------------------
CHANGE HISTORY

15-MAY-2003	FCC 4.2 OPS focus testing changes 
-------------------------------------------------------------------------------------
*/
FUNCTION fn_contract_liquidation_ops
      (
      p_contract_ref_no		IN OUT   	oltbs_contract.contract_ref_no%TYPE,
      p_event_seq_no		IN OUT   	oltbs_contract_event_log.event_seq_no%TYPE,
      p_funcid         		IN       	smtbs_menu.function_id%TYPE,
      p_value_date     		IN OUT   	DATE,
      p_error_code     	 	IN OUT   	VARCHAR2,
	p_error_parameter	    	IN OUT	VARCHAR2
      )
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
--
--FCC 4.2 OPS focus testing changes start
--
FUNCTION fn_save_contract_amendment_ops
      (
      p_contract_ref_no		IN    	oltbs_contract.contract_ref_no%TYPE,
      p_event_seq_no		IN    	oltbs_contract.latest_event_seq_no%TYPE,
      p_version_no		IN		oltbs_contract.latest_version_no%TYPE,
      p_new_credit_line		IN		oltbs_contract_master.credit_line%TYPE,
      p_old_credit_line		IN		oltbs_contract_master.credit_line%TYPE,
      p_prod_type			IN		oltbs_contract_master.product_type%TYPE,
      p_value_date     		IN 		oltbs_contract_master.value_date%TYPE,
      p_error_code     	 	IN OUT   	VARCHAR2,
	p_error_parameter	    	IN OUT	VARCHAR2
      )
RETURN BOOLEAN;
--
--FCC 4.2 OPS focus testing changes end
--
END olpks_workflow_4;
/
CREATE or replace SYNONYM olpkss_workflow_4 FOR olpks_workflow_4
/