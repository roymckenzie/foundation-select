(function ( $ ) {

  $.fn.foundationSelect = function() {

    // Check to see if custom dropdowns have already been drawn
    if (!$('.custom-dropdown-area').length) {

      // If custom dropdowns haven't been drawn, build and insert them
      return this.each(function () {
        select = $(this);
        selectId = select.attr('id');
        selectOptions = [];
        selectedTitles = [];
        select.find('option').each( function () {
          selectClasses = [];
          if ($(this).attr('selected')) {
            selectedTitles.push($(this).html());
            selectClasses.push('selected');
          }
          if ($(this).attr('class')) {
            selectClasses.push($(this).attr('class'));
          }
          if ($(this).prop('disabled')) {
            selectClasses.push('disabled');
          }
          selectOptions.push('<li data-value="' + $(this).val() + '" class="' + selectClasses.join(' ') + '"><span class="option-title">' + $(this).html() + '</span></li>');
        });

        if (!selectedTitles.length) {
          selectPrompt = select.data('prompt') ? select.data('prompt') : 'Choose...';
        } else if( selectedTitles.length > 2) {
          selectPrompt = selectedTitles.length + ' of ' + selectOptions.length + ' selected';
        } else {
          selectPrompt = selectedTitles.join(', ');
        }

        dropdown = '<div class="custom-dropdown-area" data-orig-select="#' + selectId + '"' + (select.prop('multiple') ? ' data-multiple="true"' : '') + '><a href="#" data-dropdown="select-' + selectId + '" class="custom-dropdown-button">' + selectPrompt + '</a> \
        <ul id="select-' + selectId + '" class="f-dropdown custom-dropdown-options" data-dropdown-content> \
          ' + selectOptions.join('') + ' \
        </ul></div>';
        select.hide();
        select.after(dropdown);
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
    text = "<div class='" + $(this).attr('class') + "'>" + $(this).find('.option-title').html() + "</div>";
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
      origDropdown.val(selectedOptions).change();
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
      origDropdown.val(value).change();
      $(this).toggleClass('selected');
      dropdown.find('.custom-dropdown-button').html(text);
    }
  });

  $(document).on('reset', 'form', function () {
    if ($(this).children('.custom-dropdown-area').length) {
      $(this).find('.custom-dropdown-area').each( function () {
        origDropdown = $($(this).data('orig-select'));
        dropdown = $(this);
        multiple = dropdown.data('multiple') ? true : false;
        dropdown.find('li').removeClass('selected');
        if (origDropdown.data('prompt')) {
          prompt = origDropdown.data('prompt');
        }else{
          origDropdown.find('option').each( function () {
            if ($(this).attr('selected')) {
              prompt = $(this).html();
              dropdown.find('li[data-value="' + this.value + '"]').addClass('selected');
            }
          });
          if (prompt == '') {
            prompt = 'Choose...';
          }
        }
        dropdown.find('.custom-dropdown-button').html(prompt);
      });
    }
  });

}( jQuery ));
