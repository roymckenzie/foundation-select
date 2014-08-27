(function ( $ ) {
 
  $.fn.foundationSelect = function() {

    // Check to see if custom dropdowns have already been drawn
    if (!$('.custom-dropdown-area').length) {

      // If custom dropdowns haven't been drawn, build and insert them
      return this.each(function () {
        select = $(this);
        selectId = select.attr('id');
        multiple = false;
        multiple = select.prop('multiple') ? true : false;
        options = '';
        if (select.data('prompt')) {
          selectPrompt = select.data('prompt');
          options = '<li class="disabled">' + selectPrompt + '</li>';
        } else {
          selectPrompt = "Choose...";
        }
        select.find('option').each( function (index) {
          options += '<li data-value="' + this.value + '"><span class="option-title">' + $(this).html() + '</span></li>'
        });
        newButton = '<div class="custom-dropdown-area" data-orig-select="#' + selectId + '"' + (multiple ? ' data-multiple="true"' : '') + '><a href="#" data-dropdown="select-' + selectId + '" class="custom-dropdown-button">' + selectPrompt + '</a> \
        <ul id="select-' + selectId + '" class="f-dropdown custom-dropdown-options" data-dropdown-content> \
          ' + options + ' \
        </ul></div>';
        select.hide();
        select.after(newButton);
      });
    };
  };

  // setup a listener to deal with custom dropdown clicks.
  $(document).on('click', '.custom-dropdown-area li', function () {
    if ($(this).hasClass('disabled')) {
      return false;
    }
    dropdown = $(this).closest('.custom-dropdown-area');
    multiple = dropdown.data('multiple') ? true : false;
    text = $(this).find('.option-title').html();
    value = $(this).data('value');
    totalOptions = dropdown.find('li').not('.disabled').length;
    origDropdown = $(dropdown.data('orig-select'));
    prompt = origDropdown.data('prompt') ? origDropdown.data('prompt') : 'Choose...';
    if (multiple) {
      $(this).toggleClass('selected');
      selectedOptions = [];
      selectedTitles = [];
      dropdown.find('.selected').each( function () {
        selectedOptions.push($(this).data('value'));
        selectedTitles.push($(this).find('.option-title').html());
      });
      origDropdown.val(selectedOptions);
      if (selectedOptions.length) {
        if (selectedOptions.length > 2) {
          dropdown.find('.custom-dropdown-button').html(selectedOptions.length + ' of ' + totalOptions + ' selected');
        }else{
          dropdown.find('.custom-dropdown-button').html(selectedTitles.join(', '));
        }
      }else{
        dropdown.find('.custom-dropdown-button').html(prompt);
      }

    }else{
      dropdown.find('li').removeClass('selected');
      Foundation.libs.dropdown.close($('#'+dropdown.find('ul').attr('id')));      
      origDropdown.val(value);
      $(this).toggleClass('selected');
      dropdown.find('.custom-dropdown-button').html(text);
    console.log(text);
    }
  });

  $(document).on('reset', 'form', function () {
    if ($(this).children('.custom-dropdown-area').length) {
      $(this).find('.custom-dropdown-area').each( function () {
        origDropdown = $($(this).data('orig-select'));
        dropdown = $(this);
        multiple = dropdown.data('multiple') ? true : false;
        prompt = origDropdown.data('prompt') ? origDropdown.data('prompt') : 'Choose...';
        dropdown.find('li').removeClass('selected');
        dropdown.find('.custom-dropdown-button').html(prompt);

      });
    }
  });

}( jQuery ));
