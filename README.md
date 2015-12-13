# dnd
Angular Drag and Drop module using RxJS.

Here is an example of using it in a draggable widget directive

	<draggable-widget ng-repeat="widget in widgets" dnd-widget-decorator="widget"></draggable-widget>

	(function () {

		angular.module("app")
			.directive("draggableWidget", function () {
				return {
					restrict: "E",
          controllerAs: "ctrl",
          bindToController: true,
					controller: draggableWidgetController,
					templateUrl: "draggable-widget.html"
				};
			});

		draggableWidgetController.$inject = ["$scope", "dndObservable"];

		function draggableWidgetController($scope, dndObservable) {
			var self = this;
			
			dndObservable
				.filter(function (dnd) {
					if (dnd.event.type !== "dragstart") return false;
					if (dnd.draggingData === self.widget) return false;
					return true;
				})
				.subscribe(function onDragStartNext(dnd) {
					//
				});


			dndObservable
				.filter(function (dnd) {
					if (dnd.event.type !== "dragend") return false;
					if (dnd.draggingData === self.widget) return false;
					return true;
				})
				.subscribe(function onDragEndNext(dnd) {
					//
				});

		}
	})();
	
Here is an example of using it in a draggable widget container directive
	
	<draggable-widget-container dnd-container-decorator="{ list: ctrl.widgetList, containerName: 'DropArea' }"></draggable-widget-container>
	
		(function () {

		angular.module("app")
			.directive("draggableWidgetContainer", function () {
				return {
					restrict: "E",
					bindToController: true,
					controllerAs: "ctrl",
					controller: draggableWidgetContainerController,
					templateUrl: "draggable-widget-container.html"
				};
			});

		draggableWidgetContainerController.$inject = ["$scope", "dndObservable"];

		function draggableWidgetContainerController($scope, dndObservable) {
			var self = this;
			
			dndObservable
				.filter(function (dnd) {
					if (dnd.event.type !== "drop") return false;
					if (dnd.data.list !== self.widgetList) return false;
					return true;
				})
				.subscribe(function onDropNext(dnd) {
					var x = "";
				});

			dndObservable
				.filter(function (dnd) {
					if (dnd.event.type !== "dragover") return false;
					if (dnd.data.list !== self.widgetList) return false;
					return true;
				})
				.subscribe(function onDropNext(dnd) {
					var x = "";
				});

		}
	})();
