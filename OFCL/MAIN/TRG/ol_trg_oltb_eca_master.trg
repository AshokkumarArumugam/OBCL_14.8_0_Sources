CREATE OR REPLACE TRIGGER trg_oltb_eca_req_master
AFTER insert OR update or delete on OLTB_ECA_REQ_MASTER
for each row

DECLARE

BEGIN

 Debug.Pr_Debug('OL','STATUS TRG_oltb_eca_req_master  ' );
 debug.pr_debug('OL','CONTRACT_REF_NO      -->'||:OLD.CONTRACT_REF_NO||'~'||:New.CONTRACT_REF_NO);
 debug.pr_debug('OL','ECA_REQ_STATUS       -->'||:OLD.ECA_REQ_STATUS||'~'||:New.ECA_REQ_STATUS);
 debug.pr_debug('OL','LIQUIDATION_STATUS       -->'||:OLD.LIQUIDATION_STATUS||'~'||:New.LIQUIDATION_STATUS);
 debug.pr_debug('OL','PROCESS_TIME       -->'||:OLD.PROCESS_TIME||'~'||:New.PROCESS_TIME);
 debug.pr_debug('OL', 'trace'||DBMS_UTILITY.format_call_stack);
 
 IF INSERTING
 THEN

  Debug.pr_Debug('OL',' TRG_oltb_eca_req_master insert ::  '||sql%rowcount);


 ELSIF UPDATING
 THEN
  Debug.pr_Debug('OL',' TRG_oltb_eca_req_master UPDATE ::  '||sql%rowcount);

 ELSIF DELETING
 THEN
  Debug.pr_Debug('OL',' TRG_oltb_eca_req_master Deleting ::  '||sql%rowcount);
  
 END IF;

EXCEPTION
 WHEN others THEN
  raise_application_error(-20001,'Error in logging' || sqlerrm);
END;
/