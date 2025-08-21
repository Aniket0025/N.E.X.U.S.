import React, { useEffect, useState } from 'react';

// IMPORTANT: Replace these with your own credentials from Google Cloud Console (Client ID must be a Web app client)
const CLIENT_ID = 'YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

export default function GoogleMeetPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    title: 'Startup Pitch Meeting',
    description: 'Discuss your startup pitch with mentors and investors',
    duration: 30,
  });

  useEffect(() => {
    function start() {
      if (!window.gapi) return;
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsAuthenticated(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(setIsAuthenticated);
        })
        .catch((err) => {
          console.error('gapi init error', err);
          alert('Failed to initialize Google API client. Check API key/Client ID.');
        });
    }

    // Load gapi client if script already loaded
    if (window.gapi) {
      window.gapi.load('client:auth2', start);
    }
  }, []);

  const handleCreateMeeting = async () => {
    try {
      setIsLoading(true);
      if (!window.gapi) throw new Error('Google API not loaded');

      if (!isAuthenticated) {
        await window.gapi.auth2.getAuthInstance().signIn();
        setIsAuthenticated(true);
      }

      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + meetingDetails.duration * 60 * 1000);

      const event = {
        summary: meetingDetails.title,
        description: meetingDetails.description,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        conferenceData: {
          createRequest: {
            requestId: `meet-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      };

      const request = window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
      });

      request.execute((ev) => {
        if (ev && (ev.hangoutLink || (ev.conferenceData?.entryPoints || []).find((p) => p.entryPointType === 'video')?.uri)) {
          const link = ev.hangoutLink || (ev.conferenceData.entryPoints || []).find((p) => p.entryPointType === 'video')?.uri;
          setMeetingLink(link);
        } else {
          console.error('No hangoutLink in event response', ev);
          alert('Failed to create meeting link. Ensure Calendar API is enabled and consent complete.');
        }
      });
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert(error?.result?.error?.message || error?.message || 'Failed to create meeting.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Google Meet (Client-side)</h2>
      <div style={{ marginTop: 8, marginBottom: 16, color: isAuthenticated ? '#16a34a' : '#ef4444' }}>
        Status: {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
      </div>

      <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
        <label>Meeting Title</label>
        <input
          value={meetingDetails.title}
          onChange={(e) => setMeetingDetails({ ...meetingDetails, title: e.target.value })}
          placeholder="Title"
        />
        <label>Description</label>
        <textarea
          value={meetingDetails.description}
          onChange={(e) => setMeetingDetails({ ...meetingDetails, description: e.target.value })}
          rows={3}
          placeholder="Description"
        />
        <label>Duration (minutes)</label>
        <select
          value={meetingDetails.duration}
          onChange={(e) => setMeetingDetails({ ...meetingDetails, duration: parseInt(e.target.value, 10) })}
        >
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
          <option value={60}>60</option>
          <option value={90}>90</option>
        </select>

        <button onClick={handleCreateMeeting} disabled={isLoading} style={{ padding: '10px 14px' }}>
          {isLoading ? 'Creating...' : 'Create Google Meet'}
        </button>
      </div>

      {meetingLink && (
        <div style={{ marginTop: 20 }}>
          <div>Meeting Link</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={meetingLink} readOnly style={{ flex: 1 }} />
            <button onClick={copyToClipboard}>{copied ? 'Copied' : 'Copy'}</button>
            <a href={meetingLink} target="_blank" rel="noreferrer">
              Join
            </a>
          </div>
        </div>
      )}

      <div style={{ marginTop: 24, color: '#64748b' }}>
        Note: This page uses your browser session and Google consent to create a Calendar event with a Meet link. No backend secret required.
      </div>
    </div>
  );
}
