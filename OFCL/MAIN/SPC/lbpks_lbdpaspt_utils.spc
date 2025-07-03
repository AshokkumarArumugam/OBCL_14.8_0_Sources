CREATE OR REPLACE PACKAGE lbpks_lbdpaspt_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdpaspt_utils.sql
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  Created by        : Prakash Ravi
  Created Date      : 12-JAN-2017
  Description       : Development for OFCL-12.4
  -------------------------------------------------------------------------------------------------------
  */
  
    TYPE v_partial_rep_process IS TABLE OF LBTBS_PART_REP_PROCESS_TEMP%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE ty_lbdpaspt_temp IS RECORD (
     l_v_partial_rep_process     v_partial_rep_process
     );
  
  
  
 procedure Pr_split_reprice; 
  
  
  
  
  
  end lbpks_lbdpaspt_utils;
/