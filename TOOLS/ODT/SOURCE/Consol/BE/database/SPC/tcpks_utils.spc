CREATE OR REPLACE PACKAGE TCPKS_UTILS AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name    : Tcpks_Utils.Spc
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
  ** i-flex solutions limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright ? 2012 - 2013 by i-flex solutions limited.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Get_Ui_Name(p_Function_Id IN VARCHAR2,
                          p_Ui_Name     IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Fid_Master(p_Function_Id IN VARCHAR2,
                             p_Fid_Master  IN OUT Tctm_Fid_Master%ROWTYPE)
    RETURN BOOLEAN;
  FUNCTION Fn_Get_Tc_Master(p_Tc_Code   IN VARCHAR2,
                            p_Tc_Master IN OUT Tctm_Tc_Master%ROWTYPE)
    RETURN BOOLEAN;
  FUNCTION Fn_Get_Tc_Data_Master(p_Tc_Code   IN VARCHAR2,
                                 p_Tc_Master IN OUT Tctb_Tc_Master%ROWTYPE)
    RETURN BOOLEAN;
  FUNCTION Fn_Get_Label_Desc(p_Function_Id IN VARCHAR2,
                             p_Label_Code  IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Get_Label_Descs(p_Function_Id IN VARCHAR2,
                              p_Label_Codes IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Cache_Block_Details(p_Release_Code IN VARCHAR2,
                                  p_Function_Id  IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Cache_Test_Case_Data(p_Release_Code IN VARCHAR2,
                                   p_Tc_Code      IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Curr_Data(p_Tc_Code        IN VARCHAR2,
                            p_Curr_Data_Type IN OUT VARCHAR2,
                            p_Curr_Data      IN OUT NOCOPY CLOB)
    RETURN BOOLEAN;
  FUNCTION Fn_Get_Xsd_Node_And_Tag(p_Function_Id IN VARCHAR2,
                                   p_Block_Name  IN VARCHAR2,
                                   p_Field_Name  IN VARCHAR2,
                                   p_Xsd_Node    IN OUT VARCHAR2,
                                   p_Xsd_Tag     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Get_Process_Ref_No(p_Process_Code IN VARCHAR2) RETURN VARCHAR2;
END Tcpks_Utils;
/
CREATE OR REPLACE SYNONYM  tcpkss_utils FOR tcpks_utils;
/