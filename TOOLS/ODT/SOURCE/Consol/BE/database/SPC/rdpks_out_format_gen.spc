CREATE OR REPLACE PACKAGE rdpks_out_format_gen IS

  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : rdpks_out_format_gen.spc
  **
  ** Module     : Generic Interface
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
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------*/

  FUNCTION fn_out_pkg_gen(p_gidintdf  IN rdpks_interface_utils.ty_gidintdf,
                          p_err_code  OUT VARCHAR2,
                          p_err_param OUT VARCHAR2) RETURN BOOLEAN;

END rdpks_out_format_gen; 
/
CREATE OR REPLACE SYNONYM rdpkss_out_format_gen FOR rdpks_out_format_gen;
/