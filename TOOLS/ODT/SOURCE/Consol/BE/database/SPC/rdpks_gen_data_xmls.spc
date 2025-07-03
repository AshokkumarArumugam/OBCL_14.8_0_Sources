CREATE OR REPLACE PACKAGE rdpks_gen_data_xmls AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : rdpks_gen_data_xmls.spc
   **
   ** Module     : Core
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
   
   -------------------------------------------------------------------------------------------------------
   */
   FUNCTION Fn_Spool_Data_Xmls(p_Release_Code IN VARCHAR2
                              ,p_Tc_Code      IN VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Gen RETURN BOOLEAN;
END rdpks_gen_data_xmls;
/
CREATE OR REPLACE SYNONYM rdpkss_gen_data_xmls FOR rdpks_gen_data_xmls;
/

 