CREATE OR REPLACE PACKAGE olpks_Bip_Advice AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2009 - 2011 Oracle and/or its affiliates.  All rights reserved.
**                        
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
   -------------------------------------------------------------------------------------------------------
   
   -------------------------------------------------------------------------------------------------------
   */


 

  PROCEDURE Pr_Get_File_Format(p_Branch      IN VARCHAR2,
                               p_Module      IN VARCHAR2,
                               p_Adv_msg     IN VARCHAR2,
                               p_File_Format IN OUT VARCHAR2,
                               p_Err_Code    OUT VARCHAR2,
                               p_Err_Params  OUT VARCHAR2);
                               
 PROCEDURE Pr_Update_Adive_Status(p_Branch     IN VARCHAR2,
                                   p_Dcn        IN VARCHAR2,
                                   p_Status     IN VARCHAR2,
                                   p_Format     IN VARCHAR2,
                                   p_Err_Code   OUT VARCHAR2,
                                   p_Err_Params OUT VARCHAR2);
END olpks_Bip_Advice;
/
create or replace synonym olpkss_Bip_Advice for olpks_Bip_Advice;
/