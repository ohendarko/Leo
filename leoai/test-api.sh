#!/bin/bash

echo "=== Testing Leo HealthTech Validator API ==="
echo ""

# Test 1: Health Check
echo "Test 1: Health Check"
echo "---------------------"
curl -s http://localhost:3000/api/test-connection | jq '.'
echo ""
echo ""

# Test 2: Interrogation
echo "Test 2: Interrogation (Generating Questions)"
echo "---------------------------------------------"
curl -s -X POST http://localhost:3000/api/interrogate \
  -H "Content-Type: application/json" \
  -d '{
    "startupName": "CardioWatch AI",
    "tagline": "AI-powered cardiac monitoring for heart failure patients",
    "problemStatement": "Heart failure readmissions cost Medicare $17B annually. 30-day readmission rates are 25%, often due to lack of early detection of patient deterioration.",
    "solution": "Wearable device with AI algorithms that analyze ECG, heart rate variability, and activity patterns to predict deterioration 48 hours before clinical event.",
    "targetMarket": "Post-discharge Medicare heart failure patients in the United States, initially focusing on ACO partnerships.",
    "competitiveAdvantage": "Proprietary ECG interpretation algorithm with 92% accuracy, validated in pilot with 150 patients across 3 hospital systems.",
    "currentStage": "mvp",
    "fundingGoal": "$2M seed round for FDA 510(k) submission and multi-site clinical trial"
  }' > interrogation_response.json

cat interrogation_response.json | jq '.'
echo ""
echo "Questions saved to: interrogation_response.json"
echo ""