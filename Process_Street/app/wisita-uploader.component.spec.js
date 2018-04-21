describe('Wistia Uploader App', function () {

    var controller, element, scope;

    beforeEach(function () {
        module("uploaderApp")
    });

    it("file selector exists", function () {
        expect(document.getElementById("fileSelect")).toBeDefined();
    });


    describe('Controller', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('UploadController', {
                '$scope': scope
            });
        }));

        it("should be defined", function () {
            expect(controller).toBeDefined();
        });

        it("scope parameters should be set", function () {
            expect(scope.successfulFiles).toEqual([]);
            expect(scope.options).toBeDefined();
        });

        it("update successful files array works", function () {
            expect(scope.successfulFiles.length).toEqual(0);
            scope.options.success({status: "queued", name: "Jonah"});
            expect(scope.successfulFiles.length).toEqual(1);
        });

        it("succesfully create embedded wistia player", function() {
            scope.options.success({status: "queued"});
            expect(document.getElementById("embeddedWistiaPlayer")).toBeDefined();
        });

        it("create error div", function () {
            scope.options.error(null, "", "text");
            expect(document.getElementById("errorSpan")).toBeDefined();

        });

        it("throw proper error if upload fails", function () {
        });

    });

    describe("Component", function () {

        beforeEach(inject(function () {
            element = angular.element('<wistia-uploader></wistia-uploader>');
        }));

        it("should be defined", function () {
            expect(element).toBeDefined();
        });
    });

});


