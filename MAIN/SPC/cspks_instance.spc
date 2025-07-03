create or replace package cspks_instance is
/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
------------------------------------------------------------------------------------------
*/
/*
------------------------------------------------------------------------------------------*/
/*

Change Histroy

31-Dec-2008    FC UBS 10.2.0.0.0.0.2 BM Changes  Created By         : Shashank
						 Created On         : 31-Dec-2008
						 Created Reason     : Thread VDBAL in EOFI PF-061
						 Retro Reference    : 10.2Emrel-SourceChangeTracker.xls/Change List/PF-061
						 Search String      : FC10 Performance Change PF-061
						 

*/

g_instname varchar2(16);
g_instnum PLS_INTEGER;
function get_instname return varchar2;
function get_instnum return number;
end;
/
CREATE OR REPLACE SYNONYM cspkss_instance FOR cspks_instance
/