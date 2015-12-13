(function () {

    angular.module("dnd").directive("dndContainerDecorator", dndContainerDecorator);

    dndContainerDecorator.$inject = ["$q", "dndObserver"];

    function dndContainerDecorator($q, dndObserver) {
        return {
            restrict: "A",
            controller: function dndContainerDecoratorController() {

            },
            link: function dndContainerDecoratorLink(scope, element, attrs, controllers) {

                /*{
                    list: @array,
                    containerName: @string
                }*/
                var dndContainerOptionsInstance = scope.$eval(attrs.dndContainerDecorator);

                Rx.Observable.fromEvent(element, "dragover")
                    .map(function(event) {
                        return {
                            event: event.originalEvent || event,
                            data: dndContainerOptionsInstance
                        }
                    })
                    .subscribe(function (data) {
                        data.event.preventDefault();
                        data.event.stopPropagation();
                        dndObserver.onNext(data);
                    });



                Rx.Observable.fromEvent(element, "dragleave")
                    .map(function (event) {
                        return {
                            event: event.originalEvent || event,
                            data: dndContainerOptionsInstance
                        }
                    })
                    .subscribe(function (data) {
                        data.event.preventDefault();
                        data.event.stopPropagation();
                        dndObserver.onNext(data);
                    });


                Rx.Observable.fromEvent(element, "drop")
                    .map(function (event) {
                        return {
                            event: event.originalEvent || event,
                            data: dndContainerOptionsInstance
                        }
                    })
                    .subscribe(function (data) {
                        data.event.preventDefault();
                        data.event.stopPropagation();
                        dndObserver.onNext(data);
                    });

            },
        };
    }

})();


