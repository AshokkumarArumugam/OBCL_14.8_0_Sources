Create Or Replace FORCE View lbvw_margin_rates
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
Select A.* From lftbs_contract_margin_detail A
Where A.EVENT_SEQ_NO = (Select Max(EVENT_SEQ_NO)
                          From lftbs_contract_margin_detail
                         Where CONTRACT_REF_NO = A.CONTRACT_REF_NO
                           And COMPONENT       = A.COMPONENT
                           And MARGIN_COMPONENT = A.MARGIN_COMPONENT
                           And VALUE_DATE       = A.VALUE_DATE) 
/

CREATE OR REPLACE SYNONYM lbvws_margin_rates FOR lbvw_margin_rates
/