const fs = require('fs');
const { faker } = require("@faker-js/faker")
// Sample array of items
const restaurants =
    [

        {

             "idRestaurant": "2CCDFPYV",

             "storeLocationId":"2CCDFPYV_LOCATION_TEST",

             "menuId":"2CCDFPYV_MENU_DEFAULT",

             "storeId": "ouiame",

             "location": {
                "lat": 33.97269105326714,
                "lng": -6.8499755859375
            }

        },

        {

             "idRestaurant": "4JNW1RWV",

             "storeId": "tunisiano",

             "storeLocationId":"4JNW1RWV_LOCATION_TEST",

             "menuId":"4JNW1RWV_MENU_DEFAULT",

             "location": {
                "lat": 33.97183689217048,
                "lng": -6.850662231445313
            }

         },

         {

             "idRestaurant": "2PN63N4X",

             "storeId": "ac",

             "storeLocationId":"2PN63N4X_LOCATION_TEST",

             "menuId":"2PN63N4X_MENU_DEFAULT",

             "location": {
                "lat": 33.97126744667272,
                "lng": -6.849288940429688
            }
         },

         {

             "idRestaurant": "Z7NDJS7U",

             "storeId": "pariatur-quo-cumque",
             
             "storeLocationId":"Z7NDJS7U_LOCATION_TEST",

             "menuId":"Z7NDJS7U_MENU_DEFAULT",

             "location": {
                "lat": 33.97269105326714,
                "lng": -6.8499755859375
            }
         },

         {

            "idRestaurant": "PX6TJQCF",

            "storeId": "bowl-healthy-food",

            "storeLocationId":"PX6TJQCF_LOCATION_TEST",

            "menuId":"PX6TJQCF_MENU_DEFAULT",

            "location": {
                "lat": 30.427657340346716,
                "lng": -9.580764770507814
            }

         },

         {

             "idRestaurant": "1BEKPDDZ",

            "storeId": "one-way",

            "storeLocationId":"1BEKPDDZ_LOCATION_TEST",

            "menuId":"1BEKPDDZ_MENU_DEFAULT",

            "location": {
                "lat": 33.97212161348937,
                "lng": -6.850662231445313
            }

         },
         {

            "idRestaurant": "QCJF4EA4",

            "storeId": "rerum-rerum-eius-asp",

            "storeLocationId":"QCJF4EA4_LOCATION_TEST",

            "menuId":"QCJF4EA4_MENU_DEFAULT",

            "location": {
                "lat": 33.97212161348937,
                "lng": -6.850662231445313
            }

        },

         {

            "idRestaurant": "6S48DXVM",

            "storeId": "mio-ristorante",

            "storeLocationId":"6S48DXVM_LOCATION_TEST",

            "menuId":"6S48DXVM_MENU_DEFAULT",

            "location": {
                "lat": 33.97926236051064,
                "lng": -6.849713784593118
            }

         },

        {

            "idRestaurant": "7FZHZRB2",

            "storeId": "quia-ipsum-aliquip",

            "storeLocationId":"7FZHZRB2_LOCATION_TEST",

            "menuId":"7FZHZRB2_MENU_DEFAULT",

            "location": {
                "lat": 33.97155216989826,
                "lng": -6.849288940429688
            }

        },

        {

            "idRestaurant": "X5JJLG1H",

            "storeId": "pop-pip-pop-1",

            "storeLocationId":"X5JJLG1H_LOCATION_TEST",

            "menuId":"X5JJLG1H_MENU_DEFAULT",

            "location": {
                "lat": 33.97111173825551,
                "lng": 6.848602294921875
            }

        }

    ]


// Global array to store users
const users = [];

// Loop through each item in the array
restaurants.forEach(item => {
    // Create 50 users for each item
    for (let i = 1; i <= 12500; i++) {
        const user = {
            restaurantId: item.idRestaurant,
            storeId: item.storeId,
            storeLocationId: item.storeLocationId,
            menuId: item.menuId,
            location: item.location,
            phone: faker.phone.number('+2126#######'),
        };
        if (i <= 1250) {
            user.isOrder = true; // Assign the specific property here
        }

        // Push the user to the global array
        users.push(user);
    }
});

for (let i = users.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [users[i], users[j]] = [users[j], users[i]];
}
for (let i = users.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [users[i], users[j]] = [users[j], users[i]];
}

// Convert the array to JSON string
const json = JSON.stringify(users);

// Write JSON data to a file
fs.writeFile('users.json', json, 'utf8', err => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('JSON data exported to users.json successfully!');
    }
});











