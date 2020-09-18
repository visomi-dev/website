import { Injectable } from '@angular/core';

import helpers from '../../utils/helpers';

const FIRST_POSITION = 0;
const NOTIFICATIONS_QUANTITY = 5;

const NOTIFICATION_DELAY = 5000;

export interface Notification {
  content: string;
  type: string;
  datetime?: Date;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor() { }

  navbar = true;
  loading = false;
  closing = false;
  mobile = false;
  notifications: Notification[] = [];

  get lastFiveNotifications(): Notification[] {
    const clone = this.notifications.slice(FIRST_POSITION).reverse();

    return clone.slice(FIRST_POSITION, NOTIFICATIONS_QUANTITY);
  }

  toggleNavbar(): void {
    this.navbar = !this.navbar;
  }

  addNotification(payload: Notification): void {
    const notification = payload;

    if (!notification.datetime) { notification.datetime = new Date(); }

    this.notifications.push(notification);
  }

  deleteNotification(payload: Date): void {
    const notifications = this.notifications.filter(
      notification => notification.datetime !== payload,
    );

    this.notifications = notifications;
  }

  async addTemporalNotification(payload: Notification): Promise<void> {
    const { duration = NOTIFICATION_DELAY, ...notification } = payload;

    const now = new Date();

    notification.datetime = now;

    this.addNotification(notification);

    await helpers.wait(duration);
  }
}
