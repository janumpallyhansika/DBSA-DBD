import { ArrowLeft, MapPin, CalendarDays } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import PlaceCard from '../../components/PlaceCard/PlaceCard';

import {
  states,
  places,
} from '../../data/mockData';

import './StateDetails.css';

function StateDetails() {
  const navigate = useNavigate();
  const { stateId } = useParams();

  const state =
    states.find((item) => item.id === stateId) ||
    states[0];

  return (
    <div className="page-inner">

      <button
        className="back-button"
        onClick={() => navigate('/explore')}
      >
        <ArrowLeft size={16} />
        Back to Explore
      </button>

      <div
        className="state-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(5,10,20,.9), rgba(5,10,20,.25)), url(${state.image})`,
        }}
      >
        <div>
          <span>EXPLORE STATE</span>

          <h1>{state.name}</h1>

          <p>
            Discover beautiful places, culture,
            food and experiences.
          </p>

          <div className="state-hero-meta">
            <span>
              <MapPin size={14} />
              India
            </span>

            <span>
              <CalendarDays size={14} />
              {state.places} destinations
            </span>
          </div>
        </div>
      </div>

      <div className="section-header state-place-heading">
        <div>
          <h2 className="section-title">
            Popular Places
          </h2>

          <p className="section-subtitle">
            Places you can add to your trip.
          </p>
        </div>
      </div>

      <div className="places-grid">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
          />
        ))}
      </div>

    </div>
  );
}

export default StateDetails;