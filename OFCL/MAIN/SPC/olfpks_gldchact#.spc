CREATE OR REPLACE PACKAGE UDFPKS_GLDCHACT# AS
/*----------------------------------------------------------------------------------------------------

This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

ELEM_GL_CODE VARCHAR2(4000);
UDF_AFFILIATECODE VARCHAR2(4000);
UDF_ESCROWTYPE VARCHAR2(4000);
UDF_EXCLTGLHOFF VARCHAR2(4000);
UDF_EXCLUDEFROMDBS VARCHAR2(4000);
UDF_GENESISBALTYPE VARCHAR2(4000);
UDF_INDIRECTGL VARCHAR2(4000);
UDF_INSTRUMENT_TYPE VARCHAR2(3);
UDF_INTERCOMPANY_CODE VARCHAR2(3);
UDF_LOCALACC VARCHAR2(4000);
UDF_NABPRODCAT VARCHAR2(4000);
UDF_NOSTRO_CIF VARCHAR2(4000);
UDF_PALCAT VARCHAR2(4000);
UDF_PRODCAT VARCHAR2(4000);
UDF_SUB_PROD_ID VARCHAR2(4000);
PROCEDURE pr_validate(p_brn VARCHAR2);
PROCEDURE pr_derive(p_brn VARCHAR2);
END UDFPKS_GLDCHACT#;
/