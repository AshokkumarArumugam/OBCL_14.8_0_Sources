CREATE OR REPLACE PACKAGE TCPKS_UPLOAD_BLOCK_DETAILS AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name    : Tcpks_Upload_Block_Details.spc
   **
   ** Description  : TOOLS
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
   
   Changed By         :
   Change Description :
   
   -------------------------------------------------------------------------------------------------------
   */
   FUNCTION Fn_Process_Request RETURN BOOLEAN;
END tcpks_upload_block_details;
/
CREATE OR REPLACE SYNONYM tcpkss_upload_block_details FOR tcpks_upload_block_details;
/

 