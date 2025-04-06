#!/bin/bash

# Ensure curl is installed
if ! command -v curl &> /dev/null
then
    echo "Error: curl is not installed. Please install it using:"
    echo "sudo apt update && sudo apt install curl"
    exit 1
fi

# Prompt for the API Key (hidden input)
read -sp "Enter your Gemini API Key: " API_KEY
echo # Add a newline after the hidden input

# Check if the API key was entered
if [[ -z "$API_KEY" ]]; then
  echo "Error: No API key entered."
  exit 1
fi

# --- Configuration ---
# You can change the model if needed, e.g., gemini-pro
MODEL_NAME="gemini-1.5-flash-latest"
API_URL="https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}"

# Simple prompt data
JSON_DATA='{
  "contents": [{
    "parts":[{
      "text": "In one short sentence, what is the weather like on Mars?"
    }]
  }]
}'

# --- Make the API Call ---
echo "-------------------------------------"
echo "Testing Gemini API Key..."
echo "Model: ${MODEL_NAME}"
echo "Endpoint: https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent"
echo "-------------------------------------"

# Use curl to send the request
# -s : Silent mode (don't show progress)
# -X POST : Specify POST request method
# -H : Add header (Content-Type)
# -d : Send data (the JSON payload)
# The URL includes the API key as a query parameter
RESPONSE=$(curl -s -X POST \
     -H "Content-Type: application/json" \
     -d "${JSON_DATA}" \
     "${API_URL}")

# --- Display Results ---
echo "API Response:"
echo "${RESPONSE}"
echo "-------------------------------------"

# --- Interpretation ---
# Check for common error messages (this is a basic check)
if [[ "${RESPONSE}" == *"API key not valid"* || "${RESPONSE}" == *"PERMISSION_DENIED"* ]]; then
  echo "Result: FAILED - The API key seems invalid or lacks permissions."
  echo "Troubleshooting:"
  echo "1. Double-check the API key you entered."
  echo "2. Ensure the key is enabled in your Google Cloud/AI Studio project."
  echo "3. Check if there are any API restrictions (e.g., IP address, referrer) set for the key."
  echo "4. Make sure the 'Generative Language API' (or similar) is enabled for your project."
elif [[ "${RESPONSE}" == *"candidates"* && "${RESPONSE}" == *"content"* && "${RESPONSE}" == *"parts"* ]]; then
  echo "Result: SUCCESS - Received a valid-looking response from the API."
  echo "Your API key appears to be working correctly for this basic request."
elif [[ -z "${RESPONSE}" ]]; then
  echo "Result: UNCERTAIN - Received an empty response. Check network connectivity or potential API issues."
else
  # Catch other potential errors (like billing issues, quota exceeded, model not found etc.)
  echo "Result: UNCERTAIN - Received a response, but it doesn't look like a standard success or known API key error."
  echo "Check the full response above for specific error messages (e.g., quota, billing, model name)."
fi

echo "-------------------------------------"

exit 0
