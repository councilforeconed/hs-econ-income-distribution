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
    var bins = Em.A();
    
    _.times(5, function (i) {
      bins.push(App.QuintileBin.create());
    });
    
    bins.forEach(function (bin) {
      bin.get('cards').addArrayObserver(this.get('binObserver'));
    }, this);
    
    bins.addArrayObserver(this.get('binCollectionObserver'));
    
    return bins;
  }.property(),
  
  binObserver: function () {
    var self = this;
    return Ember.Object.create({
      arrayWillChange: function () {},
      arrayDidChange: function (observedObj, start, removeCount, addCount) {
        self.get('bins').arrayContentDidChange();
      }
    });
  }.property(),
  
  binCollectionObserver: function () {
    var self = this;
    return Ember.Object.create({
      arrayWillChange: function () {},
      arrayDidChange: function (observedObj, start, removeCount, addCount) {
        console.log(self.get('bins'));
      }
    });
  }.property(),
  
});