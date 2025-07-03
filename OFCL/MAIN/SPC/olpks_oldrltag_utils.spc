CREATE OR REPLACE PACKAGE olpks_oldrltag_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldrltag_utils.spc
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
  
  
  -------------------------------------------------------------------------------------------------------
  */

  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);

FUNCTION fn_create_package(p_source     IN cotms_source.source_code%TYPE,
                             e_rec_amt    IN OUT oltms_amount_tag_drv%ROWTYPE,
                             p_err_code   IN OUT VARCHAR2,
                             p_err_params IN OUT VARCHAR2) 
							 RETURN BOOLEAN ;
END olpks_oldrltag_utils;							 
/
CREATE OR REPLACE Synonym olpkss_oldrltag_utils FOR olpks_oldrltag_utils
/