CREATE OR REPLACE PACKAGE Olpks_Batch_Custom AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Batch_Custom.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :

  -------------------------------------------------------------------------------------------------------
  */

 FUNCTION Fn_Process_Atomic_Task_batch(p_Module                 IN Oltbs_Contract.Module_Code%TYPE,
                                  p_Current_Accrual_Ref_No IN OUT Oltbs_Auto_Function_Details.Current_Accrual_Ref_No%TYPE,
                                  p_Processing_Date        IN DATE,
                                  p_Process_Name           IN Oltbs_Automatic_Process_Master.Process_Name%TYPE,
                                  p_Product                IN Oltbs_Contract.Product_Code%TYPE,
                                  p_Commit_Frequency       IN Oltbs_Automatic_Process_Master.Bod_Commit_Count%TYPE,
                                  p_Task_Rowid             IN ROWID,
                                  p_Processor_Seq_No       IN INTEGER,
                                  p_Error_Code             IN OUT VARCHAR2,
                                  p_Error_Parameter        IN OUT VARCHAR2)
    RETURN BOOLEAN;
	
	  FUNCTION fn_pre_process_atomic_task(
	p_module						IN		oltbs_contract.module_code%TYPE,
	p_current_accrual_ref_no		IN OUT	oltbs_auto_function_details.current_accrual_ref_no%TYPE,
	p_processing_date				IN		DATE,
	p_process_name					IN		oltbs_automatic_process_master.process_name%TYPE,
	p_product						IN		oltbs_contract.product_code%TYPE,
	p_commit_frequency				IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
	p_task_rowid					IN		ROWID,
	p_processor_seq_no				IN		INTEGER,
	p_error_code					IN OUT	VARCHAR2,
	p_error_parameter				IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
	
   FUNCTION fn_post_process_atomic_task(
	p_module						IN		oltbs_contract.module_code%TYPE,
	p_current_accrual_ref_no		IN OUT	oltbs_auto_function_details.current_accrual_ref_no%TYPE,
	p_processing_date				IN		DATE,
	p_process_name					IN		oltbs_automatic_process_master.process_name%TYPE,
	p_product						IN		oltbs_contract.product_code%TYPE,
	p_commit_frequency				IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
	p_task_rowid					IN		ROWID,
	p_processor_seq_no				IN		INTEGER,
	p_error_code					IN OUT	VARCHAR2,
	p_error_parameter				IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

END Olpks_Batch_Custom;
/
create or replace synonym Olpkss_Batch_Custom for Olpks_Batch_Custom
/