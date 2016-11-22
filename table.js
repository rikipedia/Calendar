// ページを開いたときの処理
window.onload = function() {
  setCalendar();
};

function setCalendar(yy, mm) {
  var yy, mm; 

  if (!yy && !mm) {
    var yy = new Date().getFullYear();
    var mm = new Date().getMonth();
    mm = mm -(-1);
  }

  var zdate = new Date(yy,mm-1,0); // 前月末
  var tdate = new Date(yy,mm,0);   // 当月末
  zedd = zdate.getDate();          // 前月末日
  zedy = zdate.getDay();           // 前月末曜日
  tedd = tdate.getDate();          // 当月末日
  tedy = tdate.getDay();           // 当月末曜日

  var days = [];

  if (zedy != 6) {
    for (var i=zedy; i>=0; i--) {
      days[zedy-i] = (zedd - i);
    }

    for (var i=1; i<=tedd; i++) {
      days[zedy+i] = i;
    }

    if ((zedy + tedd) <= 34) {
    
      for (var i=1; i<35-zedy-tedd; i++) {
        days[zedy+tedd+i] = i;
      }
    } else if((zedy + tedd) > 34) {
      
      for (var i=1; i<42-zedy-tedd; i++) {
        days[zedy+tedd+i] = i;
      }
    }

  } else if(zedy == 6) {
    
    for (var i=1; i<=tedd; i++) {
      days[i-1] = i;
    }
    
    for (var i=0; i<35-tedd; i++) {
      days[tedd+i] = i + 1;
    }
  }

  var out = "<table>";

  out += "<caption id='caption-left'>";
  out += "<a href='#' onclick='setCalendar();return false;'>今月 </a>";
  out += "<a href='#' yy='"+yy+"' mm='"+mm+"' onclick='backmm(this);return false;'>\<\< </a>";
  out += "<a href='#' yy='"+yy+"' mm='"+mm+"' onclick='nextmm(this);return false;'>\>\></a>";
  out += yy+'年'+mm+'月';
  out += "</caption>";

  var youbi = ["日", "月", "火", "水", "木", "金", "土"];
  out += "<thead>";
  out += "<tr>";

  for (var i in youbi) {
    out += "<th class='day_of_the_week'>"+youbi[i]+"</th>";
  }

  out += "</tr>"
  out += "</thead>"

  var row = days.length/7;

  for (var i = 1; i <= row; i++) {
    
    out += "<tr>";
    for (var j = 7 * i - 6; j <= 7 * i; j++) {
      out += "<td class='tdlink' row='"+i+"' yy='"+yy+"' mm='"+mm+"' dd='"+days[j-1]+"' onclick='show(this);return false;'>"+days[j-1]+"</td>";
    }
    out += "</tr>";
  }
  out += "</table>";

  document.getElementById("result").innerHTML = out;
}

function backmm(e) {
  var yy = e.getAttribute('yy');
  var mm = e.getAttribute('mm');
  if (mm != 1) {
    mm = mm-1;
  } else if (mm == 1) {
    mm = 12;
    yy = yy - 1;
  }
  setCalendar(yy, mm);
}

function nextmm(e) {
  var yy = e.getAttribute('yy');
  var mm = e.getAttribute('mm');
  if (mm != 12) {
    mm = parseInt(mm) + 1;
  } else if (mm == 12) {
    mm = 1;
    yy = parseInt(yy) + 1;
  }
  setCalendar(yy, mm);
}

function show(e) {
  var row = e.getAttribute('row');
  var yy = e.getAttribute('yy');
  var mm = e.getAttribute('mm');
  var dd = e.getAttribute('dd');

  // クリック対象が1行目かつ前月の日付  
  if (row == 1 && dd > 7) {
    if (mm != 1) {
      mm = mm -1;
    } else if (mm == 1) {
      yy = yy - 1;
      mm = 12;
    }
  }
  // クリック対象が最終行かつ翌月の日付
  if ((row == 5 || row == 6) && dd < 7) {
    if (mm != 12) {
      mm = parseInt(mm) + 1;
    } else if (mm == 12) {
      yy = parseInt(yy) + 1;
      mm = 1;
    }
  }
    alert(yy+'/'+mm+'/'+dd);
}
