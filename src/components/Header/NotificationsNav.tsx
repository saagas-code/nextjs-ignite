import { RiNotificationLine, RiUserAddLine  } from 'react-icons/ri'

export function NotificationsNav() {
  return (
    <div className="flex text-300 py-2  border-r-2 border-700">
      <RiNotificationLine className="text-2xl mr-4" />
      <RiUserAddLine className="text-2xl mr-4" />
    </div>
  )
}