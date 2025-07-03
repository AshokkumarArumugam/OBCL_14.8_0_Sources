CREATE OR REPLACE PACKAGE OVPKS_ADDON AS
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
**    Changed By          : Ajai
**    Changed On          : 23-Jun-2014
**    Search String       : Bug#19045505
**    Change Description  : size of G_TREATMENT to be increased to VARCHAR2(30) as same length
**              of func_id in ERTB_OVD_CONV. 
**  Modified By       : Hima bindu patil
**   Modified On       : 09-May-2015
**   Modified Reason   : 12.1 change added source_code to pr_init
**   Search String     : 12.1 changes
------------------------------------------------------------------------------------------
*/
--G_TREATMENT VARCHAR2(10); --Bug#19045505
 G_TREATMENT ERTBS_OVD_CONV.func_id%type;--Bug#19045505

PROCEDURE PR_INIT(P_BRN VARCHAR2,P_TREATMENT_ID VARCHAR2,P_SOURCE_CODE VARCHAR2 DEFAULT 'FLEXCUBE'); --12.1 change added p_source_code
FUNCTION FN_RET_OVD_CODE(P_IN_OVD VARCHAR2) RETURN VARCHAR2;

END OVPKS_ADDON;
/
CREATE OR REPLACE SYNONYM OVPKSS_ADDON FOR OVPKS_ADDON
/