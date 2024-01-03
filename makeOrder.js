import { sleep, group } from 'k6'
import http from 'k6/http'
// import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'
import { SharedArray } from 'k6/data';

const params = {
    timeout: "125s"
}
export const options = {
    ext: {
        loadimpact: {
            distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
            apm: [],
        },
    },
    thresholds: {},
    scenarios: {
        MakeOrders: {
            executor: 'constant-arrival-rate',
            duration: "1h", // Set the total number of virtual users
            // iterations: 1, // 
            rate: 1000,
            timeUnit: "1h",
            exec: 'scenario_1',
            preAllocatedVUs: 1000,
            // timeout: '15s',
            // duration: "3m"
        },
        Visit: {
            executor: 'constant-arrival-rate',
            duration: "1h", // Set the total number of virtual users
            // iterations: 1, // 
            rate: 4000,
            timeUnit: "1h",
            preAllocatedVUs: 4000,
            exec: 'scenario_2',
            // timeout: '15s',
            // duration: "3m"
        },
    },
}

const data = new SharedArray('some data users', function () {
    return JSON.parse(open('./users.json'));
});

export function scenario_1() {
    let response
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
        storeLocationId: clientData.storeLocationId
    }
    console.log(client.storeId, __VU);
    // return;
    group(`page_1 - https://beta.daba.store/webstore/${client.storeId}`, function () {
        response = http.get(`https://beta.daba.store/webstore/${client.storeId}`, {
            timeout: 102392999299,
            headers: {
                'upgrade-insecure-requests': '1',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
            },
        })
        sleep(2.2)

        response = http.get(`https://beta.daba.store/webstore/api/getRestaurantSections/${client.menuId}?${client.storeLocationId}`, {
            timeout: "1000s",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                x_api_key: '',
            },
        })

        vars["sections"] = response.json();

        sleep(10.7)

        response = http.get(
            `https://beta.daba.store/webstore/api/getSectionById?restaurantId=${client.restaurantId}&sectionId=${vars["sections"][0].id}&${client.menuId}&${client.storeLocationId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )
        const section = response.json();
        const meal = section.meals.length ? section.meals[0] : section.subsections[0].meals[0];
        vars['id1'] = meal.id;

        vars['section1'] = meal.section;
        sleep(4)
        for (let index = 0; index < 3; index++) {
            const sectionIndex = Math.floor(Math.random() * vars["sections"].length);
            response = http.get(
                `https://beta.daba.store/webstore/api/getSectionById?restaurantId=${client.restaurantId}&sectionId=${vars["sections"][sectionIndex].id}&${client.menuId}&${client.storeLocationId}`,
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"macOS"',
                        x_api_key: '',
                    },
                }
            )
            sleep(4);
        }

        // sleep(7)

        // response = http.get(
        //     'https://beta.gondemand.com/webstore/api/getOptionsGroup/X5JJLG1H?optionsGroupIds=AVSCWUAD2ER9U163,3TY3CV466NLNCH86,VHYJPSV9MPB82BMB',
        //     {
        //         headers: {
        //             accept: 'application/json',
        //             'content-type': 'application/json',
        //             'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        //             'sec-ch-ua-mobile': '?0',
        //             'sec-ch-ua-platform': '"macOS"',
        //             x_api_key: '',
        //         },
        //     }
        // )

        // vars['id2'] = jsonpath.query(response.json(), '$[1].atomicOptions[0].id')[0]

        // vars['id3'] = jsonpath.query(response.json(), '$[1].id')[0]

        // vars['id4'] = jsonpath.query(response.json(), '$[0].atomicOptions[0].id')[0]

        // vars['id5'] = jsonpath.query(response.json(), '$[0].id')[0]

        // vars['id6'] = jsonpath.query(response.json(), '$[2].atomicOptions[0].id')[0]

        // vars['id7'] = jsonpath.query(response.json(), '$[2].id')[0]

        sleep(15.3)

        response = http.get(
            `https://beta.daba.store/webstore/api/checkPaymentConfiguration?restaurantId=${client.restaurantId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )
        sleep(7.8)

        response = http.get(
            `https://beta.daba.store/webstore/api/personalDiscountCode?customerPhone=${client.phone}&restaurantId=${client.restaurantId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )
        sleep(0.6)

        response = http.get(
            `https://beta.daba.store/webstore/api/globalDiscountAllowedUse?customerPhoneNumber=${client.phone}&restaurantId=${client.restaurantId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )
        sleep(3.4)

        response = http.get(
            `https://beta.daba.store/webstore/api/personalDiscountCode?customerPhone=${client.phone}&restaurantId=${client.restaurantId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )

        response = http.get(
            `https://beta.daba.store/webstore/api/globalDiscountAllowedUse?customerPhoneNumber=${client.phone}${client.restaurantId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )

        response = http.get(
            `https://beta.daba.store/webstore/api/checkPosition?restaurantId=${client.restaurantId}&lat=31.80184299988875&lng=-7.091978671252631`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )

        response = http.get(
            'https://beta.daba.store/webstore/api/calculateDeliveryFee?orderMenus=%5B%7B%22idMeal%22%3A%22DSX5MXGL5YKUMLZQ%22%7D%5D&deliveryOption=pickup&idRestaurant=X5JJLG1H&lat=31.80184299988875&lng=-7.091978671252631&orderValue=60',
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )
        sleep(7);
        response = http.post(
            'https://beta.daba.store/webstore/api/sendOrder',
            `{"idRestaurant":"${client.restaurantId}","restaurantId":"${client.restaurantId}","idEater":"","address":"RW25+P6 Ouled Yaaakoub, Maroc","location":{"lat":"31.80184299988875","lng":"-7.091978671252631"},"instructions":"","contactless":true,"paymentMethod":"cash","paymentDetails":{"type":""},"discountCodeId":"","driverTip":0,"deliveryOption":"pickup","orderMenus":[{"idMeal":"${vars['id1']}","quantity":1,"options":[],"size":"","section":"${vars['section1']}"}],"eater":{"name":"Mohammed Zidan","phone":"${client.phone}","email":"","restaurantId":"${client.restaurantId}","address":{"lat":"31.80184299988875","lng":"-7.091978671252631","text":"RW25+P6 Ouled Yaaakoub, Maroc"}},"isWebStore":true,"orderSource":"webstore","timezone":"Africa/Casablanca"},"storeLocationId":"${client.storeLocationId}"`,
            {
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                },
            }
        )


        // sleep(2.6)
    })
}
export function scenario_2() {
    let response
    const clientData = data[Math.floor(Math.random() * data.length)];
    if (!clientData) {
        return;
    }
    const client = {
        storeId: clientData.storeId,
        restaurantId: clientData.restaurantId,
        phone: clientData.phone,
        menuId: clientData.menuId,
        storeLocationId: clientData.storeLocationId
    }
    // console.log(client.storeId, {vue__VU});
    // return;
    const vars = {}
    group(`page_1 - https://beta.daba.store/webstore/${client.storeId}`, function () {
        response = http.get(`https://beta.daba.store/webstore/${client.storeId}`, {
            headers: {
                'upgrade-insecure-requests': '1',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
            },
        })
        sleep(2.2)

        response = http.get(`https://beta.daba.store/webstore/api/getRestaurantSections/${client.menuId}?${client.storeLocationId}`, {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                x_api_key: '',
            },
        })

        vars["sections"] = response.json();

        sleep(10.7)
        response = http.get(
            `https://beta.daba.store/webstore/api/getSectionById?restaurantId=${client.restaurantId}&sectionId=${vars["sections"][0].id}&${client.menuId}&${client.storeLocationId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )
        const section = response.json();
        const meal = section.meals.length ? section.meals[0] : section.subsections[0].meals[0];
        vars['id1'] = meal.id;

        vars['section1'] = meal.section;
        sleep(4)
        for (let index = 0; index < 3; index++) {
            const sectionIndex = Math.floor(Math.random() * vars["sections"].length);
            response = http.get(
                `https://beta.daba.store/webstoree/api/getSectionById?restaurantId=${client.restaurantId}&sectionId=${vars["sections"][sectionIndex].id}&${client.menuId}&${client.storeLocationId}`,
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"macOS"',
                        x_api_key: '',
                    },
                }
            )
            sleep(4);
        }


        // sleep(7)

        // response = http.get(
        //     'https://beta.gondemand.com/webstore/api/getOptionsGroup/X5JJLG1H?optionsGroupIds=AVSCWUAD2ER9U163,3TY3CV466NLNCH86,VHYJPSV9MPB82BMB',
        //     {
        //         headers: {
        //             accept: 'application/json',
        //             'content-type': 'application/json',
        //             'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        //             'sec-ch-ua-mobile': '?0',
        //             'sec-ch-ua-platform': '"macOS"',
        //             x_api_key: '',
        //         },
        //     }
        // )

        // vars['id2'] = jsonpath.query(response.json(), '$[1].atomicOptions[0].id')[0]

        // vars['id3'] = jsonpath.query(response.json(), '$[1].id')[0]

        // vars['id4'] = jsonpath.query(response.json(), '$[0].atomicOptions[0].id')[0]

        // vars['id5'] = jsonpath.query(response.json(), '$[0].id')[0]

        // vars['id6'] = jsonpath.query(response.json(), '$[2].atomicOptions[0].id')[0]

        // vars['id7'] = jsonpath.query(response.json(), '$[2].id')[0]

        sleep(15.3)

        response = http.get(
            `https://beta.daba.store/webstore/api/checkPaymentConfiguration?restaurantId=${client.restaurantId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )
        sleep(7.8)

        response = http.get(
            `https://beta.daba.store/webstore/api/personalDiscountCode?customerPhone=${client.phone}&restaurantId=${client.restaurantId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )
        sleep(0.6)

        response = http.get(
            `https://beta.daba.store/webstore/api/globalDiscountAllowedUse?customerPhoneNumber=${client.phone}&restaurantId=${client.restaurantId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )
        sleep(3.4)

        response = http.get(
            `https://beta.daba.store/webstore/api/personalDiscountCode?customerPhone=${client.phone}&restaurantId=${client.restaurantId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )

        response = http.get(
            `https://beta.daba.store/webstore/api/globalDiscountAllowedUse?customerPhoneNumber=${client.phone}${client.restaurantId}`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )

        response = http.get(
            `https://beta.daba.store/webstore/api/checkPosition?restaurantId=${client.restaurantId}&lat=31.80184299988875&lng=-7.091978671252631`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )

        response = http.get(
            'https://beta.daba.store/webstore/api/calculateDeliveryFee?orderMenus=%5B%7B%22idMeal%22%3A%22DSX5MXGL5YKUMLZQ%22%7D%5D&deliveryOption=pickup&idRestaurant=X5JJLG1H&lat=31.80184299988875&lng=-7.091978671252631&orderValue=60',
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    x_api_key: '',
                },
            }
        )
        // sleep(7)

        // response = http.post(
        //     'https://beta.gondemand.com/webstore/api/sendOrder',
        //     `{"idRestaurant":"${client.restaurantId}","restaurantId":"${client.restaurantId}","idEater":"","address":"RW25+P6 Ouled Yaaakoub, Maroc","location":{"lat":"31.80184299988875","lng":"-7.091978671252631"},"instructions":"","contactless":true,"paymentMethod":"cash","paymentDetails":{"type":""},"discountCodeId":"","driverTip":0,"deliveryOption":"pickup","orderMenus":[{"idMeal":"${vars['id1']}","quantity":1,"options":[],"size":"","section":"${vars['section1']}"}],"eater":{"name":"Mohammed Zidan","phone":"${client.phone}","email":"","restaurantId":"${client.restaurantId}","address":{"lat":"31.80184299988875","lng":"-7.091978671252631","text":"RW25+P6 Ouled Yaaakoub, Maroc"}},"isWebStore":true,"orderSource":"webstore","timezone":"Africa/Casablanca"}`,
        //     {
        //         headers: {
        //             'content-type': 'application/json; charset=utf-8',
        //             'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        //             'sec-ch-ua-mobile': '?0',
        //             'sec-ch-ua-platform': '"macOS"',
        //         },
        //     }
        // )
        // sleep(2.6)
    })
}