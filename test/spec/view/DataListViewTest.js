define([
    "model/Person",
    "collection/PersonList",
    "view/DataListView"
], function (
        Person,
        PersonList,
        DataListView) {
    describe("view.DataListView", function () {
        it("객체가 정상적으로 생성된다.", function () {
            var personList = new PersonList();
            var view = new DataListView({collection: personList});
            expect(view).toBeDefined();
            expect(view instanceof DataListView).toBeTruthy();
        });
        describe("initialize", function () {
            beforeEach(function () {
                sinon.spy(DataListView.prototype, "addRecord");
            });
            it("collection에 add 이벤트가 발생하면 addRecord가 호출된다.", function () {
                var personList = new PersonList();
                var view = new DataListView({collection: personList});
                
                personList.add(new Person());
                expect(view.addRecord).toHaveBeenCalledOnce();
            });
            afterEach(function () {
                DataListView.prototype.addRecord.restore();
            });
        });
        describe("addRecord", function () {
            beforeEach(function () {
                setFixtures("<div id=\"data-list\"></div>");
            });
            
            it("tbody에 tr이 추가된다.", function () {
                var personList = new PersonList();
                var view = new DataListView({collection: personList});
                
                view.render();
                expect($("#data-list tbody tr").length).toEqual(0);
                
                view.addRecord(new Person());
                expect($("#data-list tbody tr").length).toEqual(1);
            });
        });
    });
});