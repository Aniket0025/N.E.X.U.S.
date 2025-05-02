import React, { useEffect, useState, useContext } from 'react';
import Sidebar from './Sidebar';
import {
  StudentDashboardContainer,
  Content,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
  EventItem,
} from '../../styles/DashboardStyles';
import axios from 'axios';
import { StudentContext } from '../../contexts/StudentContext';

const StudentDashboard = () => {
  const { student } = useContext(StudentContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events/getall');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <StudentDashboardContainer>
      <Sidebar />
      <Content>
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Assignments</CardTitle>
              <CardContent>5</CardContent>
            </Card>
            <Card>
              <CardTitle>Performance</CardTitle>
              <CardContent>500</CardContent>
            </Card>
            <Card>
              <CardTitle>Term</CardTitle>
              <CardContent>1</CardContent>
            </Card>
          </CardContainer>
        </Section>

        <Section>
          <SectionTitle>Upcoming Events</SectionTitle>
          {events.map((event, index) => (
            <EventItem key={index}>
              <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()}
            </EventItem>
          ))}
        </Section>
      </Content>
    </StudentDashboardContainer>
  );
};

export default StudentDashboard;
