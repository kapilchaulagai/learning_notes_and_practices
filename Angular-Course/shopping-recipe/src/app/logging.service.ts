import { Injectable } from "@angular/core";

//@Injectable({providedIn: 'root'})
export class LoggingService{
    lastlog: string = "empty";

    printLog(message: string){
        console.log(message);
        console.log(this.lastlog);
        this.lastlog = message;
    }
}