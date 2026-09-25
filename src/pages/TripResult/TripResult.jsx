import {
  Clock,
  Navigation,
  CalendarDays,
  Save,
  Edit3,
} from 'lucide-react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TripMap from '../../components/TripMap/TripMap';

import './TripResult.css';


const itinerary = [
  {
    day: 'Day 1',
    city: 'Hyderabad',
    places: [
      {
        time: '09:00 AM',
        name: 'Charminar',
        duration: '1.5 hours',
      },
      {
        time: '11:30 AM',
        name: 'Salar Jung Museum',
        duration: '2 hours',
      },
      {
        time: '04:00 PM',
        name: 'Golconda Fort',
        duration: '2 hours',
      },
    ],
  },

  {
    day: 'Day 2',
    city: 'Hyderabad',
    places: [
      {
        time: '10:00 AM',
        name: 'Hussain Sagar',
        duration: '1 hour',
      },
      {
        time: '01:00 PM',
        name: 'Ramoji Film City',
        duration: '5 hours',
      },
    ],
  },
];


function TripResult() {

  const navigate = useNavigate();


  const [routeInfo, setRouteInfo] = useState({
    distance: null,
    duration: null,
  });


  /*
    ========================================
    ALL PLACES IN THE PLANNED TRIP
    ========================================
  */

  const routePlaces = [
    'Charminar, Hyderabad, Telangana, India',
    'Salar Jung Museum, Hyderabad, Telangana, India',
    'Golconda Fort, Hyderabad, Telangana, India',
    'Hussain Sagar, Hyderabad, Telangana, India',
    'Ramoji Film City, Hyderabad, Telangana, India',
  ];


  /*
    ========================================
    GOOGLE MAP ROUTE
    ========================================
  */

  const origin =
    'Hyderabad, Telangana, India';


  const destination =
    routePlaces[routePlaces.length - 1];


  const waypoints =
    routePlaces.slice(0, -1);


  /*
    ========================================
    OPEN ACTUAL GOOGLE MAPS
    ========================================
  */

  const openGoogleMaps = () => {

    /*
      First place is used as the first
      waypoint after the origin.

      Final place becomes destination.
    */

    const googleMapsWaypoints =
      routePlaces.slice(0, -1);


    const params =
      new URLSearchParams();


    /*
      Required by Google Maps URLs.
    */

    params.set(
      'api',
      '1'
    );


    /*
      Starting location.
    */

    params.set(
      'origin',
      origin
    );


    /*
      Final destination.
    */

    params.set(
      'destination',
      destination
    );


    /*
      Driving route.
    */

    params.set(
      'travelmode',
      'driving'
    );


    /*
      Add all intermediate places
      in the exact itinerary order.
    */

    if (
      googleMapsWaypoints.length > 0
    ) {

      params.set(
        'waypoints',
        googleMapsWaypoints.join('|')
      );

    }


    /*
      Create actual Google Maps URL.
    */

    const googleMapsUrl =
      `https://www.google.com/maps/dir/?${params.toString()}`;


    /*
      Open actual Google Maps
      in a new browser tab.
    */

    window.open(
      googleMapsUrl,
      '_blank',
      'noopener,noreferrer'
    );

  };


  return (

    <div className="page-inner">


      {/* ========================================
          HEADER
      ======================================== */}

      <div className="trip-result-header">

        <div>

          <span>
            YOUR ITINERARY
          </span>

          <h1>
            Hyderabad Explorer
          </h1>

          <p>

            <CalendarDays size={14} />

            2 Days • 5 Places

          </p>

        </div>


        <div className="trip-result-actions">


          <button
            className="secondary-button"
          >

            <Save size={15} />

            Save Trip

          </button>


          <button
            className="primary-button"
            onClick={() =>
              navigate('/customize-trip')
            }
          >

            <Edit3 size={15} />

            Edit Trip

          </button>


        </div>

      </div>


      {/* ========================================
          MAIN CONTENT
      ======================================== */}

      <div className="trip-result-layout">


        {/* ========================================
            LEFT SIDE - ITINERARY
        ======================================== */}

        <div className="itinerary">


          {itinerary.map((day) => (

            <div
              className="itinerary-day card"
              key={day.day}
            >


              <div className="day-heading">


                <div className="day-number">

                  {day.day.replace(
                    'Day ',
                    ''
                  )}

                </div>


                <div>

                  <h2>
                    {day.day}
                  </h2>

                  <span>
                    {day.city}
                  </span>

                </div>


              </div>


              <div className="timeline">


                {day.places.map(
                  (place) => (

                    <div
                      className="timeline-item"
                      key={place.name}
                    >


                      <div
                        className="timeline-dot"
                      ></div>


                      <div
                        className="timeline-content"
                      >


                        <span>

                          <Clock
                            size={12}
                          />

                          {place.time}

                        </span>


                        <h3>
                          {place.name}
                        </h3>


                        <p>
                          Visit for{' '}
                          {place.duration}
                        </p>


                      </div>


                    </div>

                  )
                )}


              </div>


            </div>

          ))}


        </div>


        {/* ========================================
            RIGHT SIDE - GOOGLE MAP
        ======================================== */}

        <div className="map-container">


          {/* MAP HEADER */}

          <div className="map-header">


            <div>

              <h3>
                Your Route
              </h3>

              <span>
                Real Google Maps route
              </span>

            </div>


            <Navigation
              size={18}
            />


          </div>


          {/* ========================================
              REAL EMBEDDED GOOGLE MAP
          ======================================== */}

          <div className="real-map-wrapper">

            <TripMap

              startingLocation={
                origin
              }

              destination={
                destination
              }

              waypoints={
                waypoints
              }

              onRouteInfo={
                setRouteInfo
              }

            />

          </div>


          {/* ========================================
              ROUTE STATS
          ======================================== */}

          <div className="map-stats">


            <div>

              <span>
                Distance
              </span>


              <strong>

                {routeInfo.distance ||
                  'Calculating...'}

              </strong>

            </div>


            <div>

              <span>
                Travel Time
              </span>


              <strong>

                {routeInfo.duration ||
                  'Calculating...'}

              </strong>

            </div>


          </div>


          {/* ========================================
              OPEN ACTUAL GOOGLE MAPS
          ======================================== */}

          <button
            className="open-google-maps-button"
            onClick={openGoogleMaps}
          >

            <Navigation
              size={17}
            />

            <span>
              Open Complete Trip in Google Maps
            </span>

          </button>


        </div>


      </div>


    </div>

  );

}


export default TripResult;