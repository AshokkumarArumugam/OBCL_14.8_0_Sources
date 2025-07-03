CREATE OR REPLACE PACKAGE rdpks_interface_utils IS

  -- Incoming and Outgoing Code generator types
  TYPE ty_section_rec IS RECORD(
    section_code     VARCHAR2(32767),
    section_category VARCHAR2(32767),
    section_type     VARCHAR2(6),
    no_of_lines      NUMBER,
    length           NUMBER,
    st_tag           VARCHAR2(32767),
    end_tag          VARCHAR2(32767));

  TYPE ty_sections IS TABLE OF ty_section_rec INDEX BY PLS_INTEGER;

  TYPE ty_record_rec IS RECORD(
    rec_code            VARCHAR2(400),
    rec_category        VARCHAR2(32767),
    rec_loc_type        VARCHAR2(6),
    no_of_lines         NUMBER,
    length              NUMBER,
    st_tag              VARCHAR2(32767),
    end_tag             VARCHAR2(32767),
    rec_delimiter       VARCHAR2(6),
    rec_id_type         VARCHAR2(6),
    tag_fld_pos         NUMBER,
    tag_length          NUMBER,
    tag_st_pos          NUMBER,
    tag_value           VARCHAR2(32767),
    custom_tags         VARCHAR2(32767),
    homogenous          VARCHAR2(1),
    repetitive          VARCHAR2(1),
    hierarchical        VARCHAR2(1),
    db_tables           VARCHAR2(32767),
    where_clause        VARCHAR2(32767),
    order_by_clause     VARCHAR2(32767),
    field_type          VARCHAR2(32767),
    field_delimiter     VARCHAR2(32767),
    incoming_functionid VARCHAR2(8),
    hierarchy_mode      VARCHAR2(32767));

  TYPE ty_record IS TABLE OF ty_record_rec INDEX BY PLS_INTEGER;

  -- Incoming - Generate new records in block.
  TYPE ty_assoc_blk_rec IS RECORD(
    rec_code       VARCHAR2(32767),
    blk_name       VARCHAR2(32767),
    gen_new_blocks VARCHAR2(1));

  TYPE ty_assoc_blk IS TABLE OF ty_assoc_blk_rec INDEX BY PLS_INTEGER;
  TYPE ty_assoc_blks IS TABLE OF ty_assoc_blk INDEX BY PLS_INTEGER;

  -- Incoming - Associated records.
  TYPE ty_assoc_record IS RECORD(
    rec_code   VARCHAR2(32767),
    rshdr_code VARCHAR2(32767),
    parent_rec VARCHAR2(32767));

  TYPE ty_assoc_recs IS TABLE OF ty_assoc_record INDEX BY PLS_INTEGER;
  TYPE ty_assoc_rec IS TABLE OF ty_assoc_recs INDEX BY PLS_INTEGER;

  TYPE ty_field_rec IS RECORD(
    rec_code          VARCHAR2(32767),
    field_code        VARCHAR2(32767),
    field_type        VARCHAR2(6),
    data_type         VARCHAR2(32767),
    date_format       VARCHAR2(32767),
    length            NUMBER,
    field_delimiter   VARCHAR2(32767),
    field_pos         NUMBER,
    st_pos            NUMBER,
    trim_pref         VARCHAR2(1),
    trim_char         VARCHAR2(1),
    field_value       VARCHAR2(32767),
    keyword           VARCHAR2(32767),
    db_table          VARCHAR2(32767),
    db_column         VARCHAR2(32767),
    padding_pref      VARCHAR2(32767),
    padding_char      VARCHAR2(32767),
    exclude_in_select VARCHAR2(1),
    blk_name          VARCHAR2(4000),
    fld_name          VARCHAR2(4000),
    fc_fld_pos        NUMBER,
    parent_blk        VARCHAR2(4000),
    exists_in_file    VARCHAR2(1));

  TYPE ty_fields IS TABLE OF ty_field_rec INDEX BY PLS_INTEGER;

  TYPE ty_rec_fields IS TABLE OF ty_fields INDEX BY PLS_INTEGER;

  TYPE ty_mapping_rec IS RECORD(
    rec_code     VARCHAR2(32767),
    rec_category VARCHAR2(32767),
    field_code   VARCHAR2(32767),
    fld_pos      NUMBER,
    blk_name     VARCHAR2(32767),
    fld_name     VARCHAR2(32767),
    fc_fld_pos   NUMBER,
    parent_blk   VARCHAR2(32767));

  TYPE ty_mapping IS TABLE OF ty_mapping_rec INDEX BY PLS_INTEGER;
  TYPE ty_rec_mapping IS TABLE OF ty_mapping INDEX BY PLS_INTEGER;

  TYPE ty_gidintdf IS RECORD(
    format_id           VARCHAR2(8),
    format_category     VARCHAR2(1),
    incoming_functionid VARCHAR2(8),
    directory_name      VARCHAR2(10),
    file_name           VARCHAR2(32767),
    max_line_size       NUMBER,
    p_sections          ty_sections,
    p_record            ty_record,
    p_rec_fields        ty_rec_fields,
    p_assoc_blks        ty_assoc_blks,
    p_assoc_record      ty_assoc_rec,
    p_rec_mapping       ty_rec_mapping);
  --

  PROCEDURE put(p_file   IN VARCHAR2,
                p_line   IN VARCHAR2,
                new_line IN VARCHAR2);

  PROCEDURE pr_end;

  PROCEDURE pr_show_str;

  PROCEDURE pr_show_clob;

  PROCEDURE pr_clear;

  PROCEDURE pr_execute;

  PROCEDURE pr_compile_pkg(p_pkg_name VARCHAR2);

  PROCEDURE pr_get_keyword(p_macro   IN VARCHAR2,
                           p_keyword OUT VARCHAR2);

END rdpks_interface_utils;
/
CREATE OR REPLACE SYNONYM rdpkss_interface_utils FOR rdpks_interface_utils;
/