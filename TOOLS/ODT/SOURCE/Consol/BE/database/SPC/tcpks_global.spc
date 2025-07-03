CREATE OR REPLACE PACKAGE TCPKS_GLOBAL AS
   /*-----------------------------------------------------------------------------------------------------
   **
  ** File Name  : tcpks_global.spc
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

   TYPE Ty_Int_Chr_Tbl IS TABLE OF VARCHAR2(255) INDEX BY PLS_INTEGER;
   TYPE Ty_Chr_Chr_Array IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(255);

   TYPE Ty_Int_Blk_Tbl IS TABLE OF Tctm_Block_Details%ROWTYPE INDEX BY PLS_INTEGER;
   TYPE Ty_Chr_Blk_Tbl IS TABLE OF Tctm_Block_Details%ROWTYPE INDEX BY VARCHAR2(200);

   TYPE Ty_Blk_Io_Int_Tbl IS TABLE OF Tctm_Block_Io_Tags%ROWTYPE INDEX BY VARCHAR2(200);
   TYPE Ty_Blk_Io_Tbl IS TABLE OF Ty_Blk_Io_Int_Tbl INDEX BY VARCHAR2(200);

   TYPE Ty_Int_Blk_Data_Int_Tbl IS TABLE OF Tctm_Block_Data%ROWTYPE INDEX BY PLS_INTEGER;
   TYPE Ty_Chr_Blk_Data_Int_Tbl IS TABLE OF Tctm_Block_Data%ROWTYPE INDEX BY VARCHAR2(200);

   TYPE Ty_Int_Blk_Data_Tbl IS TABLE OF Ty_Int_Blk_Data_Int_Tbl INDEX BY VARCHAR2(200);
   TYPE Ty_Chr_Blk_Data_Tbl IS TABLE OF Ty_Chr_Blk_Data_Int_Tbl INDEX BY VARCHAR2(200);

   TYPE Ty_Int_Cfm_Tbl IS TABLE OF Tctm_Fid_Call_Forms%ROWTYPE INDEX BY PLS_INTEGER;
   TYPE Ty_Chr_Cfm_Tbl IS TABLE OF Tctm_Fid_Call_Forms%ROWTYPE INDEX BY VARCHAR2(200);

   TYPE Ty_Tb_Record_Data IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(255);
   TYPE Ty_Tb_Table_Data IS TABLE OF Ty_Tb_Record_Data INDEX BY PLS_INTEGER;
   TYPE Ty_Tb_Xml_Data IS TABLE OF Ty_Tb_Table_Data INDEX BY VARCHAR2(255);

   g_Int_Blk_Tbl Ty_Int_Blk_Tbl;
   g_Chr_Blk_Tbl Ty_Chr_Blk_Tbl;

   g_Blk_Io_Tbl Ty_Blk_Io_Tbl;

   g_No_Of_Blocks NUMBER := 0;

   g_Int_Cfm_Tbl Ty_Int_Cfm_Tbl;
   g_Chr_Cfm_Tbl Ty_Int_Cfm_Tbl;

   g_No_Of_Call_Forms NUMBER := 0;

   g_Int_Blk_Data_Tbl Ty_Int_Blk_Data_Tbl;
   g_Chr_Blk_Data_Tbl Ty_Chr_Blk_Data_Tbl;

   g_Tb_Xml_Data Ty_Tb_Xml_Data;

   c_Req_Xml_Type_Fc CONSTANT VARCHAR2(100) := 'FC';
   c_Req_Xml_Type_Ws CONSTANT VARCHAR2(100) := 'WS';
	 c_Req_Xml_Type_Dt CONSTANT VARCHAR2(100) := 'DT';

   c_Tcm_Fc_Source_Code CONSTANT VARCHAR2(100) := 'FLEXCUBE';
   c_Tcm_Ws_Source_Code CONSTANT VARCHAR2(100) := 'TCM';
   c_Max_Vc NUMBER := 32700;

   c_Alt_Fld_Sep VARCHAR2(10) := '!';

   c_Maker   CONSTANT VARCHAR2(100) := 'TCM';
   c_Checker CONSTANT VARCHAR2(100) := 'TCM';

END tcpks_global;
/
CREATE OR REPLACE SYNONYM tcpkss_global FOR tcpks_global;
/