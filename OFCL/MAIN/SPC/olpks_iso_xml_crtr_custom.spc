CREATE OR REPLACE PACKAGE olpks_iso_xml_crtr_custom AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_iso_xml_crtr_custom.spc
  **
  ** Module     : Messaging
  ** 
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2023 , Oracle and/or its affiliates.  All rights reserved
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
  
  SFR Number         :  
  **Changed By         : Kavitha Asokan
  **Date               : 03-NOV-2023
  **Change Description : Bug 35974584 - ISO MX MESSAGE - CAMT054                  
  **Search String      : OBCL_14.7_CAMT054_CHANGES
  
  -------------------------------------------------------------------------------------------------------
  */
  PROCEDURE Pr_Skip_Handler(p_Stage in VARCHAR2);
  FUNCTION fn_pre_iso_msg_xml_creator(p_dcn             IN VARCHAR2,
                                      p_res_xml         IN OUT CLOB,
                                      p_error_code      IN OUT VARCHAR2,
                                      p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_post_iso_msg_xml_creator(p_dcn             IN VARCHAR2,
                                       p_res_xml         IN OUT CLOB,
                                       p_error_code      IN OUT VARCHAR2,
                                       p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_pre_validate_msg_format(p_format          IN oltm_iso_msg_format%ROWTYPE,
                                      p_tag_val         IN OUT VARCHAR2,
                                      p_error_code      IN OUT VARCHAR2,
                                      p_error_parameter IN OUT VARCHAR2) 
    RETURN BOOLEAN;
  FUNCTION fn_post_validate_msg_format(p_format          IN oltm_iso_msg_format%ROWTYPE,
                                       p_tag_val         IN OUT VARCHAR2,
                                       p_error_code      IN OUT VARCHAR2,
                                       p_error_parameter IN OUT VARCHAR2) 
    RETURN BOOLEAN;
END olpks_iso_xml_crtr_custom;
/
CREATE OR REPLACE SYNONYM olpkss_iso_xml_crtr_custom FOR olpks_iso_xml_crtr_custom
/