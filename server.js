/*
|--------------------------------------------------------------------------
|  HapiJS Boom
|--------------------------------------------------------------------------
|
|  Boom provides a set of utilities for returning HTTP errors. Each utility returns a Boom error
|  response object (instance of Error) which includes the following properties:
|
*/
var Boom    = require('boom');

/*
|--------------------------------------------------------------------------
|  HapiJS Joi
|--------------------------------------------------------------------------
|
|  Object schema description language and validator for JavaScript objects.
|
*/
var Path     = require('path');


/*
|--------------------------------------------------------------------------
|  Initialize Server
|--------------------------------------------------------------------------
|
|  Configure Hapi Server
|
*/
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({
		port: 8000,
		routes: { cors: { credentials: true } }
});


/*
|--------------------------------------------------------------------------
|  Template Engine
|--------------------------------------------------------------------------
|
|  Template Engine
|
*/
var Handlerbars = require('handlebars');
var HandlebarsLayouts = require('handlebars-layouts');
HandlebarsLayouts.register(Handlerbars);


/*
|--------------------------------------------------------------------------
|  HAT
|--------------------------------------------------------------------------
|
|  HAT Module
|
*/
var hat = require('hat');



/*
|--------------------------------------------------------------------------
|  View
|--------------------------------------------------------------------------
|
|  View Configuration
|
*/
server.register([require('vision'), require("inert")], function (err) {


	// WEBSITES
	/* ==================================================== */
	/* ==================================================== */

	/*
	|--------------------------------------------------------------------------
	|  Views
	|--------------------------------------------------------------------------
	|
	|  Configured views
	|
	*/
	server.views({
		engines: {
			html: {
				module: Handlerbars
			}
		},
		relativeTo: Path.join(__dirname, 'public'),
		path: './views',
		partialsPath: './views/partials'
	});


	/*
	|--------------------------------------------------------------------------
	|  Handle HTTP Status 404
	|--------------------------------------------------------------------------
	|
	|  404 Response Handler
	|
	*/
	server.ext('onPreResponse', function (request, reply)
	{
		if (request.response.isBoom)
		{
				return reply.redirect('/');
		}

		return reply.continue();
	});


	/*
	|--------------------------------------------------------------------------
	|  Server Events
	|--------------------------------------------------------------------------
	|
	|  Catch-all server events
	|
	*/
	server.on('internalError', function (request, err)
	{
	});



	/*
	|--------------------------------------------------------------------------
	| WEB Route:
	|--------------------------------------------------------------------------
	|
	|  All routes pertaining to web pages
	|
	*/
	server.route({
		method: 'GET',
		path: '/',
		handler: function(request, reply)
		{
			reply.view('page-ethredeem', {});
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/mew',
		handler: function(request, reply)
		{
			reply.redirect("https://medium.com/@dondrey.taylor/how-to-redeem-your-bth-using-myetherwallet-97b6e0a0d250");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/metamask',
		handler: function(request, reply)
		{
			reply.redirect("https://medium.com/@dondrey.taylor/eth-holders-how-to-redeem-your-bth-using-metamask-849c381da87b");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/jaxx',
		handler: function(request, reply)
		{
			reply.redirect("https://medium.com/@dondrey.taylor/eth-holders-how-to-redeem-your-bth-using-jaxx-2dc9e9fec6de");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/ledger',
		handler: function(request, reply)
		{
			reply.redirect("https://medium.com/@dondrey.taylor/eth-holders-how-to-redeem-your-bth-using-ledger-wallet-fb9d706485dd");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/imtoken',
		handler: function(request, reply)
		{
			reply.redirect("https://medium.com/@dondrey.taylor/eth-holders-how-to-redeem-your-bth-using-imtoken-47b984f2cbe");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/trezor',
		handler: function(request, reply)
		{
			reply.redirect("https://medium.com/@dondrey.taylor/eth-holders-how-to-redeem-your-bth-using-trezor-8de9ec362e82");
		}
	});



	/*
	|--------------------------------------------------------------------------
	| API Route: Static Files
	|--------------------------------------------------------------------------
	|
	| Static files
	|
	*/
	server.route({
		method: 'GET',
		path: '/{path*}',
		handler:
		{
			directory:
			{
				path: Path.join(__dirname, 'public'),
				listing: false,
				index: true
			}
		}
	});


	/*
	|--------------------------------------------------------------------------
	| API Route: Starts Server
	|--------------------------------------------------------------------------
	|
	|  Starts server
	|
	*/
	server.start(function()
	{
			console.log("### SERVER STARTED ###");
	});

});
