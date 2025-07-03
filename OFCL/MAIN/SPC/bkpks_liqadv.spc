CREATE OR REPLACE PACKAGE bkpks_liqadv
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : bkpks_liqadv.SPC
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




Function  fn_brliq_adv(msg_out_rec in oltbs_dly_msg_out%rowtype)
          Return Boolean;

procedure pr_ins;

END bkpks_liqadv;
/
CREATE or replace SYNONYM bkpkss_liqadv for bkpks_liqadv
/