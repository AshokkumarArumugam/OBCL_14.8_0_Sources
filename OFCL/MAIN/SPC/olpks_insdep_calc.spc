CREATE OR REPLACE PACKAGE  olpks_insdep_calc 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_insdep_calc.SPC
**
** Module		: Loans and deposits
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



TYPE t_Input  is  RECORD   (

                  MaturityDate     	DATE,
			NoOfSchedules    	NUMBER ,
			StartDate        	DATE,
			Amount           	NUMBER,
			Ccy              	VARCHAR2(3),
			FreqUnits        	NUMBER,
			TenorUnits       	NUMBER,
			Interest         	VARCHAR2(5),
			IntBasis         	NUMBER,
			Freq             	VARCHAR2(1),
         		Tenor            	VARCHAR2(1),
			tax              	NUMBER,
			HolidayCcy       	VARCHAR2(3),
			HolidayCheck     	VARCHAR2(1),
			IgnoreHoliday    	VARCHAR2(1),
			ForwardBackward  	VARCHAR2(1),
			MoveAcrossMonth 	VARCHAR2(1),
			CascadeMovement VARCHAR2(1)					    
                          );

------------------------------------------------------------------------------

FUNCTION fn_CalculationMain(

          			p_AmtType              IN 	VARCHAR2,   
			    	p_InputRec             IN 	t_Input,
                        p_dcn                  OUT    oltbs_dly_msg_out.dcn%TYPE,
			    	p_ErrorCode            OUT 	VARCHAR2
			          ) 
RETURN BOOLEAN;


------------------------------------------------------------------------------



 
 END olpks_insdep_calc;
/
CREATE or replace SYNONYM olpkss_insdep_calc FOR olpks_insdep_calc
/