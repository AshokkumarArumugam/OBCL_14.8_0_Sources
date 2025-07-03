create or replace PACKAGE olpks_blkupld_contract AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_blkupld_contract.spc
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
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
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :

  -------------------------------------------------------------------------------------------------------
  */

PROCEDURE pr_blk_upd_contract(p_module IN VARCHAR2,p_branch IN VARCHAR2,p_seq_no IN NUMBER);	 

END olpks_blkupld_contract;
/