export class LSWrapper {

    static prefix: string = 'in_';
  
    protected static keysPrefix = (key: string) => 
      `${LSWrapper.prefix}${key}`;
  
    static getItem(key: string){
      let val: any = localStorage.getItem(LSWrapper.keysPrefix(key));
      return (val && val !== null) ? JSON.parse(val) : null;
    }
  
    static setItem = (key: string, val: any) => 
      localStorage.setItem(LSWrapper.keysPrefix(key), JSON.stringify(val));
  
    static removeItem = (key: string) => 
      localStorage.removeItem(LSWrapper.keysPrefix(key));
    
  }