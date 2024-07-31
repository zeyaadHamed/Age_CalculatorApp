$(document).ready(function() {
    // Select input fields
    const $day = $("#day");
    const $month = $("#month");
    const $year = $("#year");
    const $submitBtn = $("#submit");
  
    // Select error message elements
    const $errorDay = $("#error_day");
    const $errorMonth = $("#error_month");
    const $errorYear = $("#error_year");
  
    // Select output elements
    const $outYears = $(".output_years");
    const $outMonths = $(".output_monhts");
    const $outDays = $(".output_days");
    const $outBirthdayDays = $(".output_birthday_days");
  
    // Get the current date
    let nowDate = new Date();
  
    // Input validation
    $day.on("input", function(e) {
      const dayText = $(this).val();
      inputValidation(dayText, $day);
    });
  
    $month.on("input", function(e) {
      const monthText = $(this).val();
      inputValidation(monthText, $month);
    });
  
    $year.on("input", function(e) {
      const yearText = $(this).val();
      inputValidation(yearText, $year);
    });
  
    // Calculate age and days until next birthday
    $submitBtn.on("click", function() {
      let dayLabel = $day.prev();
      let monthLabel = $month.prev();
      let yearLabel = $year.prev();
  
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
      if ($year.val() && isLeapYear($year.val())) {
        daysInMonth[1] = 29; // Adjust for leap year
      }
  
      let dayValue = parseInt($day.val(), 10);
      let monthValue = parseInt($month.val(), 10);
      let yearValue = parseInt($year.val(), 10);
  
      if (dayValue > daysInMonth[monthValue - 1] || isNaN(dayValue) || dayValue === "") {
        $errorDay.text("Must be a valid day for the given month");
        classListEffect($day, dayLabel, $errorDay);
      }
  
      if (monthValue > 12 || isNaN(monthValue) || monthValue === "") {
        $errorMonth.text("Must be a valid month");
        classListEffect($month, monthLabel, $errorMonth);
      }
  
      if (yearValue > nowDate.getFullYear() || isNaN(yearValue) || yearValue === "" || yearValue < 1950 || $year.val().length !== 4) {
        $errorYear.text("Must be a valid year 4 digits more than 1950");
        classListEffect($year, yearLabel, $errorYear);
      }
  
      if (
        dayValue <= daysInMonth[monthValue - 1] && dayValue !== "" &&
        monthValue <= 12 && monthValue !== "" &&
        yearValue <= nowDate.getFullYear() && yearValue !== "" &&
        yearValue >= 1950 && $year.val().length === 4
      ) {
        let nowDay = nowDate.getDate();
        let nowMonth = 1 + nowDate.getMonth();
        let nowYear = nowDate.getFullYear();
  
        if (dayValue > nowDay) {
          nowDay = nowDay + daysInMonth[nowMonth - 1];
          nowMonth = nowMonth - 1;
        }
        if (monthValue > nowMonth) {
          nowMonth = nowMonth + 12;
          nowYear = nowYear - 1;
        }
  
        const d = nowDay - dayValue;
        const m = nowMonth - monthValue;
        const y = nowYear - yearValue;
  
        $outDays.text(d);
        $outMonths.text(m);
        $outYears.text(y);
  
        // Calculate days until next birthday
        let nextBirthday = new Date(nowDate.getFullYear(), monthValue - 1, dayValue);
        if (nextBirthday < nowDate) {
          nextBirthday.setFullYear(nowDate.getFullYear() + 1);
        }
  
        const diffTime = Math.abs(nextBirthday - nowDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
        $outBirthdayDays.text(diffDays);
  
        // Clear input fields
        $day.val('');
        $month.val('');
        $year.val('');
      }
    });
  
    // Function to validate input (allows only numbers)
    function inputValidation(value, input) {
      const text = value.replace(/[^0-9]/g, '');
      input.val(text);
    }
  
    // Function to apply and remove error styles
    function classListEffect(input, label, errorText) {
      input.addClass("border-effect");
      label.addClass("color-effect");
      setTimeout(() => {
        errorText.text("");
        input.removeClass("border-effect");
        label.removeClass("color-effect");
      }, 1500);
    }
  
    // Function to check if a year is a leap year
    function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
  });
  