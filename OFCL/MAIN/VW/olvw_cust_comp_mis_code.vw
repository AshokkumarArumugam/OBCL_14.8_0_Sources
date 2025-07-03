CREATE OR REPLACE VIEW OLVW_CUST_COMP_MIS_CODE(CUSTOMER_NO,MIS_GROUP,COMP_MIS_1,COMP_MIS_2,COMP_MIS_3,COMP_MIS_4,COMP_MIS_5,COMP_MIS_6,COMP_MIS_7,COMP_MIS_8,
COMP_MIS_9,COMP_MIS_10) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_cust_comp_mis_code.vw
**
** Module       : OL										
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2020, Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
  Changed By         : Balaji Gopal
  Changed on         : 17-Aug-2023
  Change Description : New view created to default Customer MIS Composite Code from common core table MITM_CORE_CUSTOMER_DEFAULT.
  Search string	     : Bug#35686648 
------------------------------------------------------------------------------------------------*/

    SELECT
        CUSTOMER_NO,
		NULL MIS_GROUP,
        COMP_MIS_1,
        COMP_MIS_2,
        COMP_MIS_3,
        COMP_MIS_4,
        COMP_MIS_5,
        COMP_MIS_6,
        COMP_MIS_7,
        COMP_MIS_8,
        COMP_MIS_9,
        COMP_MIS_10
    FROM
        MITM_CORE_CUSTOMER_DEFAULT
/

CREATE OR REPLACE SYNONYM OLVWS_CUST_COMP_MIS_CODE FOR OLVW_CUST_COMP_MIS_CODE
/