"use strict";

/**
 * order service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::order.order", ({ strapi }) => ({
  async test(...arg) {
    console.log(strapi);
    console.log(arg);
    return arg;
  },
}));
