import ollama from "../config/ollama.js";


// =====================================================
// AI CHAT
// =====================================================

export const askOllama = async (
  message,
  context = ""
) => {

  const prompt = `
You are IndiaGuide AI, an intelligent India-focused
travel assistant.

Give practical, clear and structured travel information.

User question:
${message}

Additional context:
${context}

Rules:
- Focus on India for Indian travel questions.
- Do not invent live prices or availability.
- Keep answers easy to understand.
- Use headings and bullet points when useful.
`;

  const response = await ollama.post(
    "/api/generate",
    {
      model:
        process.env.OLLAMA_MODEL ||
        "llama3.2",

      prompt,

      stream: false
    }
  );

  return response.data.response;
};


// =====================================================
// AI TRIP PLANNER
// =====================================================

export const generateAITripPlan = async ({
  startingLocation,
  destination,
  numberOfDays,
  budget,
  interests,
  travelType
}) => {

  const prompt = `
You are IndiaGuide AI, an intelligent India travel planner.

Create a realistic travel itinerary for the user.

Starting location:
${startingLocation || "Not specified"}

Destination:
${destination}

Number of days:
${numberOfDays}

Budget:
${budget || "Not specified"}

Travelling with:
${travelType || "Solo"}

Interests:
${
  interests && interests.length
    ? interests.join(", ")
    : "General sightseeing"
}


=====================================================
IMPORTANT OUTPUT RULE
=====================================================

Return ONLY valid JSON.

DO NOT return markdown.

DO NOT use:
\`\`\`json

DO NOT write any explanation before or after the JSON.

The response must be directly parseable using:

JSON.parse(response)


=====================================================
EXACT JSON STRUCTURE
=====================================================

{
  "tripOverview": {
    "startingLocation": "${startingLocation || "Not specified"}",
    "destination": "${destination}",
    "numberOfDays": ${Number(numberOfDays)},
    "budget": "${budget || "Not specified"}",
    "travellingWith": "${travelType || "Solo"}"
  },

  "days": [
    {
      "day": 1,
      "places": [
        {
          "name": "Real tourist place",
          "time": "09:00 AM",
          "duration": "1.5 hours"
        }
      ]
    }
  ],

  "foodSuggestions": [
    "Food suggestion 1",
    "Food suggestion 2"
  ],

  "travelTips": [
    "Travel tip 1",
    "Travel tip 2"
  ],

  "importantPrecautions": [
    "Precaution 1",
    "Precaution 2"
  ]
}


=====================================================
ITINERARY RULES
=====================================================

1. Create exactly ${Number(numberOfDays)} day objects.

2. Each day must contain a "places" array.

3. Every place must contain:
   - name
   - time
   - duration

4. Use REAL tourist places.

5. Do not invent tourist attractions.

6. Places must be located in or reasonably near:
   ${destination}

7. Arrange places in a realistic geographical/travel order.

8. Do not repeatedly use the same place unless there is
   a genuine reason.

9. Keep daily sightseeing realistic.

10. Do not schedule impossible travel between places.

11. Consider the user's interests:
    ${
      interests && interests.length
        ? interests.join(", ")
        : "General sightseeing"
    }

12. Consider the user's budget:
    ${budget || "Not specified"}

13. Consider whether the user is travelling:
    ${travelType || "Solo"}

14. Use realistic visiting times.

15. Use simple place names that Google Maps can recognize.

16. Do not include descriptions inside the "name" field.

17. Do not put multiple places inside one "name".

18. Keep the place name short and recognizable.

Example:

GOOD:
{
  "name": "Charminar",
  "time": "09:00 AM",
  "duration": "1.5 hours"
}

BAD:
{
  "name": "Visit the beautiful and historic Charminar
  in the morning for photography",
  "time": "09:00 AM",
  "duration": "1.5 hours"
}


=====================================================
FOOD SUGGESTIONS
=====================================================

Provide realistic local food suggestions related to
the destination.

Do not invent restaurants.

Prefer well-known local dishes or food types.


=====================================================
TRAVEL TIPS
=====================================================

Provide practical tips related to:

- transportation
- local travel
- suitable visiting times
- tickets when relevant
- weather when relevant


=====================================================
IMPORTANT PRECAUTIONS
=====================================================

Provide practical safety and travel precautions.


=====================================================
FINAL REQUIREMENT
=====================================================

Return ONLY the JSON object.

No markdown.

No explanation.

No extra text.
`;

  try {

    const response = await ollama.post(
      "/api/generate",
      {
        model:
          process.env.OLLAMA_MODEL ||
          "llama3.2",

        prompt,

        stream: false
      }
    );


    const rawResponse =
      response.data.response;


    console.log(
      "================================"
    );

    console.log(
      "OLLAMA RAW TRIP RESPONSE"
    );

    console.log(
      rawResponse
    );

    console.log(
      "================================"
    );


    /*
      ============================================
      CLEAN AI RESPONSE
      ============================================
    */

    let cleanedResponse =
      rawResponse.trim();


    /*
      Sometimes Ollama may still return:

      ```json
      {...}
      ```

      Remove the markdown wrapper.
    */

    cleanedResponse =
      cleanedResponse
        .replace(
          /^```json\s*/i,
          ""
        )
        .replace(
          /^```\s*/i,
          ""
        )
        .replace(
          /\s*```$/i,
          ""
        )
        .trim();


    /*
      ============================================
      PARSE JSON
      ============================================
    */

    try {

      const parsed =
        JSON.parse(
          cleanedResponse
        );


      console.log(
        "AI TRIP JSON PARSED SUCCESSFULLY"
      );


      return parsed;

    } catch (parseError) {

      console.error(
        "AI returned invalid JSON."
      );

      console.error(
        "Raw response:",
        rawResponse
      );

      /*
        Return the raw response instead of
        crashing the complete backend.
      */

      return {
        tripOverview: {
          startingLocation:
            startingLocation ||
            "Not specified",

          destination,

          numberOfDays:
            Number(numberOfDays),

          budget:
            budget ||
            "Not specified",

          travellingWith:
            travelType ||
            "Solo"
        },

        days: [],

        foodSuggestions: [],

        travelTips: [],

        importantPrecautions: [],

        rawResponse
      };
    }

  } catch (error) {

    console.error(
      "Ollama Trip Planning Error:",
      error
    );

    throw error;
  }
};