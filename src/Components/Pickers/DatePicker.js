import { getDay, getMonth, getYear } from "date-fns";
import React from "react";
import DatePickerRaw from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { formatDateToTodoDate } from "../../shared/date-formatter";
import Icon from "../../shared/Icon";

const FormScheduleButton = styled.button`
  margin-right: ${(props) => props.theme.spaces[43]};
  font-size: ${(props) => props.theme.spaces[36]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => props.theme.spaces[5]};
  padding: ${(props) => props.theme.spaces[28]}
    ${(props) => props.theme.spaces[43]};
  border: ${(props) => props.theme.spaces[8]} solid
    ${(props) => props.theme.colors.muted9};
  border-radius: ${(props) => props.theme.spaces[1]};
  color: ${(props) => props.theme.colors.text3};
  width: ${(props) => props.theme.spaces[44]};
  background-color: transparent;
  outline: none;
`;


const TodoDateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  min-height: 16px;
  cursor: pointer;
`;

const today = new Date();

class DatePickerInput extends React.Component {
  render() {
    const todayDateValue = formatDateToTodoDate(new Date());
    const { onClick, value, placeholderText } = this.props;
    const finalValue = value ? formatDateToTodoDate(value) : placeholderText;

    const todayValue =
      finalValue === todayDateValue ? (
        <TodoDateContainer>
          <div
            style={{
              height: 12,
              width: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: finalValue === todayDateValue && "green",
              margin: "1px 4px 3px 0px",
            }}
          >
            <Icon name="calendar1" style={{ fontSize: 10 }} />
          </div>
          <span style={{ color: "green" }}>Today</span>
        </TodoDateContainer>
      ) : (
        <div>
          <TodoDateContainer>
            <div
              style={{
                height: 12,
                width: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "1px 4px 3px 0px",
              }}
            >
              <Icon name="calendar1" style={{ fontSize: 10 }} />
            </div>
            <span style={{ color: finalValue !== todayDateValue && "grey" }}>
              {finalValue}
            </span>
          </TodoDateContainer>
        </div>
      );

    return (
      <FormScheduleButton onClick={onClick}>{todayValue}</FormScheduleButton>
    );
  }
}

const isWeekday = (date) => {
  const day = getDay(date);
  return day !== 0 && day !== 6;
};

const renderDayContents = (date) => {
  const tooltipText = `Tooltip for date: ${date}`;
  return <span title={tooltipText}>{date}</span>;
};

const DatePicker = ({ onChange, selected, placeholder }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <DatePickerRaw
        onChange={onChange}
        selected={selected}
        // minDate={new Date()}
        customInput={<DatePickerInput placeholderText={placeholder} />}
        renderDayContents={renderDayContents}
        filterDate={isWeekday}
        renderCustomHeader={({ decreaseMonth, increaseMonth, date }) => (
          <div
            style={{
              margin: 0,
              marginTop: -8,
              backgroundColor: "white",
              borderRadius: 3,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px 10px 8px 13px",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  marginLeft: 3,
                }}
              >
                {formatDateToTodoDate(today)}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 10px 4px 16px",
              }}
            >
              <span className="react-datepicker__current-month">
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    display: "flex",
                  }}
                >
                  <span style={{ marginRight: 5 }}>
                    {months[getMonth(date)]}
                  </span>
                  <span>{getYear(date)}</span>
                </div>
              </span>
              <div>
                <button
                  onClick={decreaseMonth}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    color: "grey",
                    cursor: "pointer",
                    marginRight: 10,
                  }}
                >
                  <Icon name="leftArrow" />
                </button>
                <button
                  onClick={increaseMonth}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    color: "grey",
                    cursor: "pointer",
                  }}
                >
                  <Icon name="rightArrow" />
                </button>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default DatePicker;
