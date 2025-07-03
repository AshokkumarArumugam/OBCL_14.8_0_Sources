CREATE OR REPLACE FORCE VIEW STVW_COTM_USER_DETAILS as 
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2018 - 2018  Oracle and/or its affiliates.  All rights reserved.
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
************************************************Change History********************************************************
**  Log Number        : 
**  Modified By       : Poornachandran R
**  Modified On       : 11-04-2018
**  Created  Reason   : 14.1 MASKING - SMDUSRDF LOV to be masked.
**  Search String     : FCUBS14.1_MASK
****************************************************************************************************************************
*/
SELECT * FROM COTM_USER_DETAILS
/
CREATE OR REPLACE SYNONYM STVWS_COTM_USER_DETAILS FOR COTM_USER_DETAILS
/