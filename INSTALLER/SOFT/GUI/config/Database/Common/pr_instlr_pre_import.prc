CREATE OR REPLACE PROCEDURE pr_instlr_pre_import(p_err_code  OUT VARCHAR2
                                                ,p_err_param OUT VARCHAR2) IS

    l_sql VARCHAR2(32767);

    CURSOR cur_triggers IS
        SELECT DISTINCT (table_name) table_name
        FROM   user_triggers;

BEGIN

    --Disabling Triggers
    FOR rec IN cur_triggers
    LOOP
        l_sql := 'Alter Table ' || rec.table_name || ' disable all triggers';
        BEGIN
            EXECUTE IMMEDIATE l_sql;
        EXCEPTION
            WHEN OTHERS THEN
                NULL;
        END;
    END LOOP;


EXCEPTION
    WHEN OTHERS THEN
        p_err_code  := 'IN-RIM-001';
        p_err_param := substr(SQLERRM, 1, 255);
        dbms_output.put_line('When Others Error : ' || SQLERRM);
END pr_instlr_pre_import;
/
