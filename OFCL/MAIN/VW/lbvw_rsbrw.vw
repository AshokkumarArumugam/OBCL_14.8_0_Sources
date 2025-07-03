CREATE OR REPLACE FORCE VIEW lbvw_rsbrw AS
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
SELECT CONTRACT_REF_NO,COMPONENT,SPLIT_SERIAL_NO,SPLIT_NUMBER,EVENT_SEQ_NO,EVENT_CODE,PROCESSING_STATUS,SEQ_NO,RATE,RATE_CODE,RATE_FIXING_DATE,PROCESSED_SEQ_NO,CAST(NULL AS VARCHAR2(1000)) CRN_LST,
CAST(NULL AS VARCHAR2(1000)) COMP_LST,CAST(NULL AS VARCHAR2(1000)) SPLIT_SER_LST,CAST(NULL AS VARCHAR2(1000)) SPLIT_NO_LST
FROM LBTBS_AUTO_RATE_BROWSER
/
create OR REPLACE synonym LBVWS_RSBRW for lbvw_rsbrw
/