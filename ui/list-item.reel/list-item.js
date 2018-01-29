var Component = require("../component").Component;

/**
 * @class ListItem
 * @extends Component
 */
exports.ListItem = Component.specialize({

    label: {
        value: null
    },

    description: {
        value: null
    },

    _object: {
        value: null
    },

    object: {
        get: function () {
            return this._object;
        },
        set: function(object) {
            if (this._object !== object) {
                this._object = object;

                if (object) {
                    this._getUserInterfaceDescriptor(object);
                }
            }
        }
    },

    userInterfaceDescriptor: {
        value: null
    },

    _getUserInterfaceDescriptor: {
        value: function (object) {
            if (object && object.constructor.objectDescriptor) {
                var self = this;

                this.canDrawGate.setField(this.constructor.CAN_DRAW_FIELD, false);

                return object.constructor.objectDescriptor.then(function (objectDescriptor) {
                    self.canDrawGate.setField(self.constructor.CAN_DRAW_FIELD, true);

                    if (objectDescriptor) {
                        objectDescriptor.userInterfaceDescriptor.then(function (userInterfaceDescriptor) {
                            return (self.userInterfaceDescriptor = userInterfaceDescriptor);
                        });
                    }
                });
            }

            return Promise.resolve();
        }
    }

}, {
    CAN_DRAW_FIELD: {
        value: 'userInterfaceDescriptorLoaded'
    }
});
