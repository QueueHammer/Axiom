window.Axiom = (function () {
  function Axiom() {
    var func = function () {};
    var params = [];
    var mocks = {};

    function closure() {
      var args = arguments;
      return func.apply(this, params.map(function (k, i) {
        return mocks[k] ? mocks[k]: args[i];
      }));
    }

    Object.defineProperties(closure, {
      func: {
        get: function () { return closure; },
        set: function (val) { func = val; },
      },
      params: {
        get: function () { return params.slice(); },
        set: function (val) { params = val; },
      },
      inject: {
        get: function () {
          return params.reduce(function (m, d, i) {
            Object.defineProperty(m, d, {
              set: function (val) {
                mocks[d] = val;
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

    return closure;
  }

  Axiom.new = function () {
    return new Axiom();
  };

  return Axiom;
})();
