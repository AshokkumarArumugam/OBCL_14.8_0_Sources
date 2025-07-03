CREATE OR REPLACE VIEW OLTW_SERVICE_LOG_DETAILS AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : OLTW_SERVICE_LOG_DETAILS.VW
** Module       : OL
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Created by : Krithika G
Created Date : 5-NOV-2017
*/
SELECT IFD.MSGID,
       IFD.SEQ_NO,
       IFD.REQ_SERIAL_NO,
       IFD.VERSIONED,
       DECODE(IFD.EXT_STATUS,'T','TimedOut','E','Failed','U','Unprocessed','P','Processed','D','Deferred') as EXT_STATUS,
       IFD.ERROR_CODES,
       IFD.ERROR_PARAM
  FROM OLTB_SERVICE_LOG_DETAILS IFD
/
CREATE OR REPLACE SYNONYM OLTWS_SERVICE_LOG_DETAILS FOR OLTW_SERVICE_LOG_DETAILS
/