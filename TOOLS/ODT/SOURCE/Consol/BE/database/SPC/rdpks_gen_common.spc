CREATE OR REPLACE PACKAGE rdpks_gen_common AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name    : rdpks_gen_common.spc
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

   FUNCTION Fn_Gen_Dbg(p_Package IN VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Gen_Log_Error RETURN BOOLEAN;
   FUNCTION Fn_Gen_Log_Error_For_Hooks RETURN BOOLEAN;
   FUNCTION Fn_Gen_Skip_Handlers_For_Spc RETURN BOOLEAN;
   FUNCTION Fn_Gen_Skip_Variables RETURN BOOLEAN;
   FUNCTION Fn_Gen_Skip_Handlers_For_Sql RETURN BOOLEAN;
   FUNCTION Fn_Gen_Build_Type RETURN BOOLEAN;
   FUNCTION Fn_Gen_Build_Ts_List RETURN BOOLEAN;
   FUNCTION Fn_Gen_Get_Key_Information RETURN BOOLEAN;
   FUNCTION Fn_Print_Child_Node_Data(p_Master_Blk IN VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Gen_Get_Node_Data RETURN BOOLEAN;

END rdpks_gen_common;
/
CREATE OR REPLACE SYNONYM  rdpkss_gen_common FOR rdpks_gen_common;
/

 