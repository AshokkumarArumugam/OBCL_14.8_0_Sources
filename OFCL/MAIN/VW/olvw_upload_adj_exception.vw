CREATE OR REPLACE FORCE VIEW olvw_upload_adj_exception
AS
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :olvw_upload_adj_exception.VW 
**  
**  Module    :LD-Loans and Deposits
**  
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
CHANGE HISTORY
--------------
12-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#147 Changes : Added status so that only error contracts are picked up 
07-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12598 Changes - Contract upload screen not showing erroneous records in Error log screen and error parameters
---------------------------------------------------------------------------------------
*/
SELECT Distinct A.Serial_No 
     , A.Batch_No
     , A.Contract_Ref_No
     , A.Adjustment_Amount
     --07-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12598 Changes starts    
     --, (Select Maker_id from oltbs_contract Where Contract_Ref_no = A.Contract_Ref_No And Auth_Status= 'U') Maker_Id
     ,A.maker_id
     --07-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12598 Changes ends
     , A.Book_Date
     , B.Error_Code     
	 --12-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#147 Changes Starts
	 , B.Error_Parameters
     --, (Select Message From Ertbs_Msgs Where Err_Code = B.Error_Code) Error_Message
	 --12-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#147 Changes Ends
  FROM oltbs_upload_adjustment A
     , oltbs_upload_adj_exception B
 WHERE A.Batch_No = B.Batch_No
   AND A.Contract_Ref_No = B.Contract_Ref_No 
   AND A.Book_Date = B.Book_Date   
   --12-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#147 Changes Starts
   AND A.Rowid = B.Upl_Rowid 
   AND A.Status IN ('E','F') 
   --12-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#147 Changes Ends
 ORDER BY A.Batch_No,A.Serial_No  
/