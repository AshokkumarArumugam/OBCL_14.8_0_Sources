create or replace package bkpks_adv as
/*----------------------------------------------------------------------------------------------------
**
** File Name    : bkpks_adv.SPC
**
** Module       : BROKERAGE
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/




function bradv_input ( p_dly_msg_cur in out olpkss_messaging.module_proc_curtype)
        return boolean;


end bkpks_adv;
/
create or replace synonym bkpkss_adv for bkpks_adv
/