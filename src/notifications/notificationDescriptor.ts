import NotificationBuilder from "./notifications";
import { CStorage } from "../lib";

class NotificationDescriptor {
    static eventNotification(message: string): NotificationBuilder {
        const environment           = CStorage.getItem("prod") ? "prod" : "qa";
        let notificationBuilder     = new NotificationBuilder(environment, 'events', message, "Nouveaux Évenment.");
        notificationBuilder.tag     = "event"
        notificationBuilder.type    = "notif"
        return notificationBuilder;
    }

    static summaryNotification(message: string): NotificationBuilder {
        const environment           = CStorage.getItem("prod") ? "prod" : "qa";
        let notificationBuilder     = new NotificationBuilder(environment, 'summaries', message, "Nouveaux Résumé.");
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
       let notificationBuilder     = new NotificationBuilder(environment, 'shares', message, "Nouveaux Partage");
       notificationBuilder.tag     = "share"
       notificationBuilder.type    = "verse"
       return notificationBuilder;
    }

}


export default NotificationDescriptor;