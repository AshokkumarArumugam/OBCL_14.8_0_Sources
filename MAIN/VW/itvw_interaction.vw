create or replace force view ITVW_INTERACTION AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2011 - 2012  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
------------------------------------------------------------------------------------------*/
select * from ittm_interaction where assigned_to in (SELECT distinct(role_id) from smtb_user_role where user_id = global.user_id
union select global.user_id from dual) 
AND status <> 'C'
order by u_r_flag desc,
decode(status,'O',1,'R',2,'W',3,'P',4,'C',5),
decode(severity,'H',1,'M',2,'L',3)
/
CREATE OR REPLACE SYNONYM ITVWS_INTERACTION FOR ITVW_INTERACTION
/
