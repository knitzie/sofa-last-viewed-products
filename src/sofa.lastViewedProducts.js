'use strict';
/* global sofa */

sofa.define('sofa.LastViewedProducts', function () {

        /**
         * Prepares a valid object array of product items
         *
         * http://mutablethought.com/2013/04/25/angular-js-ng-repeat-no-longer-allowing-duplicates/
         *
         * @param {object} items
         * @returns {object}
         */
        var sanitizeSavedData = function (items) {

            if (!items) {
                return {};
            }

            for (var key in items) {
                items[key].product = sofa.Util.extend(new sofa.models.Product(), items[key].product);
            }

            return items;
        };

        var self = {},
                storePrefix = 'lastViewedProducts_',
                storeItemsName = storePrefix + 'items',
                data = storageService.get(storeItemsName);
                var items = sanitizeSavedData(data) || [];

        /**
         * Returns an object array of product items
         *
         * @returns {object}
         */
        self.getItems = function () {
            return sanitizeSavedData(storageService.get(storePrefix));
        };

        /**
         * Saves the product into storages
         *
         * @param {object} product
         * @returns void
         */
        self.setLastViewed = function (product)
        {
            var key = product.urlKey,
                lastViewed = self.getItems();

            if (lastViewed[key]) {
                //replaced quantity param with "1", because there will never be more than one
                lastViewed[key].quantity += 1;
            }
            else {
                //removed params quantity and variant, they are not of interest
                lastViewed[key] = {
                    product: product,
                    key: key
                };
            }

            storageService.set(storePrefix, lastViewed);
        };

        return self;
});
