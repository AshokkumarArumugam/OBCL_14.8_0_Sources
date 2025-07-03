create or replace PACKAGE olpks_24x7_process AS

  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_24x7_process.spc
  **
  ** Module : OL
  **
  This source is part of the Oracle Banking Corporate Lending  Software Product.
  Copyright © 2019  Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  CHANGE HISTORY:

  ** Name			          : Olpks_24x7_Process
  ** Author			        : Chandra Prasath.N
  ** Date               : 12-May-2021
  ** Description 				: Created for 24/7 operation

  ** Changed By         : 
  ** Changed On         : 
  ** Search String      : 
  ** Change Reason      : 
	
  ----------------------------------------------------------------------------------------------------
  */
	
	FUNCTION fn_log_inact_contract_rec (
		p_source             IN VARCHAR2,
		p_function_id        IN VARCHAR2,
		p_action_code        IN VARCHAR2,
		p_contract_ref_no    IN oltbs_contract.contract_ref_no%type,
		p_event_seq_no   	   IN oltbs_contract_master.event_seq_no%type,
		p_err_code IN OUT VARCHAR2,
		p_err_params IN OUT VARCHAR2
	) RETURN BOOLEAN;

END olpks_24x7_process;
/
CREATE OR REPLACE SYNONYM olpkss_24x7_process for olpks_24x7_process
/