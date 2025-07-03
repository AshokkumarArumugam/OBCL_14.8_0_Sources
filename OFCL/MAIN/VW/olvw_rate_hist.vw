CREATE OR REPLACE VIEW olvw_rate_hist AS
SELECT branch_code,
/*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : olvw_rate_hist.vw
     **
     ** Module     : Oracle Lending
     **
     ** This source is part of the Oracle Banking Software Product.
     ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2021.  All rights reserved
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
     -------------------------------------------------------------------------------------------------------
     CHANGE HISTORY 
	 **Changed By         : Revathi Dharmalingam
     **Date               : 03-NOV-2021
     **Change Description : Created new view for FX Variation Changes 
     **Search String      : OBCL_14.5_FX_Variation Changes
	 --------------------------------------------------------------------------------------------------------
*/
       ccy1 ,
       ccy2 ,
       rate_type,
       rate_date, 
       mid_rate,
       buy_rate,
       sale_rate,
       rate_serial       
FROM cytms_rates
WHERE int_auth_stat ='A'
UNION ALL
SELECT branch_code ,
       ccy1 ,
       ccy2 ,
       rate_type,
       rate_date, 
       mid_rate,
       buy_rate,
       sale_rate,
       rate_serial
FROM cytbs_rates_history
/

CREATE OR REPLACE SYNONYM olvws_rate_hist FOR olvw_rate_hist
/