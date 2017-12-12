(function () {

    // 数组方法 判断是不是数组
    var arr = [1,2,3,4];
    function isArrayFun(isArr) {
        if (Array.isArray(isArr)) {
            console.log('isArr是数组');
        } else {
            console.log('isArr不是数组');
        }
    }

    // 所有对象都有toString(),valueOf()和toLocaleString()方法
    function transform(obj) {
        console.log('利用toString转换结果:' + obj.toString());
        console.log('利用valueOf转换结果:' + obj.valueOf());
        console.log('利用toLocaleString转换结果:' + obj.toLocaleString());
    }
    
    // join方法 数组转字符串
    function toChar(arrName) {
        // 第一种判断
        var date1 = new Date();
        if ((typeof arrName) === 'object' && arrName instanceof Array) {
            console.log(arrName.join('-'));
        } else {
            console.log('请输入一个数组');
        }

        // 第二种判断
        if (Array.isArray(arrName)) {
            console.log(arrName.join('-'));
        } else {
            console.log('请输入一个数组');
        }
    }

    // push pop shift unshift 栈和队列
    function arrFun() {
        var arr1 = [1,2,3];
        //栈方法
        arr1.push(2);   // 可添加一个值或多个值 值可以是任何类型
        arr1.pop();     // 只能删除一个值

        //队列方法
        arr1.push(2);
        arr1.shift();   // 只能删除一个值 从数组开始位置

        //反方向模拟栈
        arr1.unshift(2); // 可添加一个值或多个值 值可以是任何类型
        arr1.shift();

        //反方向模拟队列
        arr1.unshift(2); 
        arr1.pop();
    }

    // 重排序之反转数组
    function reverseFun() {
        var arr2 = [1,2,3];
        arr2.reverse();
        console.log(arr2);
    }

    // 重排序sort方法
    function sortFun() {
        var arr3 = [20,3,5,1,9,7];
        var obj1 = [
            {name: 2},
            {name: 10},
            {name: 7},
            {name: 5}
        ];

        // 升序排序规则
        function upFun(num1, num2){return num2-num1}
        arr3.sort(upFun);
        console.log(arr3);

        // 降序排序规则
        function downFun(num1, num2){return num1-num2}
        arr3.sort(downFun);
        console.log(arr3);

        // 对象根据key值进行升序排列
        function upObj(objA, objB) {
            var key1 = objA.name;
            var key2 = objB.name;
            return key1 - key2;
        }

        obj1.sort(upObj);
        console.log(obj1);

        // 对象根据key值进行降序排列
        function downObj() {}

    }

    // concat slice splice数组操作方法
    function operatorFun() {
        var arr4 = [1,2,3];
        arr4 = arr4.concat(9,8,7);
        arr4 = arr4.concat([0,5]);    //可添加任意个类型的参数
        console.log(arr4);
        var newArr1 = arr4.slice(1);
        var newArr2 = arr4.slice(1,3);
        var newArr3 = arr4.slice(1,-2);
        var newArr4 = arr4.slice(-4,-1);
        console.log(newArr1);
        console.log(newArr2);
        console.log(newArr3);
        console.log(newArr4);
        console.log(arr4.splice(1,3));    //两个参数 删除位置及个数
        console.log(arr4);
        console.log(arr4.splice(1,0,2,5)); // 三个参数 中间参数为0 第一个起始位置 第二个之后是插入的内容项
        console.log(arr4);
        console.log(arr4.splice(1,2,5,5));  // 替换  第二个参数为替换几个 之后为替换的内容项
        console.log(arr4);

    }

    // 查找indexOf和lastIndexOf   都可以接受两个参数要查找的项和开始的索引
    function searchFun() {
        var arr5 = [1,2,3,'r'];
        console.log('indexOf: ' + arr5.indexOf(1));
        console.log('lastIndexOf: ' + arr5.lastIndexOf(1));
    }

    //数组迭代every\some\filter\foreach\map
    function arrLoop() {
        var arr6 = [
            {name: 1},
            {name: 2},
            {name: 3},
            {name: 4}
        ];

        var resultE = arr6.every(function(indexE) {    // 返回值都为true才返回true
            console.log(indexE);
            // return 0;
        });

        var resultS = arr6.some(function(indexS) {     // 返回值任意值为true返回true
            return indexS;
        });

        var resultF = arr6.filter(function(indexF) {    // 返回符合条件的值
            return indexF;
        });

        var resultFo = arr6.forEach(function(indexFo) { // 没有返回值
            return indexFo;
        });

        var resultM = arr6.map(function(indexM) {       // 返回处理后的结果
            return indexM > 1;
        });

        console.log(resultE);
        console.log(resultS);
        console.log(resultF);
        console.log(resultFo);
        console.log(resultM);

    }

    //reduce和reduceRight归并方法
    function mergeFun() {
        var arr7 = [1,2,3,4,5];
        var resultAll = arr7.reduce(function(prev,cur,index,array0){
            return prev + cur;
        });

        var resultAll1 = arr7.reduceRight(function(prev1,cur1,index1,array1){
            return prev1 + cur1;
        });

        console.log(resultAll);
        console.log(resultAll1);

    }

    // 正则表达式及匹配方法
    function regFun() {
        // exec()及test()
        var reg = /.at/ig;
        var str = "this is a string bat cat dat";
        var resultT = reg.test(str);
        var resultE = reg.exec(str);
        console.log(resultT);
        console.log(resultE);
        console.log(reg.lastIndex);
    }

    // 函数callee\caller\this\prototype\call\apply\bind
    function fun1(num) {
        if (num <= 1) {
            return num;
        } else {
            // return num * fun1(num - 1);
            return num * arguments.callee(num -1); //保存着当前函数的指针
        }
    }

    function fun2() {
        console.log(arguments.callee.caller); //保存着调用该函数的函数的指针
    }

    function fun3() {
        fun2();
    }

    var name = "ddddddddd";
    var objG = {
        name: "hhhhhhhhh",
        getName: function () {
            console.log(name);
        }
    }

    function fun4() {
        console.log(this.name);
    }

    var sumAll = fun1(3);

    // toFixed\toExponential\toPrecision   指定位数小数\科学计数法\指定的合适格式
    function toNumberFun() {
        var num1 = 25.55455;
        var num2 = 1000;
        var num3 = 99;
        console.log(num1.toFixed(2));
        console.log(num2.toExponential());
        console.log(num3.toPrecision(2));
        console.log(num3.toExponential());
        console.log(num3.toPrecision(1));
    }

    // charAt()获得字符   charCodeAt()获得字符编码   fromCharCode()
    function charFun() {
        var str = "hello world!";
        console.log(str.charAt(0));
        console.log(str.charCodeAt(0));
        console.log(String.fromCharCode(104));
    }

    // 字符串操作方法  concat()  slice()  substr()  substring()
    function strFun() {
        var str1 = "hello";
        console.log(str1.concat(1234));
        console.log("slice: " + str1.slice(1,));               
        console.log("substr: " + str1.substr(1,));
        console.log("substring: " + str1.substring(1,));

        console.log("slice: " + str1.slice(1,3));              // 不包含
        console.log("substr: " + str1.substr(1,3));            // 包含第二个参数位置的值
        console.log("substring: " + str1.substring(1,3));      // 不包含

        console.log("slice: " + str1.slice(1,-1));             // 负数从后往前从-1开始 不包含后值
        console.log("substr: " + str1.substr(2,-1));           // 不支持负数参数
        console.log("substring: " + str1.substring(2,-2));     // 如果第二个参数是负数 则起始位置是0 第一个参数是结束位置

        console.log("slice: " + str1.slice(-4,-1));
        console.log("substr: " + str1.substr(-4,-1));
        console.log("substring: " + str1.substring(-4,-1));
    }

    // 字符串位置方法  indexOf()   lastIndexOf()
    function strIndex() {
        var str2 = "hello";
        console.log(str2.indexOf('h'));
        console.log(str2.lastIndexOf('h'));
    }

    // 字符串trim()    toLowerCase()  toUpperCase()
    function toChange() {
        var str3 = " hEllo";
        console.log(str3.trim());
        console.log(str3.toLocaleLowerCase());
        console.log(str3.toLocaleUpperCase());
    }

    // 字符串模式匹配方法match()、exec()、search()、replace()、htmlEscape()、split()、localeCompare()、html方法
    function strPartern() {
        var str4 = "hello cat bat dat";
        console.log(str4.match('cat'));     // 接受一个参数正则，返回一个数组
        console.log(str4.search('cat'));
        console.log(str4.replace('cat', 'hhh'));
        console.log(str4.localeCompare('blue'));
    }

    // URI:  encodeURI()   encodeURIComponent()   decodeURI()   decodeURIComponent()
    function toUri() {
        var url = "http://www.bai.com?name=zcl";
        var urlTo = encodeURIComponent(url);
        var urlTo1 = decodeURIComponent(url);
        console.log(encodeURIComponent(url));        // 编译不符合uri规则的特殊字符
        console.log(decodeURIComponent(urlTo));      // 编译不符合uri规则的特殊字符
        console.log(encodeURI(url));                 // 反编译被处理过的不符合uri规则的uri地址
        console.log(decodeURI(urlTo1));              // 反编译被处理过的不符合uri规则的uri地址
    } 

    //Math对象及方法min()  max()  舍入方法 round()  ceil() floor()   random()随机数
    function mathFun() {
        var randomNum = Math.floor(Math.random()*12 + 1);
        console.log(randomNum);
        var timeoutF = setTimeout(loggerFun,2000);   // 返回调用id
        console.log(timeoutF);
        function loggerFun() {
            console.log('hhhhhh');
        }
    }

    isArrayFun(arr);
    transform({name: 23});
    transform([1,2,3]);
    transform(23);
    toChar(arr);
    reverseFun();
    sortFun();
    operatorFun();
    searchFun();
    arrLoop();
    mergeFun();
    regFun();
    console.log(sumAll);
    fun3();
    fun4.apply(objG);   // 第一个参数是调用环境，第二个参数是参数数组
    fun4.call(objG);    // 第一个参数是调用环境，之后的参数是函数所需参数
    objG.getName();
    toNumberFun();
    charFun();
    strFun();
    strIndex();
    toChange();
    strPartern();
    toUri();
    mathFun();

})();