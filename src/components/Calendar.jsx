import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ trainings }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const formattedEvents = trainings.map(training => ({
      title: training.activity,
      start: moment(training.date).toDate(),
      end: moment(training.date).add(training.duration, 'minutes').toDate(),
      allDay: false,
      tooltip: `Activity: ${training.activity}\nCustomer: ${training.customerName}\nDuration: ${training.duration} minutes`,

    }));
    setEvents(formattedEvents);
  }, [trainings]);

  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        tooltipAccessor="tooltip"
        style={{ height: '80%' }}
      />
    </div>
  );
};

export default MyCalendar;
