CREATE OR REPLACE PACKAGE lbpks_part_file_handle
AS
 /*----------------------------------------------------------------------------------------------
        **
        ** File Name : lbpks_part_file_handle.SPC
        **
        ** Module    : LS (Loan Syndication)
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
/* *****************************************************************************
   PURPOSE: This package is used to populate the information of participant created new for the
	    release FLEXCUBE V.CL Release 7.0


   REVISIONS:
   Ver        Date        Author           Description
   ---------  ----------  ---------------  ------------------------------------
   1.0        12/27/2005  Ratish Agrawal   This package is used to populate the information of participant.
*****************************************************************************
*/
      TYPE v_primary_data IS RECORD(
            contract_ref_no      lbtb_contract_participant.contract_ref_no%TYPE,
            syndication_ref_no   lbtb_contract_participant.contract_ref_no%TYPE,
            tranche_ref_no       lbtb_contract_participant.contract_ref_no%TYPE,
            event_seq_no         lbtb_contract_participant.event_seq_no%TYPE,
            contract_type        lbtb_contract_participant.contract_type%TYPE,
            drawdown_no          lbtb_contract_participant.drawdown_no%TYPE
      );

      TYPE v_bug_data_rec IS RECORD(
            ROW_NUMBER   NUMBER,
            table_name   VARCHAR2(100),
            bug_desc     VARCHAR2(32767),
            bug_type	 VARCHAR2(1)
      );

      TYPE tb_table_column IS TABLE OF VARCHAR2(30)
            INDEX BY BINARY_INTEGER;

      TYPE tb_table_data IS TABLE OF VARCHAR2(32767)
            INDEX BY BINARY_INTEGER;

      TYPE tb_table_data1 IS TABLE OF VARCHAR2(32767)
            INDEX BY BINARY_INTEGER;

      TYPE tb_dummy_table IS TABLE OF VARCHAR2(100)
            INDEX BY BINARY_INTEGER;

      TYPE tb_bug_table IS TABLE OF v_bug_data_rec
            INDEX BY BINARY_INTEGER;

      /* TYPE tb_ratio_table IS TABLE OF VARCHAR2(4000)
          INDEX BY BINARY_INTEGER;

       TYPE tb_entity_table IS TABLE OF VARCHAR2(4000)
          INDEX BY BINARY_INTEGER;

       TYPE tb_curr_table IS TABLE OF VARCHAR2(4000)
          INDEX BY BINARY_INTEGER;*/
      FUNCTION fn_table_columns(p_table_name VARCHAR2, p_column OUT VARCHAR2)
            RETURN BOOLEAN;

      FUNCTION fn_table_data(
            p_table_name   IN       VARCHAR2,
            p_where        IN       lbpks_part_file_handle.v_primary_data,
            p_column       IN       VARCHAR2,
            p_table_data   OUT      lbpks_part_file_handle.tb_table_data,
            p_err          OUT      VARCHAR2
      )
            RETURN BOOLEAN;

      FUNCTION fn_validate_data(
            p_column_data   IN       lbpks_part_file_handle.v_primary_data,
            p_table_name    IN       VARCHAR2,
            p_table_data    IN OUT   lbpks_part_file_handle.tb_table_data,
            p_column_name   IN       VARCHAR2,
            p_err_desc      OUT      lbpks_part_file_handle.tb_bug_table,
            err_code		OUT	ERTBS_MSGS.ERR_CODE%TYPE,
			err_msg		OUT	ERTBS_MSGS.MESSAGE%TYPE
      )
            RETURN BOOLEAN;

      FUNCTION fn_put_data(
            p_dummy_table         lbpks_part_file_handle.tb_table_data1,
            p_table_name          VARCHAR2,
            p_column_name         VARCHAR2,
            p_err           OUT   VARCHAR2
      )
            RETURN BOOLEAN;
      FUNCTION fn_clear_bug_table RETURN BOOLEAN;
/*   FUNCTION fn_ratio_data (
      p_where         IN       lbpks_part_file_handle.v_primary_data,
      p_column        IN       VARCHAR2,
      p_ratio_table   OUT      lbpks_part_file_handle.tb_ratio_table,
        p_err            OUT VARCHAR2
   )
      RETURN BOOLEAN;

   FUNCTION fn_entity_data (
      p_where          IN       lbpks_part_file_handle.v_primary_data,
      p_column         IN       VARCHAR2,
      p_entity_table   OUT      lbpks_part_file_handle.tb_entity_table,
        p_err            OUT VARCHAR2
   )
      RETURN BOOLEAN;

   FUNCTION fn_curr_data (
      p_where        IN       lbpks_part_file_handle.v_primary_data,
      p_column       IN       VARCHAR2,
      p_curr_table   OUT      lbpks_part_file_handle.tb_curr_table,
        p_err            OUT VARCHAR2
   )
      RETURN BOOLEAN;*/
END lbpks_part_file_handle;
/
Create or replace Synonym lbpkss_read_write_data for lbpks_part_file_handle
/