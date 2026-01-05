$(document).ready(function() {
    var $fixedNavbar = $('.hero__block-navbar-fixed');
    var $regularNavbar = $('.hero__block-content').find('.hero__block-navbar').first();
    
    function handleScroll() {
        var scrollTop = $(window).scrollTop();
        
        if (scrollTop > 10) {
            $fixedNavbar.addClass('visible');
            $regularNavbar.addClass('hidden');
        } else {
            $fixedNavbar.removeClass('visible');
            $regularNavbar.removeClass('hidden');
        }
    }
    
    $(window).on('scroll', handleScroll);
    handleScroll();
    
    var $customSelect = $('.map__block-right-popup-select-custom');
    var $selectInput = $('.map__block-right-popup-select-input');
    var $selectText = $('.map__block-right-popup-select-text');
    var $selectDropdown = $('.map__block-right-popup-select-dropdown');
    var $selectOptions = $('.map__block-right-popup-select-option');
    var $closeBtn = $('.map__block-right-popup-select-close');
    var selectedValue = null;
    
    $selectInput.on('click', function(e) {
        e.stopPropagation();
        $customSelect.toggleClass('active');
    });
    
    $selectOptions.on('click', function() {
        var $option = $(this);
        var value = $option.data('value');
        var text = $option.text();
        
        selectedValue = value;
        $selectText.text(text);
        $selectInput.addClass('selected');
        $closeBtn.show();
        $selectOptions.removeClass('selected');
        $option.addClass('selected');
        $customSelect.removeClass('active');
    });
    
    $closeBtn.on('click', function(e) {
        e.stopPropagation();
        selectedValue = null;
        $selectText.text('ВЫБЕРИТЕ ГОРОД');
        $selectInput.removeClass('selected');
        $closeBtn.hide();
        $selectOptions.removeClass('selected');
        $customSelect.removeClass('active');
    });
    
    $(document).on('click', function(e) {
        if (!$(e.target).closest($customSelect).length) {
            $customSelect.removeClass('active');
        }
    });
});

