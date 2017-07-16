// карта

function initMap() {
  var latLng = {lat: 59.93857, lng: 30.323};
  var mapCenter = {lat: 59.9388, lng: 30.323}
  var map = new google.maps.Map(document.getElementById("map-canvas"), {
    zoom: 16,
    center: mapCenter,
    mapTypeControl: false,
    streetViewControl: false,
    scrollwheel: false,
  });

  var image = {
    url: "img/icon-map-pin.svg",
    size: new google.maps.Size(66, 101),
    scaledSize: new google.maps.Size(66, 101)
  };
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: image,
    optimized: false
  });
}

// svg-спрайт

(function(window, document) {
  'use strict';
  var file = 'img/sprite.svg', // путь к файлу спрайта на сервере
      revision = 3;            // версия спрайта, меняй при обновлении
  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
  var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
    request,
    data,
    insertIT = function() {
      document.body.insertAdjacentHTML('afterbegin', data);
    },
    insert = function() {
      if (document.body) insertIT();
      else document.addEventListener('DOMContentLoaded', insertIT);
    };
  if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
    data = localStorage.getItem('inlineSVGdata');
    if (data) {
      insert();
      return true;
    }
  }
  try {
    request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        data = request.responseText;
        insert();
        if (isLocalStorage) {
          localStorage.setItem('inlineSVGdata', data);
          localStorage.setItem('inlineSVGrev', revision);
        }
      }
    }
    request.send();
  } catch (e) {}
}(window, document));

// popup

  var toggle = document.querySelector(".main-nav__burger");
  var mobile = document.querySelector(".main-nav__item--mobile");

  toggle.addEventListener("click", function(event) {
    event.preventDefault();
    mobile.classList.toggle("main-nav__item--logo");
  });
