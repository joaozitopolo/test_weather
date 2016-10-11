define(function() {

    return {
        template: '\
            <div class="small-2 columns" ng-class="{ off: !$ctrl.active }"> \
                <div class="pic"> \
                    <div class="hover"></div> \
                    <img class="thumbnail" ng-src="{{$ctrl.src}}"> \
                </div> \
                <div class="subtitle" ng-bind="$ctrl.title"></div> \
            </div>',
        bindings: {
            active: '<',
            src: '<',
            title: '<'
        }
    }

});