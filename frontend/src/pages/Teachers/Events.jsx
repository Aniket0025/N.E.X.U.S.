import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  EventCalendarContainer,
  Content,
  AddEventForm,
  EventInput,
  AddEventButton,
  ErrorText,
  Events,
  Event,
} from '../../styles/EventCalendarStyles';

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events/getall');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events');
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/events', newEvent);
      setEvents([...events, response.data.event]);
      setNewEvent({ title: '', date: '' });
      setError(null);
    } catch (error) {
      console.error('Error adding event:', error);
      setError('Error adding event');
    }
  };

  return (
    <EventCalendarContainer style={{ marginLeft: "250px" }}>

      <Sidebar />
      <Content>
        <h1>Events & Calendar</h1>
        <AddEventForm onSubmit={addEvent}>
          <h2>Add New Event</h2>
          <EventInput
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <EventInput
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <AddEventButton type="submit">Add Event</AddEventButton>
        </AddEventForm>
        {error && <ErrorText>{error}</ErrorText>}
        <Events>
          <h2>Events</h2>
          {events.map((event, index) => (
            <Event key={index}>
              <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()}
            </Event>
          ))}
        </Events>
      </Content>
    </EventCalendarContainer>
  );
};

export default EventSection;
