declare 
  
  q_table varchar2(30);
  q_name varchar2(40);
  
  sub_name varchar2(50);
  
begin
  
  q_table:='&queuetable';
  q_name:='&queuename';
  sub_name:='&subscriber';
   DBMS_AQADM.CREATE_QUEUE_TABLE (
          queue_table        => q_table,
          queue_payload_type => 'poss_queue_payload_type',
          multiple_consumers => TRUE
          );
  
  DBMS_AQADM.CREATE_QUEUE (
         queue_name  => q_name,
         queue_table => q_table
         );
         
  DBMS_AQADM.START_QUEUE (
         queue_name => q_name
         );
         
  DBMS_AQADM.ADD_SUBSCRIBER (
        queue_name => q_name,
        subscriber => SYS.AQ$_AGENT(
                         sub_name,
                         NULL,
                         NULL )
        );
   DBMS_AQ.REGISTER (
         SYS.AQ$_REG_INFO_LIST(
            SYS.AQ$_REG_INFO(
               q_name||':'||sub_name,
               DBMS_AQ.NAMESPACE_AQ,
               'plsql://PR_POSS_Q_NEXT_CALLBACK',
               HEXTORAW('FF')
               )
            ),
         1
         );
         
          
   
  
end;

/