CREATE OR REPLACE PACKAGE lfpks_charge_cluster AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lfpks_charge_cluster.SPC
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


FUNCTION fn_apply_for_a_event
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_event					IN		oltbs_contract.curr_event_code%TYPE,
	p_amendment_event		IN		boolean,
	p_value_date			IN		date,
	p_deal_ccy				IN		oltbs_contract.contract_ccy%TYPE,
	p_counterparty			IN		oltbs_contract.counterparty%TYPE,
	p_txn_account			IN		oltb_account.ac_gl_no%TYPE,
	p_association_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_association_product	IN		oltbs_contract.product_code%TYPE,
	p_list_of_party_types	IN		varchar2,
	p_list_of_partys		IN		varchar2,
	p_list_of_amount_tags	IN		varchar2,
	p_list_of_amount_ccys	IN		varchar2,
	p_list_of_amounts		IN		varchar2,
	p_fn_call_id            IN      NUMBER,
	p_Tb_cluster_data       IN OUT  GLOBAL.Ty_Tb_cluster_Data,
	p_error_code			IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
RETURN BOOLEAN;

END lfpks_charge_cluster;
/


CREATE or replace SYNONYM lfpkss_charge_cluster FOR lfpks_charge_cluster
/