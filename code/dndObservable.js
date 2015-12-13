(function () {

    var dragging,
        draggingData,
        dragoverContainerData,
        dndRxObserver,
        dndRxObservable = Rx.Observable.create(function(observer) {
            dndRxObserver = observer;
        })
        .publish();

    dndRxObservable.connect();
    angular.module("dnd").service("dndObserver", dndObserver);

    function dndObserver() {
        return dndRxObserver;
    }

    angular.module("dnd").service("dndObservable", dndObservable);

    function dndObservable() {

        
        return dndRxObservable
            .map(function (dnd) {

                if (dnd.event.type === "dragstart") {
                    draggingData = dnd.data;
                    dragging = true;
                    return { event: dnd.event, draggingData: draggingData };
                }

                if (dnd.event.type === "dragover") {
                    dragoverContainerData = dnd.data;
                    return { event: dnd.event, draggingData: draggingData, dragoverContainerData: dragoverContainerData };
                }

                if (dnd.event.type === "dragend") {
                    dragging = false;
                    draggingData = undefined;
                    dragoverContainerData = undefined;
                    return { event: dnd.event, draggingData: dnd.data };
                }

                if (dnd.event.type === "drop") {
                    dragging = false;
                    dragoverContainerData = undefined;
                    draggingData = undefined;
                    return { draggingData: draggingData, dropContainerData: dnd.data };
                }


                return dnd;
            });
    }


})();


