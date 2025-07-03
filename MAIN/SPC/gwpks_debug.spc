CREATE OR REPLACE PACKAGE gwpks_debug
AS
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
-------------------------------------------------------------------------------------------*/

/*
CHANGE_HISTORY
05-MAY-2006     FC UBS V.UM 7.2.0.0.0.0.0 lot1		NEW		Package for writing the debug in the messaging layer

*/


PROCEDURE pr_init_dbg	(p_req_ref_no	IN		VARCHAR2);

PROCEDURE pr_dbg	(p_msg		IN		VARCHAR
								,p_level		IN		NUMBER		DEFAULT 0);

PROCEDURE pr_close_dbg;

END gwpks_debug;
/
CREATE OR REPLACE SYNONYM gwpkss_debug FOR gwpks_debug
/