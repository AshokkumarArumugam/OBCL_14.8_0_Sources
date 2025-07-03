CREATE OR REPLACE VIEW IFVW_CORE_SERV_LOG_DTL AS
/*------------------------------------------------------------------------------------------
     **
     ** File Name  : IFVW_CORE_SERV_LOG_DTL.vw
     **
     ** Module     : IF
     **
     ** This source is part of the Oracle FLEXCUBE Software Product.
     ** Copyright (R) 2021 , Oracle and/or its affiliates.  All rights reserved
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
----------------------------------------------------------------------------------------------------
*/
select concat(substr(DECODE(a.error_codes,'null~','Err',a.error_codes),1,instr(a.error_codes,'~')-1),(substr(a.response_xml,INSTR(a.response_xml,'desc',1,1)+5
            ,INSTR(substr(a.response_xml,INSTR(a.response_xml,'desc',1,1)+5),',"',1,1)-1))) ERROR_DETAILS,
       a.msgid MSGID,
       a.seq_no SEQ_NO
FROM  iftb_core_service_log_details a,sttb_core_req_master b
WHERE a.msgid=b.msgid
AND  a.seq_no=b.process_seq_no
AND a.REQ_SERIAL_NO = (SELECT MAX(C.REQ_SERIAL_NO) FROM iftb_core_service_log_details C WHERE c.msgid=b.msgid AND c.seq_no=b.process_seq_no )
/
CREATE OR REPLACE SYNONYM IFVWS_CORE_SERV_LOG_DTL FOR IFVW_CORE_SERV_LOG_DTL
/
