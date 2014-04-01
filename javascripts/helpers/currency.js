Ember.Handlebars.helper('currency', function(value, options) {
  return numeral(value).format('$0,0');
});