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
    totalOptions = dropdown.find('li').not('.disabled').length;
    origDropdown = $(dropdown.data('orig-select'));
    if (dropdown.data('multiple')) {
      $(this).toggleClass('selected');
      selectedOptions = [];
      selectedTitles = [];
      dropdown.find('.selected').each( function () {
        selectedOptions.push($(this).data('value'));
        selectedTitles.push($(this).find('.option-title').html());
      });
      origDropdown.val(selectedOptions).change();
      if (!selectedOptions.length) {
        selectPrompt = origDropdown.data('prompt') ? origDropdown.data('prompt') : 'Choose...';
      } else if (selectedOptions.length > 2) {
        selectPrompt = selectedTitles.length + ' of ' + selectOptions.length + ' selected';
      } else {
        selectPrompt = selectedTitles.join(', ');
      }
      dropdown.find('.custom-dropdown-button').html(selectPrompt);
    } else {
      dropdown.find('li').removeClass('selected');
      Foundation.libs.dropdown.close($('#'+dropdown.find('ul').attr('id')));
      origDropdown.val($(this).data('value')).change();
      $(this).toggleClass('selected');
      dropdown.find('.custom-dropdown-button').html("<div class='" + $(this).attr('class') + "'>" + $(this).find('.option-title').html() + "</div>");
    }
  });

  $(document).on('reset', 'form', function () {
    if ($(this).children('.custom-dropdown-area').length) {
      $(this).find('.custom-dropdown-area').each( function () {
        origDropdown = $($(this).data('orig-select'));
        dropdown = $(this);
        dropdown.find('li').removeClass('selected');
        selectedTitles = [];
        origDropdown.find('option').each( function () {
          if ($(this).attr('selected')) {
            selectedTitles.push($(this).html());
            dropdown.find('li[data-value="' + $(this).val() + '"]').addClass('selected');
          }
        });
        if (!selectedTitles.length) {
          selectPrompt = origDropdown.data('prompt') ? origDropdown.data('prompt') : 'Choose...';
        } else if (selectedTitles.length > 2) {
          selectPrompt = selectedTitles.length + ' of ' + selectOptions.length + ' selected';
        } else {
          selectPrompt = selectedTitles.join(', ');
        }
        dropdown.find('.custom-dropdown-button').html(selectPrompt);
      });
    }
  });

}( jQuery ));
