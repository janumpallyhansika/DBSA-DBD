import {
  Plane,
  Hotel,
  Map,
  Bot,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import DestinationCard from '../../components/DestinationCard/DestinationCard';
import TripCard from '../../components/TripCard/TripCard';

import {
  destinations,
  trips,
} from '../../data/mockData';

import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-inner dashboard-page">

      <div className="dashboard-heading">
        <div>
          <h1>Hello, Hansika! 👋</h1>
          <p>Let's explore India and plan your next journey.</p>
        </div>
      </div>

      <div className="quick-actions">
        <button
          onClick={() => navigate('/explore')}
          className="quick-action"
        >
          <div className="quick-icon blue">
            <Plane size={20} />
          </div>

          <div>
            <strong>Explore India</strong>
            <span>Discover destinations</span>
          </div>
        </button>

        <button
          onClick={() => navigate('/plan-trip')}
          className="quick-action"
        >
          <div className="quick-icon purple">
            <Map size={20} />
          </div>

          <div>
            <strong>Plan My Trip</strong>
            <span>Build your itinerary</span>
          </div>
        </button>

        <button
          onClick={() => navigate('/customize-trip')}
          className="quick-action"
        >
          <div className="quick-icon yellow">
            <Hotel size={20} />
          </div>

          <div>
            <strong>Customize Trip</strong>
            <span>Choose every place</span>
          </div>
        </button>

        <button
          onClick={() => navigate('/ai-assistant')}
          className="quick-action"
        >
          <div className="quick-icon pink">
            <Bot size={20} />
          </div>

          <div>
            <strong>AI Assistant</strong>
            <span>Ask for travel help</span>
          </div>
        </button>
      </div>

      <div className="dashboard-main-grid">

        <div>
          <div className="hero-banner">
            <div className="hero-banner-overlay"></div>

            <div className="hero-banner-content">
              <span>DISCOVER INCREDIBLE INDIA</span>

              <h2>
                Every journey
                <br />
                tells a story.
              </h2>

              <p>
                Explore breathtaking places and create
                journeys designed around you.
              </p>

              <button
                onClick={() => navigate('/explore')}
              >
                Explore Now
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  Popular Destinations
                </h2>

                <p className="section-subtitle">
                  Places travelers are exploring
                </p>
              </div>

              <button
                className="text-button"
                onClick={() => navigate('/explore')}
              >
                View All
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="destination-grid">
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-side">

          <div className="dashboard-widget">
            <div className="widget-heading">
              <div>
                <h3>Upcoming Trip</h3>
                <span>Your next adventure</span>
              </div>

              <button onClick={() => navigate('/my-trips')}>
                View All
              </button>
            </div>

            <div className="upcoming-trip">
              <img
                src={trips[0].image}
                alt={trips[0].destination}
              />

              <div className="upcoming-content">
                <h4>{trips[0].destination}</h4>
                <p>5 Days • 10 Places</p>
                <span>Upcoming</span>
              </div>
            </div>
          </div>

          <div className="ai-widget">
            <div className="ai-widget-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <h3>Ask your AI Travel Guide</h3>

              <p>
                Need ideas? Ask about destinations,
                activities or itinerary planning.
              </p>

              <button
                onClick={() => navigate('/ai-assistant')}
              >
                Start Chat
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;