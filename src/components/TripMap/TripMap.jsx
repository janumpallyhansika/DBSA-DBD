import { useEffect } from 'react';

import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';

import './TripMap.css';

const INDIA_CENTER = {
  lat: 20.5937,
  lng: 78.9629,
};


function RouteDisplay({
  startingLocation,
  destination,
  waypoints,
  onRouteInfo,
}) {

  const map = useMap();

  const routesLibrary = useMapsLibrary('routes');


  useEffect(() => {

    if (!map || !routesLibrary) {
      return;
    }


    let polylines = [];
    let markers = [];

    let cancelled = false;


    const calculateRoute = async () => {

      try {

        const { Route } = routesLibrary;


        console.log(
          'Google Maps route:',
          startingLocation,
          '→',
          waypoints,
          '→',
          destination
        );


        /*
          Convert waypoint strings into
          Google's waypoint format.
        */

        const intermediates = (waypoints || [])
          .filter(Boolean)
          .map((place) => ({
            location: `${place}, India`,
          }));


        /*
          Google Routes API request
        */

        const result = await Route.computeRoutes({

          origin: startingLocation,

          destination: destination,

          intermediates,

          travelMode: 'DRIVING',

          fields: [
            'path',
            'viewport',
            'legs',
            'distanceMeters',
            'durationMillis',
          ],

        });


        if (cancelled) {
          return;
        }


        if (
          !result ||
          !result.routes ||
          result.routes.length === 0
        ) {

          console.error(
            'Google Maps could not find a route.'
          );

          if (onRouteInfo) {
            onRouteInfo({
              distance: null,
              duration: null,
            });
          }

          return;
        }


        const route = result.routes[0];


        /*
          ============================
          DRAW REAL GOOGLE ROUTE
          ============================
        */

        polylines = route.createPolylines({

          polylineOptions: {

            map,

            strokeWeight: 6,

            strokeOpacity: 0.9,

          },

        });


        /*
          ============================
          CREATE REAL MARKERS
          ============================
        */

        markers =
          await route.createWaypointAdvancedMarkers({
            map,
          });


        /*
          ============================
          FIT MAP TO ROUTE
          ============================
        */

        if (route.viewport) {

          map.fitBounds(route.viewport);

        }


        /*
          ============================
          DISTANCE
          ============================
        */

        let distanceText = 'N/A';


        if (route.distanceMeters != null) {

          const kilometers =
            route.distanceMeters / 1000;

          distanceText =
            `${kilometers.toFixed(1)} km`;

        }


        /*
          ============================
          TRAVEL TIME
          ============================
        */

        let durationText = 'N/A';


        if (route.durationMillis != null) {

          const totalMinutes =
            Math.round(
              route.durationMillis / 60000
            );


          const hours =
            Math.floor(totalMinutes / 60);

          const minutes =
            totalMinutes % 60;


          if (hours > 0) {

            durationText =
              `${hours}h ${minutes}m`;

          } else {

            durationText =
              `${minutes}m`;

          }

        }


        /*
          Send real route information
          back to TripResult.
        */

        if (onRouteInfo) {

          onRouteInfo({

            distance: distanceText,

            duration: durationText,

          });

        }


        console.log(
          'Google route created successfully.'
        );

        console.log(
          'Distance:',
          distanceText
        );

        console.log(
          'Duration:',
          durationText
        );

      } catch (error) {

        console.error(
          'Google Maps route error:',
          error
        );

        if (onRouteInfo) {

          onRouteInfo({
            distance: null,
            duration: null,
          });

        }

      }

    };


    calculateRoute();


    /*
      ============================
      CLEANUP
      ============================
    */

    return () => {

      cancelled = true;


      polylines.forEach((polyline) => {

        polyline.setMap(null);

      });


      markers.forEach((marker) => {

        marker.map = null;

      });

    };

  }, [
    map,
    routesLibrary,
    startingLocation,
    destination,
    JSON.stringify(waypoints),
    onRouteInfo,
  ]);


  return null;

}


function TripMap({
  startingLocation,
  destination,
  waypoints = [],
  onRouteInfo,
}) {

  const apiKey =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


  if (!apiKey) {

    return (

      <div className="trip-map-error">

        Google Maps API key is missing.

      </div>

    );

  }


  return (

    <div className="trip-map-container">

      <APIProvider apiKey={apiKey}>

        <Map

          defaultCenter={INDIA_CENTER}

          defaultZoom={12}

          mapId="DEMO_MAP_ID"

          gestureHandling="greedy"

          disableDefaultUI={false}

          mapTypeControl={true}

          fullscreenControl={true}

          streetViewControl={true}

          zoomControl={true}

        >

          <RouteDisplay

            startingLocation={
              startingLocation
            }

            destination={
              destination
            }

            waypoints={
              waypoints
            }

            onRouteInfo={
              onRouteInfo
            }

          />

        </Map>

      </APIProvider>

    </div>

  );

}


export default TripMap;