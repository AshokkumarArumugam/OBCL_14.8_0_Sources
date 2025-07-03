CREATE OR REPLACE PACKAGE cspks_composite_handler AS
  /*------------------------------------------------------------------------------------------
   **
   ** This source is part of the Oracle FLEXCUBE Software Product.
   ** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
------------------------------------------------------------------------------------------
*/
/*
----------------------------------------------------------------------
  CHANGE HISTORY:
  ---------------
  
  SFR No             :Initial Version
  Changed By         :Jayanth
  Change Description :Package to parse the composite payload into individual payloads and
                      and call the respective routing packages
                      
  Log No             :2
  Search String      :Log#2 
  Changed Date       :20-May-2010
  Change Description :Storing the Process stage Audit details                                            
  -------------------------------------------------------------------------------------*/
  /* Log#2 Changes Starts */
  TYPE ty_process_audit IS RECORD(
    workflow_ref_no       VARCHAR2(50),
    stage_functionId    VARCHAR2(50),
    priority            VARCHAR2(1) default 'L',
    prev_remarks    VARCHAR2(255),
    remarks     VARCHAR2(255),
    stage_outcome  VARCHAR2(50),
    --12.0.2 changes start here
    reason_code     VARCHAR2(50),
    reason_desc     VARCHAR2(2000)
    --12.0.2 changes end here
    );
  TYPE ty_tbl_process_audit IS TABLE OF ty_process_audit INDEX BY VARCHAR2(50);
  gProcessAudit ty_tbl_process_audit;  
  /* Log#2 Changes Ends */    
  PROCEDURE pr_process_complex_req_msg(p_is_req_clob       IN VARCHAR2,
                                       p_req_xml_str       IN OUT VARCHAR2,
                                       p_req_xml_clob      IN OUT CLOB,
                                       p_instr_xml         IN OUT VARCHAR2,
                                       p_is_res_clob       OUT VARCHAR2,
                                       p_res_xml_str       OUT VARCHAR2,
                                       p_res_xml_clob      OUT CLOB,
                                       p_process_status    OUT VARCHAR2,
                                       p_ty_biz_msg_header IN OUT gwpks_service_router.ty_biz_process_header,
                                       p_ty_proc_instr     IN OUT gwpks_service_router.ty_processing_instructions,
                                       p_err_code          IN OUT VARCHAR2,
                                       p_err_param         IN OUT VARCHAR2);
END cspks_composite_handler;
/
CREATE SYNONYM cspkss_composite_handler FOR cspks_composite_handler
/