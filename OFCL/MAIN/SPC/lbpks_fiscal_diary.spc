CREATE OR REPLACE PACKAGE lbpks_fiscal_diary
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lbpks_fiscal_diary.SPC
**
** Module       : LS
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Change History - Start
07-SEP-2007     FCC V.CL Release 7.3 Dairy population FOR the Tranche repayment schedule
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO 
*/


PROCEDURE pr_populate_fiscal_diary
(p_branch IN VARCHAR2
,p_err_codes IN OUT VARCHAR2
,p_err_params IN OUT VARCHAR2);

END lbpks_fiscal_diary;
/
CREATE or replace SYNONYM lbpkss_fiscal_diary FOR lbpks_fiscal_diary
/