import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
=======

>>>>>>> bd51f577e4aa852bf27039bbab4c9d1a685a8e16

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
<<<<<<< HEAD
      type: "all"
=======
      type: "all",
      image: '/images/woman.jpg'
>>>>>>> bd51f577e4aa852bf27039bbab4c9d1a685a8e16
    },
    {
      title: "You were mentioned by @john",
      date: "Jul 24",
<<<<<<< HEAD
      type: "mention"
=======
      type: "mention",
  image: '/images/woman.jpg'
>>>>>>> bd51f577e4aa852bf27039bbab4c9d1a685a8e16
    },
    {
      title: "New follower: Sarah",
      date: "Jul 23",
<<<<<<< HEAD
      type: "follow"
=======
      type: "follow",
        image: '/images/woman.jpg'
>>>>>>> bd51f577e4aa852bf27039bbab4c9d1a685a8e16
    },
    {
      title: "Reminder: Interview with InnoSolutions scheduled",
      date: "Jul 22",
<<<<<<< HEAD
      type: "all"
=======
      type: "all",
      image: '/images/woman.jpg'
>>>>>>> bd51f577e4aa852bf27039bbab4c9d1a685a8e16
    },
    {
      title: "Another mention from @maria",
      date: "Jul 21",
<<<<<<< HEAD
      type: "mention"
    }
  ];

=======
      type: "mention",
       image: '/images/woman.jpg'
    }
  ];


>>>>>>> bd51f577e4aa852bf27039bbab4c9d1a685a8e16
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
<<<<<<< HEAD
=======

  deleteNotification(notificationToDelete: any): void {
    this.notifications = this.notifications.filter(notification => notification !== notificationToDelete);
  }
>>>>>>> bd51f577e4aa852bf27039bbab4c9d1a685a8e16
}
