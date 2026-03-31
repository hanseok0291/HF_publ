/**
 * 컬러 스타일 가이드 - 팔레트 데이터 및 렌더링
 * 이미지 구성: 제목 + 가로 스워치 + 숫자 + 헥스 코드 (명암비/Base/Text 없음)
 */

(function () {
  'use strict';

  var palettes = {
    neutral: [
      { scale: 5, value: '#f6f6f9' }, { scale: 10, value: '#e5e5e8' }, { scale: 20, value: '#d1d1d1' },
      { scale: 30, value: '#b0b0b3' }, { scale: 40, value: '#888888' }, { scale: 50, value: '#6d6d6d' },
      { scale: 60, value: '#5d5d5d' }, { scale: 70, value: '#4f4f4f' }, { scale: 80, value: '#454545' },
      { scale: 90, value: '#3d3d3d' }, { scale: 95, value: '#151515' }
    ],
    hectoOrange: [
      { scale: 5, value: '#FFEFE7' }, { scale: 10, value: '#FFE3D8' }, { scale: 20, value: '#FFCFBD' },
      { scale: 30, value: '#FFAF8A' }, { scale: 40, value: '#FF926A' }, { scale: 50, value: '#FF6114' },
      { scale: 60, value: '#F85100' }, { scale: 70, value: '#D54000' }, { scale: 80, value: '#B82C00' },
      { scale: 90, value: '#932300' }, { scale: 95, value: '#651800' }
    ],
    red: [
      { scale: 5, value: '#FFEEED' }, { scale: 10, value: '#FFDFDB' }, { scale: 20, value: '#FFCDC9' },
      { scale: 30, value: '#FFA9A1' }, { scale: 40, value: '#FF8278' }, { scale: 50, value: '#FF4242' },
      { scale: 60, value: '#F41010' }, { scale: 70, value: '#D10505' }, { scale: 80, value: '#B20000' },
      { scale: 90, value: '#940000' }, { scale: 95, value: '#6F0000' }
    ],
    green: [
      { scale: 5, value: '#f0fdf4' }, { scale: 10, value: '#ddfbe6' }, { scale: 20, value: '#bdf5ce' },
      { scale: 30, value: '#89eca9' }, { scale: 40, value: '#4eda7c' }, { scale: 50, value: '#28c85d' },
      { scale: 60, value: '#1a9f46' }, { scale: 70, value: '#187d3a' }, { scale: 80, value: '#186332' },
      { scale: 90, value: '#16512b' }, { scale: 95, value: '#062d15' }
    ],
    blue: [
      { scale: 5, value: '#eef5ff' }, { scale: 10, value: '#d9e7ff' }, { scale: 20, value: '#bcd5ff' },
      { scale: 30, value: '#8ebcff' }, { scale: 40, value: '#5996ff' }, { scale: 50, value: '#2465ff' },
      { scale: 60, value: '#1b4df5' }, { scale: 70, value: '#1439e1' }, { scale: 80, value: '#172fb6' },
      { scale: 90, value: '#192d8f' }, { scale: 95, value: '#141d57' }
    ],
    purple: [
      { scale: 5, value: '#f9f5ff' }, { scale: 10, value: '#f1e9fe' }, { scale: 20, value: '#e5d7fd' },
      { scale: 30, value: '#d2b7fb' }, { scale: 40, value: '#b688f8' }, { scale: 50, value: '#9a5bf1' },
      { scale: 60, value: '#833ae3' }, { scale: 70, value: '#6f28c8' }, { scale: 80, value: '#5f26a3' },
      { scale: 90, value: '#562390' }, { scale: 95, value: '#330a61' }
    ],
    opacity: [
      { scale: 5, value: '#f5f5f5' }, { scale: 10, value: '#e8e8e8' }, { scale: 20, value: '#d1d1d1' },
      { scale: 30, value: '#b3b3b3' }, { scale: 40, value: '#999999' }, { scale: 50, value: '#808080' },
      { scale: 60, value: '#666666' }, { scale: 70, value: '#4d4d4d' }, { scale: 80, value: '#333333' },
      { scale: 90, value: '#1a1a1a' }
    ]
  };

  function renderPalette(containerId, items) {
    var container = document.getElementById(containerId);
    if (!container || !items.length) return;

    var cols = items.length;

    var swatchesHtml =
      '<div class="palette-row" style="grid-template-columns: repeat(' + cols + ', 1fr);">' +
      items.map(function (item) {
        return '<div class="palette-swatch" style="background-color: ' + item.value + '"></div>';
      }).join('') +
      '</div>';

    var metaHtml =
      '<div class="palette-meta-row" style="grid-template-columns: repeat(' + cols + ', 1fr);">' +
      items.map(function (item) {
        return '<div class="palette-meta-row__cell">' + item.scale + '</div>';
      }).join('') +
      '</div>';

    var hexHtml =
      '<div class="palette-hex-row" style="grid-template-columns: repeat(' + cols + ', 1fr);">' +
      items.map(function (item) {
        return '<div class="palette-hex-row__cell">' + item.value + '</div>';
      }).join('') +
      '</div>';

    container.innerHTML = swatchesHtml + metaHtml + hexHtml;
  }

  renderPalette('palette-neutral', palettes.neutral);
  renderPalette('palette-hecto-orange', palettes.hectoOrange);
  renderPalette('palette-red', palettes.red);
  renderPalette('palette-green', palettes.green);
  renderPalette('palette-blue', palettes.blue);
  renderPalette('palette-purple', palettes.purple);
  renderPalette('palette-opacity', palettes.opacity);
})();
