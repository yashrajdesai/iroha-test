import grpc from 'grpc'
import fs from 'fs';
import {
  QueryService_v1Client as QueryService,
  CommandService_v1Client as CommandService
} from 'iroha-helpers/lib/proto/endpoint_grpc_pb'
import queries from 'iroha-helpers/lib/queries';
import { commands } from 'iroha-helpers';
import createKeccakHash from 'keccak';


const IROHA_ADDRESS = 'localhost:50051'

const adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

// const commandService = new CommandService(
//   IROHA_ADDRESS,
//   grpc.credentials.createInsecure()
// )

// const queryService = new QueryService(
//   IROHA_ADDRESS,
//   grpc.credentials.createInsecure()
// )

function pad(num : string, size: number, dir: string) {
    
    while (num.length < size) {
        if (dir === "left") {
            num = "0" + num;
        } else if(dir === "right") {
            num = num + "0";
        }

    }
    return num;
}

function hex(str : string)
  {
	var arr1 : Array<string> = [];
	for (var n = 0, l = str.length; n < l; n ++) 
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
   }

  function hex_to_ascii(str: string)
  {
    console.log(str);
    var hex  = str.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }

function make_number_hex_left_padded(number : Number, width = 64) {
  var number_hex = number.toString(16);
  return pad(number_hex, width, "left");
}

function left_padded_address_of_param(param_index :number, number_of_params : number, width = 64) {
  /* Specifies the position of each argument according to Contract ABI specifications. */
  var bits_for_the_param, bits_offset, bits_per_param;
  bits_offset = 32 * number_of_params;
  bits_per_param = 64;
  bits_for_the_param = bits_offset + bits_per_param * param_index;
  return make_number_hex_left_padded(bits_for_the_param, width);
}

function get_first_four_bytes_of_keccak(function_signature : string) {
    return createKeccakHash('keccak256').update(function_signature).digest('hex').slice(0, 8);
}

function argument_encoding(arg : string) {
  /* Encodes the argument according to Contract ABI specifications. */
  var encoded_argument : string = pad((arg.length).toString(16), 64, "left");
  let encodedString = hex(Buffer.from(arg, 'utf-8').toString());
  encoded_argument = encoded_argument + pad(encodedString, 64, "right").toUpperCase();
  return encoded_argument;
}

console.log(argument_encoding("admin@test"));

export {make_number_hex_left_padded, left_padded_address_of_param, get_first_four_bytes_of_keccak, argument_encoding, hex_to_ascii}