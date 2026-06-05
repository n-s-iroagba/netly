"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
// migrations/20260513190930-update-shipping-stage-payment-status.ts
const sequelize_1 = require("sequelize");
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        // Use camelCase paymentStatus as in the database and model
        yield queryInterface.changeColumn('ShippingStages', 'paymentStatus', {
            type: sequelize_1.DataTypes.ENUM('PENDING', 'PAID', 'NO_PAYMENT_REQUIRED', 'UNPAID', 'INCOMPLETE_PAYMENT', 'REJECTED'),
            allowNull: false,
            defaultValue: 'PENDING',
        });
    });
}
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.changeColumn('ShippingStages', 'paymentStatus', {
            type: sequelize_1.DataTypes.ENUM('PENDING', 'PAID', 'NO_PAYMENT_REQUIRED', 'UNPAID', 'INCOMPLETE_PAYMENT'),
            allowNull: false,
            defaultValue: 'PENDING',
        });
    });
}
