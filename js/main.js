/* 1.初始进入选择默认分类的第一个任务；
*  2.选择分类后，按‘新建任务’按钮将添加任务至指定分类；
*  3.初始未选择分类（所有分类都被折叠时），按’新建任务‘按钮默认添加至‘默认分类’；
*  4.同理，初始未选择分类，按‘新建分类’按钮将在第一级分类列表末尾添加分类；
* */
(function (object) {
    var CateList = object.Bean.CateList;
    var TaskItem = object.Bean.TaskItem;
    var Store = object.Store;
    var DEFAULT_CATE = new CateList("默认分类"); //默认分类

    var cate_test = new CateList("cateTest");
    var cate_test_2 = new CateList("cateTest_2");
    cate_test_2.addTaskItem(new TaskItem("testTask", null, "helloWorld", DEFAULT_CATE));
    // Store.set("test", JSON.stringify(cate_test));
    Store.set("test_2", JSON.stringify(cate_test_2));
    console.log(Store.get("test_2"));
    console.log(Store.get("test_2", function (key, value) {
        if(key === 'createDate'){
            return new Date(value);
        } else {
            return value;
        }
    }));
})(window);
