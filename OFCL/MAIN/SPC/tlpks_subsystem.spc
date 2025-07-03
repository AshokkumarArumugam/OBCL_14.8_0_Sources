CREATE OR REPLACE PACKAGE tlpks_subsystem IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	:tlpks_subsystem.SPC
**
** Module	:LT - SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------
CHANGE HISTORY
12-JUN-2008 FLEXCUBE V.CL Release 7.4 new unit created to handle the settlement pickup in Secondary loan trading
13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes
---------------------------------------------------------------------------------------------------
*/
FUNCTION Fn_settlement_pickup
	(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	P_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
	P_module		IN 	oltbs_contract.module_code%TYPE,
	P_Error_code		IN OUT	VARCHAR2,	
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_pop_ticket_contractis
	(
	P_ticket_id		IN	tltbs_ticket_master.ticket_id%TYPE,
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	P_error_code		IN OUT	VARCHAR2,
	P_error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes start
FUNCTION Fn_pop_consol_pmt_contractis
(
	P_contract_ref_no	IN			tltbs_contract_master.contract_ref_no%TYPE,
	P_error_code			IN OUT	VARCHAR2,
	P_error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes end

END tlpks_subsystem;
/
CREATE or replace SYNONYM tlpkss_subsystem FOR tlpks_subsystem
/