CREATE OR REPLACE PACKAGE RDPKS_GEN_SYS_FUNC AS

   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name    : Rdpks_Gen_Sys_Func.SPC
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
   FUNCTION Fn_Gen_Sys_Mand RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Basic_Vals RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Default_Vals RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Amendable_Check RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Node_Mand_Checks RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Lov_Vals RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Dflt RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Query RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Query_Desc RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Pop_Key RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Upload_Db RETURN BOOLEAN;

END rdpks_gen_sys_func;
/
CREATE OR REPLACE SYNONYM rdpkss_gen_sys_func FOR  rdpks_gen_sys_func;
/