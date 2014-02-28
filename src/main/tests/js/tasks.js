describe("MyAPP", function(){

    it("should exist in global Scope", function(){
       expect(MyAPP).to.be.defined;
    });

});

describe("Tasks", function () {
    it('should be able to retreive number of tasks', function () {
        expect(TasksThe.size()).to.equal(0);

    });
    it('Should be able to add a task', function () {

        // GIVEN
        var task = {id:1, title:"Task Title 1"};
        // WHEN
        TasksThe.add(task);
        // THEN
        expect(TasksThe.size()).to.equal(1);

    });

    it('Should not add the same task', function(){
        // GIVEN
        var task = {id:1, title:"Task Title 1"};
        // WHEN
        TasksThe.add(task);
        // THEN
        expect(TasksThe.size()).to.equal(1);
    });
    it('Should auto increment Id if not defined', function(){
        var numbers = TasksThe.size();
        var task = {title:"Task Title 1"};
        // WHEN
        TasksThe.add(task);
        // THEN
        expect(TasksThe.get(numbers+1).id).to.equal(2);
    });
    it('Should be able to retreive task by id', function(){
        // GIVEN
        var num = TasksThe.size() + 1;
        var task = {id:num, title:"TITRE DEDEDE"};
        // WHEN
        TasksThe.add(task);
        // THEN
        expect(TasksThe.get(num).title).to.equal(task.title);
    });

    it('should delete task by id', function(){
        // GIVEN
        var num = TasksThe.size();

        // WHEN
        TasksThe.delete(1);
        // THEN
        expect(TasksThe.size()).to.equal(num-1);
    });

});