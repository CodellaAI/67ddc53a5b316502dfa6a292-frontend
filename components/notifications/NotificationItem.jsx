
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { FaHeart, FaRetweet, FaUserPlus, FaComment } from 'react-icons/fa'

export default function NotificationItem({ notification }) {
  const formattedDate = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
  
  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <FaHeart className="text-red-500" />
      case 'retweet':
        return <FaRetweet className="text-green-500" />
      case 'follow':
        return <FaUserPlus className="text-primary-blue" />
      case 'reply':
        return <FaComment className="text-primary-blue" />
      default:
        return null
    }
  }
  
  const getMessage = () => {
    const userName = notification.from?.name || 'Someone'
    
    switch (notification.type) {
      case 'like':
        return `${userName} liked your tweet`
      case 'retweet':
        return `${userName} retweeted your tweet`
      case 'follow':
        return `${userName} followed you`
      case 'reply':
        return `${userName} replied to your tweet`
      default:
        return 'You have a new notification'
    }
  }
  
  const getLink = () => {
    switch (notification.type) {
      case 'follow':
        return `/profile/${notification.from?.username}`
      case 'like':
      case 'retweet':
      case 'reply':
        return `/tweet/${notification.tweetId}`
      default:
        return '#'
    }
  }

  return (
    <Link href={getLink()}>
      <div className={`p-4 border-b border-secondary-extraLight hover:bg-secondary-ultraLight transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
        <div className="flex items-start">
          <div className="p-2 mr-3">
            {getIcon()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <img 
                src={notification.from?.profileImageUrl || "https://via.placeholder.com/40"} 
                alt={notification.from?.name || 'User'} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p>
                  <span className="font-bold hover:underline">{notification.from?.name}</span>{' '}
                  {getMessage()}
                </p>
                <p className="text-secondary-dark text-sm">{formattedDate}</p>
              </div>
            </div>
            
            {notification.content && (
              <p className="text-secondary-dark ml-12">{notification.content}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
