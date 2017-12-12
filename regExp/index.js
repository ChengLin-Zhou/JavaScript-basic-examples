(function() {
    // 正则表达式

    // 正则方法
    function regFun() {

        var str = "hello cat bat dat";
        var re = /.at/ig;

        console.log(re.test(str));
        console.log(re.exec(str));
        console.log(str.search(re));
        console.log(str.match(re));
        console.log(str.replace(re, 'word')); 

    }

    // 正则分组（）
    function regGroup() {
        var str = '2013-6-7';
        
        var re = /(\d+)(-)/g;

        var result;
        
        result = str.replace(re,function($0,$1,$2,$3){
            //第一个参数：$0（整体）
            //第二个参数 : $1(第一括号里的正则)
            //第三个参数 : $1(第二个括号里的正则)
            
            console.log($0);
            // console.log($1);
            // console.log($2);
            // console.log($3);
            
            //return $1 + '.';
            
            return $0.substring(0,$0.length-1) + '.';
            
        });
        
        console.log( result );   //2013.6.7  
    }

    // regFun();
    regGroup();

})();