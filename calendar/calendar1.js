var year = 2023;
var month = 12;

window.onload = () => {
  updateCalendar(year, month);
};

var addCalendarHeader = (year, month) => {
  var header = document.createElement("h2");
  header.textContent = `${year}年${month}月`;
  document.getElementById("calendar").appendChild(header);
};

var generate_month_calendar = (year, month) => {
  var weekdayData = ["日", "月", "火", "水", "木", "金", "土"];

  var calendarData = get_month_calendar(year, month);
  var i = calendarData[0]["weekday"];
  while (i > 0) {
    i--;
    calendarData.unshift({
      day: "",
      weekday: i,
    });
  }
  var i = calendarData[calendarData.length - 1]["weekday"];
  while (i < 6) {
    i++;
    calendarData.push({
      day: "",
      weekday: i,
    });
  }

  var today = new Date();

  var cTable = document.createElement("table");
  cTable.className = "calendar-table";

  var insertData = "";
  insertData += "<thead>";
  insertData += "<tr>";
  for (var i = 0; i < weekdayData.length; i++) {
    insertData += "<th>";
    insertData += weekdayData[i];
    insertData += "</th>";
  }
  insertData += "</tr>";
  insertData += "</thead>";

  insertData += "<tbody>";
  for (var i = 0; i < calendarData.length; i++) {
    if (calendarData[i]["weekday"] <= 0) {
      insertData += "<tr>";
    }

    var day = calendarData[i]["day"];
    var isToday =
      today.getFullYear() === year &&
      today.getMonth() === month - 1 &&
      day === today.getDate();

    var dayColor = "";
    if (calendarData[i]["weekday"] === 6) {
      dayColor = "blue";
    } else if (calendarData[i]["weekday"] === 0) {
      dayColor = "red";
    }
    insertData +=
      "<td" +
      (isToday ? ' style="color: green;"' : "") +
      (dayColor ? ' style="color: ' + dayColor + ';"' : "") +
      ">";
    insertData += day;
    insertData += "</td>";
    if (calendarData[i]["weekday"] >= 6) {
      insertData += "</tr>";
    }
  }
  insertData += "</tbody>";
  cTable.innerHTML = insertData;
  return cTable;
};

var get_month_calendar = (year, month) => {
  var firstDate = new Date(year, month - 1, 1);
  console.log(firstDate);
  var lastDay = new Date(year, firstDate.getMonth() + 1, 0).getDate();
  console.log(lastDay);
  var weekday = firstDate.getDay();

  var calendarData = [];
  var weekdayCount = weekday;
  for (var i = 0; i < lastDay; i++) {
    calendarData[i] = {
      day: i + 1,
      weekday: weekdayCount,
    };
    if (weekdayCount >= 6) {
      weekdayCount = 0;
    } else {
      weekdayCount++;
    }
  }
  return calendarData;
};

var updateCalendar = (newYear, newMonth) => {
  var calendarContainer = document.getElementById("calendar");
  calendarContainer.innerHTML = "";

  addCalendarHeader(newYear, newMonth);

  var data = generate_month_calendar(newYear, newMonth);
  calendarContainer.appendChild(data);
};

var nextMonthButton = document.createElement("button");
nextMonthButton.textContent = "翌月";
nextMonthButton.addEventListener("click", () => {
  month++;
  if (month > 12) {
    month = 1;
    year++;
  }
  updateCalendar(year, month);
});

var prevMonthButton = document.createElement("button");
prevMonthButton.textContent = "前月";
prevMonthButton.addEventListener("click", () => {
  month--;
  if (month < 1) {
    month = 12;
    year--;
  }
  updateCalendar(year, month);
});

document.body.appendChild(prevMonthButton);
document.body.appendChild(nextMonthButton);
