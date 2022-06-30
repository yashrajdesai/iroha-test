"use strict";
exports.__esModule = true;
var grpc_1 = require("grpc");
var endpoint_grpc_pb_1 = require("iroha-helpers/lib/proto/endpoint_grpc_pb");
var queries_1 = require("iroha-helpers/lib/queries");
var IROHA_ADDRESS = 'localhost:50051';
var commandService = new endpoint_grpc_pb_1.CommandService_v1Client(IROHA_ADDRESS, grpc_1["default"].credentials.createInsecure());
var queryService = new endpoint_grpc_pb_1.QueryService_v1Client(IROHA_ADDRESS, grpc_1["default"].credentials.createInsecure());
var adminPriv = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70';
Promise.all([
    // commands.createAsset({
    //     privateKeys: [adminPriv],
    //     creatorAccountId: 'admin@test',
    //     quorum: 1,
    //     commandService,
    //     timeoutLimit: 5000
    //   }, {
    //     assetName: 'xcoin',
    //     domainId: 'test',
    //     precision: 0
    // }),
    // commands.addAssetQuantity({
    //     privateKeys: [adminPriv],
    //     creatorAccountId: 'admin@test',
    //     quorum: 1,
    //     commandService,
    //     timeoutLimit: 5000
    //   }, {
    //     assetId: 'xcoin#test',
    //     amount: 5000
    // }),
    // queries.getAccountAssets({
    //     privateKey: adminPriv,
    //     creatorAccountId: 'admin@test',
    //     queryService,
    //     timeoutLimit: 5000
    //   }, {
    //     accountId: 'admin@test',
    //     pageSize: 100,
    //     firstAssetId: undefined
    //   }),
    //   queries.getAccountTransactions({
    //     privateKey: adminPriv,
    //     creatorAccountId: 'admin@test',
    //     queryService,
    //     timeoutLimit: 5000
    //   }, {
    //     accountId: 'admin@test',
    //     pageSize: 5,
    //     firstTxHash: undefined,
    //     firstTxTime: undefined,
    //     lastTxTime: undefined,
    //     firstTxHeight: undefined,
    //     lastTxHeight: undefined,
    //     ordering: {
    //       field: undefined,
    //       direction: undefined
    //     }
    //   }),
    queries_1["default"].getBlock({
        privateKey: adminPriv,
        creatorAccountId: 'admin@test',
        queryService: queryService,
        timeoutLimit: 5000
    }, {
        height: 1
    }),
])
    .then(function (a) {
    console.log(a);
})["catch"](function (e) { return console.error(e); });
