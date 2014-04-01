App.QuintileBins = Ember.Object.extend({
  
  firstQuintile: function () {
    return App.QuintileBin.create();
  }.property(),
  
  secondQuintile: function () {
    return App.QuintileBin.create();
  }.property(),
  
  thirdQuintile: function () {
    return App.QuintileBin.create();
  }.property(),
  
  fourthQuintile: function () {
    return App.QuintileBin.create();
  }.property(),
  
  fifthQuintile: function () {
    return App.QuintileBin.create();
  }.property(),
  
  bins: function () {
    return Em.A([
      this.get('firstQuintile'),
      this.get('secondQuintile'),
      this.get('thirdQuintile'),
      this.get('fourthQuintile'),
      this.get('fifthQuintile')
    ]);
  }.property('firstQuintile', 'secondQuintile', 'thirdQuintile', 'fourthQuintile', 'fifthQuintile'),
  
  onChange: function () {
    this.get('controller').trigger('binChange');
  }.observes('firstQuintile.cards.@each', 'secondQuintile.cards.@each', 'thirdQuintile.cards.@each', 'fourthQuintile.cards.@each', 'fifthQuintile.cards.@each')
  
});