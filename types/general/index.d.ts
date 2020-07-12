// General type definitions
// Definitions by: Igor Novikov <https://github.com/hooked74>

/// <reference types="node" />

declare type int = number;
declare type uint = number;
declare type float = number;
declare type ufloat = number;

declare type KeysOfUnion<T> = T extends any ? keyof T : never;
declare type PickField<T, K extends keyof T> = T[K];

declare type PromiseResolve = (value?: void | PromiseLike<void> | undefined) => void;
declare type PromiseReject = (reason?: any) => void;

declare type Constructor<T> = new (...args: any[]) => T;
declare type SafeConstructor<T extends object> = T extends object
  ? new (...args: any[]) => T
  : never;
declare type Decorator<T, U extends T> = (Component: Constructor<T>) => Constructor<U>;
declare type SafeDecorator<T extends object, U extends T> = (
  Component: SafeConstructor<T>
) => SafeConstructor<U>;

declare type ReadonlyPartial<T> = { readonly [P in keyof T]?: T[P] };
declare type Writable<T> = { -readonly [K in keyof T]: T[K] };

declare type Handler<T = any> = (...args: any[]) => T;

declare interface Dictionary<T> {
  [key: string]: T;
}

declare interface Tuple<T> {
  [key: number]: T;
}

declare interface ReadonlyDictionary<T> {
  readonly [key: string]: T;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
  }

  interface Global {}
}

declare type StringBrand<T, B extends string> = T & { readonly __brand: B };

declare interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol; // ensures uniqueness across modules / packages
}

declare type NonEmptyString = string & NonEmptyStringBrand;

declare type ConstructorType<T> = T extends new (...args: any[]) => infer P ? P : never;

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
