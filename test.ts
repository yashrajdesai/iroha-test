import grpc from 'grpc'
import fs from 'fs';
import {
  QueryService_v1Client as QueryService,
  CommandService_v1Client as CommandService
} from 'iroha-helpers/lib/proto/endpoint_grpc_pb'
import queries from 'iroha-helpers/lib/queries';
import { commands } from 'iroha-helpers';

const IROHA_ADDRESS = 'localhost:55552';

let certificate = fs.readFileSync("server.crt");

const sslCred = grpc.credentials.createSsl(certificate);

// const sslCred = grpc.credentials.createInsecure();

const commandService = new CommandService(
  IROHA_ADDRESS,
  sslCred
)

const queryService = new QueryService(
  IROHA_ADDRESS,
  sslCred
)
const adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70';

Promise.all([
    commands.createAsset({
        privateKeys: [adminPriv],
        creatorAccountId: 'admin@test',
        quorum: 1,
        commandService,
        timeoutLimit: 5000
      }, {
        assetName: 'acoin',
        domainId: 'test',
        precision: 0
    }),
    // commands.addAssetQuantity({
    //     privateKeys: [adminPriv],
    //     creatorAccountId: 'admin@test',
    //     quorum: 1,
    //     commandService,
    //     timeoutLimit: 5000
    //   }, {
    //     assetId: 'testcoin#test',
    //     amount: 500,
    // }),
    // commands.createAccount({
    //     privateKeys: [adminPriv],
    //     creatorAccountId: 'admin@test',
    //     quorum: 1,
    //     commandService,
    //     timeoutLimit: 5000
    //   }, {
    //     accountName: "test_account",
    //     domainId: "test",
    //     publicKey: "407e57f50ca48969b08ba948171bb2435e035d82cec417e18e4a38f5fb113f83"
    // }),
    // queries.getAccountAssets({
    //     privateKey: adminPriv,
    //     creatorAccountId: 'admin@test',
    //     queryService,
    //     timeoutLimit: 5000
    //   }, {
    //     accountId: 'admin@test',
    //     pageSize: 100,
    //     firstAssetId: "coolcoin#test"
    //   }),
      // queries.getAccountTransactions({
      //   privateKey: adminPriv,
      //   creatorAccountId: 'admin@test',
      //   queryService,
      //   timeoutLimit: 5000
      // }, {
      //   accountId: 'admin@test',
      //   pageSize: 5,
      //   firstTxHash: undefined,
      //   firstTxTime: undefined,
      //   lastTxTime: undefined,
      //   firstTxHeight: undefined,
      //   lastTxHeight: undefined,
      //   ordering: {
      //     field: undefined,
      //     direction: undefined
      //   }
      // }),
    // queries.getBlock({
    //   privateKey: adminPriv,
    //   creatorAccountId: 'admin@test',
    //   queryService,
    //   timeoutLimit: 5000
    // }, {
    //   height: 2
    // }),
  ])
    .then( (a) => {
        console.log(JSON.stringify(a));
    }
    )
    .catch(e => console.error(e))