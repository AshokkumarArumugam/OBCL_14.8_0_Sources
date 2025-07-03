create or replace package IFPKS_MSG_INCOMING_CORE as
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2002 - 2010  Oracle and/or its affiliates.  All rights reserved.
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

Changed By          : 
Changed On          : 
Change Description  : 
Search string       : 
-----------------------------------------------------------------*/

PROCEDURE PR_EMS_LOG(
                        P_START_DATE         IN      VARCHAR2,
                        P_STOP_DATE          IN      VARCHAR2,
                        P_TECHFLAG           IN      VARCHAR2,
                        P_DIRECTION          IN      VARCHAR2,
                        P_KEY                IN OUT  VARCHAR2,
                        P_ERR                OUT     VARCHAR2
                    );

PROCEDURE PR_EMS_MSG_COUNTER(
								P_KEY             IN OUT VARCHAR2,
								P_MEDIA           IN     VARCHAR2,
								P_DIRECTION       IN      VARCHAR2,
								P_ERR             OUT    VARCHAR2
							);
							
END IFPKS_MSG_INCOMING_CORE;
/
DROP SYNONYM IFPKSS_MSG_INCOMING_CORE
/
CREATE SYNONYM IFPKSS_MSG_INCOMING_CORE FOR IFPKS_MSG_INCOMING_CORE
/