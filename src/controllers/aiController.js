import {
  askOllama,
  generateAITripPlan
} from "../services/ollamaService.js";

// =====================================================
// AI CHAT
// =====================================================

export const chatWithAI = async (req, res) => {
  try {
    const {
      message,
      context
    } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    const response = await askOllama(
      message,
      context || ""
    );

    res.json({
      success: true,
      response
    });

  } catch (error) {
    console.error(
      "Ollama Chat Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to communicate with Ollama. Make sure Ollama is running."
    });
  }
};


// =====================================================
// AI TRIP PLANNER
// =====================================================

export const planTripWithAI = async (req, res) => {
  try {

    const {
      destination,
      numberOfDays,
      days,
      budget,
      interests,
      travelType,
      travellingWith,
      startingLocation
    } = req.body;

    // Accept both names
    const finalDays =
      numberOfDays || days;

    const finalTravelType =
      travelType || travellingWith || "Solo";

    // Validate
    if (!destination) {
      return res.status(400).json({
        success: false,
        message: "Destination is required"
      });
    }

    if (
      finalDays === undefined ||
      finalDays === null ||
      finalDays === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Number of days is required"
      });
    }

    console.log("================================");
    console.log("AI TRIP REQUEST");
    console.log("Starting:", startingLocation);
    console.log("Destination:", destination);
    console.log("Days:", finalDays);
    console.log("Budget:", budget);
    console.log("Travel Type:", finalTravelType);
    console.log("Interests:", interests);
    console.log("================================");

    const response =
      await generateAITripPlan({
        startingLocation,
        destination,
        numberOfDays: Number(finalDays),
        budget,
        interests,
        travelType: finalTravelType
      });

    res.json({
      success: true,

      startingLocation,

      destination,

      numberOfDays: Number(finalDays),

      budget,

      travelType: finalTravelType,

      interests,

      plan: response
    });

  } catch (error) {

    console.error(
      "AI Trip Planner Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "AI trip planning failed"
    });
  }
};