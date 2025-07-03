CREATE OR REPLACE PACKAGE RDPKS_GEN_WRAPPER AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Rdpks_Gen_Wrapper.SPC
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
   Changed By         :Radha
   Change Description :New Wrapper Package
   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Process_Request RETURN BOOLEAN;

END rdpks_gen_wrapper;
/
CREATE OR REPLACE SYNONYM  rdpkss_gen_wrapper FOR rdpks_gen_wrapper;
/

 