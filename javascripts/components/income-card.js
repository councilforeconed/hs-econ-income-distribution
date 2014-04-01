App.IncomeCardComponent = Ember.Component.extend({
  
  classNames: ['income-card'],
  
  didInsertElement: function () {
    this.$().draggable({
      containment: '.container',
      scroll: true,
      cursor: 'crosshair',
      start: function (event, ui) {
        App.IncomeCardComponent.zIndex = App.IncomeCardComponent.zIndex || 10;
        this.$().css('z-index', App.IncomeCardComponent.zIndex++);
        this.$().addClass('income-card-active');
      }.bind(this),
      stop: function() {
        this.$().removeClass('income-card-active');
      }.bind(this)
    });
  }
  
});