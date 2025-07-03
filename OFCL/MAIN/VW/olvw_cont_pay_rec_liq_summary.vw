CREATE OR REPLACE VIEW olvw_cont_pay_rec_liq_summary AS
   SELECT
   w1.contract_ref_no
   , w1.event_seq_no
   , l.event_code
   , l.auth_status
   , w1.component
   , w1.due_date
   , w1.paid_date
   , w1.amount_due
   , w1.amount_settled
   FROM  oltbs_payrecv_paid w1, oltbs_contract_event_log l
   WHERE  w1.contract_ref_no  = l.contract_ref_no
   AND  w1.event_seq_no    = l.event_seq_no
   AND  w1.event_seq_no    =
           (
           SELECT  MAX(w2.event_seq_no)
           FROM  oltbs_payrecv_paid w2
           WHERE  w2.contract_ref_no  = w1.contract_ref_no
           AND  w2.component  = w1.component
           AND  w2.due_date    = w1.due_date
           AND  w2.paid_date   = w1.paid_date
         )
 ORDER BY contract_ref_no, event_seq_no, component, due_date, paid_date
/
CREATE OR REPLACE SYNONYM olvws_cont_pay_rec_liq_summary FOR olvw_cont_pay_rec_liq_summary
/