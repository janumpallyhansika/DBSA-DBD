import {
  createTrip,
  addTripDestination,
  getTripsByUser,
  getTripById,
  getTripDestinations
} from '../models/tripModel.js';

import {
  getDestinationById
} from '../models/destinationModel.js';

export const createNewTrip = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      startDate,
      endDate,
      numberOfDays,
      budget,
      travelType,
      planningType,
      sourceLocation,
      destinationIds,
      aiGenerated
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Trip title is required'
      });
    }

    const tripId =
      await createTrip({
        userId: req.user.id,
        title,
        startDate,
        endDate,
        numberOfDays,
        budget,
        travelType,
        planningType,
        sourceLocation,
        aiGenerated
      });

    if (
      Array.isArray(destinationIds) &&
      destinationIds.length > 0
    ) {
      for (
        let index = 0;
        index < destinationIds.length;
        index++
      ) {
        const destinationId =
          destinationIds[index];

        const destination =
          await getDestinationById(
            destinationId
          );

        if (destination) {
          await addTripDestination({
            tripId,
            destinationId,
            visitOrder: index + 1
          });
        }
      }
    }

    const trip =
      await getTripById(
        tripId,
        req.user.id
      );

    const destinations =
      await getTripDestinations(
        tripId
      );

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      trip,
      destinations
    });

  } catch (error) {
    next(error);
  }
};


export const getMyTrips = async (
  req,
  res,
  next
) => {
  try {
    const trips =
      await getTripsByUser(
        req.user.id
      );

    res.json({
      success: true,
      count: trips.length,
      trips
    });

  } catch (error) {
    next(error);
  }
};


export const getSingleTrip = async (
  req,
  res,
  next
) => {
  try {
    const trip =
      await getTripById(
        req.params.id,
        req.user.id
      );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const destinations =
      await getTripDestinations(
        trip.id
      );

    res.json({
      success: true,
      trip,
      destinations
    });

  } catch (error) {
    next(error);
  }
};