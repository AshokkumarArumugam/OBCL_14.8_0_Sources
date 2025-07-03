CREATE OR REPLACE FORCE VIEW STVW_CORE_REQ_MASTER_ALL
AS 
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
----------------------------------------------------------------------------------------------------*/
 SELECT  rm.msgid,
        rm.process_seq_no,
        rm.destination_SYSTEM,
        rm.service_code,
        rm.keyid,
        rm.comm_mode,
        rm.req_type,
        rm.forceprocess,
        rm.process_status,
        rm.log_time,
        rm.auth_stat,
        rm.maker_id,
        rm.maker_dt_stamp,
        rm.checker_id,
        rm.checker_dt_stamp,
        rm.function_id,
        rm.ext_status,       
        rm.retry_count,      
         rm.module,
        rm.source_seq_no,
        nvl(rm.process_ref, sp.ext_group_no) PROCESS_REF,
        sp.ext_service_name,
        sp.ext_operation_code,
        sp.auto_auth,
        sp.ext_action,
        sp.ext_source_seq_no,
        sp.queue_func_id,
        sp.ext_group_no,
        sp.ext_grp_order_no,
		rm.branch_code
FROM    STTB_CORE_REQ_MASTER rm,
        IFTM_CORE_SERVICE_PARAMS sp,
		IFTM_CORE_EXT_SERVICE_MASTER sm 
WHERE   rm.destination_SYSTEM = sp.TARGET_SYSTEM
AND     rm.destination_SYSTEM = sm.EXTERNAL_SYSTEM
AND     rm.retry_count <= nvl(sm.MAX_retry_count,0)
AND     rm.service_code       = sp.service_code
AND     sp.record_stat        = 'O'
AND     sp.once_auth          = 'Y'
/
CREATE OR REPLACE SYNONYM STVWS_CORE_REQ_MASTER_ALL FOR STVW_CORE_REQ_MASTER_ALL
/