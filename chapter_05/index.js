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
            {name: 1},
            {name: 1},
            {name: 1}
        ];

        var resultE = arr6.every(function() {
            
        });

        var resultS = arr6.some(function() {
            
        });

        var resultF = arr6.filter(function() {
            
        });

        var resultFo = arr6.forEach(function() {
            
        });

        var resultM = arr6.map(function() {
            
        });

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

})();