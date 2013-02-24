TOML.DocumentParser.Datetime = {
  interpret: function() {
    var date = new Date();
    date.setFullYear(parseInt(this.year.textValue, 10));
    date.setMonth(parseInt(this.month.textValue, 10) - 1);
    date.setDate(parseInt(this.day.textValue, 10));
    date.setHours(parseInt(this.hour.textValue, 10));
    date.setMinutes(parseInt(this.minute.textValue, 10));
    date.setSeconds(parseInt(this.second.textValue + this.fraction.textValue, 10));
    return date;
  }
};

