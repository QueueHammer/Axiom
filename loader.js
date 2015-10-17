window.Axiom = (function () {
  function Axiom() {
    var funk = function () {};
    var params = [];
    var mocks = {};

    function closure() {
      var args = arguments;
      return funk.apply(this, params.map(function (k, i) { return mocks[k] ? mocks[k]: args[i]; }));
    }

    var outObj = {
      get func () { return closure; },
      set func (val) { funk = val; },
      get params () { return params.slice(); },
      set params (val) { params = val; },
      get inject () {
        return params.reduce(function (m, d, i) {
          Object.defineProperty(m, d, {
            set: function (val) {
              mocks[d] = val;
            }
          });
          return m;
        }, {});
      },
      get ng () {
        var list = params.slice();
        list.push(closure);
        return list;
      }
    };

    return outObj;
  }

  Axiom.new = function () {
    return new Axiom();
  };

  return Axiom;
})();
