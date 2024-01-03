import http from 'k6/http';
import { sleep } from 'k6';

// Function to simulate making orders
export function scenario_1() {
  // Simulate 10 accounts with 5k meals
  const mealLoadedAccounts = Array.from({ length: 10 }, (_, i) => i + 1);

  // Iterate over meal-loaded accounts
  mealLoadedAccounts.forEach((accountId) => {
    // Simulate 10 orders per restaurant per hour
    for (let restaurantId = 1; restaurantId <= 10; restaurantId++) {
      // Simulate 50 visits per hour for each restaurant
      for (let visit = 1; visit <= 50; visit++) {
        // Simulate conversion rate of 10%
        if (Math.random() <= 0.1) {
          // Make a request to the menu endpoint
          const response = http.get(`https://your-api-endpoint.com/menu?accountId=${accountId}&restaurantId=${restaurantId}`);

          // Check response status and log details
          if (response.status === 200) {
            console.log(`Order placed successfully for Account ${accountId}, Restaurant ${restaurantId}`);
          } else {
            console.error(`Failed to place order for Account ${accountId}, Restaurant ${restaurantId}. Status: ${response.status}`);
          }
        }
      }
    }
  });
}





const data = new SharedArray('some data users', function () {
    return JSON.parse(open('./users.json'));
});
// Function to simulate website visits
export function scenario_2() {
    
    //let response
    // const client = data[__VU];
    const vars = {}
    const clientData = data[Math.floor(Math.random() * data.length)];
    if (!clientData) {
        return;
    }
    const client = {
        storeId: clientData.storeId,
        restaurantId: clientData.restaurantId,
        phone: clientData.phone,
        menuId: clientData.menuId,
        storeLocationId: clientData.storeLocationId,
        clientLocationlat: clientData.location.lat,
        clientLocationlng: clientData.location.lng
    }
    for (let client = 1; client <= 100; client++) {
        for (let visit = 1; visit <= 50; visit++) {
            const response = http.get(`https://your-api-endpoint.com/menu?accountId=${client.storeId}`);
            if (response.status === 200) {
                console.log(`Visit successful for Account ${accountId}`);
            } else {
                console.error(`Visit failed for Account ${accountId}. Status: ${response.status}`);
            }
        }
}
}

// Main k6 test scenario
export default function () {
  // Execute scenario_1 (MakeOrders) and scenario_2 (Visit) concurrently
  scenario_1();
  scenario_2();

  // Sleep for a short duration before the next iteration
  sleep(1);
}
