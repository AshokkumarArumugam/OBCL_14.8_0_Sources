CREATE OR REPLACE FORCE VIEW MSVW_DLY_MSG_ACK_NCK_NOTIF AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2019 - 2019  Oracle and/or its affiliates.  All rights reserved.
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
SELECT   A.ARCHIVAL_DATE,
	A.DCN,
	A.RUNNING_NO,
	A.ORIGINAL_MSG_DCN,
	A.ORIGINAL_MSG_TYPE,
	A.RECONCILIATION_REFERENCE,
	A.RECEIVE_DT_TM,
	TO_CLOB(NULL) AS MESSAGE,
	A.MODULE_GROUP_ID
FROM MSTB_DLY_MSG_ACK_NCK_NOTIF	A
/
CREATE OR REPLACE SYNONYM MSVWS_DLY_MSG_ACK_NCK_NOTIF FOR MSVW_DLY_MSG_ACK_NCK_NOTIF
/