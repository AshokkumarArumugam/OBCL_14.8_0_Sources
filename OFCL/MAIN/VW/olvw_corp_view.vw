CREATE OR REPLACE VIEW olvw_corp_view AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_corp_view.vw
**
** Module       : OL										
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2020, Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------

  **Created By         : Arunadevi Rajendran
  **Date               : 18-Jan-2020
  **Change Description : Corporate customer view

*/
SELECT CUSTOMER_NO,
CUSTOMER_TYPE,
CUSTOMER_NAME1,
'' Currency,
cast('' as number) Total_Loan,
cast('' as number) Total_Comittment,
cast('' as number) Total_Syndication,
cast('' as number) SELECTED_INDEX
FROM OLTM_CUSTOMER
/
create or replace synonym olvws_corp_view for olvw_corp_view
/