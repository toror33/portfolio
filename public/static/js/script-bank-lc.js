
function sell_lc() {

  if($('#sell_lc').val() == null || $('#sell_lc').val() == ""){
    alert("판매수량을 입력해주세요.");
    return false;
  }
  var sell_lc = parseInt($('#sell_lc').val());
  var can_selling_lc = $('#can_selling_lc').val();
  can_selling_lc.replace(" LC", "");
  can_selling_lc = parseInt(can_selling_lc);
  var current_lc = $('#current_lc').val();
  current_lc.replace(" BTC", "");
  current_lc = parseFloat(current_lc);
  
  if (sell_lc == "" || sell_lc <= 0 || sell_lc > can_selling_lc) {
    alert("판매가능수량을 다시한번 확인해주세요.");
    return false;
  } else {
    alert("LC판매수량 : " + sell_lc + "\n위의 내역으로 LC를 판매합니다. 마이페이지에서 판매내역을 확인하세요.");
    $.ajax({
      url: '/exchange/selllc',
      dataType: 'json',
      type: 'POST',
      data: { sell_lc: sell_lc, current_lc: current_lc},
      success: function (result) {
        console.log(result);
        if(result.status == 1){
          alert(result.msg);
        }else{
          alert(result.msg);
          window.location.href = '/mypage/account/total';
        }
      }
    });
  }
}

function buy_lc() {
  var useCheck = $('input:checkbox[id="termsCheckbox"]').is(":checked");
  if (!useCheck) {
    alert("유의사항에 동의 구매가 가능합니다.");
    return false;
  }
  if($('#exchange_lc').val() == null || $('#exchange_lc').val() == ""){
    alert("구매수량을 입력해주세요.");
    return false;
  }
  var exchange_lc = parseInt($('#exchange_lc').val());
  var can_exchange_lc = $('#can_exchange_lc').val();
  can_exchange_lc.replace(" LC", "");
  can_exchange_lc = parseInt(can_exchange_lc);
  var current_lc = $('#current_lc').val();
  current_lc.replace(" BTC", "");
  current_lc = parseFloat(current_lc);

  if (exchange_lc == "" || exchange_lc <= 0 || exchange_lc > can_exchange_lc) {
    alert("구매가능수량을 다시한번 확인해주세요.");
    return false;
  } else {
    alert("LC구매수량 : " + exchange_lc + "\n위의 내역으로 LC를 구매합니다. 마이페이지에서 구매내역을 확인하세요.");
    $.ajax({
      url: '/exchange/buylc',
      dataType: 'json',
      type: 'POST',
      data: { exchange_lc: exchange_lc, current_lc:current_lc },
      success: function (result) {
        console.log(result);
        if(result.status == 1){
          alert(result.msg);
        }else{
          alert(result.msg);
          window.location.href = '/mypage/account/total';
        }
      }
    });
  }
}

