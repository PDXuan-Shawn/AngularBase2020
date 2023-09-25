import { Injectable } from "@angular/core";
import { decode, encode } from "../commons/fn/fn-common";

@Injectable({
    providedIn: 'root'
  })
  export class LocalStorageService {
  
    private _storage: Storage;
  
    constructor() { 
      this._storage = localStorage;
    }
  
    public get<T>(key: string): T | null {
      let result = null;
      const item = this._storage.getItem(key);
      if (item) {
        result = decode(item) as T;
      }
      return result;
    }
  
    public set<T>(key: string, data: T): void {
      const item = encode(data);
      this._storage.setItem(key, item);
    }
    
  
    public remove(key: string): void {
      this._storage.removeItem(key);
    }

    public reomveAll(): void {
        this._storage.clear();
    }
  }
  