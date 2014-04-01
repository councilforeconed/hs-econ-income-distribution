App.ApplicationController = Ember.ArrayController.extend({
  
  init: function () {
    this._super(); 
  },
  
  quintiles: function () {
    var incomes = this.get('content').sortBy('value');
    var quintiles = Array.apply(null, new Array(5)).map(function () { return []; });
    var scale = d3.scale.quantize().domain([0, incomes.length]).range(d3.range(0,5));
    incomes.forEach(function (income, index) {
      quintiles[scale(index)].push(income);
    });
    return quintiles;
  }.property('content'),
  
  bins: function () {
    var bins = App.QuintileBins.create();
    return bins.get('bins');
  }.property()
  
});