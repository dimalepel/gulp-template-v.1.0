'use strict';

/*! My project scripts */
(function ($) {
  // Мобильное подменю
  let mobileStart = 980;
  let openSubMenu = function (el) {
    $(el).click(function () {
      $(this).next().slideToggle();
      $(this).parent().toggleClass('active');
      return false;
    });
  }
  if($(window).width() <= mobileStart) {
    openSubMenu('.has-child > a');
  }
})(jQuery);

(function ($) {
  // Табы
  let uniTabs = function (tabsSection) {
    let tabLink = $(tabsSection).find('.tabs__navigation-link');

    $(tabLink).click(function () {
      $(this).parent().siblings().removeClass('active');
      $(this).parent().addClass('active');

      let tabLinkHref = $(this).attr('href');
      $('.tabs__wrapper').find('.tabs__content').removeClass('open');
      $(tabLinkHref).addClass('open');
      return false;
    });
  }
  uniTabs('.tabs');
})(jQuery);

(function ($) {
  // Слайдер промо
  function promoSlider(element) {
    const slider = $(element);
    if (slider) {
      $(slider).slick({
        slidesToShow: 1,
        infinite: false,
        arrows: false,
        dots: true
      });
    }
  }
  promoSlider('.js--promo-slider');
})(jQuery);

(function() {
  // Yandex map
  function yandexMap(coords) {
    ymaps.ready(init);
    function init() {
      var zoom = 17;
      var iconImageSize = [75, 79];
      var iconImageOffset = [-37, -65];
      var center = coords;
      var siteMap = new ymaps.Map('map', {
        center: center,
        zoom: zoom,
        controls: []
      });
      var zoomControl = new ymaps.control.ZoomControl({
        options: {
          size: "small"
        }
      });
      siteMap.controls.add(zoomControl);
      var elamarPlacemark = new ymaps.Placemark(center, {}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/icon-pin.png',
        iconImageSize: iconImageSize,
        iconImageOffset: iconImageOffset
      });
      siteMap.geoObjects.add(elamarPlacemark);
    }
  }
  yandexMap([53.916, 27.5126]);
})();

(function ($) {
  // Маска телефона
  $('.form__field--phone').mask('+375 (99) 999-99-99');
})(jQuery);

(function ($) {
  // Валидация формы
  $(".form--validate").each(function() {
    let $form = $(this);
    $form.validate();
  });

  $.extend($.validator.messages, {
    required: 'Обязательное поле'
  });
})(jQuery);

(function ($) {
  // Page scroll to id
  $('a[rel="m_PageScroll2id"]').mPageScroll2id({
    offset: 25,
    onComplete:function(){
      $('.js--page-header').removeClass('active');
      $('body').removeClass('overflow');
    }
  });
})(jQuery);

(function ($) {
  // Аккордион
  function openAccordion(element) {
    let trigger = $(element).find('.js--accordion-title');

    $(trigger).click(function (event) {
      console.log('click');
      $(this).parent().siblings().removeClass('active');
      $(this).parent().siblings().find('.js--accordion-content').slideUp();
      $(this).parent().toggleClass('active');
      $(this).siblings('.js--accordion-content').slideToggle();
      return false;
    });
  }
  openAccordion('.js--accordion');
})(jQuery);

(function ($) {
  // Открываем боковое меню
  let openAsideMenu = function (el) {
    $(el).click(function () {
      $(this).parents('.page-header').toggleClass('active');
      $('body').toggleClass('overflow');
      return false;
    });
  }
  openAsideMenu('.js--menu-toggler');
})(jQuery);

(function ($) {
  const modalOverlay = $('.js--overlay');
  const buttonEscKey = 27;

  function closeModal(targetWindow) {
    $(modalOverlay).removeClass('show');
    $(targetWindow).removeClass('show');
    $('body').removeClass('overflow');
  }

  // Open modal window
  function openModalClick(element) {
    $(element).click(function(event) {
      const linkAnchor = $(this).attr('href');

      $(linkAnchor).addClass('show');
      $(modalOverlay).addClass('show');
      $('.js--header-toggle').removeClass('active');
      $('.js--page-header').removeClass('active');
      $('body').addClass('overflow');
      $('.page-header').removeClass('active');

      return false;
    });
  }
  openModalClick('.js--modal-trigger');

  // Close modal window
  function closeModalWindow(trigger) {
    $(document).on('click', trigger, function(event){
      const parentWindow = $(this).parents('.modal');
      closeModal(parentWindow);

      return false;
    });
  }
  closeModalWindow('.js--modal-close');

  // Close modal window ESC
  $(window).on('keydown', function (evt) {
    if (evt.keyCode === buttonEscKey) {
      closeModal('.js--modal');

      return false;
    }
  });

  // Close modal in overlay
  $(document).on('click', '.js--overlay', function(event){
    closeModal('.js--modal');

    return false;
  });
})(jQuery);

(function() {
  let breakPoint = 980;
  const screenWidth = window.screen.width;
  // Swiper slider
  function swipeCarousel(el, sl) {
    let swiper = new Swiper(el, {
      slidesPerView: "auto",
      spaceBetween: 0,
      freeMode: true,
      loop: false,
      breakpoints: {
        761: {
          slidesPerView: sl,
          spaceBetween: 16,
        }
      },
    });
  }
  if (screenWidth <= breakPoint) {
    swipeCarousel('.js--last-news', 3);
  }
})();
