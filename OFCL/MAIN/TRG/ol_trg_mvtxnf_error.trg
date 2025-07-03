create or replace trigger ol_trg_mvtxnf_error
/*------------------------------------------------------------------
**
** File Name    : ol_trg_mvtxnf_error.trg
**
** Module       : Interface
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2018 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.  
---------------------------------------------------------------------
*/

/* 
CHANGE HISTORY

01-AUG-2002	FCC 4.1 OCT 2002	CEEMEA SFR No 4398	Sequence number is added in the code..
	
*/


after delete on OLTB_TXNF_ERROR 
REFERENCING NEW AS NEW OLD AS OLD
for each row
Begin
	Insert into oltbs_txnf_error_archive
		--(source,upload_date,external_ref_no,error_reason) --FCC 4.1 OCT 2002	CEEMEA SFR No 4398
		(source,upload_date,error_reason,seq_no)
	Values
		--(:old.source,:old.upload_date,:old.external_ref_no,:old.error_reason); --FCC 4.1 OCT 2002 CEEMEA SFR No 4398
		(:old.source,:old.upload_date,:old.error_reason,:OLD.seq_no);
End;

/