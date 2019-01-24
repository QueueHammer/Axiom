# Axiom
A library for creating functions with extra powers.

## Why
JavaScript has built in reflection... that breaks when the code is compressed by minification. To fix this it is common to pass along string names for each parameter to help code that needs that information. Axiom aims to help with this in the three cases that it is convenient.

## Angular Functions
Angular uses string definitions for its parameters so that it can 'inject' the values it needs when it runs. It may not seem the natural first approach to do this with a list that leads with the parameters and then ends with the function. There are other ways to define this information but it can obscure what is being injected for each parameter after the code has been updated, e.g. `(f(){}).$inject`. The function definition is also incompatible with other patterns so that function it's not drop in ready for other frameworks.

### AMD Definitions
Front end AMD uses a pattern where a list of property names is passed before the function to define so that it's dependencies will be understood after minification. The idea is fairly strait forward, though not compatible with libraries like Angular directly.

### Testing and mocking
Another powerful feature of reflection is mocking an input to a function. This way the function can be tested entirely or partially mocked even if it is minified.

## How?
We start by defining the function and it's named parameters.

```
var mod = Axiom.new();

//Assign the values
mod.params = ['message','logModule'];

//Assign the function
mod.function = function (message, logModue) { logModule(message); };

//Call it directly
mod('hello world', someLogger);

//Now it can be used with require.js
define(mod.params, mod.function);

//or with Angular
app.controller(mod.ng);

//Injecting for tests or other reasons is easy
mod.inject.logModule = function (msg) { console.log(msg); };
mod('hello'); //Logs 'hello' to console.

//If the module was already being used in a framework we could 'live' inject
function report() {
    mod('Sound Off!!', aConsoleLogger);
}

report(); //Logs to the console

//Sub the logger after use
mod.inject.logModule = dbLogger;

report(); //Loggs to the db

//This would work even if it had already been used with Angular or another framework.
