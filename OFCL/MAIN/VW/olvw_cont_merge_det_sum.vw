CREATE OR REPLACE VIEW olvw_cont_merge_det_sum AS
SELECT
w1.contract_ref_no,
w1.merge_book_date,
w1.merge_value_date,
l.auth_status
FROM  oltbs_contract_merge_master w1, oltbs_contract_event_log l
WHERE  w1.contract_ref_no  = l.contract_ref_no
AND    w1.auth_stat = l.auth_status
AND  w1.mrgb_esn    =
(
SELECT  MAX(w2.mrgb_esn)
FROM  oltbs_contract_merge_master w2
WHERE  w2.contract_ref_no  = w1.contract_ref_no
--AND w2.mrgb_esn =  l.event_seq_no--Bug#33859084 added
)
AND w1.mrgb_esn =  l.event_seq_no--Bug#33859084 commented
--Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = (SELECT sypks_utils.get_product(W1.CONTRACT_REF_NO) FROM DUAL)
      AND USER_ID = global.user_id)
--Product Access restriction - End
ORDER BY contract_ref_no, event_seq_no
/
Create or Replace synonym olvws_cont_merge_det_sum for olvw_cont_merge_det_sum
/