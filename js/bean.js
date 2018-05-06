/*使用本地存储localstorage，以JSON格式存储数据
* 数据设计：
* CateList 分类列表
*   --- cateName      列表名
*   --- cateChildList 子列表
*   --- TaskList      任务列表
*   --- numOfDoneTask 已完成任务数量
*   --- numOfUndoneTask 未完成任务数量
* TaskItem 任务详细单元
*   --- taskTitle 任务标题
*   --- taskInfo  任务信息
*       --- createDate    创建日期
*       --- doneDate 完成日期
*   --- taskContent  任务内容
*   --- taskStatus   任务状态（完成，未完成）
*   --- cateBelong   所属列表
* */
(function (object) {
    var status_enum = {
        Done: 1,
        Undone: 2,
        Editing: 3
    };
    var TaskItem = function (title, info, content, cate) {
        this.taskTitle = title; //进行重名检测
        this.taskInfo = !!info ? info : {
            createDate: new Date(), //注意解释JSON字符串时需要用解释函数格式化时间
            doneDate: "Never"
        };
        this.taskContent = !!content ? content : "No Content Yet.";
        this.taskStatus = status_enum.Undone;
        this.cateBelong = cate
    };
    TaskItem.prototype.setDone = function () {
        this.taskStatus = status_enum.Done;
    };

    var CateList = function (cateName) {
        this.cateName = cateName; //进行重名检测
        this.cateChildList = [];
        this.taskList = {};
        this.numOfDoneTask = 0;
        this.numOfUndoneTask = 0;
    };
    CateList.prototype.addChildCateList = function (cateList) {
        var cates = this.cateChildList;
        if(CateList.isPrototypeOf(cateList)) {
            //检测是否已经有同名列表（同一级）
            var index = 0;
            for(; index < cates.length; index++) {
                if(cates[index].cateName === cateList.cateName) {
                    return -1;
                }
            }
            this.cateChildList.push(cateList);
            return cates.length;
        }
    };
    CateList.prototype.getCateChildListLength = function () {
        return this.cateChildList.length;
    };
    CateList.prototype.getTaskListLength = function () {
        return this.taskList.length;
    };
    CateList.prototype.addTaskItem = function (taskItem) {
        if(!TaskItem.isPrototypeOf(taskItem)) {
            //检测是否已经有同名任务（同一级）
            var tasks = this.taskList;
            if(!tasks.hasOwnProperty(taskItem.taskTitle)){
                tasks[taskItem.taskTitle] = taskItem;
            }
        }
    };
    CateList.prototype.removeTaskItem = function (taskName) {
        var len = this.taskList.length;
        var child = this.taskList;
        if(!!taskName && len > 0) {
            var index = 0;
            for(; index < len; index++) {
                if(child[index].taskTitle === taskName) {
                    return child.slice(index, 1);
                }
            }
        }
        return null;
    };
    CateList.prototype.removeCateChild = function (cateName) {
        var len = this.cateChildList.length;
        var child = this.cateChildList;
        if(!!cateName && len > 0) {
            var index = 0;
            for(; index < len; index++) {
                if(child[index].cateName === cateName) {
                    return child.slice(index, 1);
                }
            }
        }
        return null;
    };

    object.Bean = {
        CateList: CateList,
        TaskItem: TaskItem
    };
})(window);
