CREATE OR REPLACE FORCE VIEW tlvw_trade_settelment_lqt
AS
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :tlvw_trade_settelment_lqt.VW 
**  
**  Module    :LT-Loan Trading
**  
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
---------------------------------------------------------------------------------------
*/
/*---------------------------------CHANGE HISTORY-----------------------------------------------
22-MAY-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#13458 Missing Retro changes
15-Jun-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#13939 System was not generating Trade Settlement Reversal message to LQT as part of Trade settlement reversal.
*/
SELECT  a.contract_ref_no,A.actual_settl_date,B.maker_id
,TO_CHAR(b.maker_dt_stamp,'DD-MON-RRRR HH24:MI:SS') maker_dt_stamp
--15-Jun-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#13939 changes Starts
,(SELECT decode(x.contract_status,'L','P','A','R',x.contract_status) FROM oltbs_contract x WHERE contract_ref_no	=	a.contract_ref_no)trade_status
--15-Jun-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#13939 Changes Ends
from TLTB_SETTLEMENT_MASTER A,OLTB_CONTRACT_EVENT_LOG B
where  A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
AND A.EVENT_SEQ_NO = B.EVENT_SEQ_NO
AND A.EVENT_SEQ_NO = (SELECT MAX(C.EVENT_SEQ_NO) FROM TLTB_SETTLEMENT_MASTER C WHERE C.CONTRACT_REF_NO=A.CONTRACT_REF_NO)
/
CREATE OR REPLACE SYNONYM tlvws_trade_settelment_lqt FOR tlvw_trade_settelment_lqt --22-MAY-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#13458, Changes
/