define([
    "view/DataInputView"
], function (DataInputView) {
    describe("view.DataInputView", function () {
        it("객체가 정상적으로 생성된다.", function () {
            var view = new DataInputView();
            expect(view).toBeDefined();
            expect(view instanceof DataInputView).toBeTruthy();
        });
    });
});