document.addEventListener('DOMContentLoaded', function () {
  $.ajax({
    url: '/event',
    dataType: 'json',
    type: 'POST',
    data: { status: 0 },
    success: function (result) {
      if (result.status == 0) {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
          plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
          }, 
          locale : "ko",
          defaultDate: result.curDate,
          navLinks: true, // can click day/week names to navigate views
          businessHours: true, // display business hours
          editable: true,
          events: result.data, eventClick: function (arg) {
            $.ajax({
              url: '/getEvent',
              dataType: 'json',
              type: 'POST',
              data: { status: 0, event: arg.event.id },
              success: function (result) {
                if (result.status == 1) {
                  alert(result.msg);
                  window.location.href = '/auth/login';
                }
                else {
                  //alert(result.msg);
                  $('#e_no').html(result.event[0].no);
                  $('#e_numFunc').html(result.event[0].num);
                  $('#e_perFunc').html(result.event[0].personnel);
                  $('#e_title').html(result.event[0].title);
                  $('#e_place').html(result.event[0].place);
                  $('#e_date').html(result.event[0].date);
                  $('#e_per').html(result.event[0].num + " / " + result.event[0].personnel);
                  $('#e_contents').html(result.event[0].contents);
                  $('#e_ins').html(result.event[0].instructor);
                  $('#e_time').html(result.event[0].time);
                  $('#e_start').html(result.event[0].reservestart);
                  $('#e_end').html(result.event[0].reserveend);
                  $('#e_startFunc').html(result.event[0].reservestarttemp);

                  if (result.check) {
                    $('#e_btn').text('예약취소');
                  } else {
                    $('#e_btn').text('예약하기');
                  }

                  $('#eventModal').modal('show');
                }
              }
            });
          }
        });

        calendar.render();
      }
    }
  });
});


function reserve() {
  var no = $('#e_no').text();
  var num = parseInt($('#e_numFunc').text());
  var per = parseInt($('#e_perFunc').text());
  var type = 0; //신청
  var btn = $('#e_btn').text();
  if (btn == "예약취소") {
    type = 1;//취소
  }

  if (num >= per && type == 0) {
    alert("신청가능인원을 초과했습니다.");
    return false;
  }

  var start = new Date($('#e_startFunc').text()).getTime();
  var end = new Date($('#e_end').text()).getTime();
  var cur = new Date().getTime();
  if (start > cur && type == 0) {
    alert("예약 시작날짜를 확인해주세요.");
    return false;
  }
  if (cur > end && type == 0) {
    alert("예약가능 날짜가 지났습니다.");
    return false;
  }
  $.ajax({
    url: '/resEvent',
    dataType: 'json',
    type: 'POST',
    data: { type: type, event: no },
    success: function (result) {
      alert(result.msg);
    }
  });
}