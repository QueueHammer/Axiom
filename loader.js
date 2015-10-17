window.loader = (function () {
  function functor() {
    var funk = function () {};
    var bound = funk;
    var params = [];
    var replacements = {};

    function injector() {

    }

    function closure() {
      var args = arguments;
      return funk.apply(this, params.map(function (k, i) { return replacements[k] ? replacements[k]: args[i]; }));
    }

    Object.defineProperties(this, {
      function: {
        get: function () {
          return closure;
        },
        set: function (val) {
          funk = val;
        }
      },
      parameters: {
        get: function () {
          return params.slice();
        },
        set: function (val) {
          params = val;
        }
      },
      inject: {
        get: function () {
          return params.reduce(function (m, d, i) {
            Object.defineProperty(m, d, {
              set: function (val) {
                replacements[d] = val;
              }
            });
            return m;
          }, {});
        }
      },
      ng: {
        get: function () {
          var list = params.slice();
          list.push(closure);
          return list;
        }
      }
    });
  }

  return functor;
})();
