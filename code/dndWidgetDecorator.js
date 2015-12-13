(function () {

    angular.module("dnd").directive("dndWidgetDecorator", dndWidgetDecorator);

    dndWidgetDecorator.$inject = ["$q", "dndObserver"];

    function dndWidgetDecorator($q, dndObserver) {
        return {
            require: "?^dndContainerDecorator",
            restrict: "A",
            controller: function dndWidgetController() {
                
            },
            link: function dndWidgetPostLink(scope, element, attrs, dndContainerDecoratorController) {

                /*{
                    dndData: @object
                }*/
                var dndWidgetOptionsInstance = scope.$eval(attrs.dndWidgetDecorator);

                // Set the HTML5 draggable attribute on the element
                element.attr("draggable", "true");

                //if (dndWidgetOptionsInstance.disabled) {
                //    scope.$watch(dndWidgetOptionsInstance.disabled, function (disabled) {
                //        element.attr("draggable", disabled);
                //    });
                //}


                Rx.Observable.fromEvent(element, "dragstart")
                    .map(function (event) {
                        return {
                            event: event.originalEvent || event,
                            data: dndWidgetOptionsInstance
                        }
                    })
                    .subscribe(function (data) {
                        data.event.stopPropagation();
                        dndObserver.onNext(data);
                    });

                Rx.Observable.fromEvent(element, "dragend")
                    .map(function (event) {
                        return {
                            event: event.originalEvent || event,
                            data: dndWidgetOptionsInstance
                        }
                    })
                    .subscribe(function (data) {
                        data.event.stopPropagation();
                        dndObserver.onNext(data);
                    });
                    


            },
        };
    }

})();


