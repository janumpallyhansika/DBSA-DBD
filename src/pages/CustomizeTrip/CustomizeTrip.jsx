import { useState } from 'react';

import {
  Target,
  MapPin,
  CalendarDays,
  CheckCircle2,
  Navigation,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import './CustomizeTrip.css';


const placesByState = {

  Telangana: [
    'Charminar',
    'Golconda Fort',
    'Hussain Sagar',
    'Salar Jung Museum',
    'Ramoji Film City',
  ],

  Kerala: [
    'Munnar',
    'Alleppey',
    'Fort Kochi',
    'Varkala',
    'Wayanad',
  ],

  Rajasthan: [
    'Amber Fort',
    'Hawa Mahal',
    'City Palace',
    'Jaisalmer Fort',
    'Lake Pichola',
  ],

  Goa: [
    'Baga Beach',
    'Calangute Beach',
    'Fort Aguada',
    'Dudhsagar Falls',
    'Basilica of Bom Jesus',
  ],

};


function CustomizeTrip() {

  const navigate = useNavigate();


  const [state, setState] =
    useState('Telangana');


  const [selectedPlaces, setSelectedPlaces] =
    useState([]);


  const [numberOfDays, setNumberOfDays] =
    useState('2');


  const availablePlaces =
    placesByState[state] || [];


  const togglePlace = (place) => {

    setSelectedPlaces((current) =>

      current.includes(place)

        ? current.filter(
            (item) => item !== place
          )

        : [...current, place]

    );

  };


  const generateTrip = () => {

    if (selectedPlaces.length === 0) {

      alert(
        'Please select at least one place.'
      );

      return;

    }


    /*
      Save the custom trip so the
      TripResult page can use it.
    */

    const customTrip = {

      state,

      numberOfDays:
        Number(numberOfDays),

      places:
        selectedPlaces,

      origin:
        state,

    };


    localStorage.setItem(
      'customTrip',
      JSON.stringify(customTrip)
    );


    navigate('/trip/generated');

  };


  /*
    Open the complete selected trip
    directly in the REAL Google Maps website.
  */

  const openGoogleMaps = () => {

    if (selectedPlaces.length === 0) {

      alert(
        'Please select places first.'
      );

      return;

    }


    const origin =
      state === 'Telangana'
        ? 'Hyderabad, Telangana, India'
        : `${state}, India`;


    const destination =
      selectedPlaces[
        selectedPlaces.length - 1
      ];


    const waypoints =
      selectedPlaces.slice(0, -1);


    const params =
      new URLSearchParams();


    params.set(
      'api',
      '1'
    );


    params.set(
      'origin',
      origin
    );


    params.set(
      'destination',
      `${destination}, ${state}, India`
    );


    params.set(
      'travelmode',
      'driving'
    );


    if (waypoints.length > 0) {

      params.set(
        'waypoints',
        waypoints
          .map(
            (place) =>
              `${place}, ${state}, India`
          )
          .join('|')
      );

    }


    const url =
      `https://www.google.com/maps/dir/?${params.toString()}`;


    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );

  };


  return (

    <div className="page-inner">


      {/* ================= HEADING ================= */}

      <div className="customize-heading">

        <span>CUSTOM TRIP</span>

        <h1>
          Build your own journey
        </h1>

        <p>
          Choose exactly what you want
          to experience.
        </p>

      </div>


      {/* ================= MAIN ================= */}

      <div className="customize-layout">


        {/* ================= FORM ================= */}

        <div className="customize-form card">


          <div className="customize-title">

            <div className="customize-icon">

              <Target size={20} />

            </div>


            <div>

              <h2>
                Customize your trip
              </h2>

              <p>
                Select your state and
                favorite places.
              </p>

            </div>

          </div>


          {/* STATE */}

          <div className="form-group">

            <label className="form-label">

              <MapPin size={13} />

              Select State

            </label>


            <select
              className="select-field"
              value={state}
              onChange={(event) => {

                setState(
                  event.target.value
                );

                setSelectedPlaces([]);

              }}
            >

              {Object.keys(
                placesByState
              ).map((stateName) => (

                <option
                  key={stateName}
                  value={stateName}
                >

                  {stateName}

                </option>

              ))}

            </select>

          </div>


          {/* DAYS */}

          <div className="form-group">

            <label className="form-label">

              <CalendarDays size={13} />

              Number of Days

            </label>


            <select
              className="select-field"
              value={numberOfDays}
              onChange={(event) =>
                setNumberOfDays(
                  event.target.value
                )
              }
            >

              <option value="2">
                2 Days
              </option>

              <option value="3">
                3 Days
              </option>

              <option value="4">
                4 Days
              </option>

              <option value="5">
                5 Days
              </option>

            </select>

          </div>


          {/* PLACES */}

          <div className="custom-place-section">

            <label className="form-label">

              Select Places

            </label>


            <div className="custom-place-list">

              {availablePlaces.map(
                (place) => {

                  const selected =
                    selectedPlaces.includes(
                      place
                    );


                  return (

                    <button
                      key={place}
                      type="button"
                      className={
                        selected
                          ? 'custom-place selected'
                          : 'custom-place'
                      }
                      onClick={() =>
                        togglePlace(place)
                      }
                    >

                      <span>
                        {place}
                      </span>


                      {selected && (

                        <CheckCircle2
                          size={16}
                        />

                      )}

                    </button>

                  );

                }
              )}

            </div>

          </div>


          {/* GENERATE */}

          <button
            className="generate-button"
            onClick={generateTrip}
          >

            Generate My Custom Trip

          </button>


          {/* REAL GOOGLE MAPS */}

          <button
            type="button"
            className="google-maps-custom-button"
            onClick={openGoogleMaps}
            disabled={
              selectedPlaces.length === 0
            }
          >

            <Navigation size={17} />

            Open Trip in Google Maps

          </button>


        </div>


        {/* ================= PREVIEW ================= */}

        <div className="customize-preview card">


          <div className="preview-header">

            <h3>
              Your Selection
            </h3>


            <span>
              {selectedPlaces.length}
              {' '}
              places
            </span>

          </div>


          {selectedPlaces.length === 0 ? (

            <div className="custom-empty">

              <Target size={32} />

              <h3>
                Start selecting places
              </h3>

              <p>
                Select places from the left
                and they will appear here.
              </p>

            </div>

          ) : (

            <div className="selected-list">

              {selectedPlaces.map(
                (place, index) => (

                  <div
                    className="selected-place"
                    key={place}
                  >

                    <div className="selected-number">

                      {index + 1}

                    </div>


                    <div>

                      <strong>
                        {place}
                      </strong>

                      <span>
                        {state}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}


export default CustomizeTrip;