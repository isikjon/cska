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
    
    var groupsData = [
        {
            title: 'Подготовительная группа',
            age: '3 – 5 лет',
            lessons: '2 раза в неделю',
            duration: '45 минут',
            text1: 'Квалифицированные специалисты Детско-Юношеской Футбольной Академии ПФК ЦСКА работают по программе физического развития юного спортсмена, проводят регулярные занятия по развитию двигательных умений и быстрого принятия решения',
            text2: 'Так же особое внимание уделяется психоэмоциональному развитию юных спортсменов, адаптации детей в команде, воспитанию лидерских качеств и уважению к окружающим. Своевременное начатое и правильно осуществляемое физическое воспитание детей раннего возраста является важным условием их полноценного развития в подготовке достойной смены будущих футболистов ПФК ЦСКА.'
        },
        {
            title: 'Группа набора',
            age: '5 – 7 лет',
            lessons: '3 раза в неделю',
            duration: '60 минут',
            text1: 'Группа набора предназначена для детей, которые только начинают свой путь в футболе. Тренеры проводят отбор и оценку физических данных юных спортсменов, определяя их потенциал и способности.',
            text2: 'В процессе занятий особое внимание уделяется базовым навыкам владения мячом, координации движений и работе в команде. Дети учатся основам тактики и стратегии игры, развивают выносливость и скорость реакции.'
        },
        {
            title: 'Группа начальной подготовки',
            age: '7 – 10 лет',
            lessons: '4 раза в неделю',
            duration: '75 минут',
            text1: 'Группа начальной подготовки формирует фундаментальные навыки футболиста. Спортсмены осваивают технику ударов, передачи, дриблинга и работы с мячом в различных игровых ситуациях.',
            text2: 'Тренеры развивают тактическое мышление, обучают позиционной игре и взаимодействию с партнерами. Регулярные тренировки и участие в товарищеских матчах помогают закрепить полученные знания и навыки.'
        },
        {
            title: 'Группа углублённого обучения',
            age: '10 – 14 лет',
            lessons: '5 раз в неделю',
            duration: '90 минут',
            text1: 'Группа углублённого обучения предназначена для спортсменов, которые демонстрируют высокий уровень подготовки и потенциал для профессиональной карьеры. Интенсивные тренировки включают работу над техникой, тактикой и физической формой.',
            text2: 'Спортсмены участвуют в соревнованиях различного уровня, развивают лидерские качества и умение принимать решения в стрессовых ситуациях. Индивидуальный подход к каждому игроку позволяет максимально раскрыть его потенциал.'
        },
        {
            title: 'Группа вратарей',
            age: '8 – 16 лет',
            lessons: '4 раза в неделю',
            duration: '90 минут',
            text1: 'Специализированная группа для подготовки вратарей включает обучение технике отражения ударов, работе на выходах, позиционированию в воротах и взаимодействию с защитниками.',
            text2: 'Тренеры вратарей используют современные методики подготовки, включая работу с реакцией, координацией и психологической устойчивостью. Особое внимание уделяется работе ног, игре на выходах и организации игры от ворот.'
        }
    ];
    
    var currentGroupIndex = 0;
    var $groupTitles = $('.group__title .title__block');
    var $groupRightIntro = $('.group__right-intro-title');
    var $groupCardAge = $('.group__right-card-age');
    var $groupCardLessons = $('.group__right-card-lessons');
    var $groupCardDuration = $('.group__right-card-duration');
    var $groupSubtitleText1 = $('.group__cards-subtitle-text-1');
    var $groupSubtitleText2 = $('.group__cards-subtitle-text-2');
    var $groupBtnPrev = $('.group__cards-btn-prev');
    var $groupBtnNext = $('.group__cards-btn-next');
    
    function updateGroupContent(index) {
        var groupData = groupsData[index];
        
        $groupRightIntro.css('opacity', '0');
        $groupCardAge.css('opacity', '0');
        $groupCardLessons.css('opacity', '0');
        $groupCardDuration.css('opacity', '0');
        $groupSubtitleText1.css('opacity', '0');
        $groupSubtitleText2.css('opacity', '0');
        
        setTimeout(function() {
            $groupRightIntro.text(groupData.title);
            $groupCardAge.text(groupData.age);
            $groupCardLessons.text(groupData.lessons);
            $groupCardDuration.text(groupData.duration);
            $groupSubtitleText1.text(groupData.text1);
            $groupSubtitleText2.text(groupData.text2);
            
            $groupRightIntro.css('opacity', '1');
            $groupCardAge.css('opacity', '1');
            $groupCardLessons.css('opacity', '1');
            $groupCardDuration.css('opacity', '1');
            $groupSubtitleText1.css('opacity', '1');
            $groupSubtitleText2.css('opacity', '1');
        }, 300);
    }
    
    function switchGroup(index) {
        if (index < 0 || index >= groupsData.length) return;
        if (currentGroupIndex === index) return;
        
        currentGroupIndex = index;
        
        $groupTitles.removeClass('title__active');
        $groupTitles.eq(index).addClass('title__active');
        
        updateGroupContent(index);
    }
    
    $groupTitles.on('click', function() {
        var index = $(this).data('group');
        switchGroup(index);
    });
    
    $groupBtnPrev.on('click', function() {
        var prevIndex = currentGroupIndex - 1;
        if (prevIndex < 0) prevIndex = groupsData.length - 1;
        switchGroup(prevIndex);
    });
    
    $groupBtnNext.on('click', function() {
        var nextIndex = currentGroupIndex + 1;
        if (nextIndex >= groupsData.length) nextIndex = 0;
        switchGroup(nextIndex);
    });
    
    var coachCurrentIndex = 0;
    var $coachTrack = $('.coach__slider-track');
    var $coachItems = $('.coach__slider-item');
    var $coachPrev = $('.coach__slider-arrow-prev');
    var $coachNext = $('.coach__slider-arrow-next');
    var coachItemsVisible = 3;
    var coachTotalItems = $coachItems.length;
    var coachMaxIndex = coachTotalItems - coachItemsVisible;
    
    function updateCoachSlider() {
        var trackWidth = $coachTrack.parent().width();
        var gap = 7;
        var totalGaps = (coachItemsVisible - 1) * gap;
        var itemWidth = (trackWidth - totalGaps) / coachItemsVisible;
        var translateX = -coachCurrentIndex * (itemWidth + gap);
        $coachTrack.css('transform', 'translateX(' + translateX + 'px)');
    }
    
    function checkCoachButtons() {
        if (coachCurrentIndex <= 0) {
            $coachPrev.prop('disabled', true).css('opacity', '0.3');
        } else {
            $coachPrev.prop('disabled', false).css('opacity', '1');
        }
        
        if (coachCurrentIndex >= coachMaxIndex) {
            $coachNext.prop('disabled', true).css('opacity', '0.3');
        } else {
            $coachNext.prop('disabled', false).css('opacity', '1');
        }
    }
    
    $coachPrev.on('click', function() {
        if (coachCurrentIndex > 0) {
            coachCurrentIndex--;
            updateCoachSlider();
            checkCoachButtons();
        }
    });
    
    $coachNext.on('click', function() {
        if (coachCurrentIndex < coachMaxIndex) {
            coachCurrentIndex++;
            updateCoachSlider();
            checkCoachButtons();
        }
    });
    
    $(window).on('resize', function() {
        updateCoachSlider();
    });
    
    updateCoachSlider();
    checkCoachButtons();
    
    var galleryCurrentIndex = 0;
    var $galleryTrack = $('.gallery__slider-track');
    var $galleryItems = $('.gallery__slider-item');
    var $galleryPrev = $('.gallery__slider-arrow-prev');
    var $galleryNext = $('.gallery__slider-arrow-next');
    var galleryItemsVisible = 2;
    var galleryTotalItems = $galleryItems.length;
    var galleryMaxIndex = galleryTotalItems - galleryItemsVisible;
    
    function updateGallerySlider() {
        var wrapperWidth = $galleryTrack.parent().width();
        var gap = 7;
        var totalGaps = (galleryItemsVisible - 1) * gap;
        var itemWidth = (wrapperWidth - totalGaps) / galleryItemsVisible;
        var translateX = -galleryCurrentIndex * (itemWidth + gap);
        $galleryTrack.css('transform', 'translateX(' + translateX + 'px)');
    }
    
    function checkGalleryButtons() {
        if (galleryCurrentIndex <= 0) {
            $galleryPrev.prop('disabled', true).css('opacity', '0.3');
        } else {
            $galleryPrev.prop('disabled', false).css('opacity', '1');
        }
        
        if (galleryCurrentIndex >= galleryMaxIndex) {
            $galleryNext.prop('disabled', true).css('opacity', '0.3');
        } else {
            $galleryNext.prop('disabled', false).css('opacity', '1');
        }
    }
    
    $galleryPrev.on('click', function() {
        if (galleryCurrentIndex > 0) {
            galleryCurrentIndex--;
            updateGallerySlider();
            checkGalleryButtons();
        }
    });
    
    $galleryNext.on('click', function() {
        if (galleryCurrentIndex < galleryMaxIndex) {
            galleryCurrentIndex++;
            updateGallerySlider();
            checkGalleryButtons();
        }
    });
    
    $(window).on('resize', function() {
        updateGallerySlider();
    });
    
    updateGallerySlider();
    checkGalleryButtons();
});

