/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

const contractAddress = 'TQasFxgp6JgbHXuUUZzK1cuownzKgkCvno';
const contract = tronWeb.contract().at(contractAddress);

function getWinner() {
  contract.deterWinner();
}

var turnWheel = {
  rewardNames: [],
  //转盘奖品名称数组
  colors: [],
  //转盘奖品区块对应背景颜色
  outsideRadius: 192,
  //转盘外圆的半径
  textRadius: 155,
  //转盘奖品位置距离圆心的距离
  insideRadius: 68,
  //转盘内圆的半径
  startAngle: 0,
  //开始角度
  bRotate: false //false:停止;ture:旋转

};
turnWheel.rewardNames = ["10M虫洞社区", "10M虫洞测试", "50M流量包", "10Q币", "谢谢参与", "5Q币", "10M流量包", "20M流量包"];
turnWheel.colors = ["#FFF4D7", "#FFFFFF", "#F0F4D8", "#FFFFFF", "#FFF4D0", "#FFFFFF", "#FFF4D6", "#FFFFFF"]; // 图片信息

var imgQb = new Image();
imgQb.src = "images/qb.png";
var imgSorry = new Image();
imgSorry.src = "images/2.png";

var rotateFunc = function (item, tip, count) {
  // 应该旋转的角度，旋转插件角度参数是角度制。
  var baseAngle = 360 / count; // 旋转角度 == 270°（当前第一个角度和指针位置的偏移量） - 奖品的位置 * 每块所占的角度 - 每块所占的角度的一半(指针指向区域的中间)

  angles = 360 * 3 / 4 - item * baseAngle - baseAngle / 2; // 因为第一个奖品是从0°开始的，即水平向右方向

  $('#wheelCanvas').stopRotate();
  $('#wheelCanvas').rotate({
    angle: 0,
    animateTo: angles + 360 * 5,
    // 这里多旋转了5圈，圈数越多，转的越快
    duration: 8000,
    callback: function () {
      // 回调方法
      $("#tip").text(tip);
      turnWheel.bRotate = !turnWheel.bRotate;
    }
  });
}; // 抽取按钮按钮点击触发事件


$('.pointer').click(function () {
  // 正在转动，直接返回
  if (turnWheel.bRotate) return;
  turnWheel.bRotate = !turnWheel.bRotate;
  var count = turnWheel.rewardNames.length;
  var item = getWinner(); // 开始抽奖

  rotateFunc(item, turnWheel.rewardNames[item], count);
});
/*
 * 渲染转盘
 * 
 * */

function drawWheelCanvas() {
  var canvas = document.getElementById("wheelCanvas");
  var baseAngle = Math.PI * 2 / turnWheel.rewardNames.length; // 获取上下文

  var ctx = canvas.getContext("2d");
  var canvasW = canvas.width; // 画板的高度

  var canvasH = canvas.height; // 画板的宽度
  //在给定矩形内清空一个矩形

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.strokeStyle = "#FFBE04"; // 红色

  ctx.font = '16px Microsoft YaHei';

  for (var index = 0; index < turnWheel.rewardNames.length; index++) {
    // 当前的角度
    var angle = turnWheel.startAngle + index * baseAngle; // 填充颜色

    ctx.fillStyle = turnWheel.colors[index]; // 开始画内容
    // ---------基本的背景颜色----------

    ctx.beginPath();
    /*
     * 画圆弧，和IOS的Quartz2D类似
     * context.arc(x,y,r,sAngle,eAngle,counterclockwise);
     * x :圆的中心点x
     * y :圆的中心点x
     * sAngle,eAngle :起始角度、结束角度
     * counterclockwise : 绘制方向,可选，False = 顺时针，true = 逆时针
     * */

    ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.outsideRadius, angle, angle + baseAngle, false);
    ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.insideRadius, angle + baseAngle, angle, true);
    ctx.stroke();
    ctx.fill(); //保存画布的状态，和图形上下文栈类似，后面可以Restore还原状态（坐标还原为当前的0，0），

    ctx.save();
    ctx.fillStyle = "#E5302F";
    var rewardName = turnWheel.rewardNames[index];
    var line_height = 17;
    var translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * turnWheel.textRadius;
    var translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * turnWheel.textRadius;
    ctx.translate(translateX, translateY);
    ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);

    if (rewardName.indexOf("M") > 0) {
      //查询是否包含字段 流量包
      var rewardNames = rewardName.split("M");

      for (var j = 0; j < rewardNames.length; j++) {
        ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';

        if (j == 0) {
          ctx.fillText(rewardNames[j] + "M", -ctx.measureText(rewardNames[j] + "M").width / 2, j * line_height);
        } else {
          ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
        }
      }
    } else if (rewardName.indexOf("M") == -1 && rewardName.length > 6) {
      //奖品名称长度超过一定范围
      rewardName = rewardName.substring(0, 6) + "||" + rewardName.substring(6);
      var rewardNames = rewardName.split("||");

      for (var j = 0; j < rewardNames.length; j++) {
        ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
      }
    } else {
      //在画布上绘制填色的文本。文本的默认颜色是黑色
      ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0);
    } //添加对应图标


    if (rewardName.indexOf("Q币") > 0) {
      // 注意，这里要等到img加载完成才能绘制
      imgQb.onload = function () {
        ctx.drawImage(imgQb, -15, 10);
      };

      ctx.drawImage(imgQb, -15, 10);
    } else if (rewardName.indexOf("谢谢参与") >= 0) {
      imgSorry.onload = function () {
        ctx.drawImage(imgSorry, -15, 10);
      };

      ctx.drawImage(imgSorry, -15, 10);
    } //还原画板的状态到上一个save()状态之前


    ctx.restore();
  }
}

window.onload = function () {
  drawWheelCanvas();
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map