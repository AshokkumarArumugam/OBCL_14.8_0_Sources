Create Or Replace FORCE View lbvw_intrst_margin_rates
As 
/*----------------------------------------------------------------------------------------------------
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
----------------------------------------------------------------------------------------------------
*/
Select M.CONTRACT_REF_NO, M.COMPONENT, M.MARGIN_COMPONENT, I.VALUE_DATE , M.EVENT_SEQ_NO, M.MARGIN_RATE
 From lftbs_contract_interest_detail I, lftbs_contract_margin_detail M
Where I.CONTRACT_REF_NO = M.CONTRACT_REF_NO
  And I.COMPONENT       = M.COMPONENT
  And I.VALUE_DATE      = M.VALUE_DATE
  And M.VALUE_DATE = (Select Max(VALUE_DATE)
                          From lftbs_contract_margin_detail
                         Where CONTRACT_REF_NO = M.CONTRACT_REF_NO
                           And COMPONENT       = M.COMPONENT
                           And MARGIN_COMPONENT = M.MARGIN_COMPONENT
                           And VALUE_DATE       <= I.value_date)
  And M.EVENT_SEQ_NO = (Select Max(EVENT_SEQ_NO)
                          From lftbs_contract_margin_detail
                         Where CONTRACT_REF_NO = M.CONTRACT_REF_NO
                           And COMPONENT       = M.COMPONENT
                           And MARGIN_COMPONENT = M.MARGIN_COMPONENT
                           And VALUE_DATE       = M.VALUE_DATE) 
/

CREATE OR REPLACE SYNONYM lbvws_intrst_margin_rates FOR lbvw_intrst_margin_rates
/