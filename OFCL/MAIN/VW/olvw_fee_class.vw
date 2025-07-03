create or replace view olvw_fee_class
(auth_stat,record_stat,module,component,component_description,fee_basis,fee_calc_basis,DCF_category,status_tracking_reqd,stop_association,fee_type) AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_fee_class.vw
** Module       : LD
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Created by : K.PRIYADARSHINI
Created Date : 28-DEC-2016
Purpose : Summary Screen of TLDFEECL screen
*/
select a.auth_stat,
       a.record_stat,
       b.module,
       b.component,
       b.component_description,
       b.fee_basis,
       b.fee_calc_basis,
       b.DCF_category,
       b.status_tracking_reqd,
       b.stop_association,
       b.fee_type
FROM   oltms_class a,
       tltms_fee_class  b
WHERE  a.MODULE = b.MODULE AND a.CLASS_CODE = b.COMPONENT
/
create or replace synonym olvws_fee_class for olvw_fee_class
/