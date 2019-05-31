(function () {
    // 创建全局变量，浏览器中代表window对象，服务器中代表global对象
    var root = this;

    // 保存Backbone变量被覆盖之前的值
    // 如果出现命名冲突或考虑到规范, 可通过Backbone.noConflict()方法恢复该变量被Backbone占用之前的值, 并返回Backbone对象以便重新命名
    var previousBackbone = root.Backbone;

    // 将Array.prototype中的slice和splice方法缓存到局部变量以供调用
    var slice = Array.prototype.slice;
    var splice = Array.prototype.splice;

    var Backbone;
    if (typeof exports !== undefined) {
        Backbone = exports;
    } else {
        Backbone = root.Backbone = {};
    }

    // 定义Backbone的版本
    Backbone.VERSION = '0.1';

    // 在服务器环境下自动导入Underscore，在Backbone中部分方法依赖或继承自Underscore
    var _ = root._;
    if (!_ && (typeof require !== 'undefined'))
        _ = require('underscore');

    // 定义第三方库为统一的变量“$”，用于在视图(View)，事件处理和与服务器数据同步(sync)时调用库中的方法
    // 支持的库包括jQuery, Zepto等, 它们语法相同, 但Zepto更适用移动开发, 它主要针对Webkit内核浏览器
    // 也可以通过自定义一个与jQuery语法相似的自定义库, 供Backbone使用(有时我们可能需要一个比jQuery, Zepto更轻巧的自定义版本)
    // 这里定义的"$"是局部变量, 因此不会影响在Backbone框架之外第三方库的正常使用
    var $ = root.jQuery || root.Zepto || root.ender;

    // 手动设置第三方库
    // 如果在导入了Backbone之前并没有导入第三方库, 可以通过setDomLibrary方法设置"$"局部变量
    // setDomLibrary方法也常用于在Backbone中动态导入自定义库
    Backbone.setDomLibrary = function (lib) {
        $ = lib;
    };

    // 放弃以"Backbone"命名框架, 并返回Backbone对象, 一般用于避免命名冲突或规范命名方式
    // 例如:
    // var bk = Backbone.noConflict(); // 取消"Backbone"命名, 并将Backbone对象存放于bk变量中
    // console.log(Backbone); // 该变量已经无法再访问Backbone对象, 而恢复为Backbone定义前的值
    // var MyBackbone = bk; // 而bk存储了Backbone对象, 我们将它重命名为MyBackbone
    Backbone.noConflist = function () {
        root.Backbone = previousBackbone;
        return this;
    };

    // 对于不支持REST方式的浏览器, 可以设置Backbone.emulateHTTP = true
    // 与服务器请求将以POST方式发送, 并在数据中加入_method参数标识操作名称, 同时也将发送X-HTTP-Method-Override头信息
    Backbone.emulateHTTP = false;

    // 对于不支持application/json编码的浏览器, 可以设置Backbone.emulateJSON = true;
    // 将请求类型设置为application/x-www-form-urlencoded, 并将数据放置在model参数中实现兼容
    Backbone.emulateJSON = false;

    // Backbone.Events 自定义事件相关
    // -----------------

    // eventSplitter指定处理多个事件时, 事件名称的解析规则
    var evenSplitter = /\s+/;

    // 自定义事件管理器
    // 通过在对象中绑定Events相关方法, 允许向对象添加, 删除和触发自定义事件
    var Events = Backbone.Events = {
        // 将自定义事件(events)和回调函数(callback)绑定到当前对象
        // 回调函数中的上下文对象为指定的context, 如果没有设置context则上下文对象默认为当前绑定事件的对象
        // 该方法类似与DOM Level2中的addEventListener方法
        // events允许指定多个事件名称, 通过空白字符进行分隔(如空格, 制表符等)
        // 当事件名称为"all"时, 在调用trigger方法触发任何事件时, 均会调用"all"事件中绑定的所有回调函数
        on: function (events, callback, context) {
            // 定义一些函数中使用到的局部变量
            var calls, event, node, tail, list;
            // 必须设置callback回调函数
            if (!callback)
                return this;
            // 通过eventSplitter对事件名称进行解析, 使用split将多个事件名拆分为一个数组
            // 一般使用空白字符指定多个事件名称
            events = events.split(evenSplitter);
            // calls记录了当前对象中已绑定的事件与回调函数列表
            calls = this._callbacks || (this._callbacks = {});

            // 循环事件名列表, 从头至尾依次将事件名存放至event变量
            while (event = events.shift()) {
                // 获取已经绑定event事件的回调函数
                // list存储单个事件名中绑定的callback回调函数列表
                // 函数列表并没有通过数组方式存储, 而是通过多个对象的next属性进行依次关联
                /** 数据格式如:
                 * {
                 *     tail: {Object},
                 *     next: {
                 *         callback: {Function},
                 *         context: {Object},
                 *         next: {
                 *             callback: {Function},
                 *             context: {Object},
                 *             next: {Object}
                 *         }
                 *     }
                 * }
                 */
                // 列表每一层next对象存储了一次回调事件相关信息(函数体, 上下文和下一次回调事件)
                // 事件列表最顶层存储了一个tail对象, 它存储了最后一次绑定回调事件的标识(与最后一次回调事件的next指向同一个对象)
                // 通过tail标识, 可以在遍历回调列表时得知已经到达最后一个回调函数
                list = calls[event];
                // node变量用于记录本次回调函数的相关信息
                // tail只存储最后一次绑定回调函数的标识
                // 因此如果之前已经绑定过回调函数, 则将之前的tail指定给node作为一个对象使用, 然后创建一个新的对象标识给tail
                // 这里之所以要将本次回调事件添加到上一次回调的tail对象, 是为了让回调函数列表的对象层次关系按照绑定顺序排列(最新绑定的事件将被放到最底层)
                node = list ? list.tail : {};
                node.next = tail = {};
                // 记录本次回调的函数体及上下文信息
                node.context = context;
                node.callback = callback;
                // 重新组装当前事件的回调列表, 列表中已经加入了本次回调事件
                calls[event] = {
                    tail: tail,
                    next: list ? list.next : node
                };
            }
            // 返回当前对象, 方便进行方法链调用
            return this;
        },

        // 移除对象中已绑定的事件或回调函数, 可以通过events, callback和context对需要删除的事件或回调函数进行过滤
        // - 如果context为空, 则移除所有的callback指定的函数
        // - 如果callback为空, 则移除事件中所有的回调函数
        // - 如果events为空, 但指定了callback或context, 则移除callback或context指定的回调函数(不区分事件名称)
        // - 如果没有传递任何参数, 则移除对象中绑定的所有事件和回调函数
        off: function () {
            var event, calls, node, tail, cb, ctx;

            // No events, or removing *all* events.
            // 当前对象没有绑定任何事件
            if (!(calls = this._callbacks))
                return;
            // 如果没有指定任何参数, 则移除所有事件和回调函数(删除_callbacks属性)
            if (!(events || callback || context)) {
                delete this._callbacks;
                return this;
            }

            // 解析需要移除的事件列表
            // - 如果指定了events, 则按照eventSplitter对事件名进行解析
            // - 如果没有指定events, 则解析已绑定所有事件的名称列表
            events = events ? events.split(eventSplitter) : _.keys(calls);

            // 循环事件名列表
            while (event = events.shift()) {
                // 将当前事件对象从列表中移除, 并缓存到node变量中
                node = calls[event];
                delete calls[event];
                // 如果不存在当前事件对象(或没有指定移除过滤条件, 则认为将移除当前事件及所有回调函数), 则终止此次操作(事件对象在上一步已经移除)
                if (!node || !(callback || context))
                    continue;
                // Create a new list, omitting the indicated callbacks.
                // 根据回调函数或上下文过滤条件, 组装一个新的事件对象并重新绑定
                tail = node.tail;
                // 遍历事件中的所有回调对象
                while ((node = node.text) !== tail) {
                    cb = node.callback;
                    ctx = node.context;
                    // 根据参数中的回调函数和上下文, 对回调函数进行过滤, 将不符合过滤条件的回调函数重新绑定到事件中(因为事件中的所有回调函数在上面已经被移除)
                    if ((callback && cb !== callback) || (context && ctx !== context)) {
                        this.on(event, cb, ctx);
                    }
                }
            }

            return this;
        },

        // 触发已经定义的一个或多个事件, 依次执行绑定的回调函数列表
        trigger: function (events) {
            var event, node, calls, tail, args, all, rest;
            // 当前对象没有绑定任何事件
            if (!(calls = this._callbacks))
                return this;
            // 获取回调函数列表中绑定的"all"事件列表
            all = calls.all;
            // 将需要触发的事件名称, 按照eventSplitter规则解析为一个数组
            events = events.split(eventSplitter);
            // 将trigger从第2个之后的参数, 记录到rest变量, 将依次传递给回调函数
            rest = slice.call(arguments, 1);

            // 循环需要触发的事件列表
            while (event = events.shift()) {
                // 此处的node变量记录了当前事件的所有回调函数列表
                if (node = calls[event]) {
                    // tail变量记录最后一次绑定事件的对象标识
                    tail = node.tail;
                    // node变量的值, 按照事件的绑定顺序, 被依次赋值为绑定的单个回调事件对象
                    // 最后一次绑定的事件next属性, 与tail引用同一个对象, 以此作为是否到达列表末尾的判断依据
                    while ((node = node.next) !== tail) {
                        // 执行所有绑定的事件, 并将调用trigger时的参数传递给回调函数
                        node.callback.apply(node.context || this, rest);
                    }
                }
                // 变量all记录了绑定时的"all"事件, 即在调用任何事件时, "all"事件中的回调函数均会被执行
                // - "all"事件中的回调函数无论绑定顺序如何, 都会在当前事件的回调函数列表全部执行完毕后再依次执行
                // - "all"事件应该在触发普通事件时被自动调用, 如果强制触发"all"事件, 事件中的回调函数将被执行两次
                if (node = all) {
                    tail = node.tail;
                    // 与调用普通事件的回调函数不同之处在于, all事件会将当前调用的事件名作为第一个参数传递给回调函数
                    args = [event].concat(rest);
                    // 遍历并执行"all"事件中的回调函数列表
                    while ((node = node.next) !== tail) {
                        node.callback.apply(node.context || this, args);
                    }
                }
            }

            return this;
        }
    };

    // 绑定事件与释放事件的别名, 也为了同时兼容Backbone以前的版本
    Events.bind = Events.on;
    Events.unbind = Events.off;

    // Backbone.Model 数据对象模型
    // --------------

    // Model是Backbone中所有数据对象模型的基类, 用于创建一个数据模型
    // @param {Object} attributes 指定创建模型时的初始化数据
    // @param {Object} options
    /**
     * @format options
     * {
     *     parse: {Boolean},
     *     collection: {Collection}
     * }
     */



}).call(this);