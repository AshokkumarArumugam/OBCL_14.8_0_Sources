CREATE OR REPLACE PACKAGE olpks_workflow_1 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_workflow_1.SPC
**
** Module	: LOANS and DEPOSITS
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

	g_contract_ref_no		oltbs_contract.contract_ref_no%TYPE;
	g_event_seq_no		oltbs_contract.latest_event_seq_no%TYPE;
	g_err_list			VARCHAR2(32767);
	g_err_param_list		VARCHAR2(32767);

PROCEDURE	pr_process_contracts
			(
			p_seq	IN	INTEGER
			);

END olpks_workflow_1;
/
CREATE or replace SYNONYM olpkss_workflow_1 FOR olpks_workflow_1
/