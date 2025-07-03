CREATE OR REPLACE FORCE VIEW SMVW_DASH_DETAILS AS
/*------------------------------------------------------------------------------------------
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
-------------------------------------------------------------------------------------*/
SELECT USER_ID,
       FUNCTION_ROLE_ID FUNCTION_ID,
       CAST('' AS VARCHAR2(1000)) DESCRIPTION,
       SEQUENCE_NO,
       DASHBD_WHERE_CLAUSE,
       SHOW_IN_DASHBOARD
FROM   SMTB_DASHBOARD_DETAILS
/
CREATE OR REPLACE SYNONYM SMVWS_DASH_DETAILS FOR   SMVW_DASH_DETAILS
/