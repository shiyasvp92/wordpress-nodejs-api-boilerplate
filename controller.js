var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var WooCommerceAPI = require('woocommerce-api');
 
var wooCommerce = new WooCommerceAPI({
  url: 'http://cherakulamgroup.com/vessels/',
  consumerKey: 'ck_484998b920c3cc1295a5598cb6ba5a46c0e24d63',
  consumerSecret: 'cs_87bcfd5a0c5ba295f805bcf713255df94ae57f86',
  wpAPI: true,
  version: 'wc/v2'
});

// RETURNS ALL THE products IN THE DATABASE
router.get('/products', function (req, res) {
	var response = res;
	
	wooCommerce.get('products', function(err, data, res) {
		if(res){
			response.status(200).send(res);
		} else {
			response.status(200).send("nothing found");
		}
	});		
});

router.get('/paymentgates', function (req, res) {
	var response = res;
	
	wooCommerce.get('payment_gateways', function(err, data, res) {
		if(res){
			response.status(200).send(JSON.parse(res));
		} else {
			response.status(200).send("nothing found");
		}
	});
});

router.get('/shipping_methods', function (req, res) {
	var response = res;
	
	wooCommerce.get('shipping_methods', function(err, data, res) {
		if(res){
			response.status(200).send(JSON.parse(res));
		} else {
			response.status(200).send("nothing found");
		}
	});
});

router.get('/create_order', function(req, res) {
	var response = res;
	
	var data = {
		  payment_method: 'braintree_credit_card',
		  payment_method_title: 'Credit Card',
		  set_paid: true,
		  billing: {
			first_name: 'John',
			last_name: 'Doe',
			address_1: '969 Market',
			address_2: '',
			city: 'San Francisco',
			state: 'CA',
			postcode: '94103',
			country: 'US',
			email: 'john.doe@example.com',
			phone: '(555) 555-5555'
		  },
		  shipping: {
			first_name: 'John',
			last_name: 'Doe',
			address_1: '969 Market',
			address_2: '',
			city: 'San Francisco',
			state: 'CA',
			postcode: '94103',
			country: 'US'
		  },
		  line_items: [
			{
			  product_id: 226,
			  quantity: 2
			},
			{
			  product_id: 68,
			  quantity: 1
			}
		  ],
		  shipping_lines: [
			{
			  method_id: 'flat_rate',
			  method_title: 'Flat Rate'
			}
		  ]
		};

		wooCommerce.post('orders', data, function(err, data, res) {
			if(res){
				response.status(200).send(JSON.parse(res));
			} else {
				response.status(200).send("nothing found");
			}
		});
})

module.exports = router;