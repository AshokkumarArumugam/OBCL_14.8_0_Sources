CREATE OR REPLACE PACKAGE fcpks_fccppref_utils AS
     /*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : fcpks_fccppref_utils.spc
     **
     ** Module     : Loan Syndication
     **
     ** This source is part of the Oracle Banking Software Product.
     ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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

      Changed By          : Krithika Gopalakrishnan
      Change Description  : Changes done for the screen FCCPPREF
      Date                : 20-01-2017

     -------------------------------------------------------------------------------------------------------
     */
     
     FUNCTION fn_get_participant_pdt (prod_code in varchar2,
                              l_participant_product IN OUT VARCHAR2,
                              l_prod_desc IN OUT VARCHAR2,
                              borrower_pdt in varchar2,
                              p_Source    IN  VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_Main_Function    IN  VARCHAR2,
      p_Child_Function    IN  VARCHAR2,
      p_Key_Tags_Vals   IN OUT VARCHAR2,
      p_QryData_Reqd IN  VARCHAR2 ,
      p_fccppref IN   fcpks_fccppref_Main.ty_fccppref,
      p_wrk_fccppref IN OUT   fcpks_fccppref_Main.ty_fccppref,
      p_Err_Code          IN OUT VARCHAR2,
      p_err_params        IN OUT VARCHAR2)
   RETURN BOOLEAN;

END fcpks_fccppref_utils;
/