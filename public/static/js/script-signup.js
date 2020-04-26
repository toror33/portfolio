$("#phoneAuth").click(function () {
  $('#myModal').modal('show')
});
function phoneAuth() {
  var phone = $('#contact-phone').val();
  if (!phone || phone == "") {
    alert("휴대폰번호를 입력해주세요.");
    return false;
  } else {
    $.ajax({
      url: '/auth/phoneAuth',
      dataType: 'json',
      type: 'POST',
      data: { status: 0, phone: phone },
      success: function (result) {
        if (result.status == 0) {
          $('#myModal').modal('show');
        } else {
          return false;
        }
      }
    });
  }
}
function submitAuth() {
  var authNumber = $('#contact-auth').val();
  if (!authNumber || authNumber == "") {
    alert("인증번호를 입력해주세요.");
    return false;
  } else {
    $.ajax({
      url: '/auth/phoneAuth',
      dataType: 'json',
      type: 'POST',
      data: { status: 1, authNumber: authNumber },
      success: function (result) {
        if (result.status == 0) {
          alert("인증되었습니다.");
          $('#contact-phone').prop('readonly', true);
          $('#phoneAuthButton').prop('disabled', true);
          $('#myModal').modal('hide');
        } else {
          alert("인증번호를 다시한번 확인해주세요.")
          return false;
        }
      }
    });
  }
}


function form_submit() {
  var useCheck = $('input:checkbox[id="termsCheckbox"]').is(":checked");
  var personalCheck = $('input:checkbox[id="agreeCheckbox"]').is(":checked");
  if (!useCheck || !personalCheck) {
    alert("이용약관에 동의 후 회원가입이 가능합니다.");
    return false;
  }
  var name = $('#contact-name').val();
  if (!name || name == "") {
    alert("이름을 입력해주세요.");
    return false;
  }

  var email = $('#contact-email').val();
  if (!email || email == "") {
    alert("이메일을 입력해주세요.");
    return false;
  } else {
    var emailCheck = CheckEmail(email);
    if (!emailCheck) {
      alert("정확한 이메일 주소를 입력해주세요.");
      return false;
    }
  }
  var phone = $('#contact-phone').val();
  if (!phone || phone == "") {
    alert("휴대폰번호를 입력해주세요.");
    return false;
  }
  var id = $('#contact-id').val();
  if (!id || id == "") {
    alert("아이디를 입력해주세요.");
    return false;
  }
  var pw = $('#contact-pw').val();
  if (!pw || pw == "") {
    alert("비밀번호를 입력해주세요.");
    return false;
  } else {
    var pwCheck = chkPW(pw);
    if (!pwCheck) {
      return false;
    }
  }
  var pwck = $('#contact-pwck').val();
  if (!pwck || pwck == "") {
    alert("비밀번호를 입력해주세요.");
    return false;
  }
  if (pw != pwck) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }
  if (!$('#contact-phone').prop("readonly")) {
    alert("휴대전화 인증을 해주세요.");
    return false;
  }
  var ref = $('#contact-ref').val();
  $.ajax({
    url: '/auth/signup',
    dataType: 'json',
    type: 'POST',
    data: { status: 0, name: name, phone: phone, email: email, id: id, password: pw, password_ck: pwck, ref: ref },
    success: function (result) {
      if (result.status == 0) {
        alert(result.msg);
        window.location.href = '/auth/login';
      } else {
        alert(result.msg);
        return false;
      }
    }
  });
}


function CheckEmail(str) {
  var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (!reg_email.test(str)) {
    return false;
  }
  else {
    return true;
  }
}

function chkPW(pw) {
  var num = pw.search(/[0-9]/g);
  var eng = pw.search(/[a-z]/ig);
  var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  if (pw.length < 10 || pw.length > 20) {
    alert("비밀번호는 10자리이상 20자리 이내로 입력해주세요.");
    return false;
  } else if (pw.search(/\s/) != -1) {
    alert("비밀번호는 공백 없이 입력해주세요.");
    return false;
  } else if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
    alert("영문, 숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.");
    return false;
  } else {
    return true;
  }
}
