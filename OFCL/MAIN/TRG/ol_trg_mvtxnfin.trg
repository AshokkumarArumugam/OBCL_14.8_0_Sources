create or replace trigger ol_trg_mvtxnfin
/*------------------------------------------------------------------
**
** File Name    : ol_trg_mvtxnfin.trg
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

*/

after delete on OLTB_TXNFIN for each row
Begin
	Insert into oltbs_txnfin_archive
		(proc_seq_no,seq_no,source,customer_id,message_type,
		 upload_date,external_ref_no,txnf_data,brn_gcn,status,
		 fcc_brn,fcc_ref_no)
	Values
		(:old.proc_seq_no,:old.seq_no,:old.source,:old.customer_id,:old.message_type,
		 :old.upload_date,:old.external_ref_no,:old.txnf_data,:old.brn_gcn,:old.status,
		 :old.fcc_brn,:old.fcc_ref_no);
End;
/