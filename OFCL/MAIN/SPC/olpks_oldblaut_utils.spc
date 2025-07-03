create or replace package olpks_oldblaut_utils is

/*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : olpks_oldblaut_utils.sql
     **
     ** Module     : Loans and Deposits
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

     Created by         : Neeraj.Krishna
     Created Date       :
     Description 		:

     -------------------------------------------------------------------------------------------------------
     */
     
PROCEDURE pr_undo_billing_event_seq_no(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Child_Function    IN  VARCHAR2,
                        p_oldblaut IN   olpks_oldblaut_main.ty_oldblaut,
                        p_wrk_oldblaut IN OUT  olpks_oldblaut_main.ty_oldblaut,
                        p_Err_Code       IN  OUT VARCHAR2,
                        p_Err_Params     IN  OUT VARCHAR2);

end olpks_oldblaut_utils;
/