CREATE OR REPLACE PACKAGE rdpks_ddl_upload AS

   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : rdpks_ddl_upload.spc
   **
   ** Module     : DDL Tool
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
   FUNCTION Fn_Upload_To_Ddl_Tool(p_Tables  IN OUT Rdpks_Gen.Ty_Tables
                                 ,p_Scr_Arr IN OUT Rdpks_Gen.Ty_Tb_Static_Data
                                 ,p_Ref     IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Process_a_Batch(p_Batch_Ref_No IN VARCHAR2) RETURN BOOLEAN;
   PROCEDURE Pr_Update_File_Name(p_Batch_Ref_No      VARCHAR2
                                ,p_Table_Name_List   VARCHAR2
                                ,p_Version_No_List   VARCHAR2
                                ,p_File_Name_List    VARCHAR2
                                ,p_File_Created_List VARCHAR2) ;

END rdpks_ddl_upload;
/
CREATE OR REPLACE SYNONYM rdpkss_ddl_upload FOR rdpks_ddl_upload;
/
CREATE OR REPLACE SYNONYM Dlpks_Rad_Upload_Ddl FOR ddl.dlpks_rad_upload;
/ 
 