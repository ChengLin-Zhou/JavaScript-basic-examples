(function() {
    // 正则表达式
    // g  表示全局模式,即模式将被应用到所有字符串，而非在发现第一个匹配项时立即停止。

    // i  表示不区分大小写模式。

    // m  表示多行模式，即在到达一行文本末尾时还在继续查找下一行中是否存在于模式匹配的项。

    // 正则方法
    function regFun() {

        var str = "hello cat bat dat";
        var re = /.at/ig;

        var strM = "mom and dad and baby";
        var reM = /mom( and dad( and baby)?)?/ig;    // 捕获组

        console.log(re.test(str));
        console.log(re.exec(str));
        console.log(str.search(re));
        console.log(str.match(re));
        console.log(str.replace(re, 'word'));
        console.log(reM.exec(strM));

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

        console.log( result );   // 2013.6.7
    }

    // []一组类似元素 代表一个值
    function regLike() {
        var str = 'abc';

        var re = /a[bde]c/;    //字符类中的是“或”的关系 但是整体的位数要和字符串的一致

        console.log( re.test(str) );  //true
    }

    // ^ 放在开始处[]外边代表以什么开始，放在[]里边代表排除，如果设置了 RegExp 对象的 Multiline 属性，^ 也匹配 'n' 或 'r' 之后的位置
    function regExclude() {
        var str = 'a0c';

        var re = /a[^bde]c/;        // 取 反

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
        // *     任意次 {0,}，例如，'zo*' 能匹配 "z" 以及 "zoo"。 等价于{0,}
        // ？    零次或一次   {0,1},例如，"do(es)?" 可以匹配 "do" 或 "does" 中的"do" 。? 等价于 {0,1}
        // +     一次或任意次{1,}，例如，'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,}
        // {n}   正好n次
        // ?     该字符跟在任何一个其他限制符 (*, +, ?, {n}, {n,}, {n,m}) 后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串 "oooo"，'o+?' 将匹配单个 "o"，而 'o+' 将匹配所有 'o'
        // ·     匹配除 "n" 之外的任何单个字符。要匹配包括 'n' 在内的任何字符，请使用象 '[.n]' 的模式
        // (?:pattern)  匹配pattern但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用 "或" 字符 (|) 来组合一个模式的各个部分是很有用。例如， 'industr(?:y|ies) 就是一个比 'industry|industries' 更简略的表达式
        // (?=pattern)  正向预查，在任何匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如，'Windows (?=95|98|NT|2000)' 能匹配 "Windows 2000" 中的 "Windows" ，但不能匹配 "Windows 3.1" 中的 "Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始
        // (?!pattern)  负向预查，在任何不匹配 pattern 的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如'Windows (?!95|98|NT|2000)' 能匹配 "Windows 3.1" 中的 "Windows"，但不能匹配 "Windows 2000" 中的 "Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始
        // x|y  匹配 x 或 y。例如，'z|food' 能匹配 "z" 或 "food"。'(z|f)ood' 则匹配 "zood" 或 "food"
        // [xyz]  字符集合。匹配所包含的任意一个字符。例如， '[abc]' 可以匹配 "plain" 中的 'a'
        // [^xyz]  负值字符集合。匹配未包含的任意字符。例如， '1' 可以匹配 "plain" 中的'p'
        // [a-z]  字符范围。匹配指定范围内的任意字符。例如，'[a-z]' 可以匹配 'a' 到 'z' 范围内的任意小写字母字符
        // [^a-z]  负值字符范围。匹配任何不在指定范围内的任意字符。例如，'2' 可以匹配任何不在 'a' 到 'z' 范围内的任意字符
        // \b  匹配一个单词边界，也就是指单词和空格间的位置。例如， 'erb' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'
        // .\B  匹配非单词边界。'erB' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'
        // \cx  匹配由 x 指明的控制字符。例如， cM 匹配一个 Control-M 或回车符。x 的值必须为 A-Z 或 a-z 之一。否则，将 c 视为一个原义的 'c' 字符
        // \d  匹配一个数字字符。等价于 [0-9]
        // \D  匹配一个非数字字符。等价于 3
        // \f  匹配一个换页符。等价于 x0c 和 cL
        // \n  匹配一个换行符。等价于 x0a 和 cJ
        // \r  匹配一个回车符。等价于 x0d 和 cM
        // \s  匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ fnrtv]
        // \S  匹配任何非空白字符。等价于 4
        // \t  匹配一个制表符。等价于 x09 和 cI
        // \v  匹配一个垂直制表符。等价于 x0b 和 cK
        // \w  匹配包括下划线的任何单词字符。等价于'[A-Za-z0-9_]'
        // \W  匹配任何非单词字符。等价于 '5'
        // \xn  匹配 n，其中 n 为十六进制转义值。十六进制转义值必须为确定的两个数字长。例如，'x41' 匹配 "A"。'x041' 则等价于 'x04' & "1"。正则表达式中可以使用 ASCII 编码
        // \num  匹配 num，其中 num 是一个正整数。对所获取的匹配的引用。例如，'(.)1' 匹配两个连续的相同字符
        // \n  标识一个八进制转义值或一个向后引用。如果 n 之前至少 n 个获取的子表达式，则 n 为向后引用。否则，如果 n 为八进制数字 (0-7)，则 n 为一个八进制转义值
        // \nm  标识一个八进制转义值或一个向后引用。如果 nm 之前至少有 nm 个获得子表达式，则 nm 为向后引用。如果 nm 之前至少有 n 个获取，则 n 为一个后跟文字 m 的向后引用。如果前面的条件都不满足，若 n 和 m 均为八进制数字 (0-7)，则 nm 将匹配八进制转义值 nm
        // \nml  如果 n 为八进制数字 (0-3)，且 m 和 l 均为八进制数字 (0-7)，则匹配八进制转义值 nml

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


    // 实例练习
    function regExamples() {
        // 匹配第一个bat或者cat，不区分大小写
        var reg = /[bc]at/ig;

        // 匹配所有以at结尾的三个字符组合
        var reg1 = /.at$/g;

        // 只能输入数字
        var reg2 = /^[0-9]*$/g;

        // 只能输入n位的数字
        var reg3 = /^\d{n}$/g;
        
        // 只能输入至少n位的数字
        var reg4 = /^\d{n,}$/g;

        // 只能输入m到n位的数字
        var reg5 = /^\d{m,n}$/g;

        // 只能输入零和非零开头的数字
        var reg6 = /^(0|[1-9][0-9]*)$/g;

        // 只能输入有两位小数的正实数
        var reg7 = /^(0|[1-9][0-9]*)(.[0-9]{2})?$/g;

        // 验证用户密码：以字母开头，长度在6~18之间，只能包含字符、数字和下划线
        var reg8 = /[a-zA-Z]\w{5,17}/g;

        // 验证是否含有^%&',;=?$"等字符
        var reg9 = /[\^%&',;=\?\$\x22]+/g; 

        // 验证Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
        var reg10 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g; 

        // 匹配1-58之间的数字
        var reg11 = /^([1-9]|[1-5][0-8])$/g;

        // 匹配 -90至90之间的整数（包括-90和90）
        var reg12 = /d/g;
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
    console.log('reg7: ' + /^(0|[1-9][0-9]*)(\.[0-9]{2})?$/.test('0.52'));


})();

// 常用实例
// 匹配第一个bat或者cat,不区分大小写： /[bc]at/i 或者 new RegExp("[bc]at","i");

// 匹配所有以"at"结尾的3个字符组合，不区分大小写：/.at/gi;

// 只能输入数字：^[0-9]*$;

// 只能输入n位的数字：^\d{n}$

// 只能输入至少n位的数字：^\d{n,}$

// 只能输入m~n位的数字：^\d{m,n}$

// 只能输入零和非零开头的数字：^(0|[1-9][0-9]*)$      

// 只能输入有两位小数的正实数：^[0-9]+(.[0-9]{2})?$   

// 只能输入有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$    

// 只能输入非零的正整数：^\+?[1-9][0-9]*$

// 只能输入长度为3的字符：^.{3}$    

// 只能输入由26个英文字母组成的字符串：^[A-Za-z]+$

// 只能输入由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$

// 只能输入由数字、26个英文字母或者下划线组成的字符串：^\w+$    

// 验证用户密码：以字母开头，长度在6~18之间，只能包含字符、数字和下划线：^[a-zA-Z]\w{5,17}$    

// 验证是否含有^%&',;=?$"等字符：[^%&',;=?$\x22]+          

// 只能输入汉字：^[\u4e00-\u9fa5]{0,}$         

// 验证Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$      

// 验证InternetURL：^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$

// 验证身份证号（15位或18位数字）：^\d{15}|\d{18}$        

// 验证IP地址：^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$

// 匹配两个两个重叠出现的字符 例如，"aabbc11asd"， 返回结果为aa bb 11三组match：(\w)\1

// 匹配成对的HTML标签：<(?<tag>[^\s>]+)[^>]*>.*</\k<tag>>           

// 匹配1-58之间的数字：/^([1-9]|[1-5][0-8])$/

// 匹配 -90至90之间的整数（包括-90和90）：^(-?[1-8][0-9]|-?[1-9]|-?90|0)$         ///////

// 匹配收尾空白字符：^\s+|\s+$

// 中文，全角，半角匹配：

//  str="中文;；ａ"    
//   alert(str.match(/[\u0000-\u00ff]/g))     //半角  
//   alert(str.match(/[\u4e00-\u9fa5]/g))     //中文  
//   alert(str.match(/[\uff00-\uffff]/g))     //全角
// 找重复项最多的字符个数：

// var str = 'assssjdssskssalsssdkjsssdss';

// var arr = str.split(''); //把字符串转换为数组
// str = arr.sort().join(''); //首先进行排序，这样结果会把相同的字符放在一起，然后再转换为字符串
// //alert(str);  // aaddjjkklsssssssssssssssss

//  var value = '';
//  var index = 0; 
// var re = /(\w)\1+/g;  //匹配字符，且重复这个字符，重复次数至少一次。
// str.replace(re,function($0,$1){ 
//    //alert($0);   代表每次匹配成功的结果 : aa dd jj kk l sssssssssssssssss
//      //alert($1);  代表每次匹配成功的第一个子项，也就是\w:  a d j k l S 
// 　　
//     if(index<$0.length){  //如果index保存的值小于$0的长度就进行下面的操作
//           index = $0.length;  // 这样index一直保存的就在最大的长度
//            value = $1;  //value保存的是出现最多的这个字符
//     }

// }); 

// alert('最多的字符:'+value+',重复的次数:'+index);  // s   17

// 判断是不是QQ号：
// //^ : 放在正则的最开始位置，就代表起始的意思，注意  /[^a] /   和   /^[a]/是不一样的，前者是排除的意思，后者是代表首位。
// //$ : 正则的最后位置 , 就代表结束的意思

 
// //首先想QQ号的规则 
//       1 首位不能是0 
//       2 必须是 5-12位的数字
   
//     var aInput = document.getElementsByTagName('input');
//     var re = /^[1-9]\d{4,11}$/;
//     //123456abc为了防止出现这样的情况，所以必须限制最后
//     //首位是0-9，接着是4-11位的数字类型。
// aInput[1].onclick = function(){
//     if( re.test(aInput[0].value) ){
//         alert('是QQ号');
//     }else{
//         alert('不是QQ号');
//     }

// };
 

// 去掉前后空格（面试题经常出现）：
// var str = '  hello  ';
// alert( '('+trim(str)+')' );//为了看出区别所以加的括号。 (hello)
// function trim(str){
//    var re = /^\s+|\s+$/g; // |代表或者   \s代表空格  +至少一个    前面有至少一个空格 或者后面有至少一个空格 且全局匹配
//   return str.replace(re,''); //把空格替换成空
// }

// 常用的一些表单校验：
// 匹配中文：[\u4e00-\u9fa5] //中文ACALL码的范围
// 行首行尾空格：^\s*|\s*$ //首行出现任意个空格或者尾行出现任意个空格（任意表示也可以没有空格）

// Email：^\w+@[a-z0-9]+(\.[a-z]+){1,3}$  
//       //起始至少为一个字符(\w字母，数字或者下划线)，然后匹配@,接着为任意个字母或者数字，\.代表真正的点，.后面为至少一个的字符（a-z）,同时这个(比如.com)整体为一个子项作为结束，可以出现1-3次。因为有的邮箱是这样的.cn.net。（xxxx.@qq.com xxxx.@163.com xxxx.@16.cn.net ）

// 网址：[a-zA-z]+://[^\s]*   http://......
//   //匹配不分大小写的任意字母，接着是//,后面是非空格的任意字符

// 邮政编码：[1-9]\d{5}  //起始数字不能为0，然后是5个数字