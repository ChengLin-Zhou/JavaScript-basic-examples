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

    // var resultA = typeOfFun(paramA);
    try {
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