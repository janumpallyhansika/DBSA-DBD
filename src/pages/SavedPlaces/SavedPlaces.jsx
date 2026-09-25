import { Heart } from 'lucide-react';

import PlaceCard from '../../components/PlaceCard/PlaceCard';

import { places } from '../../data/mockData';

import './SavedPlaces.css';

function SavedPlaces() {
  return (
    <div className="page-inner">

      <div className="saved-heading">
        <div className="saved-icon">
          <Heart size={21} />
        </div>

        <div>
          <span>SAVED</span>
          <h1>Saved Places</h1>
          <p>
            Your favorite destinations in one place.
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

export default SavedPlaces;