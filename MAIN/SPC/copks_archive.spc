create or replace package copks_archive is

  -- Author  : SIRI
  -- Created : 23-08-2024 10:00:45
  -- Purpose : 
    /*
  ----------------------------------------------------------------------------------------------------
  **
  ** File Name : COPKS_ARCHIVE.SPC
  **
  ** Module : CO
  **
  ** This source is part of the FLEXCUBE Software System
  ** and is copyrighted by Oracle Financial Services Software Limited.
  **
  ** All rights reserved.  No part of this work may be reproduced,
  ** stored in a retrieval system, adopted or transmitted in any form
  ** or by any means, electronic, mechanical, photographic, graphic,
  ** optic recording or otherwise, translated in any language or
  ** computer language, without the prior written permission from
  ** Oracle Financial Services Software Limited.
  **
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India.
  **** Copyright ? 2001- 2011 by Oracle Financial Services Software Limited.
  ----------------------------------------------------------------------------------------------------
  */
 

   
  FUNCTION fn_archive_gw(p_branch      IN VARCHAR2,
                         p_error_code  IN OUT VARCHAR2,
                         p_error_param IN OUT VARCHAR2) RETURN BOOLEAN;
  
  FUNCTION fn_archive_sm(p_branch      IN VARCHAR2,
                         p_error_code  IN OUT VARCHAR2,
                         p_error_param IN OUT VARCHAR2) RETURN BOOLEAN;
  

end copks_archive;
/
CREATE OR REPLACE SYNONYM copkss_archive FOR copks_archive
/