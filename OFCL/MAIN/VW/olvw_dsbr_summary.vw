CREATE OR REPLACE VIEW  OLVW_DSBR_SUMMARY AS
/*-----------------------------------------------------------------------------------------------------
**
** File Name  : olvw_dsbr_summary.vw
**
** Module     : Oracle Lending
** 
** This source is part of the Oracle Banking Software Product.
** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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
**-------------------------------------------------------------------------------------------------------
**CHANGE HISTORY
**
**SFR Number         :  
**Changed By         :  
**Change Description :  
**
**
**Changed By         : Pallavi R
**Date               : 11-Apr-2019
**Change Description : To display disbursement date in summary
**Search String      : OBCL_14.3_DSBR_#29628464 Changes


   **Changed By         : Mohan Pal
   **DATE               : 04-Jun-2020
   **Change Description : Added version number in the screen. 
   **Search String      : OBCL_14.4_support_Bug#31408484 
   
   **Changed By         : Narendra Dhaker
   **Date               : 26-May-2021
   **Change Description : Product Access restriction
   **Search String      : Product Access restriction

**-------------------------------------------------------------------------------------------------------*/
SELECT a.Contract_Ref_No,
       b.Event_Seq_No,
       b.Branch,
	   --OBCL_14.3_DSBR_#29628464 Changes Starts
       b.Counterparty,
       b.Cont_Ccy,
       c.Due_Date,
	   --OBCL_14.3_DSBR_#29628464 Changes Ends
       c.Amount,
       d.Contract_Status,
       d.Auth_Status
  FROM Oltbs_Contract             a,
       Oltbs_Contract_Dsbr_Master b,
       Oltbs_Contract_Dsbr_Sch    c,
       Oltb_Contract_Event_Log    d
 WHERE b.Contract_Ref_No = a.Contract_Ref_No AND
       c.Contract_Ref_No = a.Contract_Ref_No AND
       d.Contract_Ref_No = c.Contract_Ref_No AND
       c.Applied_Esn = Nvl(b.Dsbr_Esn,
                           b.Event_Seq_No) AND
       d.Event_Seq_No = a.Latest_Event_Seq_No
	    and b.event_seq_no =
       ---ADDED FOR OBCL_14.4_support_Bug#31408484 START---
       (select max(event_seq_no)
          from Oltbs_Contract_Dsbr_Master p
         where b.Contract_Ref_No = p.Contract_Ref_No)
       ---ADDED FOR OBCL_14.4_support_Bug#31408484 END---
	   --Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = a.product_code --OBCL_14.8_CE_Length_Changes
      AND USER_ID = global.user_id)
--Product Access restriction - End
/
CREATE OR REPLACE SYNONYM olvws_dsbr_summary FOR olvw_dsbr_summary
/