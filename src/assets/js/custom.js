//import defaultExport from  'https://www.payhere.lk/lib/payhere.js';

// var imported = document.createElement('script');
// imported.setAttribute('src','https://www.payhere.lk/lib/payhere.js');
// document.head.appendChild(imported);
// function myTest() {
//     alert('Welcome to custom js');
// }

// payhere.onCompleted = function onCompleted(orderId) {
//     console.log("Payment completed. OrderID:" + orderId);
//     //Note: validate the payment and show success or failure page to the customer
// };

// // Called when user closes the payment without completing
// payhere.onDismissed = function onDismissed() {
//     //Note: Prompt user to pay again or show an error page
//     console.log("Payment dismissed");
// };

// // Called when error happens when initializing payment such as invalid parameters
// payhere.onError = function onError(error) {
//     // Note: show an error page
//     console.log("Error:"  + error);
// };

// // Put the payment variables here
// var payment = {
//     "sandbox": true,
//     "merchant_id": "1215088",       // Replace your Merchant ID
//     "return_url": "http://sample.com/return",
//     "cancel_url": "http://sample.com/cancel",
//     "notify_url": "http://sample.com/notify",
//     "order_id": "ItemNo12345",
//     "items": "Door bell wireles",
//     "amount": "1000.00",
//     "currency": "LKR",
//     "first_name": "Saman",
//     "last_name": "Perera",
//     "email": "samanp@gmail.com",
//     "phone": "0771234567",
//     "address": "No.1, Galle Road",
//     "city": "Colombo",
//     "country": "Sri Lanka",
//     "delivery_address": "No. 46, Galle road, Kalutara South",
//     "delivery_city": "Kalutara",
//     "delivery_country": "Sri Lanka",
//     "custom_1": "",
//     "custom_2": ""
// };

// Show the payhere.js popup, when "PayHere Pay" is clicked
function myTest (){
    //payhere.startPayment(payment);
    alert("hi");
};
