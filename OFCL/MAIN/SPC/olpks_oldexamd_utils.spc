create or replace package olpks_oldexamd_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldexamd_utils.sql
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  Created by        : Neeraj.Krishna
  Created Date      : 26-AUG-2016
  Description       : Development for OFCL-12.3
  
  **Changed By         : Chandra Achuta
  **Date               : 02-JUN-2021
  **Change Description : Hook request for error code skip case.
  **Search String      : Bug#34224604  
  -------------------------------------------------------------------------------------------------------
  */
  --Bug#34224604  Changes Starts
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --Bug#34224604  Changes Ends 
 PROCEDURE pr_linkages_validations(    p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_oldexamd         IN olpks_oldexamd_main.ty_oldexamd,
                                        p_prev_oldexamd    IN OUT olpks_oldexamd_main.ty_oldexamd,
                                        p_wrk_oldexamd     IN OUT olpks_oldexamd_main.ty_oldexamd,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);
  
end olpks_oldexamd_utils;
/