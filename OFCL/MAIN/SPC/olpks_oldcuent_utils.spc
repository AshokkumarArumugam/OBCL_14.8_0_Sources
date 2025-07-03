CREATE OR REPLACE PACKAGE olpks_oldcuent_utils AS
     /*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : olpks_oldcuent_utils.spc
     **
     ** Module     : Static Maintenance
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

     Created By      : Mohan
     Created On      : 05-07-2016
     Description     : Form-RAD Conversion

     -------------------------------------------------------------------------------------------------------
     */
   

   FUNCTION fn_pop_entity_cust_address(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    --p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                    --p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                    p_oldcuent     IN olpks_oldcuent_main.ty_oldcuent,
                    p_wrk_oldcuent IN OUT  olpks_oldcuent_main.ty_oldcuent,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION fn_pop_fpml_cust_addr(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    --p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                    --p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                    p_oldcuent     IN olpks_oldcuent_main.ty_oldcuent,
                    p_wrk_oldcuent IN OUT  olpks_oldcuent_main.ty_oldcuent,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
                              
END olpks_oldcuent_utils;
/

CREATE OR REPLACE SYNONYM olpkss_oldcuent_utils for olpks_oldcuent_utils
/