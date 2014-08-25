(function ( $ ) {
 
  $.fn.foundationSelect = function() {

    if (!$('.custom-dropdown-area').length) {

      return this.each(function () {
        select = $(this)
        selectId = select.attr('id');
        selectPrompt = select.data('prompt');
        options = '';
        select.find('option').each( function (index) {
          options += '<li data-value="' + this.value + '">' + $(this).html() + '</li>'
        });
        newButton = '<div class="custom-dropdown-area" data-orig-select="#' + selectId + '"><a href="#" data-dropdown="select-' + selectId + '" class="custom-dropdown-button">' + selectPrompt + '</a> \
        <ul id="select-' + selectId + '" class="f-dropdown custom-dropdown-options" data-dropdown-content> \
          ' + options + ' \
        </ul></div>';
        select.hide();
        select.after(newButton);
      });
    };
  };

  $(document).on('click', '.custom-dropdown-area li', function () {
    text = $(this).html();
    value = $(this).data('value');
    dropdown = $(this).closest('.custom-dropdown-area');
    origDropdown = $(dropdown.data('orig-select'));
    Foundation.libs.dropdown.close($('#'+dropdown.find('ul').attr('id')));
    dropdown.find('.custom-dropdown-button').html(text);
    origDropdown.val(text);
  });

}( jQuery ));
