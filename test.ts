import grpc from 'grpc'
import fs from 'fs';
import {
  QueryService_v1Client as QueryService,
  CommandService_v1Client as CommandService
} from 'iroha-helpers/lib/proto/endpoint_grpc_pb'
import queries from 'iroha-helpers/lib/queries';
import { commands } from 'iroha-helpers';
const IROHA_ADDRESS = 'localhost:50051'

const adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

const commandService = new CommandService(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

const queryService = new QueryService(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

queries.fetchCommits(
  {
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  },
  (block) => console.log('fetchCommits new block:', block),
  (error) => console.error('fetchCommits failed:', error.stack)
)

Promise.all([
  commands.setAccountDetail({
    privateKeys: [adminPriv],
    creatorAccountId: 'admin@test',
    quorum: 1,
    commandService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test',
    key: 'jason',
    value: 'statham'
  }),
  queries.getAccount({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test'
  }),
  queries.getAccountDetail({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test',
    key: 'jason',
    writer: 'admin@test',
    pageSize: 1,
    paginationKey: 'jason',
    paginationWriter: 'admin@test'
  }),
  queries.getSignatories({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test'
  }),
  queries.getRoles({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  }),
  queries.getAccount({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test'
  }),
  queries.getAccountTransactions({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test',
    pageSize: 5,
    firstTxHash: undefined,
    firstTxTime: undefined,
    lastTxTime: undefined,
    firstTxHeight: undefined,
    lastTxHeight: undefined,
    ordering: {
      field: undefined,
      direction: undefined
    }
  }),
  queries.getAccountAssets({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: 'admin@test',
    pageSize: 100,
    firstAssetId: undefined
  })
])
  .then(a => console.log(a))
  .catch(e => console.error(e))