import {
  MapPin,
  Heart,
  ArrowUpRight,
} from 'lucide-react';

import './PlaceCard.css';

function PlaceCard({ place }) {
  return (
    <div className="place-card">
      <div className="place-image-wrapper">
        <img src={place.image} alt={place.name} />

        <button className="place-heart">
          <Heart size={16} />
        </button>
      </div>

      <div className="place-content">
        <div className="place-category">
          {place.category}
        </div>

        <h3>{place.name}</h3>

        <p>
          <MapPin size={13} />
          {place.city}
        </p>

        <div className="place-bottom">
          <span>★ {place.rating}</span>

          <button>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;