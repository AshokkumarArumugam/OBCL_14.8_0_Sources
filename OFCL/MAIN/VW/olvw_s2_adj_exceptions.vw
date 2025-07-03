CREATE OR REPLACE FORCE VIEW olvw_s2_adj_exceptions
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_s2_adj_exceptions.vw
**
** Module	: INTERFACE
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
** 
  ----------------------------------------------------------------------------------------
  */ 
select 
a.S2_SR_NO sr_no      
,a.ADJUSTMENT_TYPE                
,a.AMOUNT                         
,a.PRICE                          
,a.COMMMENT                       
,a.HYPERION_CODE                  
,a.REVERSING_FLAG                 
,a.EFF_ADJ_DATE                   
,a.CUSIP_NO                       
,a.EXPENSE_CODE                   
,a.FIRM_ACCOUNT_MNEMONIC          
,a.CURRENCY                       
,a.FC_CONTRACT_ID                 
,'IF-UPLD-000' error_code
,b.error_msg
from TLTB_S2_ADJUSTMENTS a, TLTB_S2_ADJ_UPLD_ERR b
WHERE a.upload_pop_status ='F'
AND a.upload_seq_no = b.upload_seq_no
AND a.upload_Date = NVL(to_Date((select param_Val from cstb_param where param_name='S2_UPLOAD_DATE')),trunc(fn_ol_sysdate))
UNION ALL
select 
a.S2_SR_NO sr_no      
,a.ADJUSTMENT_TYPE                
,a.AMOUNT                         
,a.PRICE                          
,a.COMMMENT                       
,a.HYPERION_CODE                  
,a.REVERSING_FLAG                 
,a.EFF_ADJ_DATE                   
,a.CUSIP_NO                       
,a.EXPENSE_CODE                   
,a.FIRM_ACCOUNT_MNEMONIC          
,a.CURRENCY                       
,a.FC_CONTRACT_ID                 
,C.error_code
,c.ERROR_PARAMETERS error_msg
from TLTB_S2_ADJUSTMENTS a ,OLTB_UPLOAD_ADJUSTMENT b , oltbs_upload_adj_exception c
WHERE b.status ='F'
AND   a.fc_contract_id   = b.contract_Ref_no
AND   a.book_date        = b.book_date
AND   a.sl_no            = b.serial_no   
AND   b.rowid            = c.UPL_ROWID
AND   b.contract_ref_no  = c.contract_Ref_no
AND   b.batch_no         = c.batch_no
AND a.upload_Date = NVL(to_Date((select param_Val from cstb_param where param_name='S2_UPLOAD_DATE')),trunc(fn_ol_sysdate))
/
CREATE OR REPLACE SYNONYM olvws_s2_adj_exceptions 
FOR olvw_s2_adj_exceptions
/