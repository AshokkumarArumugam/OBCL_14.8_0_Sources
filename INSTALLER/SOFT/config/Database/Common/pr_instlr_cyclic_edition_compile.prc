CREATE OR REPLACE PROCEDURE pr_instlr_cyclic_edition_compile(p_edition_name IN VARCHAR2,
												     p_err_code  OUT VARCHAR2
                                                    ,p_err_param OUT VARCHAR2) IS

    CURSOR crinvalid IS
        SELECT object_type
              ,object_name
        FROM   user_objects_ae
        WHERE  status = 'INVALID'
		 AND   edition_name = p_edition_name
        ORDER  BY decode(object_type
                        ,'SYNONYM'
                        ,1
                        ,'TYPE'
                        ,2
                        ,'VIEW'
                        ,3
                        ,'PACKAGE'
                        ,4
                        ,'FUNCTION'
                        ,5
                        ,'PROCEDURE'
                        ,6
                        ,'PACKAGE BODY'
                        ,7
                        ,'TRIGGER'
                        ,8
			,'JAVA SOURCE'
                      ,9
		      ,'JAVA CLASS'
		      ,10
		      ,11);

    TYPE tyinvobjs IS TABLE OF crinvalid%ROWTYPE INDEX BY BINARY_INTEGER;
    linvalidobjs tyinvobjs;

    lprevinvalids NUMBER := 0;
    lcurrinvalids NUMBER := 0;
    l_status      VARCHAR2(100);

    i NUMBER;

    lsql VARCHAR2(256);
	schema_name Varchar2(100);--to resolve the java classes to new schema as java units does not get remapped with REMAP_SCHEMA command

BEGIN
    SELECT COUNT(*)
    INTO   lcurrinvalids
    FROM   user_objects_ae
    WHERE  status = 'INVALID'
	AND edition_name = p_edition_name;
    WHILE (lprevinvalids <> lcurrinvalids)
    LOOP
        IF lcurrinvalids <> lprevinvalids
        THEN
            FOR rec IN crinvalid
            LOOP
                IF rec.object_type = 'PACKAGE BODY'
                THEN
                    lsql := 'ALTER PACKAGE ' || rec.object_name || ' COMPILE BODY';
                ELSIF rec.object_type = 'TYPE BODY'
                THEN
                    lsql := 'ALTER TYPE ' || rec.object_name || ' COMPILE BODY';
					--to resolve the java classes to new schema as java units does not get remapped with REMAP_SCHEMA command start
			   ELSIF (rec.object_type = 'JAVA CLASS' OR rec.object_type = 'JAVA SOURCE')
				THEN
					BEGIN
						SELECT sys_context('userenv', 'session_user')
						INTO   schema_name
						FROM   dual;
					
						lsql := 'ALTER ' || rec.object_type || ' "' || rec.object_name || '" resolver ((*' ||
								schema_name || ') (* public)) resolve';
						dbms_output.put_line('lsql    ' || lsql);
										
						EXECUTE IMMEDIATE lsql;
					EXCEPTION
						WHEN OTHERS THEN
							dbms_output.put_line('catch comp errors due to dependencies' || SQLERRM);
						
					END;
					lsql := 'ALTER ' || rec.object_type || ' "' || rec.object_name || '" COMPILE';		
					--to resolve the java classes to new schema as java units does not get remapped with REMAP_SCHEMA command End
                ELSE
		 lsql := 'ALTER ' || rec.object_type || ' "' || rec.object_name || '" COMPILE';
                END IF;
                SELECT status
                INTO   l_status
                FROM   user_objects_ae
                WHERE  object_name = rec.object_name
                AND    object_type = rec.object_type
				AND    edition_name = p_edition_name;
                IF l_status = 'INVALID'
                THEN
                    BEGIN
                    
                        EXECUTE IMMEDIATE lsql;
                    EXCEPTION
                        WHEN OTHERS THEN
                            NULL;
                    END;
                END IF;
            
            END LOOP;
        
            lprevinvalids := lcurrinvalids;
            SELECT COUNT(*)
            INTO   lcurrinvalids
            FROM   user_objects_ae
            WHERE  status = 'INVALID'
			 AND  edition_name = p_edition_name;
        
        END IF;
    
    END LOOP;
    RETURN;
EXCEPTION
    WHEN OTHERS THEN
        p_err_code  := 'IN-CMP-001';
        p_err_param := substr(SQLERRM, 1, 255);
        dbms_output.put_line('When Others Error : ' || SQLERRM);
END;
/
Exit;
