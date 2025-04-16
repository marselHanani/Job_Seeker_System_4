import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  selectedTab: number = 0;

  tabs = [
    { label: 'All Notifications', key: 'all' },
    { label: 'Mentions', key: 'mention' },
    { label: 'Follows', key: 'follow' }
  ];

  notifications = [
    {
      title: "New job alert for 'Software Engineer' roles",
      date: "Jul 25",
      type: "all",
      image: '/images/woman.jpg'
    },
    {
      title: "You were mentioned by @john",
      date: "Jul 24",
      type: "mention",
  image: '/images/woman.jpg'
    },
    {
      title: "New follower: Sarah",
      date: "Jul 23",
      type: "follow",
        image: '/images/woman.jpg'
    },
    {
      title: "Reminder: Interview with InnoSolutions scheduled",
      date: "Jul 22",
      type: "all",
      image: '/images/woman.jpg'
    },
    {
      title: "Another mention from @maria",
      date: "Jul 21",
      type: "mention",
       image: '/images/woman.jpg'
    }
  ];


  selectTab(index: number): void {
    this.selectedTab = index;
  }

  get filteredNotifications() {
    const selectedKey = this.tabs[this.selectedTab].key;
    if (selectedKey === 'all') {
      return this.notifications;
    }
    return this.notifications.filter(n => n.type === selectedKey);
  }

  deleteNotification(notificationToDelete: any): void {
    this.notifications = this.notifications.filter(notification => notification !== notificationToDelete);
  }
}
