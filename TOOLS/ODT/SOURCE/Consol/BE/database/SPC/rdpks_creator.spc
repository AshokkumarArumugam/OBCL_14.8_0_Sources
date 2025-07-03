CREATE OR REPLACE PACKAGE  rdpks_creator AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : rdpks_creator.spc
   **
   ** Module     : TOOLS
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
   
   SFR No             :Initial Version
   Changed By         :
   Change Description :New XML Creator
   
   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Create RETURN BOOLEAN;

END rdpks_creator;
/
CREATE OR REPLACE SYNONYM rdpkss_creator FOR rdpks_creator;
/