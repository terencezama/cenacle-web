import { string } from "prop-types";

enum Platform {
    ios = 'ios',
    android = 'android'
}
export interface NotificationBody {
    to: string,
    data: any,
    priority : string,
    content_available: boolean
    notification?:any
}
class NotificationBuilder {
    private _topic:string;
    private _environment: string;
    private _type?:string;
    private _tag?:string;
    private _message:string;
    private _title:string;


    constructor(environment:string, topic:string, message:string, title:string){
        this._topic         = topic;
        this._environment   = environment;
        this._message       = message;
        this._title         = title;
    }

    public set tag(tag:string){
        this._tag = tag;
    }
    public set type(type:string){
        this._type = type;
    }

    private _getGenericBody():NotificationBody{
        let data: {title:string, message:string, type?:string, tag?:string} 
        data = {
            title: this._title,
            message: this._message
        }
        if(this._type != undefined){
            data['type']   = this._type;
        }

        if(this._tag != undefined){
            data['tag']    = this._tag;
        }

        let body: NotificationBody = {
            to: `/topics/${this._environment}_${this._topic}`,
            data: data,
            priority : 'high',
            content_available: true
        }
        return body;
    }
    public build(platform:Platform):NotificationBody {
        let body = this._getGenericBody()
        if(platform == Platform.ios){
            body.to                 = body.to + "_ios"; 
            body.notification       = {
                title: this._title,
                message:this._message
            }
        }
        return body
    }

}

export default NotificationBuilder
export {
    Platform,
}