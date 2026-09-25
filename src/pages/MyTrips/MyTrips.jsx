import { Plus } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import TripCard from '../../components/TripCard/TripCard';

import { trips } from '../../data/mockData';

import './MyTrips.css';

function MyTrips() {
  const navigate = useNavigate();

  return (
    <div className="page-inner">

      <div className="my-trips-heading">
        <div>
          <span>YOUR JOURNEYS</span>
          <h1>My Trips</h1>
          <p>
            Manage your saved and upcoming journeys.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate('/plan-trip')}
        >
          <Plus size={15} />
          New Trip
        </button>
      </div>

      <div className="trips-list">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
          />
        ))}
      </div>

    </div>
  );
}

export default MyTrips;