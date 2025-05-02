import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AdminDashboardContainer,
  Content,
  TopContent,
  BottomContent,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
  EventItem,
} from '../../styles/DashboardStyles';

const AdminDashboard = () => {
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
    <AdminDashboardContainer style={{ marginLeft: "250px" }}>
      <Sidebar />
      <Content>
        <TopContent>
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <CardContainer>
              <Card>
                <CardTitle>Total Students</CardTitle>
                <CardContent>500</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Teachers</CardTitle>
                <CardContent>50</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Classes</CardTitle>
                <CardContent>50</CardContent>
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
        </TopContent>
        <BottomContent>
          {/* Optional bottom content here */}
        </BottomContent>
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
