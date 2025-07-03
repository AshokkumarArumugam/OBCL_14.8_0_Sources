CREATE OR REPLACE PACKAGE olpks_iccf_utils
as
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_iccf_utils.SPC
**
** Module       : Interest and Charges
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
/*
CHANGE HISTORY

27-NOV-2003 FCC 4.4 DEC 2003 Negative Interest Rate Changes
*/

FUNCTION FN_GET_INT_RATE
   (PREF_NO  VARCHAR2,
    PESN     NUMBER,
    PCOMPONENT VARCHAR2) 
RETURN NUMBER;

FUNCTION FN_GET_RATECODE
   (PREF_NO  VARCHAR2,
    PESN     NUMBER,
    PCOMPONENT VARCHAR2) 
RETURN VARCHAR2;

FUNCTION FN_GET_SPREAD
   (PREF_NO  VARCHAR2,
    PESN     NUMBER,
    PCOMPONENT VARCHAR2) 
RETURN NUMBER;
--
--27-NOV-2003 FCC 4.4 DEC 2003 Negative Interest Rate Changes
--
FUNCTION FN_GET_INT_RATE_SIGN
   (PREF_NO  VARCHAR2,
    PESN     NUMBER,
    PCOMPONENT VARCHAR2) 
RETURN VARCHAR2;
--
--27-NOV-2003 FCC 4.4 DEC 2003 Negative Interest Rate Changes
--

--
--FCC 4.4 DEC 2003 ITR2 
--
FUNCTION FN_GET_FMT_INT_RATE
   (PREF_NO  VARCHAR2,
    PESN     NUMBER,
    PCOMPONENT VARCHAR2) 
RETURN VARCHAR2;
--
--FCC 4.4 DEC 2003 ITR2 
--

--
--FCC 4.4 DEC 2003 ITR2 
--
FUNCTION CSFN_FMT_INTERESTRATE
     (
     p_interest_rate IN NUMBER
     )
RETURN VARCHAR2;
--
--FCC 4.4 DEC 2003 ITR2 
--
pragma restrict_references(FN_GET_INT_RATE,WNDS);
pragma restrict_references(FN_GET_RATECODE,WNDS);
pragma restrict_references(FN_GET_SPREAD,WNDS);
pragma restrict_references(FN_GET_INT_RATE_SIGN,WNDS);

END olpks_iccf_utils;
/