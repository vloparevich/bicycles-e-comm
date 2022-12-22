import Button from '@mui/material/Button';
import moment from 'moment';
import { Calendar } from 'react-multi-date-picker';
import './Calendar.styles.scss';

export const CalendarCmp = ({
  calendarButtonHandler,
  showCalendar,
  dates,
  setDates,
}) => {
  return (
    <div className='calendar-container'>
      <Button
        className='show-calendar-button'
        color={showCalendar ? 'warning' : 'success'}
        variant='contained'
        onClick={calendarButtonHandler}
      >
        {!showCalendar ? 'Calendar' : 'Hide Calendar'}
      </Button>

      {showCalendar && (
        <div>
          <Calendar
            value={dates}
            onChange={setDates}
            multiple={true}
            minDate={moment().toDate()}
          />
        </div>
      )}
    </div>
  );
};
