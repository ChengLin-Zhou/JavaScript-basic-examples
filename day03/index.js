(function (){
    var paramA = 23;
    var paramB = 'zcl';
    var paramC = true;
    var paramD = null;
    var paramE;

    // typeo判断类型 不能判读具体的引用类型
    function typeOfFun(params) {
        return typeof params;
    }

    // isFinite判断
    function isFiniteFun(isFparam) {
        return isFinite(isFparam);
    }

    // 数值最大值
    function maxMinNumber(numberValue) {
        if (numberValue === 'min') {
            return Number.MIN_VALUE;
        } else if(numberValue === 'max') {
            return Number.MAX_VALUE;
        } else {
            console.log('请输入正确的值');
        }
    }

    // isNaN判断
    function isNanFun(isNumber) {
        if (isNaN(isNumber)) {
            console.log('这不是一个数值');
        } else {
            console.log('这是一个数值');
        }
    }

    // 数值转换
    function toNumber(valueName) {
        console.log(Number(valueName));
    }

    function toParseInt(valuename1) {
        console.log(parseInt(valuename1));
    }

    function toParseFloat(valuename2) {
        console.log(parseFloat(valuename2));
    }

    // 转换字符串
    function toStr(stringName) {
        console.log(stringName.toString(2));
        console.log(String(stringName));
    }

    // 左移右移 位操作符
    function operator(valueOpt, digit) {
        console.log('左移:' + (valueOpt << digit));
        console.log('右移:' + (valueOpt >> digit));
        console.log('无符号右移' + (valueOpt >>> digit));
        console.log('按位与&:' + (valueOpt & digit));
        console.log('按位或|:' + (valueOpt | digit));
        console.log('按位异或^:' + (valueOpt ^ digit));
        console.log('按位非~:' + ~valueOpt);
    }

    // label break continue的使用
    function loop() {
        var outer = 0;
        var inside = 0;
        start: for(var i = 0; i < 5; i++ ) {
            outer += 1;
            for(var j = 0; j < 5; j++) {
                if(j === 3) {
                    // continue;    // 缺少每当j = 3的时候跳过的五个值
                    // break;          // 缺少j = 3时候后边的两个值共十个值
                    // continue start;    // 缺少十个值
                     break start;        // outer = 1 ; inside = 3;
                }
                inside += 1;
            }
        }
        console.log(outer);
        console.log(inside);
    }

    // arguments 与 仿函数重载
    function funReload() {
        console.log(arguments);
        console.log(arguments.callee);
        if (arguments.length === 0) {
            console.log('没有参数传递');
        } else if(arguments.length === 1) {
            console.log('参数的值:' + arguments[0]);
        } else {
            console.log('两个参数的值是:' + arguments[0] + arguments[1]);
        }
    }

    // 结合typeof和instanceof判断传入的值的具体类型
    function valueType(theValue) {
        if (typeof theValue === 'number') {
            console.log('theValue的类型是：number');
        } else if (typeof theValue === 'string') {
            console.log('theValue的类型是：string');
        } else if (typeof theValue === 'undefined') {
            console.log('theValue的类型是：undefined');
        } else if (typeof theValue === 'boolean') {
            console.log('theValue的类型是：boolean');
        } else if (typeof theValue === 'function') {
            console.log('theValue的类型是：function');
        } else if (typeof theValue === 'object') {
            if (theValue instanceof Array) {
                console.log('theValue的类型是：Array');
            } else if (theValue instanceof Date) {
                console.log('theValue的类型是：Date');
            } else if (theValue instanceof Object) {
                console.log('theValue的类型是：Object');
            } else if (theValue instanceof RegExp) {
                console.log('theValue的类型是：RegExp');
            } else {
                console.log('theValue的类型是：null');
            }
        }
    }

    function A() {
        console.log(arguments);
        B();
    }

    function B() {
        console.log(arguments.callee.caller); // 保存着执行该函数的函数的指针
    }

    // var resultA = typeOfFun(paramA);
    try {
        A();
        valueType(null);
        funReload();
        funReload(10);
        funReload(10,20);
        loop();
        operator(4, 2);
        toStr(24);
        toNumber({name: 12});
        toParseInt({name: 12});
        toParseFloat({name: 12});
        console.log(+{name: 12});
        console.log(typeOfFun(paramA));
        console.log(typeOfFun(paramB));
        console.log(typeOfFun(paramC));
        console.log(typeOfFun(paramD));
        console.log(typeOfFun(paramE));
        console.log(isFiniteFun(paramA));
        console.log(typeOfFun(paramf));
    }catch(e){
        console.log(111);
    }finally{
        console.log(222);
    }
})();