import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  alertsSubject = new BehaviorSubject<Alert | null>(null);
  alertsObvs = this.alertsSubject.asObservable()

  constructor() { }

  subscribeToAlerts() {
    return this.alertsObvs;
  }

  sendAlert(alert: Alert) {
    console.log('ola')
    this.alertsSubject.next(alert);
  }

  getAlertMsg(alertMsgCode: string): string {
    switch (alertMsgCode) {
      case 'badCredentials':
        return 'Bad credentials';
      default:
        return 'Unknown error';
    }
  }
}
