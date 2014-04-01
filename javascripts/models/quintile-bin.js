App.QuintileBin = Ember.Object.extend({
  
  init: function () {
    this._super();
    this.set('cards', Em.A());
  },
  
  invalid: true,
  
});