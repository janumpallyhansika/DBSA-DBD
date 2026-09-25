import {
  getAllDestinations,
  getDestinationsByState,
  getDestinationById,
  searchDestinations
} from '../models/destinationModel.js';

export const getDestinations = async (
  req,
  res,
  next
) => {
  try {
    const {
      stateId,
      search
    } = req.query;

    let destinations;

    if (search) {
      destinations =
        await searchDestinations(search);
    } else if (stateId) {
      destinations =
        await getDestinationsByState(stateId);
    } else {
      destinations =
        await getAllDestinations();
    }

    res.json({
      success: true,
      count: destinations.length,
      destinations
    });

  } catch (error) {
    next(error);
  }
};


export const getDestination = async (
  req,
  res,
  next
) => {
  try {
    const destination =
      await getDestinationById(
        req.params.id
      );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.json({
      success: true,
      destination
    });

  } catch (error) {
    next(error);
  }
};