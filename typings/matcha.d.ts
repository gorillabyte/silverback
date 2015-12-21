declare function suite(title: string, func?: () => void): void;
declare function bench(title: string, func?: () => void): void;
declare function set(title: string, args?: any): void;
declare function before(func?: () => void): void;
declare function after(func?: () => void): void;
