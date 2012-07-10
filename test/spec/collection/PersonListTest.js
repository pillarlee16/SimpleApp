define([
    "collection/PersonList"
], function (PersonList) {
    describe("collection.PersonList", function () {
        it("객체가 정상적으로 생성된다.", function () {
            var personList = new PersonList();
            expect(personList).toBeDefined();
            expect(personList instanceof PersonList).toBeTruthy();
        });
    });
});