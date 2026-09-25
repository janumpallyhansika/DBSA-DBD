import { MapPin } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import './StateCard.css';

function StateCard({ state }) {
  const navigate = useNavigate();

  return (
    <div
      className="state-card"
      onClick={() => navigate(`/state/${state.id}`)}
    >
      <img src={state.image} alt={state.name} />

      <div className="state-card-content">
        <h3>{state.name}</h3>

        <span>
          <MapPin size={12} />
          {state.places} places
        </span>
      </div>
    </div>
  );
}

export default StateCard;