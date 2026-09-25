import { Search } from 'lucide-react';

import StateCard from '../../components/StateCard/StateCard';
import PlaceCard from '../../components/PlaceCard/PlaceCard';

import {
  states,
  places,
} from '../../data/mockData';

import './ExploreIndia.css';

function ExploreIndia() {
  return (
    <div className="page-inner">

      <div className="explore-heading">
        <div>
          <span>EXPLORE</span>
          <h1>Discover India</h1>
          <p>
            Explore states, cities and unforgettable places.
          </p>
        </div>

        <div className="explore-search">
          <Search size={17} />

          <input
            placeholder="Search India..."
          />
        </div>
      </div>

      <section>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              Explore States
            </h2>

            <p className="section-subtitle">
              Choose a state to discover its destinations.
            </p>
          </div>
        </div>

        <div className="states-grid">
          {states.map((state) => (
            <StateCard
              key={state.id}
              state={state}
            />
          ))}
        </div>
      </section>

      <section className="places-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              Popular Places
            </h2>

            <p className="section-subtitle">
              Places worth adding to your journey.
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
      </section>

    </div>
  );
}

export default ExploreIndia;