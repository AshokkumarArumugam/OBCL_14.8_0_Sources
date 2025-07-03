CREATE OR REPLACE VIEW itvw_communications AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2011 - 2012  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
------------------------------------------------------------------------------------------*/
SELECT
  COMMUNICATION_ID,
  COMMUNICATION_TYPE,
  COMMUNICATION_REFERENCE,
  COMMUNICATION_SUB_REFERENCE,
  FREQUENCY,
  EFFECTIVE_DATE,
  EXPIRY_DATE,
  TARGET,
  TARGET_TYPE,
  CHANNEL,
  LANGUAGE,
  PROCESS_STATUS,
  MESSAGE,
  PHONE_NUMBER,
  EMAIL_SUBJECT,
  EMAIL_ADDRESS,
  END_DATE
FROM ITTB_COMMUNICATIONS
/
CREATE OR REPLACE SYNONYM itvws_communications FOR itvw_communications
/