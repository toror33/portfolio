function deposit_form_submit() {
  var deposit_money = $('#deposit_money').val();
  var deposit_txid = $('#deposit_txid').val();

  if (deposit_money == "" || deposit_money <= 0 || deposit_txid == "") {
    alert("입금수량과 Txid를 다시한번 확인해주세요.");
    return false;
  } else {
    alert("입금수량 : " + deposit_money + "\nTxid : " + deposit_txid + "\n위의 내용으로 입금신청합니다. 마이페이지에서 내역을 확인하세요.");
  }
}
function withdraw_form_submit() {
  var withdraw_money = $('#withdraw_money').val();
  $.ajax({
    url: '/bank/withdraw',
    dataType: 'json',
    type: 'POST',
    data: { price: withdraw_money },
    success: function (result) {
      console.log(result);
      alert(result.result);
      if (result.status == 0) {
        window.location.href = '/mypage/account/total';
      }
    }
  });
}