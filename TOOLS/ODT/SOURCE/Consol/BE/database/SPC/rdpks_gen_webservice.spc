create or replace package Rdpks_Gen_Webservice is
  /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Rdpks_Gen_Webservice.spc
   **
   ** Module     : RAD Tool
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
   ** Copyright © 2008 - 2012 Oracle Financial Services Software Limited. All rights reserved.
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY

   SFR No             :Initial Version
   Changed By         :
   Change Description :

   -------------------------------------------------------------------------------------------------------
   */
   
   
   FUNCTION Fn_gen RETURN BOOLEAN;



end Rdpks_Gen_Webservice;
/
CREATE OR REPLACE SYNONYM Rdpkss_Gen_Webservice FOR Rdpks_Gen_Webservice;
/