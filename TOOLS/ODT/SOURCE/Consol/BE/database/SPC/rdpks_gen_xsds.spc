CREATE OR REPLACE PACKAGE Rdpks_Gen_Xsds AS

   /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name    : Rdpks_Gen_Xsds.Spc
    **
    ** Description  : TOOLS
    **
    ** This source is part of the FLEXCUBE Software System and is copyrighted by i-flex Solutions Limited.
    **
    **
    ** All rights reserved.  No part of this work may be reproduced, stored in a retrieval system,
    ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
    ** graphic, optic recording or otherwise, translated in any language or computer language, without
    ** the prior written permission of i-flex Solutions Limited.
    **
    ** Oracle Financial Services Software Limited.
    ** 10-11, SDF I, SEEPZ, Andheri (East),
    ** Mumbai - 400 096.
    ** India
    ** Copyright  © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
   -------------------------------------------------------------------------------------------------------
     CHANGE HISTORY
     SFR No             :
     Changed By         :
     Change Description :
    -------------------------------------------------------------------------------------------------------
    */

   FUNCTION Fn_Gen RETURN BOOLEAN;
   FUNCTION Fn_Validate_Xsd RETURN BOOLEAN;

END Rdpks_Gen_Xsds;
/
CREATE OR REPLACE SYNONYM  rdpkss_gen_xsds FOR rdpks_gen_xsds;
/

 