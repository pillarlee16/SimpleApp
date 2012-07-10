define([
    "view/DataRecordView"
], function (DataRecordView) {
    describe("view.DataRecordView", function () {
        it("객체가 정상적으로 생성된다.", function () {
            var view = new DataRecordView();
            expect(view).toBeDefined();
            expect(view instanceof DataRecordView).toBeTruthy();
        });
    });
});