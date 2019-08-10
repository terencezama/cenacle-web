import NotificationBuilder from "./notifications";
import { CStorage } from "../lib";

class NotificationDescriptor {
    static eventNotification(message: string): NotificationBuilder {
        const environment           = CStorage.getItem("prod") ? "prod" : "qa";
        let notificationBuilder     = new NotificationBuilder(environment, 'events', message, "Nouvel Évenment.");
        notificationBuilder.tag     = "event"
        notificationBuilder.type    = "notif"
        return notificationBuilder;
    }

    static summaryNotification(message: string): NotificationBuilder {
        const environment           = CStorage.getItem("prod") ? "prod" : "qa";
        let notificationBuilder     = new NotificationBuilder(environment, 'summaries', message, "Nouveau Résumé.");
        notificationBuilder.tag     = "summary"
        notificationBuilder.type    = "notif"
        return notificationBuilder;
    }

    static verseOfTheDayNotification(title:string, message: string): NotificationBuilder{
        const environment           = CStorage.getItem("prod") ? "prod" : "qa";
        let notificationBuilder     = new NotificationBuilder(environment, 'verse', message, title);
        notificationBuilder.tag     = "verse"
        notificationBuilder.type    = "notif"
        return notificationBuilder;
    }

    static sharesNotification(message:string):NotificationBuilder{
       const environment           = CStorage.getItem("prod") ? "prod" : "qa";
       let notificationBuilder     = new NotificationBuilder(environment, 'shares', message, "Nouveau Partage");
       notificationBuilder.tag     = "share"
       notificationBuilder.type    = "verse"
       return notificationBuilder;
    }

}


export default NotificationDescriptor;