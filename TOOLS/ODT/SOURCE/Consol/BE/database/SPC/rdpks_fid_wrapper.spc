CREATE OR REPLACE PACKAGE rdpks_fid_wrapper AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : rdpks_fid_wrapper.spc
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
   SFR No             :Initial Version
   Changed By         :Radha
   Change Description :New Wrapper Package
   -------------------------------------------------------------------------------------------------------
   */

   g_Function_Id      VARCHAR2(8);
   g_Action_Code      VARCHAR2(50);
   g_Process_Type     VARCHAR2(10) := 'I';
   g_Status           VARCHAR2(20);
   g_Err_Code         VARCHAR2(32767);
   g_Err_Params       VARCHAR2(32767);
   g_Return           BOOLEAN := TRUE;
   g_Exchange_Pattern VARCHAR2(4);
   g_Master_Table     VARCHAR2(50);
   g_Audit_Type       VARCHAR2(50);
   g_Rec_Id           VARCHAR2(32767);
   g_Key_Id           VARCHAR2(32767);
   g_Other_Data       VARCHAR2(32767);
   g_Audit_Type       VARCHAR2(32767);
   g_Node_Data        Rdpks_Global.Ty_Tb_Chr_Node_Data;

   FUNCTION Fn_Process_Request RETURN BOOLEAN;

END rdpks_fid_wrapper;
/
CREATE OR REPLACE SYNONYM rdpkss_fid_wrapper FOR rdpks_fid_wrapper;
/
