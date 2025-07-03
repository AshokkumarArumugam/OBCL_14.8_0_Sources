CREATE OR REPLACE PACKAGE rdpks_oldrad_parser AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name    : rdpks_oldrad_parser.spc
   **
   ** Description  : TOOLS
   **
   ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
   ** 
   ** 
   ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
   ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
   ** graphic, optic recording or otherwise, translated in any language or computer language,
   ** without the prior written permission of Oracle Financial Services Software Limited.
   ** 
   ** Oracle Financial Services Software Limited.
   ** 10-11, SDF I, SEEPZ, Andheri (East),
   ** Mumbai - 400 096.
   ** India
   ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   
   Changed By         :
   Change Description :
   
   -------------------------------------------------------------------------------------------------------
   */

   g_Main_Screen VARCHAR2(2000);
   g_Audit_Block VARCHAR2(2000);

   --Old Data Blocks
   g_Chr_Old_Blk_Tbl Rdpks_Gen.Ty_Chr_Blk_Tbls;
   g_Int_Old_Blk_Tbl Rdpks_Gen.Ty_Int_Blk_Tbls;

   --Old Data Block Fields
   g_Chr_Old_Bfl_Tbl Rdpks_Gen.Ty_Chr_Blk_Fld_Tbl;
   g_Int_Old_Bfl_Tbl Rdpks_Gen.Ty_Int_Blk_Fld_Tbl;

   FUNCTION Fn_Parse RETURN BOOLEAN;

END rdpks_oldrad_parser;
/
CREATE OR REPLACE SYNONYM rdpkss_oldrad_parser FOR rdpks_oldrad_parser;
/

 