CREATE OR REPLACE PACKAGE RDPKS_GEN_SYS_TYPE AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name    : Rdpks_Gen_Sys_Type.SPC
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
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved..
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   
   Changed By         :
   Change Description :
   
   -------------------------------------------------------------------------------------------------------
   */
   FUNCTION Fn_Gen_Sys_Type RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Type_Converters RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Type_Structure(p_Xml_Type IN VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Gen_Sys_Build_Ts_List(p_Xml_Type IN VARCHAR2) RETURN BOOLEAN;

END rdpks_gen_sys_type;
/
CREATE OR REPLACE SYNONYM  rdpkss_gen_sys_type FOR  rdpks_gen_sys_type;
/