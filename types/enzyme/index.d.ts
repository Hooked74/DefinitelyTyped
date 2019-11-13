// Type definitions for enzyme
// Definitions by: Igor Novikov <novikovio74@gmail.com>

/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="@h74-types/general" />

declare interface ComponentClass<P, S, C extends React.Component<P, S>> extends Constructor<C> {
  propTypes?: React.WeakValidationMap<P>;
  contextType?: React.Context<any>;
  contextTypes?: React.ValidationMap<any>;
  childContextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

declare function shallow<C extends React.Component, P = C["props"], S = C["state"]>(
  node: React.ReactElement<P>,
  options?: import("enzyme").ShallowRendererProps
): import("enzyme").ShallowWrapper<P, S, C>;
declare function shallow<P>(
  node: React.ReactElement<P>,
  options?: import("enzyme").ShallowRendererProps
): import("enzyme").ShallowWrapper<P, any>;
declare function shallow<P, S>(
  node: React.ReactElement<P>,
  options?: import("enzyme").ShallowRendererProps
): import("enzyme").ShallowWrapper<P, S>;

declare function mount<C extends React.Component, P = C["props"], S = C["state"]>(
  node: React.ReactElement<P>,
  options?: import("enzyme").MountRendererProps
): import("enzyme").ReactWrapper<P, S, C>;
declare function mount<P>(
  node: React.ReactElement<P>,
  options?: import("enzyme").MountRendererProps
): import("enzyme").ReactWrapper<P, any>;
declare function mount<P, S>(
  node: React.ReactElement<P>,
  options?: import("enzyme").MountRendererProps
): import("enzyme").ReactWrapper<P, S>;

declare function render<P, S>(node: React.ReactElement<P>, options?: any): Cheerio;

declare namespace NodeJS {
  interface Global {
    shallow<C extends React.Component, P = C["props"], S = C["state"]>(
      node: React.ReactElement<P>,
      options?: import("enzyme").ShallowRendererProps
    ): import("enzyme").ShallowWrapper<P, S, C>;
    shallow<P>(
      node: React.ReactElement<P>,
      options?: import("enzyme").ShallowRendererProps
    ): import("enzyme").ShallowWrapper<P, any>;
    shallow<P, S>(
      node: React.ReactElement<P>,
      options?: import("enzyme").ShallowRendererProps
    ): import("enzyme").ShallowWrapper<P, S>;

    mount<C extends React.Component, P = C["props"], S = C["state"]>(
      node: React.ReactElement<P>,
      options?: import("enzyme").MountRendererProps
    ): import("enzyme").ReactWrapper<P, S, C>;
    mount<P>(
      node: React.ReactElement<P>,
      options?: import("enzyme").MountRendererProps
    ): import("enzyme").ReactWrapper<P, any>;
    mount<P, S>(
      node: React.ReactElement<P>,
      options?: import("enzyme").MountRendererProps
    ): import("enzyme").ReactWrapper<P, S>;

    render<P, S>(node: React.ReactElement<P>, options?: any): Cheerio;
  }
}
