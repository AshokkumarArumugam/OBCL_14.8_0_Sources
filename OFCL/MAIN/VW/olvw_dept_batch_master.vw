CREATE OR REPLACE force VIEW olvw_dept_batch_master
		       (
			 Department_Code        
			,Batch_No               
			,Type                   
			,Description            
			,Locked                 
			,Uploaded               
			,Balancing              
			,Last_Oper_Id           
			,Last_Auth_Id           
			,Last_Release_Id        
			,Last_Oper_Dt_Stamp     
			,Last_Auth_Dt_Stamp     
			,Last_Release_Dt_Stamp
			,workflow_status
			)As
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_dept_batch_master.VW
**
** Module      : Data Entry
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
Select   A.Department_Code        
			,A.Batch_No               
			,A.Type                   
			,A.Description            
			,A.Locked                 
			,A.Uploaded               
			,A.Balancing              
			,A.Last_Oper_Id           
			,A.Last_Auth_Id           
			,A.Last_Release_Id        
			,A.Last_Oper_Dt_Stamp     
			,A.Last_Auth_Dt_Stamp     
			,A.Last_Release_Dt_Stamp
			,B.Workflow_Status
	From   oltbs_dept_batch_master A,olvws_dept_workflow B
	Where  A.Department_Code = B.Department_Code
	And    A.Batch_No	 = B.Batch_No
	Union
		Select   A.Department_Code        
			,A.Batch_No               
			,A.Type                   
			,A.Description            
			,A.Locked                 
			,A.Uploaded               
			,A.Balancing              
			,A.Last_Oper_Id           
			,A.Last_Auth_Id           
			,A.Last_Release_Id        
			,A.Last_Oper_Dt_Stamp     
			,A.Last_Auth_Dt_Stamp     
			,A.Last_Release_Dt_Stamp
			,'IN'
		From   oltbs_dept_batch_master A
		Where Not Exists (Select 1 From olvws_dept_workflow B
		  	  	  Where  A.Department_Code = B.Department_Code
			          And    A.Batch_No	 = B.Batch_No
			          )
/
create or replace synonym olvws_dept_batch_master for olvw_dept_batch_master
/