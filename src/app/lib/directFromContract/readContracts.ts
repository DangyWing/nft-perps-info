// import type {
//   Abi,
//   AbiFunction,
//   AbiParametersToPrimitiveTypes,
//   AbiStateMutability,
//   Address,
//   ExtractAbiFunction,
//   Narrow,
// } from "abitype";
// import { type InferFunctionName } from "viem";

// export type Contract<
//   TAbi extends Abi | readonly unknown[] = Abi | readonly unknown[],
//   TFunctionName extends string = string
// > = { abi: TAbi; functionName: TFunctionName };

// export type GetArgs<
//   TAbi extends Abi | readonly unknown[],
//   TFunctionName extends string,
//   _AbiFunction extends AbiFunction = TAbi extends Abi
//     ? ExtractAbiFunction<TAbi, TFunctionName>
//     : AbiFunction,
//   _Args = AbiParametersToPrimitiveTypes<_AbiFunction["inputs"], "inputs">,
//   FailedToParseArgs =
//     | ([_Args] extends [never] ? true : false)
//     | (readonly unknown[] extends _Args ? true : false)
// > = true extends FailedToParseArgs
//   ? {
//       /**
//        * Arguments to pass contract method
//        *
//        * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
//        */
//       args?: readonly unknown[];
//     }
//   : _Args extends readonly []
//   ? { args?: never }
//   : {
//       /** Arguments to pass contract method */ args: _Args;
//     };

// export type GetReturnType<
//   TAbi extends Abi | readonly unknown[] = Abi,
//   TFunctionName extends string = string,
//   _AbiFunction extends AbiFunction & {
//     type: "function";
//   } = TAbi extends Abi ? ExtractAbiFunction<TAbi, TFunctionName> : AbiFunction,
//   _Args = AbiParametersToPrimitiveTypes<_AbiFunction["outputs"], "outputs">,
//   FailedToParseArgs =
//     | ([_Args] extends [never] ? true : false)
//     | (readonly unknown[] extends _Args ? true : false)
// > = true extends FailedToParseArgs
//   ? unknown
//   : _Args extends readonly []
//   ? void
//   : _Args extends readonly [infer Arg]
//   ? Arg
//   : _Args;

// type NewType<
//   TAbi extends Abi | readonly unknown[],
//   TFunctionName extends string
// > = GetArgs<TAbi, TFunctionName>;

// export type GetConfig<
//   TAbi extends Abi | readonly unknown[] = Abi,
//   TFunctionName extends string = string,
//   TAbiStateMutability extends AbiStateMutability = AbiStateMutability
// > = {
//   /** Contract ABI */
//   abi: Narrow<TAbi>; // infer `TAbi` type for inline usage
//   /** Contract address */
//   address: Address;
//   /** Function to invoke on the contract */
//   functionName: InferFunctionName<TAbi, TFunctionName, TAbiStateMutability>;
// } & NewType<TAbi, TFunctionName>;

// export declare function readContracts<
//   TAbi extends Abi | readonly unknown[],
//   TFunctionName extends string,
//   TContracts extends { abi: TAbi; functionName: TFunctionName }[]
// >(config: ReadContractsConfig<TContracts>): ContractsResult<TContracts>;

// export type ReadContractsConfig<TContracts extends Contract[]> = {
//   contracts: readonly [...ContractsConfig<TContracts>];
// };

// export type ReadContractsResult<TContracts extends Contract[]> =
//   ContractsResult<TContracts>;

// // Avoid TS depth-limit error in case of large array literal
// type MAXIMUM_DEPTH = 20;

// /**
//  * ContractsConfig reducer recursively unwraps function arguments to infer/enforce type param
//  */
// type ContractsConfig<
//   TContracts extends Contract[],
//   Result extends any[] = [],
//   Depth extends readonly number[] = []
// > = Depth["length"] extends MAXIMUM_DEPTH
//   ? GetConfig[]
//   : TContracts extends []
//   ? []
//   : TContracts extends [infer Head extends Contract]
//   ? [...Result, GetConfig<Head["abi"], Head["functionName"], "pure" | "view">]
//   : TContracts extends [
//       infer Head extends Contract,
//       ...infer Tail extends Contract[]
//     ]
//   ? ContractsConfig<
//       [...Tail],
//       [
//         ...Result,
//         GetConfig<Head["abi"], Head["functionName"], "pure" | "view">
//       ],
//       [...Depth, 1]
//     >
//   : unknown[] extends TContracts
//   ? TContracts
//   : // If `TContracts` is *some* array but we couldn't assign `unknown[]` to it, then it must hold some known/homogenous type!
//   // use this to infer the param types in the case of Array.map() argument
//   TContracts extends GetConfig<infer TAbi, infer TFunctionName>[]
//   ? GetConfig<TAbi, TFunctionName>[]
//   : GetConfig[];

// /**
//  * ContractsResult reducer recursively maps type param to results
//  */
// type ContractsResult<
//   TContracts extends Contract[],
//   Result extends any[] = [],
//   Depth extends readonly number[] = []
// > = Depth["length"] extends MAXIMUM_DEPTH
//   ? GetReturnType[]
//   : TContracts extends []
//   ? []
//   : TContracts extends [infer Head extends Contract]
//   ? [...Result, GetReturnType<Head["abi"], Head["functionName"]>]
//   : TContracts extends [
//       infer Head extends Contract,
//       ...infer Tail extends Contract[]
//     ]
//   ? ContractsResult<
//       [...Tail],
//       [...Result, GetReturnType<Head["abi"], Head["functionName"]>],
//       [...Depth, 1]
//     >
//   : TContracts extends GetConfig<infer TAbi, infer TFunctionName>[]
//   ? GetReturnType<TAbi, TFunctionName>[]
//   : GetReturnType[];
