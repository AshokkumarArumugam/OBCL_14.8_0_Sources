CREATE OR REPLACE PACKAGE TCPKS_MIGRATE AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Tcpks_Migrate.spc
   **
   ** Module     : Core
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
   
   SFR Number         :
   Changed By         :
   Change Description :
   
   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Get_Default_Value(p_Field_Name    IN VARCHAR2
                                ,p_Field_List    IN VARCHAR2
                                ,p_Dflt_Vals     IN VARCHAR2
                                ,p_Default_Value IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Convert_Record(p_Old_Block_Fields    IN VARCHAR2
                             ,p_Old_Block_Data      IN CLOB
                             ,p_New_Block_Fields    IN VARCHAR2
                             ,p_New_Block_Dflt_Vals IN VARCHAR2
                             ,p_New_Block_Data      IN OUT NOCOPY CLOB) RETURN BOOLEAN;

   FUNCTION Fn_Create_Release(p_From_Release_Code IN VARCHAR2
                             ,p_To_Release_Code   IN VARCHAR2
                             ,p_Function_Id       IN VARCHAR2
                             ,p_Tc_Code           IN VARCHAR2
                             ,p_Err_Code          IN OUT VARCHAR2
                             ,p_Err_Params        IN OUT VARCHAR2) RETURN BOOLEAN;

END tcpks_migrate;
/
CREATE OR REPLACE SYNONYM tcpkss_migrate FOR tcpks_migrate;
/