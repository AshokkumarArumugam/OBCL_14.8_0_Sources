CREATE OR REPLACE PACKAGE RDPKS_UTILS AS
   /*-----------------------------------------------------------------------------------------------------
   **
  ** File Name  : rdpks_utils.spc
  **
  ** Module     : TOOLS
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
   PROCEDURE Pr_Log_Error(p_Err_Code   IN VARCHAR2
                         ,p_Err_Params IN VARCHAR2);
   FUNCTION Fn_Get_Msg_Id RETURN VARCHAR2;
   PROCEDURE Pr_Start;
   PROCEDURE Pr_End;
   PROCEDURE Pr_Load_Xmldoc(p_Fid_Xml     CLOB
                           ,p_Fid_Xml_Doc OUT Xmldom.Domdocument
                           ,p_Status      OUT VARCHAR2);

   PROCEDURE Pr_Free_Xml_Document(p_Xml_Doc IN OUT NOCOPY Xmldom.Domdocument);
   FUNCTION Fn_Get_Datetime RETURN DATE;
   FUNCTION Fn_Get_Param(p_Str VARCHAR2
                        ,p_Pos NUMBER
                        ,p_Sep VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Get_Param(p_Text_Clob IN CLOB
                        ,p_Pos       IN NUMBER
                        ,p_Sep       IN VARCHAR2 DEFAULT '~') RETURN VARCHAR2;
   FUNCTION Fn_Gen_Error_Message(p_Code   IN VARCHAR2
                                ,p_Params IN VARCHAR2
                                ,p_Msg    OUT VARCHAR2) RETURN VARCHAR2;
   PROCEDURE Pr_Log_Final_Error;
   FUNCTION Fn_Get_Upload_Status RETURN VARCHAR2;
END rdpks_utils;
/
CREATE OR REPLACE SYNONYM rdpkss_utils FOR rdpks_utils;
/