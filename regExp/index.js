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

    // []一组类似元素 代表一个值
    function regLike() {
        var str = 'abc';
        
        var re = /a[bde]c/;    //字符类中的是“或”的关系 但是整体的位数要和字符串的一致
        
        console.log( re.test(str) );  //true
    }

    // ^ 放在开始处[]外边代表以什么开始，放在[]里边代表排除
    function regExclude() {
        var str = 'a0c';
        
        var re = /a[^bde]c/;        //取反 
        
        console.log( re.test(str) );   //false
    }

    // 找出字符串中最多的字符和个数
    function regSearchStrMost() {
        var str = 'assssjdssskssalsssdkjsssdss';
    
        var arr = str.split('');
        str = arr.sort().join('');
        
        var value = '';
        var index = 0;
        
        var re = /(\w)\1+/g;
        
        str.replace(re,function($0,$1){
            
            //alert($0);
            
            if(index<$0.length){
                index = $0.length;
                value = $1;
            }
            
        });
        
        console.log('最多的字符:'+value+',重复的次数:'+index);
    }

    // 量词：出现的次数，常用的量词
    function regClassifier() {
        // {n,}  至少n次
        // *     任意次 {0,}
        // ？    零次或一次   {0,1}
        // +     一次或任意次{1,}
        // {n}   正好n次

        var str1 = "hello word hahahaha cat bat dat";
        var re1 = /(ha){2,}/ig;
        var re2 = /(cat)*/ig;
        var re3 = /(ha)?/ig;
        var re4 = /(ha)+/ig;
        var re5 = /(ha){5}/ig;
        console.log(re1.test(str1));
        console.log('re2: ' + re2.test(str1));
        console.log('re3: ' + re3.test(str1));
        console.log('re4: ' + re4.test(str1));
        console.log('re5: ' + re5.test(str1));

    }

    // 去掉前后空格：^开始  $结束
    function regStartEnd() {
        var str2 = "hello";
        var str3 = ' hello ';
            
        var re6 = /^\s+|\s+$/g;
        var re7 = /^h(\w)+o$/ig;
            
        var result = str3.replace(re6,'');

        if(result !== str3) {
            console.log('('+str3.trim()+')');
        }
        console.log('regStartEnd: ' + re7.test(str2));
    }

    // 常用的正则例子（高级表单验证）
    function regRoutineCheck() {
        // 匹配中文：[\u4e00-\u9fa5]
        // 行首行尾空格：^\s*|\s*$
        // Email：^\w+@[a-z0-9]+(\.[a-z]+){1,3}$
        // 网址：[a-zA-z]+://[^\s]*
        // QQ号：[1-9][0-9]{4,9}
        // 邮政编码：[1-9]\d{5}
        // 身份证：[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x
        var str4 = "372321199212123550";
        var re8 = /[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x/ig;
        console.log('reg8: ' + re8.test(str4));
        
    }

    regFun();
    regGroup();
    regLike();
    regExclude();
    regSearchStrMost();
    regClassifier();
    regClassifier();
    regStartEnd();
    regRoutineCheck();

})();