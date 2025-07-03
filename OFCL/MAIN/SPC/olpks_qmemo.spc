CREATE OR REPLACE Package olpks_qmemo As
/*----------------------------------------------------------------------------------------
     **
     ** File Name    : olpks_qmemo.SPC
     **
     ** Module       : INTERFACE
     **
  This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------
  */
/*--CHANGE HISTORY---------------------------------------------------------------------------------------
07-OCT-2009 CITIUS-LS#6649, Retro Changes related to Hamper / LDR feed
  07-Jul-2009 FCC V.CL Release 7.5 Lot1.1 QMEMO HFS Changes, new functions added
  24-DEC-2010 Flexcube V.CL Release 7.8 FS Vol2 Tag 08 ITR1#12, added as new unit from site
-------------------------------------------------------------------------------------------------------
*/


  Pkg_Loc            Pls_Integer := 0;
  Pkg_Code_Table     Dbms_Sql.Varchar2s;
  Pkg_Lccollateral   Cstms_Udf_Vals.Field_Val%Type;
  Pkg_Subtype        Cstms_Udf_Vals.Field_Val%Type;
  Pkg_Ldcollateral   Cstms_Udf_Vals.Field_Val%Type;
  Pkg_Cashcollateral Cstms_Udf_Vals.Field_Val%Type;
  Pkg_Rule_Id        Varchar2(4);

  Type Elements_Sde Is Record(
    Elm_Val Varchar2(50));
  Type Elements_Sde_Tab Is Table Of Elements_Sde Index By Varchar2(100);

  Function Fn_Get_Productcode(p_Contract_Ref_No In Varchar2) Return Varchar2;
  Function Fn_Get_Maturitydate(p_Contract_Ref_No In Varchar2) Return Date;
  Function Fn_Get_Valuedate(p_Contract_Ref_No In Varchar2) Return Date; -- Madhu changes
  Function Fn_Get_Reportdate(p_Contract_Ref_No In Varchar2) Return Date;
  Function Fn_Get_Gfcid(p_Contract_Ref_No In Varchar2) Return Varchar2;
  Function Fn_Get_Amount(p_Contract_Ref_No In Varchar2) Return Number;
  Function Fn_Get_OrgAmount(p_Contract_Ref_No In Varchar2) Return Number;--Madhu 25-JUL-2008
  Function Fn_Get_Maturityband(p_Contract_Ref_No In Varchar2) Return Number;
  Function Fn_Get_Ratetype(p_Contract_Ref_No In Varchar2) Return Char;
  Function Fn_Get_Domicile(p_Contract_Ref_No In Varchar2) Return Varchar2;
  Function Fn_Get_Userdefinedstatus(p_Contract_Ref_No In Varchar2)
    Return Varchar2;
  Function Fn_Get_Udfvals(p_Contract_Ref_No In Varchar2) Return Boolean;
 Function Fn_Get_Comp_Mis(p_Branch Varchar2,
                           p_Ref_No    Varchar2,
                           p_Unit_Type Char,
                           p_Mis_No    Smallint) Return Varchar2;

  Function Fn_Get_Memocat(p_Contract_Ref_No In Varchar2) Return Number;
  Function Fn_Get_Loangfcid(p_Contract_Ref_No In Varchar2) Return Varchar2;

  Function Fn_Gen_Rule(p_Product_Code In Varchar2,
                       p_Err_Code     In Out Varchar2,
                       p_Err_Param    In Out Varchar2) Return Boolean;
  Function Fn_Gen_Sdevals Return Boolean;
  Procedure Gen(s Varchar2, n_Lf Smallint := 1);
  Function Fn_Gen_Spec Return Boolean;
  Function Fn_Gen_Body Return Boolean;
  Function Fn_Tab Return Varchar2;

  -- CITIUS-LS#6649 BEGIN
  --07-Jul-2009 FCC V.CL Release 7.5 Lot1.1 QMEMO HFS Changes - Start
--  Function Fn_Get_OrgAmount(p_Contract_Ref_No In Varchar2) Return Number;
--  Function Fn_Get_Valuedate(p_Contract_Ref_No In Varchar2) Return Date;
  Function Fn_Get_Soldamount(p_Contract_Ref_No In Varchar2) Return Number;
  Function Fn_Get_Holdamount(p_Contract_Ref_No In Varchar2) Return Number;
  Function Fn_Get_Lcsublimitamount(p_Contract_Ref_No In Varchar2) Return Number;
  Function Fn_Get_Riskrating(p_Contract_Ref_No In Varchar2) Return Varchar2;
  --07-Jul-2009 FCC V.CL Release 7.5 Lot1.1 QMEMO HFS Changes - End
  -- CITIUS-LS#6649 END

End olpks_qmemo;
/