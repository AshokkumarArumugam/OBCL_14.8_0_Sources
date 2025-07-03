CREATE OR REPLACE PACKAGE GWPKS_CLOB_UTIL
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2016 Oracle and/or its affiliates.  All rights reserved.
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
----------------------------------------------------------------------------
 CHANGE HISTORY
*/
AS

    -------------------------------------------------------------------------------

    PROCEDURE PR_CREATE_CLOB (p_clob  OUT CLOB);

    -------------------------------------------------------------------------------

END GWPKS_CLOB_UTIL;
/
CREATE OR REPLACE SYNONYM GWPKSS_CLOB_UTIL FOR GWPKS_CLOB_UTIL
/