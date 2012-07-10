define([
    "model/Person"
], function (Person) {
    describe("model.Person", function () {
        it("객체가 정상적으로 생성된다.", function () {
            var person = new Person();
            expect(person).toBeDefined();
            expect(person instanceof Person).toBeTruthy();
        });
        describe("getName", function () {
            it("attributes의 name의 값을 반환한다.", function () {
                var name = "John";
                
                var person = new Person({
                    "name": name
                });
                expect(person.getName()).toEqual(name);
            });
        });
        describe("getPart", function () {
            it("attributes의 part의 값을 반환한다.", function () {
                var part = "Dev2";
                
                var person = new Person({
                    "part": part
                });
                expect(person.getPart()).toEqual(part);
            });
        });
    });
});